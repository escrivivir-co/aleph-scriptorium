# Prompt: Consultar Índice

## Instrucción

Cuando el usuario pregunte "¿Dónde está X?" o "¿Cómo hago Y?", consulta los índices DRY para responder rápidamente.

---

## Fuentes

| Índice | Ruta | Cuándo usar |
|--------|------|-------------|
| **Funcional** | `ARCHIVO/DEVOPS/Funcional.md` | Capacidades, flujos, invocaciones |
| **Técnico** | `ARCHIVO/DEVOPS/Tecnico.md` | Arquitectura, ontología, estructura |

---

## Procedimiento

### Paso 1: Clasificar la pregunta

| Tipo de pregunta | Índice a consultar |
|------------------|-------------------|
| "¿Qué agente uso para...?" | Funcional |
| "¿Dónde creo...?" | Técnico |
| "¿Cómo invoco...?" | Funcional |
| "¿Qué estructura tiene...?" | Técnico |
| "¿Qué plugins hay?" | Técnico |
| "¿Qué puedo hacer con...?" | Funcional |

### Paso 2: Buscar en el índice

1. Leer el archivo correspondiente
2. Buscar la sección relevante
3. Extraer la ruta o comando

### Paso 3: Responder con formato

```markdown
**Respuesta**: [descripción breve]

**Ruta**: `[ruta exacta]`

**Ver**: [enlace a documentación detallada si existe]
```

---

## Ejemplos

### Ejemplo 1: Pregunta funcional

**Usuario**: ¿Qué agente uso para publicar en la web?

**Respuesta**:
```
**Agente**: @plugin_ox_ghpages

**Invocación**: @aleph → [GH-PAGES] Publicar en web

**Ver**: `.github/plugins/gh-pages/manifest.md`
```

### Ejemplo 2: Pregunta técnica

**Usuario**: ¿Dónde creo las instrucciones de un nuevo plugin?

**Respuesta**:
```
**Ruta**: `.github/plugins/{id}/instructions/{id}.instructions.md`

**Formato**: Frontmatter YAML con name, description, applyTo

**Ver**: `.github/PLUGINS.md` § Estructura de un Plugin
```

### Ejemplo 3: Pregunta mixta

**Usuario**: ¿Cómo creo un agente especializado y lo despliego?

**Respuesta**:
```
**Flujo completo** (ver Funcional.md § Flujos):

1. Crear receta: @plugin_ox_agentcreator
2. Generar agente: AGENT_CREATOR/agents/created/
3. Desplegar en Teatro: @plugin_ox_argboard

**Ver**: `.github/plugins/agent-creator/prompts/`
```

---

## Si no encuentras la respuesta

1. Indicar que no está en los índices
2. Sugerir dónde buscar manualmente
3. Proponer añadir al índice si es información útil

```markdown
**No encontrado en índices**

Sugerencia: Buscar en:
- `.github/PLUGINS.md` para plugins
- `.github/DEVOPS.md` para protocolo
- `@ox` para índice completo de agentes

¿Deseas que añada esta información al índice?
```
