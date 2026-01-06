# Acta T002: Auditoría Histórica SWI-Prolog

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 002 |
| **Agente** | @ox |
| **Inicio** | 2026-01-03 21:30 |
| **Fin** | 2026-01-03 21:45 |
| **Estado final** | ✅ DONE |

---

## Contexto Leído

- Actas revisadas: T001
- Referencias consultadas:
  - `guia-arquitectura-mcp-stack.md` (v1.7.1)
  - `ARCHIVO/DEVOPS/Funcional.md`
  - `ARCHIVO/DEVOPS/Tecnico.md`
  - `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologMCPServer/01_backlog-borrador.md`
  - `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/01_backlog-borrador.md`
  - `ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA/02_analisis-submodulo.md`
  - `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`
  - `MCPGallery/mcp-mesh-sdk/src/services/PrologEngine.ts`
  - `PrologEditor/README-SCRIPTORIUM.md`
  - `scripts/test-prolog-integration.sh`
  - `scripts/apb-health-check.sh`
  - `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-ox-bridger.yaml`
  - `ARCHIVO/DISCO/COPILOT_SNAPSHOTS/INDEX.md`
  - `ARCHIVO/DISCO/COPILOT_SNAPSHOTS/2026-01-03_21-22_prologeditor-auto-reflexion-t013/requests.json`
  - Sesión predecesora: `2026-01-03_prolog-agent-brain-pack-refinement/02_ACTAS/T006_prologeditor_plan-e2e.md`
  - Git log: `git log --oneline --all --grep="prolog\|swipl\|SWI"`

---

## Aportación: Informe de Auditoría Histórica

### Hallazgo Principal

**SWI-Prolog NUNCA fue instalado en esta máquina Windows**.

La documentación existente asume instalación previa, pero los scripts de verificación solo ofrecen comandos para **macOS (`brew install swi-prolog`)**, lo cual indica que:

1. El desarrollo original se hizo en **macOS**
2. Esta sesión de cotrabajo es la **primera vez** que se ejecuta el stack E2E en Windows

---

### Evidencia Cronológica

| Fecha | Evento | Fuente |
|-------|--------|--------|
| 2026-01-02 | Epic SCRIPT-2.3.0 completado FC1 | `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologMCPServer/01_backlog-borrador.md` |
| 2026-01-02 | `PrologEngine.ts` creado (usa `swipl-stdio`) | `MCPGallery/mcp-mesh-sdk/src/services/PrologEngine.ts` |
| 2026-01-02 | Documentación dice `brew install swi-prolog` | `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md#L63` |
| 2026-01-03 | Sesión cotrabajo: Stack 4/4 operativo | `T009` de sesión predecesora |
| 2026-01-03 | Health check devuelve HTTP 200 en :3006 | Terminal `APB: Health Check` |
| 2026-01-03 | Al ejecutar `create_session` → MCP Server crashea | T001 de esta sesión |
| 2026-01-03 | `where swipl` → "no encontrado" | Terminal bash |

---

### Análisis del Engaño del Health Check

El health check dice "4/4 ✅ OK" pero **esto es engañoso**:

```
MCPPrologServer escucha en :3006 → HTTP 200 (metadata)
                                      ↓
        Al recibir create_session → PrologEngine.initialize()
                                      ↓
              swipl-stdio → spawn("swipl") → 💥 ENOENT
                                      ↓
                          Server process exits (code 1)
```

El servidor **responde al health check** porque sirve su metadata, pero **crashea al intentar usar Prolog** porque `swipl` no existe.

---

### Línea de Tiempo macOS → Windows

| Evidencia | macOS | Windows (actual) |
|-----------|-------|------------------|
| Scripts de instalación | `brew install swi-prolog` | ⚠️ No verificado |
| Test script | `scripts/test-prolog-integration.sh#L27`: "brew install" | Solo para macOS |
| README prerequisitos | `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md#L63` | Añadido Windows (winget) después |

**Conclusión**: El epic SCRIPT-2.3.0 se completó en **macOS**. Esta es la primera ejecución E2E en Windows.

---

### Grep Search Results: Comandos de Instalación

Búsqueda: `brew install|winget install|choco install`

