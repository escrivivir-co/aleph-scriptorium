---
name: LoreSDK — SDK Editorial
description: "Punto de entrada para para-la-voz: crear o preparar un lore, alimentar corpus y consultar el SDK. Generar textos o publicar catálogo solo aplica cuando existe lore activo."
applyTo: "DocumentMachineSDK/**/*.md"
---

# Prompt: LoreSDK — SDK Editorial para Voces

Bienvenido al **SDK editorial para-la-voz**. Analiza corrientes ideológicas y cristaliza Voces que generan poemas *desde* el corpus, no *sobre* él.

## ¿Qué quieres hacer?

| Opción | Acción | Cuándo |
|--------|--------|--------|
| **A** | Crear nueva Voz | Primera vez con una corriente nueva |
| **B** | Alimentar corpus | Nuevo editorial del corpus existente |
| **C** | Generar poema | Solo si existe un lore activo con `@voz` cristalizada |
| **D** | Ver estado | ¿Cuántos editoriales? ¿Nick confirmado? |
| **E** | Publicar catálogo | Solo si el lore activo ya tiene `docs/_poemas/` |

---

## Opción A: Crear nueva Voz

Necesito:
1. El **nombre del mod** (kebab-case, ej: `ecosocialista`, `reformista`)
2. La **corriente** a analizar (descripción breve)
3. El **primer editorial** completo
4. El **idioma** (defecto: español)

Flujo: `/crear-voz` → `@bartleby` → `@archivero` → `@cristalizador` → `@voz` lista

---

## Opción B: Alimentar corpus

Necesito:
1. El **editorial completo** (pegar aquí o indicar ruta)
2. La **fecha** del editorial (YYYY-MM-DD)
3. El **slug** (ej: `guerra-palestina`, `capitalismo-digital`)

Flujo: `/alimentar-corpus` → `/feed` → `/diff-corpus` → `/merge-corpus`

---

## Opción C: Generar poema

Dime qué tensión usar (opcional):
- Las tensiones activas del corpus (E.01 — E.N) están en `corpus/corpus.md`
- O simplemente di el tema y `@voz` elige la tensión más pertinente

Flujo: `@voz` lee corpus → elige tensión → genera poema (8-20 líneas) → pregunta si publicar

---

## Opción D: Ver estado

```
/status
```

Muestra: nick confirmado, editoriales procesadas, emergencias activas, mecanismos más frecuentes.

---

## Opción E: Publicar catálogo

Listará los poemas en borrador y preguntará cuáles publicar.

Flujo: `/publicar-catalogo` → revisión → `published: true` → commit → instrucciones de push

---

## Contexto actual

El submódulo `DocumentMachineSDK` integrado en el Scriptorium monta hoy el **SDK puro** sobre `integration/beta/scriptorium`:
- no trae un `proyecto.config.md` activo por defecto,
- no trae `mod/agents/voz.agent.md` precargado,
- no trae `docs/_poemas/` listo para publicar.

Si quieres trabajar sobre un lore concreto, primero hay que prepararlo o abrir un checkout derivado del SDK.

Para trabajar con el mod activo, responde con la opción (A/B/C/D/E) o describe directamente lo que quieres hacer.

---

## Bridge

Este prompt delega a `@plugin_ox_loresdk` que orquesta todos los agentes del SDK.

Para acceso directo:
```
@plugin_ox_loresdk [acción]
```
