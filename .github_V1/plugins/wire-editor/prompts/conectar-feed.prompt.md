# Prompt: Conectar Feed Asíncrono

> **Plugin**: WireEditor  
> **Agente**: WireEditor

## Objetivo

Configurar comunicación asíncrona entre agentes del Scriptorium y flows de Node-RED usando feeds JSON.

## Input

El usuario proporciona:
- **Nombre del feed** (kebab-case)
- **Tipo de feed**: `command`, `response`, `event`
- **Productor**: quién escribe (flow o agente)
- **Consumidor**: quién lee (agente o flow)
- **Schema de payload** (opcional)

## Arquitectura de Feeds

```
┌─────────────────────────────────────────────────────────────────────┐
│                      DISCO/WIRING/feeds/                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌──────────────┐                       ┌──────────────┐           │
│   │   Node-RED   │                       │   Agente     │           │
│   │    Flow      │                       │ Scriptorium  │           │
│   └──────┬───────┘                       └──────┬───────┘           │
│          │                                       │                   │
│          │ escribe                     lee │                        │
│          ▼                                       ▼                   │
│   ┌─────────────────────────────────────────────────────┐           │
│   │              commands.json                           │           │
│   │  ┌─────────────────────────────────────────────┐    │           │
│   │  │ entry: { id, timestamp, payload, processed } │    │           │
│   │  └─────────────────────────────────────────────┘    │           │
│   └─────────────────────────────────────────────────────┘           │
│          ▲                                       │                   │
│          │ lee                         escribe │                    │
│          │                                       ▼                   │
│   ┌─────────────────────────────────────────────────────┐           │
│   │              responses.json                          │           │
│   └─────────────────────────────────────────────────────┘           │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Proceso

### 1. Crear archivo de feed

```json
{
  "feed_id": "{nombre}",
  "version": "1.0.0",
  "schema": "{tipo}",
  "created_at": "{ISO8601}",
  "producer": "{quien escribe}",
  "consumer": "{quien lee}",
  "entries": []
}
```

Guardar en: `ARCHIVO/DISCO/WIRING/feeds/{nombre}.json`

### 2. Documentar schema de payload

Si el usuario proporciona schema:

```json
{
  "payload_schema": {
    "type": "object",
    "properties": {
      "command": { "type": "string" },
      "args": { "type": "array" },
      "user": { "type": "string" }
    },
    "required": ["command"]
  }
}
```

### 3. Crear subflow de escritura (para Node-RED)

```json
{
  "id": "write-{nombre}",
  "type": "subflow",
  "name": "Write to {nombre} feed",
  "info": "Escribe una entrada al feed {nombre}",
  "in": [{ "x": 50, "y": 30 }],
  "out": [{ "x": 350, "y": 30 }],
  "nodes": [
    {
      "type": "function",
      "func": "// Formatear como entry\nmsg.payload = {\n  id: crypto.randomUUID(),\n  timestamp: new Date().toISOString(),\n  type: '{tipo}',\n  source: 'node-red',\n  payload: msg.payload,\n  processed: false\n};\nreturn msg;"
    },
    {
      "type": "file",
      "filename": "ARCHIVO/DISCO/WIRING/feeds/{nombre}.json",
      "appendNewline": true,
      "operation": "append"
    }
  ]
}
```

### 4. Documentar protocolo de lectura (para agente)

```markdown
## Cómo leer el feed {nombre}

1. Leer archivo: `ARCHIVO/DISCO/WIRING/feeds/{nombre}.json`
2. Parsear JSON
3. Filtrar entries donde `processed: false`
4. Procesar cada entry
5. Marcar como procesada:
   ```json
   {
     "processed": true,
     "processed_by": "{agente}",
     "processed_at": "{ISO8601}"
   }
   ```
6. Escribir archivo actualizado
```

### 5. Actualizar catalog.json

```json
{
  "feeds": [
    {
      "id": "{nombre}",
      "path": "feeds/{nombre}.json",
      "schema": "{tipo}",
      "producer": "{productor}",
      "consumer": "{consumidor}",
      "created_at": "{ISO8601}"
    }
  ]
}
```

## Output

1. Archivo de feed creado
2. Subflow de escritura (si productor es Node-RED)
3. Documentación de lectura (si consumidor es agente)
4. catalog.json actualizado
5. README del feed

## Ejemplo

```
Usuario: Quiero que los comandos de Kick lleguen al Tarotista

WireEditor:

## Configuración del Feed

- **Nombre**: kick-commands
- **Tipo**: command
- **Productor**: Flow "kick-tarotista" (Node-RED)
- **Consumidor**: Agente Tarotista (Scriptorium)

## Archivos Generados

1. `feeds/kick-commands.json` (feed vacío inicial)
2. `templates/subflows/write-kick-commands.json` (subflow)
3. Documentación de lectura para Tarotista

## Schema de Payload

```json
{
  "command": "!tirada",
  "args": ["amor"],
  "user": "username",
  "channel": "channel_id",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

## Próximos Pasos

1. Añadir subflow al proyecto kick-tarotista
2. Configurar Tarotista para leer el feed
3. Probar flujo completo
```

## Tipos de Feed

| Tipo | Dirección típica | Uso |
|------|------------------|-----|
| `command` | Node-RED → Agente | Comandos de usuario, solicitudes |
| `response` | Agente → Node-RED | Respuestas, resultados |
| `event` | Bidireccional | Notificaciones, logs, estado |
