---
mode: agent
description: "Recibe BOEs de otros Scriptoriums desde la red Oasis y los fusiona con el BOE local."
tools: ['read', 'edit', 'execute']
---

# Recibir BOE de Oasis

## Contexto

El usuario quiere recibir actualizaciones de BOE de otros Scriptoriums que participan en la misma obra.

## Prerequisitos

1. Docker corriendo con Oasis
2. Obra conocida (obra_id)
3. Al menos un peer conectado en la red

## Pasos

### 1. Verificar conexión

```bash
curl -s http://localhost:3000/api/status | jq
```

### 2. Leer feed de Oasis

Consultar mensajes de tipo `scriptorium-boe`:

```bash
curl -s "http://localhost:3000/api/feed?type=scriptorium-boe" | jq
```

### 3. Filtrar por obra

De los mensajes recibidos, filtrar los que tengan `obra_id` coincidente.

### 4. Leer BOE local

Cargar el BOE actual de:
- `ARCHIVO/PLUGINS/ARG_BOARD/BOE/{obra_id}/`

### 5. Identificar entradas nuevas

Comparar hashes de entradas recibidas con hashes de entradas locales.

Criterio: entrada es nueva si `hash` no existe en BOE local.

### 6. Validar firmas

Para cada entrada nueva, verificar:
- `origen.autor_pubkey` es una clave válida
- El mensaje no ha sido modificado

### 7. Fusionar con BOE local

Añadir entradas nuevas al BOE local, ordenando por `timestamp`.

```json
{
  "obra_id": "...",
  "entradas": [
    // entradas locales + entradas remotas
    // ordenadas por timestamp
  ]
}
```

### 8. Actualizar sync-state

```json
{
  "ultima_recepcion": "timestamp",
  "entradas_recibidas": ["hash1", "hash2", ...],
  "peers_conocidos": ["@pubkey1", "@pubkey2"]
}
```

### 9. Notificar a @teatro

Si hay entradas nuevas que afectan el estado de la obra, notificar:

```
@teatro Hay {N} nuevas entradas en el BOE de {obra_id}.
```

## Salida esperada

```
✅ Recibidas {N} entradas de BOE desde Oasis
   Obra: {obra_id}
   Peers: {lista de pubkeys}
   Entradas nuevas: {N}
   BOE actualizado: {timestamp}
```

## Resolución de conflictos

Si dos entradas tienen el mismo timestamp:

1. Ordenar por hash (alfabético)
2. Ambas entradas se mantienen (append-only)
3. Registrar conflicto en log

## Errores posibles

| Error | Acción |
|-------|--------|
| "No peers" | Esperar a que se conecten |
| "Invalid signature" | Descartar mensaje |
| "Unknown obra_id" | Crear nuevo BOE local |
