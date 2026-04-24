# Spike fuente mod-legislativa

**Ruta evaluada:** `DocumentMachineSDK/mod-legislativa/lore-db/` (y equivalentes dentro de `DocumentMachineSDK/`)

## Hallazgos

- **NO EXISTE LA CARPETA.** He explorado `DocumentMachineSDK/` y no existe ni `mod-legislativa` ni `lore-db`. 
- Tampoco existe en el resto del workspace un directorio llamado `lore-db`.
- Existe un borrador llamado `DocumentMachineSDK/draft-temporal-mod-restitutiva.md`, pero no hay estructura de proyecto legislativo ni base de datos de lore.

## Riesgos / observaciones
- Al no existir la fuente de datos, no es posible proceder con la indexación en VMI-10 a menos que se clone, genere o se asigne la ruta correcta de la base de datos legislativa. La demo 1 estará bloqueada si no traemos los datos primero.