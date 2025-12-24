---
name: Instalar Submódulo
description: Protocolo de 8 fases para integrar submódulos externos en el Scriptorium. Incluye análisis, planificación Scrum y configuración completa.
applyTo: "scripts/**, .github/plugins/**, ARCHIVO/DISCO/BACKLOG_BORRADORES/**"
---

# Prompt: Instalar Submódulo (Protocolo de 8 Fases)

> **Instrucciones vinculadas**: `.github/instructions/submodulo-integracion.instructions.md`  
> **Agente orquestador**: `@aleph` → delega a `@scrum` para borradores

Este prompt ejecuta el **protocolo completo de integración** de submódulos externos.

---

## Invocación

```
@aleph Instalar submódulo desde {URL_REPOSITORIO}

Instrucciones:
- Crear plugin: {sí/no/consultar}
- Modo: {autónomo/consultivo}
- Scope: {minimal/completo}
- {Notas adicionales del usuario}
```

**Ejemplos de invocación**:

| Caso | Instrucciones |
|------|---------------|
| Instalación completa | `Crear plugin: sí, Modo: autónomo, Scope: completo` |
| Solo análisis | `Crear plugin: consultar, Modo: consultivo, Scope: Fases 1-3` |
| Minimal técnico | `Crear plugin: no, Modo: autónomo, Scope: minimal` |

---

## Resumen de las 8 Fases

| Fase | Nombre | Output Principal | Punto de Decisión |
|------|--------|------------------|-------------------|
| **0** | Verificación previa | Estado limpio | Si hay discrepancias → corregir |
| **1** | Instalar submódulo | `.gitmodules` actualizado | — |
| **2** | Inspección codebase | `README-SCRIPTORIUM.md` | — |
| **3** | Casar instrucciones | Scope confirmado | Si conflicto → escalar |
| **4** | Scrum PO↔SM | `conversacion-po-sm.md` | **Modo consultivo: PAUSA** |
| **5** | Backlog borrador | `01_backlog-borrador.md` | — |
| **6** | Inicializar plugin | Plugin + Bridge | — |
| **7** | Integrar sistema | 6 archivos actualizados | — |
| **8** | Publicar y commit | 2 commits separados | — |

---

## Contexto Técnico

> **IMPORTANTE**: El número de submódulos es **dinámico**. Antes de iniciar:
> ```bash
> git submodule status | wc -l
> ```
> Esto devuelve N actual. El nuevo submódulo será **N+1**.

**Cada submódulo**:
- Se integra en rama `integration/beta/scriptorium`
- Puede generar un **plugin** en `.github/plugins/{id}/`
- Tiene **backlog de planificación** en `ARCHIVO/DISCO/BACKLOG_BORRADORES/`
- Se configura en `scripts/setup-workspace.sh`
- Se registra en `.vscode/settings.json` (discovery de prompts/instructions)

**⚠️ Submódulos son para usuarios expertos**: Documentar siempre en `docs/leeme.md` sección avanzada.

---

## Fase 0: Verificación de Estado Actual (OBLIGATORIA)

> **Propósito**: Evitar desincronizaciones entre submódulos reales y configuración documentada.
> **Referencia**: `.github/instructions/submodulo-integracion.instructions.md` § Principio 4

### 0.1. Auditoría de Submódulos

```bash
cd /ruta/al/SCRIPTORIUM/ALEPH

# Contar submódulos actuales
echo "Submódulos actuales: $(git submodule status | wc -l)"

# Listar con detalle
git submodule status
```

**Comparar con**:
- `scripts/setup-workspace.sh` (variable `SUBMODULE_*` count)
- `scripts/README.md` (contador en documentación)
- Comentario en setup-workspace.sh ("Submódulos del proyecto (N en total)")

### 0.2. Detectar Desincronizaciones

| Archivo | Campo a verificar | Comando |
|---------|-------------------|--------|
| `setup-workspace.sh` | Comentario "N en total" | `grep -n "en total" scripts/setup-workspace.sh` |
| `setup-workspace.sh` | Variables SUBMODULE_* | `grep -c "SUBMODULE_.*_DIR" scripts/setup-workspace.sh` |
| `setup-workspace.sh` | Llamadas setup_submodule | `grep -c "setup_submodule" scripts/setup-workspace.sh` |
| `scripts/README.md` | "N submódulos" | `grep -n "submódulos" scripts/README.md \| head -5` |

### 0.3. Corregir Antes de Continuar

Si hay discrepancias:
1. **Actualizar** `setup-workspace.sh` con submódulos faltantes
2. **Actualizar** `scripts/README.md` con documentación correcta
3. **Commit** de corrección: `refactor(scripts): sincronizar configuración para N submódulos`

**Solo continuar cuando los números coincidan.**

---

## Fase 1: Instalar Submódulo

> **Input**: URL del repositorio remoto + instrucciones del usuario

### 1.1. Calcular Número de Orden

```bash
# El nuevo submódulo será el N+1
NUEVO_ORDEN=$(($(git submodule status | wc -l) + 1))
echo "El nuevo submódulo será el número: $NUEVO_ORDEN"
```

### 1.2. Añadir Submódulo con Git

```bash
cd /ruta/al/SCRIPTORIUM/ALEPH

# Añadir submódulo (reemplazar URL)
git submodule add {URL_REPOSITORIO}

# Verificar instalación
ls -la {nombre-submodulo}/
```

**Convención de nombres**:
- Repositorio: `alephscript-{nombre}-{tipo}`
- Ejemplos: `alephscript-mcp-presets-site`, `alephscript-network-sdk`

### 1.2.1. Convención de Nombres PascalCase (Path Local)

