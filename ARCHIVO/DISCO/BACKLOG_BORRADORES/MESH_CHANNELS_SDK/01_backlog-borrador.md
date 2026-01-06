# Backlog Borrador: MESH-CHANNELS-1.0.0 — Socket.IO Channels SDK

**Opportunity**: Aleph Scriptorium  
**Sprint**: FC1  
**Effort total**: 13 pts  
**Estado**: 📝 Borrador (pendiente aprobación)

---

## Contexto

El **mcp-channels-sdk** es un submódulo anidado dentro de `MCPGallery/mcp-mesh-sdk/` que proporciona:

1. **ws-server**: Servidor Socket.IO con librería `@alephscript/core` para comunicación en tiempo real
2. **socket.io-admin-ui**: Dashboard de administración para monitorear conexiones, rooms y eventos

Este backlog integra estos servicios en el flujo de desarrollo del Scriptorium mediante tasks de VS Code.

---

## Arquitectura

```
MCPGallery/mcp-mesh-sdk/mcp-channels-sdk/
├── ws-server/                          # Monorepo Socket.IO
│   ├── packages/
│   │   ├── alephscript-core/          # @alephscript/core library
│   │   ├── aleph-script-core-browser/ # Cliente browser
│   │   ├── aleph-script-angular/      # Binding Angular
│   │   └── socket-gym-demo/           # Demo app
│   └── package.json                    # Workspaces config
│
└── socket.io-admin-ui-develop/         # Fork @socket.io/admin-ui
    ├── lib/                            # Servidor instrument()
    ├── ui/                             # Vue dashboard
    └── docker-compose.yml              # Stack completo
```

---

## Feature Cycles / Iteraciones

| Ciclo | Objetivo | Effort |
|-------|----------|--------|
| FC1 | Configuración VS Code + Documentación | 13 pts |
| FC2 | Integración con Zeus/MCPGaia (futuro) | TBD |

---

## Stories

### MESH-CHANNELS-1.0.0-S01 — Tasks de VS Code
**Puntos**: 5  
**Prioridad**: Must  
**Estado**: ⏳ Pendiente

#### Descripción
Añadir tasks a `.vscode/tasks.json` para operar los servicios de canales Socket.IO desde VS Code.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T001 | Crear task `CHS: Build [Core]` para compilar @alephscript/core | 1 | ⏳ |
| T002 | Crear task `CHS: Start [Server]` para arrancar ws-server | 1 | ⏳ |
| T003 | Crear task `CHS: Start [AdminUI]` para arrancar admin UI | 1 | ⏳ |
| T004 | Crear task `CHS: Open [AdminUI]` para abrir browser | 0.5 | ⏳ |
| T005 | Crear task `CHS: Open [Server]` para abrir browser demo | 0.5 | ⏳ |
| T006 | Añadir comentario de sección en tasks.json | 1 | ⏳ |

#### Definition of Done
- [ ] 5 tasks nuevas funcionando en VS Code
- [ ] Tasks agrupadas bajo presentación `chs-stack`
- [ ] Puertos 3000 y 3100 configurados
- [ ] Test manual: arrancar → verificar → abrir browser

---

### MESH-CHANNELS-1.0.0-S02 — Documentación
**Puntos**: 5  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Completar documentación de integración del submódulo anidado.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T007 | Actualizar README-SCRIPTORIUM.md en mcp-channels-sdk | 2 | ⏳ |
| T008 | Añadir entrada en catálogo de puertos (PLUGINS.md o MCPGaia) | 1 | ⏳ |
| T009 | Documentar arquitectura en conversación PO-SM | 1 | ⏳ |
| T010 | Añadir referencia en BACKLOG-SCRIPTORIUM.md | 1 | ⏳ |

#### Definition of Done
- [ ] README-SCRIPTORIUM explica uso básico
- [ ] Puertos 3000/3100 documentados
- [ ] Backlog referenciado en índice principal

---

### MESH-CHANNELS-1.0.0-S03 — Validación E2E
**Puntos**: 3  
**Prioridad**: Should  
**Estado**: ⏳ Pendiente

#### Descripción
Verificar que el flujo completo funciona end-to-end.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T011 | Ejecutar build:core y verificar dist/ | 1 | ⏳ |
| T012 | Arrancar server y verificar log "listening" | 1 | ⏳ |
| T013 | Abrir Admin UI y verificar conexión al server | 1 | ⏳ |

#### Definition of Done
- [ ] Build exitoso sin errores
- [ ] Server escuchando en puerto 3000
- [ ] Admin UI conecta y muestra dashboard
- [ ] Screenshot o log como evidencia

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Stories totales | 3 |
| Tasks totales | 13 |
| Effort total | 13 pts |
| Prioridad Must | 5 pts (38%) |
| Prioridad Should | 8 pts (62%) |

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| MCPGallery/mcp-mesh-sdk | ✅ Existente | Submódulo padre |
| mcp-channels-sdk | ✅ Existente | Submódulo anidado ya presente |
| Node.js 18+ | ✅ Prerequisito | Para npm workspaces |
| TypeScript 5+ | ✅ Prerequisito | Para build |

---

## Catálogo de Puertos (Nuevo)

| Servicio | Puerto | Rango | Notas |
|----------|--------|-------|-------|
| ws-server (Socket.IO) | 3000 | 3000-3099 | Configurable vía PORT |
| socket.io-admin-ui | 3100 | 3100-3199 | Puerto fijo en run.sh |

---

## Pendiente Aprobación

Usuario debe revisar y aprobar con `@scrum aprobar`.

**Checklist de aprobación**:
- [ ] Stories priorizadas correctamente
- [ ] Effort estimado es razonable
- [ ] Dependencias validadas
- [ ] Sin conflictos con otros sprints

