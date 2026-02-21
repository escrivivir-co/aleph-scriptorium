---
mode: 'agent'
description: 'Inicia un debate dialectico del consejo asesor'
---

# Debate Dialectico

Inicia un debate del consejo asesor sobre un tema o tesis.

## Entrada

- **Tema o tesis**: Lo que se quiere debatir
- **Antagonista(s)** (opcional): racionalista, aceleracionista, pesimista, estructuralista, integralista

## Proceso

1. Leer `ARCHIVO/DISCO/CONSEJO/{proyecto}/proyecto.config.md` para cargar la voz y los antagonistas.
2. Leer `.github/plugins/consejo-asesor/data/agentes.md` para conocer los roles.
3. Si no se indica antagonista, sugerir segun el tema:
   - Datos/progreso/instituciones -> racionalista
   - Tecnologia/mercados/escala -> aceleracionista
   - Accion colectiva/sentido/resistencia -> pesimista
   - Gobernanza/viabilidad/logistica -> estructuralista
   - Cuadrantes/niveles/marco integral -> integralista
4. Ejecutar debate: protagonista expone -> antagonista ataca -> protagonista responde -> N turnos (default 3).
5. Opcional: post-auditoria por verdad + sombra + registro.
6. Guardar sesion en `ARCHIVO/DISCO/CONSEJO/{proyecto}/sesiones/{fecha}_{tema}.md`.

## Formato de salida

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

### Turno 3: @protagonista
{respuesta}

...
```