| Archivo | Línea | Contenido |
|---------|-------|-----------|
| `scripts/test-prolog-integration.sh` | L27 | `echo "   → Instalar: brew install swi-prolog"` |
| `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` | L42 | `winget install SWI-Prolog.SWI-Prolog` |
| `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` | L63 | `brew install swi-prolog` |
| `PrologEditor/README-SCRIPTORIUM.md` | L150 | `brew install swi-prolog (macOS)` |
| `ARCHIVO/PLUGINS/PROLOG_EDITOR/README.md` | L104 | `brew install swi-prolog (macOS)` |
| `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_2026_LogicaAgentes/ejemplo_lucas_import_export.md` | L246 | `[ ] SWI-Prolog instalado (brew install swi-prolog)` |
| `ARCHIVO/DISCO/BACKLOG_BORRADORES/IOT-SBR-LOGICA/02_analisis-submodulo.md` | L287 | `SWI-Prolog 9.x brew install swi-prolog ✅` |

**Observación**: La mayoría de referencias son para macOS. Windows (winget) aparece solo en README-SCRIPTORIUM.md del mcp-mesh-sdk.

---

### Grep Search Results: Verificación de swipl

Búsqueda: `where swipl|which swipl|swipl.*not found`

| Archivo | Línea | Contenido |
|---------|-------|-----------|
| `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` | L48 | `where swipl` |
| `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` | L66 | `which swipl` |
| `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` | L77 | `which swipl` |
| `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-ox-bridger.yaml` | L78 | `command: "which swipl \|\| where swipl"` |
| `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-usuario-final.yaml` | L146 | `message: "Error creating session: swipl not found"` |
| `ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-03_prolog-e2e-testing/02_ACTAS/T001_prologeditor_tools-core-e2e.md` | L96 | `$ where swipl` |

---

### Contenido Relevante de PrologEngine.ts

```typescript
/**
 * Prolog Engine Wrapper
 * Local implementation using swipl-stdio (copied from AAIAGallery pattern)
 */
import * as swipl from 'swipl-stdio';
import fs from 'fs';
import path from 'path';
import { l } from '../Logger';

export class PrologEngine {
	public engine: swipl.Engine;
	private loadedFiles: string[] = [];
	private cacheFilePath: string;

	constructor() {
		this.engine = new swipl.Engine();  // ← Aquí falla si swipl no existe
		// ...
	}
```

El constructor instancia `swipl.Engine()` que internamente hace `spawn("swipl")`. Si el binario no existe en PATH, crashea.

---

### Contenido Relevante de usecases-ox-bridger.yaml

```yaml
x-use-cases:
  UC-OX-001:
    name: Verificar Prerequisitos del Stack
    actor: "@ox"
    preconditions:
      - Workspace aleph-scriptorium clonado
      - Submódulos inicializados (git submodule update --init)
      - Node.js >= 18 instalado
      - SWI-Prolog instalado (swipl en PATH)  # ← ESTE ES EL PREREQUISITO FALTANTE
    trigger: Usuario solicita "@ox verificar stack prolog"
    flow:
      - step: 2
        action: "Verificar SWI-Prolog"
        command: "which swipl || where swipl"
        check: "Retorna ruta válida"
    exceptions:
      - condition: "swipl no encontrado"
        action: "Instruir instalación de SWI-Prolog"
```

---

### Git Log: Commits Relacionados con Prolog

