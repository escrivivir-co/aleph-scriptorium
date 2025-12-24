---
name: Integración de Submódulos
description: Protocolo oficial para integrar submódulos externos en el Scriptorium. Fija el flujo completo desde instalación hasta publicación.
applyTo: "scripts/**, .github/plugins/**, ARCHIVO/DISCO/BACKLOG_BORRADORES/**"
---

# Instrucciones: Integración de Submódulos

> **Fuente de verdad**: `.github/prompts/instalar-submodulo.prompt.md`  
> **Agente orquestador**: `@aleph` → delega a `@scrum` para borradores

---

## Propósito

Este documento **fija el protocolo oficial** para integrar submódulos externos en ALEPH Scriptorium. Un submódulo no es solo código añadido: es un **candidato a plugin** que requiere análisis, planificación y configuración sistemática.

---

## Principios de Diseño

### 1. Submódulos son para usuarios expertos

> ⚠️ **ADVERTENCIA**: Los submódulos añaden complejidad técnica significativa.
> - Requieren conocimiento de Git avanzado
> - Pueden tener dependencias externas (Docker, Node, Python, etc.)
> - No se recomiendan para usuarios no técnicos

**Documentar siempre en [docs/leeme.md](/docs/leeme.md)** (sección avanzada).

### 2. Separación código vs. datos

| Tipo | Ubicación | Convención | Mutabilidad |
|------|-----------|------------|-------------|
| Código | `.github/plugins/{id}/` | `kebab-case` | Inmutable |
| Datos | `ARCHIVO/PLUGINS/{ID}/` | `SCREAMING_SNAKE` | Mutable |

### 3. Discovery explícito

VS Code solo detecta recursos en ubicaciones canónicas. Por tanto:
- Crear **bridge agents** en `.github/agents/` para cada plugin
- Actualizar **`.vscode/settings.json`** vía `setup-workspace.sh`

### 4. Planificación antes de implementación

Todo submódulo pasa por conversación PO-SM en `@scrum` **antes** de generar backlog.

---

## Flujo de 8 Fases

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     FLUJO DE INTEGRACIÓN DE SUBMÓDULOS                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐                 │
│  │  Fase 1  │──▶│  Fase 2  │──▶│  Fase 3  │──▶│  Fase 4  │                 │
│  │ Instalar │   │Inspección│   │  Casar   │   │  Scrum   │                 │
│  │ submódulo│   │ codebase │   │instruc.  │   │ PO ↔ SM  │                 │
│  └──────────┘   └──────────┘   └──────────┘   └────┬─────┘                 │
│                                                     │                       │
│         ┌───────────────────────────────────────────┤                       │
│         │                                           │                       │
│         ▼ (si modo autónomo)                        ▼ (si consultar)        │
│  ┌──────────┐                                ┌──────────┐                   │
│  │  Fase 5  │                                │  PAUSA   │                   │
│  │ Backlog  │                                │ Usuario  │                   │
│  │ borrador │                                │ decide   │                   │
│  └────┬─────┘                                └────┬─────┘                   │
│       │                                           │                         │
│       └───────────────────┬───────────────────────┘                         │
│                           ▼                                                  │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐                 │
│  │  Fase 6  │──▶│  Fase 7  │──▶│  Fase 8  │──▶│  COMMIT  │                 │
│  │Inicializ.│   │ Integrar │   │ Publicar │   │ separado │                 │
│  │ plugin   │   │  sistema │   │ anuncio  │   │          │                 │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Fase 1: Instalar Submódulo

**Input**: URL del repositorio remoto + instrucciones del usuario

### Acciones

```bash
git submodule add {URL} [{nombre-local}]
cd {nombre-submodulo}
git checkout -b integration/beta/scriptorium
```

### Verificación previa (Fase 0)

Antes de añadir, verificar estado actual:

```bash
git submodule status | wc -l          # N actual
grep -c "en total" scripts/setup-workspace.sh  # Debe mencionar N
```

**Si hay discrepancia**: Corregir primero con commit de sincronización.

### Salida

- Submódulo clonado en raíz del workspace
- `.gitmodules` actualizado automáticamente
- Rama `integration/beta/scriptorium` creada

---

## Fase 2: Inspección de Codebase

**Propósito**: Entender qué contiene el submódulo antes de integrarlo.

### Puntos de análisis

| Aspecto | Preguntas |
|---------|-----------|
| **Arquitectura** | ¿Monorepo? ¿Frontend/Backend? ¿Microservicios? |
| **Tecnología** | ¿Node? ¿Python? ¿Docker? ¿TypeScript? |
| **Dependencias** | ¿Qué instalar? ¿Puertos? ¿Variables de entorno? |
| **Puntos de integración** | ¿APIs? ¿Schemas? ¿Prompts existentes? |
| **Mapeo ontológico** | ¿Qué agentes del Scriptorium corresponden? |

