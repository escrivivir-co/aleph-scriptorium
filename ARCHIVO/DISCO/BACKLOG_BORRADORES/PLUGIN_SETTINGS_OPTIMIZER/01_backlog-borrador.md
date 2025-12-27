# Backlog Borrador: SCRIPT-1.15.0 — Optimización Settings de Plugins

> **Estado**: ✅ Completada y publicada  
> **Sprint**: 2 (Feature Cycle 1)  
> **Fecha**: 2025-01-02  
> **Conversación**: `conversacion-po-sm.md`  
> **Effort total**: 18 puntos  
> **Publicado en**: `.github/BACKLOG-SCRIPTORIUM.md`

---

## Objetivo de la Épica

Optimizar la gestión de settings de VS Code para plugins, implementando:
- **Default desactivado**: Plugins instalados pero no activos en settings
- **FAQ integrado**: Guía de troubleshooting en plugin-manager
- **Sistema de avisos**: Umbrales para advertir sobre sobrecarga
- **Comandos mejorados**: Activar/desactivar plugins individualmente

---

## Épicas

| ID | Nombre | Effort | Prioridad | Estado |
|----|--------|--------|-----------|--------|
| SCRIPT-1.15.0 | Optimización Settings de Plugins | 18 pts | P1 (Should) | ✅ Completada |

---

## Feature Cycle 1: Core

