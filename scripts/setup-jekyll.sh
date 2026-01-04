#!/bin/bash
# Script de instalación de Jekyll para validación local
# Uso: ./scripts/setup-jekyll.sh
# Compatible: Windows (Git Bash/MSYS2), Linux, macOS
# Requiere: Ruby 3.0.1+ (rbenv en Unix, RubyInstaller en Windows)

set -e

# ============================================
# Cargar helper de Ruby cross-platform
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib/ruby-env.sh"

echo "🔧 Instalando Jekyll para validación local..."
echo ""
echo "🖥️  Sistema detectado: $RUBY_ENV_OS"

# ============================================
# Verificar Ruby usando helper
# ============================================
echo ""
echo "✓ Verificando Ruby..."

if ! ensure_ruby "3.0"; then
    exit 1
fi

ruby_version=$(ruby --version)
echo "  $ruby_version"

# ============================================
# Instalar bundler
# ============================================
echo ""
echo "📦 Instalando Bundler..."

if [[ "$RUBY_ENV_OS" == "Windows" ]]; then
    # En Windows con RubyInstaller, --user-install puede causar problemas
    gem install bundler 2>/dev/null || gem install bundler --user-install
else
    gem install bundler --user-install
fi

# ============================================
# Obtener directorio del script (cross-platform)
# ============================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$WORKSPACE_DIR/docs"

echo ""
echo "📂 Workspace: $WORKSPACE_DIR"
echo "📂 Docs:      $DOCS_DIR"

# Navegar a docs/
cd "$DOCS_DIR"

# ============================================
# Eliminar Gemfile.lock antiguo si existe
# ============================================
if [ -f "Gemfile.lock" ]; then
    echo ""
    echo "🗑️  Eliminando Gemfile.lock antiguo..."
    rm -f Gemfile.lock
fi

# ============================================
# Instalar dependencias de Jekyll
# ============================================
echo ""
echo "📚 Instalando dependencias de Jekyll..."
bundle config set --local path 'vendor/bundle'

# En Windows, puede haber problemas con eventmachine
if [[ "$RUBY_ENV_OS" == "Windows" ]]; then
    echo "   (Windows detectado: usando configuración especial)"
    # Forzar plataforma Ruby puro para gemas problemáticas
    bundle config set --local force_ruby_platform true 2>/dev/null || true
fi

bundle install

# ============================================
# Mensaje de éxito
# ============================================
echo ""
echo "✅ Jekyll instalado correctamente"
echo ""
echo "Comandos disponibles:"

if [[ "$RUBY_ENV_OS" == "Windows" ]]; then
    echo "  bash ./scripts/validate-site.sh  - Validar Jekyll sin servidor"
    echo "  bash ./scripts/serve-site.sh     - Iniciar servidor local (http://localhost:4000)"
else
    echo "  ./scripts/validate-site.sh  - Validar Jekyll sin servidor"
    echo "  ./scripts/serve-site.sh     - Iniciar servidor local (http://localhost:4000)"
fi

echo ""
echo "💡 Tip: Si tienes problemas con gemas nativas en Windows,"
echo "   ejecuta: ridk install (opción 3) desde cmd.exe"
