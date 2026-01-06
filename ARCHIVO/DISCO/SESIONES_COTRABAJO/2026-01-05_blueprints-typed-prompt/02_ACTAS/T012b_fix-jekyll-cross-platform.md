# Acta T012b: Fix Jekyll Cross-Platform

**Fecha**: 2026-01-04  
**Tipo**: 🐛 Bugfix + 🔧 Tooling  
**Estado**: ✅ RESUELTO

---

## Contexto

Para visualizar los blueprints en localhost:4000, se requería Jekyll funcionando. El script `setup-jekyll.sh` solo funcionaba en Unix.

## Problema

| Issue | Descripción |
|-------|-------------|
| `setup-jekyll.sh` | Solo funcionaba en Unix, fallaba en Windows/Git Bash |
| Ruby PATH | RubyInstaller no añade automáticamente al PATH de Git Bash |
| Gemas nativas | `eventmachine` fallaba en Windows sin `force_ruby_platform` |
| Ruby 3.4 | Requiere gemas adicionales (`csv`, `base64`, `bigdecimal`) |

## Solución

### 1. Helper Cross-Platform (`scripts/lib/ruby-env.sh`)

```bash
# Detecta SO y configura Ruby automáticamente
detect_os()      # Windows/Linux/macOS
find_ruby()      # Busca en paths conocidos por SO
setup_ruby_env() # Configura PATH + warnings específicos
```

### 2. Scripts Actualizados

| Script | Cambio |
|--------|--------|
| `setup-jekyll.sh` | Detección SO, instrucciones específicas por plataforma |
| `serve-site.sh` | Source helper, rutas absolutas |
| `validate-site.sh` | Source helper, rutas absolutas |
| `docs/Gemfile` | Gemas para Ruby 3.4+ |

### 3. Instalación Windows Completada

| Componente | Versión | Estado |
|------------|---------|--------|
| Ruby | 3.4.8 | ✅ |
| Bundler | 4.0.3 | ✅ |
| Jekyll | 4.3.4 | ✅ |
| PATH persistente | `~/.bashrc` | ✅ |

## Comandos Disponibles

```bash
# Servidor local (hot-reload)
./scripts/serve-site.sh
# → http://localhost:4000

# Validación sin servidor
./scripts/validate-site.sh
```

## Archivos Creados/Modificados

| Archivo | Tipo |
|---------|------|
| `scripts/lib/ruby-env.sh` | ✨ Nuevo |
| `scripts/setup-jekyll.sh` | 📝 Modificado |
| `scripts/serve-site.sh` | 📝 Modificado |
| `scripts/validate-site.sh` | 📝 Modificado |
| `docs/Gemfile` | 📝 Modificado |

---

## Resultado

**✅ Server Jekyll disponible** para visualizar blueprints en localhost:4000.

Probado en:
- Windows 11 + Git Bash + Ruby 3.4.8
