# 📝 Ronda 8 — ALEPH: Producción para Plugins

> **Fecha**: 2025-12-23  
> **Rol**: Productor Principal  
> **Misión**: Priorizar épicas, diseñar API de registro dinámico y definir roadmap de implementación

---

## 1. Validación del Análisis de @ox

Confirmo la matriz Plugin × Capacidad. Añado observaciones de producción:

### Dependencias Críticas Detectadas

```
                    ARG-BOARD (8 agentes)
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ▼             ▼             ▼
      AGENT-CREATOR   TEATRO      GH-PAGES
           │             │
           ▼             │
      FORO-SCRAPER       │
                         │
                         ▼
                    (visualización impress.js)
```

**Observación**: ARG-BOARD es el "plugin fundacional" porque:
1. Contiene la infraestructura de teatro transmedia
2. 3 plugins dependen de él (teatro, agent-creator opcional)
3. La extensión ya tiene código de "Casa Arrakis" que pertenece a este plugin

---

## 2. Roadmap de Implementación (Sprint 2)

### Fase 1: Infraestructura Base (Semana 1)

| Épica | Tasks | Entregable |
|-------|-------|------------|
| **SCRIPT-2.16.0** | Crear BasePluginTreeDataProvider | Clase abstracta reutilizable |
| **SCRIPT-2.16.0** | Crear BasePluginWebViewProvider | Clase abstracta reutilizable |
| **SCRIPT-2.16.0** | Crear PluginChatParticipantFactory | Factory para ChatParticipants |
| **SCRIPT-2.16.0** | Crear PluginRegistryService | Servicio para registry.json |

### Fase 2: Migración ARG-BOARD (Semana 2)

| Épica | Tasks | Entregable |
|-------|-------|------------|
| **SCRIPT-2.8.0** | Mover agentes Arrakis a ARG-BOARD | actores.json actualizado |
| **SCRIPT-2.8.0** | Refactorizar TeatroTreeDataProvider | Carga dinámica desde plugins |
| **SCRIPT-2.8.0** | Registrar 8 agentes como ChatParticipants | Disponibles en chat |
| **SCRIPT-2.8.0** | Crear BOETreeDataProvider | Vista del boletín oficial |

### Fase 3: Plugins UI (Semanas 3-4)

| Prioridad | Épica | Plugin | Razón |
|-----------|-------|--------|-------|
| 1 | SCRIPT-2.10.0 | scrum | Ya definido en backlog, alta visibilidad |
| 2 | SCRIPT-2.11.0 | teatro | Depende de ARG-BOARD migrado |
| 3 | SCRIPT-2.12.0 | agent-creator | Workflow crítico para crear agentes |
| 4 | SCRIPT-2.15.0 | foro-scraper | Integración MCP ya disponible |
| 5 | SCRIPT-2.13.0 | enciclopedia | Funcional sin UI, menor urgencia |
| 6 | SCRIPT-2.14.0 | gh-pages | Funcional con Simple Browser |

---

## 3. API de Registro Dinámico de Plugins

### 3.1. Interfaz del Servicio

```typescript
// src/plugins/PluginRegistryService.ts

export interface PluginRegistration {
  id: string;
  name: string;
  version: string;
  manifestPath: string;
  
  // Componentes opcionales
  treeDataProvider?: {
    viewId: string;
    provider: vscode.TreeDataProvider<any>;
  };
  
  webViewProvider?: {
    viewId: string;
    provider: vscode.WebviewViewProvider;
  };
  
  chatParticipants?: {
    id: string;
    name: string;
    systemPrompt: string;
    agentPath: string;
  }[];
  
  commands?: {
    id: string;
    handler: () => void;
  }[];
  
  statusBarItems?: {
    id: string;
    text: string;
    tooltip: string;
    command?: string;
  }[];
}

export class PluginRegistryService {
  private plugins: Map<string, PluginRegistration> = new Map();
  
  async loadFromRegistry(registryPath: string): Promise<void>;
  
  register(plugin: PluginRegistration): void;
  
  unregister(pluginId: string): void;
  
  getPlugin(pluginId: string): PluginRegistration | undefined;
  
  getAllPlugins(): PluginRegistration[];
  
  getActivePlugins(): PluginRegistration[];
}
```

### 3.2. Integración con ExtensionBootstrap

