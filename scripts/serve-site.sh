#!/bin/bash
# Script para iniciar servidor Jekyll local
# Uso: ./scripts/serve-site.sh
# Compatible: Windows (Git Bash/MSYS2), Linux, macOS

set -e

# ============================================
# Cargar helper de Ruby cross-platform
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"

if [ -f "$SCRIPT_DIR/lib/ruby-env.sh" ]; then
    source "$SCRIPT_DIR/lib/ruby-env.sh"
    
    if ! ensure_ruby "3.0"; then
        echo ""
        echo "💡 Ejecuta primero: ./scripts/setup-jekyll.sh"
        exit 1
    fi
else
    # Fallback: intentar rbenv directamente (compatibilidad legacy)
    if command -v rbenv &> /dev/null; then
        eval "$(rbenv init -)"
    fi
fi

echo "🚀 Iniciando servidor Jekyll local..."
echo ""

cd "$WORKSPACE_DIR/docs/"

# Verificar bundler
if ! command -v bundle &> /dev/null; then
    echo "❌ Bundler no instalado. Ejecuta primero:"
    echo "   ./scripts/setup-jekyll.sh"
    exit 1
fi

# Iniciar servidor (sin livereload para evitar problemas con eventmachine en macOS)
echo "📡 Servidor iniciado en: http://localhost:4000"
echo "   Presiona Ctrl+C para detener"
echo "   (Recarga manual: F5 o Cmd+R)"
echo ""

bundle exec jekyll serve --trace
