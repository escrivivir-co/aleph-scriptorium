# 07. Análisis de Viabilidad: Plan PO-SM vs Realidad Técnica

> **Épica**: BUG-MCLOGS-1.0.0  
> **Fecha**: 2026-01-01  
> **Autor**: @ox + @scrum (contraste técnico)  
> **Estado**: ⚠️ **REQUIERE AJUSTE** — Gap técnico identificado

---

## 1. Puntos Aprobados por PO-SM

| # | Punto | Decisión |
|---|-------|----------|
| 1 | No polling, usar botón REFRESH existente | ✅ Aprobado |
| 2 | Tool "help" en MCP + descripciones ricas | ✅ Aprobado |
| 3 | Caso de uso: refresh al final de sesión de 1h | ⚠️ **A VALIDAR** |
| 4 | Cache = snapshot manual (no LRU de N últimos) | ✅ Aprobado |
| 5 | Persistencia en DISCO + índice doble DRY | ✅ Aprobado |

---

## 2. Contraste con Hallazgos Técnicos

### 2.1 Punto 1: Refresh Manual vs Polling

| Aspecto | Polling (descartado) | Refresh Manual (aprobado) |
|---------|---------------------|---------------------------|
| Coste CPU | Alto (cada 3s) | Bajo (bajo demanda) |
| Complejidad | Media | Baja |
| UX | Automático | Requiere acción usuario |
| Viabilidad | ✅ | ✅ |

**Veredicto**: ✅ Técnicamente viable. El botón REFRESH ya existe en la Panel View.

### 2.2 Punto 2: Tool "help" en MCP

**Viabilidad**: ✅ Trivial de implementar.

```typescript
// Añadir en CopilotLogsMCPServer.ts
{
    name: "help",
    description: "Explica cómo usar las herramientas de Copilot Logs...",
    inputSchema: { type: "object", properties: {} }
}
```

**Veredicto**: ✅ Sin blockers técnicos.

### 2.3 Punto 3: ⚠️ **CASO DE USO CRÍTICO**

#### Supuesto PO-SM:
> "El usuario trabaja 1 hora, al final hace refresh, captura todo"

#### Realidad Técnica (del documento 05_):

```typescript
// CopilotEngine/requestLoggerImpl.ts L393-395
const maxEntries = this._configService.getConfig(ConfigKey.Advanced.RequestLoggerMaxEntries);
if (this._entries.length > maxEntries) {
    this._entries.shift();   // ← ELIMINA EL MÁS ANTIGUO
}
```

**Configuración por defecto**: `maxEntries = 100`

#### Análisis del Caso de Uso

| Escenario | Requests en 1h | `_entries[]` al final | Resultado |
|-----------|----------------|----------------------|-----------|
| Uso ligero | ~20 requests | 20 disponibles | ✅ OK |
| Uso moderado | ~80 requests | 80 disponibles | ✅ OK |
| Uso intensivo | ~150 requests | **Solo últimos 100** | ⚠️ **PÉRDIDA** |
| Uso muy intensivo | ~300 requests | **Solo últimos 100** | ❌ **PÉRDIDA 66%** |

#### ¿Cuántos requests genera una sesión típica?

| Acción | Requests generados |
|--------|-------------------|
| 1 pregunta a Copilot Chat | 1-3 (según tools) |
| 1 inline edit aceptado | 1-2 |
| 1 commit con mensaje AI | 1 |
| 1 code review | 2-5 |

**Estimación conservadora**: 
- 1 hora de trabajo activo ≈ 30-60 interacciones
- 30-60 interacciones × 2 requests/interacción = **60-120 requests**

**Conclusión**: El límite de 100 es **borderline** para sesiones de 1 hora.

### 2.4 Punto 4: Cache = Snapshot Manual

**Viabilidad**: ✅ Conceptualmente sólido.

El refresh capturará TODO lo que esté disponible en `_entries[]` en ese momento.