> **Referencia**: Sección 2.1 de `submodulo-integracion.instructions.md`

El **path local** del submódulo (lo que aparece en el workspace) debe usar **PascalCase descriptivo** según la función:

| Categoría | Patrón | Ejemplos |
|-----------|--------|----------|
| `Gallery` | Catálogos de recursos | MCPGallery, AAIAGallery |
| `Editor` | Editores visuales/código | WorkflowEditor, BlocklyEditor, PrologEditor |
| `Suite` | SDKs/integraciones | VibeCodingSuite, BlockchainComPort |
| `Desktop` | Apps de escritorio/streaming | StreamDesktop, StreamDesktopAppCronos |
| `Extension` | Extensiones de IDE | VsCodeExtension |

**Ejemplo de mapeo**:
```bash
# URL remota (upstream) → path local (workspace)
git submodule add https://github.com/escrivivir-co/alephscript-n8n-like-editor WorkflowEditor
```

**Verificación**:
```bash
scripts/verify-submodule-naming.sh
```

### 1.3. Crear Rama de Integración

```bash
cd {nombre-submodulo}

# Crear y cambiar a rama integration/beta/scriptorium
git checkout -b integration/beta/scriptorium

# Verificar
git branch
```

**Nombre de rama estándar**: `integration/beta/scriptorium` (consistente en todos los submódulos)

---

## Fase 2: Inspección de Codebase

> **Propósito**: Entender qué contiene el submódulo antes de integrarlo.
> **Referencia**: `.github/instructions/submodulo-integracion.instructions.md` § Fase 2

### 2.1. Explorar Estructura del Submódulo

```bash
# Listar estructura
ls -R {nombre-submodulo}/

# Identificar:
# - Arquitectura del proyecto
# - Tecnologías usadas
# - Puntos de integración
# - Dependencias externas (Docker, Node, Python, etc.)
```

### 2.2. Análisis Técnico

| Aspecto | Preguntas Clave |
|---------|-----------------|
| **Arquitectura** | ¿Monorepo? ¿Frontend/Backend? ¿Microservicios? |
| **Tecnología** | ¿Node? ¿Python? ¿Docker? ¿TypeScript? |
| **Dependencias** | ¿Qué instalar? ¿Puertos? ¿Variables de entorno? |
| **Puntos de integración** | ¿APIs? ¿Schemas? ¿Prompts existentes? |
| **Mapeo ontológico** | ¿Qué agentes del Scriptorium corresponden? |

### 2.3. Crear README de Integración

**Archivo**: `{submódulo}/README-SCRIPTORIUM.md`

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

### 2.4. Commit en Submódulo (INMEDIATO)

> **⚠️ IMPORTANTE**: El commit en el submódulo se hace **AHORA**, no en la Fase 8.
> El submódulo tiene su propio repositorio Git y sus cambios deben registrarse
> antes de continuar con la integración en el repositorio principal.

```bash
cd {nombre-submodulo}
git add README-SCRIPTORIUM.md
git commit -m "docs: añadir README de integración con Scriptorium

Documenta arquitectura, mapeo ontológico y dependencias para
integración con ALEPH Scriptorium.

refs #SCRIPT-{version}-T002"

# Opcional (si tienes permisos de push):
git push -u origin integration/beta/scriptorium
```

> **Nota**: Este commit quedará referenciado cuando el repositorio principal
> registre el submódulo en su commit de la Fase 8.

---

## Fase 3: Casar con Instrucciones del Usuario

> **Propósito**: Alinear lo descubierto con lo que el usuario pidió.

### 3.1. Revisar Instrucciones Originales

Extraer de la invocación:
- ¿Crear plugin? → `sí/no/consultar`
- ¿Modo? → `autónomo/consultivo`
- ¿Scope? → `minimal/completo`
- Notas adicionales

### 3.2. Matriz de Decisión

| Si el usuario pidió... | Entonces... |
|------------------------|-------------|
| "Solo instalar" | Fases 0-2 + commit, PAUSA |
| "Crear plugin: sí" | Continuar a Fases 4-8 |
| "Crear plugin: consultar" | Fases 0-3, PAUSA para decisión |
| "Modo: consultivo" | PAUSA después de Fase 4 |
| "Scope: minimal" | Fases 0-2, commit básico |
| "Scope: completo" | Flujo completo Fases 0-8 |

### 3.3. Identificar Conflictos

Si la codebase revela algo no anticipado:
- Documentar en `README-SCRIPTORIUM.md` sección "Supuestos y Gaps"
- **Escalar al usuario** antes de continuar

---

## Fase 4: Conversación Scrum (PO ↔ SM)

> **Agente**: `@scrum` → usa `crear-backlog-borrador.prompt.md`  
> **Referencia**: `.github/plugins/scrum/prompts/crear-backlog-borrador.prompt.md`

### 4.1. Crear Carpeta de Borrador

```bash
cd ARCHIVO/DISCO/BACKLOG_BORRADORES/
mkdir {NOMBRE_SUBMODULO_SCREAMING_SNAKE}
cd {NOMBRE_SUBMODULO_SCREAMING_SNAKE}/
```

**Convención**: `SCREAMING_SNAKE_CASE` para carpetas de datos.

### 4.2. Conversación PO-SM

**Archivo**: `conversacion-po-sm.md`

**Estructura**:

