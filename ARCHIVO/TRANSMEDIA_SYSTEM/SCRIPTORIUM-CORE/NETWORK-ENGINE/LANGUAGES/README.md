# Language Units

Each derived language lives as a portable unit under `LANGUAGES/<name>/` with three folders:

| Folder | Role |
| --- | --- |
| `definition/` | Dossiers: `vision.md`, `ontology.md`, `semantics.md`, `grammar.md`, `roadmap.md`, `implementation_plan.md` |
| `package/` | TypeScript package publishing as `@network-engine/<name>` |
| `app/` | Optional MCP/app descriptor publishing as `@network-engine/<name>-app` for the host catalog |

`packages/*` is reserved for shared platform code (`core`, `network-engine`, `mcp`, `apps`, etc.).
Language-specific apps must not live under `packages/apps/src/catalog/<name>`; they export descriptors from `LANGUAGES/<name>/app` instead.

## Current languages

| Language | Package | App |
| --- | --- | --- |
| `aleph-lang` | `@network-engine/aleph-lang` | `@network-engine/aleph-lang-app` |
| `compose-lang` | `@network-engine/compose-lang` | `@network-engine/compose-lang-app` |

## Protocol references

- Conceptual design: `INSTRUCTIONS/LAYER_3/LANGUAGES.functional.md`
- Technical scaffolding: `INSTRUCTIONS/LAYER_1/LANGUAGES.instructions.md`
- DevOps inception workflow: `INSTRUCTIONS/LAYER_4/LANGUAGES.instructions.md`
