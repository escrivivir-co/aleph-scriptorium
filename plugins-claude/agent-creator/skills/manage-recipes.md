# Manage Recipes

Create, inspect, edit, and replay agent recipes for reproducible agent generation.

## Quick Usage

```
/manage-recipes
```

Prompts for action: **list**, **inspect {name}**, **replay {name}**, **edit {name}**, **delete {name}**.

## What Are Recipes?

Recipes are JSON files stored in `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/` that capture exactly how an agent was created: base agents, data sources, specialization, extracted concepts, and SDK templates used. They enable reproducible re-creation and iterative improvement.

## Actions

### List Recipes

Read all `.recipe.json` and `.json` files in `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/`:

```
Available recipes:

| Name | Version | Base Agents | Sources | Created |
|------|---------|-------------|---------|---------|
| tarotista | 1.1.0 | yellowflag | DISCO/Foro_t8941392/ | 2025-12-22 |
| lucas | 1.0.0 | indice | ARCHIVO/DEVOPS/, AgentLoreSDK/ | 2025-12-28 |
| nonsi | 1.0.0 | ... | ... | ... |
| demarcacion-yellowflag | 1.0.0 | yellowflag | ... | ... |
```

### Inspect Recipe

Read and display a specific recipe with full details:

```
/manage-recipes inspect tarotista
```

Shows: base agents with inherited elements, data sources with scraping state, specialization, specific tests, ARG deployment status if applicable.

### Replay Recipe

Re-create an agent from its recipe, optionally with updated sources:

```
/manage-recipes replay tarotista
```

1. Read `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/tarotista.recipe.json`
2. Re-analyze base agents (may have been updated)
3. Re-analyze data sources (may have more pages scraped)
4. Regenerate `.agent.md` with fresh synthesis
5. Bump version in recipe
6. Optionally run validation protocol

### Edit Recipe

Modify a recipe before replaying (add sources, change base, adjust specialization):

```
/manage-recipes edit tarotista
```

### Delete Recipe

Remove a recipe (does not delete the created agent):

```
/manage-recipes delete tarotista
```

## Recipe File Locations

```
ARCHIVO/PLUGINS/AGENT_CREATOR/
├── recipes/
│   ├── tarotista.recipe.json
│   ├── lucas.recipe.json
│   ├── nonsi.json
│   ├── demarcacion-yellowflag.recipe.json
│   ├── pathykar.recipe.json
│   ├── aaia-editor-steroids.recipe.json
│   └── tutatix/ (nested recipe with FIA data)
├── agents/created/          # Agents produced by recipes
└── logs/creation-log.json   # History of all creations
```

---

<details>
<summary><strong>Full Reference: Recipe Schema</strong> (click to expand)</summary>

## Recipe JSON Schema

```json
{
  "name": "string (required)",
  "version": "string (semver, required)",
  "created_at": "string (ISO 8601, required)",
  "updated_at": "string (ISO 8601, optional)",
  "created_by": "string (default: AgentCreator)",
  "agentes_base": [
    {
      "id": "string (agent identifier)",
      "file": "string (path to .agent.md)",
      "elementos_heredados": ["string array of inherited elements"]
    }
  ],
  "fuentes_datos": [
    {
      "ruta": "string (path in DISCO/ or ARCHIVO/)",
      "tipo": "scraping | document | transcription",
      "job_id": "string (if scraping, references FORO_SCRAPER job)",
      "paginas_usadas": [1, 2, 3],
      "paginas_disponibles": 51,
      "conceptos_extraidos": ["string array"]
    }
  ],
  "especialidad": "string (specialization description)",
  "sdk_templates_used": ["string array of AgentLoreSDK template paths"],
  "tests_especificos": ["string array of audit test names"],
  "handoffs_añadidos": ["string array of added handoffs"],
  "arg_deployment": {
    "deployed": "boolean",
    "deployed_at": "string (ISO 8601)",
    "target_plugin": "arg-board",
    "obra": { "id": "string", "titulo": "string", "tipo": "string" },
    "personaje": {
      "id": "string",
      "nombre": "string",
      "arquetipo": "string",
      "rol": "string"
    }
  }
}
```

## Example: tarotista.recipe.json

```json
{
  "name": "tarotista",
  "version": "1.1.0",
  "created_at": "2025-12-22T12:00:00Z",
  "agentes_base": [{
    "id": "yellowflag",
    "file": ".github/agents/yellowflag.agent.md",
    "elementos_heredados": [
      "cuadrantes_wilber", "pre_trans_falacia",
      "condiciones_vs_contenido", "gnosis_como_luz"
    ]
  }],
  "fuentes_datos": [{
    "ruta": "DISCO/Foro_t8941392/",
    "tipo": "scraping",
    "job_id": "Foro-t8941392",
    "paginas_usadas": [1],
    "paginas_disponibles": 51,
    "conceptos_extraidos": [
      "criterio_demarcacion", "falsificabilidad_popper",
      "paradigmas_kuhn", "sincronicidades_pauli_jung",
      "tarot_marsella"
    ]
  }],
  "especialidad": "Criterio de demarcacion cientifica y limites del conocimiento",
  "tests_especificos": [
    "cientificismo", "falsificabilidad_espuria",
    "paradigma_oculto", "programa_degenerativo",
    "sincronicidad_descartada", "cuadrante_ignorado"
  ],
  "arg_deployment": {
    "deployed": true,
    "obra": { "id": "camino_del_tarotista", "titulo": "El Camino del Tarotista" },
    "personaje": { "id": "tarotista", "arquetipo": "SHAPESHIFTER", "rol": "Oraculo epistemico" }
  }
}
```

</details>

<details>
<summary><strong>Full Reference: Replay with Updated Sources</strong> (click to expand)</summary>

## Replay with Updated Sources

When replaying a recipe whose data source has grown (e.g., more pages scraped):

1. **Detect changes**: Compare `paginas_usadas` in recipe vs current files in source folder
2. **Inform user**: "Source DISCO/Foro_t8941392/ now has 15/51 pages (was 1/51)"
3. **Re-analyze**: Extract new concepts from additional pages
4. **Merge**: Add new concepts to existing ones without losing previous synthesis
5. **Update recipe**: Bump version, update `paginas_usadas`, add new `conceptos_extraidos`
6. **Regenerate agent**: Fresh `.agent.md` with enriched knowledge

This enables **incremental improvement** as more data becomes available through FORO_SCRAPER.

</details>