```markdown
# Conversación PO-SM: {Nombre Submódulo}

**Fecha**: {YYYY-MM-DD}  
**Submódulo**: `{nombre-submodulo}`  
**Plugin objetivo**: `{plugin-id}`

---

## Análisis Técnico (SM)

### Inventario del submódulo

{Lo descubierto en Fase 2: arquitectura, tecnologías, dependencias}

### Gaps identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | ... | Must | 1 |
| G2 | ... | Should | 1 |

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| ... | ... | ... | ... |

---

## Visión de Producto (PO)

### Casos de uso objetivo

1. **UC1**: {Descripción del caso de uso}
2. **UC2**: ...

### Criterios de éxito

- [ ] {Criterio 1}
- [ ] {Criterio 2}

---

## Decisiones Arquitectónicas

1. **{Decisión}**: {Rationale}
2. ...

---

## Próximos Pasos

- [ ] Generar backlog borrador
- [ ] Consultar al usuario (si modo consultivo)
- [ ] Aprobar con `@scrum aprobar`
```

### 4.3. Punto de Decisión

| Modo | Acción |
|------|--------|
| **Autónomo** | Continuar a Fase 5 |
| **Consultivo** | **PAUSA** — Esperar aprobación del usuario |

**Si PAUSA**: Mostrar resumen de gaps y decisiones propuestas al usuario.

---

## Fase 5: Generar Backlog Borrador

> **Agente**: `@scrum`  
> **Referencia**: `.github/plugins/scrum/prompts/crear-backlog-borrador.prompt.md`

### 5.1. Archivo de Backlog

**Archivo**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/{NOMBRE}/01_backlog-borrador.md`

**Estructura**:

```markdown
# Backlog Borrador: SCRIPT-{version} — {Nombre Plugin}

**Opportunity**: Aleph Scriptorium  
**Sprint**: {N}  
**Effort total**: {X} pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

{Descripción del problema y la solución}

---

## Feature Cycles / Iteraciones

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | {Configuración inicial} | {N} pts |
| FC2 | {Features core} | {M} pts |

---

## Stories

### SCRIPT-{version}-S01 — {Nombre Story}
**Puntos**: {X}  
**Prioridad**: Must/Should/Could  
**Estado**: ⏳ Pendiente

#### Descripción
{Qué se construye}

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | ... | 0.5 | ⏳ |
| T002 | ... | 1 | ⏳ |

#### Definition of Done
- [ ] ...
- [ ] ...

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | {N} |
| Tasks totales | {N} |
| Effort total | {X} pts |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo {nombre} | ✅ Instalado | ... |

---

## Pendiente aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.
```

### 5.2. Tabla de Effort

| Effort | Complejidad | Ejemplos |
|--------|-------------|----------|
| 1 pt | Trivial | Renombrar, mover archivo |
| 2 pts | Simple | Crear doc con plantilla, fix menor |
| 3 pts | Moderado | Feature pequeña, prompt nuevo |
| 5 pts | Complejo | Story completa, integración |
| 8 pts | Muy complejo | Capítulo, plugin nuevo |
| 13 pts | Épico | Sistema completo |

---

## Fase 6: Inicializar Plugin y Rama

> **Protocolo**: `.github/PLUGINS.md` + `plugin-install.prompt.md`  
> **Referencia**: `.github/prompts/plugin-install.prompt.md`

### 6.1. Estructura del Plugin

```bash
cd .github/plugins/
mkdir {plugin-id}
cd {plugin-id}/

# Crear estructura
mkdir -p agents prompts instructions docs
```

### 6.2. Manifest del Plugin

**Archivo**: `.github/plugins/{plugin-id}/manifest.md`

```yaml
---
id: {plugin-id}                       # kebab-case
name: "{Nombre Legible}"
version: "1.0.0"
description: "{Descripción breve del propósito}"
author: "Aleph Scriptorium"
license: "AIPL v1.0"

# Compatibilidad
scriptorium_version: ">=0.0.1"
dependencies: []                      # IDs de plugins requeridos
optional_dependencies: []             # IDs opcionales

# Integración con submódulo
submodule: "{nombre-submodulo}"      # Nombre del submódulo

# Recursos exportados
agents:
  - name: "{NombreAgente}"
    file: "agents/{nombre-agente}.agent.md"
    description: "{Qué hace}"

prompts:
  - name: "{accion-uno}"
    file: "prompts/{accion-uno}.prompt.md"
    description: "{Qué hace}"

instructions:
  - name: "{contexto}"
    file: "instructions/{plugin-id}.instructions.md"

# Integración con Aleph
handoffs:
  - label: "{Acción principal}"
    agent: "{NombreAgente}"
  - label: "{Acción secundaria}"
    agent: "{NombreAgente}"
---

# Plugin: {Nombre}

{Documentación del plugin}

## Propósito

{Por qué existe este plugin}

## Capacidades

- {Capacidad 1}
- {Capacidad 2}

## Integración con Submódulo

- **Submódulo**: `{nombre-submodulo}`
- **Rama**: `integration/beta/scriptorium`
- **Tecnología**: {Stack técnico}

## Uso

{Ejemplos de invocación}
```

### 6.3. Agente Principal

**Archivo**: `.github/plugins/{plugin-id}/agents/{nombre-agente}.agent.md`

```yaml
---
name: {NombreAgente}
description: "{Descripción del agente}"
argument-hint: "{Qué espera como input}"
tools: ['agent']
handoffs:
  - label: {Acción 1}
    agent: {NombreAgente}
    prompt: "{Prompt inicial}"
    send: false
  - label: {Acción 2}
    agent: {NombreAgente}
    prompt: "{Prompt inicial}"
    send: false
---

# Agente: {NombreAgente}

{Documentación del agente}

## Responsabilidades

- {Responsabilidad 1}
- {Responsabilidad 2}

## Comandos

| Comando | Descripción |
|---------|-------------|
| {cmd} | {desc} |

## Integración con Submódulo

