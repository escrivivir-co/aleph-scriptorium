#!/usr/bin/env bash

# Aleph Scriptorium — Setup del Workspace
# Inicializa discovery de prompts/instructions de plugins en VS Code,
# sincroniza el submódulo de la extensión y prepara la rama de integración.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
VSCODE_DIR="$ROOT_DIR/.vscode"
SETTINGS_FILE="$VSCODE_DIR/settings.json"
INTEGRATION_BRANCH="integration/beta/scriptorium"

# Submódulos del proyecto (11 en total)
SUBMODULE_EXTENSION_DIR="$ROOT_DIR/vscode-alephscript-extension"
SUBMODULE_EXTENSION_URL="https://github.com/escrivivir-co/vscode-alephscript-extension.git"

SUBMODULE_MCP_PRESETS_DIR="$ROOT_DIR/alephscript-mcp-presets-site"
SUBMODULE_MCP_PRESETS_URL="https://github.com/escrivivir-co/alephscript-mcp-presets-site.git"

SUBMODULE_AS_UTILS_SDK_DIR="$ROOT_DIR/as-utils-sdk"
SUBMODULE_AS_UTILS_SDK_URL="https://github.com/escrivivir-co/as-utils-sdk.code-workspace"

SUBMODULE_AS_GYM_DIR="$ROOT_DIR/as-gym"
SUBMODULE_AS_GYM_URL="https://github.com/escrivivir-co/as-gym.git"
SUBMODULE_AS_GYM_BRANCH="dev/001"

SUBMODULE_NETWORK_SDK_DIR="$ROOT_DIR/alephscript-network-sdk"
SUBMODULE_NETWORK_SDK_URL="https://github.com/escrivivir-co/alephscript-network-sdk.git"

SUBMODULE_KICK_ALEPH_BOT_DIR="$ROOT_DIR/kick-aleph-bot"
SUBMODULE_KICK_ALEPH_BOT_URL="https://github.com/escrivivir-co/kick-aleph-bot.git"

SUBMODULE_KICK_CRONO_BOT_DIR="$ROOT_DIR/kick-aleph-crono-bot"
SUBMODULE_KICK_CRONO_BOT_URL="https://github.com/escrivivir-co/kick-aleph-crono-bot.git"

SUBMODULE_MCP_NOVELIST_DIR="$ROOT_DIR/mcp-novelist"
SUBMODULE_MCP_NOVELIST_URL="https://github.com/escrivivir-co/mcp-novelist.git"

SUBMODULE_BLOCKLY_SDK_DIR="$ROOT_DIR/blockly-alephscript-sdk"
SUBMODULE_BLOCKLY_SDK_URL="https://github.com/escrivivir-co/blockly-alephscript-sdk.git"

SUBMODULE_NODE_RED_SDK_DIR="$ROOT_DIR/node-red-alephscript-sdk"
SUBMODULE_NODE_RED_SDK_URL="https://github.com/escrivivir-co/node-red-alephscript-sdk.git"

SUBMODULE_PROLOG_SBR_DIR="$ROOT_DIR/iot-sbr-logica-para-bots"
SUBMODULE_PROLOG_SBR_URL="https://github.com/escrivivir-co/iot-sbr-logica-para-bots.git"

SUBMODULE_TYPED_PROMPTING_DIR="$ROOT_DIR/alephscript-typed-prompting"
SUBMODULE_TYPED_PROMPTING_URL="https://github.com/escrivivir-co/alephscript-typed-prompting.git"

echo "[setup] Aleph Scriptorium — inicialización del workspace"
echo "[setup] Raíz: $ROOT_DIR"

