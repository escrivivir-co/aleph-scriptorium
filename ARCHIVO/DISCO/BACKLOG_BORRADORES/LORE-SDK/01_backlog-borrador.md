# Backlog Borrador: Plugin LoreSDK

**Épica**: SCRIPT-3.1.0 — Integración SDK Editorial para-la-voz  
**Plugin**: `lore-sdk`  
**Submódulo**: `LoreSDK` (para-la-voz-sdk, rama `main`)  
**Estado**: Borrador — pendiente aprobación por @scrum  
**Generado**: 2026-04-16

---

## Resumen

| Story | Título | Puntos | Sprint | Estado |
|-------|--------|--------|--------|--------|
| S01 | Setup e instalación del plugin | 5 | 1 | ✅ Completado |
| S02 | Alimentar corpus mod `restitutiva` | 3 | 1 | ❌ Pendiente |
| S03 | Crear Voz para nueva corriente | 8 | 2 | ❌ Pendiente |
| S04 | Publicación Jekyll automática | 3 | 2 | ❌ Pendiente |
| S05 | Integración consejo-asesor | 5 | 3 | ❌ Pendiente |

**Total**: ~24 puntos / 3 sprints

---

## S01 — Setup e instalación del plugin

**Puntos**: 5 | **Sprint**: 1 | **Estado**: ✅ Completado

**Criterios de aceptación**:
- [x] `git submodule add` exitoso (branch `main`)
- [x] `LoreSDK/README-SCRIPTORIUM.md` creado y commitado
- [x] `.github/plugins/lore-sdk/` completo (manifest, agente, 3 prompts, instrucciones, docs)
- [x] `.github/agents/plugin_ox_loresdk.agent.md` creado
- [x] `.github/prompts/as_lore-sdk.prompt.md` creado
- [x] `setup-workspace.sh` actualizado (+ fix desync UISDKThreejs)
- [x] `registry.json` actualizado
- [x] `aleph.agent.md` + `ox.agent.md` actualizados con bridge handoff
- [x] `ARCHIVO/PLUGINS/LORE_SDK/` inicializado
- [x] `BARTLEBY-MOVIDO.md` creado en onfalo-asesor-sdk/PROYECTOS/

---

## S02 — Alimentar corpus mod `restitutiva`

**Puntos**: 3 | **Sprint**: 1

**Contexto**: El mod `restitutiva` tiene 4 editoriales procesadas pero fue suspendido (BARTLEBY). Reactivar el flujo de alimentación mensual con el prompt nuevo.

**Criterios de aceptación**:
- [ ] `/alimentar-corpus` funciona con un nuevo editorial de PARA LA VOZ
- [ ] @bartleby produce informe de 5 secciones sin errores
- [ ] @archivero ejecuta /diff-corpus y /merge-corpus correctamente
- [ ] corpus.md actualizado con [N+1] editoriales
- [ ] Nick `restitutiva` confirmado o actualizado coherentemente
- [ ] Buen ejercicio para verificar que el mod existente es compatible con el bridge

**Notas técnicas**:
- Verificar que los archivos del mod en `LoreSDK/mod/` están correctamente referenciados
- Si el mod no tiene `corpus/corpus.md`, ejecutar `/status` para diagnóstico

---

## S03 — Crear Voz para nueva corriente

**Puntos**: 8 | **Sprint**: 2

**Contexto**: Flujo completo end-to-end de creación de nueva Voz. Requiere una corriente diferente a `restitutiva` para probar el scaffolding desde cero.

**Criterios de aceptación**:
- [ ] UC1 ejecutable en <30 min (una sesión de Copilot Chat)
- [ ] `/crear-voz` scaffold completo: `proyecto.config.md`, `corpus/`, `mod/`
- [ ] Primer editorial procesado por @bartleby
- [ ] Nick identificado en primer editorial
- [ ] @cristalizador propone artefactos del mod (voz.agent.md + instructions)
- [ ] @voz cristalizada y operativa (puede generar poemas)
- [ ] Al menos 1 poema generado de prueba
- [ ] Subsumption protocol respetado en el poema (cero menciones a IA)

**Notas técnicas**:
- El `proyecto.config.template.md` debe existir en el submódulo antes del ejercicio
- Verificar que `@cristalizador` puede crear archivos en `mod/` via Copilot Chat

---

## S04 — Publicación Jekyll automática

**Puntos**: 3 | **Sprint**: 2

**Contexto**: El catálogo Jekyll está en `LoreSDK/docs/`. El prompt `/publicar-catalogo` gestiona la transición borrador→publicado. Validar el flujo completo.

**Criterios de aceptación**:
- [ ] `/publicar-catalogo` lista borradores disponibles correctamente
- [ ] Cambio `published: false → true` funciona sin errores
- [ ] Commit generado con formato correcto
- [ ] Instrucciones de push son claras para el usuario
- [ ] Opcionalmente: integración via `@plugin_ox_ghpages` para deploy directo
- [ ] Catálogo accesible en `https://escrivivir-co.github.io/para-la-voz-sdk/`

**Dependencias**: S02 o S03 deben tener poemas en `docs/_poemas/`

---

## S05 — Integración consejo-asesor

**Puntos**: 5 | **Sprint**: 3

**Contexto**: El `consejo-asesor` (ONFALO) tiene 14 voces intelectuales que podrían participar en el análisis de editoriales. Handoff cruzado `@plugin_ox_loresdk ↔ @plugin_ox_consejoasesor`.

**Criterios de aceptación**:
- [ ] Diseño del handoff aprobado (sin loops de contexto)
- [ ] `@bartleby` puede invocar perspectiva de un consejero específico
- [ ] El consejero puede "leer" un editorial y aportar al informe de @bartleby
- [ ] El flujo no produce context bloat (aplicar anti-patrones BP-01..BP-06)
- [ ] Documentado en `LoreSDK/docs/consejo-asesor-integration.md`

**Riesgos**:
- Loops de contexto si consejo-asesor a su vez llama al corpus
- Context bloat si se carga todo el corpus + el consejo entero
- Mitigación: índices ligeros + carga bajo demanda (protocolo personaje-context)

---

## Notas para @scrum

Este backlog sale de la sesión de implementación del plugin. S01 ya está completo. Los puntos son estimaciones iniciales — revisar en sprint planning con el equipo.

Las stories S02-S04 son urgentes (sprint 1-2) para validar el flujo end-to-end.
S05 es deseable pero no urgente.
