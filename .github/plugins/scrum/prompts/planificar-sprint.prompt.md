# Prompt: Planificar Sprint

> **Plugin**: Scrum  
> **Comando**: `@scrum planificar`  
> **Fase**: 1 (Planificar)

---

## Contexto

Este prompt inicia una conversación simulada entre Product Owner (PO) y Scrum Master (SM) para planificar el próximo sprint.

## Instrucciones para @scrum

### Paso 1: Identificar sprint actual

```
1. Leer BACKLOG-SCRIPTORIUM.md y BACKLOG-FUNDACION.md
2. Identificar el sprint activo más reciente
3. Calcular número del siguiente sprint
```

### Paso 2: Crear carpeta en DISCO

```
ARCHIVO/DISCO/{Mes}_{Año}_release/
```

Ejemplo: `ARCHIVO/DISCO/Enero_26_release/`

### Paso 3: Iniciar conversación

Generar `01_planificacion-sprintN.md` con estructura:

```markdown
# Planificación Sprint N: Conversación PO-SM

> **Fecha**: {fecha actual}
> **Participantes**: Product Owner (PO), Scrum Master (SM)
> **Contexto**: Cierre de Sprint N-1 ({métricas})

---

## Apertura

**SM**: Sprint N-1 cerrado. {Resumen de métricas}.
{Entregables principales}.
¿Cuál es la dirección para el Sprint N?

**PO**: [Esperar input del usuario]
```

### Paso 4: Facilitar diálogo

Guiar al usuario a través de:

1. **Objetivo del sprint** (qué queremos lograr)
2. **Épicas candidatas** (qué trabajos grandes)
3. **Modelo de trabajo** (100% una cosa, híbrido, etc.)
4. **Riesgos** (qué puede salir mal)
5. **Métricas de éxito** (cómo sabemos que funcionó)

### Paso 5: Cerrar conversación

```markdown
## Cierre

**PO**: Aprobado.

**SM**: Resumen ejecutivo:

> **Sprint N: {Nombre}**
> 
> - **Objetivo**: {descripción}
> - **Modelo**: {descripción}
> - **Épicas**: {lista}
> - **Effort estimado**: {N} pts
> - **Riesgos principales**: {lista}

Generando backlog borrador...
```

---

## Plantilla de preguntas SM

| Tema | Pregunta |
|------|----------|
| Objetivo | "¿Cuál es el objetivo principal de este sprint?" |
| Épicas | "¿Qué trabajos grandes quieres abordar?" |
| Prioridad | "¿Cuál es la prioridad relativa entre épicas?" |
| Modelo | "¿Dedicamos todo a una cosa o dividimos esfuerzo?" |
| Riesgos | "¿Qué podría bloquear o retrasar el trabajo?" |
| Éxito | "¿Cómo sabremos que el sprint fue exitoso?" |
| Dependencias | "¿Hay algo que necesitemos antes de empezar?" |

---

## Salida esperada

Archivo `ARCHIVO/DISCO/{Mes}_{Año}_release/01_planificacion-sprintN.md` con:
- Conversación completa PO-SM
- Objetivo definido
- Épicas identificadas
- Riesgos documentados
- Métricas de éxito

## Siguiente paso

`@scrum borrador` para generar el backlog detallado.