{Cómo usa el submódulo}
```

### 6.4. Prompts del Plugin

**Por cada acción principal**, crear: `.github/plugins/{plugin-id}/prompts/{accion}.prompt.md`

Estructura estándar:

```yaml
---
name: {Acción}
description: "{Qué hace este prompt}"
applyTo: "ARCHIVO/PLUGINS/{ID}/**/*"
---

# Prompt: {Acción}

## Objetivo

{Qué resuelve}

## Input Esperado

{Qué necesita el usuario proporcionar}

## Proceso

1. {Paso 1}
2. {Paso 2}
3. ...

## Output Esperado

{Qué produce}

## Ejemplo

{Caso de uso concreto}
```

### 6.5. Instrucciones del Plugin

**Archivo**: `.github/plugins/{plugin-id}/instructions/{plugin-id}.instructions.md`

```yaml
---
name: {Nombre Contexto}
description: "{Qué reglas proporciona}"
applyTo: "ARCHIVO/PLUGINS/{ID}/**/*"
---

# Instrucciones: {Plugin}

## Contexto

{Por qué existen estas reglas}

## Reglas de Integración

- {Regla 1}
- {Regla 2}

## Archivos Gestionados

| Archivo | Propósito |
|---------|-----------|
| ... | ... |

## Lo que NO hacer

- {Anti-patrón 1}
- {Anti-patrón 2}
```

### 6.6. Documentación del Plugin

**Archivo**: `.github/plugins/{plugin-id}/docs/README.md`

```markdown
# Plugin: {Nombre}

## Instalación

{Cómo se instaló}

## Configuración

{Dependencias externas}

## Uso

{Ejemplos}

## Arquitectura

{Diagramas}

## Referencias

- Submódulo: `{nombre-submodulo}`
- Manifest: `manifest.md`
```

### 6.7. Crear Bridge Agent

> **Protocolo**: `.github/PLUGINS.md` sección 11 (Bridge Agents)

**Archivo**: `.github/agents/plugin_ox_{pluginid}.agent.md`

**Convención**: `plugin_ox_{nombrePlugin}` (sin guiones)

```yaml
---
name: plugin_ox_{pluginid}
description: "Bridge: conecta VS Code con agentes de {nombre}. Ver .github/plugins/{id}/agents/"
argument-hint: "Invoca agentes del plugin {nombre} o consulta su índice."
tools: ['agent']
handoffs:
  - label: Listar agentes de {nombre}
    agent: plugin_ox_{pluginid}
    prompt: Lista agentes disponibles en este plugin.
    send: false
  - label: {Acción principal}
    agent: {NombreAgente}
    prompt: "{Descripción}"
    send: false
  # Un handoff por cada agente del plugin
---

# Plugin Ox: {Nombre}

**Capa:** 🔌 Plugins (Bridge) — ver taxonomía en @ox

> Agente bridge que conecta VS Code con `.github/plugins/{id}/agents/`.

## Agentes disponibles

| Agente | Archivo | Descripción |
|--------|---------|-------------|
| {Agente1} | agents/{agente1}.agent.md | {desc} |

## Casos de Uso

{Escenarios de invocación}

## Referencia

- Manifest: `.github/plugins/{id}/manifest.md`
- Agentes: `.github/plugins/{id}/agents/`
- Submódulo: `{nombre-submodulo}`
```

### 6.8. Directorio de Datos Runtime

```bash
cd ARCHIVO/PLUGINS/
mkdir {ID_SCREAMING_SNAKE}
cd {ID_SCREAMING_SNAKE}/
```

**README de Datos**

**Archivo**: `ARCHIVO/PLUGINS/{ID}/README.md`

```markdown
# Datos Runtime: {Nombre Plugin}

**Plugin**: `{plugin-id}`  
**Submódulo**: `{nombre-submodulo}`

---

## Propósito

Esta carpeta almacena datos **generados durante la ejecución** del plugin.
El código del plugin está en `.github/plugins/{id}/` (inmutable).

## Archivos Gestionados

| Archivo | Propósito | Creado por |
|---------|-----------|------------|
| {archivo1} | {desc} | {acción} |
| {archivo2} | {desc} | {acción} |

## Convención

- **Código**: `.github/plugins/{id}/` (kebab-case)
- **Datos**: `ARCHIVO/PLUGINS/{ID}/` (SCREAMING_SNAKE_CASE)

---

## Referencias

- Plugin manifest: `.github/plugins/{id}/manifest.md`
- Bridge: `.github/agents/plugin_ox_{pluginid}.agent.md`
```

---

## Fase 7: Actualizar Configuración del Sistema

### 7.1. Actualizar registry.json

**Archivo**: `.github/plugins/registry.json`

**Añadir entrada**:

```json
{
  "version": "1.0.0",
  "last_updated": "{YYYY-MM-DDTHH:mm:ssZ}",
  "plugins": {
    "{plugin-id}": {
      "name": "{Nombre}",
      "version": "1.0.0",
      "description": "{Descripción breve}",
      "author": "Aleph Scriptorium",
      "installed_at": "{YYYY-MM-DDTHH:mm:ssZ}",
      "enabled": true,
      "agents_count": {N},
      "prompts_count": {N},
      "data_directory": "ARCHIVO/PLUGINS/{ID}/",
      "bridge_agent": "plugin_ox_{pluginid}",
      "dependencies": [],
      "submodule": "{nombre-submodulo}",
      "handoffs": [
        {
          "label": "{Acción}",
          "agent": "{NombreAgente}"
        }
      ]
    }
  }
}
```

### 7.2. Actualizar setup-workspace.sh (CRÍTICO)

**Archivo**: `scripts/setup-workspace.sh`

> ⚠️ **ATENCIÓN**: Este archivo contiene 4 zonas que DEBEN actualizarse:
> 1. Comentario de contador
> 2. Variables de submódulo
> 3. Template de settings.json
> 4. Llamadas a setup_submodule

**1. Actualizar comentario de contador** (línea ~14):

```bash
# Submódulos del proyecto (N en total)  # ← Actualizar N
```

**2. Añadir variables de entorno** (después de las existentes):

```bash
SUBMODULE_{NOMBRE}_DIR="$ROOT_DIR/{nombre-submodulo}"
SUBMODULE_{NOMBRE}_URL="https://github.com/escrivivir-co/{nombre-submodulo}.git"
```

**3. Actualizar settings.json template** (❗ CRÍTICO PARA DISCOVERY):

```bash
# Buscar la sección cat > "$SETTINGS_FILE" y añadir:

