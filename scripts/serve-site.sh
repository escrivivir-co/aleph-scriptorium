#!/bin/bash
# Script para iniciar servidor Jekyll local
# Uso: ./scripts/serve-site.sh

set -e

echo "🚀 Iniciando servidor Jekyll local..."
echo ""

cd docs/

# Verificar bundler
if ! command -v bundle &> /dev/null; then
    echo "❌ Bundler no instalado. Ejecuta primero:"
    echo "   ./scripts/setup-jekyll.sh"
    exit 1
fi

# Iniciar servidor
echo "📡 Servidor iniciado en: http://localhost:4000"
echo "   Presiona Ctrl+C para detener"
echo ""

bundle exec jekyll serve --livereload --trace