```typescript
// En extensionBootstrap.ts

async initialize(context: vscode.ExtensionContext): Promise<ExtensionContext> {
  // ... código existente ...
  
  // Inicializar servicio de plugins
  const pluginRegistry = PluginRegistryService.getInstance();
  await pluginRegistry.loadFromRegistry(
    path.join(workspaceRoot, '.github/plugins/registry.json')
  );
  
  // Registrar componentes de cada plugin activo
  for (const plugin of pluginRegistry.getActivePlugins()) {
    this.registerPluginComponents(context, plugin);
  }
  
  // Observar cambios en registry.json
  const watcher = vscode.workspace.createFileSystemWatcher(
    '**/registry.json'
  );
  watcher.onDidChange(() => pluginRegistry.reload());
}

private registerPluginComponents(
  context: vscode.ExtensionContext, 
  plugin: PluginRegistration
): void {
  if (plugin.treeDataProvider) {
    vscode.window.registerTreeDataProvider(
      plugin.treeDataProvider.viewId,
      plugin.treeDataProvider.provider
    );
  }
  
  if (plugin.webViewProvider) {
    vscode.window.registerWebviewViewProvider(
      plugin.webViewProvider.viewId,
      plugin.webViewProvider.provider
    );
  }
  
  if (plugin.chatParticipants) {
    for (const cp of plugin.chatParticipants) {
      this.registerChatParticipant(cp);
    }
  }
}
```

### 3.3. Carga de Agentes desde registry.json

```typescript
// En theatrical/TheatricalChatManager.ts

async loadAgentsFromPlugins(): Promise<void> {
  const registry = PluginRegistryService.getInstance();
  
  for (const plugin of registry.getActivePlugins()) {
    const manifest = await this.parseManifest(plugin.manifestPath);
    
    for (const agent of manifest.agents) {
      const systemPrompt = await this.buildSystemPrompt(agent);
      
      this.registerChatParticipant({
        id: `${plugin.id}.${agent.name.toLowerCase()}`,
        name: agent.name,
        description: agent.description,
        systemPrompt,
        agentPath: path.join(plugin.manifestPath, '..', agent.file)
      });
    }
  }
}

private async buildSystemPrompt(agent: ManifestAgent): Promise<string> {
  // Cargar instrucciones del plugin si existen
  const instructionsPath = agent.instructions 
    ? path.join(plugin.manifestPath, '..', agent.instructions)
    : null;
  
  const basePrompt = `Eres ${agent.name}. ${agent.description}`;
  
  if (instructionsPath && await fs.pathExists(instructionsPath)) {
    const instructions = await fs.readFile(instructionsPath, 'utf-8');
    return `${basePrompt}\n\n${instructions}`;
  }
  
  return basePrompt;
}
```

---

## 4. SystemPrompts Doctrinales para Plugins

### 4.1. ARG-BOARD Agents (8)

```typescript
const ARG_BOARD_PROMPTS = {
  arrakis: `Eres Arrakis, Director de Teatro ARG.
Tu rol es orquestar partidas y coordinar actores siguiendo el protocolo de .arrakis/.
Consultas el BOE antes de cada decisión. Validas coherencia con @decoherence.`,

  boe: `Eres el gestor del Boletín Oficial del Estado Escénico.
Registras de forma inmutable todos los eventos y decisiones del teatro.
Formato: [BOE-YYYY-MM-DD-NNN] Tipo: Disposición | Acta | Edicto`,

  gitarg: `Eres GitARG, orquestador de turnos.
Cada turno del juego es un commit. Cada rama es un camino alternativo.
Los PRs son negociaciones entre facciones.`,

  decoherence: `Eres Decoherence, validador de coherencia.
Tu rol es detectar contradicciones entre BOE, BDC y código.
Aplicas el test de decoherencia: ¿lo declarado coincide con lo implementado?`,

  heroe: `Eres AutomataHeroe, agente autónomo que sigue el Camino del Héroe.
Operas en 12 etapas: partida (1-4), iniciación (5-8), retorno (9-12).
Cada estadio tiene una prueba que completar.`,

  impressjs: `Eres ImpressJS, generador de tableros 3D navegables.
Conviertes conversaciones en diapositivas con data-x, data-y, data-z.
Sigues el sistema de anillos: centro (0), partida (1), iniciación (2), retorno (3).`,

  mbox: `Eres MBox, extractor de emails.
Conviertes archivos .mbox a formato BDC para el teatro.
Preservas metadatos: fecha, remitente, asunto, hilos.`,

  platformcom: `Eres PlatformCom, comunicador multi-plataforma.
Sincronizas feeds de Telegram, Discord, Oasis y otras plataformas.
Normalizas mensajes al formato BDC.`
};
```

### 4.2. Plugins con 1 Agente

```typescript
const SINGLE_AGENT_PROMPTS = {
  scrum: `Eres Scrum, coordinador de gestión ágil.
Orquestas las 5 fases: planificar → borrador → aprobar → tracking → cierre.
Consultas BACKLOG-SCRIPTORIUM.md y BACKLOG-FUNDACION.md.`,

  teatro: `Eres Teatro, orquestador de experiencias transmedia.