# En chat.promptFilesLocations:
".github/plugins/{plugin-id}/prompts": true,

# En chat.instructionsFilesLocations:
".github/plugins/{plugin-id}/instructions": true,
```

**Verificar que el template incluye TODOS los plugins**:
```bash
grep -c "plugins/" scripts/setup-workspace.sh
# Debe coincidir con: número_de_plugins * 2 (prompts + instructions)
```

**4. Añadir llamada setup_submodule** (al final de la lista):

```bash
setup_submodule "$SUBMODULE_{NOMBRE}_DIR" "$SUBMODULE_{NOMBRE}_URL" "{nombre-submodulo}"
```

**5. Actualizar mensaje final**:

```bash
echo "[setup] ✔ Setup completado (N submódulos)"  # Actualizar N
```

### 7.3. Actualizar scripts/README.md

**Archivo**: `scripts/README.md`

**Actualizar contador y lista**:

```markdown
## Submódulos Gestionados (6)

| Submódulo | Propósito | Plugin |
|-----------|-----------|--------|
| vscode-alephscript-extension | Extensión VS Code | N/A |
| alephscript-mcp-presets-site | MCP Presets (Zeus) | mcp-presets |
| as-utils-sdk | VibeCoding Connector | N/A |
| as-gym | Almas para Agentes (FIA) | N/A |
| alephscript-network-sdk | Oasis/Scuttlebutt P2P | network |
| {nombre-submodulo} | {Descripción} | {plugin-id} |
```

### 7.4. Actualizar aleph.agent.md

**Archivo**: `.github/agents/aleph.agent.md`

**Añadir handoff en sección handoffs**:

```yaml
handoffs:
  # ... handoffs existentes ...
  - label: "[{ID}] {Descripción acción}"
    agent: plugin_ox_{pluginid}
    prompt: "Accede al plugin {Nombre}. {Capacidades}."
    send: false
```

### 7.5. Actualizar ox.agent.md (4 ACTUALIZACIONES)

**Archivo**: `.github/agents/ox.agent.md`

> ⚠️ **ATENCIÓN**: Este archivo requiere 4 modificaciones en zonas distintas.

**1. Actualizar versión del índice** (en el JSON embebido):

```json
{
  "version": "1.{X}.0",  // Incrementar minor
  "ultima_actualizacion": "{YYYY-MM-DD}",
  ...
}
```

**2. Añadir plugin a `plugins.por_plugin`** (dentro del JSON):

```json
"plugins": {
  "por_plugin": {
    // ... plugins existentes ...
    "{plugin-id}": {
      "directorio": ".github/plugins/{plugin-id}/agents/",
      "agentes": ["{Agente1}", "{Agente2}"]
    }
  }
}
```

**3. Añadir bridge a `plugins.bridges.agentes`** (dentro del JSON):

```json
"bridges": {
  "agentes": {
    // ... bridges existentes ...
    "plugin_ox_{pluginid}": {
      "archivo": ".github/agents/plugin_ox_{pluginid}.agent.md",
      "plugin": "{plugin-id}",
      "delega_a": {N}
    }
  }
}
```

**4. Añadir handoff en frontmatter YAML** (sección `handoffs:`):

```yaml
handoffs:
  # ... handoffs existentes ...
  - label: Invocar bridge {Nombre}
    agent: plugin_ox_{pluginid}
    prompt: Accede al plugin {Nombre} a través de su bridge.
    send: false
```

**Verificación**:
```bash
# Contar bridges en el índice
grep -c "plugin_ox_" .github/agents/ox.agent.md
# Debe ser igual al número de plugins con bridge
```

---

### 7.6. Validación de Integridad

> **Propósito**: Verificar que todas las actualizaciones son consistentes.

**Ejecutar verificación cruzada**:

```bash
cd /ruta/al/SCRIPTORIUM/ALEPH

# 1. Contar submódulos reales
REAL=$(git submodule status | wc -l)
echo "Submódulos reales: $REAL"

# 2. Contar en setup-workspace.sh
SETUP_VARS=$(grep -c "SUBMODULE_.*_DIR=" scripts/setup-workspace.sh)
SETUP_CALLS=$(grep -c "setup_submodule" scripts/setup-workspace.sh)
echo "Variables SUBMODULE: $SETUP_VARS"
echo "Llamadas setup_submodule: $SETUP_CALLS"

# 3. Contar plugins en registry.json
PLUGINS=$(grep -c '"enabled": true' .github/plugins/registry.json)
echo "Plugins habilitados: $PLUGINS"

# 4. Contar bridges
BRIDGES=$(ls -1 .github/agents/plugin_ox_*.agent.md 2>/dev/null | wc -l)
echo "Bridges: $BRIDGES"

