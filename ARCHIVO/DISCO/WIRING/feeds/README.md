# Feeds Asíncronos

> **Plugin**: WireEditor

---

## Descripción

Esta carpeta contiene archivos JSON para **comunicación asíncrona** entre agentes del Scriptorium y flows de Node-RED.

---

## Protocolo

### Escritura (Node-RED → Agente)

1. Flow genera mensaje
2. Nodo formatea como entry:
   ```json
   {
     "id": "uuid",
     "timestamp": "ISO8601",
     "type": "command",
     "source": "node-red-flow",
     "payload": { ... },
     "processed": false
   }
   ```
3. Append al archivo JSON
4. No modifica entries existentes

### Lectura (Agente → Node-RED)

1. Agente lee archivo JSON
2. Filtra `processed: false`
3. Procesa cada entry
4. Marca como procesada:
   ```json
   {
     "processed": true,
     "processed_by": "agente-nombre",
     "processed_at": "ISO8601"
   }
   ```
5. Escribe archivo actualizado

---

## Schema de Feed

```json
{
  "feed_id": "string",
  "version": "1.0.0",
  "schema": "command | response | event",
  "created_at": "ISO8601",
  "producer": "quien escribe",
  "consumer": "quien lee",
  "entries": [
    {
      "id": "uuid",
      "timestamp": "ISO8601",
      "type": "string",
      "source": "string",
      "payload": {},
      "processed": false,
      "processed_by": null,
      "processed_at": null
    }
  ]
}
```

---

## Tipos de Feed

| Tipo | Dirección | Uso |
|------|-----------|-----|
| `command` | Node-RED → Agente | Comandos de usuario |
| `response` | Agente → Node-RED | Respuestas |
| `event` | Bidireccional | Notificaciones |

---

## Archivos en esta carpeta

Los archivos de feed siguen el patrón `{nombre}-feed.json`:

- `kick-commands.json` — Comandos de chat de Kick
- `agent-responses.json` — Respuestas de agentes
- etc.
