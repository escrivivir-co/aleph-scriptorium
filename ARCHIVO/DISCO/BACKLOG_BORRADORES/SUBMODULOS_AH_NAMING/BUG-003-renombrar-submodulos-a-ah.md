# BUG-003 — Renombrar paths de submódulos a convención PascalCase descriptiva

> **Fecha**: 2025-01-01 (actualizado 2025-12-30)  
> **Opportunity**: Aleph Scriptorium  
> **Severidad**: Media (no bloquea runtime, pero sí DX/legibilidad)  
> **Estado**: ✅ COMPLETADO — 14 submódulos renombrados  
> **Fuente**: petición de mantenimiento de naming (eliminar prefijo `alephscript-` en paths locales)

---

## Problema

Los submódulos se crean/registran con el nombre del repositorio remoto como carpeta local. Eso deja una mezcla de nombres (`alephscript-*`, `*-alephscript-*`, otros) que:

- Dificulta escanear el workspace.
- Complica documentar el ecosistema de forma consistente.
- Hace más costoso referenciar rutas en scripts y docs.

## Objetivo

Renombrar **solo el path local** de cada submódulo para que siga:

- Eliminar referencias `alephscript`, `as-`, prefijos técnicos.
- Nuevo patrón: **PascalCase descriptivo** que indique función.
- Ejemplo: `alephscript-n8n-like-editor` → `WorkflowEditor`

**Nota importante**: esto **no debe romper el vínculo con los repos remotos**. El vínculo se mantiene por `url` en `.gitmodules` + config; el `path` puede cambiar.

---

## Taxonomía por Función

> Definida a partir del análisis de `BACKLOG_BORRADORES/*/conversacion-po-sm.md`.

| Categoría | Descripción | Submódulos |
|-----------|-------------|------------|
| **Gallery** | Galerías/catálogos de recursos | MCPGallery, AAIAGallery |
| **Editor** | Editores visuales o de código | WorkflowEditor, BlocklyEditor, PrologEditor, TypedPromptsEditor, NovelistEditor, WiringEditor, WiringAppHypergraphEditor |
| **Suite/SDK** | Suites de integración o SDKs | VibeCodingSuite, BlockchainComPort |
| **Desktop** | Aplicaciones de escritorio/streaming | StreamDesktop, StreamDesktopAppCronos |
| **Extension** | Extensiones de IDE | VsCodeExtension |

---

## Mapeo Completo (v2 — Diciembre 2025)

> Función real de cada submódulo determinada por análisis de `conversacion-po-sm.md`.

| Path actual | Path propuesto | Categoría | Función Real |
|-------------|----------------|-----------|--------------|
| `alephscript-mcp-presets-site` | `MCPGallery` | Gallery | Gestor de presets MCP (Zeus) — CRUD de colecciones de herramientas |
| `alephscript-n8n-like-editor` | `WorkflowEditor` | Editor | Editor visual de workflows Angular + D3 — Conector a n8n, MCP nativo |
| `alephscript-network-sdk` | `BlockchainComPort` | Suite | SDK de sincronización P2P — Oasis/Scuttlebutt, BOE distribuido |
| `alephscript-typed-prompting` | `TypedPromptsEditor` | Editor | Editor de ontologías NL↔JSON — TypeScript→JSON Schema, validación |
| `as-gym` | `AAIAGallery` | Gallery | Galería Aprendizaje Automático e Inteligencia Artificial — 10 paradigmas FIA |
| `as-utils-sdk` | `VibeCodingSuite` | Suite | Conector VibeCoding — Teatro Matrix, Maestro de Ceremonias, conexión Suite padre |
| `blockly-alephscript-sdk` | `BlocklyEditor` | Editor | Editor de lógica visual — Bloques Blockly → JavaScript |
| `iot-sbr-logica-para-bots` | `PrologEditor` | Editor | Editor de lógica Prolog — SWI-Prolog, reglas declarativas |
| `kick-aleph-bot` | `StreamDesktop` | Desktop | Bot de Kick.com — Chat en tiempo real |
| `kick-aleph-crono-bot` | `StreamDesktopAppCronos` | Desktop | Bot cronómetro de Kick.com — Temporizador de streams |
| `mcp-novelist` | `NovelistEditor` | Editor | Servidor MCP de narrativas — Memoria a largo plazo, novelas |
| `node-red-alephscript-sdk` | `WiringEditor` | Editor | Editor de flujos Node-RED — 13 nodos, Socket.IO, Dashboard |
| `vscode-alephscript-extension` | `VsCodeExtension` | Extension | Extensión VS Code — Arrakis Theater, ChatParticipants |
| `wiki-racer` | `WiringAppHypergraphEditor` | Editor | Navegador de hipergrafos — Mapas de enlaces, preset MediaWiki |

