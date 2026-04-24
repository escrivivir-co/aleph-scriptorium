# Plan — vector-machine

> **Fecha:** 23-abr-2026
> **Autor:** GPT-5.4
> **Dossier:** `sala/dossiers/vector-machine/`

## 1. Contexto

La pasada previa ya dejó creada la autopista v1 de `VectorMachineSDK` dentro de Scriptorium: submódulo integrado, plugin mínimo, bridge, rutas DRY e instrucciones que fijan que la entrada futura no será acceso directo al repo sino una fachada MCP propia sobre `MCPGallery/mcp-mesh-sdk`.

Lo que faltaba no era ejecutar más trabajo técnico todavía, sino dejar una pieza de diseño persistente que preserve el mapa real del feature sin reabrir exploración ni convertir prematuramente la autopista en un backlog pesado. Este dossier existe para sujetar esa pieza: dejar anclas, referencias y frontera conceptual suficientes para que un futuro `PLAN.md`, un futuro refinement scrum o un futuro agente `Ox.Cristalizador` puedan continuar desde contexto congelado y no desde memoria conversacional.

El dossier es deliberadamente más técnico que planificador. Su cometido principal es documentar la forma del feature tal como hoy existe: qué vive en el submódulo, qué vive en el plugin, qué vive en la mesh MCP, qué rutas son canónicas y qué decisiones siguen abiertas antes de diseñar el contrato final.

## Contexto compartido

- `sala/dossiers/vector-machine/ref/INDEX.md`
- `VectorMachineSDK/README-SCRIPTORIUM.md`
- `.github/plugins/vector-machine/manifest.md`
- `.github/plugins/vector-machine/instructions/vector-machine.instructions.md`
- `.github/plugins/vector-machine/docs/README.md`
- `.github/agents/plugin_ox_vectormachine.agent.md`
- `.github/agents/ox.agent.md`
- `.github/agents/indice.agent.md`
- `ARCHIVO/DEVOPS/Funcional.md`
- `ARCHIVO/DEVOPS/Tecnico.md`
- `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md`
- `scripts/setup-workspace.sh`

## 2. Anclas

- `VectorMachineSDK` entra como stack vectorial self-hosted ya operativa, no como infraestructura agéntica o MCP ya resuelta.
- La rama remota visible de origen fue `dev/001`; la rama local de integración creada en el submódulo es `integration/beta/scriptorium`.
- La autopista v1 ya decidió la frontera principal: el submódulo aporta stack; Scriptorium aporta agentización y futura fachada MCP.
- La superficie canónica del servidor futuro es `MCPGallery/mcp-mesh-sdk`, como un servidor MCP más de la mesh.
- El plugin `vector-machine` ya existe como plugin mínimo de preparación; no promete todavía tools, resources, prompts MCP ni puertos definitivos.
- El acceso directo a `VectorMachineSDK/` puede seguir existiendo para lectura y diseño, pero no sustituye el contrato MCP como solución final de integración.
- El dossier debe ser DRY respecto al submódulo y al plugin: referencia, sintetiza y orienta; no duplica documentación que ya vive bien en esas rutas.

## 3. Restricciones

- Solo escribir en la carpeta del agente (ver §6 del protocolo)
- Protocolo de sala: `.github/instructions/sala-protocolo.instructions.md`
- No fijar todavía el contrato final de la fachada MCP ni registrar un servidor inexistente en `.vscode/mcp.json`.
- No reconstruir la topología leyendo otra vez toda la codebase si `ref/INDEX.md` y las anclas del plugin ya bastan para orientar.
- No duplicar en el backlog explicaciones que ya viven en `VectorMachineSDK/README-SCRIPTORIUM.md` o `.github/plugins/vector-machine/`.
- El backlog de este dossier debe quedar inicializado pero ligero: suficiente para orientar el siguiente ciclo, no para forzar una implementación antes de ratificar la frontera del contrato.

## 4. Propuesta

### 4.1 Qué cristaliza este dossier

Este dossier cristaliza cinco piezas:

- la topología actual del feature entre submódulo, plugin y mesh MCP;
- las rutas canónicas que cualquier agente debe leer antes de proponer cambios;
- las decisiones ya tomadas sobre la autopista v1;
- las preguntas que siguen abiertas antes de escribir el contrato final;
- una secuencia mínima de tasks para que el siguiente ciclo pueda convertir este mapa en un plan ejecutable.

### 4.2 Reparto actual de responsabilidades

- **Submódulo `VectorMachineSDK/`**: stack operativa de indexación y consulta semántica, con superficies `etl/`, `qa/`, `wiki/`, `docker-compose*.yml` y scripts `init*`, `health*`, `logs*`.
- **Plugin `vector-machine` en Scriptorium**: capa de integración, discovery, instrucciones y bridge agéntico para preparar la futura fachada MCP.
- **`MCPGallery/mcp-mesh-sdk/`**: superficie canónica donde deberá vivir el servidor MCP cuando exista.
- **Ox + Índice**: gobierno DRY de rutas, ontología del feature, mapa de navegación y diagnóstico del espejo `sala/dossier` que permite operar el track sin reabrir arqueología.

### 4.3 Preguntas abiertas que este dossier deja preparadas

- Qué tools mínimas necesita la v1 de la fachada MCP y qué queda fuera.
- Qué operaciones deben encapsularse desde el stack Python/Docker hacia la interfaz MCP.
- Qué consumidores se tratarán como primera ola real: `DocumentMachineSDK`, ONFALO, Novelist, `ARCHIVO/PROYECTOS` u otros.
- Qué forma debe tener el backlog ejecutable una vez ratificada la frontera del contrato.

### 4.4 Secuencia mínima para el siguiente ciclo

- `VM-01` debe ratificar la frontera del contrato MCP v1 sin implementarlo todavía.
- `VM-02` debe traducir esa frontera ratificada a backlog ejecutable y handoff de integración.

Esta secuencia deja el dossier inicializado, pero evita llenar la sala con trabajo especulativo antes de cerrar la forma del feature.

## 5. Salida operativa

- Tracking: [BACKLOG.md](./BACKLOG.md)
- Decisiones del PO: [RESPUESTAS.md](./RESPUESTAS.md)
- Activación del dossier: [activacion.prompt.md](./activacion.prompt.md)
- Referencias técnicas: [ref/INDEX.md](./ref/INDEX.md)
- Tasks: carpeta [tasks](./tasks)