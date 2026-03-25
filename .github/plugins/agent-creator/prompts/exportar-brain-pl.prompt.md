---
name: Exportar Cerebro Prolog
description: Genera un archivo .brain.pl con reglas de comportamiento para un agente/personaje
mode: agent
tools: ['read', 'edit', 'search']
---

# Exportar Cerebro Prolog

Genera un archivo `.brain.pl` con reglas de comportamiento Prolog para un personaje del Teatro.

## Parámetros Requeridos

- **nombre_agente**: Nombre del agente (ej: "lucas", "ox", "yellowflag")
- **obra_id**: Identificador de la obra (ej: "itaca_digital", "hola_mundo")
- **rol**: Rol en el Scriptorium (ej: "scrum_master", "auditor", "productor")
- **especialidad**: Área de expertise (ej: "gestion_indices", "validacion_verdad")

## Proceso

1. **Leer template**: `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/brain.pl.template`

2. **Analizar agente base**: Si existe `{nombre_agente}.agent.md`, extraer:
   - Descripción → conocimientos base
   - Handoffs → reglas de delegación
   - Tests de auditoría → predicados de validación

3. **Generar archivo**: Reemplazar placeholders:
   - `{{AGENT_NAME}}` → Nombre capitalizado
   - `{{agent_name}}` → Nombre en minúsculas
   - `{{OBRA_ID}}` → ID de obra
   - `{{rol}}` → Rol del agente
   - `{{especialidad}}` → Especialidad
   - `{{DATE}}` → Fecha actual

4. **Añadir reglas específicas**: Basadas en el agente base

5. **Guardar en**: `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/{nombre}.brain.pl`

## Salida Esperada

```prolog
%% Cerebro Prolog: {Nombre}
:- module(brain_{nombre}, [...]).

rol({nombre}, {rol}).
especialidad({nombre}, {especialidad}).

decidir_accion({nombre}, Accion) :-
    contexto(Contexto),
    regla_para(Contexto, Accion).
```

## Ejemplo de Uso

```
@agent-creator exportar cerebro lucas para obra itaca_digital
```

## Post-Exportación

El cerebro generado se puede:
1. Consultar en MCPPrologServer: `prolog_consult_file`
2. Incluir en pack de obra: `ObraX.pack.json`
3. Ejecutar queries: `prolog_query` con sesión activa

## Referencia

- Template: `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/brain.pl.template`
- Ejemplo: `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/lucas.brain.pl`
- Prompt MCP: `teatro_agent_session` (MCPPrologServer)
