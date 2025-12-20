---
description: Inicializa el turno. Invoca BOE /01-init y publica Autoridad y Convocatoria/Estado como disposiciones BOE; crea rama de turno.
mode: agent
---

# Objetivo
Abrir un turno nuevo y publicar su gobernanza dentro del BOE.

# Parámetros
- fecha: ${input:fecha:YYYY-MM-DD}
- idJuego: ${input:idJuego}
- idPartida: ${input:idPartida}
- epigrafe: ${input:epigrafe:CASA ARRAKIS (Gestión)}
- bdcActive: ${input:bdcActive:ChatExport_2025-10-15}
- branchTemplate: ${input:branchTemplate:${idJuego}/${idPartida}/${idTurno}}
- playerBranchTemplate: ${input:playerBranchTemplate:${base}/players/${nick}}
- tagOpenTemplate: ${input:tagOpenTemplate:${idTurno}-open}
- tagFinalTemplate: ${input:tagFinalTemplate:${idTurno}-final}
- altBranchTemplate: ${input:altBranchTemplate:${base}-alt${n}}
- openUntil: ${input:openUntil:ISO8601}
- rediscussUntil: ${input:rediscussUntil:ISO8601}
- remoto: ${input:remoto:opcional}

# Pasos
1. Invocar BOE `/01-init` para `${input:fecha}` (si ya existe, continuar).
2. Publicar disposición "Autoridad del Juego" con `/03-agregar-actualizacion`:
   - seccion: I. Disposiciones generales
   - epigrafe: `${input:epigrafe}`
   - identificador: `GIT-AUTORIDAD-${input:fecha}`
   - titulo: "Resolución por la que se establece la autoridad del juego y su configuración"
   - texto: JSON con los parámetros `idJuego`, `idPartida`, `naming`, `bdcActive`, `remoto`.
3. Derivar `idTurno = turn-${input:fecha}` y `branchTurno` aplicando `branchTemplate`.
4. Publicar disposición "Convocatoria/Estado del Turno" con `/03-agregar-actualizacion`:
   - identificador: `GIT-TURNO-${idTurno}`
   - titulo: "Convocatoria del turno ${idTurno} y calendario"
   - texto: JSON con `idTurno`, `branchTurno`, `openUntil`, `rediscussUntil`, `status: open`, `bdcActive`.
5. Crear rama de turno `branchTurno` desde la base actual y etiquetar apertura si procede.
6. Mostrar a los jugadores cómo crear su rama personal a partir del patrón.
