---
name: Instalar Submódulo
description: Protocolo completo para añadir un nuevo submódulo al Scriptorium con plugin, backlog y configuración.
applyTo: "scripts/**, .github/plugins/**, ARCHIVO/DISCO/BACKLOG_BORRADORES/**"
---

# Prompt: Instalar Submódulo con Plugin

Este prompt documenta el protocolo completo para instalar un nuevo submódulo en ALEPH Scriptorium, incluyendo plugin asociado, backlog de planificación y configuración del workspace.

---

## Contexto

El Scriptorium integra **submódulos externos** que extienden sus capacidades.

> **IMPORTANTE**: El número de submódulos es **dinámico**. Antes de iniciar, ejecutar:
> ```bash
> git submodule status | wc -l
> ```
> Esto devuelve el número actual (ej: 8). El nuevo submódulo será el N+1.

Cada submódulo:
- Se integra en rama `integration/beta/scriptorium`
- Genera un **plugin** en `.github/plugins/{id}/`
- Tiene **backlog de planificación** en `ARCHIVO/DISCO/BACKLOG_BORRADORES/`
- Se configura en `scripts/setup-workspace.sh`
- Se registra en `.vscode/settings.json` (discovery de prompts/instructions)

---

## Fase 0: Verificación de Estado Actual (OBLIGATORIA)

> **Propósito**: Evitar desincronizaciones entre submódulos reales y configuración documentada.

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

## Fase 1: Revisión de Protocolo

### 1.1. Leer Documentación Existente

```bash
# Revisar protocolo de scripts
cat scripts/README.md

# Revisar setup-workspace.sh
cat scripts/setup-workspace.sh
```

**Objetivo**: Entender la estructura de submódulos existentes y el patrón de instalación.

### 1.2. Calcular Número de Orden

```bash
# El nuevo submódulo será el N+1
NUEVO_ORDEN=$(($(git submodule status | wc -l) + 1))
echo "El nuevo submódulo será el número: $NUEVO_ORDEN"
```

---

## Fase 2: Instalación del Submódulo

### 2.1. Añadir Submódulo con Git

```bash
cd /ruta/al/SCRIPTORIUM/ALEPH

# Añadir submódulo (reemplazar URL)
git submodule add https://github.com/escrivivir-co/{nombre-submodulo}.git

# Verificar instalación
ls -la {nombre-submodulo}/
```

**Convención de nombres**:
- Repositorio: `alephscript-{nombre}-{tipo}`
- Ejemplos: `alephscript-mcp-presets-site`, `alephscript-network-sdk`

### 2.2. Crear Rama de Integración

```bash
cd {nombre-submodulo}

# Crear y cambiar a rama integration/beta/scriptorium
git checkout -b integration/beta/scriptorium

# Verificar
git branch
```

**Nombre de rama estándar**: `integration/beta/scriptorium` (consistente en todos los submódulos)

### 2.3. Explorar Estructura del Submódulo

```bash
# Listar estructura
ls -R

# Identificar:
# - Arquitectura del proyecto
# - Tecnologías usadas
# - Puntos de integración
# - Dependencias externas (Docker, Node, Python, etc.)
```

**Crear**: `README-SCRIPTORIUM.md` en la raíz del submódulo documentando:
- Propósito de la integración
- Arquitectura del submódulo
- Mapeo ontológico con Scriptorium
- Dependencias técnicas
- Supuestos/gaps conocidos

### 2.4. Commit en Submódulo

```bash
# Desde directorio del submódulo
git add README-SCRIPTORIUM.md
git commit -m "docs: añadir README de integración con Scriptorium

Documenta arquitectura, mapeo ontológico y dependencias para
integración con ALEPH Scriptorium.

refs #SCRIPT-{version}-T002"
```

---

## Fase 3: Backlog de Planificación

### 3.1. Crear Carpeta de Borrador

```bash
cd ARCHIVO/DISCO/BACKLOG_BORRADORES/
mkdir {NOMBRE_SUBMODULO_SCREAMING_SNAKE}
cd {NOMBRE_SUBMODULO_SCREAMING_SNAKE}/
```

**Convención**: `SCREAMING_SNAKE_CASE` para carpetas de datos.

### 3.2. Conversación PO-SM

**Archivo**: `conversacion-po-sm.md`

**Estructura**:

```markdown
# Conversación PO-SM: {Nombre Submódulo}

**Fecha**: {YYYY-MM-DD}  
**Submódulo**: `{nombre-submodulo}`  
**Plugin objetivo**: `{plugin-id}`

---

## Diálogo

### Product Owner (PO)

**PO**: "Hemos integrado el submódulo `{nombre}`. ¿Qué necesitamos para
convertirlo en un plugin funcional del Scriptorium?"

### Scrum Master (SM)

**SM**: "Revisemos el código y hagamos inventario..."

[Análisis de la estructura]

**SM**: "He identificado N gaps principales..."

---

## Gaps Identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | ... | Must | 1 |
| G2 | ... | Should | 1 |
| ... | ... | ... | ... |

---

## Arquitectura Propuesta

[Diagrama de integración]

---

## Decisiones Arquitectónicas

1. **{Decisión}**: {Rationale}
2. ...

---

## Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| ... | ... | ... | ... |

---

## Próximos Pasos

1. Crear backlog borrador
2. Implementar plugin base (I1)
3. ...
```