### Artefacto obligatorio

Crear `{submódulo}/README-SCRIPTORIUM.md`:

```markdown
# Integración con ALEPH Scriptorium

## Arquitectura del Submódulo
{Diagrama o descripción}

## Tecnologías
- {Lista}

## Mapeo Ontológico
| Submódulo | Scriptorium |
|-----------|-------------|
| {componente} | @{agente} |

## Dependencias Externas
- {Lista con instrucciones de instalación}

## Supuestos y Gaps
- {Lista de lo que falta resolver}
```

---

## Fase 3: Casar con Instrucciones del Usuario

**Propósito**: Alinear lo descubierto en Fase 2 con lo que el usuario pidió.

### Preguntas clave

1. ¿El usuario pidió crear plugin? → Si sí, preparar estructura
2. ¿El usuario pidió integración específica? → Documentar scope
3. ¿Hay conflictos entre codebase y expectativas? → Escalar gaps

### Matriz de decisión

| Si el usuario pidió... | Entonces... |
|------------------------|-------------|
| "Solo instalar" | Fase 1-2, commit minimal, PAUSA |
| "Crear plugin" | Continuar a Fase 4-6 |
| "Integración completa" | Flujo completo Fases 1-8 |
| "Analizar primero" | Fases 1-3, generar informe, PAUSA |

---

## Fase 4: Conversación Scrum (PO ↔ SM)

**Agente**: `@scrum` → `crear-backlog-borrador.prompt.md`  
**Ubicación**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/{NOMBRE}/`

### Estructura de conversación

```markdown
# Conversación PO-SM: {Nombre}

**Fecha**: {YYYY-MM-DD}
**Submódulo**: `{nombre}`
**Plugin objetivo**: `{id}`

---

## Análisis Técnico (SM)

### Inventario del submódulo
{Lo descubierto en Fase 2}

### Gaps identificados
| Gap | Descripción | Prioridad |
|-----|-------------|-----------|
| G1 | ... | Must |

### Riesgos técnicos
| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| ... | ... | ... | ... |

---

## Visión de Producto (PO)

### Casos de uso objetivo
1. {UC1}: ...
2. {UC2}: ...

### Criterios de éxito
- [ ] {Criterio 1}
- [ ] {Criterio 2}

---

## Decisiones

1. **{Decisión}**: {Rationale}
2. ...

---

## Siguiente paso
- [ ] Generar backlog borrador
- [ ] Consultar al usuario
```

### Punto de decisión

Según instrucciones del usuario:
- **Modo autónomo**: Continuar a Fase 5
- **Modo consultivo**: PAUSA, esperar aprobación

---

## Fase 5: Generar Backlog Borrador

**Agente**: `@scrum` → `crear-backlog-borrador.prompt.md`

### Archivo generado

`ARCHIVO/DISCO/BACKLOG_BORRADORES/{NOMBRE}/01_backlog-borrador.md`

### Estructura mínima

```markdown
# Backlog Borrador: SCRIPT-{version} — {Nombre}

**Estado**: 📝 Borrador (pendiente aprobación)

## Feature Cycles

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | {Configuración inicial} | {N} pts |
| FC2 | {Features core} | {M} pts |

## Stories (extracto)

### SCRIPT-{version}-S01: {Nombre}
**Effort**: {X} pts

