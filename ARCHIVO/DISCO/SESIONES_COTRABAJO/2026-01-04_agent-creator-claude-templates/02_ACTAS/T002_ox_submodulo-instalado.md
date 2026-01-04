# Acta T002: Instalación Submódulo AgentLoreSDK

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 002 |
| **Agente** | @ox |
| **Inicio** | 2026-01-04 12:20 |
| **Fin** | 2026-01-04 12:35 |
| **Estado final** | ✅ DONE |

## Contexto Leído

- Actas revisadas: T001
- Referencias consultadas:
  - `as_instalar_submodulo.prompt.md` (protocolo de 8 fases)
  - `.gitmodules` (estado actual de submódulos)
  - `03_REFERENCIAS/fuentes.md`

## Aportación

### 1. Verificación Fase 0

**Estado previo**: 17 submódulos instalados  
**Nuevo submódulo**: #18

```bash
git submodule status | wc -l
# Resultado: 17
```

### 2. Instalación Fase 1

**Comando ejecutado**:
```bash
git submodule add https://github.com/escrivivir-co/mcp-agent-lore-sdk.git AgentLoreSDK
```

**Resultado**:
- ✅ Submódulo clonado en `AgentLoreSDK/`
- ✅ `.gitmodules` actualizado
- ✅ Rama `integration/beta/scriptorium` creada

### 3. Inspección Fase 2

**Estructura descubierta**:

```
AgentLoreSDK/
├── .claude/                    # Configuración Claude
├── .claude-plugin/             # Plugin Claude
├── api/                        # API backend (Supabase)
├── cli-tool/                   # ← CONTENIDO PRINCIPAL
│   ├── components/
│   │   ├── agents/             # 25 categorías
│   │   ├── commands/           # 20 categorías
│   │   ├── skills/             # 10 categorías
│   │   ├── mcps/               # MCP servers
│   │   ├── hooks/              # Git hooks
│   │   ├── sandbox/            # Sandbox configs
│   │   └── settings/           # Settings templates
│   └── templates/              # 6 lenguajes
├── database/                   # Supabase/DB
├── docs/                       # Documentación
└── docu/                       # Docs adicionales
```

**Inventario de `cli-tool/components/agents/`**:

| Categoría | Descripción |
|-----------|-------------|
| ai-specialists | Agentes de IA especializados |
| api-graphql | APIs y GraphQL |
| blockchain-web3 | Blockchain y Web3 |
| business-marketing | Negocios y marketing |
| data-ai | Datos e IA |
| database | Bases de datos |
| deep-research-team | Equipos de investigación |
| development-team | Equipos de desarrollo |
| development-tools | Herramientas de desarrollo |
| devops-infrastructure | DevOps e infraestructura |
| documentation | Documentación |
| expert-advisors | Asesores expertos |
| ffmpeg-clip-team | Procesamiento multimedia |
| game-development | Desarrollo de juegos |
| git | Git workflows |
| mcp-dev-team | Desarrollo MCP |
| modernization | Modernización |
| obsidian-ops-team | Obsidian |
| ocr-extraction-team | OCR y extracción |
| performance-testing | Testing de rendimiento |
| podcast-creator-team | Creación de podcasts |
| programming-languages | Lenguajes de programación |
| realtime | Tiempo real |
| security | Seguridad |
| web-tools | Herramientas web |

### 4. Corrección de Referencias

Actualicé todas las referencias incorrectas:

| Archivo | Cambio |
|---------|--------|
| `00_SESION.md` | Inventario corregido con `AgentLoreSDK/` |
| `03_REFERENCIAS/backlog.md` | URL y ruta corregidas |
| `03_REFERENCIAS/fuentes.md` | Estructura completa documentada |
| `02_ACTAS/T001_*.md` | Prerrequisitos actualizados |
| `BACKLOG_BORRADORES/*/01_backlog-borrador.md` | Tasks corregidas |

## Decisiones Tomadas

| # | Decisión | Justificación |
|---|----------|---------------|
| D1 | Nombre `AgentLoreSDK` (PascalCase) | Convención del Scriptorium para paths locales |
| D2 | Submódulo de primera categoría en raíz | No anidado en otro submódulo |
| D3 | Contenido útil en `cli-tool/` | El resto (api/, database/) es backend del servicio |

## Tasks Completadas

| Task | Estado |
|------|--------|
| Fase 0: Verificación | ✅ |
| Fase 1: git submodule add | ✅ |
| Fase 2: Inspección codebase | ✅ |
| Corrección de referencias | ✅ |

## Preguntas para Siguientes Turnos

- [ ] ¿Crear symlink o acceder directamente desde `AgentLoreSDK/cli-tool/`? → @indice
- [ ] ¿El formato de las plantillas es compatible con `.agent.md`? → @indice analizar

## Siguiente Turno Sugerido

**@indice** para generar `catalog.json` desde `AgentLoreSDK/cli-tool/components/`.

---

## Notas Técnicas

- El repositorio `mcp-agent-lore-sdk` es un fork enriquecido de `claude-code-templates`
- Incluye API backend, base de datos, y plugin de Claude adicional
- Para el Scriptorium solo usamos `cli-tool/components/` y `cli-tool/templates/`
