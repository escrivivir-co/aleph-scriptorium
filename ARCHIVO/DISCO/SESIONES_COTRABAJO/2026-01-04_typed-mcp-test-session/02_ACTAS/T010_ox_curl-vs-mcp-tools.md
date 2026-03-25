# Acta T010: Fe de Erratas - MCP Tools SÍ Disponibles

> **Sesión**: 2026-01-04_typed-mcp-test-session  
> **Agente**: @ox  
> **Épica**: TYPED-MCP-1.0.0 (post-cierre)  
> **Propósito**: ~~Demostrar que el circuito MCP puede ejecutarse sin terminal~~ **Corregir falso positivo**

---

## Metadatos

| Campo | Valor |
|-------|-------|
| Turno | 010 |
| Agente | @ox |
| Inicio | 2026-01-04 20:10 |
| Fin | 2026-01-04 20:35 |
| Estado final | ✅ DONE (con fe de erratas) |

---

## 1. Contexto

Durante el fix de BUG-TPE-003 (ResourceTemplate), se usaron múltiples llamadas `curl` para interactuar con servidores MCP. Este protocolo **inicialmente** reportó herramientas como "no disponibles", lo cual era **INCORRECTO**.

### Corrección Aplicada

| Diagnóstico Original | Realidad |
|---------------------|----------|
| `stop_mcp_server` ❌ No expuesto | ✅ Requiere `activate_mcp_server_management_tools` |
| `restart_mcp_server` ❌ No expuesto | ✅ Requiere `activate_mcp_server_management_tools` |
| `launch_mcp_server` ❌ No expuesto | ✅ Requiere `activate_mcp_server_management_tools` |

---

## 2. Inventario de Llamadas curl

### 2.1 Llamadas al Launcher (puerto 3050)

| # | Comando | Método MCP | Propósito |
|---|---------|------------|-----------|
| 1 | `curl localhost:3050/health` | HTTP GET | Verificar que Launcher está vivo |
| 2 | `curl ... tools/list` | `tools/list` | Listar tools disponibles |
| 3 | `curl ... stop_mcp_server` | `tools/call` | Detener TypedPrompt server |
| 4 | `curl ... launch_mcp_server` | `tools/call` | Lanzar TypedPrompt server |

### 2.2 Llamadas al TypedPrompt (puerto 3020)

| # | Comando | Método MCP | Propósito |
|---|---------|------------|-----------|
| 5 | `curl ... resources/templates/list` | `resources/templates/list` | Verificar templates registrados |
| 6 | `curl ... resources/read schemas/1` | `resources/read` | TC-R02: Leer schema por ID |
| 7 | `curl ... resources/list` | `resources/list` | Listar resources estáticos |

---

## 3. Mapeo curl → MCP Tool en Chat

### 3.1 Tools del Launcher disponibles en VS Code

| Tool interno | Tool en Chat | Estado |
|--------------|--------------|--------|
| `launch_all_servers` | `mcp_launcher-serv_launch_all_servers` | ✅ Disponible |
| `health_check_servers` | `mcp_launcher-serv_health_check_servers` | ✅ Disponible |
| `check_port_availability` | `mcp_launcher-serv_check_port_availability` | ✅ Disponible |
| `generate_vscode_mcp_config` | `mcp_launcher-serv_generate_vscode_mcp_config` | ✅ Disponible |
| `stop_mcp_server` | `mcp_launcher-serv_stop_mcp_server` | ✅ Requiere `activate_mcp_server_management_tools` |
| `restart_mcp_server` | `mcp_launcher-serv_restart_mcp_server` | ✅ Requiere `activate_mcp_server_management_tools` |
| `launch_mcp_server` | `mcp_launcher-serv_launch_mcp_server` | ✅ Requiere `activate_mcp_server_management_tools` |

> **FE DE ERRATAS (2026-01-04)**: Ox reportó erróneamente estas herramientas como "no expuestas". En realidad están disponibles pero requieren activación explícita via `activate_mcp_server_management_tools()`. El patrón de activación lazy agrupa herramientas relacionadas para optimizar tokens del system prompt.

### 3.2 Métodos MCP sin tool equivalente

| Método | Razón | Alternativa |
|--------|-------|-------------|
| `resources/list` | Metadata, no acción | Panel Resources en VS Code |
| `resources/templates/list` | Metadata | Panel Resources |
| `resources/read` | Lectura de contenido | Adjuntar con `@` resource |
| `tools/list` | Discovery | VS Code lo hace automático |

---

## 4. Análisis de Eficiencia

### 4.1 Llamadas que podían ser MCP Tool

| Propósito | Método curl | Tool disponible | ¿Se usó? |
|-----------|-------------|-----------------|----------|
| Lanzar todos los servers | `launch_all_servers` | `mcp_launcher-serv_launch_all_servers` | ✅ Sí |
| Health check | `GET /health` | `mcp_launcher-serv_health_check_servers` | ❌ No |

**Ratio**: 1/2 (50%) de las llamadas que podían ser tools, usé tool.

### 4.2 Llamadas que NO podían ser MCP Tool

| # | Razón |
|---|-------|
| 4 | Stop/restart/launch individual no expuestos |
| 3 | Resources son metadata, no tools |

---

## 5. ~~Gap Identificado~~ Fe de Erratas

### 5.1 ~~Tools faltantes en Launcher~~ Error de Diagnóstico

