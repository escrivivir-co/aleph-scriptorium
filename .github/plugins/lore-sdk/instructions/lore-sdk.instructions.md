---
name: LoreSDK (instrucciones)
description: "Reglas de integración del SDK editorial para-la-voz con el Scriptorium."
applyTo: "LoreSDK/**/*.md, ARCHIVO/PLUGINS/LORE_SDK/**/*"
---

# Instrucciones: Plugin LoreSDK

## Contexto

El LoreSDK es un **SDK editorial** que analiza corrientes ideológicas y cristaliza Voces generativas. Opera mediante el patrón `main → mod`: el SDK puro vive en `main` y cada corriente analizada tiene su propio `mod/` con corpus, artefactos cristalizados y configuración.

---

## Reglas de Integración

### 1. Flujo unidireccional main → mod

El flujo de herencia es **estrictamente unidireccional**:
- ✅ Los mods hacen `git pull origin main` para heredar mejoras del SDK
- ❌ Los mods nunca hacen PR de vuelta a `main`
- El SDK puro (`.github/agents/`, `.github/prompts/`, `.github/skills/`) pertenece a `main`
- Los datos del corpus (`corpus/`, `guiones/`, `mod/`, `proyecto.config.md`) pertenecen al mod

### 2. corpus.md es la fuente de verdad

- `corpus/corpus.md` es el **mapa acumulativo** del mod — no se edita manualmente
- Solo `@archivero` modifica `corpus.md` via `/merge-corpus`
- Antes de generar poemas, `@voz` lee `corpus/corpus.md`
- El nick se confirma acumulativamente; no se cambia sin evidencia de discrepancia ×3

### 3. mod/ contiene artefactos cristalizados

- Los archivos en `mod/` son propuestos por `@cristalizador` y aprobados por el usuario
- No se editan manualmente sin pasar por `/design`
- Si hay que actualizar `mod/instructions/voz-*.instructions.md`, hacerlo via `/design`

### 4. Subsumption protocol (perfil-lector)

En **outputs públicos** (poemas, catálogo web, comunicaciones editoriales):
- ❌ Nunca mencionar: IA, LLM, prompt, agente, ChatGPT, VS Code, GitHub Copilot, modelo
- ✅ La aplicación se nombra por su nombre editorial o simplemente "la aplicación"
- ✅ El corpus habla; la tecnología es invisible
- Internamente (en el pipeline del Scriptorium) sí se puede mencionar tecnología

### 5. Rama main (excepción documentada)

- El submódulo `LoreSDK` usa la rama `main` (no la convención estándar `integration/beta/scriptorium`)
- Razón: el SDK está diseñado para que `main` sea la rama de protocolo puro
- Los mods se gestionan en ramas separadas dentro del submódulo
- El `setup-workspace.sh` del Scriptorium lo configura correctamente

### 6. Backlog de integración

- El backlog del plugin vive en `ARCHIVO/DISCO/BACKLOG_BORRADORES/LORE-SDK/`
- Stories relacionadas con el SDK se registran con prefijo `SCRIPT-X.Y.Z`
- La integración con `consejo-asesor` está planificada como Story S05

---

## Archivos Gestionados

| Archivo | Propósito | Modificado por |
|---------|-----------|----------------|
| `LoreSDK/corpus/corpus.md` | Mapa acumulativo del corpus | Solo @archivero |
| `LoreSDK/corpus/editoriales/*.md` | Editoriales fuente | Solo lectura (datos) |
| `LoreSDK/corpus/analisis/*.analisis.md` | Informes de @bartleby | Solo @bartleby |
| `LoreSDK/mod/agents/voz.agent.md` | Agente @voz cristalizado | Solo @cristalizador |
| `LoreSDK/mod/instructions/*.instructions.md` | Instrucciones del mod | Solo @cristalizador |
| `LoreSDK/mod/prompts/poema.prompt.md` | Flujo de generación | Solo @cristalizador |
| `LoreSDK/proyecto.config.md` | Configuración del mod activo | Usuario + @cristalizador |
| `LoreSDK/docs/_poemas/*.md` | Catálogo de poemas | @voz (creación) + usuario (publicación) |

---

## Lo que NO hacer

- ❌ Editar `corpus.md` directamente — siempre via `/merge-corpus`
- ❌ Crear agentes en `mod/agents/` manualmente — siempre via `/design`
- ❌ Mencionar tecnología en el cuerpo de un poema
- ❌ Hacer PR de un mod a `main`
- ❌ Crear múltiples nicks en el mismo mod — un mod = una corriente = un nick
- ❌ Generar poemas antes de que haya al menos 1 editorial en el corpus
