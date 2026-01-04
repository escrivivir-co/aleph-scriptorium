---
mode: agent
tools: ['vscode', 'execute', 'web']
description: "Guía asistida para instalar AsyncAPI Studio local."
---

# Setup: AsyncAPI Studio Local

Guía paso a paso para instalar y configurar AsyncAPI Studio para visualizar y editar especificaciones AsyncAPI.

## Opción 1: Online (Sin instalación)

```
https://studio.asyncapi.com/
```

1. Abrir en navegador
2. Pegar contenido de tu spec AsyncAPI
3. Visualizar y editar

## Opción 2: Docker (Local)

```bash
# Levantar Studio
docker run -p 3210:3000 asyncapi/studio

# Abrir en navegador
open http://localhost:3210
```

## Opción 3: AsyncAPI CLI

```bash
# Instalar CLI
npm install -g @asyncapi/cli

# Iniciar Studio con spec local
asyncapi start studio --file specs/proyecto/asyncapi.yaml

# Esto abre automáticamente el navegador
```

## Opción 4: Preview en CLI

```bash
# Preview sin UI
asyncapi diff specs/proyecto/asyncapi.yaml

# Generar HTML estático
asyncapi generate fromTemplate \
  specs/proyecto/asyncapi.yaml \
  @asyncapi/html-template \
  -o docs/asyncapi-html
  
# Abrir
open docs/asyncapi-html/index.html
```

## Opción 5: VS Code Extension

1. Instalar extensión: `asyncapi.asyncapi-preview`
2. Abrir archivo `.yaml`
3. Cmd+Shift+P → "AsyncAPI: Preview"

## Verificación

1. Spec se visualiza correctamente
2. Canales y operaciones visibles
3. Schemas de mensajes expandibles

## Troubleshooting

| Problema | Solución |
|----------|----------|
| "Invalid AsyncAPI document" | Verificar versión (3.0.0) |
| Canales no aparecen | Revisar estructura `channels:` |
| Puerto ocupado | Usar `-p 3211:3000` |

---

**Agente**: @openasyncapi-editor asyncapi-studio
