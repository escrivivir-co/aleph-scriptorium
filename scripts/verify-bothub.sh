#!/usr/bin/env bash
# Aleph Scriptorium — Verify BotHub SDK
# Verifica que BotHubSDK esté correctamente integrado en el Scriptorium.
# Salida: PASS/WARN/FAIL por cada check.
#
# Uso: bash scripts/verify-bothub.sh
# Desde la raíz del workspace

set -uo pipefail

ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
SDK_DIR="$ROOT_DIR/BotHubSDK"
DATA_DIR="$ROOT_DIR/ARCHIVO/PLUGINS/BOT_HUB_SDK"
MCP_DIR="$ROOT_DIR/MCPGallery/mcp-mesh-sdk"

PASS=0; WARN=0; FAIL=0

pass() { echo "  ✅ PASS: $1"; ((PASS++)) || true; }
warn() { echo "  ⚠️  WARN: $1"; ((WARN++)) || true; }
fail() { echo "  ❌ FAIL: $1"; ((FAIL++)) || true; }

echo "[bhs-verify] Aleph Scriptorium — BotHub SDK Verification"
echo "[bhs-verify] ────────────────────────────────────────────"
echo

# ─── BLOQUE A: Submódulo y Git ────────────────────────────────────────────────
echo "A) SUBMÓDULO Y GIT"
echo

if [[ -d "$SDK_DIR" ]]; then
  pass "Directorio BotHubSDK existe"
else
  fail "Directorio BotHubSDK no existe — ejecuta: bash scripts/setup-bothub.sh"
fi

if grep -q "branch = integration/beta/scriptorium" "$ROOT_DIR/.gitmodules" 2>/dev/null; then
  BRANCH_LINE=$(grep -A4 '\[submodule "BotHubSDK"\]' "$ROOT_DIR/.gitmodules" | grep "branch" | head -1)
  pass ".gitmodules tiene branch: $BRANCH_LINE"
else
  fail ".gitmodules: falta branch = integration/beta/scriptorium en [submodule BotHubSDK]"
fi

if grep -q "bot-hub-sdk" "$ROOT_DIR/.github/plugins/registry.json" 2>/dev/null; then
  pass "registry.json contiene entrada 'bot-hub-sdk'"
else
  fail "registry.json no contiene 'bot-hub-sdk'"
fi

echo

# ─── BLOQUE B: Plugin Scriptorium ────────────────────────────────────────────
echo "B) PLUGIN SCRIPTORIUM"
echo

for FILE in ".github/plugins/bot-hub-sdk/manifest.md" \
            ".github/plugins/bot-hub-sdk/agents/bot-hub-sdk.agent.md" \
            ".github/plugins/bot-hub-sdk/instructions/bot-hub-sdk.instructions.md"; do
  if [[ -f "$ROOT_DIR/$FILE" ]]; then
    pass "$FILE"
  else
    fail "Falta: $FILE"
  fi
done

echo

# ─── BLOQUE C: Estructura de datos ARCHIVO/ ──────────────────────────────────
echo "C) ESTRUCTURA DE DATOS ARCHIVO/"
echo

for FILE in "data/chats.json" "data/messages.json" "apps/console-app.json" \
            "apps/dashboard.json" "apps/iacm-demo.json" "env/.env.example"; do
  if [[ -f "$DATA_DIR/$FILE" ]]; then
    pass "$DATA_DIR/$FILE"
  else
    warn "Falta: $DATA_DIR/$FILE (ejecuta bash scripts/setup-bothub.sh)"
  fi
done

echo

# ─── BLOQUE D: SDK — Dependencias y build ────────────────────────────────────
echo "D) SDK — DEPENDENCIAS Y BUILD"
echo

if [[ -d "$SDK_DIR/node_modules" ]]; then
  pass "BotHubSDK/node_modules existe"
else
  warn "BotHubSDK/node_modules no existe — ejecuta: cd BotHubSDK && bun install"
fi

if [[ -d "$SDK_DIR/dist" ]]; then
  pass "BotHubSDK/dist existe (SDK compilado)"
else
  warn "BotHubSDK/dist no existe — ejecuta: cd BotHubSDK && bun run build:sdk"
fi

