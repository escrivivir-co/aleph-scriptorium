# Backlog Borrador: AGENT-TEMPLATES-1.0.0

> **Épica**: Integración Claude Code Templates en Agent Creator  
> **Sprint**: FC1 (Enero 2026)  
> **Estado**: 📋 Planificación  
> **Effort total**: 13 puntos  
> **Sesión origen**: [acta-cotrabajo](../../SESIONES_COTRABAJO/2026-01-04_agent-creator-claude-templates/01_acta-cotrabajo.md)

---

## Resumen Ejecutivo

Integrar el catálogo de plantillas de `claude-code-templates` (repositorio externo) en el flujo de creación de agentes del plugin Agent Creator. El usuario podrá seleccionar plantillas comunes durante la creación, enriqueciendo el agente con capacidades predefinidas.

---

## Objetivos

1. **Acceso directo**: Symlink desde plugin a `TypedPromptsEditor/claude-code-templates/cli-tool`
2. **Índice navegable**: Catálogo JSON con metadatos de todas las plantillas
3. **Flujo enriquecido**: Paso "Agregar plantilla común" en crear-agente.prompt.md
4. **Documentación**: Caso de uso detallado en PLUGINS.md
5. **Orquestación MCP**: Herramientas para sondear y seleccionar plantillas

---

## Stories y Tasks

### Story 1: Infraestructura de Acceso (3 pts)

> **Como** desarrollador del plugin Agent Creator  
> **Quiero** acceso estructurado al catálogo de mcp-agent-lore-sdk  
> **Para** poder consultarlo programáticamente durante la creación de agentes

#### Tasks

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T1.1 | Crear symlink `.github/plugins/agent-creator/templates/claude-code/` → `AgentLoreSDK/cli-tool` | 1 | ⬜ |
| T1.2 | Verificar acceso desde Windows (mklink/junction) y Unix (ln -s) | 0.5 | ⬜ |
| T1.3 | Documentar en manifest.md la dependencia externa | 0.5 | ⬜ |
| T1.4 | Añadir script `scripts/link-claude-templates.sh` para setup automático | 1 | ⬜ |

**DoD**:
- [ ] Symlink/junction funcional en ambos OS
- [ ] Script de setup probado
- [ ] Manifest actualizado

---

### Story 2: Índice Navegable del Catálogo (3 pts)

> **Como** agente AgentCreator  
> **Quiero** un índice estructurado de todas las plantillas disponibles  
> **Para** poder ofrecer sugerencias relevantes al usuario

#### Tasks

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T2.1 | Crear script `scripts/scan-claude-templates.js` que genere `catalog.json` | 1.5 | ⬜ |
| T2.2 | Diseñar esquema JSON del catálogo (categories, items, metadata) | 0.5 | ⬜ |
| T2.3 | Generar README.md legible del catálogo | 0.5 | ⬜ |
| T2.4 | Integrar generación en pre-commit o manual | 0.5 | ⬜ |

**Esquema propuesto** (catalog.json):

```json
{
  "$schema": "catalog.schema.json",
  "source": "AgentLoreSDK/cli-tool",
  "scanned_at": "2026-01-04T12:00:00Z",
  "categories": {
    "agents": {
      "description": "Agentes especializados para Claude Code",
      "count": 25,
      "items": [
        {
          "id": "ai-specialists",
          "name": "AI Specialists",
          "path": "components/agents/ai-specialists/",
          "description": "Agentes especializados en IA",
          "tags": ["ai", "ml", "specialists"]
        }
      ]
    },
    "commands": { /* similar */ },
    "skills": { /* similar */ },
    "templates": { /* similar */ }
  }
}
```

**DoD**:
- [ ] catalog.json generado con todas las categorías
- [ ] README.md generado
- [ ] Script funcional y documentado

---

### Story 3: Flujo "Agregar Plantilla Común" (5 pts)

> **Como** usuario creando un agente  
> **Quiero** poder enriquecer mi agente con plantillas predefinidas  
> **Para** no partir de cero en dominios comunes

#### Tasks

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T3.1 | Modificar `crear-agente.prompt.md` añadiendo paso 2: "¿Agregar plantilla?" | 1 | ⬜ |
| T3.2 | Crear prompt `seleccionar-plantilla.prompt.md` para navegación del catálogo | 1 | ⬜ |
| T3.3 | Implementar lógica de fusión: plantilla + agente base | 1.5 | ⬜ |
| T3.4 | Actualizar receta JSON para incluir `template_source` | 0.5 | ⬜ |
| T3.5 | Añadir tests de integración (plantilla + yellowflag, etc.) | 1 | ⬜ |

