---
description: Inicializa el B.O.E. del día creando el JSON base con fecha y estructuras vacías.
mode: agent
---

# Objetivo
Crear el archivo del día en `BOE/boe-${input:fecha:YYYY-MM-DD}.json`.

Si no se pasa `fecha`, usar la fecha actual del sistema en formato YYYY-MM-DD.

# Requisitos del archivo JSON
{
  "fecha": "YYYY-MM-DD",
  "numero": ${input:numero_boletin:opcional},
  "sumario": [],
  "secciones": {},
  "publicado": false
}

# Pasos
- Verificar o crear la carpeta BOE/.
- Comprobar si ya existe el archivo; si existe, informar y no sobrescribir salvo que el usuario lo confirme claramente.
- Escribir el JSON con identación de 2 espacios.
- Informar de la ruta creada.
