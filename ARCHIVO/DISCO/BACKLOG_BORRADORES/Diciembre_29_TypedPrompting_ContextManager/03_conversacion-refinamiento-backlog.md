# Conversación de Refinamiento: TypedPrompting Context Manager

> **Épica**: SCRIPT-2.1.0  
> **Fecha**: 2025-12-29  
> **Contexto**: Segunda parte de [02_evidence_agent_logs_and_refactor.md](02_evidence_agent_logs_and_refactor.md)

## Participantes

| Rol | Agente | Responsabilidad |
|-----|--------|-----------------|
| **PO** | Product Owner | Visión de producto, priorización |
| **SM** | @scrum | Facilitador, gestión de backlog |
| **DEV** | Lucas | Perspectiva técnica, implementación |
| **ORACLE** | @ox | Coherencia con índice de agentes |
| **NAV** | @indice | Resolución de rutas y dependencias |
| **PROD** | @aleph | Orquestación de ejecución |

---

## Sesión de Refinamiento

### 🎬 Apertura

**SM (@scrum)**: Buenos días equipo. El PO ha traído un documento con mucha carga de análisis — la segunda parte de la auditoría del log de Copilot Chat. El objetivo de hoy es desgranar esas propuestas en backlog items ejecutables. 

¿PO, cuál es tu visión principal?

---

**PO**: Tengo mucha fe en lo que hemos descubierto. El análisis revela que estamos consumiendo **127K tokens por request** — el 99% del límite — cuando el usuario solo pedía "crear un blueprint". 

La propuesta tiene 5 épicas candidatas:

| ID propuesto | Nombre | Esfuerzo |
|--------------|--------|----------|
| SCRIPT-2.1.0 | TypedPrompting Context Manager | 5 pts |
| SCRIPT-2.2.0 | MCP Resources Schema | 3 pts |
| SCRIPT-2.3.0 | Context Packs System | 5 pts |
| SCRIPT-2.4.0 | MCPGallery Integration | 3 pts |
| SCRIPT-2.5.0 | Dynamic Tool Filtering | 8 pts |

Quiero entender qué es viable y cómo ordenarlo.

---

### 📊 Análisis por Agente

**SM**: Perfecto. Vamos a recorrer cada propuesta con la perspectiva de cada agente. @indice, empecemos contigo — ¿qué te dice el sistema de resolución de rutas sobre la propuesta SCRIPT-2.1.0?

---

**@indice**: Mi dominio es resolver **dónde está cada cosa**. Actualmente, cuando el usuario invoca `@aleph crea blueprint X`, yo no intervengo antes de que CopilotEngine construya el system message.

El documento propone que YO resuelva el **foco activo** del usuario:

```typescript
interface ContextRequest {
  foco: {
    dominio: 'blueprint' | 'plugin' | 'scrum' | 'teatro';
    operacion: 'crear' | 'editar' | 'auditar';
  };
}
```

**Esto me parece correcto** porque:

1. Ya mantengo `Funcional.md` y `Tecnico.md` como índices DRY
2. Puedo mapear `dominio: blueprint` → `[gh-pages.instructions, blueprint-templates.instructions]`
3. Retornaría solo **2-5 instrucciones** en lugar de las **19 actuales**

**Pregunta al equipo**: ¿Dónde almaceno el mapeo `dominio → instrucciones`?

---

**@ox**: Intervengo aquí. Ese mapeo debería vivir en **registry.json** o en un nuevo `context-packs.json`. 

Actualmente `registry.json` tiene:

```json
{
  "plugins": [...],
  "bridges": [...]
}
```

Podemos extenderlo:

```json
{
  "contextPacks": {
    "blueprint": {
      "instructions": ["gh-pages", "blueprint-templates"],
      "tools": ["create_file", "replace_string_in_file"]
    }
  }
}
```

Esto mantiene la **coherencia ontológica** — el oráculo sabe qué herramientas necesita cada dominio.

---

**Lucas (DEV)**: Me preocupa el acoplamiento. Si metemos el mapeo en registry.json, cada plugin nuevo debe modificar ese archivo central. 

**Propuesta alternativa**: Que cada plugin declare sus "triggers" en su `manifest.md`:

```yaml
# En .github/plugins/gh-pages/manifest.md
contextTriggers:
  - dominio: blueprint
  - dominio: publishing
  - operacion: publicar
```

Así @indice puede escanear todos los manifests y construir el mapa dinámicamente.

---

**@aleph**: Desde el punto de vista de la **ejecución**, esto me simplifica la vida enormemente. Actualmente recibo 47 herramientas en cada request — la mayoría nunca las uso.

Con el filtrado propuesto, para `blueprint`:
- Recibo: `create_file, replace_string_in_file, run_in_terminal, mcp_playwright_browser_snapshot` (5 tools)
- Ignoro: 42 herramientas de Playwright que no necesito

**Pregunta crítica**: ¿CopilotEngine permite filtrar tools dinámicamente o están hardcodeados?

