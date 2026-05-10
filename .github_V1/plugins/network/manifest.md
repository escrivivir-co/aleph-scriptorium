---
id: network
name: "Network (Oasis/Scuttlebutt)"
version: "1.0.0"
description: "Plugin para sincronización de BOEs entre Scriptoriums mediante la red Oasis (Scuttlebutt P2P). Habilita teatro distribuido y colaboración sin servidor central."
author: "Aleph Scriptorium"
license: "MIT"

scriptorium_version: ">=0.0.1"
dependencies:
  - arg-board
  - teatro

agents:
  - name: "Network"
    file: "agents/network.agent.md"
    description: "Agente de sincronización P2P. Publica, recibe y sincroniza BOEs con la red Oasis."

prompts:
  - name: "publicar-boe"
    file: "prompts/publicar-boe.prompt.md"
    description: "Publicar BOE actual a la red Oasis"
  - name: "recibir-boe"
    file: "prompts/recibir-boe.prompt.md"
    description: "Recibir y fusionar BOE de la red"
  - name: "sincronizar-boe"
    file: "prompts/sincronizar-boe.prompt.md"
    description: "Sincronización bidireccional de BOEs"
  - name: "configurar-oasis"
    file: "prompts/configurar-oasis.prompt.md"
    description: "Configurar conexión con Oasis/Docker"

instructions:
  - name: "network"
    file: "instructions/network.instructions.md"
    description: "Contexto y reglas del plugin Network"

handoffs:
  - label: "Publicar BOE a Oasis"
    agent: "Network"
    prompt: "Serializa y publica el BOE actual a la red Oasis."
  - label: "Recibir BOE de Oasis"
    agent: "Network"
    prompt: "Recibe y fusiona BOEs de otros Scriptoriums desde la red."
  - label: "Sincronizar BOEs"
    agent: "Network"
    prompt: "Ejecuta sincronización bidireccional con la red Oasis."
  - label: "Configurar Oasis"
    agent: "Network"
    prompt: "Configura la conexión con el cliente Oasis (Docker)."
---

# Plugin Network (Oasis/Scuttlebutt)

Plugin para **interoperabilidad entre Scriptoriums** mediante la red P2P Oasis (basada en Scuttlebutt).

---

## Propósito

Permitir que múltiples Scriptoriums colaboren en obras de teatro ARG mediante sincronización de BOEs (Boletín Oficial del Estado).

### Casos de uso

1. **Teatro distribuido**: Alice y Bob en distintos Scriptoriums participan en la misma obra
2. **Colaboración asíncrona**: Los BOEs se sincronizan aunque los usuarios estén offline
3. **Registro inmutable**: Cada entrada de BOE está firmada criptográficamente

---

## Arquitectura

```
Plugin Network
├── Publicador    →  BOE → Feed Oasis
├── Receptor      ←  Feed Oasis → BOE
└── Sincronizador →  Merge bidireccional
```

### Dependencias

- **arg-board**: Proporciona la estructura de BOE y plataformas
- **teatro**: Genera las entradas de BOE de las obras
- **alephscript-network-sdk**: Submódulo con cliente Oasis dockerizado

---

## Plataforma de comunicación

Este plugin añade la plataforma `oasis` a ARG_BOARD:

| Campo | Valor |
|-------|-------|
| `id` | `oasis` |
| `tipo` | `p2p` |
| `protocolo` | `scuttlebutt` |
| `modo` | `bidireccional` |
| `formato` | `scriptorium-boe` |

---

## Formato de mensaje

```json
{
  "type": "scriptorium-boe",
  "version": "1.0.0",
  "obra_id": "string",
  "entrada": {
    "timestamp": "ISO8601",
    "tipo": "accion|inscripcion|estado",
    "actor": "string",
    "contenido": "string",
    "firma": "string"
  },
  "origen": {
    "scriptorium_id": "string",
    "autor_pubkey": "@xxxxx.ed25519"
  }
}
```

---

## Requisitos

| Requisito | Notas |
|-----------|-------|
| Docker | Para ejecutar cliente Oasis |
| Plugin arg-board | Estructura de BOE |
| Plugin teatro | Generación de BOE |

---

## Uso

```
@network publicar     # Publica BOE a Oasis
@network recibir      # Recibe BOEs de la red
@network sincronizar  # Sync bidireccional
@network configurar   # Configura conexión Docker
```

---

## Referencias

- [Submódulo network-sdk](../../alephscript-network-sdk/README-SCRIPTORIUM.md)
- [Backlog borrador](../../ARCHIVO/DISCO/BACKLOG_BORRADORES/NETWORK-SDK/)
- [Scuttlebutt Protocol](https://ssbc.github.io/scuttlebutt-protocol-guide/)
