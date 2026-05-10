---
name: Teatro Razonar Personaje
description: Wrapper para invocar el prompt MCP teatro_agent_session de forma simplificada
mode: agent
tools: ['agent', 'mcp']
---

# Teatro: Razonar con Personaje

Invoca el prompt `teatro_agent_session` del MCPPrologServer para que un personaje tome decisiones usando su cerebro Prolog.

## Parámetros

| Parámetro | Requerido | Descripción | Ejemplo |
|-----------|-----------|-------------|---------|
| `personaje` | ✅ | Nombre del personaje | `lucas` |
| `obra` | ✅ | ID de la obra activa | `itaca_digital` |
| `contexto` | ❌ | Contexto actual (opcional) | `buscar_informacion` |

## Uso

```
@plugin_ox_teatro razonar lucas en itaca_digital
@arrakis turno-razonar lucas
```

## Flujo Interno

1. **Verificar pack**: Leer `ARCHIVO/PLUGINS/TEATRO/packs/Obra{Obra}.pack.json`
2. **Buscar personaje**: Encontrar entry con `name` = `{personaje}`
3. **Preparar sesión**: Si no existe, crear con `prolog_create_session`
4. **Cargar cerebro**: `prolog_consult_file` con `brainFile` del personaje
5. **Cambiar contexto** (si se proporciona):
   ```prolog
   cambiar_contexto({contexto}).
   ```
6. **Ejecutar query**:
   ```prolog
   decidir_accion({personaje}, Accion).
   ```
7. **Retornar acción**: La acción que el personaje decide tomar

## Ejemplo Completo

```
Usuario: @plugin_ox_teatro razonar lucas en itaca_digital con contexto validar_pre_commit

Teatro:
1. Carga pack ObraItacaDigital
2. Encuentra lucas → brains/lucas.brain.pl
3. Crea sesión itaca_lucas_session
4. Consulta cerebro
5. Ejecuta: cambiar_contexto(validar_pre_commit)
6. Query: decidir_accion(lucas, A)
7. Resultado: A = ejecutar_5_tests

Respuesta: "Lucas decide: ejecutar_5_tests"
```

## Mapeo de Acciones a Handoffs

| Acción Prolog | Handoff Sugerido |
|---------------|------------------|
| `consultar_indice` | `@indice consultar` |
| `consultar_funcional` | `@indice funcional` |
| `ejecutar_tests` | `@indice validar` |
| `invocar_aleph` | `@aleph` |
| `invocar_banderas` | `@blueflag` / `@yellowflag` |
| `delegar_ox` | `@ox` |
| `escalar_a_ox` | `@ox diagnosticar` |

## Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Pack not found` | No existe pack para la obra | Crear con `obra-pack.schema.json` |
| `Brain file not found` | No existe `.brain.pl` | Exportar con `@agent-creator exportar cerebro` |
| `Session error` | MCPPrologServer no disponible | Verificar puerto 3006 |
| `No matching rule` | Contexto sin regla definida | Añadir `regla_para({contexto}, accion)` al cerebro |

## Referencias

- Pack schema: `ARCHIVO/PLUGINS/TEATRO/schemas/obra-pack.schema.json`
- Template cerebro: `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/brain.pl.template`
- Prompt MCP: `teatro_agent_session` en MCPPrologServer