> **CORRECCIÓN**: No hay gap. Ox no conocía el patrón de **activación lazy** de herramientas MCP.

Las herramientas `stop_mcp_server`, `restart_mcp_server` y `launch_mcp_server` **SÍ están disponibles** en VS Code Copilot Chat. Requieren invocar primero:

```typescript
activate_mcp_server_management_tools()
// Esto desbloquea:
// - mcp_launcher-serv_launch_mcp_server
// - mcp_launcher-serv_restart_mcp_server
// - mcp_launcher-serv_stop_mcp_server
```

### 5.2 Patrón de Activación Lazy

VS Code agrupa herramientas MCP en "familias" que se activan bajo demanda. Esto **optimiza tokens** del system prompt al no incluir todas las herramientas desde el inicio.

**Familias conocidas**:
- `activate_mcp_server_management_tools` → start/stop/restart servers
- `activate_browser_interaction_tools` → Playwright browser actions
- `activate_form_and_file_management_tools` → Playwright forms
- `activate_prolog_session_management_tools` → Prolog sessions

### 5.3 Lección Aprendida

Antes de reportar un gap de herramientas MCP, verificar si existe un `activate_*` correspondiente.

---

## 6. Punto Extra: Auto-Reflexión

### 6.1 Caché y Snapshot

| Aspecto | Resultado |
|---------|-----------|
| `get_latest_request()` | ✅ Recuperó toda la conversación |
| `capture_snapshot()` | ✅ Guardado en `COPILOT_SNAPSHOTS/` |
| Snapshot ID | `2026-01-04_20-04_resource-template-curl-vs-mcp` |
| Requests en caché | 1 (contenía 48+ tool calls) |

### 6.2 Flujo BP-06

Según el protocolo de auto-reflexión:

```
1. get_latest_request()     → Cachea conversación actual ✅
2. capture_snapshot()       → Persiste lo cacheado ✅
3. (opcional) generate_abstract() → No ejecutado
```

### 6.3 Limitación Observada

El caché de requests es **volátil** y **per-window**. Solo el snapshot persiste al filesystem y es compartido entre ventanas.

---

## 7. Resumen Ejecutivo

| Métrica | Valor | Nota |
|---------|-------|------|
| Total llamadas curl | 7 | |
| Podían ser MCP tool | 5 | ↑ (antes: 2) |
| Se usaron MCP tool | 1 | |
| ~~Gap de tools detectado~~ | ~~3~~ 0 | **Corregido**: activación lazy |
| Snapshot capturado | ✅ | |
| Conversación recuperable | ✅ | |

> **Lección**: El ratio "Podían ser MCP tool" es mayor de lo estimado. Las herramientas estaban disponibles pero Ox no conocía el patrón `activate_*`.

---

## 8. Acciones Derivadas

| Acción | Prioridad | Estado |
|--------|-----------|--------|
| ~~Exponer stop/restart/launch como tools MCP~~ | ~~Media~~ | ✅ Ya existen (activación lazy) |
| Documentar patrón `activate_*` para agentes | Alta | ✅ Añadido a ox.agent.md |
| Añadir conocimiento a ox.agent.md | Alta | ✅ Completado |
| Demostrar funcionamiento real | Alta | ✅ Verificado (ver §8.1) |

### 8.1 Demostración Exitosa (2026-01-04 20:30)

Se ejecutó ciclo completo **sin terminal** usando herramientas MCP:

| Operación | Tool | Resultado | PID |
|-----------|------|-----------|-----|
| Activar familia | `activate_mcp_server_management_tools` | ✅ 3 tools desbloqueadas | — |
| Launch | `mcp_launcher-serv_launch_mcp_server` | ✅ Success | 11412 |
| Stop | `mcp_launcher-serv_stop_mcp_server` | ✅ Success | — |
| Re-launch | `mcp_launcher-serv_launch_mcp_server` | ✅ Success | 13396 |
| Restart | `mcp_launcher-serv_restart_mcp_server` | ✅ Success | 3476 |

**Conclusión empírica**: Las herramientas funcionan correctamente. El diagnóstico original era un **falso positivo**.

---

## 9. Conclusión

> **El circuito MCP puede ejecutarse SIN terminal**. Las herramientas de lifecycle individual (stop/restart/launch) **SÍ están disponibles** via `activate_mcp_server_management_tools()`.

La "paranoia" de Ox sobre herramientas bloqueadas era un **falso positivo** por desconocimiento del patrón de activación lazy. Este protocolo queda como **fe de erratas** y ejemplo de auto-corrección.

El sistema de auto-reflexión demostró que la conversación es recuperable via logs, validando el protocolo BP-06.

---

## 10. Lección Internalizada

> **Patrón de Activación Lazy**: Antes de reportar un gap de herramientas MCP, verificar si existe un `activate_*` correspondiente.

Familias conocidas:
- `activate_mcp_server_management_tools` → launch/stop/restart
- `activate_browser_interaction_tools` → Playwright browser
- `activate_prolog_session_management_tools` → Prolog sessions

Esta lección queda documentada en:
- [ox.agent.md](.github/agents/ox.agent.md) § Lecciones Operativas
- [auto-reflexion.instructions.md](.github/plugins/scriptorium-pack/instructions/auto-reflexion.instructions.md) (pendiente)

---

**Firmado**: @ox  
**Fecha original**: 2026-01-04 20:10  
**Fecha corrección**: 2026-01-04 20:35  
**Verificación empírica**: ✅ Demostrado
