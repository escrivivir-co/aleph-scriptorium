# Prompt: Planificar Sprint (Modelo Generativo)

> **Plugin**: Scrum v3.0.0  
> **Comando**: `@scrum planificar`  
> **Modelo**: DRY (índice de referencias) + Modelo Generativo

---

## Objetivo

Crear carpeta de borrador en DISCO y añadir **una fila de referencia** al índice oficial.

**v3.0**: Alternativa si viene de sesión de cotrabajo → usar `@scrum generar-desde-sesion`

## Instrucciones para @scrum

### Paso 0: Verificar origen (v3.0)

```
¿Existe una sesión de cotrabajo cerrada como PRODUCTIVA 
que debería generar este borrador?

Si SÍ → Recomendar: @scrum generar-desde-sesion {ruta}
Si NO → Continuar con planificación manual
```

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

## Detección de Sesiones Productivas (v3.0)

### Cuándo recomendar `generar-desde-sesion`

```
Si existe en SESIONES_COTRABAJO/ una sesión:
  - Estado: CERRADA
  - Tipo: PRODUCTIVA
  - Sin borrador generado aún

→ Mostrar:
  "⚠️ Hay una sesión productiva que podría generar este borrador:
   
   Sesión: {nombre}
   Consenso: {resumen}
   
   ¿Usar @scrum generar-desde-sesion en lugar de planificar manual?"
```

---

## Salida esperada

Archivo `ARCHIVO/DISCO/BACKLOG_BORRADORES/{tema}/conversacion-po-sm.md` con:
- Contexto inicial
- Objetivo definido (pending input PO)

## Siguiente paso

`@scrum borrador` para generar el backlog detallado.
