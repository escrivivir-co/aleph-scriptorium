#!/usr/bin/env bash

# Aleph Scriptorium — Setup del Workspace
# Inicializa discovery de prompts/instructions de plugins en VS Code,
# sincroniza el submódulo de la extensión y prepara la rama de integración.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
VSCODE_DIR="$ROOT_DIR/.vscode"
SETTINGS_FILE="$VSCODE_DIR/settings.json"
SUBMODULE_DIR="$ROOT_DIR/vscode-alephscript-extension"
EXT_REMOTE_URL="https://github.com/escrivivir-co/vscode-alephscript-extension.git"
INTEGRATION_BRANCH="integration/beta/scriptorium"

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
    ".github/plugins/scrum/prompts": true
  },
  "chat.instructionsFilesLocations": {
    ".github/instructions": true,
    ".github/plugins/arg-board/instructions": true,
    ".github/plugins/enciclopedia/instructions": true,
    ".github/plugins/gh-pages/instructions": true,
    ".github/plugins/foro-scraper/instructions": true,
    ".github/plugins/agent-creator/instructions": true,
    ".github/plugins/teatro/instructions": true,
    ".github/plugins/scrum/instructions": true
  },
  "chat.useNestedAgentsMdFiles": true,
  "chat.promptFilesRecommendations": true
}
JSON

echo "[setup] VS Code settings creados/actualizados: $SETTINGS_FILE"

# 2) Submódulo de la extensión: init/sync/update
if [[ ! -d "$SUBMODULE_DIR" ]]; then
  echo "[setup] Submódulo no encontrado. Añadiendo: $EXT_REMOTE_URL"
  pushd "$ROOT_DIR" >/dev/null
  git submodule add "$EXT_REMOTE_URL" "vscode-alephscript-extension"
  popd >/dev/null
else
  echo "[setup] Submódulo encontrado: $SUBMODULE_DIR"
fi

echo "[setup] Sincronizando submódulos"
pushd "$ROOT_DIR" >/dev/null
git submodule sync
git submodule update --init --recursive
popd >/dev/null

# 3) Preparar rama de integración dentro del submódulo
if [[ -d "$SUBMODULE_DIR/.git" ]]; then
  echo "[setup] Preparando rama $INTEGRATION_BRANCH en el submódulo"
  pushd "$SUBMODULE_DIR" >/dev/null

  # Obtener remotos
  git fetch --all --tags || true

  # Preferir dev/astilleros como base si existe, si no main
  BASE_BRANCH="main"
  if git show-ref --verify --quiet refs/remotes/origin/dev/astilleros; then
    BASE_BRANCH="dev/astilleros"
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

  echo "[setup] Submódulo listo en rama: $(git branch --show-current)"
  popd >/dev/null
else
  echo "[setup] Aviso: el submódulo no parece inicializado correctamente (no .git). Revisa el estado."
fi

echo "[setup] ✔ Setup completado"
echo
echo "Siguientes pasos sugeridos:"
echo "  1) Reinicia VS Code para cargar prompts/instructions de plugins"
echo "  2) (Opcional) Ejecuta scripts/setup-jekyll.sh para dependencias del sitio"
echo "  3) Publica la rama del submódulo si lo deseas:"
echo "     cd vscode-alephscript-extension && git push -u origin $INTEGRATION_BRANCH"
