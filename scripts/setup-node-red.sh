#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
# Node-RED Setup Script for Aleph Scriptorium (Unix/macOS)
# ═══════════════════════════════════════════════════════════════════════════
# 
# Este script instala Node-RED y los nodos custom del Scriptorium:
# - node-red-dashboard (legacy UI)
# - @flowfuse/node-red-dashboard (Dashboard 2)
# - node-red-contrib-alephscript (13 nodos)
# - node-red-contrib-alephscript-escribiente (7 nodos)
# - node-red-contrib-wiki-racer (1 nodo)
#
# Uso:
#   ./scripts/setup-node-red.sh [--skip-global] [--contrib-only]
#
# Opciones:
#   --skip-global    No instalar Node-RED globalmente (ya instalado)
#   --contrib-only   Solo instalar contribs, no dashboard
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

# Directorios de submódulos
WIRING_EDITOR_DIR="$WORKSPACE_DIR/WiringEditor"
WIRING_APP_DIR="$WORKSPACE_DIR/WiringAppHypergraphEditor"

# Directorio Node-RED del usuario
NODE_RED_DIR="$HOME/.node-red"

# Parsear argumentos
SKIP_GLOBAL=false
CONTRIB_ONLY=false

for arg in "$@"; do
    case $arg in
        --skip-global)
            SKIP_GLOBAL=true
            shift
            ;;
        --contrib-only)
            CONTRIB_ONLY=true
            shift
            ;;
    esac
done

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   Node-RED Setup for Aleph Scriptorium${NC}"
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

# Verificar submódulos
if [ ! -d "$WIRING_EDITOR_DIR/packages/node-red-contrib-alephscript" ]; then
    echo -e "${RED}❌ Submódulo WiringEditor no encontrado.${NC}"
    echo "   → Ejecuta: git submodule update --init --recursive"
    exit 1
fi
echo -e "${GREEN}✓ Submódulo WiringEditor encontrado${NC}"

if [ ! -d "$WIRING_APP_DIR/node-red-contrib-wikir-racer" ]; then
    echo -e "${RED}❌ Submódulo WiringAppHypergraphEditor no encontrado.${NC}"
    echo "   → Ejecuta: git submodule update --init --recursive"
    exit 1
fi
echo -e "${GREEN}✓ Submódulo WiringAppHypergraphEditor encontrado${NC}"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 1: Instalar Node-RED globalmente
# ─────────────────────────────────────────────────────────────────────────────
if [ "$SKIP_GLOBAL" = false ]; then
    echo -e "${YELLOW}📦 Paso 1: Instalando Node-RED globalmente...${NC}"
    
    if command -v node-red &> /dev/null; then
        echo -e "${GREEN}✓ Node-RED ya instalado: $(node-red --version 2>/dev/null || echo 'versión desconocida')${NC}"
    else
        echo "  → npm install -g --unsafe-perm node-red"
        npm install -g --unsafe-perm node-red
        echo -e "${GREEN}✓ Node-RED instalado${NC}"
    fi
else
    echo -e "${YELLOW}⏭️  Paso 1: Saltando instalación global (--skip-global)${NC}"
fi

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 2: Crear directorio .node-red si no existe
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}📁 Paso 2: Verificando directorio Node-RED...${NC}"

if [ ! -d "$NODE_RED_DIR" ]; then
    echo "  → Creando $NODE_RED_DIR"
    mkdir -p "$NODE_RED_DIR"
    
    # Inicializar package.json básico
    echo '{"name": "node-red-project", "description": "Node-RED user directory", "version": "1.0.0"}' > "$NODE_RED_DIR/package.json"
fi
echo -e "${GREEN}✓ Directorio: $NODE_RED_DIR${NC}"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 3: Instalar dashboards Node-RED (legacy + v2)
# ─────────────────────────────────────────────────────────────────────────────
if [ "$CONTRIB_ONLY" = false ]; then
    echo -e "${YELLOW}🎨 Paso 3: Instalando dashboards Node-RED (legacy + Dashboard 2)...${NC}"
    
    cd "$NODE_RED_DIR"
    if npm list node-red-dashboard @flowfuse/node-red-dashboard &> /dev/null; then
        echo -e "${GREEN}✓ dashboards Node-RED ya instalados${NC}"
    else
        echo "  → npm install node-red-dashboard @flowfuse/node-red-dashboard"
        npm install node-red-dashboard @flowfuse/node-red-dashboard
        echo -e "${GREEN}✓ node-red-dashboard y @flowfuse/node-red-dashboard instalados${NC}"
    fi