Generas obras (12 estadios), las instalas en cartelera, las pones en escena.
Coordinas con ARG_BOARD, AGENT_CREATOR y GH_PAGES.`,

  agentcreator: `Eres AgentCreator, creador de agentes especializados.
Combinas agentes base (blueflag, blackflag, etc.) con fuentes de DISCO.
Generas recipe.json y agente.agent.md. Registras en creation-log.json.`,

  ghpages: `Eres GHPages, publicador web.
Tu fuente de verdad es docs/ (raíz). Soportas dos modos: fusionar y reemplazar.
Verificas build Jekyll antes de publicar.`,

  foroscraper: `Eres ForoScraper, agente de web scraping.
Usas MCP Playwright para descargar foros y blogs.
Gestionas estado pausable/reanudable. Guardas en DISCO/.`,

  bibliotecario: `Eres Bibliotecario, gestor de tomos enciclopédicos.
Coordinas búsquedas temporales (por período) y temáticas (por concepto).
Tu biblioteca está en ARCHIVO/ENCICLOPEDIA/.`
};
```

---

## 5. Distribución del Trabajo (70/30)

Según la distribución acordada en Ronda 4:

### 70% — Extensión VS Code

| Área | Horas/Semana | Entregable |
|------|--------------|------------|
| Infraestructura base | 8h | SCRIPT-2.16.0 |
| Migración ARG-BOARD | 6h | SCRIPT-2.8.0 |
| UI Scrum | 4h | SCRIPT-2.10.0 |
| **Total semanal** | **18h** | |

### 30% — Fundación (Texto)

| Área | Horas/Semana | Entregable |
|------|--------------|------------|
| Preparar Cap.1 | 6h | Estructura + fuentes |
| Auditar ARCHIVO | 2h | Coherencia |
| **Total semanal** | **8h** | |

---

## 6. Métricas de Éxito

### Para Sprint 2 (Plugins UI)

| Métrica | Target | Actual |
|---------|--------|--------|
| Plugins con TreeView | 7/7 | 0/7 |
| Plugins con WebView | 5/7 | 0/7 |
| ChatParticipants de plugins | 15 | 0 |
| % cobertura UI | 100% | 0% |

### Para Sprint 3 (Consolidación)

| Métrica | Target |
|---------|--------|
| Plugins autoregistrados en boot | 7 |
| Tiempo de carga < 3s | ✓ |
| Tests de integración pasando | 100% |

---

## 7. Backlog Actualizado (Sprint 2)

### Épica: SCRIPT-2.16.0 — Plugin Infrastructure

| Task ID | Descripción | Estado | Puntos |
|---------|-------------|--------|--------|
| T001 | Crear PluginRegistryService | ⏳ | 5 |
| T002 | Crear BasePluginTreeDataProvider | ⏳ | 3 |
| T003 | Crear BasePluginWebViewProvider | ⏳ | 3 |
| T004 | Crear PluginChatParticipantFactory | ⏳ | 5 |
| T005 | FileWatcher para registry.json | ⏳ | 2 |
| T006 | Tests unitarios | ⏳ | 3 |
| **Total** | | | **21** |

### Dependencias entre Épicas

```
SCRIPT-2.16.0 (Infraestructura)
      │
      ▼
SCRIPT-2.8.0 (ARG-BOARD)
      │
      ├──────┬──────┬──────┐
      ▼      ▼      ▼      ▼
    2.10.0 2.11.0 2.12.0 2.15.0
    Scrum  Teatro Agent  Scraper
                   │
                   ▼
              2.13.0 2.14.0
              Encic. GH-Pages
```

---

## 8. Decisiones de Producción

### D1: Orden de implementación

**Decisión**: Seguir el orden de dependencias:
1. Infraestructura base
2. ARG-BOARD (desbloquea resto)
3. Plugins por prioridad

**Razón**: Evitar retrabajo.

### D2: Coexistencia de elencos

**Decisión**: Durante migración, mantener ambos elencos:
- `theatrical.arrakis.*` — Agentes legacy (5)
- `plugin.argboard.*` — Agentes migrados (8)

**Razón**: No romper funcionalidad existente.

### D3: Formato de viewIds

**Decisión**: Usar namespace `alephscript.plugin.{id}.{view}`:
- `alephscript.plugin.scrum.sprint`
- `alephscript.plugin.teatro.cartelera`
- `alephscript.plugin.argboard.boe`

**Razón**: Evitar colisiones.

---

## 9. Próximos Pasos (Para @periodico)

1. **Comunicar** este plan al equipo
2. **Generar plana noticiosa** sobre la integración de plugins
3. **Aplicar 5W** a la épica SCRIPT-2.16.0
4. **Auditar con Banderas** las decisiones de producción

---

**Ronda 8 completada** — Turno a @periodico (Ronda 9) para comunicación.
