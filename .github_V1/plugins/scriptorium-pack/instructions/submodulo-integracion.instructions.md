---
name: Integración de Submódulos
description: Protocolo oficial para integrar submódulos externos en el Scriptorium.
applyTo: "scripts/setup-*.sh, .gitmodules, **/README-SCRIPTORIUM.md, scripts/verify-*.sh"
---
# Instrucciones: Integración de Submódulos

> **Fuente de verdad**: `.github/prompts/as_instalar_submodulo.prompt.md`  
> **Agente orquestador**: `@aleph` → delega a `@scrum` para borradores  
> **Plugin**: scriptorium-pack (SCRIPT-1.29.0)

---

## Resumen Ejecutivo

Los submódulos son **candidatos a plugin** que requieren análisis y planificación sistemática antes de integrarlos.

| Tipo | Ubicación | Convención |
|------|-----------|------------|
| Código | `.github/plugins/{id}/` | `kebab-case` |
| Datos | `ARCHIVO/PLUGINS/{ID}/` | `SCREAMING_SNAKE` |
| Submódulo | `/{NombrePascalCase}/` | `PascalCase` |

⚠️ **Solo para usuarios expertos** — requiere conocimiento de Git avanzado.

---

## Flujo de 8 Fases (Resumen)

| Fase | Nombre | Acción Principal |
|------|--------|------------------|
| 0 | Verificación | `git submodule status \| wc -l` |
| 1 | Instalar | `git submodule add {URL}` |
| 2 | Inspección | Crear `README-SCRIPTORIUM.md` |
| 3 | Casar | Alinear con instrucciones del usuario |
| 4 | Scrum | Conversación PO-SM |
| 5 | Backlog | Generar borrador |
| 6 | Plugin | Crear estructura en `.github/plugins/` |
| 7 | Integrar | Actualizar 6 archivos críticos |
| 8 | Publicar | Commits separados |

---

## Checklist de Integración (Fase 7)

| Archivo | Zonas | Verificación |
|---------|-------|-------------|
| `registry.json` | 1 | `grep "{id}" registry.json` |
| `aleph.agent.md` | 1 handoff | `grep "\[{ID}\]" aleph.agent.md` |
| `ox.agent.md` | 4 | `grep "plugin_ox_{id}" ox.agent.md` |
| `setup-workspace.sh` | 4 | Ver sección 7.2 del prompt |
| `scripts/README.md` | 2 | `grep "{nombre}" README.md` |
| `.gitmodules` | 1 (automático) | `git submodule status` |

---

## Convenciones de Naming

| Categoría | Ejemplos |
|-----------|----------|
| `Gallery` | MCPGallery, AAIAGallery |
| `Editor` | WorkflowEditor, BlocklyEditor |
| `Suite` | VibeCodingSuite, BlockchainComPort |
| `Desktop` | StreamDesktop |
| `Extension` | VsCodeExtension |

---

## Lo que NO Hacer

| ❌ No | ✅ Sí |
|-------|-------|
| Instalar sin verificar estado | Ejecutar Fase 0 siempre |
| Saltar conversación PO-SM | Crear `conversacion-po-sm.md` |
| Olvidar `setup-workspace.sh` | Usar checklist de 4 zonas |
| Commit único | Separar: instalación + backlog |

---

## Detalles Técnicos

### Fase 1: Instalar Submódulo

```bash
git submodule add {URL} [{nombre-local}]
cd {nombre-submodulo}
git checkout -b integration/beta/scriptorium
```

### Fase 2: Artefacto Obligatorio

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
- {Lista con instrucciones}

## Supuestos y Gaps
- {Lo que falta resolver}
```

### Fase 4: Estructura de Conversación PO-SM

```markdown
# Conversación PO-SM: {Nombre}

**Fecha**: {YYYY-MM-DD}
**Submódulo**: `{nombre}`
**Plugin objetivo**: `{id}`

---

## Análisis Técnico (SM)
### Gaps identificados
| Gap | Descripción | Prioridad |
|-----|-------------|-----------|

### Riesgos técnicos
| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|

---

## Visión de Producto (PO)
### Casos de uso objetivo
1. {UC1}: ...

### Criterios de éxito
- [ ] {Criterio}

---

## Decisiones
1. **{Decisión}**: {Rationale}
```

### Fase 6: Estructura de Plugin

```
.github/plugins/{id}/
├── manifest.md
├── agents/{agente}.agent.md
├── prompts/
├── instructions/{id}.instructions.md
└── docs/README.md
```

### Validación de Integridad

```bash
REAL=$(git submodule status | wc -l)
VARS=$(grep -c "SUBMODULE_.*_DIR=" scripts/setup-workspace.sh)
CALLS=$(grep -c "setup_submodule" scripts/setup-workspace.sh)

echo "Submódulos: $REAL | Vars: $VARS | Calls: $CALLS"
# Deben coincidir
```

### Commits Separados

**Commit 1: Instalación**
```
feat(script/plugins): instalar submódulo {nombre} y plugin {id}
refs #SCRIPT-{version}-T001
```

**Commit 2: Backlog**
```
docs(script/backlog): añadir borrador SCRIPT-{version}
refs #SCRIPT-{version}
```

### Modo de Invocación

```
@aleph Instalar submódulo desde {URL}

Instrucciones:
- Crear plugin: sí/no
- Modo: autónomo/consultivo
- Scope: minimal/completo
```

---

> **Un submódulo sin conversación PO-SM es código muerto.**
