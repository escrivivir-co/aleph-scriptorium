# Conversación PO-SM: N8N Editor

**Fecha**: 2025-12-24  
**Submódulo**: `alephscript-n8n-like-editor`  
**Plugin objetivo**: `n8n-editor`  
**Modo**: Autónomo (continuar sin pausas)

---

## Análisis Técnico (SM)

### Inventario del Submódulo

| Aspecto | Detalle |
|---------|---------|
| **Framework** | Angular 18 + Angular Material + SSR |
| **Canvas** | D3.js para visualización de flujos |
| **Editor** | Monaco Editor para código |
| **MCP** | Integración nativa (tipos, servicios, UI) |
| **Comandos** | Sistema undo/redo completo |
| **Persistencia** | Import/Export JSON workflows |
| **AI** | Nodos especializados (LLM, RAG, MCP, etc.) |

### Comparación con Plugins Similares

| Plugin | Tecnología | Canvas | MCP | Target |
|--------|------------|--------|-----|--------|
| **BlocklyEditor** | Blockly + JS | Bloques | Via presets | JavaScript |
| **WireEditor** | Node-RED | Nodos | Indirecta | Flows JSON |
| **PrologEditor** | SWI-Prolog | Texto | No | Reglas Prolog |
| **N8NEditor** | Angular + D3 | Nodos visuales | **Nativo** | **n8n + JSON** |

### Diferenciador Clave

N8NEditor tiene **integración MCP nativa** a nivel de tipos, servicios y UI. Los otros plugins requieren adapters o integración manual.

### Gaps Identificados

| ID | Gap | Descripción | Prioridad |
|----|-----|-------------|-----------|
| G1 | Templates Scriptorium | No hay workflows predefinidos para casos de uso del Scriptorium | Must |
| G2 | TypedPrompting Bridge | Falta validación de exports con schemas | Should |
| G3 | Presets → Servidores | No hay mapeo automático de presets MCP como servidores | Should |
| G4 | Teatro Integration | Visualización de ejecución en Teatro | Could |
| G5 | n8n API Export | Publicar directamente a instancia n8n | Could |

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| R1: SSR complejidad | Baja | Medio | Documentar modo standalone |
| R2: Puertos ocupados | Media | Bajo | Variables de entorno |
| R3: Dependencias pesadas (D3, Monaco) | Baja | Bajo | Build optimizado |
| R4: Tipos MCP incompatibles | Baja | Medio | Alinear con TypedPrompting |

---

## Visión de Producto (PO)

### Propuesta de Valor

> **El N8N Editor es el puente entre el diseño visual de workflows y la automatización real.**

Permite a usuarios no técnicos diseñar flujos complejos que:
1. Integran herramientas MCP del Scriptorium
2. Se validan con TypedPrompting
3. Se exportan a n8n para ejecución
4. Se visualizan en el Teatro

### Casos de Uso Objetivo

| UC | Descripción | Prioridad |
|----|-------------|-----------|
| UC1 | Diseñar workflow de auditoría (5 banderas) | Must |
| UC2 | Importar/exportar workflows n8n | Must |
| UC3 | Inyectar presets MCP como servidores | Should |
| UC4 | Visualizar ejecución en Teatro | Could |

### Criterios de Éxito

- [ ] Plugin instalado y bridge funcional
- [ ] Al menos 2 templates predefinidos (auditoría, scraping)
- [ ] Documentación de integración con TypedPrompting
- [ ] Ejemplo de export → n8n funcionando

### Perfil de Usuario

| Perfil | Uso |
|--------|-----|
| **Desarrollador** | Diseñar flujos complejos con nodos AI/MCP |
| **Productor** | Automatizar tareas de producción textual |
| **Técnico** | Conectar fuentes externas y validar datos |

---

## Decisiones

### D1: Nombre del Plugin

**Decisión**: `n8n-editor`

**Rationale**: Claro, conciso, indica función (editor de workflows estilo n8n)

### D2: Estructura de Dos Pasos

**Decisión**: Adoptar patrón de BlocklyEditor/WireEditor/PrologEditor

**Rationale**: Consistencia con otros editores del Scriptorium
- Paso 1 (Asistente): Transportar ontología, presets, templates
- Paso 2 (Gestor): Crear, editar, exportar workflows

### D3: Integración Principal

**Decisión**: TypedPrompting como validador de exports

**Rationale**: 
- Los workflows se exportan como JSON
- TypedPrompting valida JSON con schemas
- Flujo natural: Editor → JSON → Validación → n8n

### D4: Templates Predefinidos

**Decisión**: Crear 2 templates en FC1

1. **workflow-auditoria.json**: Flujo de 5 banderas
2. **workflow-scraping.json**: Flujo ForoScraper → procesamiento

**Rationale**: Casos de uso reales del Scriptorium

---

## Estimación

### Feature Cycle 1 (FC1)

| Story | Descripción | Puntos |
|-------|-------------|--------|
| S01 | Estructura del plugin | 2 |
| S02 | Agente y prompts básicos | 3 |
| S03 | Bridge agent | 2 |
| S04 | Templates predefinidos | 3 |
| S05 | Integración TypedPrompting | 3 |
| S06 | Documentación | 2 |
| **Total FC1** | | **15 pts** |

### Feature Cycle 2 (FC2) — Futuro

| Story | Descripción | Puntos |
|-------|-------------|--------|
| S07 | Presets MCP → Servidores automático | 5 |
| S08 | Visualización en Teatro | 5 |
| S09 | Export directo a n8n API | 5 |
| **Total FC2** | | **15 pts** |

---

## Siguiente Paso

✅ **Modo autónomo**: Continuar a Fase 5 (Generar backlog borrador)