### Resultado: 14 submódulos con naming PascalCase descriptivo

**Ventajas del nuevo naming**:
- Auto-documentado: el nombre indica la función
- Consistente con naming de clases/componentes
- Fácil de recordar y referenciar

---

## Impacto

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `.gitmodules` | Actualizar `path` de cada submódulo |
| `scripts/setup-workspace.sh` | Actualizar variables `SUBMODULE_*_DIR` |
| `.vscode/settings.json` | Actualizar rutas de plugins |
| `scripts/README.md` | Actualizar documentación |
| `.github/instructions/submodulo-integracion.instructions.md` | Añadir convención de naming |
| `.github/prompts/as_instalar_submodulo.prompt.md` | Añadir sección 1.2.1 Naming |

### Lo que NO cambia

- URLs remotas en `.gitmodules` → Conexión intacta
- Contenido de submódulos → Solo renombre de carpeta
- Commits históricos → Se preservan
- Ramas de integración → `integration/beta/scriptorium` sigue igual

---

## Plan de implementación

### Paso 1: Congelar cambios

```bash
git status  # Verificar limpio
git submodule foreach 'git status'  # Verificar submódulos limpios
```

### Paso 2: Desinicializar submódulos

```bash
git submodule deinit -f --all
```

### Paso 3: Renombrar paths (por cada submódulo)

```bash
# Ejemplo para alephscript-n8n-like-editor → WorkflowEditor
git mv alephscript-n8n-like-editor WorkflowEditor
```

### Paso 4: Actualizar .gitmodules

Cambiar cada línea `path = alephscript-*` (o similar) por `path = NuevoNombre` (URL permanece igual).

### Paso 5: Sincronizar

```bash
git submodule sync --recursive
git submodule update --init --recursive
```

### Paso 6: Actualizar configuración

- `scripts/setup-workspace.sh` (variables SUBMODULE_*_DIR)
- `.vscode/settings.json` (rutas de plugins)
- `scripts/README.md` (documentación)

### Paso 7: Verificación

```bash
git submodule status  # Todos aparecen con nuevo nombre PascalCase
grep -r "alephscript-\|as-gym\|as-utils" scripts/ docs/ --include="*.md" --include="*.sh"  # Debe estar vacío
```

---

## Tasks

| Task ID | Descripción | Prioridad |
|---------|-------------|-----------|
| T001 | Renombrar 14 submódulos según mapeo PascalCase | Must |
| T002 | Actualizar `.gitmodules` con paths correctos | Must |
| T003 | Actualizar `setup-workspace.sh` variables | Must |
| T004 | Actualizar `.vscode/settings.json` rutas | Must |
| T005 | Actualizar `scripts/README.md` documentación | Should |
| T006 | Añadir convención en `submodulo-integracion.instructions.md` | Must |
| T007 | Añadir sección 1.2.1 en `as_instalar_submodulo.prompt.md` | Must |
| T008 | Crear script `verify-submodule-naming.sh` | Should |
| T009 | Verificar `git submodule status` funciona | Must |
| T010 | Documentar en `docs/leeme.md` sección avanzada | Should |

---

## Actualización del Protocolo de Instalación

> **Archivo objetivo**: `.github/prompts/as_instalar_submodulo.prompt.md`
> **Ubicación**: Fase 1 → Nueva sección 1.2.1 después de "Convención de nombres"

### Contenido a añadir

````markdown
### 1.2.1 Convención de Naming PascalCase Descriptivo

