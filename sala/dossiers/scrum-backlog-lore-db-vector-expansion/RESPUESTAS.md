# Respuestas del PO — scrum-backlog-lore-db-vector-expansion

> Cada respuesta incluye efecto operativo concreto sobre este dossier.

---

## Cierre de la sesión de arranque

**Decisión:** pausar aquí la exploración y convertir el trabajo de hoy en dossier scrum listo para refinement.

**Efecto operativo:** se crea este dossier, se inicializa la sala y se marcan como cerradas `SBLVX-SC-00` y `SBLVX-SC-01`.

---

## Contrato de `LORE_F`

**Decisión:** `LORE_F` se maneja como fichero completo trabajado fuera del server, no pieza a pieza.

**Efecto operativo:** el refinement futuro debe usar `create/update(path|content)` + `validate(id)` por referencias, no `add_pieza` incremental.

---

## Simplificación de G10

**Decisión:** server en Scriptorium; datos y skill en `DocumentMachineSDK`; `lore-db/` y `lore-db-vector/` juntas.

**Efecto operativo:** este dossier se centra en la parte Scriptorium y delega el detalle local al dossier espejo del subequipo documental.