#!/usr/bin/env bash

# Aleph Scriptorium — Setup del Workspace
# Inicializa discovery de prompts/instructions de plugins en VS Code,
# sincroniza el submódulo de la extensión y prepara la rama de integración.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
VSCODE_DIR="$ROOT_DIR/.vscode"
SETTINGS_FILE="$VSCODE_DIR/settings.json"
INTEGRATION_BRANCH="integration/beta/scriptorium"

SUBMODULE_EXTENSION_DIR="$ROOT_DIR/VsCodeExtension"
SUBMODULE_EXTENSION_URL="https://github.com/escrivivir-co/vscode-alephscript-extension.git"

SUBMODULE_MCP_PRESETS_DIR="$ROOT_DIR/MCPGallery"
SUBMODULE_MCP_PRESETS_URL="https://github.com/escrivivir-co/alephscript-mcp-presets-site.git"

SUBMODULE_AS_UTILS_SDK_DIR="$ROOT_DIR/VibeCodingSuite"
SUBMODULE_AS_UTILS_SDK_URL="https://github.com/escrivivir-co/as-utils-sdk.code-workspace"

SUBMODULE_AS_GYM_DIR="$ROOT_DIR/AAIAGallery"
SUBMODULE_AS_GYM_URL="https://github.com/escrivivir-co/as-gym.git"
SUBMODULE_AS_GYM_BRANCH="dev/001"

SUBMODULE_NETWORK_SDK_DIR="$ROOT_DIR/BlockchainComPort"
SUBMODULE_NETWORK_SDK_URL="https://github.com/escrivivir-co/alephscript-network-sdk.git"

SUBMODULE_KICK_ALEPH_BOT_DIR="$ROOT_DIR/StreamDesktop"
SUBMODULE_KICK_ALEPH_BOT_URL="https://github.com/escrivivir-co/kick-aleph-bot.git"

SUBMODULE_KICK_CRONO_BOT_DIR="$ROOT_DIR/StreamDesktopAppCronos"
SUBMODULE_KICK_CRONO_BOT_URL="https://github.com/escrivivir-co/kick-aleph-crono-bot.git"

SUBMODULE_MCP_NOVELIST_DIR="$ROOT_DIR/NovelistEditor"
SUBMODULE_MCP_NOVELIST_URL="https://github.com/escrivivir-co/mcp-novelist.git"

SUBMODULE_BLOCKLY_SDK_DIR="$ROOT_DIR/BlocklyEditor"
SUBMODULE_BLOCKLY_SDK_URL="https://github.com/escrivivir-co/blockly-alephscript-sdk.git"

SUBMODULE_NODE_RED_SDK_DIR="$ROOT_DIR/WiringEditor"
SUBMODULE_NODE_RED_SDK_URL="https://github.com/escrivivir-co/node-red-alephscript-sdk.git"

SUBMODULE_PROLOG_SBR_DIR="$ROOT_DIR/PrologEditor"
SUBMODULE_PROLOG_SBR_URL="https://github.com/escrivivir-co/iot-sbr-logica-para-bots.git"

SUBMODULE_TYPED_PROMPTING_DIR="$ROOT_DIR/TypedPromptsEditor"
SUBMODULE_TYPED_PROMPTING_URL="https://github.com/escrivivir-co/alephscript-typed-prompting.git"

SUBMODULE_N8N_EDITOR_DIR="$ROOT_DIR/WorkflowEditor"
SUBMODULE_N8N_EDITOR_URL="https://github.com/escrivivir-co/alephscript-n8n-like-editor.git"

SUBMODULE_WIKI_RACER_DIR="$ROOT_DIR/WiringAppHypergraphEditor"
SUBMODULE_WIKI_RACER_URL="https://github.com/escrivivir-co/wiki-racer.git"

SUBMODULE_ONTHOLOGY_EDITOR_DIR="$ROOT_DIR/OnthologyEditor"
SUBMODULE_ONTHOLOGY_EDITOR_URL="https://github.com/escrivivir-co/alephscript-onthology-editor.git"

SUBMODULE_COPILOT_ENGINE_DIR="$ROOT_DIR/CopilotEngine"
SUBMODULE_COPILOT_ENGINE_URL="https://github.com/escrivivir-co/vscode-copilot-chat.git"

