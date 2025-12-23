#!/bin/bash
# Script de instalación de Jekyll para validación local
# Uso: ./scripts/setup-jekyll.sh
# Requiere: rbenv con Ruby 3.0.1+

set -e

echo "🔧 Instalando Jekyll para validación local..."
echo ""

# Inicializar rbenv si está disponible
if command -v rbenv &> /dev/null; then
    eval "$(rbenv init -)"
fi

# Verificar Ruby
echo "✓ Verificando Ruby..."
ruby_version=$(ruby --version)
echo "  $ruby_version"

# Verificar versión mínima (3.0+)
if [[ "$ruby_version" == *"2.6"* ]] || [[ "$ruby_version" == *"2.7"* ]]; then
    echo ""
    echo "⚠️  Ruby 2.x detectado. Se requiere Ruby 3.0+"
    echo "   Ejecuta: rbenv global 3.0.1 && exec \$SHELL"
    exit 1
fi

# Instalar bundler
echo ""
echo "📦 Instalando Bundler..."
gem install bundler --user-install

# Navegar a docs/
cd docs/

# Eliminar Gemfile.lock antiguo si existe (para evitar conflictos)
if [ -f "Gemfile.lock" ]; then
    echo "🗑️  Eliminando Gemfile.lock antiguo..."
    rm Gemfile.lock
fi

# Instalar dependencias
echo ""
echo "📚 Instalando dependencias de Jekyll..."
bundle config set --local path 'vendor/bundle'
bundle install

echo ""
echo "✅ Jekyll instalado correctamente"
echo ""
echo "Comandos disponibles:"
echo "  ./scripts/validate-site.sh  - Validar Jekyll sin servidor"
echo "  ./scripts/serve-site.sh     - Iniciar servidor local (http://localhost:4000)"