# 1) Crear/actualizar .vscode/settings.json con discovery de plugins
mkdir -p "$VSCODE_DIR"
cat > "$SETTINGS_FILE" <<'JSON'
{
  "chat.promptFilesLocations": {
    ".github/prompts": true,
    ".github/plugins/arg-board/prompts": true,
    ".github/plugins/enciclopedia/prompts": true,
    ".github/plugins/gh-pages/prompts": true,
    ".github/plugins/foro-scraper/prompts": true,
    ".github/plugins/agent-creator/prompts": true,
    ".github/plugins/teatro/prompts": true,
    ".github/plugins/scrum/prompts": true,
    ".github/plugins/mcp-presets/prompts": true,
    ".github/plugins/network/prompts": true,
    ".github/plugins/novelist/prompts": true,
    ".github/plugins/blockly-editor/prompts": true,
    ".github/plugins/wire-editor/prompts": true,
    ".github/plugins/prolog-editor/prompts": true,
    ".github/plugins/typed-prompting/prompts": true
  },
  "chat.instructionsFilesLocations": {
    ".github/instructions": true,
    ".github/plugins/arg-board/instructions": true,
    ".github/plugins/enciclopedia/instructions": true,
    ".github/plugins/gh-pages/instructions": true,
    ".github/plugins/foro-scraper/instructions": true,
    ".github/plugins/agent-creator/instructions": true,
    ".github/plugins/teatro/instructions": true,
    ".github/plugins/scrum/instructions": true,
    ".github/plugins/mcp-presets/instructions": true,
    ".github/plugins/network/instructions": true,
    ".github/plugins/novelist/instructions": true,
    ".github/plugins/blockly-editor/instructions": true,
    ".github/plugins/wire-editor/instructions": true,
    ".github/plugins/prolog-editor/instructions": true,
    ".github/plugins/typed-prompting/instructions": true
  },
  "chat.useNestedAgentsMdFiles": true,
  "chat.promptFilesRecommendations": true
}
JSON

echo "[setup] VS Code settings creados/actualizados: $SETTINGS_FILE"

# ============================================================
# FUNCIÓN: Configurar submódulo con rama de integración
# ============================================================
setup_submodule() {
  local SUBMODULE_DIR="$1"
  local SUBMODULE_URL="$2"
  local SUBMODULE_NAME="$3"

  echo "[setup] ─────────────────────────────────────────"
  echo "[setup] Configurando submódulo: $SUBMODULE_NAME"
  echo "[setup] ─────────────────────────────────────────"

  # Añadir submódulo si no existe
  if [[ ! -d "$SUBMODULE_DIR" ]]; then
    echo "[setup] Submódulo no encontrado. Añadiendo: $SUBMODULE_URL"
    pushd "$ROOT_DIR" >/dev/null
    git submodule add "$SUBMODULE_URL" "$(basename "$SUBMODULE_DIR")"
    popd >/dev/null
  else
    echo "[setup] Submódulo encontrado: $SUBMODULE_DIR"
  fi

  # Preparar rama de integración dentro del submódulo
  if [[ -d "$SUBMODULE_DIR/.git" ]] || [[ -f "$SUBMODULE_DIR/.git" ]]; then
    echo "[setup] Preparando rama $INTEGRATION_BRANCH en $SUBMODULE_NAME"
    pushd "$SUBMODULE_DIR" >/dev/null

    # Obtener remotos
    git fetch --all --tags || true

    # Detectar rama base (preferir dev/astilleros o dev/astillador, si no main)
    BASE_BRANCH="main"
    if git show-ref --verify --quiet refs/remotes/origin/dev/astilleros; then
      BASE_BRANCH="dev/astilleros"
    elif git show-ref --verify --quiet refs/remotes/origin/dev/astillador; then
      BASE_BRANCH="dev/astillador"
    fi

    # Crear la rama si no existe; si existe, sólo cambiar
    if ! git show-ref --verify --quiet "refs/heads/$INTEGRATION_BRANCH"; then
      echo "[setup] Creando rama $INTEGRATION_BRANCH desde $BASE_BRANCH"
      git checkout -B "$INTEGRATION_BRANCH" "origin/$BASE_BRANCH" || git checkout -b "$INTEGRATION_BRANCH"
    else
      git checkout "$INTEGRATION_BRANCH"
    fi

    # Intentar configurar upstream si el remoto existe (no obligatorio)
    if git ls-remote --exit-code --heads origin "$INTEGRATION_BRANCH" >/dev/null 2>&1; then
      git branch --set-upstream-to="origin/$INTEGRATION_BRANCH" "$INTEGRATION_BRANCH" || true
    else
      echo "[setup] Upstream remoto aún no existe. Podrás publicar con: git push -u origin $INTEGRATION_BRANCH"
    fi

    echo "[setup] $SUBMODULE_NAME listo en rama: $(git branch --show-current)"
    popd >/dev/null
  else
    echo "[setup] Aviso: el submódulo $SUBMODULE_NAME no parece inicializado correctamente. Revisa el estado."
  fi
}

# 2) Sincronizar todos los submódulos
echo "[setup] Sincronizando submódulos"
pushd "$ROOT_DIR" >/dev/null
git submodule sync
git submodule update --init --recursive
popd >/dev/null