**Flujo detallado**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO CREAR AGENTE (v2)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Seleccionar agente base                                     │
│     └── @yellowflag, @blueflag, @redflag, etc.                 │
│                                                                 │
│  2. [NUEVO] ¿Agregar plantilla común?                          │
│     │                                                           │
│     ├── NO → Continuar paso 3                                  │
│     │                                                           │
│     └── SÍ → Abrir seleccionador:                              │
│              │                                                  │
│              ├── Explorar por categoría                        │
│              │   └── agents/commands/skills/templates          │
│              │                                                  │
│              ├── Buscar por keyword                            │
│              │   └── "security", "database", "testing"         │
│              │                                                  │
│              └── Seleccionar plantilla                         │
│                  └── Mostrar preview y confirmar               │
│                                                                 │
│  3. Conectar fuentes de datos (opcional)                       │
│     └── DISCO/, scraping activo                                │
│                                                                 │
│  4. Definir especialización                                     │
│     └── System prompt personalizado                            │
│                                                                 │
│  5. Generar receta                                              │
│     └── Incluye: base + template + fuentes + especialización   │
│                                                                 │
│  6. Deploy                                                      │
│     └── agents/created/{nombre}.agent.md                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**DoD**:
- [ ] Flujo funcional con paso 2
- [ ] Navegación de catálogo operativa
- [ ] Fusión de plantilla + base probada
- [ ] Receta incluye template_source

---

### Story 4: Documentación y Caso de Uso en PLUGINS.md (2 pts)

> **Como** mantenedor del Scriptorium  
> **Quiero** documentar el caso de uso de integración de plantillas externas  
> **Para** que otros plugins puedan seguir el patrón

#### Tasks

| ID | Task | Effort | Estado |
|----|------|--------|--------|
| T4.1 | Añadir sección "Caso de Uso: Integración de Catálogos Externos" en PLUGINS.md | 1 | ⬜ |
| T4.2 | Documentar patrón MCP para sondeo de catálogos | 0.5 | ⬜ |
| T4.3 | Actualizar manifest.md de agent-creator con dependencia | 0.5 | ⬜ |

**Contenido propuesto para PLUGINS.md**:

```markdown
## Caso de Uso: Integración de Catálogos Externos

### Patrón: Symlink + Índice + MCP

Cuando un plugin necesita acceder a un catálogo externo (otro submódulo):

1. **Symlink**: Crear link simbólico en la carpeta del plugin
2. **Índice**: Generar `catalog.json` con escaneo automático
3. **MCP**: Exponer herramientas de consulta via servidor MCP

### Ejemplo: Agent Creator + Claude Code Templates

| Componente | Archivo | Propósito |
|------------|---------|-----------|
| Symlink | `templates/claude-code/` | Acceso a cli-tool |
| Índice | `index/catalog.json` | Metadatos navegables |
| Prompt | `seleccionar-plantilla.prompt.md` | Flujo de selección |
| MCP Tool | `browse_catalog` | API para agentes |

### Herramientas MCP Recomendadas

| Tool | Parámetros | Retorna |
|------|------------|---------|
| `browse_catalog` | `category`, `search_term` | Lista de items |
| `preview_template` | `template_id` | Contenido y metadata |
| `apply_template` | `template_id`, `target_agent` | Agente fusionado |
```

**DoD**:
- [ ] PLUGINS.md actualizado
- [ ] Patrón documentado
- [ ] Manifest.md actualizado

---

## Dependencias

| Dependencia | Tipo | Estado |
|-------------|------|--------|
| `TypedPromptsEditor/claude-code-templates` | Submódulo git | ✅ Añadido |
| Plugin agent-creator | Plugin activo | ✅ Instalado |
| MCP DevOps Server | Servidor | ⬜ Opcional |

---

## Riesgos

| Riesgo | Mitigación |
|--------|-----------|
| Symlinks no funcionan igual en Windows/Unix | Script de setup con detección de OS |
| Catálogo crece y catalog.json es muy grande | Lazy loading por categoría |
| Plantillas Claude Code incompatibles con .agent.md | Adaptador en paso de fusión |

---

## Criterios de Aceptación de la Épica

- [ ] Symlink funcional desde plugin a cli-tool
- [ ] catalog.json generado con 4 categorías
- [ ] Flujo crear-agente tiene paso "Agregar plantilla"
- [ ] Al menos 1 agente creado con plantilla fusionada (demo)
- [ ] PLUGINS.md documenta el caso de uso
- [ ] Backlog archivado al completar

---

## Timeline Propuesto

| Semana | Stories | Puntos |
|--------|---------|--------|
| W1 | S1 (Infraestructura) + S2 (Índice) | 6 |
| W2 | S3 (Flujo) + S4 (Docs) | 7 |

**Total**: 13 puntos en 2 semanas

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-04 | Creación del backlog borrador | @plugin_ox_scrum |
