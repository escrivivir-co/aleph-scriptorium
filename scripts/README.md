# Scripts — Guía de Usuario

> **Requisitos**: macOS con rbenv y Ruby 3.0.1+
> **Última validación**: 2025-12-24

---

## Scripts Disponibles

| Script | Propósito |
|--------|-----------|
| `setup-workspace.sh` | Inicializa VS Code settings y los 14 submódulos |
| `setup-jekyll.sh` | Instala Jekyll y dependencias |
| `validate-site.sh` | Compila el sitio sin servidor |
| `serve-site.sh` | Inicia servidor local con live reload |
| `verify-submodule-naming.sh` | Verifica convención PascalCase de submódulos |

---

## Setup del Workspace

Inicializa el workspace completo con discovery de plugins y submódulos:

```bash
./scripts/setup-workspace.sh
```

### Qué hace

1. **Crea `.vscode/settings.json`** con:
   - `chat.promptFilesLocations`: detecta prompts de plugins
   - `chat.instructionsFilesLocations`: detecta instructions de plugins
   - `chat.useNestedAgentsMdFiles`: busca agentes anidados
   
2. **Sincroniza los 14 submódulos** con rama `integration/beta/scriptorium`:
   - `VsCodeExtension` — Extensión VS Code / Arrakis Theater
   - `MCPGallery` — Zeus MCP Presets (UI web)
   - `VibeCodingSuite` — VibeCoding Connector / Matrix Theater
   - `AAIAGallery` — FIA (Fundamentos de IA) / Almas para Agentes
   - `BlockchainComPort` — Oasis/Scuttlebutt P2P Network
   - `StreamDesktop` — Bot Kick para streaming (chat commands)
   - `StreamDesktopAppCronos` — Bot Kick para cronología (time tracking)
   - `NovelistEditor` — Servidor MCP para edición de narrativas
   - `BlocklyEditor` — Editor visual Blockly para lógica de personajes
   - `WiringEditor` — Diseñador de flujos Node-RED
   - `PrologEditor` — Editor de Lógica Prolog (SWI-Prolog)
   - `TypedPromptsEditor` — TypedPrompting (Ontologías NL↔JSON)
   - `WorkflowEditor` — Editor visual de workflows (n8n connector)
   - `WiringAppHypergraphEditor` — Motor de navegación (WiringApp, ArgBoardApp, HyperGraphEditor)

### Output esperado

```
[setup] Aleph Scriptorium — inicialización del workspace
[setup] VS Code settings creados/actualizados
[setup] Sincronizando submódulos
[setup] Configurando submódulo: VsCodeExtension
[setup] Configurando submódulo: MCPGallery
[setup] Configurando submódulo: VibeCodingSuite
[setup] Configurando submódulo: AAIAGallery
[setup] Configurando submódulo: BlockchainComPort
[setup] Configurando submódulo: StreamDesktop
[setup] Configurando submódulo: StreamDesktopAppCronos
[setup] Configurando submódulo: NovelistEditor
[setup] Configurando submódulo: BlocklyEditor
[setup] Configurando submódulo: WiringEditor
[setup] Configurando submódulo: PrologEditor
[setup] Configurando submódulo: TypedPromptsEditor
[setup] Configurando submódulo: WorkflowEditor
[setup] Configurando submódulo: WiringAppHypergraphEditor
[setup] ✔ Setup completado (14 submódulos)

Submódulos configurados (14):
  - VsCodeExtension: Extensión VS Code / Arrakis Theater
  - MCPGallery: Zeus MCP Presets (UI web)
  - VibeCodingSuite: VibeCoding Connector / Matrix Theater
  - AAIAGallery: FIA (Fundamentos de IA) / Almas para Agentes
  - BlockchainComPort: Oasis/Scuttlebutt P2P Network
  - StreamDesktop: Bot Kick para streaming (chat commands)
  - StreamDesktopAppCronos: Bot Kick para cronología (time tracking)
  - NovelistEditor: Servidor MCP para edición de narrativas
  - BlocklyEditor: Editor visual Blockly
  - WiringEditor: Diseñador de flujos Node-RED
  - PrologEditor: Editor de Lógica Prolog (SWI-Prolog)
  - TypedPromptsEditor: TypedPrompting (Ontologías NL↔JSON)
  - WorkflowEditor: Editor visual de workflows (n8n connector)
  - WiringAppHypergraphEditor: Motor de navegación (WiringApp, ArgBoardApp, HyperGraphEditor)
```

---

## Requisitos Previos (Jekyll)

### 1. Instalar rbenv (si no lo tienes)

```bash
brew install rbenv
```

### 2. Instalar Ruby 3.0.1