**Cambio requerido en código**:
```typescript
// CcreqDocumentResolver.ts - Nuevo método
async captureFullSnapshot(): Promise<CcreqDocumentContent[]> {
    const snapshot: CcreqDocumentContent[] = [];
    // Iterar por ccreq:{id}.copilotmd para cada ID en _entries[]
    // (pero no tenemos acceso directo a los IDs...)
}
```

**⚠️ Problema**: No tenemos forma de listar los IDs que SÍ están en `_entries[]`. Solo podemos:
1. Intentar `ccreq:{id}` para cada ID conocido (de disk logs)
2. Los que retornen contenido, cachear

### 2.5 Punto 5: Persistencia en DISCO + Índice Doble

**Viabilidad**: ✅ Ya propuesto en documento 05_.

Estructura propuesta:
```
ARCHIVO/DISCO/COPILOT_SNAPSHOTS/
├── INDEX.md                      # Índice DRY
├── ABSTRACT.md                   # Índice Abstract (resumen semántico)
└── 2026-01-01_sesion-fundacion/
    ├── metadata.json             # { timestamp, requestCount, model, etc }
    ├── snapshot.json             # Array de CcreqDocumentContent
    └── summary.md                # Resumen humano-legible
```

---

## 3. Gap Identificado: Ventana de Captura

### El Problema

```
Tiempo ──────────────────────────────────────────────────────────▶

[Inicio]                                                    [Refresh]
    │                                                           │
    │  ← 150 requests generados en 1 hora →                     │
    │                                                           │
    │  [1-50]    [51-100]   [101-150]                          │
    │     │         │          │                                │
    │     ▼         ▼          ▼                                │
    │  PERDIDOS  PERDIDOS  En _entries[]                        │
    │                         │                                 │
    │                         └──────────────▶ CAPTURADOS       │
```

### Soluciones Posibles

| Opción | Descripción | Esfuerzo | Efectividad |
|--------|-------------|----------|-------------|
| **S1** | Aumentar `maxEntries` en settings | Bajo | Media |
| **S2** | Refresh periódico (cada 15 min) | Bajo | Alta |
| **S3** | Captura incremental (detectar nuevos) | Alto | Alta |
| **S4** | Aceptar limitación, documentar | Ninguno | Baja |

#### S1: Aumentar maxEntries

El usuario puede configurar en `settings.json`:
```json
{
    "github.copilot.chat.debug.requestLogger.maxEntries": 500
}
```

**Pros**: Sin código nuevo  
**Contras**: Más memoria, usuario debe saber configurarlo

#### S2: Refresh Automático Periódico (Opcional)

Mantener la opción de polling pero **desactivado por defecto**:
```json
{
    "aleph-scriptorium.copilotLogs.autoRefreshInterval": 0  // 0 = desactivado
}
```

**Pros**: Captura completa si se activa  
**Contras**: Lo que PO-SM quería evitar

#### S3: Captura Incremental

Hook en `ccreq:latest` para capturar cada request nuevo automáticamente sin polling.

**Problema técnico**: No hay evento de VS Code para "documento virtual cambió".

#### S4: Aceptar y Documentar

Documentar claramente:
> "El snapshot captura los últimos 100 requests. Para sesiones largas, haga refresh cada 30 minutos o aumente `maxEntries` en settings."

---

## 4. Propuesta de Ajuste al Plan

### Plan Original (PO-SM)

1. ~~Refresh manual al final~~
2. Tool help
3. Persistencia en DISCO

### Plan Ajustado (con mitigación del gap)

| # | Acción | Prioridad |
|---|--------|-----------|
| 1 | **Documentar limitación** en tool "help" | P0 |
| 2 | **Añadir config** para aumentar maxEntries en onboarding | P1 |
| 3 | Implementar refresh manual + snapshot | P0 |
| 4 | Persistencia en DISCO con índice doble | P1 |
| 5 | **Opcional**: Auto-refresh configurable (desactivado default) | P2 |