---

**Lucas (DEV)**: Según el análisis del documento, CopilotEngine construye las tools en `messagesApi.ts`. El flujo es:

```
1. extensionHost recoge ALL registered tools
2. messagesApi las serializa TODAS al JSON del system message
3. Claude recibe las 47 definiciones
```

Para filtrar, necesitaríamos **interceptar** antes del paso 2. Eso es SCRIPT-2.5.0 (8 puntos) — es invasivo.

**Mi recomendación**: SCRIPT-2.1.0 y 2.3.0 primero. Reducimos instrucciones (el 80% del bloat) y dejamos tools para después.

---

### ⚖️ Priorización

**SM**: Bien, estamos convergiendo. Hagamos un ejercicio de priorización. PO, ¿cuál es el criterio?

---

**PO**: El criterio es **impacto en tokens / esfuerzo**. Según el análisis:

| Épica | Tokens reducidos | Esfuerzo | Ratio |
|-------|------------------|----------|-------|
| SCRIPT-2.1.0 | ~40K | 5 pts | 8K/pt |
| SCRIPT-2.3.0 | ~25K | 5 pts | 5K/pt |
| SCRIPT-2.2.0 | ~10K | 3 pts | 3.3K/pt |
| SCRIPT-2.4.0 | ~10K | 3 pts | 3.3K/pt |
| SCRIPT-2.5.0 | ~30K | 8 pts | 3.7K/pt |

**Orden propuesto**: 2.1.0 → 2.3.0 → 2.2.0 → 2.4.0 → 2.5.0

---

**@indice**: Tengo una observación sobre dependencias. Mirando el `Tecnico.md`, hay submódulos que deberíamos considerar:

| Submódulo | Relevancia |
|-----------|------------|
| `CopilotEngine/` | Fuente de verdad para hooks |
| `TypedPromptsEditor/` | UI para schemas |
| `MCPGallery/` | Presets de tools |
| `OnthologyEditor/` | Paradigma FVE |

SCRIPT-2.2.0 (MCP Resources Schema) depende de entender cómo `MCPGallery` define sus presets. ¿Deberíamos invertir el orden 2.2.0 ↔ 2.3.0?

---

**@ox**: Comparto la dependencia. Pero MCPGallery ya tiene un schema funcional en `preset.json`. Podemos **reusar** en lugar de reinventar.

Mi recomendación:
1. **SCRIPT-2.1.0**: Context Manager (core) — 5 pts
2. **SCRIPT-2.3.0**: Context Packs (configuración) — 5 pts
3. **SCRIPT-2.2.0 + 2.4.0 fusionados**: MCP Integration — 5 pts (reusando MCPGallery)
4. **SCRIPT-2.5.0**: Tool Filtering (invasivo) — diferido a FC2

---

**SM**: @ox propone fusionar 2.2.0 y 2.4.0. ¿El equipo está de acuerdo?

**Lucas (DEV)**: Me parece bien. El schema de MCP Resources y la integración de MCPGallery son dos caras de la misma moneda.

**@aleph**: De acuerdo. Prefiero menos épicas mejor definidas.

**PO**: Acepto la fusión. Quedamos en **4 épicas** para FC1.

---

### 📋 Backlog Refinado

**SM**: Perfecto. Resumo el backlog refinado:

---

## Feature Cycle 1: TypedPrompting Context Manager

| # | Épica | Nombre | Effort | Deps | Owner |
|---|-------|--------|--------|------|-------|
| 1 | SCRIPT-2.1.0 | Context Manager Core | 5 pts | — | @indice |
| 2 | SCRIPT-2.3.0 | Context Packs System | 5 pts | 2.1.0 | @ox |
| 3 | SCRIPT-2.2.4 | MCP Integration (fusión) | 5 pts | 2.3.0 | Lucas |
| — | SCRIPT-2.5.0 | Dynamic Tool Filtering | 8 pts | FC2 | — |

**Total FC1**: 15 pts

---

### 📝 Desglose de Stories

#### SCRIPT-2.1.0: Context Manager Core

| Story | Descripción | Effort |
|-------|-------------|--------|
| S01 | Definir `ContextRequest` schema en TypedPrompting | 2 pts |
| S02 | Implementar `@indice.resolverFoco()` como handoff | 2 pts |
| S03 | Hook en conversación: llamar a @indice antes de LLM | 1 pt |

**Criterio de aceptación**:
- [ ] Schema validado con `mode: warn`
- [ ] @indice retorna array de instrucciones filtradas
- [ ] Tokens por request reducidos >30%

---

#### SCRIPT-2.3.0: Context Packs System

| Story | Descripción | Effort |
|-------|-------------|--------|
| S01 | Extender manifest.md con `contextTriggers` | 1 pt |
| S02 | Crear `context-packs.json` agregando triggers | 2 pts |
| S03 | Modificar `settings.json` para activar packs | 1 pt |
| S04 | Documentar en `Tecnico.md` | 1 pt |