# 5. Verificar settings.json template
SETTINGS_PROMPTS=$(grep -c 'plugins/.*/prompts' scripts/setup-workspace.sh)
SETTINGS_INSTR=$(grep -c 'plugins/.*/instructions' scripts/setup-workspace.sh)
echo "Settings prompts: $SETTINGS_PROMPTS"
echo "Settings instructions: $SETTINGS_INSTR"
```

**Tabla de consistencia esperada**:

| Métrica | Valor Esperado | Comando |
|---------|----------------|--------|
| Submódulos | N | `git submodule status \| wc -l` |
| Variables SUBMODULE | N | `grep -c "SUBMODULE_.*_DIR=" setup-workspace.sh` |
| Llamadas setup_submodule | N | `grep -c "setup_submodule" setup-workspace.sh` |
| Plugins enabled | M | `grep -c '"enabled": true' registry.json` |
| Bridges | M | `ls plugin_ox_*.agent.md \| wc -l` |
| Settings prompts | M | `grep -c 'plugins/.*/prompts' setup-workspace.sh` |
| Settings instructions | M | `grep -c 'plugins/.*/instructions' setup-workspace.sh` |

> **Nota**: N = número de submódulos, M = número de plugins (pueden diferir si hay submódulos sin plugin)

---

## Fase 8: Publicar y Commits

> **Propósito**: Crear commits separados (instalación + backlog) y documentar para usuarios avanzados.
>
> **⚠️ IMPORTANTE**: Los submódulos son para usuarios expertos. No recomendado para usuarios básicos.

### 8.1. Verificar Estado

```bash
cd /ruta/al/SCRIPTORIUM/ALEPH
git status --short
```

### 8.2. Verificar Commit en Submódulo

> **Nota**: El commit del submódulo ya se hizo en la **Fase 2.4**.
> Este paso es solo de verificación.

```bash
cd {nombre-submodulo}

# Verificar que el commit existe
git log --oneline -1
# Debe mostrar: "docs: añadir README de integración con Scriptorium"

# Verificar rama
git branch --show-current
# Debe ser: integration/beta/scriptorium

# Si NO se hizo el commit en Fase 2, hacerlo ahora:
# git add README-SCRIPTORIUM.md
# git commit -m "docs: añadir README de integración con Scriptorium..."

# Opcional: publicar rama (si tienes permisos)
git push -u origin integration/beta/scriptorium
```

### 8.3. Commit en Repositorio Principal

**IMPORTANTE**: Verificar rama de trabajo antes de commit:

```bash
cd /ruta/al/SCRIPTORIUM/ALEPH

# 1. Leer rama configurada
BRANCH=$(cat .github/workspace-config.json | grep '"branch"' | cut -d'"' -f4)
CURRENT=$(git branch --show-current)

# 2. Verificar coincidencia
if [ "$CURRENT" != "$BRANCH" ]; then
  echo "⚠️ ERROR: Rama incorrecta"
  echo "Configurado: $BRANCH, Actual: $CURRENT"
  echo "Cambiar con: git checkout $BRANCH"
  exit 1
fi

# 3. Añadir todos los archivos del plugin
git add .github/plugins/{plugin-id}/ \
        .github/agents/plugin_ox_{pluginid}.agent.md \
        ARCHIVO/PLUGINS/{ID}/ \
        ARCHIVO/DISCO/BACKLOG_BORRADORES/{NOMBRE}/ \
        .github/plugins/registry.json \
        .github/agents/aleph.agent.md \
        .github/agents/ox.agent.md \
        scripts/setup-workspace.sh \
        scripts/README.md \
        .gitmodules \
        {nombre-submodulo}

# Generar commit conforme a protocolo DevOps
git commit -m "feat(script/plugins): instalar plugin {Nombre} ({Tecnología})

- Crear plugin {plugin-id} para {propósito}
- Añadir submódulo {nombre-submodulo} (commit {hash})
- Crear bridge plugin_ox_{pluginid} para VS Code
- Actualizar registry.json con plugin {plugin-id} v1.0.0
- Actualizar setup-workspace.sh ({Nº} submódulo)
- Actualizar scripts/README.md documentación
- Añadir handoffs en aleph.agent.md y ox.agent.md (v{X}.{Y}.0)
- Crear backlog borrador SCRIPT-{version} ({X} pts, {N} tasks)

Plugin permite:
- {Capacidad 1}
- {Capacidad 2}
- {Capacidad 3}

Estructura creada:
- .github/plugins/{plugin-id}/ (manifest, agente, {N} prompts, instructions)
- .github/agents/plugin_ox_{pluginid}.agent.md (bridge)
- ARCHIVO/PLUGINS/{ID}/ (datos runtime)
- ARCHIVO/DISCO/BACKLOG_BORRADORES/{NOMBRE}/ (conversación PO-SM)

Dependencias: {lista}, {tecnologías externas}

refs #SCRIPT-{version}-T001"
```

### 8.4. Commit del Backlog Borrador (SEPARADO)

> **Propósito**: Separar la instalación (infraestructura) del backlog (planificación).

```bash
# Si el backlog está en un commit separado
git add ARCHIVO/DISCO/BACKLOG_BORRADORES/{NOMBRE}/

git commit -m "docs(script/backlog): crear borrador SCRIPT-{version} — {Nombre}

Backlog borrador para integración de {nombre-submodulo}:
- Conversación PO-SM: {N} gaps identificados
- Épica SCRIPT-{version}: {Título}
- {M} stories, {P} tasks
- Effort total: {X} pts

Pendiente aprobación con @scrum aprobar.

refs #SCRIPT-{version}"
```

### 8.5. Advertencia para Usuarios

> **⚠️ Los submódulos son para usuarios expertos o avanzados.**
> 
> Para usuarios básicos, recomendar usar los plugins ya instalados o esperar releases estables.

**Actualizar `docs/leeme.md`** (sección correspondiente):

```markdown
## Submódulos (Solo Usuarios Avanzados)

