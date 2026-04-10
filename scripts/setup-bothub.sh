#!/usr/bin/env bash
# Aleph Scriptorium — Setup BotHub SDK
# Inicializa el submódulo BotHubSDK:
#   1) Instala dependencias del SDK
#   2) Crea estructura de datos en ARCHIVO/PLUGINS/BOT_HUB_SDK/
#   3) Copia .env.example si no hay .env
#   4) Instala dependencias de examples
#
# Uso: bash scripts/setup-bothub.sh
# Desde la raíz del workspace

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
SDK_DIR="$ROOT_DIR/BotHubSDK"
DATA_DIR="$ROOT_DIR/ARCHIVO/PLUGINS/BOT_HUB_SDK"
INTEGRATION_BRANCH="integration/beta/scriptorium"

echo "[bhs-setup] Aleph Scriptorium — BotHub SDK Setup"
echo "[bhs-setup] Raíz: $ROOT_DIR"
echo "[bhs-setup] SDK:  $SDK_DIR"
echo "[bhs-setup] Data: $DATA_DIR"
echo

# ─── ZONA 1: Verificar submódulo ──────────────────────────────────────────────
echo "[bhs-setup] ─────────────────────────────────────────────────────"
echo "[bhs-setup] ZONA 1: Verificar submódulo BotHubSDK"
echo "[bhs-setup] ─────────────────────────────────────────────────────"

if [[ ! -d "$SDK_DIR" ]]; then
  echo "[bhs-setup] Submódulo no encontrado. Inicializando..."
  pushd "$ROOT_DIR" >/dev/null
  git submodule update --init BotHubSDK
  popd >/dev/null
else
  echo "[bhs-setup] ✓ Submódulo encontrado: $SDK_DIR"
fi

# Preparar rama de integración
if [[ -d "$SDK_DIR/.git" ]] || [[ -f "$SDK_DIR/.git" ]]; then
  pushd "$SDK_DIR" >/dev/null
  git fetch --all --tags 2>/dev/null || true
  if ! git show-ref --verify --quiet "refs/heads/$INTEGRATION_BRANCH"; then
    echo "[bhs-setup] Creando rama $INTEGRATION_BRANCH"
    git checkout -b "$INTEGRATION_BRANCH" 2>/dev/null || true
  else
    git checkout "$INTEGRATION_BRANCH" 2>/dev/null || true
  fi
  echo "[bhs-setup] ✓ Rama activa: $(git branch --show-current 2>/dev/null || echo 'unknown')"
  popd >/dev/null
fi

# ─── ZONA 2: Dependencias del SDK ─────────────────────────────────────────────
echo
echo "[bhs-setup] ─────────────────────────────────────────────────────"
echo "[bhs-setup] ZONA 2: Instalando dependencias del SDK (bun install)"
echo "[bhs-setup] ─────────────────────────────────────────────────────"

if command -v bun &>/dev/null; then
  pushd "$SDK_DIR" >/dev/null
  bun install
  echo "[bhs-setup] ✓ bun install completado"
  popd >/dev/null
else
  echo "[bhs-setup] ⚠ bun no encontrado — intentando npm install..."
  pushd "$SDK_DIR" >/dev/null
  npm install
  popd >/dev/null
fi

# ─── ZONA 3: Crear estructura de datos ARCHIVO/ ─────────────────────────────
echo
echo "[bhs-setup] ─────────────────────────────────────────────────────"
echo "[bhs-setup] ZONA 3: Crear estructura de datos en ARCHIVO/"
echo "[bhs-setup] ─────────────────────────────────────────────────────"

mkdir -p "$DATA_DIR/data"
mkdir -p "$DATA_DIR/apps"
mkdir -p "$DATA_DIR/env"

# Inicializar JSON de datos si no existen
if [[ ! -f "$DATA_DIR/data/chats.json" ]]; then
  echo "[]" > "$DATA_DIR/data/chats.json"
  echo "[bhs-setup] ✓ Creado: data/chats.json"
fi

if [[ ! -f "$DATA_DIR/data/messages.json" ]]; then
  echo '{"messages":[],"commandResponses":[],"chatIds":[]}' > "$DATA_DIR/data/messages.json"
  echo "[bhs-setup] ✓ Creado: data/messages.json"
fi

# Copiar .env.example al directorio env/ si no existe
if [[ -f "$SDK_DIR/.env.example" ]] && [[ ! -f "$DATA_DIR/env/.env.example" ]]; then
  cp "$SDK_DIR/.env.example" "$DATA_DIR/env/.env.example"
  echo "[bhs-setup] ✓ Copiado: .env.example → ARCHIVO/PLUGINS/BOT_HUB_SDK/env/"
fi

# Crear .env en SDK raíz si no existe (para que MCP server pueda arrancar en mock)
if [[ ! -f "$SDK_DIR/.env" ]] && [[ -f "$SDK_DIR/.env.example" ]]; then
  cp "$SDK_DIR/.env.example" "$SDK_DIR/.env"
  echo "[bhs-setup] ✓ Copiado: SDK/.env.example → SDK/.env | Configura BOT_TOKEN para modo real"
fi

echo "[bhs-setup] ✓ Estructura ARCHIVO/PLUGINS/BOT_HUB_SDK/ lista"
echo
echo "  $DATA_DIR/"
echo "  ├── data/"
echo "  │   ├── chats.json"
echo "  │   └── messages.json"
echo "  ├── apps/"
echo "  │   ├── console-app.json"
echo "  │   ├── dashboard.json"
echo "  │   └── iacm-demo.json"
echo "  └── env/"
echo "      └── .env.example"

# ─── ZONA 4: Instalar dependencias de examples ──────────────────────────────
echo
echo "[bhs-setup] ─────────────────────────────────────────────────────"
echo "[bhs-setup] ZONA 4: Instalar dependencias de examples"
echo "[bhs-setup] ─────────────────────────────────────────────────────"

EXAMPLES_DIR="$SDK_DIR/examples"
for EXAMPLE in console-app dashboard iacm-demo; do
  if [[ -d "$EXAMPLES_DIR/$EXAMPLE" ]]; then
    pushd "$EXAMPLES_DIR/$EXAMPLE" >/dev/null
    if command -v bun &>/dev/null; then
      bun install 2>/dev/null && echo "[bhs-setup] ✓ $EXAMPLE: bun install OK" || echo "[bhs-setup] ⚠ $EXAMPLE: bun install falló"
    else
      npm install 2>/dev/null && echo "[bhs-setup] ✓ $EXAMPLE: npm install OK" || echo "[bhs-setup] ⚠ $EXAMPLE: npm install falló"
    fi
    popd >/dev/null
  else
    echo "[bhs-setup] ⚠ $EXAMPLE: directorio no encontrado ($EXAMPLES_DIR/$EXAMPLE)"
  fi
done

echo
echo "[bhs-setup] ✔ Setup BotHub SDK completado"
echo
echo "Siguientes pasos:"
echo "  1) Configura BOT_TOKEN en $SDK_DIR/.env para conectar a Telegram"
echo "  2) Arranca el MCP server: npm run start:bothub (desde MCPGallery/mcp-mesh-sdk)"
echo "  3) O arranca el dashboard directamente: cd BotHubSDK && bun run dev:dashboard"
echo "  4) Verifica con: bash scripts/verify-bothub.sh"
