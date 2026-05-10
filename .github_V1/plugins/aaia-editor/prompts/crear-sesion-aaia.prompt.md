---
mode: 'agent'
description: 'Crea una nueva sesión AAIA con FIAs y mundo'
---

# Crear Sesión AAIA

## Objetivo

Crear una sesión del Runtime AAIA para operar agentes autónomos (FIAs).

## Pre-requisitos

1. Servidor MCP AAIA corriendo en puerto 3007
2. App ID conocido o usar demo

## Flujo

### Paso 1: Seleccionar App

```
Usuario: ¿Qué app quieres cargar?

Opciones disponibles:
| App ID | Descripción | FIAs |
|--------|-------------|------|
| demo-logica | FIA con razonamiento Prolog | 1 |
| demo-sbr | FIA basada en reglas | 1 |
| demo-situada | FIAs IoT con sensores | 2 |
| demo-hibrida | Combinación de paradigmas | 3 |
```

### Paso 2: Crear Sesión

```typescript
// Invocar tool MCP
const result = await aaia_create_session({
  appId: "${appId}"
});

// Resultado esperado
{
  sessionId: "uuid-v4",
  appId: "${appId}",
  status: "created",
  fias: [...],
  mundo: {...}
}
```

### Paso 3: Verificar FIAs

```typescript
// Listar FIAs cargadas
const fias = await aaia_list_fias({
  sessionId: result.sessionId
});

// Mostrar tabla
| # | Nombre | Paradigma | Estado |
|---|--------|-----------|--------|
| 0 | ... | ... | STOP |
```

### Paso 4: Operación Inicial

**Opción A: Iniciar todas las FIAs**
```typescript
for (const fia of fias) {
  await aaia_start_fia({ sessionId, fiaIndex: fia.index });
}
```

**Opción B: Ejecutar paso único**
```typescript
await aaia_step_fia({ sessionId, fiaIndex: 0 });
```

## Resultado

La sesión está lista para:
- Recibir perceptos (`aaia_send_percepto`)
- Ejecutar ciclos (`aaia_step_fia`)
- Consultar mundo (`aaia_query_mundo`)

## Siguiente

- `@plugin_ox_aaiaeditor` para operar la sesión
- `@plugin_ox_prologeditor` si la FIA usa Prolog
- `@plugin_ox_typedprompting` para validar mensajes
