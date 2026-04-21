# Conversación PO-SM: LoreSDK

**Fecha**: 2026-04-16  
**Submódulo**: `LoreSDK` (para-la-voz-sdk, rama `main`)  
**Plugin objetivo**: `lore-sdk`  
**Bridge**: `plugin_ox_loresdk`  
**Origen**: BARTLEBY (onfalo-asesor-sdk/PROYECTOS/BARTLEBY)

---

## Análisis Técnico (SM)

### Inventario del submódulo

**Arquitectura**: SDK puro (`main`) + mods de lore específicos (branches/directorios)

**4 Agentes core** (SDK):
- `@bartleby` — analista read-only, produce informes de 5 secciones
- `@archivero` — gestor de corpus (/diff, /merge, /status)
- `@cristalizador` — diseñador de artefactos `mod/`
- `@portal-editorial` — subsumption protocol por perfil de lector

**1 Agente mod** (cristalizado por @cristalizador):
- `@voz` — generador poético desde corpus (no sobre él)

**6 comandos del SDK**: /guion, /feed, /diff-corpus, /merge-corpus, /design, /status

**Mod activo `restitutiva`** (PARA LA VOZ):
- 4 editoriales procesadas
- Nick `restitutiva` estable ×4
- @voz operativa, catálogo Jekyll en `docs/`

**Stack técnico**:
- Copilot Chat agents (.agent.md, .prompt.md, .instructions.md)
- Jekyll GitHub Pages para catálogo poemas
- Git branches para gestión de mods
- Markdown como formato de corpus

### Gaps identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | Rama `main` ≠ convención `integration/beta/scriptorium` | Must | 1 |
| G2 | Gestión multi-mod (coexistencia de varios nicks en mismo repo) | Should | 1 |
| G3 | Integración con consejo-asesor (handoffs cruzados) | Should | 2 |
| G4 | Deploy automático Jekyll via `@plugin_ox_ghpages` | Could | 2 |
| G5 | Servidor MCP para persistencia (¿novelist pattern?) | Could | 3 |
| G6 | Script `setup-workspace.sh` tenía desync (UISDKThreejs faltaba) — corregido | Fixed | — |

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Rama main vs convención workspace | Media | Bajo | Documentado en README-SCRIPTORIUM.md y setup-workspace.sh |
| Subsumption protocol no respetado | Baja | Alto | instructions/lore-sdk.instructions.md lo codifica como regla |
| Corpus contaminado por edición manual | Baja | Alto | `corpus.md` solo modificable via `@archivero` |
| Context bloat si se carga corpus completo | Media | Media | El corpus.md es el mapa, no los editoriales raw |

---

## Visión de Producto (PO)

### Casos de uso objetivo

1. **UC1 — Nueva corriente**: Un editor tiene publicaciones de un colectivo nuevo. En 1 sesión de Copilot: analiza 1-2 editoriales, cristaliza nick, tiene @voz operativa y puede generar poemas.

2. **UC2 — Alimentación mensual**: Cada mes llega un nuevo editorial. Con `/alimentar-corpus` en 10-15 minutos el corpus está actualizado y @voz tiene nuevas tensiones para generar.

3. **UC3 — Publicación web**: El editor selecciona poemas borradores y los publica en el catálogo Jekyll de GitHub Pages sin tocar código.

4. **UC4 — Análisis comparativo**: Con dos mods activos (dos corrientes), ver diferencias en nick/taxonomía via `@archivero`.

### Criterios de éxito

- [ ] UC1 ejecutable en una sola sesión de Copilot Chat (<30 min)
- [ ] UC2 ejecutable con un solo comando + texto editorial
- [ ] UC3 sin conocimientos de Jekyll/Git del usuario
- [ ] `@voz` respeta subsumption: cero menciones a IA en outputs públicos
- [ ] El plugin no contamina el contexto cuando no está en uso (instrucciones `applyTo` correctas)

---

## Decisiones Arquitectónicas

1. **Rama `main`**: El SDK usa `main` como rama de protocolo puro (no `integration/beta/scriptorium`). Excepción documentada en `README-SCRIPTORIUM.md` y `setup-workspace.sh`. No causa problemas operativos.

2. **3 prompts de plugin + 1 workspace prompt**: `as_lore-sdk.prompt.md` es punto de entrada rápido con menú; los 3 prompts del plugin son los workflows detallados. Separación clara.

3. **No servidor MCP**: El SDK opera completamente en chat de Copilot, sin servidor HTTP. Más simple, sin dependencias externas. Si se necesita persistencia avanzada, se añade en iteración posterior (G5).

4. **corpus.md como fuente de verdad**: El mapa acumulativo vive en el submódulo, no en `ARCHIVO/DISCO/`. Razón: es parte del lore del SDK, no datos de runtime del Scriptorium.

5. **Integración consejo-asesor**: Pospuesta a S05. El consejo-asesor ya referencia proyectos de ONFALO; el handoff cruzado es natural pero requiere diseño cuidadoso para no crear loops.

---

## Próximos Pasos

- [x] Generar backlog borrador (este archivo → 01_backlog-borrador.md)
- [ ] Aprobar con `@scrum aprobar`
- [ ] Ejecutar S01 (ya completado con esta instalación)
- [ ] Planificar S02 en próximo sprint
