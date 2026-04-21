#!/usr/bin/env bash
# verify-submodule-naming.sh — Verifica convención PascalCase en submódulos
#
# Uso: ./scripts/verify-submodule-naming.sh
#
# Verifica que todos los submódulos sigan la convención de naming PascalCase:
# - MCPGallery, AAIAGallery (galerías)
# - WorkflowEditor, BlocklyEditor, PrologEditor, DocumentMachineSDK, etc. (editores/SDKs)
# - VibeCodingSuite, BlockchainComPort, AgentLoreSDK (suites/SDKs)
# - StreamDesktop, StreamDesktopAppCronos (desktop)
# - VsCodeExtension, UISDKThreejs (extensiones/UI)

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Lista de paths esperados (PascalCase)
EXPECTED_PATHS=(
  "AAIAGallery"
  "AgentLoreSDK"
  "BlockchainComPort"
  "BlocklyEditor"
  "BotHubSDK"
  "CopilotEngine"
  "DocumentMachineSDK"
  "MCPGallery"
  "NovelistEditor"
  "PrologEditor"
  "StateMachine"
  "StreamDesktop"
  "StreamDesktopAppCronos"
  "TypedPromptsEditor"
  "UISDKThreejs"
  "VibeCodingSuite"
  "VsCodeExtension"
  "WiringAppHypergraphEditor"
  "WiringEditor"
  "WorkflowEditor"
)

# Patrones de naming no permitidos (legacy)
LEGACY_PATTERNS=(
  "alephscript-"
  "as-"
  "kick-aleph-"
  "iot-sbr-"
  "heteronimos-semi-asistidos-sdk"
  "mcp-agent-lore-sdk"
  "para-la-voz-sdk"
  "mcp-novelist"
  "state-machine-mcp-driver"
  "threejs-gamify-ui"
  "blockly-alephscript-"
  "node-red-alephscript-"
  "vscode-alephscript-"
  "vscode-copilot-chat"
  "wiki-racer"
)

echo "🔍 Verificando convención de naming de submódulos..."
echo "   Raíz: $ROOT_DIR"
echo ""

errors=0
warnings=0

# 1) Verificar que existan los paths esperados
echo "📁 Verificando paths esperados (PascalCase):"
for path in "${EXPECTED_PATHS[@]}"; do
  if [[ -d "$ROOT_DIR/$path" ]]; then
    echo "   ✅ $path"
  else
    echo "   ❌ $path — NO ENCONTRADO"
    ((errors++))
  fi
done
echo ""

# 2) Verificar que no existan paths legacy
echo "🚫 Verificando que no existan paths legacy:"
for pattern in "${LEGACY_PATTERNS[@]}"; do
  matches=$(find "$ROOT_DIR" -maxdepth 1 -type d -name "${pattern}*" 2>/dev/null | wc -l)
  if [[ "$matches" -gt 0 ]]; then
    echo "   ❌ Encontrado path legacy con patrón: $pattern"
    find "$ROOT_DIR" -maxdepth 1 -type d -name "${pattern}*" | while read -r dir; do
      echo "      → $(basename "$dir")"
    done
    ((errors++))
  fi
done
if [[ "$errors" -eq 0 ]]; then
  echo "   ✅ No se encontraron paths legacy"
fi
echo ""

# 3) Verificar .gitmodules
echo "📋 Verificando .gitmodules:"
if [[ -f "$ROOT_DIR/.gitmodules" ]]; then
  gitmodules_paths=$(grep "path = " "$ROOT_DIR/.gitmodules" | awk '{print $3}')
  while IFS= read -r path; do
    # Verificar que sea PascalCase (primera letra mayúscula, sin guiones)
    if [[ "$path" =~ ^[A-Z][a-zA-Z0-9]+$ ]]; then
      echo "   ✅ $path"
    else
      echo "   ⚠️  $path — No sigue convención PascalCase estricta"
      ((warnings++))
    fi
  done <<< "$gitmodules_paths"
else
  echo "   ❌ .gitmodules no encontrado"
  ((errors++))
fi
echo ""

# 4) Verificar git submodule status
echo "🔗 Verificando git submodule status:"
pushd "$ROOT_DIR" >/dev/null
if git submodule status >/dev/null 2>&1; then
  submodule_count=$(git submodule status | wc -l | xargs)
  echo "   ✅ $submodule_count submódulos registrados"
  
  # Mostrar estado resumido
  git submodule status | while read -r line; do
    status="${line:0:1}"
    path=$(echo "$line" | awk '{print $2}')
    case "$status" in
      " ") echo "   ✅ $path — OK" ;;
      "-") echo "   ⚠️  $path — No inicializado" && ((warnings++)) ;;
      "+") echo "   ⚠️  $path — Cambios locales" && ((warnings++)) ;;
      "U") echo "   ❌ $path — Conflicto de merge" && ((errors++)) ;;
    esac
  done
else
  echo "   ❌ Error al ejecutar git submodule status"
  ((errors++))
fi
popd >/dev/null
echo ""

# Resumen
echo "═══════════════════════════════════════════════════════"
if [[ "$errors" -eq 0 && "$warnings" -eq 0 ]]; then
  echo "✅ Verificación completada: Todo OK"
  exit 0
elif [[ "$errors" -eq 0 ]]; then
  echo "⚠️  Verificación completada con $warnings warnings"
  exit 0
else
  echo "❌ Verificación fallida: $errors errores, $warnings warnings"
  exit 1
fi
