# Evidencia detallada - DocumentMachineSDK

> Archivo canonico de soporte para el broadcast final.
> Absorbe y consolida: `sala/agente-sony/candidato-SBI-05-ramas-trazabilidad.md`
> y `sala/agente-sony/candidato-SBI-06-future-machine-grafista-addons.md`.

## 1. Ramas confirmadas

| Rama | Rol | Estado |
|------|-----|--------|
| `main` | SDK base y contratos portables | CONFIRMADO - git |
| `integration/beta/scriptorium` | Rama operativa de coordinacion inter-producto | CONFIRMADO - git + disco |
| `mod/legislativa` | Mod con grafo operativo del caso | CONFIRMADO - git |
| `mod/restitutiva` | Segundo mod confirmado | CONFIRMADO - git |

## 2. Anclas por rama

| Rama | Ancla util | Lectura operativa |
|------|------------|-------------------|
| `main` | `.github/`, `sala/dossiers/grafo-sdk/`, `sala/dossiers/future-machine-sdk/PLAN.md` | contratos y capas portables del SDK |
| `integration/beta/scriptorium` | `sala/tablero.md`, `sala/dossiers/`, `sala/README.md` | rama usada para coordinar el sprint actual |
| `mod/legislativa` | `mod/agents/`, `DRAFTS2/grafo/` | slot grafista y grafo operativo |
| `mod/restitutiva` | arbol remoto | mod secundario aun no inspeccionado fino |

## 3. Future-machine

La future-machine es la cadena completa que ensambla las capas del SDK:

```text
piezas -> LORE_F -> corpus -> grafo -> universo -> corto
```

Anclas:

- `sala/dossiers/future-machine-sdk/PLAN.md`
- `.github/skills/engine-plan/SKILL.md`

## 4. Slot grafista

| Rama | Estado del slot | Detalle |
|------|-----------------|---------|
| `main` | PREVISTO | `@Grafista` aun no existe como agente SDK; lo cubre `grafo-sdk` |
| `mod/legislativa` | OPERATIVO | `mod/agents/grafista.agent.md` + `DRAFTS2/grafo/*.json` |

Datos concretos del grafo operativo del mod:

- `27 nodos`
- `35 arcos`
- `7 huecos`
- `4 ramas definidas`
- `1 rama instanciada`
- gramatica JSON v1.0

## 5. Addons y skills relevantes

| Skill / addon | Funcion | Relevancia |
|---------------|---------|------------|
| `dossier-feature` | ciclo de vida de dossiers en sala | entrada natural para colaboracion con Retro |
| `engine-plan` | simulacion y diagnostico del pipeline E2E | inspeccion de gaps del slot grafista |
| `futures-engine` | bifurcacion dramatica | base del Dramaturgo y del paso grafo -> universo |
| `media-extraction` | audio/video -> texto -> pieza de lore | addon de ingesta, no central para este broadcast |

## 6. Objetos de trabajo para Retro

1. Diseno del schema generico de grafo (`GS-01`).
2. Inscripcion en backlog compartido (`grafo-sdk` + `grafo-legalista-sdk`).
3. Aterrizaje de una forma de trabajo compartida sobre sala, dossier y SDS.

## 7. Pendientes honestos

- Contenido fino de `mod/restitutiva`.
- Diferenciales concretos de commits entre `integration/beta/scriptorium` y `main`.
- Cualquier confirmacion posterior que dependa ya de una respuesta operativa de Retro.