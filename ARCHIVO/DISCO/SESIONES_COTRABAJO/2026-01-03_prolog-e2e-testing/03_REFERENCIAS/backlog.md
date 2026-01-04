# Referencias de Backlog

> Extractos relevantes para la sesión E2E Testing.

---

## Épica: PROLOG-E2E-1.0.0

| Campo | Valor |
|-------|-------|
| **Origen** | Diferido de sesión `prolog-agent-brain-pack-refinement` |
| **Objetivo** | Verificar funcionamiento E2E del stack MCP Prolog |
| **Sprint** | FC1 |

---

## Stack Verificado (pre-sesión)

```
╔══════════════════════════════════════╗
║   APB: Agent Prolog Brain - Health   ║
╚══════════════════════════════════════╝
🔍 Verificando servicios...
🚀 MCP Launcher (3050):     ✅ OK (HTTP 200)
🧠 MCP Prolog (3006):       ✅ OK (HTTP 200)
⚙️  Backend REST (8000):  ✅ OK (HTTP 200)
🌐 Frontend Angular (5001): ✅ OK (HTTP 200)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Resultado: 4/4 servicios operativos
✅ Stack completo operativo
```

---

## Inventario a Probar

### Tools MCP (12 total)

#### Core (7)
1. `prolog_create_session` - Crear sesión
2. `prolog_query` - Ejecutar query
3. `prolog_assert_fact` - Añadir hecho
4. `prolog_consult_file` - Cargar archivo
5. `prolog_list_sessions` - Listar sesiones
6. `prolog_get_telemetry_status` - Telemetría
7. `prolog_destroy_session` - Destruir sesión

#### Backend (5)
1. `/api/run-rule` - Ejecutar regla
2. `/api/parse-rule` - Parsear regla
3. `/api/validate-syntax` - Validar sintaxis
4. `/api/suggest-completion` - Autocompletado
5. `/api/analyze-compatibility` - Compatibilidad

### Resources MCP (6)
1. `prolog://status` - Estado general
2. `prolog://sessions` - Lista de sesiones
3. `prolog://session/{id}` - Detalle sesión
4. `prolog://facts/{session}` - Hechos de sesión
5. `prolog://kb` - Knowledge base
6. `prolog://telemetry` - Métricas

### Prompts MCP (8)
(Ver catálogo en mcp-mesh-sdk)

---

## Referencias Externas

- [Guía Arquitectura MCP Stack](../../../BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md)
- [T006 - Plan E2E Original](../../2026-01-03_prolog-agent-brain-pack-refinement/02_ACTAS/T006_prologeditor_plan-e2e.md)
- [Sesión predecesora](../../2026-01-03_prolog-agent-brain-pack-refinement/)
