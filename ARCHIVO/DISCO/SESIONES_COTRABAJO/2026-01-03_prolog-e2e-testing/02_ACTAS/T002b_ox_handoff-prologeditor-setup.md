# Acta T002b: Handoff a @prologeditor — Mejorar Protocolo de Setup

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 002b (anexo) |
| **Agente** | @ox |
| **Inicio** | 2026-01-03 21:50 |
| **Fin** | 2026-01-03 21:55 |
| **Estado final** | ✅ DONE (handoff) |

---

## Contexto

En T002 documenté que SWI-Prolog nunca fue instalado en esta máquina Windows. Sin embargo, el problema de fondo es que **el protocolo de setup del plugin prolog-editor no detectó esta deficiencia**.

La sesión predecesora (`2026-01-03_prolog-agent-brain-pack-refinement`) reportó "Stack 4/4 ✅ OK" sin verificar que el motor Prolog realmente funcionara.

---

## Problema Identificado

### 1. El Setup NO Verifica Prerequisitos del Sistema Operativo

El flujo actual:

```
APB: Start Full Stack
       ↓
Health Check (HTTP 200 en puertos)
       ↓
"Stack OK" ← FALSO POSITIVO
```

El health check verifica que los **servidores HTTP respondan**, pero NO verifica que **SWI-Prolog esté instalado** en el sistema.

### 2. El Protocolo de Setup Ignora el SO del Host

| Sistema | Comando instalación | Estado actual |
|---------|---------------------|---------------|
| macOS | `brew install swi-prolog` | ✅ Documentado |
| Windows | `winget install SWI-Prolog.SWI-Prolog` | ⚠️ Documentado pero no verificado |
| Linux | `apt install swi-prolog` | ⚠️ Solo mencionado |

El setup debería:
1. Detectar el SO del host
2. Verificar si `swipl` está en PATH
3. Si no está, instruir instalación según SO
4. Bloquear arranque del stack hasta que prerequisito esté OK

### 3. Ubicación del Gap

| Archivo | Responsabilidad | Gap |
|---------|-----------------|-----|
| `.github/plugins/prolog-editor/manifest.md` | Declarar prerequisitos | ⚠️ No declara swipl como prerequisito de sistema |
| `scripts/apb-health-check.sh` | Verificar servicios | ⚠️ No verifica `swipl` en PATH |
| `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` | Documentar instalación | ✅ Tiene instrucciones pero no se ejecutan |
| `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-ox-bridger.yaml` | UC-OX-001 | ✅ Define verificación pero no se usa |

### 4. El Use Case UC-OX-001 Ya Define el Flujo Correcto

En `usecases-ox-bridger.yaml`:

```yaml
UC-OX-001:
  name: Verificar Prerequisitos del Stack
  preconditions:
    - SWI-Prolog instalado (swipl en PATH)
  flow:
    - step: 2
      action: "Verificar SWI-Prolog"
      command: "which swipl || where swipl"
      check: "Retorna ruta válida"
  exceptions:
    - condition: "swipl no encontrado"
      action: "Instruir instalación de SWI-Prolog"
```

Este use case **existe pero nunca se implementó** en el script de health check ni en el flujo de setup.

---

## Solicitud a @prologeditor

### Tarea: Implementar Verificación de Prerequisitos en Setup

**Objetivo**: Que el stack NO arranque si `swipl` no está instalado, y que instruya al usuario cómo instalarlo según su SO.

### Entregables Esperados

1. **Actualizar `scripts/apb-health-check.sh`**:
   - Añadir verificación de `swipl` en PATH ANTES de verificar puertos
   - Si no está, mostrar instrucciones según SO detectado
   - Retornar exit code != 0 si prerequisito falta

2. **Crear `scripts/apb-prereq-check.sh`** (opcional):
   - Script separado que solo verifica prerequisitos
   - Puede invocarse antes de `APB: Start Full Stack`

3. **Actualizar `.github/plugins/prolog-editor/manifest.md`**:
   - Añadir sección `systemPrerequisites` con:
     - `swipl` (SWI-Prolog)
     - Comandos de instalación por SO

4. **Actualizar `.vscode/tasks.json`**:
   - Añadir task `APB: Check Prerequisites`
   - Hacerla dependencia de `APB: Start Full Stack`

### Detección de Sistema Operativo

```bash
# En bash:
case "$(uname -s)" in
    Darwin*)  OS="macOS" ;;
    Linux*)   OS="Linux" ;;
    MINGW*|MSYS*|CYGWIN*) OS="Windows" ;;
    *)        OS="Unknown" ;;
esac
```

### Instrucciones por SO

| SO | Comando | Verificación |
|----|---------|--------------|
| macOS | `brew install swi-prolog` | `which swipl` |
| Windows | `winget install SWI-Prolog.SWI-Prolog` | `where swipl` |
| Linux (Debian) | `sudo apt install swi-prolog` | `which swipl` |
| Linux (Fedora) | `sudo dnf install pl` | `which swipl` |

### Ejemplo de Output Esperado

```
╔══════════════════════════════════════╗
║   APB: Agent Prolog Brain - Setup    ║
╚══════════════════════════════════════╝

🔍 Verificando prerequisitos del sistema...

Sistema operativo: Windows (MINGW64)

❌ SWI-Prolog NO ENCONTRADO

Para instalar SWI-Prolog en Windows:

  1. Abrir PowerShell como Administrador
  2. Ejecutar: winget install SWI-Prolog.SWI-Prolog
  3. Cerrar y reabrir terminal
  4. Verificar: where swipl

Después de instalar, ejecutar de nuevo este health check.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⛔ Prerequisitos no cumplidos. Stack NO arrancado.
```

---

## Referencias para @prologeditor

| Documento | Path | Relevancia |
|-----------|------|------------|
| Use Case UC-OX-001 | `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-ox-bridger.yaml` | Flujo definido |
| Health Check actual | `scripts/apb-health-check.sh` | A modificar |
| README con instrucciones | `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` | Fuente de comandos |
| Manifest del plugin | `.github/plugins/prolog-editor/manifest.md` | Declarar prerequisitos |
| Acta T002 completa | `02_ACTAS/T002_ox_auditoria-swipl-historico.md` | Contexto completo |

---

## Siguiente Turno

@prologeditor para T003: Implementar verificación de prerequisitos en setup

**Scope**:
1. Leer esta acta + T002
2. Implementar cambios en scripts y manifest
3. Probar en Windows (esta máquina)
4. Documentar en acta T003
