# Copilot: agentes, prompts e instrucciones

Este repositorio contiene un proyecto de escritura (no de software): un texto fundacional serializado en 12 capítulos durante 2026.

VS Code Copilot puede cargar **instrucciones**, **prompts** y **agentes** desde esta carpeta:
- Instrucciones globales: `.github/copilot-instructions.md`
- Instrucciones condicionadas: `.github/instructions/*.instructions.md`
- Prompts reutilizables: `.github/prompts/*.prompt.md`
- Agentes personalizados: `.github/agents/*.agent.md`

## Activación en VS Code (recomendado)
1. Activa el uso de archivos de instrucciones (Settings):
   - `github.copilot.chat.codeGeneration.useInstructionFiles: true`
2. (Opcional) Activa `AGENTS.md` si quieres instrucciones globales multi-agente:
   - `chat.useAgentsMdFile: true`

> Nota: según la documentación oficial, VS Code detecta automáticamente:
> - `.github/copilot-instructions.md`
> - `.github/prompts/*.prompt.md`
> - `.github/agents/*.agent.md`

# Carpeta canónica y nested
VS Code/Copilot Chat reconoce ubicaciones "canónicas" bajo `.github` (agents/prompts/instructions) y, salvo en el caso especial de `AGENTS.md` (que puede ser anidado de forma experimental), no hay un "anidado automático" de carpetas `.github` múltiples; lo habitual es centralizar o añadir rutas extra vía settings.[](https://code.visualstudio.com/docs/copilot/customization/custom-agents)​

Qué dice la documentación oficial
---------------------------------

-   Agentes custom (Custom agents): VS Code detecta los archivos `*.agent.md` que estén en `.github/agents` del workspace y los muestra en el selector de agentes (dropdown) de Copilot Chat.[](https://code.visualstudio.com/docs/copilot/customization/custom-agents)​

-   Prompt files: los `*.prompt.md` del workspace viven por defecto en `.github/prompts` y aparecen como comandos al teclear `/` en el chat (y también se pueden ejecutar desde Command Palette).[](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)​

-   Instructions:

    -   `.github/copilot-instructions.md` aplica instrucciones a todas las requests del workspace.[](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)​

    -   `*.instructions.md` (normalmente en `.github/instructions`) permite aplicar por patrón `applyTo` y también adjuntar manualmente desde "Add Context > Instructions".[](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)​

    -   `AGENTS.md` se usa como instrucciones "para agentes" y existe soporte para múltiples `AGENTS.md` en subcarpetas de forma experimental con un setting.[](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)​

¿Se pueden anidar instruction/prompt/agent?
-------------------------------------------

-   Agentes (`.agent.md`): la detección automática que documenta VS Code es por archivos `.md` en `.github/agents`; la doc no describe búsqueda recursiva ni "múltiples `.github/agents`" anidados.[](https://code.visualstudio.com/docs/copilot/customization/custom-agents)​

-   Prompts (`.prompt.md`): por defecto se toman de `.github/prompts`, pero la doc sí contempla añadir carpetas adicionales con el setting `chat.promptFilesLocations`.[](https://code.visualstudio.com/docs/copilot/customization/prompt-files)​

-   Instructions (`.instructions.md`): por defecto se usan las de `.github/instructions`, pero también se pueden añadir carpetas adicionales con `chat.instructionsFilesLocations`.[](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)​

-   `AGENTS.md`: es el único caso donde la documentación explica anidado/recursividad: con `chat.useNestedAgentsMdFiles` habilitado, VS Code busca `AGENTS.md` recursivamente en subcarpetas y añade su ruta relativa al contexto.[](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)​

Efecto en la UI y el uso
------------------------

-   Si pones "segundas" carpetas `.github/...` fuera de las ubicaciones por defecto, normalmente no aparecerán en la UI (ni agentes en el dropdown, ni prompts al `/`) salvo que uses los settings de "locations" cuando existan (prompts/instructions).[](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)​

-   Prompt files: al estar en carpetas incluidas (por defecto o vía `chat.promptFilesLocations`), aparecen en el chat al teclear `/` y se pueden ejecutar desde el selector/Quick Pick.[](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)​

-   Agentes: los agentes detectados en `.github/agents` aparecen en el dropdown; VS Code además permite ocultarlos/mostrarlos desde "Configure Custom Agents" (icono de ojo).[](https://code.visualstudio.com/docs/copilot/customization/custom-agents)​

-   Carpetas secundarias para `AGENTS.md`: si habilitas `chat.useNestedAgentsMdFiles`, no es que aparezcan "nuevos agentes" en la UI, sino que esas instrucciones pasan a formar parte del contexto disponible para que el agente decida qué aplicar según los archivos editados.[](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)​

-