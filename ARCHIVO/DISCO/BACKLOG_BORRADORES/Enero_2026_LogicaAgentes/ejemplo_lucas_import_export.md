# Flujo Import/Export: PrologEditor ↔ AgentPrologBrain.pack.json

> **Épica**: SCRIPT-2.3.0 — Prolog MCP Server Integration  
> **Sprint**: FC1  
> **Autor**: @lucas + @ox

---

## Resumen

Este documento describe cómo **importar** y **exportar** lógica Prolog entre:

1. **PrologEditor/frontend** — UI Angular para editar reglas
2. **MCPPrologServer** — Runtime MCP para ejecutar queries
3. **AgentPrologBrain.pack.json** — Pack tipado para agentes

---

## Arquitectura del Flujo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FLUJO DE DATOS PROLOG                           │
└─────────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐          ┌───────────────────┐
    │  PrologEditor    │          │  AgentPrologBrain │
    │  (Angular UI)    │──export──▶│   .pack.json      │
    │  puerto 4200     │          │                   │
    └────────┬─────────┘          └─────────┬─────────┘
             │                              │
             │ HTTP POST                    │ consult
             │ /api/rules                   │
             ▼                              ▼
    ┌──────────────────┐          ┌───────────────────┐
    │  PrologEditor    │          │  MCPPrologServer  │
    │  Backend (Node)  │◀─sync───▶│  (MCP Runtime)    │
    │  puerto 8000     │          │  puerto 3006      │
    └────────┬─────────┘          └─────────┬─────────┘
             │                              │
             │ swipl                        │ swipl
             ▼                              ▼
    ┌─────────────────────────────────────────────────┐
    │              SWI-Prolog Engine                  │
    │              (proceso compartido)               │
    └─────────────────────────────────────────────────┘
```

---

## 1. Export: De PrologEditor a Pack

### Paso 1: Editar reglas en PrologEditor/frontend

```bash
# Iniciar PrologEditor (Angular)
cd PrologEditor
npm run start
# Abre http://localhost:4200
```

### Paso 2: Guardar como archivo .pl

El editor guarda en:
```
PrologEditor/backend/src/services/codigo/web/plugins/{nombre}/{archivo}.pl
```

### Paso 3: Copiar a ubicación del personaje

```bash
# Copiar reglas editadas al elenco del teatro
cp PrologEditor/backend/src/services/codigo/web/plugins/lucas/*.pl \
   ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl
```

### Paso 4: Registrar en Pack

El pack `AgentPrologBrain.pack.json` ya tiene la referencia:

```json
{
  "examples": {
    "sessionWorkflow": [
      "2. prolog_consult_file({..., filePath: 'lucas-prolog.brain.pl'})"
    ]
  }
}
```

---

## 2. Import: De Pack a MCPPrologServer

### Paso 1: Arrancar MCPPrologServer

```bash
cd MCPGallery/mcp-mesh-sdk
npm run start:prolog
# Servidor en http://localhost:3006
```

### Paso 2: Crear sesión para obra

Usando herramienta MCP:
```json
{
  "tool": "prolog_create_session",
  "arguments": {
    "sessionId": "itaca-digital-lucas",
    "obraId": "itaca-digital"
  }
}
```

### Paso 3: Cargar cerebro del personaje

```json
{
  "tool": "prolog_consult_file",
  "arguments": {
    "sessionId": "itaca-digital-lucas",
    "filePath": "ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl"
  }
}
```

### Paso 4: Ejecutar queries

```json
{
  "tool": "prolog_query",
  "arguments": {
    "sessionId": "itaca-digital-lucas",
    "query": "documentacion_coherente(X)."
  }
}
```

Respuesta esperada:
```json
{
  "success": true,
  "bindings": [
    { "X": "editar_reglas_prolog" },
    { "X": "ejecutar_query_prolog" },
    { "X": "crear_packs_mcp" }
  ]
}
```

---

## 3. Sync Bidireccional (Avanzado)

Para mantener sincronía entre PrologEditor y MCPPrologServer:

### Opción A: Watcher de archivos

```javascript
// scripts/sync-prolog-brains.js
const chokidar = require('chokidar');
const axios = require('axios');

const watcher = chokidar.watch('ARCHIVO/DISCO/TALLER/ELENCO/**/*.pl');

watcher.on('change', async (path) => {
  console.log(`Sincronizando: ${path}`);
  await axios.post('http://localhost:3006/mcp/tools/prolog_consult_file', {
    sessionId: 'auto-sync',
    filePath: path
  });
});
```

### Opción B: Hook en PrologEditor

```typescript
// PrologEditor/backend/src/services/sync-service.ts
export class SyncService {
  async onRuleSaved(filePath: string) {
    // Notificar a MCPPrologServer
    await this.mcpClient.call('prolog_consult_file', {
      sessionId: 'prolog-editor-session',
      filePath
    });
  }
}
```

---

## 4. Ejemplo Completo: Lucas en Ítaca Digital

### Escena: Lucas valida documentación

**Contexto**: Un viajero en el estadio 11 quiere verificar coherencia.

**Flujo**:

```yaml
# itaca-digital.yaml (extracto)
escenas:
  - nombre: "La Integración de Lucas"
    estadio: 11
    personaje: lucas
    acciones:
      - tipo: prolog_query
        query: "documentacion_coherente(X)."
        descripcion: "Lucas valida que no hay duplicados"
      
      - tipo: prolog_query
        query: "consejo(perdido, Mensaje)."
        descripcion: "Lucas ofrece guía al viajero"
        
      - tipo: prolog_query  
        query: "puede_avanzar(viajero, ProximoEstadio)."
        descripcion: "Verificar si puede avanzar al estadio 12"
```

**Resultado en UI**:

```
🐂 Lucas: "He verificado la documentación. Todo coherente."
   
   Capacidades validadas:
   - editar_reglas_prolog ✓
   - ejecutar_query_prolog ✓
   - crear_packs_mcp ✓
   
   Consejo: "Cuando no sepas dónde buscar, consulta @indice."
   
   → Puedes avanzar al estadio 12: "El Elixir"
```

---

## 5. Checklist de Verificación

- [x] PrologEditor/frontend funcional (puerto 4200)
- [x] PrologEditor/backend funcional (puerto 8000)
- [x] MCPPrologServer funcional (puerto 3006)
- [x] AgentPrologBrain.pack.json creado
- [x] lucas-prolog.brain.pl con reglas
- [x] itaca-digital.yaml con mcpPacks configurado
- [ ] SWI-Prolog instalado (`brew install swi-prolog`)
- [ ] Test end-to-end completado

---

## Referencias

- [AgentPrologBrain.pack.json](/.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json)
- [lucas-prolog.brain.pl](/ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl)
- [itaca-digital.yaml](/ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml)
- [MCPPrologServer.ts](/MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts)
- [PrologEditor README](/PrologEditor/README-SCRIPTORIUM.md)
