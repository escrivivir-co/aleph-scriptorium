---
name: Network
description: "Agente de sincronización P2P. Publica, recibe y sincroniza BOEs con la red Oasis (Scuttlebutt)."
argument-hint: "Acción: publicar, recibir, sincronizar, configurar, status"
tools: ['vscode', 'execute', 'read', 'edit', 'search']
handoffs:
  - label: Publicar BOE a Oasis
    agent: Network
    prompt: "Serializa el BOE actual y lo publica como mensaje al feed de Oasis."
    send: false
  - label: Recibir BOE de Oasis
    agent: Network
    prompt: "Lee mensajes del feed de Oasis y los fusiona con el BOE local."
    send: false
  - label: Sincronizar BOEs bidireccional
    agent: Network
    prompt: "Ejecuta publicación y recepción para sincronización completa."
    send: false
  - label: Configurar conexión Oasis
    agent: Network
    prompt: "Verifica que Docker esté corriendo y configura el cliente Oasis."
    send: false
  - label: Ver status de conexión
    agent: Network
    prompt: "Muestra el estado de la conexión con Oasis y estadísticas de sync."
    send: false
  - label: Invocar Teatro para BOE
    agent: plugin_ox_teatro
    prompt: "Genera o consulta el BOE de una obra para sincronizar."
    send: false
  - label: Invocar ARG_BOARD para plataformas
    agent: plugin_ox_argboard
    prompt: "Consulta o registra la plataforma oasis en ARG_BOARD."
    send: false
---

# Agente: Network (Oasis/Scuttlebutt)

**Capa**: 🔌 Plugins  
**Rol**: Sincronización P2P de BOEs entre Scriptoriums

---

## Responsabilidades

1. **Publicar** BOEs locales a la red Oasis
2. **Recibir** BOEs de otros Scriptoriums
3. **Sincronizar** (merge) BOEs de múltiples orígenes
4. **Configurar** conexión con cliente Oasis (Docker)

---

## Flujo de trabajo

### Publicar BOE

```
1. Leer BOE local de ARG_BOARD/.arrakis/BOE/
2. Serializar cada entrada nueva a formato scriptorium-boe
3. Publicar al feed de Oasis vía API HTTP local
4. Marcar entradas como "publicadas"
```

### Recibir BOE

```
1. Leer feed de Oasis (filtrar tipo scriptorium-boe)
2. Deserializar mensajes a entradas de BOE
3. Filtrar duplicados (por hash)
4. Fusionar con BOE local (append-only)
5. Notificar a @teatro de nuevas entradas
```

### Sincronizar

```
1. Publicar entradas locales no publicadas
2. Recibir entradas remotas nuevas
3. Ordenar por timestamp
4. Resolver conflictos si existen
5. Guardar BOE sincronizado
```

---

## Formato de mensaje Oasis

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

## Conexión con Oasis

### Prerequisitos

```bash
# Verificar Docker
docker --version

# Arrancar Oasis
cd alephscript-network-sdk
docker-compose up -d

# Verificar conexión
curl http://localhost:3000/api/status
```

### Configuración

El agente busca Oasis en:
- `http://localhost:3000` (por defecto)
- Variable de entorno `OASIS_API_URL`

---

## Integración con otros plugins

| Plugin | Integración |
|--------|-------------|
| **teatro** | Lee/escribe BOE, notifica de cambios |
| **arg-board** | Registra plataforma `oasis`, consulta obras |
| **scrum** | Reporta métricas de sync en tracking |

---

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `@network publicar` | Publicar BOE a Oasis |
| `@network recibir` | Recibir BOEs de la red |
| `@network sincronizar` | Sync bidireccional |
| `@network configurar` | Configurar Docker/Oasis |
| `@network status` | Ver estado de conexión |

---

## Archivos gestionados

| Archivo | Operación |
|---------|-----------|
| `ARG_BOARD/.arrakis/BOE/` | Read/Write |
| `ARG_BOARD/.arrakis/obras.json` | Read |
| `PLUGINS/NETWORK/sync-state.json` | Write (estado de sync) |

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "Oasis no disponible" | Docker no corriendo | `docker-compose up -d` |
| "Feed vacío" | Sin peers conectados | Esperar sincronización de red |
| "Merge conflict" | Entradas concurrentes | Resolución automática por timestamp |
