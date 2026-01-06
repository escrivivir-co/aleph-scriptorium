# Catálogo de Especificaciones — PrologEditor

> **Versión**: 2.2.0  
> **Épicas**: PROLOG-DRY-1.0.0, TEATRO-PROLOG-1.0.0, DRAMATURGIA-MAQUINA-1.0.0  
> **Última actualización**: 2026-01-04  
> **Guía DRY**: [guia-arquitectura-mcp-stack.md](../../../../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md)

---

## Resumen

Este directorio contiene las especificaciones formales del sistema PrologEditor,
organizadas por estándar y caso de uso.

### Tipos de Especificaciones

| Tipo | Estándar | Propósito |
|------|----------|-----------|
| **Contratos API** | OpenAPI 3.1, AsyncAPI 3.0, MCP 1.0 | Contratos máquina-legibles |
| **Casos de Uso** | usecases/1.0.0 (propio) | Documentación de flujos por actor |

---

## Índice de Especificaciones

| Archivo | Estándar | Descripción | Versión |
|---------|----------|-------------|---------|
| [openapi.yaml](openapi.yaml) | OpenAPI 3.1 | REST API del Backend (SQLite + MCP Gateway) | 2.0.0 |
| [asyncapi.yaml](asyncapi.yaml) | AsyncAPI 3.0 | MQTT API para telemetría IoT | 1.0.0 |
| [dramaturgo-signals.asyncapi.yaml](dramaturgo-signals.asyncapi.yaml) | AsyncAPI 3.0 | Señales Sensor/Actuador (Ox→Lucas) | 1.0.0 |
| [mcpspec.yaml](mcpspec.yaml) | MCP 1.0 | Model Context Protocol Server (Prolog) | 2.0.0 |
| [usecases-ox-bridger.yaml](usecases-ox-bridger.yaml) | usecases/1.0.0 | Casos de uso: Setup del stack | 1.0.0 |
| [usecases-dramaturgo.yaml](usecases-dramaturgo.yaml) | usecases/1.0.0 | Casos de uso: Escribir obras | 1.0.0 |
| [usecases-agente-personaje.yaml](usecases-agente-personaje.yaml) | usecases/1.0.0 | Casos de uso: Agente en runtime | 1.0.0 |
| [usecases-usuario-final.yaml](usecases-usuario-final.yaml) | usecases/1.0.0 | Casos de uso: UI Angular (Developer/IoT) | 1.0.0 |

---

## Arquitectura Cubierta

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SPECS POR CAPA Y ACTOR                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐                                                        │
│  │    mcpspec      │ ← Model Context Protocol (12 tools, 6 resources)      │
│  │    (MCP 1.0)    │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│  ┌────────▼────────┐     ┌─────────────────┐                                │
│  │    openapi      │────►│   asyncapi      │                                │
│  │   (REST API)    │     │   (MQTT IoT)    │                                │
│  └────────┬────────┘     └─────────────────┘                                │
│           │                                                                 │
│  ┌────────▼────────────────────────────────────────────────────────────┐    │
│  │                      USE CASES (x-use-cases)                        │    │
│  ├────────────────┬────────────────┬────────────────┬──────────────────┤    │
│  │  ox-bridger    │  dramaturgo    │  agente-       │  usuario-final   │    │
│  │  (Setup)       │  (Escribir)    │  personaje     │  (UI Angular)    │    │
│  │  Actor: @ox    │  Actor: Human  │  Actor: IA     │  Actor: Dev/IoT  │    │
│  └────────────────┴────────────────┴────────────────┴──────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Detalle por Especificación

### openapi.yaml (OpenAPI 3.1)

**Propósito**: Documentar la REST API del backend PrologEditor.

**Endpoints principales**:
- `GET/POST /rules` - CRUD de reglas Prolog (SQLite)
- `POST /run-rule` - Ejecutar consulta Prolog
- `GET/POST /sessions` - Gestión de sesiones MCP
- `GET /sdk-templates` - Templates del SDK
- `GET /telemetry` - Estado IoT

**Servidores**:
- Local: `http://localhost:8000/api`

---

### asyncapi.yaml (AsyncAPI 3.0)

**Propósito**: Documentar la interfaz MQTT para telemetría IoT.

**Canales**:
- `sensor/temperature` - Lecturas de temperatura
- `sensor/humidity` - Lecturas de humedad
- `alerts/{severity}` - Alertas del motor Prolog
- `commands/{deviceId}` - Comandos a dispositivos

**Brokers**:
- Mosquitto: `localhost:1883` (MQTT)
- WebSocket: `localhost:9001` (MQTT over WS)

---

### mcpspec.yaml (MCP 1.0)

**Propósito**: Documentar el Model Context Protocol Server de Prolog.

**Tools** (12):
| Categoría | Tools |
|-----------|-------|
| Core (7) | create/list/destroy_session, query, assert_fact, consult_file, get_templates |
| Backend (5) | load/save_rules_from_db, list/get_sdk_templates, get_telemetry_status |

