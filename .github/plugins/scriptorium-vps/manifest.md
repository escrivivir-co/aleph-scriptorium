---
id: scriptorium-vps
name: "Scriptorium VPS"
version: "0.1.0"
description: "Plugin operativo para el submódulo ScriptoriumVps: bootstrap del VPS público, Node-RED pedagógico, MCP DevOps y Verdaccio."
author: "Aleph Scriptorium"
license: "AIPL-1.0"

scriptorium_version: ">=1.0.0"
dependencies: []
optional_dependencies:
  - mcp-presets

submodule: "ScriptoriumVps"
repository: "https://github.com/escrivivir-co/scriptorium-vps.git"
data_directory: "ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/"

agents:
  - name: "VpsOps"
    file: "agents/vps-ops.agent.md"
    description: "Agente activo para deploy, healthchecks, Caddy, volúmenes y helpers SFTP"
  - name: "NodeRedCurator"
    file: "agents/nodered-curator.agent.md"
    description: "Agente activo para projects, flows, dashboards y manifiesto de contribs del monorepo"
  - name: "VerdaccioKeeper"
    file: "agents/verdaccio-keeper.agent.md"
    description: "Agente activo para publicación y smoke tests de @alephscript/* en Verdaccio"
  - name: "Anfitrion"
    file: "agents/anfitrion.agent.md"
    description: "Stub futuro para la puerta conversacional del VPS"
  - name: "HackeriaSoporte"
    file: "agents/hackeria-soporte.agent.md"
    description: "Stub futuro para soporte técnico y RAG documental"
  - name: "McParlament"
    file: "agents/mc-parlament.agent.md"
    description: "Stub futuro para mediación y flujos parlamentarios"
  - name: "NotarioBoe"
    file: "agents/notario-boe.agent.md"
    description: "Stub futuro para auditoría y registro BOE"
  - name: "Publicador"
    file: "agents/publicador.agent.md"
    description: "Stub futuro para publicación gated y salidas públicas"

instructions:
  - name: "scriptorium-vps"
    file: "instructions/scriptorium-vps.instructions.md"
    description: "Reglas de integración del submódulo ScriptoriumVps, el plugin local y sus datos runtime"

handoffs:
  - label: "Operar bootstrap del VPS"
    agent: "VpsOps"
    prompt: "Prepara deploy, healthchecks y patrón base del VPS Scriptorium."
  - label: "Curar Node-RED pedagógico"
    agent: "NodeRedCurator"
    prompt: "Gestiona projects, dashboards y manifiestos de contribs del monorepo node-red-projects."
  - label: "Gestionar Verdaccio público"
    agent: "VerdaccioKeeper"
    prompt: "Prepara publicación y verificación de paquetes @alephscript/* en Verdaccio."

tags:
  - vps
  - devops
  - caddy
  - node-red
  - verdaccio
  - mcp
---

# Plugin: Scriptorium VPS

Plugin de integración para operar el nuevo submódulo `ScriptoriumVps` dentro del workspace de Scriptorium sin mezclar código de infraestructura con datos mutables del runtime.

## Alcance de v0.1

Esta primera versión deja listo el discovery del plugin y sus agentes base:

1. `VpsOps` para la capa operativa del VPS.
2. `NodeRedCurator` para la capa pedagógica/monorepo de Node-RED.
3. `VerdaccioKeeper` para el registry público de `@alephscript/*`.
4. Cinco agentes `stub` que reservan el espacio funcional del bootstrap plan sin prometer todavía implementación completa.

## Relación con el submódulo

- **Submódulo operativo**: `ScriptoriumVps`
- **Repo remoto**: `https://github.com/escrivivir-co/scriptorium-vps.git`
- **Rama de integración**: `integration/beta/scriptorium`
- **Datos de runtime**: `ARCHIVO/PLUGINS/SCRIPTORIUM_VPS/`

## Notas de integración

- Los secretos reales viven fuera del plugin, nunca en el repo.
- La persistencia del DevOps MCP reutiliza `ARCHIVO/PLUGINS/MCP_DATA/devops-mcp-server/`.
- El plugin no instala todavía un bridge `plugin_ox_scriptorium-vps`; ese paso queda para Aleph cuando decida integrar el plugin en el registry.
