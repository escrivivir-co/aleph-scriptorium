---
description: Agrega una actualización al B.O.E. (sumario y secciones) replicando la estructura oficial.
mode: agent
---

# Objetivo
Registrar una disposición en el B.O.E. del día, incluyendo su entrada en el sumario y opcionalmente su cuerpo (sección).

# Parámetros
- fecha: ${input:fecha:YYYY-MM-DD}
- seccion: ${input:seccion:I..VI}
- epigrafe: ${input:epigrafe}
- identificador: ${input:identificador:ej. BOE-A-2025-00001}
- titulo: ${input:titulo}
- referencia: ${input:referencia:opcional}
- texto: ${input:texto:opcional}
- organo: ${input:organo:opcional}
- fecha_disposicion: ${input:fecha_disposicion:opcional}
- firma: ${input:firma:opcional}

# Pasos
1. Abrir `BOE/boe-${input:fecha}.json` (si no existe, informar para ejecutar primero /01-init).
2. Comprobar si `identificador` ya está en el sumario. Si existe, actualizar campos; si no, insertar nueva entrada:
   {
     "seccion": "${input:seccion}",
     "epigrafe": "${input:epigrafe}",
     "identificador": "${input:identificador}",
     "titulo": "${input:titulo}",
     "referencia": "${input:referencia}",
     "url": "secciones/${input:identificador}"
   }
3. Si se proporciona `texto` o metadatos de cuerpo, crear/actualizar `secciones[identificador]` con:
   {
     "encabezado": {
       "organo": "${input:organo}",
       "referencia": "${input:referencia}",
       "fecha_disposicion": "${input:fecha_disposicion}",
       "firma": "${input:firma}"
     },
     "texto": "${input:texto}",
     "anexos": []
   }
4. Guardar con identación de 2 espacios y reportar los cambios.

# Notas
- El orden del sumario es el de inserción; respeta el protocolo del BOE.
- Si faltan parámetros críticos (fecha, seccion, epigrafe, identificador, titulo), solicitarlos.