```
b5a41f3 docs(script/cotrabajo): cerrar sesión COWORK-1.0.0 + lecciones operativas
b45dd34 feat(script/cotrabajo): sesión T010-T011 + fixes APB tasks
c8224ce feat(script/cotrabajo): sesión prolog-agent-brain-pack-refinement T004-T009
6086c91 feat(cotrabajo): T001 - setup sesión prolog-agent-brain-pack-refinement
0ae5839 docs(script/agents): mapear arquitectura MCP 4 capas en plugin prolog-editor
910f97c refactor(script/prolog): PROLOG-DRY-1.0.0 - Alineamiento completo de tipos (3 pts)
85baf10 feat(script/prolog): PROLOG-UI-2.0.0 - PrologEditor UI Refactor (21 pts)
fb33a17 feat(script/prolog): PROLOG-PROMPTS-1.0.0 - MCP Prompts Completion (17 pts)
00a95de feat(script/prolog): PROLOG-PROMPTS-1.0.0 - MCP Prompts Completion (17 pts)
f750300 feat(script/prolog): PROLOG-CLIENT-GEN-1.0.0 - OpenAPI Client for MCPPrologServer
8b7b6af docs(script/devops): spikes integración frontend PrologEditor
a6e0497 feat(script/agent-creator): actualizar Lucas a v2.0.0
2b958ab feat(script/teatro): integrar Lucas en Ítaca Digital
a2b098d feat(script/teatro): implementar cerebro Prolog de Lucas
ea3b04e feat(script/mcp-presets): crear AgentPrologBrain pack tipado
a36fa9a docs(blueprint): añadir diagrama Prolog MCP Flow (T023)
954fd6f docs(script/backlog): actualizar SCRIPT-2.3.0 FC1 completado
fef408f prolog-mcp-server
706d15d docs(script/indice): Sync indices with SCRIPT-2.3.0 Prolog MCP
9549201 docs(backlog): Update S01-S04 completion, add S05-S06 FC2 tasks
```

**Observación**: Todos estos commits se hicieron sin evidencia de pruebas E2E exitosas con swipl en Windows.

---

### Estado del Backlog SCRIPT-2.3.0

Según `ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologMCPServer/01_backlog-borrador.md`:

| Story | Descripción | Estado |
|-------|-------------|--------|
| S01 | Configuración y Registro | ✅ Completado |
| S02 | Session Manager | ✅ Completado |
| S03 | MCP Server Base | ✅ Completado (FC1) |
| S04 | Implementación Real de Queries | ✅ Completado (FC1) |
| **S05** | **Tests E2E** | **⏳ Pendiente (FC2)** |
| S06 | Documentación | ✅ Completado |

**S05 dice explícitamente "Pendiente (FC2)"** — Las pruebas E2E nunca se ejecutaron.

---

### Snapshots Copilot Relevantes

Según `ARCHIVO/DISCO/COPILOT_SNAPSHOTS/INDEX.md`:

| ID | Nombre | Fecha | Backlog |
|----|--------|-------|---------|
| 2026-01-03_21-22_prologeditor-auto-reflexion-t013 | prologeditor-auto-reflexion-t013 | 1/3/2026 | COWORK-1.0.0 |
| 2026-01-03_21-19_auto-reflexion-investigacion | auto-reflexion-investigacion | 1/3/2026 | COWORK-1.0.0 |

En el snapshot `2026-01-03_21-22_prologeditor-auto-reflexion-t013/requests.json` se documenta la sesión anterior donde se verificó "Stack 4/4 ✅" pero **sin ejecutar queries Prolog reales**.

---

## Decisiones Tomadas

1. **Confirmado**: SWI-Prolog nunca fue instalado en esta máquina Windows
2. **Confirmado**: El epic SCRIPT-2.3.0 se desarrolló en macOS
3. **Confirmado**: Esta es la primera ejecución E2E en Windows
4. **Confirmado**: El health check es engañoso (HTTP 200 ≠ Prolog funcional)
5. **Confirmado**: S05 (Tests E2E) está pendiente como FC2 en el backlog original

---

## Acción Requerida del Usuario

### Instalación en Windows

```powershell
# PowerShell como Administrador
winget install SWI-Prolog.SWI-Prolog

# Verificar (nueva terminal)
where swipl
# Esperado: C:\Program Files\swipl\bin\swipl.exe

# Si usa Git Bash, añadir a ~/.bashrc:
export PATH="$PATH:/c/Program Files/swipl/bin"
```

### Post-instalación

1. Cerrar y reabrir terminal (actualizar PATH)
2. Verificar: `swipl --version`
3. Reiniciar tasks: `APB: Start Full Stack` (o individuales)
4. Re-ejecutar T001

---

## Preguntas para Siguientes Turnos

- [ ] ¿Usuario instaló SWI-Prolog? → verificar con `where swipl`
- [ ] ¿Reiniciar tasks después de instalación?
- [ ] ¿Re-ejecutar T001 con @prologeditor?

---

## Siguiente Turno Sugerido

**Esperando input del usuario**: Instalar SWI-Prolog

Después de instalación: @prologeditor para re-ejecutar T001 (Tools Core E2E)
