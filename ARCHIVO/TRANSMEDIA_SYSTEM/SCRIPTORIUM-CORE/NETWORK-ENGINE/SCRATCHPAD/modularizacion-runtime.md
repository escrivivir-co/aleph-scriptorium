# Oportunidades de Modularización para `runtime.ts`

El archivo `packages/mcp-runtime/src/runtime.ts` (con ~430 líneas) maneja todas las primitivas del Model Context Protocol en un solo bloque. Hay una excelente oportunidad para modularizarlo dividiéndolo por dominios, moviéndolo a su propia carpeta `packages/mcp-runtime/src/runtime/`.

## Arquitectura Propuesta

```text
packages/mcp-runtime/src/runtime/
├── index.ts        # Orquestador (createMCPRuntime) y re-exportación de la API pública.
├── types.ts        # Interfaces: MCPRuntimeOptions, MCPRuntimeHandlers, etc.
├── utils.ts        # Helpers genéricos: now(), toRecord(), extractUri().
├── tools.ts        # Lógica de Tools: registerTool, executeTool, acceptedToolResult.
├── prompts.ts      # Lógica de Prompts: registerPrompt, getPrompt, defaultPromptResult.
└── resources.ts    # Lógica de Resources: registerResource, readResource, defaultResourceResult.
```

## ¿Por qué hacerlo?

1. **Separación de Responsabilidades:** Actualmente `createMCPRuntime` es una mega-función de 270 líneas llena de *closures*. Separar la lógica de herramientas, prompts y recursos hará el código mucho más legible.
2. **Inyección de Dependencias Limpia:** Funciones internas como `registerTool` o `readResource` están fuertemente acopladas al estado local (`events`, `toolMap`, `handlers`). Al modularizar, estas funciones recibirán dependencias explícitamente, facilitando el testing aislado.
3. **Escalabilidad Futura:** Si el estándar MCP o el ecosistema Aleph introducen nuevas capacidades, simplemente se añade un nuevo archivo sin inflar el monolito.

## Consideraciones de la Refactorización

Para mantener la emisión de eventos reactivos (`events.next`) sin perder el contexto, las funciones extraídas deberán inyectarse con un "contexto de runtime" que incluya:
- El bus de eventos (`Subject`)
- Los diccionarios (`resourceMap`, `promptMap`, `toolMap`)
- Los `handlers` definidos por el usuario

Dime si quieres que prepare un plan de implementación (Implementation Plan) o si procedo directamente a realizar esta modularización.
