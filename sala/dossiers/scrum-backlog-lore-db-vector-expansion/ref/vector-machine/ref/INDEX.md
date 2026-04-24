# Índice de referencias — vector-machine

> **Propósito:** mapa DRY para no reabrir exploración estructural del feature.
> **Modelo:** GPT-5.4

## 1. Entrada canónica en Scriptorium

- `sala/dossiers/vector-machine/PLAN.md` — contexto congelado y reparto de responsabilidades.
- `sala/dossiers/vector-machine/BACKLOG.md` — tracking ligero del siguiente ciclo.
- `.github/agents/ox.agent.md` — gobierno DRY del feature y del espejo sala/dossier.
- `.github/agents/indice.agent.md` — rutas de mapa técnico/funcional y consulta rápida.

## 2. Plugin y bridge del feature

- `.github/plugins/vector-machine/manifest.md` — shape mínima del plugin.
- `.github/plugins/vector-machine/instructions/vector-machine.instructions.md` — reglas de integración y límites de la autopista v1.
- `.github/plugins/vector-machine/docs/README.md` — resumen del propósito del plugin.
- `.github/agents/plugin_ox_vectormachine.agent.md` — bridge agéntico del plugin.

## 3. Submódulo y stack real

- `VectorMachineSDK/README-SCRIPTORIUM.md` — ancla de integración del submódulo y decisión de Fase 3.
- `VectorMachineSDK/docker-compose.yml` y variantes `docker-compose*.yml` — topología local del stack.
- `VectorMachineSDK/etl/` — ingestión e indexación.
- `VectorMachineSDK/qa/` — API de preguntas/respuestas.
- `VectorMachineSDK/wiki/` — superficie documental MkDocs.

## 4. Superficie MCP futura

- `MCPGallery/mcp-mesh-sdk/README-SCRIPTORIUM.md` — patrón canónico para el servidor MCP futuro.
- `scripts/setup-workspace.sh` — discovery y wiring de submódulos/plugins en el workspace.

## 5. Índices DRY y trazabilidad global

- `ARCHIVO/DEVOPS/Funcional.md` — vista funcional del feature.
- `ARCHIVO/DEVOPS/Tecnico.md` — vista técnica del feature.
- `.github/PLUGINS.md` — tabla de bridges y protocolo de plugins.
- `.github/plugins/registry.json` — registro del plugin `vector-machine`.

## 6. Decisiones congeladas ya tomadas

- La solución final de integración no será acceso directo al repo, sino una fachada MCP propia.
- El plugin actual prepara la autopista; no fija aún tools, resources, prompts MCP ni puertos definitivos.
- El submódulo aporta stack; Scriptorium aporta agentización, bridge y contrato futuro.
- La siguiente conversación útil no es volver a mapear archivos, sino ratificar la frontera del contrato v1.

## 7. Consumidores potenciales a tener en cuenta

- `DocumentMachineSDK`
- ONFALO / `onfalo-asesor-sdk`
- `NovelistEditor`
- `ARCHIVO/PROYECTOS`

## 8. Uso recomendado de este índice

1. Leer esta página completa.
2. Saltar a `VectorMachineSDK/README-SCRIPTORIUM.md`.
3. Leer `manifest.md` + `vector-machine.instructions.md`.
4. Solo entonces abrir `VM-01` o redactar el siguiente plan implementativo.