> **Obligatorio desde BUG-003**: Todos los submódulos deben seguir este patrón.

**Patrón**: `{Categoría}{Función}` en PascalCase

| Categoría | Descripción | Ejemplos |
|-----------|-------------|----------|
| `Gallery` | Galerías/catálogos de recursos | MCPGallery, AAIAGallery |
| `Editor` | Editores visuales o de código | WorkflowEditor, BlocklyEditor, PrologEditor |
| `Suite` | Suites de integración o SDKs | VibeCodingSuite, BlockchainComPort |
| `Desktop` | Aplicaciones de escritorio/streaming | StreamDesktop, StreamDesktopAppCronos |
| `Extension` | Extensiones de IDE | VsCodeExtension |

**Mapeo oficial**:

| Función | Nombre Local |
|---------|--------------|
| Presets MCP | MCPGallery |
| Workflows n8n | WorkflowEditor |
| Red P2P | BlockchainComPort |
| Ontologías NL↔JSON | TypedPromptsEditor |
| Paradigmas IA | AAIAGallery |
| VibeCoding | VibeCodingSuite |
| Lógica visual | BlocklyEditor |
| Lógica Prolog | PrologEditor |
| Bot Kick | StreamDesktop |
| Bot Kick Crono | StreamDesktopAppCronos |
| Narrativas MCP | NovelistEditor |
| Flujos Node-RED | WiringEditor |
| Extensión VS Code | VsCodeExtension |
| Hipergrafos | WiringAppHypergraphEditor |

**Al añadir submódulo (OBLIGATORIO especificar nombre local)**:

```bash
# ❌ MAL: usar nombre del repo remoto
git submodule add https://github.com/escrivivir-co/nuevo-proyecto.git

# ✅ BIEN: especificar path con convención PascalCase
git submodule add https://github.com/escrivivir-co/nuevo-proyecto.git NuevoEditor
```
````

---

## Punto de Revisión: Script de Verificación

> **Ubicación propuesta**: `scripts/verify-submodule-naming.sh`

```bash
#!/bin/bash
# Verificar que todos los submódulos cumplen la convención ah-{tipo}-{nombre}

echo "🔍 Verificando naming de submódulos..."

PATTERN="^ah-(mcp|editor|sdk|ext|stream)-[a-z0-9-]+$"
ERRORS=0

while IFS= read -r line; do
  dir=$(echo "$line" | awk '{print $2}')
  if [[ ! "$dir" =~ $PATTERN ]]; then
    echo "❌ No cumple patrón: $dir"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ OK: $dir"
  fi
done < <(git submodule status)

echo ""
if [ $ERRORS -gt 0 ]; then
  echo "⚠️  $ERRORS submódulos no cumplen el patrón ah-{tipo}-{nombre}"
  exit 1
else
  echo "✅ Todos los submódulos cumplen la convención"
fi
```

---

## Definition of Done

- [ ] Todos los submódulos usan paths `ah-{tipo}-{nombre}` (según mapping aprobado)
- [ ] `.gitmodules` actualizado con paths correctos
- [ ] `setup-workspace.sh` actualizado con nuevas variables
- [ ] `.vscode/settings.json` actualizado con nuevas rutas
- [ ] `scripts/README.md` actualizado
- [ ] Convención documentada en `submodulo-integracion.instructions.md`
- [ ] Sección 1.2.1 añadida a `as_instalar_submodulo.prompt.md`
- [ ] Script `verify-submodule-naming.sh` creado
- [ ] Verificar `git submodule status` funciona
- [ ] No quedan referencias a nombres antiguos (grep limpio)
- [ ] Commit: `refactor(scripts): renombrar submódulos a patrón ah-{tipo}-{nombre}`

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Referencias a paths antiguos en docs/scripts | Grep exhaustivo antes de cerrar |
| Workspaces VS Code con paths hardcoded | Regenerar con `setup-workspace.sh` |
| Conflictos si en futuro se renombra repo remoto | Este es solo renombre local; el repo remoto permanece |
| Clones existentes del proyecto | Documentar en CHANGELOG cómo actualizar |