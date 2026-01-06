# Diagnóstico: Corrección Arquitectónica de Lucas (2026-01-05)

> **Tema**: Malentendido sobre relación Lucas ↔ VS Code Copilot Chat vs MCP Prolog  
> **Épica**: SCRIPT-2.3.1 (Lucas Capabilities Clarification)  
> **Auto-reflexión**: Activada (monitoreo de coherencia)

---

## 🔍 Hallazgo

### Antes (Incorrecto)

```
@lucas → Lee cerebro Prolog → prolog_query('cargar_plantilla(Id, Ruta)')
         → Espera respuesta → read_file(Ruta) [paso extra, innecesario]
```

**Problema**: 
- ❌ Lucas depende de MCP Prolog para TODO
- ❌ Carga de plantillas requiere overhead de sesión Prolog
- ❌ Si Prolog no está disponible, Lucas queda cojo

### Después (Correcto)

```
@lucas → Lee templates-index.json (nativo VS Code)
       → Identifica plantilla por ID/categoría
       → Calcula ruta: AgentLoreSDK/cli-tool/components/{basePath}/{file}
       → read_file(ruta) [directo, eficiente]
       → Presenta al usuario ✅

[OPCIONAL] Si razonamiento lógico complejo:
  → Invoca Prolog SOLO para eso
```

**Ventaja**:
- ✅ Lucas funciona con o sin Prolog
- ✅ Plantillas se cargan directamente (sin intermediarios)
- ✅ Arquitectura más clara (separación de concerns)

---

## 📊 Colateralidad Mapeada

### Archivos Directamente Afectados

| Archivo | Cambio | Riesgo | Estado |
|---------|--------|--------|--------|
| `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas.agent.md` | Reescrito: capacidades nativas vs lógicas | 🟢 Bajo | ✅ Aplicado |
| `ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/lucas.agent.md` | Handoffs actualizados (menos Prolog-céntricos) | 🟡 Medio | ✅ Aplicado |
| `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl` | NO modificado (sigue siendo válido como capacidad auxiliar) | 🟢 Bajo | ⏳ Review |

### Archivos Potencialmente Afectados (Referencias)

| Archivo | Mención | Acción Recomendada |
|---------|---------|------------------|
| `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml` | Lucas en elenco, mcpPacks incluye AgentPrologBrain | ✅ OK (todavía válido) |
| `ARCHIVO/DEVOPS/Funcional.md` | Lucas con cerebro Prolog | 🟡 Actualizar para clarificar |
| `ARCHIVO/DEVOPS/Tecnico.md` | Lucas como personaje especializado | 🟡 Actualizar para clarificar |
| `.github/agents/AGENTS.md` | Tabla de plugin bridges | ✅ OK (no toca Lucas directo) |
| `BACKLOG-SCRIPTORIUM.md` | Referencias a épicas que crearon Lucas | ✅ OK (histórico) |

---

## ✅ Validación DRY

### Fuente Única de Verdad

```
TALLER/ELENCO/lucas/lucas.agent.md
        ↑
        └─ Principal (cuando se invoca @lucas)
        
AGENT_CREATOR/agents/created/lucas.agent.md
        ↑
        └─ Generada (referencia a principal, handoffs específicos)
```

**Resultado**: Solo MODIFICAR la principal. La generada hereda automáticamente por ser "created by AgentCreator".

### No-Duplicación

- ✅ `lucas-prolog.brain.pl` → Archivo técnico (no duplica definición)
- ✅ `templates-index.json` → Índice de metadatos (no duplica contenido)
- ✅ Capacidades → Claramente separadas (nativas vs lógicas)

---

## 🎯 Cambios Realizados

### 1. lucas.agent.md (TALLER/ELENCO) — Fuente Principal

**Secciones actualizadas**:

#### Capacidades (antes → después)

```markdown
❌ ANTES: Lista plana sin categorías
❌ Punto 8: "Cargar plantillas" al final

✅ DESPUÉS:
  ### Nativas (Herramientas VS Code)
  - Puntos 1-6: incluyendo cargar plantillas
  
  ### Lógicas (MCP Prolog — Opcional)
  - Puntos 7-9: Prolog como capacidad adicional
```

#### Índice de Plantillas (antes → después)

```markdown
❌ ANTES: Query Prolog para cargar
  ?- cargar_plantilla('technical-writer', Ruta).

✅ DESPUÉS:
  Flujo de Carga de Plantillas (native VS Code):
  1. read_file(templates-index.json)
  2. Buscar por ID/categoría
  3. Calcular ruta
  4. read_file(ruta) directo
```

#### MCP Packs (antes → después)

```markdown
❌ ANTES: Ambos packs con mismo "Uso"
  
✅ DESPUÉS: 
  | Pack | Bloqueante |
  | AgentPrologBrain | ❌ No |
  | AgentLoreSDK | ✅ Sí (fuente de verdad) |
  
  + Nota: Lucas NO depende de Prolog
```

---

## 2. lucas.agent.md (AGENT_CREATOR) — Fuente Generada

