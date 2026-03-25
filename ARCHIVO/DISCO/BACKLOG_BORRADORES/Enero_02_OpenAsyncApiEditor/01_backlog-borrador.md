# Épica: OpenAsyncAPI Editor Plugin

> **ID**: PLUGIN-OPENASYNCAPI-1.0.0  
> **Sprint**: FC1  
> **Fecha creación**: 2026-01-02  
> **Estado**: 📋 Planificación

---

## 1. Resumen Ejecutivo

### Objetivo

Crear un plugin para gestionar el catálogo de especificaciones OpenAPI y AsyncAPI del Scriptorium, incluyendo:
- Catalogación centralizada de APIs
- Guías de instalación de UIs (Swagger, AsyncAPI Studio)
- Generación de código cliente/servidor

### Valor

| Beneficio | Impacto |
|-----------|---------|
| **Documentación unificada** | Todas las APIs del ecosistema en un catálogo |
| **Onboarding acelerado** | Guías paso a paso para UIs locales |
| **Automatización** | Generación de código desde specs |
| **Consistencia** | Validación centralizada |

---

## 2. Verificación de Protocolo

### ✅ Checklist @ox (Viabilidad Técnica)

| Requisito | Estado | Notas |
|-----------|--------|-------|
| Estructura de plugin válida | ✅ | Sigue template de scrum |
| manifest.md con frontmatter | ✅ | Todas las propiedades |
| Agente con handoffs | ✅ | 12 handoffs definidos |
| Bridge agent creado | ✅ | `plugin_ox_openasyncapieditor` |
| Directorio de datos | ✅ | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/` |
| Instrucciones contextuales | ✅ | 2 instrucciones |
| Prompts de workflow | ✅ | 5 prompts |

### ✅ Checklist @indice (Coherencia Estructural)

| Archivo | Ubicación | Estado |
|---------|-----------|--------|
| manifest.md | `.github/plugins/openasyncapi-editor/` | ✅ |
| Agent | `.github/plugins/openasyncapi-editor/agents/` | ✅ |
| Bridge | `.github/agents/plugin_ox_openasyncapieditor.agent.md` | ✅ |
| Datos | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/` | ✅ |
| catalog.json | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/` | ✅ |

### ✅ Checklist @scrum (Proceso)

| Criterio | Estado |
|----------|--------|
| DoR: Componentes verificados | ✅ |
| DoR: Gap analysis documentado | ✅ (ver sección 3) |
| DoR: Estimación por implementador | ✅ |
| Tasks atómicas definidas | ✅ |

---

## 3. Gap Analysis

### Capacidades Existentes

| Capacidad | Fuente | Reutilizable |
|-----------|--------|--------------|
| Specs de ejemplo | PROLOG-API-1.0.0 | ✅ openapi.yaml, asyncapi.yaml |
| Estructura de plugin | scrum, typed-prompting | ✅ Template |
| Bridge pattern | Todos los plugins | ✅ Patrón establecido |

### Gaps Identificados

| Gap | Impacto | Mitigación |
|-----|---------|------------|
| CLIs no instalados | Bloquea generación | Task T2.1 de setup |
| Sin copias locales | Sin sync automático | Catálogo apunta a origen |
| Sin CI/CD | Manual | Futuro: GitHub Action |

---

## 4. Plan de Iteraciones

### Iteración 1: Plugin Core (Effort: 5)

| Task ID | Descripción | DoD | Estado |
|---------|-------------|-----|--------|
| T1.1 | Crear estructura `.github/plugins/openasyncapi-editor/` | Carpeta con manifest + agent | ✅ |
| T1.2 | Crear manifest.md con frontmatter completo | Validable por pluginmanager | ✅ |
| T1.3 | Crear agente openasyncapi-editor.agent.md | 12 handoffs funcionales | ✅ |
| T1.4 | Crear bridge `plugin_ox_openasyncapieditor.agent.md` | En `.github/agents/` | ✅ |
| T1.5 | Crear instrucción `openasyncapi-protocol.instructions.md` | Con applyTo correcto | ✅ |
| T1.6 | Crear instrucción `codegen-templates.instructions.md` | Guías de generación | ✅ |

**Entregable**: Plugin instalable con estructura completa

### Iteración 2: Catálogo y Datos (Effort: 3)

| Task ID | Descripción | DoD | Estado |
|---------|-------------|-----|--------|
| T2.1 | Crear `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/` | Directorio de datos | ✅ |
| T2.2 | Crear `catalog.json` con specs de PrologEditor | 2 specs catalogadas | ✅ |
| T2.3 | Crear `catalog.schema.json` | Schema validable | ✅ |
| T2.4 | Crear README.md del directorio de datos | Documentación | ✅ |

**Entregable**: Catálogo inicializado con ejemplo funcional

### Iteración 3: Prompts de Workflow (Effort: 3)

| Task ID | Descripción | DoD | Estado |
|---------|-------------|-----|--------|
| T3.1 | Crear `catalogar-spec.prompt.md` | Flujo de añadir spec | ✅ |
| T3.2 | Crear `validar-spec.prompt.md` | Flujo de validación | ✅ |
| T3.3 | Crear `generar-cliente.prompt.md` | Flujo de codegen | ✅ |
| T3.4 | Crear `setup-swagger-ui.prompt.md` | Guía Swagger UI | ✅ |
| T3.5 | Crear `setup-asyncapi-studio.prompt.md` | Guía AsyncAPI Studio | ✅ |

**Entregable**: 5 prompts de workflow operativos

### Iteración 4: Registro y Activación (Effort: 2)

| Task ID | Descripción | DoD | Estado |
|---------|-------------|-----|--------|
| T4.1 | Actualizar `registry.json` | Plugin registrado | 📋 |
| T4.2 | Actualizar `PLUGINS.md` tabla de bridges | Nueva fila | 📋 |
| T4.3 | Actualizar `AGENTS.md` | Bridge listado | 📋 |
| T4.4 | Actualizar `settings.json` (disabled por defecto) | Entrada añadida | 📋 |
| T4.5 | Commit según DEVOPS.md | `feat(script/plugins): instalar plugin openasyncapi-editor v1.0.0` | 📋 |

**Entregable**: Plugin completamente instalado

### Iteración 5: Verificación y Docs (Effort: 2)

| Task ID | Descripción | DoD | Estado |
|---------|-------------|-----|--------|
| T5.1 | Test: `@pluginmanager status` | Plugin visible | 📋 |
| T5.2 | Test: `@plugin_ox_openasyncapieditor listar` | Muestra catálogo | 📋 |
| T5.3 | Test: Handoffs funcionan | Delegación correcta | 📋 |
| T5.4 | Actualizar backlog a ✅ | Cierre de épica | 📋 |

**Entregable**: Plugin verificado y documentado

---

## 5. Métricas de Éxito

| Métrica | Target | Medición |
|---------|--------|----------|
| Archivos creados | 15+ | `find .github/plugins/openasyncapi-editor` |
| Handoffs funcionales | 12 | Test manual |
| Specs catalogadas | 2+ | `catalog.json` |
| Prompts operativos | 5 | Verificación |

---

## 6. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| CLIs requieren Java | Media | Alto | Documentar alternativa Docker |
| Schema validation fails | Baja | Medio | Schema flexible |
| Context bloat por specs grandes | Media | Medio | Solo catalogar, no copiar |

---

## 7. Dependencias

| Dependencia | Tipo | Estado |
|-------------|------|--------|
| PROLOG-API-1.0.0 | Spec de ejemplo | ✅ Completado |
| Plugin scrum | Template | ✅ Existente |
| registry.json | Sistema | ✅ Existente |

---

## 8. Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-02 | Crear épica PLUGIN-OPENASYNCAPI-1.0.0 | @pluginmanager |
| 2026-01-02 | Completar Iteraciones 1-3 | @pluginmanager |

---

## 9. Próximos Pasos

1. **Inmediato**: Completar Iteración 4 (registro)
2. **Siguiente**: Verificación con `@pluginmanager status`
3. **Futuro**: Catalogar más specs del ecosistema
