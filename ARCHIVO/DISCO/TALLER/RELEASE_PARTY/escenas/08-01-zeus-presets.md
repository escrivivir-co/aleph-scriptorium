# ⚡ ESCENA 08-01: Diseñando el contexto

> **Capítulo**: 8 — La Ordalía  
> **Tema**: Zeus y los Presets  
> **Slide Principal**: paso8-po  
> **Demo**: `http://localhost:4001`

---

## ESCENA

*La interfaz de Zeus. Paneles con JSON, sliders, toggles.*

**OX**:  
*(navegando la UI)*  
Aquí es donde ocurre la magia, Clippy.

**CLIPPY**:  
¿Qué es esto?

**OX**:  
Zeus. El gestor de presets del Scriptorium.  
Cada preset es un "Context Pack".  
Una receta que dice: "Para esta tarea, usa estas instrucciones".

*Zeus muestra una lista de packs.*

```json
{
  "context-packs": [
    {
      "id": "blueprint",
      "instrucciones_activas": ["gh-pages", "blueprint-templates"],
      "instrucciones_desactivadas": ["scrum", "teatro", "periodico"]
    },
    {
      "id": "scrum",
      "instrucciones_activas": ["scrum-workflow", "scrum-protocol"],
      "instrucciones_desactivadas": ["blueprint-templates", "gh-pages"]
    },
    {
      "id": "full",
      "instrucciones_activas": ["*"],
      "instrucciones_desactivadas": []
    }
  ]
}
```

**CLIPPY**:  
*(entendiendo)*  
Entonces... en vez de cargar TODO siempre...

**OX**:  
Cargas solo lo que necesitas.  
De 127K tokens a 30K.  
76% de reducción.

**CLIPPY**:  
¡Eso es como ir de un documento Word con todas las fuentes...  
A uno con solo Arial y Times New Roman!

**OX**:  
*(riendo)*  
Exacto. A veces, menos es más.

*FUNDIDO*

---

## NOTAS PARA SLIDES ADYACENTES

### paso8-ox (↑ arriba)
**API/SDK disponibles**:
```
mcp-core-sdk/    # SDK base de MCP
mcp-mesh-sdk/    # Arquitectura mesh
mcp-model-sdk/   # Gestión de modelos

# Tools del DevOps Server (:3003)
mcp_devops-mcp-se_get_prompt()
mcp_devops-mcp-se_list_prompts()
mcp_devops-mcp-se_add_prompt()
```

### paso8-aleph (↙ abajo-izquierda)
**Templates para crear agentes propios**:
```yaml
# .github/agents/mi-agente.agent.md
---
name: MiAgente
description: "Descripción del agente"
tools: ['vscode', 'read', 'edit']
handoffs:
  - label: Acción principal
    agent: MiAgente
    prompt: "..."
---
```

### paso8-sm (↘ abajo-derecha)
**Release v1.0.0-beta.1**:
- Épicas: 6 cerradas
- Puntos: ~57 pts
- Fecha: 30 diciembre 2025
- Próximo: FC1 (Q1 2026)

---

## TRANSICIÓN

*Clippy contempla los presets, maravillado.*

**CLIPPY**:  
"El contexto se puede diseñar, no sufrir.  
Es como... elegir qué herramientas llevar a cada trabajo."

**OX**:  
"Y ahora que entiendes esto...  
Es hora de ver el mapa completo."

→ **Siguiente**: Escena 09-01 (Roadmap y Galería)
