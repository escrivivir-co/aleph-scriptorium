# Acta T003: Implementación de Verificación SWI-Prolog

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 003 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 (retroactivo) |
| **Fin** | 2026-01-03 (retroactivo) |
| **Estado final** | ✅ DONE |

> **Nota**: Esta acta fue creada retroactivamente en T006 para documentar trabajo que se hizo pero no se registró.

---

## Contexto Leído

- Actas revisadas: T002, T002b
- Referencias: `usecases-ox-bridger.yaml` (UC-OX-001)

---

## Aportación: Implementación de Verificación de Prerequisitos

### 1. Script `apb-health-check.sh` Actualizado

Se implementó la función `check_swipl()` que:

1. **Detecta el sistema operativo** (`macOS`, `Linux`, `Windows`)
2. **Busca swipl en PATH** usando `which` o `where` según SO
3. **Auto-detecta en rutas conocidas** si no está en PATH:
   - Windows: `C:\Program Files\swipl\bin`
   - macOS: `/opt/homebrew/bin`, `/usr/local/bin`
   - Linux: `/usr/bin`, `/usr/local/bin`
4. **Inyecta temporalmente en PATH** si encuentra swipl fuera de PATH
5. **Muestra instrucciones de instalación** si no encuentra swipl

### 2. Código Implementado

```bash
detect_os() {
    case "$(uname -s)" in
        Darwin*)  echo "macOS" ;;
        Linux*)   echo "Linux" ;;
        MINGW*|MSYS*|CYGWIN*) echo "Windows" ;;
        *)        echo "Unknown" ;;
    esac
}

check_swipl() {
    local OS=$(detect_os)
    # ... detección según SO
    # ... auto-inyección en PATH
    # ... instrucciones si falta
}
```

### 3. Manifest Actualizado

Se añadió sección `systemPrerequisites` a `.github/plugins/prolog-editor/manifest.md`:

```yaml
systemPrerequisites:
  - name: "SWI-Prolog"
    binary: "swipl"
    required: true
    install:
      macOS: "brew install swi-prolog"
      Windows: "winget install SWI-Prolog.SWI-Prolog"
      Linux-Debian: "sudo apt install swi-prolog"
```

### 4. Task Añadida

Se añadió `APB: Check Prerequisites` a `.vscode/tasks.json`:

```json
{
  "label": "APB: Check Prerequisites",
  "type": "shell",
  "command": "bash",
  "args": ["-c", "bash ./scripts/apb-health-check.sh 2>&1 | head -30"],
  "detail": "Solo verifica prerequisitos (swipl en PATH) - rápido"
}
```

---

## Decisiones Tomadas

1. **Auto-detección > fallo duro**: El script intenta encontrar swipl antes de fallar
2. **Inyección temporal**: Si swipl está instalado pero no en PATH, lo añade para la sesión
3. **Multi-plataforma**: Soporte para Windows, macOS y Linux

---

## Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `scripts/apb-health-check.sh` | +120 líneas (verificación swipl) |
| `.github/plugins/prolog-editor/manifest.md` | +20 líneas (systemPrerequisites) |
| `.vscode/tasks.json` | +15 líneas (APB: Check Prerequisites) |

---

## Verificación

```bash
$ bash ./scripts/apb-health-check.sh
🔧 Verificando prerequisitos del sistema...
Sistema operativo: Windows
SWI-Prolog (swipl): ✅ (auto-detectado)
   Ruta: /c/Program Files/swipl/bin/swipl.exe
   
📊 Resultado: 4/4 servicios operativos
✅ Stack completo operativo
```

---

## Siguiente Turno

T004 (invalidado por T005) → T005 (@ox validación)
