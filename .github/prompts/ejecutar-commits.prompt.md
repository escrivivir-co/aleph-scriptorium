# Prompt — Ejecutar commits pendientes (agente con consola)

## Rol
Eres un agente con permisos de consola/terminal en el repo:
`/Users/morente/Desktop/columna/Fundacion`

Tu tarea es **confirmar el estado git** y **crear 2 commits** (Scriptorium y Fundación) con mensajes coherentes.

## Restricciones
- No reescribas ni “limpies” cambios ajenos.
- No mezcles cambios de `.github/` con cambios de `ARCHIVO/` / `PROYECTOS/` en el mismo commit.
- No hagas `git push` salvo que el usuario lo pida explícitamente.
- Si aparecen archivos no mencionados aquí, **para** y pide confirmación (o deja esos cambios sin commitear).

---

## 0) Verificación inicial
1) Ir al repo y ver estado:
```bash
cd /Users/morente/Desktop/columna/Fundacion
git status
```
2) Ver diff para entender qué se va a commitear:
```bash
git diff
```

Si hay cambios ya staged, inspecciona:
```bash
git diff --staged
```

---

## 1) Commit 1 — Scriptorium (infra/protocolo en .github)
### Archivos esperados
Staging **solo** de estos archivos (si existen y están modificados):
- `.github/DEVOPS.md`
- `.github/BACKLOG-SCRIPTORIUM.md`
- `.github/prompts/commit-message.prompt.md`
- `.github/prompts/extraer-archivar.prompt.md`
- `.github/agents/aleph.agent.md`

### Comandos
```bash
git add \
  .github/DEVOPS.md \
  .github/BACKLOG-SCRIPTORIUM.md \
  .github/prompts/commit-message.prompt.md \
  .github/prompts/extraer-archivar.prompt.md \
  .github/agents/aleph.agent.md

git status
```

Antes de commitear, confirma contenido staged:
```bash
git diff --staged
```

### Mensaje del commit (usar literal)
```bash
git commit -m "feat(script/devops): establecer protocolo DevOps y actualizar agente Aleph

- Crear DEVOPS.md con metodología Agile/Scrum adaptada
- Crear BACKLOG-SCRIPTORIUM.md para Sprint 0
- Crear commit-message.prompt.md para generación de commits
- Actualizar aleph.agent.md con sección DevOps y trazabilidad
- Añadir nota de extracción PDF a extraer-archivar.prompt.md

refs #SCRIPT-0.0.1-T001, #SCRIPT-0.0.1-T004, #SCRIPT-0.0.1-T007"
```

---

## 2) Commit 2 — Fundación (ARCHIVO/ + PROYECTOS/FUNDACION)
### Archivos esperados
Staging **solo** de estos archivos (si existen y están modificados):
- `ARCHIVO/marco/08-trabajo-campo-batalla.md`
- `ARCHIVO/marco/09-teologia-politica-imperial.md`
- `ARCHIVO/marco/10-euroamerica-deuda.md`
- `ARCHIVO/marco/11-tecnofeudalismo-critica-puentes.md`
- `ARCHIVO/marco/README.md`
- `ARCHIVO/diagnostico/05-carisma-vs-responsabilidad.md`
- `ARCHIVO/diagnostico/README.md`
- `PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md`

### Comandos
```bash
git add \
  ARCHIVO/marco/08-trabajo-campo-batalla.md \
  ARCHIVO/marco/09-teologia-politica-imperial.md \
  ARCHIVO/marco/10-euroamerica-deuda.md \
  ARCHIVO/marco/11-tecnofeudalismo-critica-puentes.md \
  ARCHIVO/marco/README.md \
  ARCHIVO/diagnostico/05-carisma-vs-responsabilidad.md \
  ARCHIVO/diagnostico/README.md \
  PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md

git status
```

Confirma staged:
```bash
git diff --staged
```

### Mensaje del commit (usar literal)
```bash
git commit -m "archive(fund/archivo): consolidar marco 08-11 y diagnostico 05

- Extender 08-trabajo-campo-batalla.md con siniestralidad (Palacios)
- Crear 09-teologia-politica-imperial.md (Taubes/Benjamin)
- Crear 10-euroamerica-deuda.md (deuda como hegemonía)
- Crear 11-tecnofeudalismo-critica-puentes.md (dos capas: agitprop + académica)
- Crear 05-carisma-vs-responsabilidad.md (Weber/Kolnai)
- Crear BACKLOG-FUNDACION.md para Sprint 0
- Actualizar READMEs de marco y diagnostico

refs #FUND-0.0.1-T001, #FUND-0.0.1-T002, #FUND-0.0.1-T003, #FUND-0.0.1-T004, #FUND-0.0.1-T005, #FUND-0.0.1-T006, #FUND-0.0.1-T007"
```

---

## 3) Verificación final
```bash
git status
git log -2 --oneline
```

## 4) Si algo sale distinto
- Si `git status` muestra **archivos extra** no listados, no los incluyas: deja esos cambios sin stage y reporta al usuario.
- Si algún archivo de la lista no existe, no falles: quítalo del `git add` y continúa.
- Si hay conflictos o el repo está en estado raro (merge/rebase), **detente** y reporta el estado (`git status`, `git branch`, `git log -5 --oneline`).