**Criterio de aceptación**:
- [ ] Cada plugin declara sus triggers
- [ ] @ox puede validar coherencia de packs
- [ ] Script `activate-pack.sh` funcional

---

#### SCRIPT-2.2.4: MCP Integration

| Story | Descripción | Effort |
|-------|-------------|--------|
| S01 | Mapear `MCPGallery/preset.json` a TypedPrompting | 2 pts |
| S02 | Añadir `resource://` URIs al schema | 1 pt |
| S03 | Crear preset `devops-tools` como ejemplo | 1 pt |
| S04 | Integrar con @aleph para ejecución | 1 pt |

**Criterio de aceptación**:
- [ ] Presets de MCPGallery importables como packs
- [ ] Resources MCP validados por schema
- [ ] @aleph puede invocar preset por nombre

---

### 🔄 Resolución de Dudas

**@indice**: Tengo una duda operativa. El documento menciona que CopilotEngine usa `onDidChangeConfiguration` para recargar instrucciones. ¿Esto significa que NO necesitamos reiniciar VS Code?

**Lucas (DEV)**: Correcto. Según `customInstructionsService.ts`:

```typescript
observableFromEvent(
    (handleChange) => this._register(
        configurationService.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration(INSTRUCTIONS_LOCATION_KEY)) {
                handleChange(e);  // ← SE REFRESCA SIN REINICIAR
            }
        })
    )
)
```

Cuando cambiamos `settings.json`, el observable dispara. **No hay que reiniciar**.

**Excepción**: Si añadimos un nuevo archivo `.agent.md`, puede requerir `Developer: Reload Window`.

---

**@ox**: Pregunta de coherencia. Si fusionamos 2.2.0 + 2.4.0, ¿qué pasa con el ID SCRIPT-2.2.4? ¿Es válido?

**SM**: Propongo usar el ID de la épica principal con sufijo: `SCRIPT-2.2.4` (2.2 + 2.4 fusionados). El `.4` indica la fusión.

**PO**: Me parece bien. Mantiene trazabilidad.

---

### 🎯 Compromisos

**SM**: Cerramos la sesión. Cada agente confirme su compromiso:

| Agente | Compromiso |
|--------|-----------|
| **@indice** | Implementar `resolverFoco()` con mapeo dominio→instrucciones |
| **@ox** | Validar coherencia de packs y mantener `context-packs.json` |
| **@aleph** | Orquestar ejecución con contexto reducido |
| **Lucas** | Investigar hooks de CopilotEngine para integración MCP |
| **PO** | Priorizar y validar acceptance criteria |
| **SM** | Actualizar índice DRY y tracking |

---

**PO**: Antes de cerrar — ¿podemos proyectar el impacto?

**@indice**: Según el análisis del documento:

| Métrica | Antes | Después FC1 | Mejora |
|---------|-------|-------------|--------|
| Tokens/request | 127K | ~50K | -60% |
| Instrucciones | 19 | 3-5 | -75% |
| Time to first token | 55s | ~20s | -65% |
| Tools inyectados | 47 | 47 (sin cambio hasta 2.5.0) | 0% |

**PO**: Excelente. Eso justifica la inversión de 15 puntos en FC1.

---

### ✅ Cierre

**SM**: Sesión cerrada. Resumen de acciones:

1. ✅ Refinado backlog a 4 épicas (3 en FC1, 1 diferida)
2. ✅ Desglosadas 10 stories con effort
3. ✅ Identificadas dependencias con submódulos
4. ✅ Clarificado comportamiento de CopilotEngine (no reinicio)
5. ✅ Fusionadas épicas 2.2.0 + 2.4.0

**Próximo paso**: Crear `01_backlog-borrador.md` con el desglose completo de tasks.

---

## Anexo: Diagrama de Dependencias

```
SCRIPT-2.1.0 (Context Manager)
     │
     ├── @indice.resolverFoco()
     │         │
     │         ├── Lee: manifest.md de cada plugin
     │         └── Retorna: instrucciones filtradas
     │
     └── Habilita: SCRIPT-2.3.0
                      │
                      ├── context-packs.json
                      ├── settings.json updates
                      │
                      └── Habilita: SCRIPT-2.2.4
                                       │
                                       ├── MCPGallery/preset.json
                                       ├── TypedPrompting schemas
                                       │
                                       └── [FC2] SCRIPT-2.5.0
                                                   │
                                                   └── Tool filtering (invasivo)
```

---

## Anexo: Ubicaciones según Tecnico.md

| Artefacto | Ubicación canónica |
|-----------|-------------------|
| Schema ContextRequest | `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/` |
| context-packs.json | `.github/plugins/registry.json` (extensión) |
| MCP Presets | `MCPGallery/` + `.github/plugins/mcp-presets/` |
| Instrucciones filtradas | `.github/plugins/*/instructions/` |
| Handoff resolverFoco | `.github/agents/indice.agent.md` |

---

*Conversación generada por @scrum siguiendo protocolo DRY*
