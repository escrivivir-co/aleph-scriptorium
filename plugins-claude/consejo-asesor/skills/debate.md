# Debate Dialectico

Inicia un debate dialectico del consejo asesor sobre un tema o tesis.

## Quick Usage

```
/debate {tema}
```

Activa al @protagonista y uno o mas antagonistas para N turnos de debate dialectico.

## What It Creates

Transcripcion con posiciones afiladas, concesiones honestas y puntos ciegos iluminados, guardada en `ARCHIVO/DISCO/CONSEJO/{proyecto}/sesiones/`.

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

## Required Inputs

1. **Tema o tesis** (required): Lo que se quiere debatir
2. **Proyecto** (required): Proyecto activo con `proyecto.config.md`
3. **Antagonista(s)** (optional): Si no se indica, el protocolo sugiere segun el tema:
   - Datos/progreso/instituciones -> @racionalista
   - Tecnologia/mercados/escala -> @aceleracionista
   - Accion colectiva/sentido -> @pesimista
   - Gobernanza/viabilidad/logistica -> @estructuralista
   - Cuadrantes/niveles/marco integral -> @integralista
4. **Turnos** (optional): Default 3

## Execution Flow

### Step 1: Cargar contexto del proyecto

```
Lee ARCHIVO/DISCO/CONSEJO/{proyecto}/proyecto.config.md
Resuelve {{proyecto.voz.posicion}} para el @protagonista
Resuelve {{proyecto.antagonistas.{id}}} para cada antagonista
```

### Step 2: Debate

```
1. @protagonista expone posicion sobre el tema
2. @antagonista ataca la posicion
3. @protagonista responde
4. Repetir pasos 2-3 durante N turnos
```

### Step 3: Post-auditoria (opcional)

```
Si el usuario lo pide:
- @verdad evalua evidencia del debate
- @sombra evalua modos de fracaso
- @registro evalua adecuacion retorica
```

### Step 4: Guardar sesion

```markdown
## Sesion del Consejo: {id}

**Modo:** DEBATE
**Tema:** {tema}
**Fecha:** {ISO date}
**Agentes activos:** protagonista, {antagonista(s)}

### Turno 1: @protagonista
{posicion}

### Turno 2: @{antagonista}
{ataque}

...

### Veredicto del Consejo
{Solo si hubo post-auditoria}
```

Guardar en: `ARCHIVO/DISCO/CONSEJO/{proyecto}/sesiones/{fecha}_{tema}.md`

## Output Example

```
Sesion DEBATE iniciada

Proyecto: FUNDACION
Tema: La soberania digital como derecho fundamental
Agentes: @protagonista vs @estructuralista
Turnos: 3

Turno 1: @protagonista expone...
Turno 2: @estructuralista responde...
...

Sesion guardada en: ARCHIVO/DISCO/CONSEJO/FUNDACION/sesiones/2026-02-21_soberania-digital.md
```

</details>
