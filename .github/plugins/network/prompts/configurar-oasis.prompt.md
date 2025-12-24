---
mode: agent
description: "Configura la conexión con el cliente Oasis (Docker) para sincronización de BOEs."
tools: ['read', 'edit', 'execute']
---

# Configurar conexión Oasis

## Contexto

El usuario quiere configurar su Scriptorium para conectarse a la red Oasis y poder sincronizar BOEs con otros Scriptoriums.

## Prerequisitos

- Docker instalado
- Submódulo `alephscript-network-sdk` inicializado

## Pasos

### 1. Verificar Docker

```bash
docker --version
docker-compose --version
```

Si no está instalado, indicar:
```
Por favor instala Docker Desktop desde https://docker.com
```

### 2. Navegar al submódulo

```bash
cd alephscript-network-sdk
```

### 3. Verificar archivos necesarios

```bash
ls -la docker-compose.yml Dockerfile
```

### 4. Arrancar contenedor Oasis

```bash
docker-compose up -d
```

Esperar a que arranque (puede tardar 1-2 minutos la primera vez).

### 5. Verificar status

```bash
curl -s http://localhost:3000/api/status | jq
```

Respuesta esperada:
```json
{
  "status": "running",
  "ssb": {
    "id": "@xxxxx.ed25519",
    "peers": 0
  }
}
```

### 6. Obtener identidad SSB

```bash
curl -s http://localhost:3000/api/whoami | jq
```

Guardar la clave pública (`@xxxxx.ed25519`) para identificación.

### 7. Crear directorio de datos

```bash
mkdir -p ARCHIVO/PLUGINS/NETWORK
```

### 8. Inicializar sync-state

Crear `ARCHIVO/PLUGINS/NETWORK/sync-state.json`:

```json
{
  "scriptorium_id": "{nombre-descriptivo}",
  "autor_pubkey": "@xxxxx.ed25519",
  "configurado": true,
  "fecha_configuracion": "2025-12-24T10:00:00Z",
  "oasis_url": "http://localhost:3000",
  "entradas_publicadas": [],
  "entradas_recibidas": [],
  "peers_conocidos": [],
  "estadisticas": {
    "publicadas_total": 0,
    "recibidas_total": 0,
    "sincronizaciones": 0
  }
}
```

### 9. Registrar plataforma en ARG_BOARD

Añadir a `ARG_BOARD/.arrakis/plataformas.json`:

```json
{
  "id": "oasis",
  "nombre": "Oasis (Scuttlebutt P2P)",
  "tipo": "p2p",
  "activo": true,
  "config": {
    "url": "http://localhost:3000",
    "pubkey": "@xxxxx.ed25519"
  }
}
```

### 10. Verificar conectividad

```bash
# Publicar mensaje de prueba
curl -X POST http://localhost:3000/api/publish \
  -H "Content-Type: application/json" \
  -d '{"type": "scriptorium-ping", "timestamp": "'$(date -Iseconds)'"}'
```

## Salida esperada

```
✅ Oasis configurado correctamente
   ────────────────────────────
   🐳 Docker: corriendo
   🌐 Oasis: http://localhost:3000
   🔑 Pubkey: @abc123.ed25519
   📂 Datos: ARCHIVO/PLUGINS/NETWORK/
   
   Próximos pasos:
   - @network publicar   (publicar BOE)
   - @network recibir    (recibir BOEs)
   - @network status     (ver estado)
```

## Conectar con otro Scriptorium

Para conectar con un peer específico:

```bash
curl -X POST http://localhost:3000/api/invite \
  -H "Content-Type: application/json" \
  -d '{"invite": "invite:192.168.1.x:8008:@peer-pubkey.ed25519~..."}'
```

## Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `docker-compose up -d` | Arrancar Oasis |
| `docker-compose down` | Parar Oasis |
| `docker-compose logs -f` | Ver logs |
| `docker-compose restart` | Reiniciar |

## Errores posibles

| Error | Causa | Solución |
|-------|-------|----------|
| "Port 3000 in use" | Otro servicio | Cambiar puerto en docker-compose.yml |
| "No space left" | Disco lleno | Limpiar Docker: `docker system prune` |
| "Cannot connect" | Firewall | Abrir puerto 8008 |
