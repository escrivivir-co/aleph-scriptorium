# Backlog Borrador: VECTOR-MACHINE-UI-1.0.0 — VectorMachineUI

**Opportunity**: Aleph Scriptorium  
**Sprint**: 1  
**Effort total**: 13 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

`VectorMachineUI` nace de extraer la admin UI de Chroma fuera de `VectorMachineSDK/chromadb-admin-main` para convertirla en un submódulo raíz del workspace. La integración persigue dos objetivos: mantener el stack vectorial desacoplado y dejar la UI operable desde VS Code sin romper el mapa DRY del Scriptorium.

---

## Feature Cycles / Iteraciones

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Extraer y registrar el submódulo raíz | 5 pts |
| FC2 | Indexar y documentar la nueva topología | 5 pts |
| FC3 | Habilitar operación desde workspace (tasks + setup) | 3 pts |

---

## Stories

### VECTOR-MACHINE-UI-S01 — Extraer y registrar el submódulo
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Separar `VectorMachineUI` del core vectorial y dejarlo registrado como submódulo raíz con la rama de integración correcta.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Mover el repo desde `VectorMachineSDK/chromadb-admin-main` a `VectorMachineUI/` | 2 | ⏳ |
| T002 | Registrar el submódulo en `.gitmodules` con rama `integration/beta/scriptorium` | 2 | ⏳ |
| T003 | Normalizar `gitdir` y verificar remoto/branch | 1 | ⏳ |

#### Definition of Done
- [ ] `VectorMachineUI/` aparece como submódulo raíz en `git submodule status`.
- [ ] El remoto apunta a `vm-sdk-chromadb-admin`.
- [ ] El repo anidado deja de existir dentro de `VectorMachineSDK/`.

---

### VECTOR-MACHINE-UI-S02 — Indexar el stack VectorMachine
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Actualizar el mapa DRY del workspace para reflejar que `vector-machine` ahora orquesta dos submódulos: core y UI.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T004 | Actualizar `Funcional.md`, `Tecnico.md` e `indice.agent.md` | 2 | ⏳ |
| T005 | Actualizar manifest, instructions y runtime docs de `vector-machine` | 2 | ⏳ |
| T006 | Ajustar `README-SCRIPTORIUM.md` de `VectorMachineSDK` y `VectorMachineUI` | 1 | ⏳ |

#### Definition of Done
- [ ] Los índices DRY apuntan a `VectorMachineSDK/` y `VectorMachineUI/`.
- [ ] El plugin `vector-machine` documenta ambas superficies.
- [ ] La documentación del stack distingue core vectorial vs UI auxiliar.

---

### VECTOR-MACHINE-UI-S03 — Operación desde VS Code
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Dejar tasks y setup listos para instalar y lanzar la UI desde el workspace.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T007 | Añadir variables y `setup_submodule` en `scripts/setup-workspace.sh` | 1 | ⏳ |
| T008 | Añadir tasks `VUI` en `.vscode/tasks.json` | 1 | ⏳ |
| T009 | Documentar el flujo en `scripts/README.md` y `docs/leeme.md` | 1 | ⏳ |

#### Definition of Done
- [ ] `setup-workspace.sh` contempla `VectorMachineUI`.
- [ ] Existen tasks para instalar, arrancar y abrir la UI.
- [ ] La guía de uso advierte que es un submódulo para usuarios avanzados.

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 3 |
| Tasks totales | 9 |
| Effort total | 13 pts |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo `VectorMachineUI` | ✅ Instalado | Repo remoto creado por el usuario |
| Plugin `vector-machine` | ✅ Existente | Se reutiliza, no se crea plugin nuevo |
| Chroma HTTP Server | ⚠️ Externo | Normalmente `http://localhost:8000` |
| `VectorMachineSDK/.model-cache` | ⚠️ Compartido | Necesario para la query local notebook-compatible |

---

## Pendiente aprobación

Usuario debe revisar y aprobar el borrador cuando quiera formalizar el siguiente ciclo con `@scrum aprobar`.
