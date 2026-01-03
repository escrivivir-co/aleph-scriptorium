#!/bin/bash
# scripts/apb-health-check.sh
# APB: Agent Prolog Brain - Health Check
# 
# Verifica estado de los 4 servicios del stack MCP Prolog
# Uso: bash scripts/apb-health-check.sh

echo "╔══════════════════════════════════════╗"
echo "║   APB: Agent Prolog Brain - Health   ║"
echo "╚══════════════════════════════════════╝"
echo ""

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