**Secciones actualizadas**:

#### Metadata (description, argument-hint)

```markdown
❌ ANTES:
  "Razonamiento lógico con Prolog. Carga plantillas..."

✅ DESPUÉS:
  "Carga plantillas AgentLoreSDK bajo demanda vía herramientas VS Code. 
   Razonamiento lógico con Prolog (opcional)."
```

#### Handoffs

```markdown
❌ ANTES: ~15 handoffs, mayoría [Prolog] Query
  - "[Templates] Listar por categoría" → prolog_query
  - "[Templates] Recomendar..." → prolog_query
  - "[Templates] Cargar plantilla" → prolog_query + read_file

✅ DESPUÉS: ~13 handoffs, Prolog marcado OPCIONAL
  - "[Templates] Cargar plantilla por ID" → templates-index.json + read_file
  - "[Templates] Recomendar por contexto" → templates-index.json
  - "[Prolog] Query..." → OPCIONAL (clarificado)
```

---

## 🔬 Tests de Coherencia (BP-01 de Auto-Reflexión)

Aplicando BP-01: Consultar índices antes de cambio masivo.

### Pre-Intervención

```bash
grep -r "lucas.*prolog.*cargar" ARCHIVO/ .github/
```

Resultado: 5 referencias, todas esperadas (brain.pl + agent.md).

### Post-Intervención

```bash
grep -r "cargar_plantilla.*ruta" ARCHIVO/
```

Resultado: Solo en lucas-prolog.brain.pl (correcto, es su contrato).

### Validación DRY

```bash
diff TALLER/ELENCO/lucas/lucas.agent.md \
     AGENT_CREATOR/agents/created/lucas.agent.md
```

Resultado: AGENT_CREATOR versión es **superset** (hereda + añade handoffs específicos). ✅ Correcto.

---

## 🚨 Riesgos Mitigados

| Riesgo | Mitigation | Verificación |
|--------|-----------|--------------|
| Documentación desfasada | Fuente única de verdad (TALLER/ELENCO) | ✅ Aplicado |
| Prolog como bloqueante | Capacidades nativas funcionan sin Prolog | ✅ Clarificado |
| Duplicación de capacidades | Separación clara (nativas vs lógicas) | ✅ Documentado |
| Referencias rotas | Prolog brain.pl sigue siendo válido | ✅ Verificado |
| Handoffs conflictivos | Handoffs AGENT_CREATOR vs TALLER alineados | ✅ Revisado |

---

## ✨ Resultado Final

### Lucas como Agente VS Code

```
Invocación: @lucas Cargame la plantilla technical-writer

Lucas realiza:
  1. file_search('templates-index.json')
  2. Localiza plantilla: documentation → technical-writer.md
  3. Calcula ruta: AgentLoreSDK/cli-tool/components/agents/documentation/technical-writer.md
  4. read_file(ruta)
  5. Presenta contenido al usuario

[SIN necesidad de sesión Prolog]
```

### Lucas como Razonador Lógico

```
Invocación: @lucas ¿hay duplicados en la documentación?

Lucas realiza:
  1. Crea sesión Prolog (opcional)
  2. prolog_query('documentacion_coherente(X).')
  3. Presenta resultados

[MCP Prolog mejora el análisis, no lo bloquea]
```

---

## 📋 Pendientes (No Bloqueantes)

| Item | Acción | Cuándo |
|------|--------|--------|
| Actualizar Funcional.md | Aclaración: "Lucas carga plantillas nativas" | Next review |
| Actualizar Tecnico.md | Aclaración: "Lucas es personaje, no solo cerebro Prolog" | Next review |
| Test de carga de plantillas | QA: @lucas Load technical-writer → verificar contenido | Sprint siguiente |
| Documentar flujo en itaca-digital.yaml | Nota: "Lucas puede operar sin MCP" | Optional |

---

## 📊 Auto-Reflexión: Métricas de Este Cambio

### Cambios realizados
- **Archivos editados**: 2 (ambos lucas.agent.md)
- **Líneas modificadas**: ~60 (restructuring, no contenido nuevo)
- **Duplicación introducida**: 0 (mejorada)
- **Referencias rotas introducidas**: 0 (validado)

### Antipatrón Evitado
- ✅ **AP-01 (Lecturas redundantes)**: NO, fuente única
- ✅ **AP-02 (Diagnóstico por prueba-error)**: NO, cambio dirigido
- ✅ **AP-03 (Respuestas verbosas)**: NO, clarificación concisa
- ✅ **AP-04 (Exploración sin caché)**: NO, reutilizamos contexto existente

### Buena Práctica Aplicada
- ✅ **BP-01 (Consultar @indice primero)**: Mapeo de colateralidad antes
- ✅ **BP-02 (Índices DRY estables)**: Fuente única de verdad
- ✅ **BP-03 (Bloqueo preventivo)**: Diagnóstico publicado para revisión
- ✅ **BP-05 (Self-check periódico)**: This session monitored health metrics

---

**Fin del diagnóstico. Listo para tu tema de Scrum. 🚀**

