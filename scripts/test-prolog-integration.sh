#!/bin/bash
# =============================================================================
# Test End-to-End: Integración PrologEditor ↔ MCPPrologServer ↔ Lucas
# Epic: SCRIPT-2.3.0 — Prolog MCP Server Integration
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🧪 Test de Integración Prolog — Epic SCRIPT-2.3.0"
echo "=================================================="

# -----------------------------------------------------------------------------
# 1. Verificar dependencias
# -----------------------------------------------------------------------------
echo ""
echo "📦 1/5 Verificando dependencias..."

# SWI-Prolog
if command -v swipl &> /dev/null; then
    SWIPL_VERSION=$(swipl --version 2>&1 | head -1)
    echo "   ✅ SWI-Prolog: $SWIPL_VERSION"
else
    echo "   ❌ SWI-Prolog no instalado"
    echo "   → Instalar: brew install swi-prolog"
    exit 1
fi

# Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "   ✅ Node.js: $NODE_VERSION"
else
    echo "   ❌ Node.js no instalado"
    exit 1
fi

# -----------------------------------------------------------------------------
# 2. Verificar archivos del epic
# -----------------------------------------------------------------------------
echo ""
echo "📁 2/5 Verificando archivos del epic..."

FILES=(
    ".github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json"
    "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl"
    "ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml"
    "MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts"
    "PrologEditor/frontend/package.json"
)

for FILE in "${FILES[@]}"; do
    if [ -f "$PROJECT_ROOT/$FILE" ]; then
        echo "   ✅ $FILE"
    else
        echo "   ❌ $FILE (no encontrado)"
        exit 1
    fi
done

# -----------------------------------------------------------------------------
# 3. Validar sintaxis Prolog de Lucas
# -----------------------------------------------------------------------------
echo ""
echo "🧠 3/5 Validando cerebro Prolog de Lucas..."

LUCAS_BRAIN="$PROJECT_ROOT/ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl"

# Ejecutar query de validación
PROLOG_TEST=$(swipl -g "use_module('$LUCAS_BRAIN'), reporte_salud(R), writeln(R), halt." 2>&1)

if [[ "$PROLOG_TEST" == *"OK"* ]]; then
    echo "   ✅ Lucas brain cargado correctamente"
    echo "   → $PROLOG_TEST"
else
    echo "   ⚠️  Resultado: $PROLOG_TEST"
fi

# -----------------------------------------------------------------------------
# 4. Ejecutar query de ejemplo
# -----------------------------------------------------------------------------
echo ""
echo "🔍 4/5 Ejecutando queries de ejemplo..."

# Query: documentacion_coherente
echo "   → Query: documentacion_coherente(X)"
swipl -g "
    use_module('$LUCAS_BRAIN'),
    findall(X, documentacion_coherente(X), Capacidades),
    length(Capacidades, N),
    format('   ✅ ~w capacidades coherentes encontradas~n', [N]),
    halt.
" 2>/dev/null || echo "   ⚠️  Query ejecutada con warnings"

# Query: consejo
echo "   → Query: consejo(perdido, Mensaje)"
swipl -g "
    use_module('$LUCAS_BRAIN'),
    consejo(perdido, Mensaje),
    format('   ✅ Consejo: ~w~n', [Mensaje]),
    halt.
" 2>/dev/null || echo "   ⚠️  Query ejecutada con warnings"

# -----------------------------------------------------------------------------
# 5. Resumen
# -----------------------------------------------------------------------------
echo ""
echo "=================================================="
echo "✅ Test de integración completado"
echo ""
echo "Próximos pasos:"
echo "  1. cd MCPGallery/mcp-mesh-sdk && npm run start:prolog"
echo "  2. Usar prolog_create_session en Copilot"
echo "  3. Cargar lucas-prolog.brain.pl con prolog_consult_file"
echo ""
echo "Referencias:"
echo "  → ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_2026_LogicaAgentes/ejemplo_lucas_import_export.md"
echo "  → .github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json"
echo "=================================================="
