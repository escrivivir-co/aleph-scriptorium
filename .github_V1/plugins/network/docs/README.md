# Plugin Network (Oasis/Scuttlebutt)

> **Estado**: En desarrollo (SCRIPT-1.11.0)  
> **Versión**: 1.0.0  
> **Submódulo**: `alephscript-network-sdk`

---

## Propósito

El plugin Network habilita la **sincronización de BOEs entre Scriptoriums** mediante la red P2P Oasis (basada en Scuttlebutt).

### Características

- ✅ Comunicación P2P sin servidor central
- ✅ Funciona offline, sincroniza al conectarse
- ✅ Registro inmutable con firmas criptográficas
- ✅ Multi-autor con identificación por clave pública

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    SCRIPTORIUM A (Alice)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  @teatro → BOE → Plugin Network → Oasis Docker → Scuttlebutt │
│                                                     ↓         │
├─────────────────────────────────────────────────────┼─────────┤
│                                                  Network P2P  │
├─────────────────────────────────────────────────────┼─────────┤
│                                                     ↓         │
│  @teatro ← BOE ← Plugin Network ← Oasis Docker ←────         │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    SCRIPTORIUM B (Bob)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Instalación

### 1. Prerequisitos

- Docker instalado
- Submódulo inicializado:
  ```bash
  git submodule update --init alephscript-network-sdk
  ```

### 2. Arrancar Oasis

```bash
cd alephscript-network-sdk
docker-compose up -d
```

### 3. Verificar conexión

```bash
curl http://localhost:3000/api/status
```

### 4. Configurar plugin

```
@network configurar
```

---

## Uso

| Comando | Descripción |
|---------|-------------|
| `@network configurar` | Configurar conexión con Oasis |
| `@network publicar` | Publicar BOE local a la red |
| `@network recibir` | Recibir BOEs de otros Scriptoriums |
| `@network sincronizar` | Sync bidireccional completo |
| `@network status` | Ver estado de conexión |

---

## Formato de mensaje

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

---

## Archivos

| Ruta | Contenido |
|------|-----------|
| `PLUGINS/NETWORK/sync-state.json` | Estado de sincronización |
| `ARG_BOARD/BOE/` | BOEs locales |
| `alephscript-network-sdk/` | Cliente Oasis dockerizado |

---

## Dependencias

| Plugin | Requerido | Uso |
|--------|-----------|-----|
| arg-board | ✅ | Estructura de BOE |
| teatro | ✅ | Generación de BOE |

---

## Desarrollo

Ver backlog de desarrollo en:
- `ARCHIVO/DISCO/BACKLOG_BORRADORES/NETWORK-SDK/01_backlog-borrador.md`

### Épica activa

**SCRIPT-1.11.0**: Integración Network-SDK
- Iteraciones: 4
- Stories: 7
- Tasks: 34
- Effort: 28 pts

---

## Referencias

- [Manifest del plugin](../../.github/plugins/network/manifest.md)
- [Submódulo README](../../alephscript-network-sdk/README-SCRIPTORIUM.md)
- [Scuttlebutt Protocol Guide](https://ssbc.github.io/scuttlebutt-protocol-guide/)
- [Oasis Project](https://github.com/fraction/oasis)
