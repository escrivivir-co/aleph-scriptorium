#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# Blockly Editor Setup Script for Aleph Scriptorium (Unix/macOS)
# ═══════════════════════════════════════════════════════════════════════════
# 
# Este script instala y construye el SDK de Blockly Editor:
# - blockly-alephscript-blocks (6 categorías de bloques)
# - blockly-gamify-ui (Editor Angular, puerto 4200)
# - blockly-runtime-gamify-ui (Runtime, puerto 4300)
#
# Uso:
#   ./scripts/setup-blockly.sh [--skip-build] [--dev]
#
# Opciones:
#   --skip-build    Solo instalar dependencias, no construir
#   --dev           Arrancar en modo desarrollo después de setup
#
# ═══════════════════════════════════════════════════════════════════════════

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Detectar directorio del script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"

# Directorio del submódulo
BLOCKLY_DIR="$WORKSPACE_DIR/BlocklyEditor"

# Parsear argumentos
SKIP_BUILD=false
DEV_MODE=false

for arg in "$@"; do
    case $arg in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --dev)
            DEV_MODE=true
            shift
            ;;
    esac
done

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   Blockly Editor Setup for Aleph Scriptorium${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Verificar prerequisitos
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}🔍 Verificando prerequisitos...${NC}"

# Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no encontrado. Instala Node.js 18+ primero.${NC}"
    echo "   → https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js $NODE_VERSION encontrado. Se requiere 18+.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no encontrado.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Angular CLI (opcional pero recomendado)
if command -v ng &> /dev/null; then
    echo -e "${GREEN}✓ Angular CLI $(ng version 2>/dev/null | grep 'Angular CLI' | awk '{print $3}' || echo 'instalado')${NC}"
else
    echo -e "${YELLOW}⚠ Angular CLI no instalado globalmente (se usará npx)${NC}"
    echo "   → Recomendado: npm install -g @angular/cli"
fi

# Verificar submódulo
if [ ! -d "$BLOCKLY_DIR/packages" ]; then
    echo -e "${RED}❌ Submódulo BlocklyEditor no encontrado.${NC}"
    echo "   → Ejecuta: git submodule update --init --recursive"
    exit 1
fi
echo -e "${GREEN}✓ Submódulo BlocklyEditor encontrado${NC}"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 1: Instalar dependencias raíz
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}📦 Paso 1: Instalando dependencias raíz...${NC}"

cd "$BLOCKLY_DIR"

if [ ! -d "node_modules" ]; then
    echo "  → npm install"
    npm install
else
    echo -e "${GREEN}✓ Dependencias raíz ya instaladas${NC}"
fi

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 2: Instalar dependencias de todos los paquetes
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}📦 Paso 2: Instalando dependencias de paquetes...${NC}"

echo "  → npm run install:all"
npm run install:all 2>/dev/null || {
    echo "  → Instalando paquetes individualmente..."
    
    # blockly-alephscript-blocks
    if [ -d "packages/blockly-alephscript-blocks" ]; then
        echo "    → blockly-alephscript-blocks"
        cd "$BLOCKLY_DIR/packages/blockly-alephscript-blocks"
        npm install
    fi
    
    # blockly-gamify-ui
    if [ -d "$BLOCKLY_DIR/packages/blockly-gamify-ui" ]; then
        echo "    → blockly-gamify-ui"
        cd "$BLOCKLY_DIR/packages/blockly-gamify-ui"
        npm install
    fi
    
    # blockly-runtime-gamify-ui
    if [ -d "$BLOCKLY_DIR/packages/blockly-runtime-gamify-ui" ]; then
        echo "    → blockly-runtime-gamify-ui"
        cd "$BLOCKLY_DIR/packages/blockly-runtime-gamify-ui"
        npm install
    fi
    
    cd "$BLOCKLY_DIR"
}

echo -e "${GREEN}✓ Dependencias de paquetes instaladas${NC}"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 3: Construir todos los paquetes
# ─────────────────────────────────────────────────────────────────────────────
if [ "$SKIP_BUILD" = false ]; then
    echo -e "${YELLOW}🔨 Paso 3: Construyendo paquetes...${NC}"
    
    cd "$BLOCKLY_DIR"
    
    # Construir bloques primero (dependencia de UI)
    echo "  → Construyendo blockly-alephscript-blocks..."
    npm run build:blocks 2>/dev/null || {
        cd "$BLOCKLY_DIR/packages/blockly-alephscript-blocks"
        npm run build
        cd "$BLOCKLY_DIR"
    }
    echo -e "${GREEN}    ✓ blockly-alephscript-blocks${NC}"
    
    # Construir UI
    echo "  → Construyendo blockly-gamify-ui..."
    npm run build:ui 2>/dev/null || {
        cd "$BLOCKLY_DIR/packages/blockly-gamify-ui"
        npm run build
        cd "$BLOCKLY_DIR"
    }
    echo -e "${GREEN}    ✓ blockly-gamify-ui${NC}"
    
    # Construir Runtime UI
    echo "  → Construyendo blockly-runtime-gamify-ui..."
    npm run build:runtime-ui 2>/dev/null || {
        cd "$BLOCKLY_DIR/packages/blockly-runtime-gamify-ui"
        npm run build 2>/dev/null || echo "    (opcional, puede no estar implementado)"
        cd "$BLOCKLY_DIR"
    }
    echo -e "${GREEN}    ✓ blockly-runtime-gamify-ui${NC}"
    
    echo ""
else
    echo -e "${YELLOW}⏭️  Paso 3: Saltando build (--skip-build)${NC}"
    echo ""
fi

# ─────────────────────────────────────────────────────────────────────────────
# Resumen
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Setup completado exitosamente!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "📍 ${YELLOW}Próximos pasos:${NC}"
echo ""
echo "  1. Arrancar el editor (desarrollo):"
echo "     ${GREEN}cd BlocklyEditor && npm run dev:ui${NC}"
echo ""
echo "  2. Abrir el editor:"
echo "     ${GREEN}http://localhost:4200${NC}"
echo ""
echo "  3. O usa las tasks de VS Code:"
echo "     ${GREEN}Ctrl+Shift+P → Tasks: Run Task → BLE: Start [Editor]${NC}"
echo ""
echo -e "📦 ${YELLOW}Paquetes instalados:${NC}"
echo "  - blockly-alephscript-blocks (6 categorías de bloques)"
echo "  - blockly-gamify-ui (Editor Angular, puerto 4200)"
echo "  - blockly-runtime-gamify-ui (Runtime, puerto 4300)"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Modo desarrollo (opcional)
# ─────────────────────────────────────────────────────────────────────────────
if [ "$DEV_MODE" = true ]; then
    echo -e "${YELLOW}🚀 Arrancando en modo desarrollo...${NC}"
    cd "$BLOCKLY_DIR"
    npm run dev:ui
fi
