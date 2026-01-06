# Conversación PO-SM: MESH_CHANNELS_SDK

**Fecha**: 2026-01-06  
**Ubicación**: `MCPGallery/mcp-mesh-sdk/mcp-channels-sdk` (submódulo anidado nivel 3)  
**Épica objetivo**: MESH-CHANNELS-1.0.0

---

## Análisis Técnico (SM - Scrum Master)

### Contexto Especial: Submódulo Anidado

⚠️ **Atención PO**: Este NO es un submódulo normal. Es un **submódulo dentro de otro submódulo**:

```
aleph-scriptorium/                    ← Repositorio principal
└── MCPGallery/                       ← Submódulo #1 (mcp-gallery)
    └── mcp-mesh-sdk/                 ← Carpeta dentro de MCPGallery
        └── mcp-channels-sdk/         ← Submódulo #2 ANIDADO (el que analizamos)
            ├── ws-server/            ← Monorepo Socket.IO Server
            └── socket.io-admin-ui/   ← Admin UI (fork de @socket.io/admin-ui)
```

**Implicación**: No necesitamos instalar nuevo submódulo con `git submodule add`. El submódulo **ya existe** dentro de la estructura de MCPGallery. Solo necesitamos:
1. Documentar su existencia
2. Crear tasks para operarlo
3. Integrar con el ecosistema MCP

### Inventario del Submódulo

| Componente | Directorio | Tecnología | Puerto | Propósito |
|------------|------------|------------|--------|-----------|
| **ws-server** | `mcp-channels-sdk/ws-server/` | TypeScript + Socket.IO | 3000 | Servidor WebSocket con namespaces |
| **socket.io-admin-ui** | `mcp-channels-sdk/socket.io-admin-ui-develop/` | Vue + TypeScript | 3100 | UI de administración |

### Detalle: ws-server (Socket Gym Monorepo)

**Estructura de paquetes**:

| Paquete | Descripción | Exports |
|---------|-------------|---------|
| `@alephscript/core` | Librería base | AlephScriptServer, AlephScriptClient, SocketServer, SocketClient |
| `aleph-script-core-browser` | Cliente para browser | Bundle ESM/CJS |
| `aleph-script-angular` | Binding Angular | Módulo/Servicio |
| `socket-gym-demo` | Aplicación demo | Server + Client demo |

**Comandos npm disponibles**:
```bash
npm run build:core          # Compilar librería core
npm run build:core-browser  # Compilar cliente browser
npm run build:angular       # Compilar binding Angular
npm run dev                 # Modo desarrollo (demo)
npm run build               # Build completo monorepo
```

### Detalle: socket.io-admin-ui

**Fuente**: Fork de `@socket.io/admin-ui` (v0.5.1)

**Características**:
- Dashboard visual para monitorear conexiones Socket.IO
- Ver sockets conectados, rooms, eventos en tiempo real
- Compatible con Socket.IO v3+ y v4
- Autenticación básica opcional (bcrypt)

**Comando de arranque**:
```bash
npm run start  # Ejecuta sh run.sh → inicia UI en puerto 3100
```

### Gaps Identificados

| ID | Gap | Descripción | Prioridad | Sprint |
|----|-----|-------------|-----------|--------|
| G1 | Sin tasks.json | No hay tasks VS Code para arrancar servicios | Must | 1 |
| G2 | README-SCRIPTORIUM vacío | El archivo existe pero está vacío | Should | 1 |
| G3 | Puertos no documentados | 3000 y 3100 no están en el catálogo | Should | 1 |
| G4 | Integración MCP | No hay bridge con MCPGaia/Zeus | Could | 2 |
| G5 | Scripts Windows | `run.sh` solo funciona en Unix | Could | 2 |

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Conflicto de puertos (3000) | Media | Alto | Documentar y hacer configurable |
| npm workspaces en Windows | Media | Medio | Probar build:core antes de dev |
| Socket.IO versiones | Baja | Alto | Fijar versiones en package.json |

---

## Visión de Producto (PO - Product Owner)

### Casos de Uso Objetivo

**UC1**: Como desarrollador, quiero **arrancar el servidor Socket.IO desde VS Code** para probar comunicación en tiempo real sin usar terminal externa.

**UC2**: Como operador, quiero **ver el Admin UI de Socket.IO** para monitorear conexiones, rooms y eventos de los clientes MCP.

**UC3**: Como arquitecto, quiero que el **servidor Socket.IO se integre con la mesh MCP** para que Zeus pueda orquestar canales de comunicación.

### Criterios de Éxito

- [ ] 3 tasks nuevas en tasks.json (Build, Server, Admin UI)
- [ ] Puertos 3000 y 3100 documentados en catálogo de puertos
- [ ] README-SCRIPTORIUM actualizado con arquitectura
- [ ] Verificación E2E: arrancar → conectar → ver en Admin UI

### Priorización MoSCoW

| Prioridad | Items |
|-----------|-------|
| **Must** | Tasks en VS Code, documentación básica |
| **Should** | Integración con Zeus/MCPGaia catalog |
| **Could** | Scripts cross-platform, binding Angular en workspace |
| **Won't** | Deploy a producción (fuera de scope FC1) |

---

## Decisiones Arquitectónicas

### DA1: No crear plugin separado

**Decisión**: El servicio de canales se integra como **parte del plugin `mcp-presets`** existente.

**Rationale**: 
- Ya existe `@plugin_ox_mcppresets` que gestiona servidores MCP
- Añadir un nuevo plugin para 2 servicios viola DRY
- Socket.IO es infraestructura de mesh, no feature de usuario

### DA2: Nomenclatura de tasks

**Decisión**: Usar prefijo `CHS:` (Channels) para las nuevas tasks.

**Formato**: `CHS: {Acción} [{Componente}]`

**Ejemplos**:
- `CHS: Build [Core]`
- `CHS: Start [Server]`
- `CHS: Start [AdminUI]`
- `CHS: Open [AdminUI]`

### DA3: Puertos estándar

**Decisión**: Mantener puertos por defecto del upstream.

| Servicio | Puerto | Configurable vía |
|----------|--------|------------------|
| ws-server | 3000 | `PORT` env var |
| socket.io-admin-ui | 3100 | `run.sh` / docker-compose |

---

## Próximos Pasos

- [x] Conversación PO-SM documentada
- [ ] Generar backlog borrador `01_backlog-borrador.md`
- [ ] Agregar tasks a `.vscode/tasks.json`
- [ ] Actualizar `README-SCRIPTORIUM.md` del submódulo
- [ ] Validar índices con `@indice validar`

---

## Notas de Adaptación del Protocolo

> **Submódulo anidado**: Este caso adapta el protocolo estándar de 8 fases porque:
> 
> 1. **Fase 0-1 (Verificación + Instalación)**: SKIP — el submódulo ya existe
> 2. **Fase 2-3 (Inspección + Match)**: Ejecutado — ver análisis arriba
> 3. **Fase 4-5 (Scrum + Backlog)**: EN PROGRESO — este documento
> 4. **Fase 6 (Plugin)**: NO APLICA — no se crea plugin nuevo, se extiende mcp-presets
> 5. **Fase 7 (Integración)**: PARCIAL — solo tasks.json y documentación
> 6. **Fase 8 (Commits)**: Simplificado — un solo commit de integración

