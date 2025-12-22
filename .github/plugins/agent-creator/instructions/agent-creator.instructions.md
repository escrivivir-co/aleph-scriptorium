---
name: Agent Creator (instrucciones)
description: Instrucciones para el plugin de creación de agentes especializados.
applyTo: "ARCHIVO/PLUGINS/AGENT_CREATOR/**/*.md, .github/plugins/agent-creator/**/*.md"
---

# Instrucciones: Plugin Agent Creator

## Propósito

El plugin Agent Creator permite crear agentes especializados combinando:
1. **Agentes base**: Metodología y perspectiva
2. **Fuentes de datos**: Conocimiento específico de DISCO/ARCHIVO

## Principios de diseño

### 1. No modificar agentes core

Los agentes del sistema (`yellowflag`, `blueflag`, etc.) son **inmutables**. Para extenderlos:
- Crear un agente derivado en `agents/created/`
- El derivado hereda del core + añade especialización
- El handoff "Volver a agente base" permite acceder al core puro

### 2. Conexión explícita de fuentes

Cada fuente conectada debe declararse explícitamente:
```markdown
## Fuentes de Verdad

### Metodológicas (heredadas)
- `ARCHIVO/marco/14-gnosis-politica.md` (de yellowflag)

### Temáticas (conectadas)
- `DISCO/Foro_t8941392/` — Criterio de demarcación, Popper, sincronicidades
  - Estado: 1/51 páginas
  - Conceptos clave: [...]
```

### 3. Handoffs bidireccionales

Si la fuente es un scraping activo:
- El agente puede pedir más datos → ForoScraper
- El agente informa de sus limitaciones al usuario

### 4. Recetas reproducibles

Cada agente creado genera una receta en `recipes/`:
```json
{
  "name": "demarcacion-yellowflag",
  "version": "1.0.0",
  "created_at": "2025-12-22T12:00:00Z",
  "agentes_base": ["yellowflag"],
  "fuentes_datos": [
    {
      "ruta": "DISCO/Foro_t8941392/",
      "tipo": "scraping",
      "job_id": "Foro-t8941392",
      "paginas_usadas": [1]
    }
  ],
  "especialidad": "Criterio de demarcación científica"
}
```

## Estructura de un agente creado

```markdown
---
name: {nombre}
description: "{descripción}"
argument-hint: "{hint}"
tools: [heredados]
handoffs: [heredados + específicos]
---

# Agente: {Nombre}

**Rol:** {Rol heredado} + Especialista en {especialidad}
**Agente(s) base:** {lista}
**Fuentes conectadas:** {lista}

---

## System Prompt

{System prompt FUSIONADO:
- Metodología del agente base
- Especialización hacia la temática
- Ejemplos/conceptos de las fuentes}

---

## Fuentes de Verdad

### Metodológicas (heredadas)
{Del agente base}

### Temáticas (conectadas)
{De las fuentes de datos}

---

## Tests de Auditoría

### Heredados
{Del agente base}

### Específicos
{Nuevos tests basados en la especialidad}

---

## Conocimiento de la Fuente

### Conceptos clave
{Extraídos de las fuentes}

### Autores/Referencias
{Mencionados en las fuentes}

### Preguntas que sé responder
{Basadas en el contenido disponible}

### Limitaciones
{Páginas faltantes, temas no cubiertos}
```

## Integración con FORO_SCRAPER

### Detección de scraping activo

Al conectar una fuente de DISCO/:
1. Buscar en `ARCHIVO/PLUGINS/FORO_SCRAPER/jobs/` un job relacionado
2. Leer `state.json` para conocer estado
3. Informar al usuario: "Esta fuente tiene X de Y páginas"

### Handoff para más datos

```yaml
- label: Solicitar más páginas
  agent: ForoScraper
  prompt: |
    Reanudar job {job_id} para descargar más páginas.
    El agente {nombre} necesita más contexto sobre {tema}.
  send: false
```

### Actualización incremental

Cuando se añaden páginas:
1. El agente puede re-analizarse
2. Se actualizan conceptos y limitaciones
3. Se registra en la receta qué páginas se usaron

## Ubicación de archivos

```
ARCHIVO/PLUGINS/AGENT_CREATOR/
├── agents/
│   └── created/           # Agentes generados
│       └── {nombre}.agent.md
├── recipes/               # Recetas reproducibles
│   └── {nombre}.recipe.json
└── logs/
    └── creation-log.json  # Historial de creaciones
```

## Limitaciones

- **No modifica agentes core**: Solo crea derivados
- **Una especialización por agente**: Para múltiples, crear varios derivados
- **Fuentes deben existir**: No crea fuentes, solo las conecta
- **Scraping asíncrono**: Pedir más datos no es instantáneo