```bash
rbenv install 3.0.1
rbenv global 3.0.1
```

### 3. Configurar shell

Añadir a `~/.zshrc`:

```bash
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
```

### 4. Verificar instalación

```bash
ruby --version
# Debe mostrar: ruby 3.0.1p64 (2021-04-05 revision 0fb782ee38) [x86_64-darwin21]
```

---

## Scripts Disponibles

| Script | Propósito |
|--------|-----------|
| `setup-jekyll.sh` | Instala Jekyll y dependencias |
| `validate-site.sh` | Compila el sitio sin servidor |
| `serve-site.sh` | Inicia servidor local con live reload |

---

## Uso

### Instalación inicial

```bash
./scripts/setup-jekyll.sh
```

**Output esperado:**

```
🔧 Instalando Jekyll para validación local...

✓ Verificando Ruby...
  ruby 3.0.1p64 (2021-04-05 revision 0fb782ee38) [x86_64-darwin21]

📦 Instalando Bundler...
Successfully installed bundler-2.5.23

📚 Instalando dependencias de Jekyll...
Fetching gem metadata from https://rubygems.org/...........
Resolving dependencies...
[... instalación de gemas ...]
Bundle complete! 7 Gemfile dependencies, 33 gems now installed.
Bundled gems are installed into `./vendor/bundle`

✅ Jekyll instalado correctamente

Comandos disponibles:
  ./scripts/validate-site.sh  - Validar Jekyll sin servidor
  ./scripts/serve-site.sh     - Iniciar servidor local (http://localhost:4000)
```

---

### Validar sitio (sin servidor)

```bash
./scripts/validate-site.sh
```

**Output esperado:**

```
🔍 Validando sitio Jekyll localmente...

📦 Compilando sitio...
Configuration file: /Users/.../docs/_config.yml
            Source: /Users/.../docs
       Destination: /Users/.../docs/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 1.33 seconds.
 Auto-regeneration: disabled. Use --watch to enable.

✅ Sitio compilado correctamente en docs/_site/

Verificaciones adicionales:
  • Páginas HTML generadas: 12
  • ✓ Directorio /teatro/ generado
    - Páginas de teatro: 3

Para ver el sitio localmente: ./scripts/serve-site.sh
```

---

### Servidor local con live reload

```bash
./scripts/serve-site.sh
```

**Output esperado:**

```
🚀 Iniciando servidor Jekyll local...

📡 Servidor iniciado en: http://localhost:4000
   Presiona Ctrl+C para detener
   (Recarga manual: F5 o Cmd+R)

Configuration file: /Users/.../docs/_config.yml
            Source: /Users/.../docs
       Destination: /Users/.../docs/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 1.28 seconds.
 Auto-regeneration: enabled for '/Users/.../docs'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

> **Nota**: No usamos `--livereload` porque EventMachine tiene problemas
> de compilación en macOS. Recarga manualmente con F5 o Cmd+R.

---

## Troubleshooting

### Error: Ruby 2.6 detectado

**Problema**: Los scripts detectan Ruby del sistema (2.6) en lugar de rbenv (3.0.1).

**Solución**:

```bash
# Verificar que rbenv esté inicializado
eval "$(rbenv init -)"

# Verificar versión
ruby --version

# Si sigue en 2.6, reiniciar shell
exec $SHELL
```

### Error: bundler no encontrado

**Solución**:

```bash
gem install bundler --user-install
```

### Error: gemas con extensiones nativas

**Problema**: Algunas gemas fallan al compilar.

**Solución**: Verificar que tienes Xcode Command Line Tools:

```bash
xcode-select --install
```

### Warning: jekyll-paginate

**Mensaje**: `You appear to have pagination turned on, but you haven't included the jekyll-paginate gem.`

**Acción**: Ignorar. No usamos paginación en este sitio.

---

## Estructura de archivos generados

```
docs/
├── _site/              # Sitio compilado (no commitear)
├── vendor/             # Gemas instaladas (no commitear)
├── Gemfile             # Dependencias
├── Gemfile.lock        # Versiones bloqueadas
└── _config.yml         # Configuración de Jekyll
```

---

## Notas

- **Gemfile.lock**: Se genera automáticamente. Commitearlo para reproducibilidad.
- **vendor/bundle**: Instalación local de gemas. Está en `.gitignore`.
- **_site/**: Output del build. Está en `.gitignore`.

---

## Versiones validadas

| Componente | Versión |
|------------|---------|
| macOS | 12.x (Monterey) |
| Ruby | 3.0.1 (via rbenv) |
| Bundler | 2.5.23 |
| Jekyll | 4.3.4 |
| Gemas | 33 dependencias |
