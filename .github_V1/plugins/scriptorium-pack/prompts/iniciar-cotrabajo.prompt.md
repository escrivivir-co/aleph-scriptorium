---
name: Iniciar Sesión de Cotrabajo
description: Crea una nueva sesión de trabajo colaborativo multi-agente.
mode: agent
---

# Iniciar Sesión de Cotrabajo

## Objetivo

Crear una carpeta de sesión estructurada para trabajo colaborativo asíncrono entre múltiples agentes.

## Inputs Requeridos

Antes de ejecutar, necesito:

1. **Tema** (obligatorio): Nombre descriptivo de la sesión
2. **Participantes** (obligatorio): Lista de agentes (@agente1, @agente2, ...)
3. **Objetivo** (obligatorio): Qué se espera producir
4. **Referencia de backlog** (opcional): Épica o tarea relacionada
5. **Restricciones** (opcional): Límites o reglas especiales

## Flujo de Ejecución

### Paso 1: Validar Inputs

```
- [ ] Tema tiene formato kebab-case
- [ ] Al menos 2 participantes
- [ ] Objetivo es claro y accionable
```

### Paso 2: Crear Estructura de Carpeta

Ubicación: `ARCHIVO/DISCO/SESIONES_COTRABAJO/{fecha}_{tema}/`

```
{carpeta}/
├── 00_SESION.md
├── 01_TABLERO.md
├── 02_ACTAS/
│   └── .gitkeep
├── 03_REFERENCIAS/
│   └── backlog.md (si aplica)
└── 04_PROTOCOLO.md
```

### Paso 3: Generar 00_SESION.md

```markdown
# Sesión: {Tema}

## Metadatos

| Campo | Valor |
|-------|-------|
| **Fecha inicio** | {YYYY-MM-DD HH:MM} |
| **Estado** | 🟢 ACTIVA |
| **Épica relacionada** | {EPIC-ID o N/A} |
| **Carpeta** | {ruta completa} |

## Participantes

| Agente | Rol | Estado actual |
|--------|-----|---------------|
{para cada participante: | @agente | {rol} | ⚪ IDLE |}

## Objetivo

{objetivo}

## Restricciones

{restricciones o "Sin restricciones especiales"}

## Referencias de Backlog

{links a borradores o "N/A"}
```

### Paso 4: Generar 01_TABLERO.md

```markdown
# Tablero de Turnos

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido está en 02_ACTAS/.

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 1 | {primer participante} | ⏳ WAITING | — |

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| — | — | — | — | Sesión recién iniciada | — |

## Cola de Espera

| Posición | Agente | Prioridad |
|----------|--------|-----------|
{para cada participante desde el 2do: | {N} | @agente | Normal |}
```

### Paso 5: Copiar Protocolo

Copiar `cotrabajo.instructions.md` a `04_PROTOCOLO.md` para referencia local.

### Paso 6: Extraer Referencias (si aplica)

Si hay referencia de backlog:
1. Leer el borrador indicado
2. Extraer secciones relevantes a `03_REFERENCIAS/backlog.md`
3. Añadir links en `03_REFERENCIAS/fuentes.md`

## Output

Al finalizar, mostrar:

```
✅ Sesión de cotrabajo creada

📂 Carpeta: ARCHIVO/DISCO/SESIONES_COTRABAJO/{nombre}/
👥 Participantes: {lista}
🎯 Objetivo: {objetivo}
📋 Épica: {epic-id o N/A}

🚀 Para iniciar:
   @{primer-participante} tiene el primer turno.
   Estado actual: ⏳ WAITING

📖 Protocolo: Lee 04_PROTOCOLO.md antes de comenzar.
```

## Ejemplo de Uso

```
Usuario: @scriptorium-pack cotrabajo iniciar

ScriptoriumPack: Necesito los siguientes datos:

1. **Tema**: 
2. **Participantes**: 
3. **Objetivo**: 
4. **Backlog** (opcional): 
5. **Restricciones** (opcional): 

Usuario: 
1. diseño-api-prolog
2. @ox, @indice, @scrum
3. Producir especificación OpenAPI para el MCP Prolog
4. PROLOG-API-1.0.0
5. Máximo 5 turnos

ScriptoriumPack: 
✅ Sesión de cotrabajo creada

📂 Carpeta: ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-03_diseño-api-prolog/
👥 Participantes: @ox, @indice, @scrum
🎯 Objetivo: Producir especificación OpenAPI para el MCP Prolog
📋 Épica: PROLOG-API-1.0.0
⚠️ Restricciones: Máximo 5 turnos

🚀 Para iniciar:
   @ox tiene el primer turno.
   Estado actual: ⏳ WAITING
```

## Integración con Scrum

Esta sesión puede:
- Vincularse a una épica existente en backlog
- Generar una nueva entrada en BACKLOG_BORRADORES/ al cerrar
- Producir actas que sirvan como input para retrospectivas