SUBMODULE_STATE_MACHINE_DIR="$ROOT_DIR/StateMachine"
SUBMODULE_STATE_MACHINE_URL="https://github.com/escrivivir-co/state-machine-mcp-driver.git"

SUBMODULE_AGENT_LORE_SDK_DIR="$ROOT_DIR/AgentLoreSDK"
SUBMODULE_AGENT_LORE_SDK_URL="https://github.com/escrivivir-co/mcp-agent-lore-sdk.git"

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
    ".github/plugins/typed-prompting/prompts": true,
    ".github/plugins/n8n-editor/prompts": true,
    ".github/plugins/wiring-app/prompts": true,
    ".github/plugins/arg-board-app/prompts": true,
    ".github/plugins/hypergraph-editor/prompts": true,
    ".github/plugins/flove-editor/prompts": true
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
    ".github/plugins/typed-prompting/instructions": true,
    ".github/plugins/n8n-editor/instructions": true,
    ".github/plugins/wiring-app/instructions": true,
    ".github/plugins/arg-board-app/instructions": true,
    ".github/plugins/hypergraph-editor/instructions": true,
    ".github/plugins/flove-editor/instructions": true
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
setup_submodule "$SUBMODULE_EXTENSION_DIR" "$SUBMODULE_EXTENSION_URL" "VsCodeExtension"
setup_submodule "$SUBMODULE_MCP_PRESETS_DIR" "$SUBMODULE_MCP_PRESETS_URL" "MCPGallery"
setup_submodule "$SUBMODULE_AS_UTILS_SDK_DIR" "$SUBMODULE_AS_UTILS_SDK_URL" "VibeCodingSuite"
setup_submodule "$SUBMODULE_AS_GYM_DIR" "$SUBMODULE_AS_GYM_URL" "AAIAGallery"
setup_submodule "$SUBMODULE_NETWORK_SDK_DIR" "$SUBMODULE_NETWORK_SDK_URL" "BlockchainComPort"
setup_submodule "$SUBMODULE_KICK_ALEPH_BOT_DIR" "$SUBMODULE_KICK_ALEPH_BOT_URL" "StreamDesktop"
setup_submodule "$SUBMODULE_KICK_CRONO_BOT_DIR" "$SUBMODULE_KICK_CRONO_BOT_URL" "StreamDesktopAppCronos"
setup_submodule "$SUBMODULE_MCP_NOVELIST_DIR" "$SUBMODULE_MCP_NOVELIST_URL" "NovelistEditor"
setup_submodule "$SUBMODULE_BLOCKLY_SDK_DIR" "$SUBMODULE_BLOCKLY_SDK_URL" "BlocklyEditor"
setup_submodule "$SUBMODULE_NODE_RED_SDK_DIR" "$SUBMODULE_NODE_RED_SDK_URL" "WiringEditor"
setup_submodule "$SUBMODULE_PROLOG_SBR_DIR" "$SUBMODULE_PROLOG_SBR_URL" "PrologEditor"
setup_submodule "$SUBMODULE_TYPED_PROMPTING_DIR" "$SUBMODULE_TYPED_PROMPTING_URL" "TypedPromptsEditor"
setup_submodule "$SUBMODULE_N8N_EDITOR_DIR" "$SUBMODULE_N8N_EDITOR_URL" "WorkflowEditor"
setup_submodule "$SUBMODULE_WIKI_RACER_DIR" "$SUBMODULE_WIKI_RACER_URL" "WiringAppHypergraphEditor"
setup_submodule "$SUBMODULE_ONTHOLOGY_EDITOR_DIR" "$SUBMODULE_ONTHOLOGY_EDITOR_URL" "OnthologyEditor"
setup_submodule "$SUBMODULE_COPILOT_ENGINE_DIR" "$SUBMODULE_COPILOT_ENGINE_URL" "CopilotEngine"
setup_submodule "$SUBMODULE_STATE_MACHINE_DIR" "$SUBMODULE_STATE_MACHINE_URL" "StateMachine"
setup_submodule "$SUBMODULE_AGENT_LORE_SDK_DIR" "$SUBMODULE_AGENT_LORE_SDK_URL" "AgentLoreSDK"

