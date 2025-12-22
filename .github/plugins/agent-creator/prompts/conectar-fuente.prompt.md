---
agent: 'agent'
description: 'Conecta una fuente de datos a un agente existente'
tools: ['read', 'edit', 'search']
---

# Conectar Fuente de Datos

## Objetivo

Añadir una nueva fuente de conocimiento (DISCO/ARCHIVO) a un agente sin recrearlo completamente.

## Flujo

### Paso 1: Seleccionar agente destino

```
¿A qué agente quieres conectar la fuente?

Agentes disponibles:
- Core: @yellowflag, @blueflag, @blackflag, @redflag, @orangeflag
- Creados: [listar de ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/]
```

### Paso 2: Seleccionar fuente

```
¿Qué fuente quieres conectar?

Tipo de fuente:
1. Carpeta de DISCO/ (scraping, transcripciones)
2. Documento específico de ARCHIVO/
3. Carpeta completa de ARCHIVO/

Fuentes de scraping disponibles:
[listar jobs activos de FORO_SCRAPER]
```

### Paso 3: Analizar fuente

Extraer de la fuente:
- Conceptos clave
- Autores mencionados
- Preguntas que responde
- Formato del contenido

Si es scraping activo:
- Estado del job
- Páginas descargadas vs. totales
- Última actualización

### Paso 4: Tipo de conexión

```
¿Cómo quieres conectar esta fuente?

1. Referencia estática: El agente conoce el contenido actual
2. Referencia dinámica: El agente puede pedir más datos al Scraper
3. Anexo temático: Solo para consultas específicas sobre el tema
```

### Paso 5: Generar conexión

**Para agentes creados:**
- Modificar el archivo `.agent.md` directamente
- Añadir a sección "Fuentes de Verdad"
- Actualizar "Conocimiento de la Fuente"

**Para agentes core:**
- Crear un agente derivado en `agents/created/`
- El agente core no se modifica
- El derivado hereda + extiende

### Paso 6: Si es scraping activo

Añadir handoff específico:

```yaml
- label: Solicitar más datos de {fuente}
  agent: ForoScraper
  prompt: Descargar más páginas de {job_id} para enriquecer el conocimiento.
  send: false
```

## Ejemplo

```
Usuario: Conectar DISCO/Foro_t8941392/ a yellowflag

AgentCreator: 
- Agente destino: @yellowflag (core)
- Fuente: DISCO/Foro_t8941392/
- Estado scraping: 1/51 páginas

Como yellowflag es un agente core, crearé un derivado:
`yellowflag-demarcacion.agent.md`

¿Tipo de conexión?
1. Estática (solo página 1)
2. Dinámica (puede pedir más)
3. Anexo temático

Usuario: Dinámica

AgentCreator: Creando yellowflag-demarcacion.agent.md...

El nuevo agente:
- Hereda TODO de yellowflag
- Conoce el contenido de página 1 del foro
- Tiene handoff para pedir más páginas
- Se guarda en agents/created/

¿Procedo?
```

## Validaciones

- [ ] Fuente existe y tiene contenido
- [ ] Agente destino válido
- [ ] Si es core, crear derivado (no modificar core)
- [ ] Si es scraping activo, configurar handoff
