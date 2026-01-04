#!/bin/bash
# ============================================
# ruby-env.sh - Helper para configurar Ruby cross-platform
# Uso: source ./scripts/lib/ruby-env.sh
# Compatible: Windows (Git Bash/MSYS2), Linux, macOS
# ============================================

# Detectar sistema operativo
detect_os() {
    case "$(uname -s)" in
        Linux*)     RUBY_ENV_OS="Linux";;
        Darwin*)    RUBY_ENV_OS="macOS";;
        CYGWIN*)    RUBY_ENV_OS="Windows";;
        MINGW*)     RUBY_ENV_OS="Windows";;
        MSYS*)      RUBY_ENV_OS="Windows";;
        *)          RUBY_ENV_OS="Unknown";;
    esac
}

# Configurar PATH de Ruby según SO
setup_ruby_path() {
    detect_os
    
    # Si Ruby ya está en PATH, no hacer nada
    if command -v ruby &> /dev/null; then
        return 0
    fi
    
    case "$RUBY_ENV_OS" in
        Windows)
            # Buscar Ruby en ubicaciones comunes de Windows
            local ruby_paths=(
                "/c/Ruby34-x64/bin"
                "/c/Ruby33-x64/bin"
                "/c/Ruby32-x64/bin"
                "/c/Ruby31-x64/bin"
                "/c/Ruby30-x64/bin"
                "/c/Program Files/Ruby34-x64/bin"
                "/c/Program Files/Ruby33-x64/bin"
            )
            
            for ruby_path in "${ruby_paths[@]}"; do
                if [ -d "$ruby_path" ] && [ -f "$ruby_path/ruby.exe" ]; then
                    export PATH="$ruby_path:$PATH"
                    return 0
                fi
            done
            
            # No encontrado
            echo ""
            echo "⚠️  Ruby no encontrado en PATH (Windows)"
            echo ""
            echo "📥 Instrucciones:"
            echo "   1. Descarga RubyInstaller: https://rubyinstaller.org/downloads/"
            echo "   2. Instala Ruby+Devkit 3.1+ (x64)"
            echo "   3. Durante instalación, selecciona 'Add Ruby to PATH'"
            echo "   4. Ejecuta 'ridk install' (opción 3) para toolchain"
            echo "   5. Reinicia Git Bash"
            echo ""
            return 1
            ;;
            
        macOS|Linux)
            # Intentar rbenv
            if command -v rbenv &> /dev/null; then
                eval "$(rbenv init -)"
                if command -v ruby &> /dev/null; then
                    return 0
                fi
            fi
            
            # Intentar rvm
            if [ -s "$HOME/.rvm/scripts/rvm" ]; then
                source "$HOME/.rvm/scripts/rvm"
                if command -v ruby &> /dev/null; then
                    return 0
                fi
            fi
            
            # Intentar asdf
            if [ -f "$HOME/.asdf/asdf.sh" ]; then
                source "$HOME/.asdf/asdf.sh"
                if command -v ruby &> /dev/null; then
                    return 0
                fi
            fi
            
            # No encontrado
            echo ""
            echo "⚠️  Ruby no encontrado en PATH ($RUBY_ENV_OS)"
            echo ""
            echo "📥 Instrucciones:"
            if [ "$RUBY_ENV_OS" = "macOS" ]; then
                echo "   brew install rbenv ruby-build"
                echo "   rbenv install 3.1.4 && rbenv global 3.1.4"
            else
                echo "   # Ubuntu/Debian:"
                echo "   sudo apt install rbenv ruby-build"
                echo "   rbenv install 3.1.4 && rbenv global 3.1.4"
                echo ""
                echo "   # O usando apt directamente:"
                echo "   sudo apt install ruby-full"
            fi
            echo ""
            return 1
            ;;
            
        *)
            echo "⚠️  Sistema operativo no reconocido: $(uname -s)"
            return 1
            ;;
    esac
}

# Verificar versión mínima de Ruby
check_ruby_version() {
    local min_version="${1:-3.0}"
    
    if ! command -v ruby &> /dev/null; then
        return 1
    fi
    
    local ruby_version=$(ruby -e "puts RUBY_VERSION")
    local major=$(echo "$ruby_version" | cut -d. -f1)
    local minor=$(echo "$ruby_version" | cut -d. -f2)
    local min_major=$(echo "$min_version" | cut -d. -f1)
    local min_minor=$(echo "$min_version" | cut -d. -f2)
    
    if [ "$major" -lt "$min_major" ] || ([ "$major" -eq "$min_major" ] && [ "$minor" -lt "$min_minor" ]); then
        echo ""
        echo "⚠️  Ruby $ruby_version detectado. Se requiere Ruby $min_version+"
        echo ""
        return 1
    fi
    
    return 0
}

# Función principal: configurar todo
ensure_ruby() {
    local min_version="${1:-3.0}"
    
    setup_ruby_path || return 1
    check_ruby_version "$min_version" || return 1
    
    return 0
}

# Obtener directorio del script que invoca (cross-platform)
get_script_dir() {
    echo "$(cd "$(dirname "${BASH_SOURCE[1]}")" && pwd)"
}

get_workspace_dir() {
    local script_dir="$(get_script_dir)"
    echo "$(dirname "$script_dir")"
}