### 3.3. Backlog Borrador

**Archivo**: `01_backlog-borrador.md`

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

### Iteración 1: {Nombre}
**Effort**: {X} pts  
**Objetivo**: {Descripción}

### Iteración 2: {Nombre}
**Effort**: {X} pts  
**Objetivo**: {Descripción}

[... más iteraciones]

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

### SCRIPT-{version}-S02 — {Nombre Story}
[...]

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | {N} |
| Tasks totales | {N} |
| Effort total | {X} pts |
| Prioridad Must | {N} stories ({X} pts) |
| Prioridad Should | {N} stories ({X} pts) |
| Prioridad Could | {N} stories ({X} pts) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo {nombre} | ✅ Instalado | ... |
| ... | ... | ... |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| ... | ... | ... | ... |
```

---

## Fase 4: Crear Plugin

### 4.1. Estructura del Plugin

```bash
cd .github/plugins/
mkdir {plugin-id}
cd {plugin-id}/

# Crear estructura
mkdir -p agents prompts instructions docs
```

### 4.2. Manifest del Plugin

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

### 4.3. Agente Principal

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

### 4.4. Prompts del Plugin

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

### 4.5. Instrucciones del Plugin

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

### 4.6. Documentación del Plugin

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

---

## Fase 5: Bridge Agent

### 5.1. Crear Bridge en .github/agents/

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

---

## Fase 6: Directorio de Datos Runtime

### 6.1. Crear ARCHIVO/PLUGINS/{ID}/

```bash
cd ARCHIVO/PLUGINS/
mkdir {ID_SCREAMING_SNAKE}
cd {ID_SCREAMING_SNAKE}/
```

### 6.2. README de Datos

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

## Fase 8: Commits

### 8.1. Verificar Estado

```bash
cd /ruta/al/SCRIPTORIUM/ALEPH
git status --short
```

### 8.2. Commit en Submódulo (si hay cambios)

```bash
cd {nombre-submodulo}
git add README-SCRIPTORIUM.md  # o archivos modificados
git commit -m "docs: añadir README de integración con Scriptorium

Documenta arquitectura, mapeo ontológico y dependencias para
integración con ALEPH Scriptorium.

refs #SCRIPT-{version}-T002"

# Opcional: publicar rama
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

---

## Fase 9: Verificación

### 9.1. Ejecutar Setup Script

```bash
./scripts/setup-workspace.sh
```

**Verificar**:
- `.vscode/settings.json` creado/actualizado
- Submódulo sincronizado
- Rama `integration/beta/scriptorium` activa en submódulo

### 9.2. Reiniciar VS Code

**Acción**: Recargar ventana de VS Code para aplicar settings.

### 9.3. Verificar Discovery de Prompts

**En Copilot Chat**:
- Escribir `/`
- Buscar prompts del nuevo plugin
- Verificar que aparecen

### 9.4. Verificar Agente Bridge

**En Copilot Chat**:
- Escribir `@`
- Buscar `plugin_ox_{pluginid}`
- Verificar que aparece

---

## Checklist Final

Antes de considerar la instalación completa:

### Fase 0: Verificación Previa
- [ ] Ejecutado `git submodule status | wc -l` para obtener N actual
- [ ] Verificado que `setup-workspace.sh` tiene N submódulos declarados
- [ ] Verificado que `scripts/README.md` documenta N submódulos
- [ ] Corregidas discrepancias (si las había)

### Fase 1-2: Submódulo
- [ ] Submódulo clonado con `git submodule add`
- [ ] Rama `integration/beta/scriptorium` creada
- [ ] Estructura explorada y documentada
- [ ] `README-SCRIPTORIUM.md` creado en raíz del submódulo
- [ ] Commit en submódulo realizado

### Fase 3: Backlog
- [ ] Carpeta `BACKLOG_BORRADORES/{NOMBRE}/` creada
- [ ] `conversacion-po-sm.md` con gaps identificados
- [ ] `01_backlog-borrador.md` con épica/stories/tasks

### Fase 4: Plugin
- [ ] Carpeta `.github/plugins/{plugin-id}/` creada
- [ ] `manifest.md` con metadatos completos
- [ ] Agente principal en `agents/`
- [ ] Al menos 1 prompt en `prompts/`
- [ ] Instructions en `instructions/`
- [ ] `docs/README.md` creado

### Fase 5: Bridge
- [ ] Bridge `plugin_ox_{pluginid}.agent.md` creado en `.github/agents/`
- [ ] Handoffs del bridge apuntan a agentes reales del plugin

### Fase 6: Datos Runtime
- [ ] `ARCHIVO/PLUGINS/{ID}/README.md` creado

### Fase 7: Configuración del Sistema (⚠️ CRÍTICO)

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

### Fase 8: Commits
- [ ] Rama de trabajo verificada (`workspace-config.json`)
- [ ] Commit en submódulo ejecutado
- [ ] Commit en repositorio principal ejecutado
- [ ] Commits siguen protocolo DevOps

### Fase 9: Verificación Post-Instalación
- [ ] `./scripts/setup-workspace.sh` ejecutado sin errores
- [ ] `.vscode/settings.json` generado con rutas del nuevo plugin
- [ ] VS Code reiniciado
- [ ] Prompts del plugin detectados (`/` en Chat)
- [ ] Bridge detectado (`@` en Chat)

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
