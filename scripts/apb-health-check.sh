#!/bin/bash
# scripts/apb-health-check.sh
# APB: Agent Prolog Brain - Health Check
# 
# Verifica prerequisitos Y estado de los 4 servicios del stack MCP Prolog
# Uso: bash scripts/apb-health-check.sh
#
# Épica: PROLOG-E2E-1.0.0 (T003)
# Actualizado: 2026-01-03

echo "╔══════════════════════════════════════╗"
echo "║   APB: Agent Prolog Brain - Health   ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ============================================
# FASE 0: Verificar Prerequisitos del Sistema
# ============================================

detect_os() {
    case "$(uname -s)" in
        Darwin*)  echo "macOS" ;;
        Linux*)   echo "Linux" ;;
        MINGW*|MSYS*|CYGWIN*) echo "Windows" ;;
        *)        echo "Unknown" ;;
    esac
}

check_swipl() {
    echo "🔧 Verificando prerequisitos del sistema..."
    echo ""
    
    local OS=$(detect_os)
    printf "%-30s" "Sistema operativo:"
    echo "$OS"
    
    printf "%-30s" "SWI-Prolog (swipl):"
    
    # Detectar swipl según SO
    local swipl_path=""
    
    if [ "$OS" = "Windows" ]; then
        # Primero intentar en PATH actual
        swipl_path=$(where swipl 2>/dev/null | head -1)
        
        # Si no está en PATH, buscar en ubicaciones conocidas de Windows
        if [ -z "$swipl_path" ]; then
            local known_paths=(
                "/c/Program Files/swipl/bin"
                "/c/Program Files (x86)/swipl/bin"
                "$LOCALAPPDATA/Programs/swipl/bin"
                "$HOME/AppData/Local/Programs/swipl/bin"
            )
            for p in "${known_paths[@]}"; do
                if [ -f "$p/swipl.exe" ]; then
                    # Añadir al PATH de esta sesión permanentemente para scripts
                    export PATH="$PATH:$p"
                    swipl_path="$p/swipl.exe"
                    echo "✅ (auto-detectado)"
                    echo "   Ruta: $swipl_path"
                    echo "   ⚠️  PATH actualizado automáticamente para esta ejecución"
                    echo ""
                    echo "   💡 Para hacer permanente, añadir a PATH del sistema:"
                    echo "      $p"
                    return 0
                fi
            done
        fi
    else
        swipl_path=$(which swipl 2>/dev/null)
    fi
    
    if [ -n "$swipl_path" ]; then
        local version=$(swipl --version 2>/dev/null | head -1 || echo "instalado")
        echo "✅ $version"
        echo "   Ruta: $swipl_path"
        return 0
    else
        echo "❌ NO ENCONTRADO"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "⛔ PREREQUISITO FALTANTE: SWI-Prolog"
        echo ""
        echo "Para instalar SWI-Prolog en $OS:"
        echo ""
        case "$OS" in
            macOS)
                echo "  brew install swi-prolog"
                ;;
            Windows)
                echo "  1. Abrir PowerShell como Administrador"
                echo "  2. Ejecutar: winget install SWI-Prolog.SWI-Prolog"
                echo "  3. Cerrar y reabrir terminal"
                echo "  4. Verificar: where swipl"
                ;;
            Linux)
                echo "  # Debian/Ubuntu:"
                echo "  sudo apt install swi-prolog"
                echo ""
                echo "  # Fedora:"
                echo "  sudo dnf install pl"
                ;;
            *)
                echo "  Visitar: https://www.swi-prolog.org/download/stable"
                ;;
        esac
        echo ""
        echo "Después de instalar, ejecutar de nuevo este health check."
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        return 1
    fi
}

# Verificar prerequisitos primero
if ! check_swipl; then
    echo ""
    echo "❌ Stack NO puede arrancar sin SWI-Prolog"
    exit 2
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================
# FASE 1: Verificar Servicios HTTP
# ============================================

check_service() {
    local name=$1
    local url=$2
    local port=$3
    
    printf "%-30s" "$name:"
    
    response=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "$url" 2>/dev/null)
    
    if [ "$response" = "200" ]; then
        echo "✅ OK (HTTP $response)"
        return 0
    elif [ -n "$response" ] && [ "$response" != "000" ]; then
        echo "⚠️ HTTP $response"
        return 1
    else
        echo "❌ DOWN"
        return 1
    fi
}

echo "🔍 Verificando servicios..."
echo ""

# Contadores
total=0
ok=0

# MCP Launcher
check_service "🚀 MCP Launcher (3050)" "http://localhost:3050/health" && ((ok++))
((total++))

# MCP Prolog
check_service "🧠 MCP Prolog (3006)" "http://localhost:3006/health" && ((ok++))
((total++))

# Backend REST
check_service "⚙️  Backend REST (8000)" "http://localhost:8000/health" && ((ok++))
((total++))

# Frontend Angular
check_service "🌐 Frontend Angular (5001)" "http://localhost:5001" && ((ok++))
((total++))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Resultado: $ok/$total servicios operativos"

if [ $ok -eq $total ]; then
    echo "✅ Stack completo operativo"
    exit 0
else
    echo "⚠️ Algunos servicios no disponibles"
    exit 1
fi