else
    echo -e "${YELLOW}⏭️  Paso 3: Saltando dashboard (--contrib-only)${NC}"
fi

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 4: Build node-red-contrib-alephscript
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}🔨 Paso 4: Compilando node-red-contrib-alephscript + escribiente...${NC}"

cd "$WIRING_EDITOR_DIR"

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "  → npm install (raíz)"
    npm install 2>/dev/null || true
fi

# Build del paquete contrib
cd "$WIRING_EDITOR_DIR/packages/node-red-contrib-alephscript"
if [ ! -d "node_modules" ]; then
    echo "  → npm install (contrib)"
    npm install
fi

echo "  → npm run build:full"
npm run build:full 2>/dev/null || npm run build

cd "$WIRING_EDITOR_DIR/packages/node-red-contrib-alephscript-escribiente"
if [ ! -d "node_modules" ]; then
    echo "  → npm install (escribiente)"
    npm install
fi

echo "  → npm run build:full [escribiente]"
npm run build:full 2>/dev/null || npm run build

echo -e "${GREEN}✓ node-red-contrib-alephscript y escribiente compilados${NC}"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 5: Instalar node-red-contrib-alephscript en Node-RED
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}🔌 Paso 5: Instalando node-red-contrib-alephscript (13 nodos)...${NC}"

cd "$NODE_RED_DIR"
CONTRIB_PATH="$WIRING_EDITOR_DIR/packages/node-red-contrib-alephscript"

echo "  → npm install \"$CONTRIB_PATH\""
npm install "$CONTRIB_PATH"

echo -e "${GREEN}✓ 13 nodos AlephScript instalados:${NC}"
echo "    - alephscript-bot, alephscript-enhanced-bot"
echo "    - alephscript-app-channel, alephscript-sys-channel, alephscript-ui-channel"
echo "    - alephscript-orchestrator"
echo "    - alephscript-app-format, alephscript-sys-format, alephscript-ui-format"
echo "    - alephscript-config, alephscript-bot-registry"
echo "    - alephscript-room-tester, alephscript-stream-monitor"

echo ""
echo -e "${YELLOW}📝 Paso 5b: Instalando node-red-contrib-alephscript-escribiente (7 nodos)...${NC}"

cd "$NODE_RED_DIR"
ESCRIBIENTE_PATH="$WIRING_EDITOR_DIR/packages/node-red-contrib-alephscript-escribiente"

echo "  → npm install \"$ESCRIBIENTE_PATH\""
npm install "$ESCRIBIENTE_PATH"

echo -e "${GREEN}✓ 7 nodos Escribiente instalados:${NC}"
echo "    - alephscript-escribiente-config, alephscript-escribiente-precheck"
echo "    - alephscript-escribiente-session, alephscript-escribiente-chunker"
echo "    - alephscript-escribiente-transcriber, alephscript-escribiente-session-closer"
echo "    - alephscript-escribiente-dashboard-recorder"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Paso 6: Instalar node-red-contrib-wiki-racer en Node-RED
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${YELLOW}🎮 Paso 6: Instalando node-red-contrib-wiki-racer (1 nodo)...${NC}"

cd "$NODE_RED_DIR"
WIKI_RACER_PATH="$WIRING_APP_DIR/node-red-contrib-wikir-racer"

echo "  → npm install \"$WIKI_RACER_PATH\""
npm install "$WIKI_RACER_PATH"

echo -e "${GREEN}✓ 1 nodo Wiki-Racer instalado:${NC}"
echo "    - game"

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Resumen
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Setup completado exitosamente!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "📍 ${YELLOW}Próximos pasos:${NC}"
echo ""
echo "  1. Arrancar Node-RED:"
echo "     ${GREEN}node-red${NC}"
echo ""
echo "  2. Abrir el editor:"
echo "     ${GREEN}http://localhost:1880${NC}"
echo ""
echo "  3. Abrir el dashboard (después de deploy):"
echo "     ${GREEN}http://localhost:1880/ui${NC}"
echo ""
echo "  4. O usa las tasks de VS Code:"
echo "     ${GREEN}Ctrl+Shift+P → Tasks: Run Task → NRE: Start [Editor]${NC}"
echo ""
echo -e "📦 ${YELLOW}Nodos instalados (21 total):${NC}"
echo "  - node-red-dashboard (legacy UI widgets)"
echo "  - @flowfuse/node-red-dashboard (Dashboard 2)"
echo "  - node-red-contrib-alephscript (13 nodos)"
echo "  - node-red-contrib-alephscript-escribiente (7 nodos)"
echo "  - node-red-contrib-wiki-racer (1 nodo)"
echo ""
