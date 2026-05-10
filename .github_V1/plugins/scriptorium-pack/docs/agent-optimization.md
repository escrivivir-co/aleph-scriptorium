# Arquitectura de Agentes Optimizados

> **Épica**: SCRIPT-1.29.0 (Fase 2)  
> **Fecha**: 2025-12-28  
> **Propósito**: Documentar el patrón de optimización aplicado a agentes core

---

## Problema Original

Los agentes core (`ox.agent.md`, `aleph.agent.md`, `indice.agent.md`) tenían:

| Archivo | Líneas antes | Problema |
|---------|--------------|----------|
| ox.agent.md | 632 | Índice JSON completo duplicado |
| aleph.agent.md | 389 | Protocolo DevOps completo duplicado |
| indice.agent.md | 219 | Tests y ejemplos extensos |
| **Total** | **1,240** | ~30K tokens por request |

Cuando estos agentes aparecían en handoffs o eran invocados, se inyectaban completos al contexto del modelo.

---

## Solución: Patrón isSummarized

### Principio

> Los primeros 50-100 líneas de cualquier agente deben ser auto-contenidos y útiles sin leer el resto.

### Estructura Optimizada

```markdown
---
# Frontmatter: Solo handoffs esenciales (máximo 10)
name: NombreAgente
description: "Una línea"
handoffs:
  - label: Handoff principal 1
    agent: Target1
    ...
---

# Agente: Nombre

> **Resumen**: Una línea describiendo el rol.

## Capacidades Core
→ Tabla 3-5 capacidades esenciales

## Referencias DRY
→ Enlaces a documentos centralizados:
   - AGENTS.md (índice de agentes)
   - DEVOPS.md (protocolo)
   - Funcional.md / Tecnico.md

## Flujo de Trabajo
→ Diagrama ASCII simple
```

---

## Resultados

| Archivo | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| ox.agent.md | 632 | 131 | **79%** |
| aleph.agent.md | 389 | 140 | **64%** |
| indice.agent.md | 219 | 98 | **55%** |
| **Total** | **1,240** | **369** | **70%** |

**Impacto en tokens**:
- Antes: ~30K tokens cuando se inyectan agentes core
- Después: ~9K tokens + referencias DRY
- **Reducción**: ~21K tokens por request

---

## Artefactos Creados

### 1. AGENTS.md (Índice Centralizado)

**Ubicación**: `.github/agents/AGENTS.md`

Contiene:
- Taxonomía completa por capas
- Tabla de agentes con rol e invocación
- Handoffs por agente (lista completa)
- Cuándo usar cada agente

**Beneficio**: El modelo lee UN archivo en lugar de 15+ archivos de agentes.

### 2. agent-handoffs.instructions.md

**Ubicación**: `.github/plugins/scriptorium-pack/instructions/agent-handoffs.instructions.md`

**applyTo**: `.github/agents/*.agent.md, .github/agents/AGENTS.md`

Contiene:
- Cómo navegar handoffs
- Patrón de frontmatter
- Cuándo crear nuevos handoffs

---

## Reglas de Mantenimiento

### Al Crear un Nuevo Agente

1. Seguir patrón isSummarized (<100 líneas)
2. Añadir entrada en AGENTS.md
3. Limitar handoffs en frontmatter a los esenciales
4. Validar con `@ox diagnosticar agentes`

### Al Modificar Handoffs

1. Si es handoff principal → actualizar frontmatter del agente
2. Actualizar AGENTS.md § Handoffs
3. NO duplicar descripción larga en ambos lugares

### Referencias DRY

| Información | Documento canónico |
|-------------|-------------------|
| Índice de agentes | AGENTS.md |
| Protocolo DevOps | DEVOPS.md |
| Navegación funcional | Funcional.md |
| Arquitectura técnica | Tecnico.md |
| Optimización contexto | context-optimization.md |

---

## Validación

```bash
# Contar líneas de agentes core
wc -l .github/agents/{ox,aleph,indice}.agent.md

# Target: <100 líneas cada uno (excepto bridges de plugins)
```

Para verificar coherencia:
- `@ox diagnosticar agentes` — handoffs rotos
- `@indice validar pre-commit` — coherencia índices
