# Prompt: Planificar Sprint (DRY)

> **Plugin**: Scrum v2.0  
> **Comando**: `@scrum planificar`  
> **Modelo**: DRY (índice de referencias)

---

## Objetivo

Crear carpeta de borrador en DISCO y añadir **una fila de referencia** al índice oficial.

## Instrucciones para @scrum

### Paso 1: Identificar siguiente épica

```
1. Leer .github/BACKLOG-SCRIPTORIUM.md (índice)
2. Leer BACKLOG_BORRADORES/INDEX.md (estado actual)
3. Determinar ID de siguiente épica (SCRIPT-X.Y.0)
```

### Paso 2: Crear carpeta en BACKLOG_BORRADORES

```
ARCHIVO/DISCO/BACKLOG_BORRADORES/{tema}/
```

Convención de nombres:
- Usa tema descriptivo: `CLI_SCRIPTORIUM`, `CONTEXT_BLOAT`, `MMCO_EDITOR`
- NO uses fechas en el nombre de carpeta

### Paso 3: Crear conversación PO-SM

Generar `conversacion-po-sm.md` en la carpeta:

```markdown
# Planificación: {Tema}

> **Épica propuesta**: SCRIPT-X.Y.0
> **Fecha**: {YYYY-MM-DD}

---

## Apertura

**SM**: [Contexto del trabajo anterior]
¿Cuál es la dirección para esta épica?

**PO**: [Esperar input del usuario]
```

### Paso 4: Añadir referencia al índice

**⚠️ SOLO AÑADIR UNA FILA**, no copiar contenido:

```markdown
| 📋 | SCRIPT-X.Y.0 | {Nombre corto} | [borrador](../ARCHIVO/DISCO/BACKLOG_BORRADORES/{tema}/) |
```

### Paso 5: Confirmar

```
✅ Épica planificada

- Carpeta: BACKLOG_BORRADORES/{tema}/
- Referencia añadida al índice
- Estado: 📋 (planificando)

Siguiente: @scrum borrador para detallar épica
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
