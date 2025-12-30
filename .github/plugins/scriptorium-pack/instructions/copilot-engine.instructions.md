# Instrucciones: CopilotEngine (System Messaging)

> **Plugin**: scriptorium-pack  
> **Épica**: SCRIPT-1.31.0  
> **Propósito**: Guiar la investigación del flujo de prompts en VS Code Copilot Chat

---

## Fuente de Datos

El submódulo `CopilotEngine/` contiene el código fuente de VS Code Copilot Chat.

**Archivos clave**:
| Archivo | Propósito |
|---------|-----------|
| `src/extension/prompts/node/agent/promptRegistry.ts` | Registro de prompts por modelo |
| `src/extension/prompts/node/agent/defaultAgentInstructions.tsx` | System message base |
| `src/extension/prompts/node/agent/anthropicPrompts.tsx` | Prompts para Claude |
| `src/extension/prompts/node/agent/openai/*.tsx` | Prompts para GPT-4/5 |
| `src/extension/prompts/node/agent/geminiPrompts.tsx` | Prompts para Gemini |

---

## Flujo de Resolución de Prompts

```
1. Usuario escribe mensaje
       │
       ▼
2. VS Code obtiene IChatEndpoint (info del modelo)
       │
       ▼
3. PromptRegistry.resolveAllCustomizations(endpoint)
       │
       ├── matchesModel(endpoint) → Busca por función
       │
       └── familyPrefixes → Busca por prefijo ("claude", "gpt-4", etc.)
       │
       ▼
4. Instancia AgentPromptClass específica del modelo
       │
       ▼
5. Resuelve componentes:
   - SystemPrompt (instrucciones base)
   - ReminderInstructions (recordatorios)
   - ToolReferencesHint (hints de tools)
   - CopilotIdentityRules (identidad)
   - SafetyRules (seguridad)
       │
       ▼
6. Render TSX → XML con <Tag name="...">
       │
       ▼
7. Envía a LLM: System + User + Context + Tools
```

---

## Estructura del System Message

El prompt se construye con componentes TSX:

```tsx
<InstructionMessage>
  <Tag name='instructions'>
    You are a highly sophisticated automated coding agent...
  </Tag>
  <Tag name='toolUseInstructions'>
    When using a tool, follow the JSON schema...
  </Tag>
  <Tag name='notebookInstructions'>
    Use run_notebook_cell instead of jupyter commands...
  </Tag>
  <Tag name='outputFormatting'>
    Use proper Markdown formatting...
  </Tag>
</InstructionMessage>
```

---

## Diferencias por Modelo

| Modelo | Clase | Diferencia principal |
|--------|-------|---------------------|
| **Claude** | `DefaultAnthropicAgentPrompt` | Sin "keep going" reminder |
| **GPT-4/4o** | `DefaultOpenAIAgentPrompt` | Incluye "keep going" reminder |
| **GPT-5** | `GPT5AgentPrompt` | ApplyPatch preferido |
| **Gemini** | `DefaultGeminiAgentPrompt` | Sin "keep going" reminder |
| **Grok** | `XAIPrompts` | Similar a OpenAI |

### "Keep Going" Reminder (solo OpenAI)

```
You are an agent - you must keep going until the user's query 
is completely resolved, before ending your turn and yielding 
back to the user.
```

---

## Mapeo a Agentes del Scriptorium

| CopilotEngine | Scriptorium |
|---------------|-------------|
| `IAgentPrompt` | `.github/agents/*.agent.md` |
| `familyPrefixes` | N/A (modelo único) |
| `<Tag name='instructions'>` | Sección "Rol" del agente |
| `tools: [...]` | `tools: [...]` en frontmatter |
| `<Tag name='reminderInstructions'>` | `.instructions.md` |
| `PromptRegistry` | `chat.promptFilesLocations` |

---

## Cuándo Usar Esta Fuente

| Caso de uso | Archivo a consultar |
|-------------|---------------------|
| "¿Cómo se construye el system message?" | `defaultAgentInstructions.tsx` |
| "¿Qué diferencia hay entre Claude y GPT?" | Comparar `anthropicPrompts.tsx` vs `openai/` |
| "¿Cómo se registran los prompts?" | `promptRegistry.ts` |
| "¿Qué tools están disponibles?" | `src/extension/tools/common/toolNames.ts` |
| "¿Cómo se manejan los notebooks?" | Buscar `NotebookInstructions` |

---

## Prompt de Investigación

Para analizar un flujo específico:

```
@ox analizar flujo copilot para @{agente} con modelo {modelo}
```

Esto usa `analizar-flujo-copilot.prompt.md` en scriptorium-pack.

---

## Referencias

- Análisis completo: `ARCHIVO/DEVOPS/analisis-copilot-engine.md`
- Backlog: `ARCHIVO/DISCO/BACKLOG_BORRADORES/COPILOT_ENGINE/01_backlog-borrador.md`
- Submódulo: `CopilotEngine/README-SCRIPTORIUM.md`
