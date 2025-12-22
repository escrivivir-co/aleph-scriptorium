#!/bin/bash
# Script de validación local de Jekyll (sin servidor)
# Uso: ./scripts/validate-site.sh

set -e

echo "🔍 Validando sitio Jekyll localmente..."
echo ""

cd docs/

# Verificar que bundler esté disponible
if ! command -v bundle &> /dev/null; then
    echo "❌ Bundler no instalado. Ejecuta primero:"
    echo "   ./scripts/setup-jekyll.sh"
    exit 1
fi

# Ejecutar build de Jekyll
echo "📦 Compilando sitio..."
bundle exec jekyll build --trace

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Sitio compilado correctamente en docs/_site/"
    echo ""
    echo "Verificaciones adicionales:"
    
    # Contar archivos HTML generados
    html_count=$(find _site -name "*.html" | wc -l | tr -d ' ')
    echo "  • Páginas HTML generadas: $html_count"
    
    # Verificar que teatro esté presente
    if [ -d "_site/teatro" ]; then
        echo "  • ✓ Directorio /teatro/ generado"
        teatro_pages=$(find _site/teatro -name "*.html" | wc -l | tr -d ' ')
        echo "    - Páginas de teatro: $teatro_pages"
    else
        echo "  • ⚠️  Directorio /teatro/ no encontrado"
    fi
    
    echo ""
    echo "Para ver el sitio localmente: ./scripts/serve-site.sh"
else
    echo ""
    echo "❌ Error en compilación. Ver detalles arriba."
    exit 1
fi
