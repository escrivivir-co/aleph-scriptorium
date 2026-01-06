# Merge SDK Types - Sesión 2026-01-06

> **Épica**: MESH-CHANNELS-SDK-MERGE-1.0.0  
> **Estado**: ✅ Completado

---

## Resumen

Consolidación de tipos duplicados entre `mcp-core-sdk` y `mcp-channels-sdk/ws-server/packages/`.

---

## Cambios Realizados

### 1. mcp-core-sdk v1.3.0

| Cambio | Archivo |
|--------|---------|
| ➕ Nuevo módulo `types/browser` | `src/types/browser/index.ts` |
| 🔄 Export browser types | `src/browser/index.ts` |
| 🔄 Re-export en index | `src/types/index.ts` |
| 📦 Nueva versión | `package.json` → 1.3.0 |

**Nuevos exports disponibles**:
```typescript
// Importar tipos browser
import type { 
  ConnectionStatus,
  AlephClientConfig,
  AlephMessage,
  EventMap,
  GameAction,
  AgentSelection
} from '@alephscript/mcp-core-sdk/types/browser';

// O desde el bundle browser
import type { ... } from '@alephscript/mcp-core-sdk/browser';
```

### 2. Eliminado: alephscript-core

```
MCPGallery/mcp-mesh-sdk/mcp-channels-sdk/ws-server/packages/alephscript-core/
  └── ELIMINADO (100% duplicado de mcp-core-sdk/src/types/)
```

**Tipos que tenía (ahora en mcp-core-sdk)**:
- `ISocketDetails`
- `IUserDetails`  
- `NamespaceDetails`
- `RoomDetails`
- `SuscriptionDetails`
- `ArgsMeta`
- `IRoomDetails`
- `INamespaceDetails`
- `IServerState`

### 3. Actualizado: aleph-script-core-browser v1.1.0

- Los tipos permanecen inline para evitar dependencias circulares en monorepo
- Documentación indica que son idénticos a `mcp-core-sdk/types/browser`
- En publicación npm, pueden ser re-exports directos

### 4. Actualizado: aleph-script-angular v1.1.0

- Peer dependency actualizado a `@alephscript/core-browser@^1.1.0`
- Dev dependency apunta a carpeta local (no .tgz)

### 5. Actualizado: mcp-mesh-sdk

- Dependency actualizada a `mcp-core-sdk@1.3.0`

---

## Arquitectura Final

```
@alephscript/mcp-core-sdk v1.3.0       ← SINGLE SOURCE OF TRUTH
├── /browser                            ← Browser-safe exports
├── /types
│   ├── /browser                        ← Gaming/Client types (NEW)
│   ├── /prolog                         ← PrologEditor types
│   ├── /typed-prompts                  ← TypedPromptsEditor types
│   └── mcp.ts                          ← MCP protocol types
├── /server                             ← Server runtime
└── /client                             ← Client runtime

@alephscript/core-browser v1.1.0       ← CLIENT RUNTIME (uses types above)
└── /client
    ├── AlephScriptClient.ts
    └── SocketClient.ts

@alephscript/angular v1.1.0            ← ANGULAR WRAPPER
└── (depends on core-browser)
```

---

## Líneas Eliminadas

| Componente | Antes | Después | Reducción |
|------------|-------|---------|-----------|
| `alephscript-core/` | ~150 | 0 | -150 |
| Duplicación tipos | 11 tipos × 2 | 11 tipos × 1 | -100% |

---

## Próximos Pasos (Opcionales)

1. [ ] Publicar `@alephscript/mcp-core-sdk@1.3.0` en npm
2. [ ] Actualizar `core-browser` para re-exportar de mcp-core-sdk (post-publish)
3. [ ] Eliminar `socket-gym-demo` si no se usa

---

## Commits Sugeridos

```bash
# En mcp-core-sdk
git add -A && git commit -m "feat(types): add browser types module for client/gaming

- Add src/types/browser/index.ts with ConnectionStatus, EventMap, etc.
- Export browser types from src/browser/index.ts
- Bump version to 1.3.0"

# En mcp-mesh-sdk
git add -A && git commit -m "refactor(packages): remove duplicate alephscript-core

- Delete packages/alephscript-core (100% duplicate of mcp-core-sdk)
- Update core-browser to document type alignment
- Update angular peer deps to ^1.1.0
- Update mcp-core-sdk dep to 1.3.0"
```
