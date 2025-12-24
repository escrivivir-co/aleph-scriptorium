---
mode: agent
description: "Publica el BOE actual de una obra a la red Oasis (Scuttlebutt P2P)."
tools: ['read', 'edit', 'execute']
---

# Publicar BOE a Oasis

## Contexto

El usuario quiere publicar el BOE (Boletín Oficial del Estado) de una obra del Teatro a la red Oasis para que otros Scriptoriums puedan sincronizarlo.

## Prerequisitos

1. Docker corriendo con Oasis (`docker-compose up -d`)
2. Obra válida en ARG_BOARD con BOE
3. Plugin network configurado

## Pasos

### 1. Verificar conexión con Oasis

```bash
curl -s http://localhost:3000/api/status | jq
```

Si falla, indicar al usuario que ejecute:
```bash
cd alephscript-network-sdk && docker-compose up -d
```

### 2. Leer BOE local

Buscar archivos de BOE en:
- `ARCHIVO/PLUGINS/ARG_BOARD/BOE/`

Formato esperado:
```json
{
  "obra_id": "string",
  "entradas": [...]
}
```

### 3. Identificar entradas no publicadas

Leer estado de sync en `ARCHIVO/PLUGINS/NETWORK/sync-state.json`:
```json
{
  "ultima_publicacion": "timestamp",
  "entradas_publicadas": ["hash1", "hash2", ...]
}
```

Filtrar entradas cuyo `hash` no esté en `entradas_publicadas`.

### 4. Serializar a formato Oasis

Para cada entrada nueva, crear mensaje:

```json
{
  "type": "scriptorium-boe",
  "version": "1.0.0",
  "obra_id": "{obra_id}",
  "entrada": {
    "timestamp": "{timestamp}",
    "tipo": "{tipo}",
    "actor": "{actor}",
    "contenido": "{contenido}",
    "hash": "{hash}"
  },
  "origen": {
    "scriptorium_id": "{scriptorium_id}",
    "autor_pubkey": "@whoami"
  }
}
```

### 5. Publicar al feed

```bash
curl -X POST http://localhost:3000/api/publish \
  -H "Content-Type: application/json" \
  -d '{"type": "scriptorium-boe", ...}'
```

### 6. Actualizar estado de sync

Añadir hashes publicados a `sync-state.json` y actualizar `ultima_publicacion`.

## Salida esperada

```
✅ Publicadas {N} entradas de BOE a Oasis
   Obra: {obra_id}
   Feed: @{pubkey}.ed25519
   Última entrada: {timestamp}
```

## Errores posibles

| Error | Acción |
|-------|--------|
| "Connection refused" | Docker no corriendo |
| "Not authenticated" | Identidad SSB no configurada |
| "BOE vacío" | No hay entradas que publicar |