# 3) Configurar cada submódulo con su rama de integración
setup_submodule "$SUBMODULE_EXTENSION_DIR" "$SUBMODULE_EXTENSION_URL" "vscode-alephscript-extension"
setup_submodule "$SUBMODULE_MCP_PRESETS_DIR" "$SUBMODULE_MCP_PRESETS_URL" "alephscript-mcp-presets-site"
setup_submodule "$SUBMODULE_AS_UTILS_SDK_DIR" "$SUBMODULE_AS_UTILS_SDK_URL" "as-utils-sdk"
setup_submodule "$SUBMODULE_AS_GYM_DIR" "$SUBMODULE_AS_GYM_URL" "as-gym"
setup_submodule "$SUBMODULE_NETWORK_SDK_DIR" "$SUBMODULE_NETWORK_SDK_URL" "alephscript-network-sdk"
setup_submodule "$SUBMODULE_KICK_ALEPH_BOT_DIR" "$SUBMODULE_KICK_ALEPH_BOT_URL" "kick-aleph-bot"
setup_submodule "$SUBMODULE_KICK_CRONO_BOT_DIR" "$SUBMODULE_KICK_CRONO_BOT_URL" "kick-aleph-crono-bot"
setup_submodule "$SUBMODULE_MCP_NOVELIST_DIR" "$SUBMODULE_MCP_NOVELIST_URL" "mcp-novelist"
setup_submodule "$SUBMODULE_BLOCKLY_SDK_DIR" "$SUBMODULE_BLOCKLY_SDK_URL" "blockly-alephscript-sdk"
setup_submodule "$SUBMODULE_NODE_RED_SDK_DIR" "$SUBMODULE_NODE_RED_SDK_URL" "node-red-alephscript-sdk"
setup_submodule "$SUBMODULE_PROLOG_SBR_DIR" "$SUBMODULE_PROLOG_SBR_URL" "iot-sbr-logica-para-bots"
setup_submodule "$SUBMODULE_TYPED_PROMPTING_DIR" "$SUBMODULE_TYPED_PROMPTING_URL" "alephscript-typed-prompting"

echo "[setup] ✔ Setup completado (12 submódulos)"
echo
echo "Siguientes pasos sugeridos:"
echo "  1) Reinicia VS Code para cargar prompts/instructions de plugins"
echo "  2) (Opcional) Ejecuta scripts/setup-jekyll.sh para dependencias del sitio"
echo "  3) Publica las ramas de los submódulos si lo deseas:"
echo "     cd vscode-alephscript-extension && git push -u origin $INTEGRATION_BRANCH"
echo "     cd alephscript-mcp-presets-site && git push -u origin $INTEGRATION_BRANCH"
echo "     cd as-utils-sdk && git push -u origin $INTEGRATION_BRANCH"
echo "     cd as-gym && git push -u origin $INTEGRATION_BRANCH"
echo "     cd alephscript-network-sdk && git push -u origin $INTEGRATION_BRANCH"
echo "     cd blockly-alephscript-sdk && git push -u origin $INTEGRATION_BRANCH"
echo "     cd node-red-alephscript-sdk && git push -u origin $INTEGRATION_BRANCH"
echo "     cd iot-sbr-logica-para-bots && git push -u origin $INTEGRATION_BRANCH"
echo "     cd alephscript-typed-prompting && git push -u origin $INTEGRATION_BRANCH"
echo
echo "Submódulos configurados (12):"
echo "  - vscode-alephscript-extension: Extensión VS Code / Arrakis Theater"
echo "  - alephscript-mcp-presets-site: Zeus MCP Presets (UI web)"
echo "  - as-utils-sdk: VibeCoding Connector / Matrix Theater"
echo "  - as-gym: FIA (Fundamentos de IA) / Almas para Agentes"
echo "  - alephscript-network-sdk: Oasis/Scuttlebutt P2P Network"
echo "  - kick-aleph-bot: Bot Kick para streaming"
echo "  - kick-aleph-crono-bot: Bot cronológico Kick"
echo "  - mcp-novelist: Editor MCP de narrativas"
echo "  - blockly-alephscript-sdk: Editor visual Blockly"
echo "  - node-red-alephscript-sdk: Diseñador de flujos Node-RED"
echo "  - iot-sbr-logica-para-bots: Editor de Lógica Prolog (SWI-Prolog)"
echo "  - alephscript-typed-prompting: TypedPrompting (Ontologías NL↔JSON)"