### Texto Propuesto para Tool "help"

```markdown
## Copilot Logs MCP Server - Guía de Uso

### Limitación Importante
Los logs de Copilot Chat se almacenan en memoria con un **límite de 100 requests**.
En sesiones largas (>1 hora de uso intensivo), los requests antiguos se pierden.

### Recomendaciones
1. **Sesiones cortas**: Haga REFRESH al final, capturará todo
2. **Sesiones largas**: Haga REFRESH cada 30 minutos
3. **Aumentar límite**: En settings.json añada:
   ```json
   "github.copilot.chat.debug.requestLogger.maxEntries": 500
   ```

### Herramientas Disponibles
- `get_latest_request`: Obtiene el último request (siempre funciona)
- `list_copilot_requests`: Lista IDs de requests en disco (metadata)
- `get_copilot_request(id)`: Obtiene contenido SI está en memoria
- `export_conversation`: Exporta snapshot actual a archivo
```

---

## 5. Decisión Requerida

### Pregunta para PO-SM

> ¿Aceptamos la limitación de ~100 requests con documentación clara, 
> o implementamos mitigación adicional (auto-refresh opcional)?

| Respuesta | Implicación |
|-----------|-------------|
| **Aceptar limitación** | Menos código, más documentación, usuario informado |
| **Auto-refresh opcional** | Más código, mejor UX para power users |

### Recomendación Técnica

**Aceptar limitación + documentación robusta** es suficiente para el caso de uso del Scriptorium:
- Los usuarios objetivo son desarrolladores que entienden trade-offs
- La limitación viene de Copilot, no de nuestra extensión
- Documentar bien es más mantenible que código adicional

---

## 6. Validación del Caso de Uso (Punto 3)

### Veredicto: ⚠️ **VIABLE CON CONDICIONES**

| Condición | Estado |
|-----------|--------|
| Sesión < 50 requests | ✅ Funciona perfecto |
| Sesión 50-100 requests | ✅ Funciona |
| Sesión > 100 requests | ⚠️ Pérdida de antiguos |
| Usuario configuró maxEntries=500 | ✅ Funciona hasta 500 |

### Flujo Validado

```
1. Usuario arranca Scriptorium           ✅
2. Trabaja 1 hora (~80 requests)         ✅ (dentro del límite)
3. Hace clic en REFRESH                  ✅
4. Sistema captura snapshot              ✅
5. Guarda en DISCO con índice            ✅
6. Puede analizar/exportar               ✅
```

**El caso de uso es viable para uso MODERADO (< 100 requests/sesión).**

---

## 7. Archivos a Crear/Modificar

| Archivo | Cambio | Prioridad |
|---------|--------|-----------|
| `CopilotLogsMCPServer.ts` | + Tool "help" con descripción detallada | P0 |
| `CopilotLogExporterService.ts` | + Método `captureSnapshot()` | P0 |
| `commands.ts` | Hook REFRESH → `captureSnapshot()` | P0 |
| `DISCO/COPILOT_SNAPSHOTS/` | Nueva carpeta + INDEX.md | P1 |
| `extension.ts` | Setting para auto-refresh (opcional) | P2 |

---

## Referencias

- [05_solucion-arquitectonica-propuesta.md](./05_solucion-arquitectonica-propuesta.md): Opciones A/B/C
- [06_estudio-viabilidad-opcion-b.md](./06_estudio-viabilidad-opcion-b.md): API no expuesta
- [04_correccion-bug-verificacion-empirica.md](./04_correccion-bug-verificacion-empirica.md): Bug confirmado
- [CopilotEngine/requestLoggerImpl.ts#L393](../../../../../CopilotEngine/src/extension/prompt/vscode-node/requestLoggerImpl.ts#L393): Límite maxEntries