| Task | Descripción | Estado |
|------|-------------|--------|
| T001 | ... | ⏳ |

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.
```

---

## Fase 6: Inicializar Plugin y Rama

**Protocolo**: `.github/PLUGINS.md` + `plugin-install.prompt.md`

### Acciones

1. **Crear estructura de plugin** en `.github/plugins/{id}/`
   - `manifest.md`
   - `agents/{agente}.agent.md`
   - `prompts/` (al menos 1)
   - `instructions/{id}.instructions.md`
   - `docs/README.md`

2. **Crear bridge** en `.github/agents/plugin_ox_{id}.agent.md`

3. **Crear datos runtime** en `ARCHIVO/PLUGINS/{ID}/README.md`

4. **Inicializar paquete en submódulo** (si aplica):
   ```bash
   cd {submódulo}
   # npm init / pip init / etc.
   git add package.json
   git commit -m "chore: inicializar paquete para Scriptorium"
   ```

### Convención de rama

**Siempre**: `integration/beta/scriptorium` (consistente en todos los submódulos)

---

## Fase 7: Integrar en Sistema

**Crítico**: 6 archivos deben actualizarse SIEMPRE.

### Checklist de archivos

| Archivo | Zonas | Verificación |
|---------|-------|-------------|
| `registry.json` | 1 | `grep "{id}" registry.json` |
| `aleph.agent.md` | 1 handoff | `grep "\[{ID}\]" aleph.agent.md` |
| `ox.agent.md` | 4 (versión, plugin, bridge, handoff) | `grep "plugin_ox_{id}" ox.agent.md` |
| `setup-workspace.sh` | 4 (comentario, vars, settings, llamada) | Ver sección 7.2 del prompt |
| `scripts/README.md` | 2 (contador, lista) | `grep "{nombre}" README.md` |
| `.gitmodules` | 1 (automático) | `git submodule status` |

### Validación de integridad

```bash
REAL=$(git submodule status | wc -l)
VARS=$(grep -c "SUBMODULE_.*_DIR=" scripts/setup-workspace.sh)
CALLS=$(grep -c "setup_submodule" scripts/setup-workspace.sh)

echo "Submódulos: $REAL | Vars: $VARS | Calls: $CALLS"
# Deben coincidir
```

---

## Fase 8: Publicar y Anunciar

### Documentación pública

1. **README.md**: Añadir submódulo a tabla de submódulos
2. **docs/leeme.md**: Añadir en sección avanzada (⚠️ solo expertos)
3. **docs/roadmap.md**: Actualizar con nueva épica (si aplica)
4. **GH-Pages**: Actualizar agentes.md si hay nuevo bridge

### Commits separados

**Commit 1: Instalación**
```
feat(script/plugins): instalar submódulo {nombre} y plugin {id}

- Añadir submódulo {nombre} (rama integration/beta/scriptorium)
- Crear plugin {id} v1.0.0 ({N} agentes, {M} prompts)
- Crear bridge plugin_ox_{id}
- Actualizar configuración del sistema

refs #SCRIPT-{version}-T001
```

**Commit 2: Backlog (separado)**
```
docs(script/backlog): añadir borrador SCRIPT-{version} ({nombre})

- Crear conversación PO-SM en BACKLOG_BORRADORES/
- Documentar gaps, riesgos y decisiones
- Proponer {N} stories, {M} tasks, {X} pts

refs #SCRIPT-{version}
```

---

## Modo de Invocación

### Sintaxis del prompt

```
@aleph Instalar submódulo desde {URL}

Instrucciones:
- {Crear plugin: sí/no}
- {Modo: autónomo/consultivo}
- {Scope: minimal/completo}
- {Notas adicionales}
```

### Ejemplos

**Instalación completa autónoma**:
```
@aleph Instalar submódulo desde https://github.com/escrivivir-co/mcp-novelist.git

Instrucciones:
- Crear plugin: sí (novelist)
- Modo: autónomo (no pausar)
- Scope: completo (8 fases)
- Integra con Teatro y AGENT_CREATOR
```

**Solo análisis**:
```
@aleph Instalar submódulo desde https://github.com/escrivivir-co/as-gym.git

Instrucciones:
- Crear plugin: consultar después de análisis
- Modo: consultivo (pausar en Fase 4)
- Scope: Fases 1-3 solamente
```

---

## Antipatrones

| ❌ No hacer | ✅ Hacer en su lugar |
|-------------|---------------------|
| Instalar sin verificar estado previo | Ejecutar Fase 0 siempre |
| Saltar conversación PO-SM | Crear `conversacion-po-sm.md` siempre |
| Olvidar `setup-workspace.sh` | Usar checklist de 4 zonas |
| Commit único para todo | Separar: instalación + backlog |
| Documentar en docs/leeme.md para todos | Marcar como "solo expertos" |
| Hardcodear contadores | Usar `git submodule status \| wc -l` |

---

## Referencias

| Documento | Propósito |
|-----------|-----------|
| `.github/prompts/instalar-submodulo.prompt.md` | Prompt ejecutable con todas las fases |
| `.github/prompts/plugin-install.prompt.md` | Protocolo de instalación de plugins |
| `.github/PLUGINS.md` | Especificación de plugins |
| `.github/plugins/scrum/prompts/crear-backlog-borrador.prompt.md` | Generación de backlogs |
| `scripts/README.md` | Documentación de scripts |
| `scripts/setup-workspace.sh` | Script de configuración |

---

## Regla de Oro

> **Un submódulo sin conversación PO-SM es código muerto.**  
> La integración técnica solo tiene valor si resuelve casos de uso documentados.
