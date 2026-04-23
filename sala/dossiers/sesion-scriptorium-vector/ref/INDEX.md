# Índice de referencias — sesion-scriptorium-vector

> **Propósito:** punto único de reentrada para la sesión vectorial.
> **Modelo:** GPT-5.4

## 1. Referencia bruta de origen

- `plan.md` — árbol-grafo, intención del PO y contexto bruto de la línea de trabajo.

## 2. Dossiers obligatorios del ecosistema

- `sala/dossiers/scrum-backlog-lore-db-vector-expansion/`
  - Rol: refinement scrum compartido del frente lore-db/vector en Scriptorium.
  - Próxima task visible: `SBLVX-SC-02`.

- `sala/dossiers/vector-machine/`
  - Rol: autopista técnica de `VectorMachineSDK`, plugin `vector-machine` y frontera MCP futura.
  - Próxima task visible: `VM-01`.

- `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/`
  - Rol: refinement local del frente documental y del layout/skill en `DocumentMachineSDK`.
  - Próxima task visible: `SBLVX-DM-02`.

## 3. Agentes y superficies DRY relevantes

- `.github/agents/ox.agent.md` — gobierno DRY, ontología y espejo sala/dossier.
- `.github/agents/indice.agent.md` — navegación y mapa estructural.
- `.github/prompts/dossier.prompt.md` — operación canónica de dossiers.
- `.github/skills/dossier-feature/SKILL.md` — protocolo portable de la capa dossier.

## 3.1 Preferencia operativa de orquestación

- `Ox.Cristalizador.Dosier` — preferencia para diseño, cristalización, mapa de dossiers y decisiones de apertura/cierre de líneas.
- `Aleph` — preferencia para ejecución de sala, asignación aprobada y ciclo de entregas.
- `Indice` — apoyo para control DRY y mapa estructural antes de abrir nuevos frentes.

## 4. Lectura recomendada para retomar

1. Leer este índice completo.
2. Leer `sala/dossiers/sesion-scriptorium-vector/PLAN.md`.
3. Leer `sala/dossiers/vector-machine/activacion.prompt.md`.
4. Leer `sala/dossiers/scrum-backlog-lore-db-vector-expansion/activacion.prompt.md`.
5. Leer `DocumentMachineSDK/sala/dossiers/scrum-backlog-lore-db-vector-expansion/activacion.prompt.md`.
6. Elegir una prioridad entre `VM-01`, `SBLVX-SC-02` y `SBLVX-DM-02`.

## 5. Estrategia fijada

- No fusionar los dossiers hijos en uno.
- Usar este dossier como paraguas de sesión, ownership y handoff.
- Abrir nuevos dossiers derivados solo cuando la siguiente sesión confirme la rama prioritaria.