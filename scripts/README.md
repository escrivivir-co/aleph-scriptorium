# Scripts — Guía de Usuario

> **Requisitos**: macOS con rbenv y Ruby 3.0.1+
> **Última validación**: 2025-12-24

---

## Scripts Disponibles

| Script | Propósito |
|--------|-----------|
| `setup-workspace.sh` | Inicializa VS Code settings y los 10 submódulos |
| `setup-jekyll.sh` | Instala Jekyll y dependencias |
| `validate-site.sh` | Compila el sitio sin servidor |
| `serve-site.sh` | Inicia servidor local con live reload |

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
   
2. **Sincroniza los 10 submódulos** con rama `integration/beta/scriptorium`:
   - `vscode-alephscript-extension` — Extensión VS Code / Arrakis Theater
   - `alephscript-mcp-presets-site` — Zeus MCP Presets (UI web)
   - `as-utils-sdk` — VibeCoding Connector / Matrix Theater
   - `as-gym` — FIA (Fundamentos de IA) / Almas para Agentes
   - `alephscript-network-sdk` — Oasis/Scuttlebutt P2P Network
   - `kick-aleph-bot` — Bot Kick para streaming (chat commands)
   - `kick-aleph-crono-bot` — Bot Kick para cronología (time tracking)
   - `mcp-novelist` — Servidor MCP para edición de narrativas
   - `blockly-alephscript-sdk` — Editor visual Blockly para lógica de personajes
   - `node-red-alephscript-sdk` — Diseñador de flujos Node-RED

### Output esperado

```
[setup] Aleph Scriptorium — inicialización del workspace
[setup] VS Code settings creados/actualizados
[setup] Sincronizando submódulos
[setup] Configurando submódulo: vscode-alephscript-extension
[setup] Configurando submódulo: alephscript-mcp-presets-site
[setup] Configurando submódulo: as-utils-sdk
[setup] Configurando submódulo: as-gym
[setup] Configurando submódulo: alephscript-network-sdk
[setup] Configurando submódulo: kick-aleph-bot
[setup] Configurando submódulo: kick-aleph-crono-bot
[setup] Configurando submódulo: mcp-novelist
[setup] Configurando submódulo: blockly-alephscript-sdk
[setup] Configurando submódulo: node-red-alephscript-sdk
[setup] ✔ Setup completado (10 submódulos)

Submódulos configurados (10):
  - vscode-alephscript-extension: Extensión VS Code / Arrakis Theater
  - alephscript-mcp-presets-site: Zeus MCP Presets (UI web)
  - as-utils-sdk: VibeCoding Connector / Matrix Theater
  - as-gym: FIA (Fundamentos de IA) / Almas para Agentes
  - alephscript-network-sdk: Oasis/Scuttlebutt P2P Network
  - kick-aleph-bot: Bot Kick para streaming (chat commands)
  - kick-aleph-crono-bot: Bot Kick para cronología (time tracking)
  - mcp-novelist: Servidor MCP para edición de narrativas
  - blockly-alephscript-sdk: Editor visual Blockly
  - node-red-alephscript-sdk: Diseñador de flujos Node-RED
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