> ⚠️ **ADVERTENCIA**: Los submódulos requieren conocimientos de Git avanzados.
> Si eres un usuario nuevo, usa las funcionalidades ya integradas.

| Submódulo | Propósito | Requiere |
|-----------|-----------|----------|
| {nombre} | {desc} | Git, {tecnología} |
```

### 8.6. Verificación Post-Instalación

```bash
# 1. Ejecutar setup script
./scripts/setup-workspace.sh

# 2. Verificar settings creado
cat .vscode/settings.json | grep "{plugin-id}"

# 3. Verificar submódulo activo
cd {nombre-submodulo} && git branch --show-current
# Debe ser: integration/beta/scriptorium
```

**En VS Code**:
- Reiniciar/recargar ventana
- En Copilot Chat escribir `/` → verificar prompts del nuevo plugin
- Escribir `@` → verificar bridge `plugin_ox_{pluginid}`

---

## Checklist Final

> **Protocolo de 8 fases**: Ver `.github/instructions/submodulo-integracion.instructions.md`

Antes de considerar la instalación completa:

### Fase 0: Verificación Previa
- [ ] Ejecutado `git submodule status | wc -l` para obtener N actual
- [ ] Verificado que `setup-workspace.sh` tiene N submódulos declarados
- [ ] Verificado que `scripts/README.md` documenta N submódulos
- [ ] Corregidas discrepancias (si las había)

### Fase 1: Instalar Submódulo
- [ ] Submódulo clonado con `git submodule add`
- [ ] Rama `integration/beta/scriptorium` creada
- [ ] `.gitmodules` actualizado correctamente

### Fase 2: Inspección de Codebase
- [ ] Estructura explorada y documentada
- [ ] `README-SCRIPTORIUM.md` creado en raíz del submódulo
- [ ] Tabla de análisis completada

### Fase 3: Match con Instrucciones
- [ ] Instrucciones del usuario cotejadas
- [ ] Decisión tomada (plugin sí/no, features sí/no)
- [ ] Gaps documentados

### Fase 4: Conversación Scrum (PO ↔ SM)
- [ ] Carpeta `BACKLOG_BORRADORES/{NOMBRE}/` creada
- [ ] `conversacion-po-sm.md` con gaps identificados
- [ ] **PAUSA** en modo consultivo respetada

### Fase 5: Backlog Borrador
- [ ] `01_backlog-borrador.md` con épica/stories/tasks
- [ ] Effort estimado según tabla de puntos
- [ ] Pendiente aprobación con `@scrum aprobar`

### Fase 6: Plugin y Rama
- [ ] Carpeta `.github/plugins/{plugin-id}/` creada
- [ ] `manifest.md` con metadatos completos
- [ ] Agente principal en `agents/`
- [ ] Al menos 1 prompt en `prompts/`
- [ ] Instructions en `instructions/`
- [ ] `docs/README.md` creado
- [ ] Bridge `plugin_ox_{pluginid}.agent.md` creado
- [ ] `ARCHIVO/PLUGINS/{ID}/README.md` creado

### Fase 7: Integrar Sistema (⚠️ CRÍTICO)

#### 7.1 registry.json
- [ ] Plugin añadido con todos los campos
- [ ] `bridge_agent` apunta al bridge correcto
- [ ] `submodule` especifica el submódulo

#### 7.2 setup-workspace.sh (4 ZONAS)
- [ ] Comentario contador actualizado ("N en total")
- [ ] Variables `SUBMODULE_{NOMBRE}_DIR` y `_URL` añadidas
- [ ] **settings.json template**: plugin en `chat.promptFilesLocations`
- [ ] **settings.json template**: plugin en `chat.instructionsFilesLocations`
- [ ] Llamada `setup_submodule` añadida
- [ ] Mensaje final actualizado ("N submódulos")

#### 7.3 scripts/README.md
- [ ] Contador actualizado
- [ ] Nuevo submódulo en lista con descripción

#### 7.4 aleph.agent.md
- [ ] Handoff `[{ID}]` añadido en sección `handoffs:`

#### 7.5 ox.agent.md (4 ZONAS)
- [ ] Versión incrementada (ej: 1.3.0 → 1.4.0)
- [ ] `ultima_actualizacion` actualizada
- [ ] Plugin añadido en `plugins.por_plugin`
- [ ] Bridge añadido en `plugins.bridges.agentes`
- [ ] Handoff añadido en frontmatter YAML

#### 7.6 Validación de Integridad
- [ ] `git submodule status | wc -l` = N+1
- [ ] Variables SUBMODULE = N+1
- [ ] Llamadas setup_submodule = N+1
- [ ] Settings prompts = número de plugins
- [ ] Settings instructions = número de plugins

### Fase 8: Publicar y Commits
- [ ] Rama de trabajo verificada (`workspace-config.json`)
- [ ] Commit de instalación (infraestructura)
- [ ] Commit de backlog (borrador) — **SEPARADO**
- [ ] Advertencia de usuarios expertos añadida
- [ ] `docs/leeme.md` actualizado
- [ ] Verificación post-instalación pasada
- [ ] VS Code reiniciado
- [ ] Prompts y bridge detectados

---

## Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Submódulo | `alephscript-{nombre}-{tipo}` | `alephscript-network-sdk` |
| Plugin ID | `kebab-case` | `network`, `mcp-presets` |
| Bridge | `plugin_ox_{nombre}` | `plugin_ox_network` |
| Agente | `PascalCase` | `Network`, `McpPresets` |
| Datos | `SCREAMING_SNAKE_CASE` | `NETWORK`, `MCP_PRESETS` |
| Backlog | `SCREAMING_SNAKE_CASE` | `NETWORK-SDK` |
| Rama | `integration/beta/scriptorium` | (fijo) |

---

## Archivos Generados (Inventario Típico)

### Submódulo (1 archivo nuevo)
- `{nombre-submodulo}/README-SCRIPTORIUM.md`

### Backlog (2 archivos nuevos)
- `ARCHIVO/DISCO/BACKLOG_BORRADORES/{NOMBRE}/conversacion-po-sm.md`
- `ARCHIVO/DISCO/BACKLOG_BORRADORES/{NOMBRE}/01_backlog-borrador.md`

### Plugin (mínimo 5 archivos, típico 7-10 nuevos)
- `.github/plugins/{plugin-id}/manifest.md`
- `.github/plugins/{plugin-id}/agents/{agente}.agent.md`
- `.github/plugins/{plugin-id}/prompts/{accion1}.prompt.md`
- `.github/plugins/{plugin-id}/prompts/{accion2}.prompt.md` (opcional, múltiples)
- `.github/plugins/{plugin-id}/instructions/{plugin-id}.instructions.md`
- `.github/plugins/{plugin-id}/docs/README.md`

### Integración (2 archivos nuevos)
- `.github/agents/plugin_ox_{pluginid}.agent.md`
- `ARCHIVO/PLUGINS/{ID}/README.md`

### Modificados (6 archivos - ⚠️ TODOS OBLIGATORIOS)

| Archivo | Zonas a modificar | Verificación |
|---------|-------------------|-------------|
| `.github/plugins/registry.json` | 1 (añadir plugin) | `grep "{plugin-id}" registry.json` |
| `.github/agents/aleph.agent.md` | 1 (handoff) | `grep "\[{ID}\]" aleph.agent.md` |
| `.github/agents/ox.agent.md` | 4 (versión, plugin, bridge, handoff) | `grep "plugin_ox_{pluginid}" ox.agent.md` |
| `scripts/setup-workspace.sh` | 4 (comentario, vars, settings, llamada) | Ver sección 7.2 |
| `scripts/README.md` | 2 (contador, lista) | `grep "{nombre-submodulo}" README.md` |
| `.gitmodules` | 1 (automático por git submodule add) | `git submodule status` |

**Total típico**: 12-15 archivos nuevos, 6 modificados

---

## Diagrama de Dependencias de Actualización

```
                    ┌─────────────────────────┐
                    │   git submodule add     │
                    │   (crea .gitmodules)    │
                    └───────────┬─────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
    ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
    │ Plugin Code   │   │ Backlog       │   │ Runtime Data  │
    │ .github/      │   │ ARCHIVO/DISCO │   │ ARCHIVO/      │
    │ plugins/{id}/ │   │ /BACKLOG_.../ │   │ PLUGINS/{ID}/ │
    └───────┬───────┘   └───────────────┘   └───────────────┘
            │
            ▼
    ┌───────────────┐
    │ Bridge Agent  │
    │ .github/      │
    │ agents/       │
    │ plugin_ox_*   │
    └───────┬───────┘
            │
    ┌───────┴───────────────────────────────────────┐
    │               ACTUALIZACIONES OBLIGATORIAS     │
    ├───────────────────────────────────────────────┤
    │                                               │
    │  ┌─────────────────┐    ┌─────────────────┐  │
    │  │ registry.json   │    │ aleph.agent.md  │  │
    │  │ (1 zona)        │    │ (1 handoff)     │  │
    │  └─────────────────┘    └─────────────────┘  │
    │                                               │
    │  ┌─────────────────┐    ┌─────────────────┐  │
    │  │ ox.agent.md     │    │ setup-          │  │
    │  │ (4 zonas)       │    │ workspace.sh    │  │
    │  │ - versión       │    │ (4 zonas)       │  │
    │  │ - por_plugin    │    │ - comentario    │  │
    │  │ - bridges       │    │ - variables     │  │
    │  │ - handoff       │    │ - settings.json │  │
    │  └─────────────────┘    │ - llamada       │  │
    │                         └─────────────────┘  │
    │                                               │
    │  ┌─────────────────┐                         │
    │  │ scripts/        │                         │
    │  │ README.md       │                         │
    │  │ (2 zonas)       │                         │
    │  └─────────────────┘                         │
    │                                               │
    └───────────────────────────────────────────────┘
```

---

## Referencias

- **Protocolo de Plugins**: `.github/PLUGINS.md`
- **Protocolo DevOps**: `.github/DEVOPS.md`
- **Script de Setup**: `scripts/setup-workspace.sh`
- **Documentación de Scripts**: `scripts/README.md`
- **Agente Ox**: `.github/agents/ox.agent.md`
- **Agente Plugin Manager**: `.github/agents/plugin-manager.agent.md`

---

## Ejemplo: Plugin Network (Oasis/Scuttlebutt)

Ver instalación completa de referencia:

- **Commit submódulo**: `54dbd3d`
- **Commit principal**: `a42eb0b`
- **Backlog**: `ARCHIVO/DISCO/BACKLOG_BORRADORES/NETWORK-SDK/`
- **Plugin**: `.github/plugins/network/`
- **Bridge**: `.github/agents/plugin_ox_network.agent.md`

**Comando de instalación**:
```bash
git submodule add https://github.com/escrivivir-co/alephscript-network-sdk.git
```

**Resultado**:
- 19 archivos modificados
- 1896 inserciones
- Sprint SCRIPT-1.11.0 (28 pts, 34 tasks)
