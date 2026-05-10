---
applyTo: ".github/agents/*.agent.md,.github/agents/AGENTS.md"
---

# Instrucciones: Navegación de Handoffs entre Agentes

> **Plugin**: scriptorium-pack (SCRIPT-1.29.0)  
> **Propósito**: Guiar la navegación eficiente de handoffs al editar agentes

---

## Índice Centralizado

→ **[AGENTS.md](../../agents/AGENTS.md)** contiene:
- Taxonomía completa por capas (UI/Backend/Sistema/Meta/Plugins)
- Tabla de handoffs por agente
- Cuándo usar cada agente

**Regla DRY**: NO duplicar información de handoffs en cada agente. Referenciar AGENTS.md.

---

## Patrón de Handoffs en Frontmatter

```yaml
handoffs:
  - label: "Descripción corta del handoff"
    agent: NombreAgente
    prompt: "Instrucción para el agente destino"
    send: false  # true = auto-enviar, false = mostrar en sugerencias
```

---

## Cuándo Crear un Handoff

| Situación | Acción |
|-----------|--------|
| El agente necesita capacidad de otra capa | Crear handoff al agente especializado |
| Necesita acceso a plugin | Crear handoff al bridge `@plugin_ox_*` |
| Es delegación frecuente | Añadir en frontmatter |
| Es delegación rara | Documentar en AGENTS.md, no en frontmatter |

---

## Estructura de Agente Optimizada

Los agentes core siguen el **patrón isSummarized**:

```markdown
---
# Frontmatter: Solo handoffs principales (máximo 10)
---

# Agente: Nombre

> **Resumen**: Una línea describiendo el rol.

## Capacidades Core
→ Tabla 3-5 capacidades esenciales

## Referencias DRY
→ Enlaces a AGENTS.md, DEVOPS.md, etc.

## Flujo de Trabajo
→ Diagrama simple de uso típico
```

**Target**: <100 líneas por agente core

---

## Flujo de Navegación

```
Usuario quiere saber handoffs de @aleph
       │
       ├── Opción 1: Leer frontmatter del agente
       │             (solo principales)
       │
       └── Opción 2: Consultar AGENTS.md § @aleph
                     (lista completa)
```

---

## Validación

Al modificar handoffs:
1. `@ox diagnosticar agentes` — Detecta handoffs rotos
2. `@indice validar pre-commit` — Coherencia con índices
