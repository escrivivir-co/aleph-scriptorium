---
name: Plugin Network (Oasis/Scuttlebutt)
description: Instrucciones para sincronización de BOEs entre Scriptoriums mediante red P2P.
applyTo: "ARCHIVO/PLUGINS/NETWORK/**/*.json, .github/plugins/network/**/*.md"
---

# Instrucciones: Plugin Network

> **Fuente de verdad**: `ARCHIVO/PLUGINS/ARG_BOARD/BOE/`  
> **Submódulo**: `alephscript-network-sdk`  
> **Protocolo**: Scuttlebutt (SSB)

---

## Qué es el plugin Network

El plugin Network permite **sincronizar BOEs entre Scriptoriums** mediante la red P2P Oasis. Esto habilita:

- **Teatro distribuido**: Múltiples usuarios colaboran en la misma obra
- **Comunicación asíncrona**: Funciona offline, sincroniza al conectarse
- **Registro inmutable**: Cada entrada está firmada criptográficamente

---

## Conceptos clave

### BOE (Boletín Oficial del Estado)

El BOE es una **cadena hipervinculada** que registra todo lo que ocurre en el teatro. Cada entrada tiene:

| Campo | Descripción |
|-------|-------------|
| `timestamp` | Momento de la acción |
| `tipo` | `accion`, `inscripcion`, `estado` |
| `actor` | Quién ejecuta la acción |
| `contenido` | Descripción de la acción |
| `hash` | Identificador único (SHA256) |

### Feed Oasis

Un feed es una **secuencia de mensajes firmados** en Scuttlebutt. Cada Scriptorium tiene su propio feed.

### Sincronización

El proceso de **intercambiar y fusionar** BOEs entre Scriptoriums:

```
BOE_A + BOE_B → BOE_sincronizado
```

---

## Reglas de sincronización

### 1. Append-only

El BOE es append-only. Nunca se borran entradas, solo se añaden.

### 2. Ordenación por timestamp

Las entradas se ordenan cronológicamente. En caso de empate, se usa el hash como desempate.

### 3. Deduplicación por hash

Si dos entradas tienen el mismo hash, se considera duplicado y se descarta.

### 4. Multi-autor

Cada entrada tiene un campo `origen` con:
- `scriptorium_id`: Identificador del Scriptorium origen
- `autor_pubkey`: Clave pública del autor en Scuttlebutt

---

## Formato de mensaje

### Publicación a Oasis

```json
{
  "type": "scriptorium-boe",
  "version": "1.0.0",
  "obra_id": "hola_mundo",
  "entrada": {
    "timestamp": "2025-12-24T10:00:00Z",
    "tipo": "accion",
    "actor": "alice",
    "contenido": "Iniciar escena 1",
    "hash": "sha256:abc123..."
  },
  "origen": {
    "scriptorium_id": "alice-scriptorium",
    "autor_pubkey": "@abc123.ed25519"
  }
}
```

### Campos obligatorios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `type` | string | Siempre `"scriptorium-boe"` |
| `version` | string | Versión del protocolo |
| `obra_id` | string | ID de la obra en ARG_BOARD |
| `entrada` | object | Datos de la entrada de BOE |
| `origen` | object | Identificación del Scriptorium |

---

## Plataforma de comunicación

El plugin registra la plataforma `oasis` en ARG_BOARD:

```json
{
  "id": "oasis",
  "nombre": "Oasis (Scuttlebutt P2P)",
  "tipo": "p2p",
  "protocolo": "scuttlebutt",
  "modo": "bidireccional",
  "formato": "scriptorium-boe",
  "config": {
    "api_url": "http://localhost:3000",
    "docker_compose": "alephscript-network-sdk/docker-compose.yml"
  }
}
```

---

## Estados de sincronización

| Estado | Descripción |
|--------|-------------|
| `desconectado` | Oasis no disponible |
| `conectado` | Conexión activa con Oasis |
| `sincronizando` | Proceso de sync en curso |
| `sincronizado` | BOE actualizado |
| `conflicto` | Requiere resolución manual |

---

## Cuándo invocar

| Situación | Acción |
|-----------|--------|
| Iniciar obra colaborativa | `@network configurar` + `@network publicar` |
| Unirse a obra existente | `@network recibir` |
| Durante la obra | `@network sincronizar` periódicamente |
| Verificar conexión | `@network status` |

---

## Errores y resolución

| Error | Causa | Solución |
|-------|-------|----------|
| `OASIS_NOT_AVAILABLE` | Docker no corriendo | `docker-compose up -d` |
| `FEED_EMPTY` | Sin peers o nueva identidad | Esperar propagación |
| `MERGE_CONFLICT` | Entradas concurrentes modificando mismo campo | Resolución por timestamp |
| `INVALID_SIGNATURE` | Mensaje corrupto o falsificado | Descartar mensaje |

---

## Integración con el flujo de trabajo

### Con @teatro

```
@teatro → genera BOE → @network sincroniza
@network → recibe BOE → @teatro actualiza obra
```

### Con @arg-board

```
@arg-board → registra plataforma oasis
@arg-board → consulta obras para sync
```

---

## Lo que NO hacer

- **No publicar** BOE de obra que no te pertenece
- **No modificar** entradas ajenas (append-only)
- **No ignorar** conflictos sin resolver
- **No asumir** conexión en tiempo real (es eventual)

---

## Archivos relacionados

| Archivo | Propósito |
|---------|-----------|
| `PLUGINS/NETWORK/sync-state.json` | Estado de sincronización |
| `ARG_BOARD/BOE/` | BOEs locales |
| `alephscript-network-sdk/` | Submódulo con cliente Oasis |