# 4) Inicializar submódulos anidados de OnthologyEditor (metamodel, MMCO, FloveDocs)
echo "[setup] ─────────────────────────────────────────"
echo "[setup] Inicializando submódulos anidados de OnthologyEditor"
echo "[setup] ─────────────────────────────────────────"
if [[ -d "$SUBMODULE_ONTHOLOGY_EDITOR_DIR/.git" ]] || [[ -f "$SUBMODULE_ONTHOLOGY_EDITOR_DIR/.git" ]]; then
  pushd "$SUBMODULE_ONTHOLOGY_EDITOR_DIR" >/dev/null
  git submodule sync
  git submodule update --init --recursive
  echo "[setup] Submódulos anidados de OnthologyEditor:"
  git submodule status
  popd >/dev/null
else
  echo "[setup] Aviso: OnthologyEditor no inicializado, saltando submódulos anidados"
fi

echo "[setup] ✔ Setup completado (18 submódulos + 3 anidados en OnthologyEditor)"
echo
echo "Siguientes pasos sugeridos:"
echo "  1) Reinicia VS Code para cargar prompts/instructions de plugins"
echo "  2) (Opcional) Ejecuta scripts/setup-jekyll.sh para dependencias del sitio"
echo "  3) Publica las ramas de los submódulos si lo deseas:"
echo "     cd VsCodeExtension && git push -u origin $INTEGRATION_BRANCH"
echo "     cd MCPGallery && git push -u origin $INTEGRATION_BRANCH"
echo "     cd VibeCodingSuite && git push -u origin $INTEGRATION_BRANCH"
echo "     cd AAIAGallery && git push -u origin $INTEGRATION_BRANCH"
echo "     cd BlockchainComPort && git push -u origin $INTEGRATION_BRANCH"
echo "     cd BlocklyEditor && git push -u origin $INTEGRATION_BRANCH"
echo "     cd WiringEditor && git push -u origin $INTEGRATION_BRANCH"
echo "     cd PrologEditor && git push -u origin $INTEGRATION_BRANCH"
echo "     cd TypedPromptsEditor && git push -u origin $INTEGRATION_BRANCH"
echo "     cd WorkflowEditor && git push -u origin $INTEGRATION_BRANCH"
echo "     cd WiringAppHypergraphEditor && git push -u origin $INTEGRATION_BRANCH"
echo
echo "     cd OnthologyEditor && git push -u origin $INTEGRATION_BRANCH"
echo
echo "Submódulos configurados (18):"
echo "  - VsCodeExtension: Extensión VS Code / Arrakis Theater"
echo "  - MCPGallery: Zeus MCP Presets (UI web)"
echo "  - VibeCodingSuite: VibeCoding Connector / Matrix Theater"
echo "  - AAIAGallery: FIA (Fundamentos de IA) / Almas para Agentes"
echo "  - BlockchainComPort: Oasis/Scuttlebutt P2P Network"
echo "  - StreamDesktop: Bot Kick para streaming"
echo "  - StreamDesktopAppCronos: Bot cronológico Kick"
echo "  - NovelistEditor: Editor MCP de narrativas"
echo "  - BlocklyEditor: Editor visual Blockly"
echo "  - WiringEditor: Diseñador de flujos Node-RED"
echo "  - PrologEditor: Editor de Lógica Prolog (SWI-Prolog)"
echo "  - TypedPromptsEditor: TypedPrompting (Ontologías NL↔JSON)"
echo "  - WorkflowEditor: Editor visual de workflows (n8n connector)"
echo "  - WiringAppHypergraphEditor: Motor de navegación wiki-racer (WiringApp, ArgBoardApp, HyperGraphEditor)"
echo "  - OnthologyEditor: Editor de ontologías (Flove Template)"
echo "     └── Submódulos anidados: metamodel (UFO), MMCO (BNP), FloveDocs (taxonomía)"
echo "  - CopilotEngine: Fuente VS Code Copilot Chat (System Messaging ReadOnly)"
echo "  - StateMachine: Gamification UI multi-platform (Console, HTML5, Blockly, ThreeJS)"
echo "  - AgentLoreSDK: Catálogo de plantillas para Agent Creator (637+ templates)"