**Resources** (6):
- session-state, templates-catalog, active-sessions
- rules-catalog, sdk-templates, telemetry

**Prompts** (8):
- session_lifecycle, load_knowledge_base, interactive_query
- persist_rule, use_sdk_template, telemetry_check
- razonamiento_sbr, teatro_agent_session

---

### usecases-ox-bridger.yaml

**Propósito**: Casos de uso para el equipo de agentes Ox y bridges.

**Actores**: @ox, @pluginmanager, @indice

**Casos de Uso**:
| ID | Nombre | Descripción |
|----|--------|-------------|
| UC-OX-001 | Verificar Prerequisitos | Comprobar que el stack puede levantarse |
| UC-OX-002 | Levantar Stack Completo | Iniciar los 3 servicios en terminales |
| UC-OX-003 | Diagnosticar Estado | Healthcheck y reporte de issues |
| UC-OX-004 | Registrar MCP Server | Actualizar .vscode/mcp.json |
| UC-OX-005 | Crear Pack de Contexto | Configurar AgentPrologBrain pack |

---

### usecases-dramaturgo.yaml

**Propósito**: Casos de uso para dramaturgos que escriben obras.

**Actores**: Dramaturgo (humano), @plugin_ox_teatro, @plugin_ox_agentcreator

**Casos de Uso**:
| ID | Nombre | Descripción |
|----|--------|-------------|
| UC-DRAMA-001 | Crear Personaje con Brain | Generar .brain.pl desde template |
| UC-DRAMA-002 | Diseñar Reglas de Comportamiento | Usar BrainEditorComponent |
| UC-DRAMA-003 | Diseñar Escenas con Contextos | Definir transiciones de escena |
| UC-DRAMA-004 | Probar Obra Completa | Simular flujo E2E |
| UC-DRAMA-005 | Iterar Reglas según Feedback | Refinar basado en pruebas |

---

### usecases-agente-personaje.yaml

**Propósito**: Casos de uso para agentes personaje en runtime.

**Actores**: Agente Personaje (IA), Teatro Orquestador

**Casos de Uso**:
| ID | Nombre | Descripción |
|----|--------|-------------|
| UC-AGENT-001 | Iniciar Sesión de Personaje | Setup completo con brain |
| UC-AGENT-002 | Tomar Decisión en Escena | Query decidir_accion/2 |
| UC-AGENT-003 | Reaccionar a Evento Externo | Procesar eventos y re-evaluar |
| UC-AGENT-004 | Interactuar con Otro Personaje | Comunicación entre personajes |
| UC-AGENT-005 | Persistir Estado | Guardar en SQLite para continuidad |
| UC-AGENT-006 | Cerrar Sesión | Cleanup de recursos |

---

### usecases-usuario-final.yaml

**Propósito**: Casos de uso para usuarios finales interactuando con la UI Angular.

**Actores**: Developer, IoT Engineer, Usuario Final

**Casos de Uso (Developer)**:
| ID | Nombre | Componente |
|----|--------|------------|
| UC-DEV-001 | Crear y Gestionar Sesiones | SessionManagerComponent |
| UC-DEV-002 | Escribir y Ejecutar Reglas | RuleEditorComponent |
| UC-DEV-003 | Gestionar Reglas por App | RuleListComponent |
| UC-DEV-004 | Cargar Conocimiento | KnowledgeBaseComponent |
| UC-DEV-005 | Explorar Templates MCP | McpTemplatesBrowserComponent |
| UC-DEV-006 | Guardar Aplicación | UserAppSaveDialogComponent |

**Casos de Uso (IoT Engineer)**:
| ID | Nombre | Componente |
|----|--------|------------|
| UC-IOT-001 | Procesar Telemetría | TelemetryProcessComponent |
| UC-IOT-002 | Monitorear Estado | TelemetryMonitorComponent |

**Workflows Completos**:
| ID | Nombre | Duración |
|----|--------|----------|
| UC-FULL-001 | Workflow Completo IoT | ~5 min |
| UC-FULL-002 | Workflow Completo Development | ~10 min |

---

## Relación con Guía de Arquitectura

Estas specs están documentadas en:
- [guia-arquitectura-mcp-stack.md](../../../../ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_02_PrologAgentPack/guia-arquitectura-mcp-stack.md) § Referencias

La guía referencia este directorio como fuente de verdad para contratos.

---

## Validación

Para validar las specs:

```bash
# OpenAPI
npx @redocly/cli lint openapi.yaml

# AsyncAPI
npx @asyncapi/cli validate asyncapi.yaml

# MCP (custom schema)
# No hay validador estándar, verificar manualmente contra https://modelcontextprotocol.io
```

---

## Changelog

| Fecha | Versión | Cambios |
|-------|---------|---------|
| 2026-01-03 | 2.0.0 | Añadir mcpspec.yaml y 3 specs de use cases |
| 2026-01-02 | 1.0.0 | Crear openapi.yaml y asyncapi.yaml iniciales |