for EXAMPLE in console-app dashboard iacm-demo; do
  EXAMPLE_DIR="$SDK_DIR/examples/$EXAMPLE"
  if [[ -d "$EXAMPLE_DIR/node_modules" ]]; then
    pass "examples/$EXAMPLE/node_modules instalados"
  else
    warn "examples/$EXAMPLE deps no instalados — ejecuta: cd BotHubSDK && npm run examples:install"
  fi
done

HAS_ENV=false
HAS_TOKEN=false
if [[ -f "$SDK_DIR/.env" ]]; then
  HAS_ENV=true
  if grep -q "BOT_TOKEN=" "$SDK_DIR/.env" && ! grep -q "BOT_TOKEN=$" "$SDK_DIR/.env"; then
    HAS_TOKEN=true
  fi
fi

if $HAS_ENV; then
  pass "BotHubSDK/.env existe"
else
  warn "BotHubSDK/.env no existe — bot arrancará en mock mode"
fi

if $HAS_TOKEN; then
  pass "BOT_TOKEN configurado en .env"
else
  warn "BOT_TOKEN no configurado — modo mock únicamente"
fi

echo

# ─── BLOQUE E: MCP Server ────────────────────────────────────────────────────
echo "E) MCP SERVER (mcp-mesh-sdk)"
echo

if [[ -f "$MCP_DIR/src/MCPBotHubServer.ts" ]]; then
  if grep -q "bothub_list_apps" "$MCP_DIR/src/MCPBotHubServer.ts" 2>/dev/null; then
    pass "MCPBotHubServer.ts incluye app launcher (bothub_list_apps)"
  else
    warn "MCPBotHubServer.ts no incluye app launcher — considera actualizar"
  fi
  if grep -q "BOTHUB_DATA_DIR" "$MCP_DIR/src/MCPBotHubServer.ts" 2>/dev/null; then
    pass "MCPBotHubServer.ts usa BOTHUB_DATA_DIR para datos Scriptorium"
  else
    warn "MCPBotHubServer.ts no usa BOTHUB_DATA_DIR — datos en directorio local"
  fi
else
  fail "MCPBotHubServer.ts no encontrado en $MCP_DIR/src/"
fi

if [[ -d "$MCP_DIR/node_modules" ]]; then
  pass "mcp-mesh-sdk/node_modules instalados"
else
  warn "mcp-mesh-sdk/node_modules no instalados — ejecuta: cd MCPGallery/mcp-mesh-sdk && npm install"
fi

# Verificar que el server responde (si está corriendo)
if command -v curl &>/dev/null; then
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 2 "http://localhost:3010/health" 2>/dev/null || echo "000")
  if [[ "$HTTP_STATUS" == "200" ]]; then
    pass "MCP Server responde en localhost:3010 (HTTP $HTTP_STATUS)"
  else
    warn "MCP Server no responde en localhost:3010 (HTTP $HTTP_STATUS) — normal si no está arrancado"
  fi
fi

echo

# ─── BLOQUE F: Tasks VS Code ──────────────────────────────────────────────────
echo "F) TASKS VS CODE"
echo

TASKS_FILE="$ROOT_DIR/.vscode/tasks.json"
for TASK in "BHS: Start \[Server\]" "BHS: Setup \[Examples\]" "BHS: Start \[Console\]" "BHS: Start \[Dashboard\]" "BHS: Start \[IACM Demo\]"; do
  if grep -q "$TASK" "$TASKS_FILE" 2>/dev/null; then
    pass "Task '$TASK' definida"
  else
    warn "Task '$TASK' no definida en .vscode/tasks.json"
  fi
done

echo
echo "[bhs-verify] ────────────────────────────────────────────"
echo "[bhs-verify] Resultado: $PASS PASS | $WARN WARN | $FAIL FAIL"
echo

if [[ $FAIL -gt 0 ]]; then
  echo "[bhs-verify] ❌ Hay problemas críticos. Ejecuta: bash scripts/setup-bothub.sh"
  exit 1
elif [[ $WARN -gt 0 ]]; then
  echo "[bhs-verify] ⚠️  Verificación OK con advertencias. El SDK funciona pero hay pasos opcionales pendientes."
  exit 0
else
  echo "[bhs-verify] ✅ Todo correcto. BotHub SDK listo para usar."
  exit 0
fi
