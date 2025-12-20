---
description: Escaneo L1 (protocolo/estilo/estructura) del BOE.
mode: agent
---

# Objetivo
Validar la estructura y protocolo del BOE del día (L1) sin modificarlo.

# Parámetros
- fecha: ${input:fecha:YYYY-MM-DD}

# Pasos
1) Leer `BOE/boe-${input:fecha}.json`.
2) Validar:
   - Raíz: {fecha, sumario[], secciones{}}
   - Sumario: campos requeridos (seccion, epigrafe, identificador, titulo, url)
   - URL local: `secciones/${identificador}`
   - Cuerpos: encabezado{organo, fecha_disposicion} y `texto` Markdown
   - Epígrafes y secciones válidas (I..VI)
3) Generar `DECOHERENCE/cache/${input:fecha}.L1.json` con conteos y violaciones.
4) Actualizar `DECOHERENCE/index.json` (añadir/actualizar run con nivel L1).
5) Imprimir resumen.

# Salida
- `DECOHERENCE/cache/${input:fecha}.L1.json` (ver contrato en plan)
- Resumen por consola con nº de violaciones y estado (ok|warnings|errors)

# Notas
- Sólo lectura del BOE. No muta archivos fuera de DECOHERENCE.