```
┌────────────────────────────────────────────────────────────────────┐
│                    FEATURE CYCLE 1: CORE                            │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  S01 ──▶ S02 ──▶ S03 ──▶ S04 ──▶ S05 ──▶ S06                       │
│  ✅      ✅      ✅      ✅      ✅      ✅                           │
│  Default  FAQ   Activar  Avisos  Docs   Test                       │
│  false          Desact                                              │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## Stories

### SCRIPT-1.15.0-S01 — Cambiar Default a Desactivado
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ✅ Completada

#### Descripción
Modificar el protocolo de instalación para que los plugins queden desactivados por defecto en `.vscode/settings.json`.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Modificar `as_plugin-install.prompt.md` paso 5: valor `false` | 0.5 | ⏳ |
| T002 | Añadir mensaje post-instalación: "Plugin instalado (desactivado)" | 0.5 | ⏳ |
| T003 | Actualizar `plugin-manager.agent.md` con nuevo comportamiento | 0.5 | ⏳ |
| T004 | Actualizar ejemplo en `PLUGINS.md` sección 2.3 | 0.5 | ⏳ |

**Definition of Done**: 
- Nuevo plugin instalado aparece con `false` en settings
- Mensaje claro al usuario sobre el estado

---

### SCRIPT-1.15.0-S02 — FAQ de Troubleshooting
**Effort**: 3 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Añadir sección FAQ al agente plugin-manager con soluciones a problemas comunes.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T005 | Crear sección "## FAQ de Resolución de Problemas" | 0.5 | ⏳ |
| T006 | FAQ: "No me aparecen los prompts del plugin X" | 0.5 | ⏳ |
| T007 | FAQ: "El chat está muy lento" | 0.5 | ⏳ |
| T008 | FAQ: "¿Cómo sé qué plugins tengo activos?" | 0.5 | ⏳ |
| T009 | FAQ: "¿Cuáles son los plugins recomendados?" | 0.5 | ⏳ |
| T010 | Añadir handoff "[FAQ] Resolver problema de plugins" | 0.5 | ⏳ |

**Definition of Done**: 
- FAQ responde las 4 preguntas más comunes
- Handoff funcional desde @aleph

---

### SCRIPT-1.15.0-S03 — Comandos Activar/Desactivar en Settings
**Effort**: 5 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Implementar handoffs específicos para activar/desactivar plugins en `.vscode/settings.json`.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T011 | Crear handoff "Activar plugin en settings" | 1 | ⏳ |
| T012 | Crear handoff "Desactivar plugin en settings" | 1 | ⏳ |
| T013 | Implementar lógica de parseo de settings.json | 1 | ⏳ |
| T014 | Validar JSON antes de escribir | 0.5 | ⏳ |
| T015 | Crear prompt `activar-desactivar-plugin.prompt.md` | 1 | ⏳ |
| T016 | Documentar diferencia entre registry (enabled) y settings (visible) | 0.5 | ⏳ |

**Definition of Done**: 
- `@pluginmanager activar {id}` cambia settings.json
- `@pluginmanager desactivar {id}` cambia settings.json
- Validación JSON funcional

**Nota técnica**: Distinguir entre:
- `registry.json:enabled` → Plugin funcional o no
- `settings.json:true/false` → Prompts/instructions visibles o no

---

### SCRIPT-1.15.0-S04 — Sistema de Avisos por Umbral
**Effort**: 5 pts  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Implementar sistema de avisos cuando hay demasiados plugins activos.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T017 | Definir función `countActivePlugins()` | 0.5 | ⏳ |
| T018 | Implementar umbrales (3/6/10) | 0.5 | ⏳ |
| T019 | Crear mensaje nivel 1: Info (4-6 plugins) | 0.5 | ⏳ |
| T020 | Crear mensaje nivel 2: Warning (7-10 plugins) | 0.5 | ⏳ |
| T021 | Crear mensaje nivel 3: Alerta (11+ plugins) | 0.5 | ⏳ |
| T022 | Integrar avisos en handoff de activación | 0.5 | ⏳ |
| T023 | Crear handoff "status" para diagnóstico | 1 | ⏳ |
| T024 | Listar plugins activos ordenados por fecha | 1 | ⏳ |

**Definition of Done**: 
- Al activar plugin, aparece aviso si hay muchos activos
- `@pluginmanager status` muestra diagnóstico completo

**Umbrales acordados**:

| Plugins Activos | Estado | Acción |
|-----------------|--------|--------|
| 0-3 | 🟢 Óptimo | Sin aviso |
| 4-6 | 🟡 Aceptable | Info suave |
| 7-10 | 🟠 Cargado | Warning |
| 11+ | 🔴 Sobrecargado | Recomendación fuerte |

---

### SCRIPT-1.15.0-S05 — Documentación
**Effort**: 2 pts  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Actualizar documentación con el nuevo comportamiento.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T025 | Actualizar `PLUGINS.md` sección 2.3 (Settings) | 0.5 | ⏳ |
| T026 | Actualizar `PLUGINS.md` sección 4.2 (Instalación) | 0.5 | ⏳ |
| T027 | Actualizar `copilot-instructions.md` sección Plugins | 0.5 | ⏳ |
| T028 | Documentar en `docs/leeme.md` sección avanzada | 0.5 | ⏳ |

**Definition of Done**: 
- Documentación coherente con nuevo comportamiento
- Usuarios pueden entender el flujo leyendo docs

---

### SCRIPT-1.15.0-S06 — Testing y Validación
**Effort**: 1 pt  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Validar el flujo completo con casos de prueba.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T029 | Test: Instalar plugin nuevo → aparece desactivado | 0.25 | ⏳ |
| T030 | Test: Activar plugin → aparece en prompts | 0.25 | ⏳ |
| T031 | Test: Desactivar plugin → desaparece de prompts | 0.25 | ⏳ |
| T032 | Test: 11 plugins activos → muestra alerta | 0.25 | ⏳ |

**Definition of Done**: 
- Todos los tests pasan
- Sin regresiones en plugins existentes

---

## Métricas

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Tasks completadas | 32/32 | 24/32 | ⏳ |
| Effort completado | 18 pts | 12 pts | ⏳ |
| % Avance | 100% | 75% | ⏳ |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Plugin Scrum | ✅ Instalado | Para gestión de backlog |
| VS Code settings.json | ✅ Existe | Target de modificación |
| Plugin Manager | ✅ Funcional | Base para extensión |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Usuarios no entienden el cambio | Alta | Medio | FAQ + mensaje post-instalación |
| Settings.json corrupto | Baja | Alto | Validación JSON |
| Plugins críticos desactivados | Media | Medio | Campo `core` en manifest (futuro) |

---

## Archivos Afectados

| Archivo | Cambio |
|---------|--------|
| `.github/prompts/as_plugin-install.prompt.md` | Paso 5: default `false` |
| `.github/agents/plugin-manager.agent.md` | FAQ + nuevos handoffs |
| `.github/PLUGINS.md` | Secciones 2.3 y 4.2 |
| `.github/copilot-instructions.md` | Sección Plugins |
| `.vscode/settings.json` | Estructura actualizada |

---

## Decisiones de Diseño

| Decisión | Rationale | Alternativa Rechazada |
|----------|-----------|----------------------|
| Default `false` | Optimizar rendimiento | Mantener `true` (sobrecarga) |
| Umbrales 3/6/10 | Balance UX/rendimiento | Umbral único (poco granular) |
| No tracking de uso | Complejidad innecesaria MVP | Tracking completo (v2) |
| FAQ en agente | Descubrible vía chat | Documentación externa (menos visible) |

---

## Cronograma Sugerido

| Story | Effort | Dependencia | Orden |
|-------|--------|-------------|-------|
| S01: Default false | 2 pts | - | 1º |
| S02: FAQ | 3 pts | S01 | 2º |
| S03: Activar/Desactivar | 5 pts | S01 | 3º |
| S04: Avisos | 5 pts | S03 | 4º |
| S05: Docs | 2 pts | S01-S04 | 5º |
| S06: Testing | 1 pt | S01-S05 | 6º |

---

## Pendiente Aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.

Una vez aprobado, se publicará en `.github/BACKLOG-SCRIPTORIUM.md` como épica SCRIPT-1.15.0.

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear conversación PO-SM | @scrum |
| 2025-12-24 | Generar backlog borrador (6 stories, 32 tasks) | @scrum |
