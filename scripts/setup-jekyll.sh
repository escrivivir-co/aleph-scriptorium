#!/bin/bash
# Script de instalación de Jekyll para validación local
# Uso: ./scripts/setup-jekyll.sh

set -e

echo "🔧 Instalando Jekyll para validación local..."
echo ""

# Verificar Ruby
echo "✓ Verificando Ruby..."
ruby_version=$(ruby --version)
echo "  $ruby_version"

# Instalar bundler (versión compatible con Ruby 2.6)
echo ""
echo "📦 Instalando Bundler..."
gem install bundler -v 2.4.22 --user-install

# Añadir al PATH si no está
if [[ ":$PATH:" != *":$HOME/.gem/ruby/2.6.0/bin:"* ]]; then
    export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
    echo "export PATH=\"\$HOME/.gem/ruby/2.6.0/bin:\$PATH\"" >> ~/.zshrc
    echo "  ✓ Añadido ~/.gem/ruby/2.6.0/bin al PATH"
fi

# Navegar a docs/
cd docs/

# Crear Gemfile si no existe
if [ ! -f "Gemfile" ]; then
    echo ""
    echo "📝 Creando Gemfile..."
    cat > Gemfile << 'EOF'
source "https://rubygems.org"

gem "jekyll", "~> 4.2.0"
gem "jekyll-seo-tag"
gem "webrick", "~> 1.7"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
end
EOF
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
