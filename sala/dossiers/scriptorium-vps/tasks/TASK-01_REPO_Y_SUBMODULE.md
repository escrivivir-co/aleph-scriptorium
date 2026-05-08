# TASK-01 — Repo `scriptorium-vps` y submódulo

> **Estado:** libre  
> **Agente recomendado:** `vps-ops` / orquestador  
> **Dependencias:** VPS-00  
> **Entrega esperada:** repo `https://github.com/escrivivir-co/scriptorium-vps.git` + entrada `.gitmodules`

## Lee primero

1. `.gitmodules`
2. `ARCHIVO/DEVOPS/SESION_DENIS/MINI-PLAN.md`
3. `sala/dossiers/scriptorium-vps/RESPUESTAS.md`

## Objetivo

Crear el nuevo repositorio operativo del VPS y registrarlo como submódulo de esta codebase siguiendo las convenciones reales de Scriptorium.

## Cambios requeridos

- Crear repo GitHub `escrivivir-co/scriptorium-vps`.
- Usar branch `integration/beta/scriptorium`.
- Registrar submódulo local en path `ScriptoriumVps`.
- Añadir entrada en `.gitmodules` con formato coherente con los submódulos existentes.
- Crear scaffold base del repo:
  - `README.md`
  - `README-SCRIPTORIUM.md`
  - `PATTERN-DOCKER/`
  - `node-red-projects/.gitkeep`
  - `scripts/`
  - `.env.example`

## Informe operativo

### Submódulo propuesto

```ini
[submodule "scriptorium-vps"]
	path = ScriptoriumVps
	url = https://github.com/escrivivir-co/scriptorium-vps.git
	branch = integration/beta/scriptorium
```

### Estructura mínima del repo

```text
ScriptoriumVps/
├── README.md
├── README-SCRIPTORIUM.md
├── PATTERN-DOCKER/
│   ├── docker-compose.yml
│   ├── caddy/
│   ├── nodered/
│   ├── mcp-mesh/
│   └── verdaccio/
├── node-red-projects/
│   └── .gitkeep
├── scripts/
│   ├── deploy.sh
│   ├── verify.sh
│   └── sftp-helpers.sh
└── .env.example
```

## Salida mínima esperada

1. Candidato en carpeta del agente con patch o instrucciones de creación.
2. `ENTREGA_VPS-01.md` con:
   - URL del repo.
   - Diff propuesto de `.gitmodules`.
   - Lista de ficheros base creados.

## Criterio de aceptación

- `.gitmodules` contiene `scriptorium-vps` con path `ScriptoriumVps`.
- El repo tiene `README-SCRIPTORIUM.md`.
- `node-red-projects/.gitkeep` existe.
- La branch objetivo es `integration/beta/scriptorium`.
