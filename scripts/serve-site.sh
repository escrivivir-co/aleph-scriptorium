#!/bin/bash
# Script para iniciar servidor Jekyll local
# Uso: ./scripts/serve-site.sh
# Requiere: rbenv con Ruby 3.0.1+

set -e

# Inicializar rbenv si está disponible
if command -v rbenv &> /dev/null; then
    eval "$(rbenv init -)"
fi

echo "🚀 Iniciando servidor Jekyll local..."
echo ""

cd docs/

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
