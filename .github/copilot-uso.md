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
