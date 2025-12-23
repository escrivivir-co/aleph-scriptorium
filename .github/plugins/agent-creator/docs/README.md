# Agent Creator — Documentación

## ¿Qué es Agent Creator?

Un plugin para el Aleph Scriptorium que permite **crear agentes especializados** combinando:

1. **Agentes base**: La metodología y perspectiva de agentes existentes
2. **Fuentes de datos**: Conocimiento específico de carpetas DISCO/ARCHIVO

## Instalación

El plugin se instala automáticamente al seguir el protocolo de `PLUGINS.md`.

## Uso básico

### Crear un agente nuevo

```
@AgentCreator Crear nuevo agente

- Agente base: @yellowflag
- Fuente: DISCO/Foro_t8941392/
- Especialidad: Criterio de demarcación científica
```

### Editar un agente existente

```
@AgentCreator Editar agente tarotista

- Añadir fuente: ARCHIVO/marco/07-hybris-crematistica.md
```

### Fusionar agentes

```
@AgentCreator Fusionar @yellowflag con @blueflag

- Nueva especialidad: Auditoría integral de verdad y límites
```

## Ejemplo completo: Yellowflag + Foro de Demarcación

### Input

- Agente base: `@yellowflag` (auditoría de límites, cuadrantes de Wilber)
- Fuente: `DISCO/Foro_t8941392/` (hilo sobre tarot y demarcación científica)

### Conceptos extraídos del foro

- Criterio de demarcación de Popper (falsabilidad)
- Crítica de Kuhn, Feyerabend, Lakatos
- Sincronicidades (Pauli/Jung)
- Límites de lo que la ciencia puede decir sobre fenómenos "anómalos"

### Output: tarotista.agent.md

Un agente que:
1. Hereda la metodología de cuadrantes de Yellowflag
2. Conoce el debate histórico sobre demarcación científica
3. Puede auditar propuestas desde la pregunta: "¿Es esto ciencia o pretende serlo?"
4. Integra la perspectiva de sincronicidades sin caer en pseudociencia
5. Tiene handoff para pedir más páginas del hilo original

### Uso del agente creado

```
@tarotista Audita esta propuesta:
"Implementar RBU basada en principios de física cuántica"

Respuesta:
🟡 Test de Demarcación:
- La propuesta invoca "física cuántica" sin operacionalizar
- No especifica qué predicciones falsificables hace
- Riesgo de pre/trans falacia: confundir lo mágico con lo transpersonal

🟡 Test de Cuadrantes:
- Solo toca cuadrante inferior-derecho (sistema)
- Ignora cómo afecta conciencia individual (sup-izq)
- No considera tradiciones contemplativas sobre abundancia

Recomendación: Reformular sin invocar física cuántica como autoridad epistémica.
```

## Conexión con FORO_SCRAPER

Si la fuente es un scraping activo:

```
@tarotista Esta pregunta requiere más contexto del hilo

AgentCreator: Detectado que solo tengo 1/51 páginas.
¿Solicito más al Scraper?

Usuario: Sí, descarga hasta la página 10

[Handoff a ForoScraper...]

AgentCreator: Páginas 2-10 descargadas. Actualizando conocimiento...
Nuevos conceptos: [lista]
```

## Arquitectura

```
                    ┌─────────────────┐
                    │  AgentCreator   │
                    │  (orquestador)  │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  Agentes Base  │  │ Fuentes Datos  │  │   Output       │
│  (core/plugins)│  │ (DISCO/ARCHIVO)│  │ (agents/created)│
└────────────────┘  └────────────────┘  └────────────────┘
         │                   │
         │                   ▼
         │          ┌────────────────┐
         │          │  ForoScraper   │ ← Si fuente es scraping
         │          │  (más datos)   │
         │          └────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│                 Agente Especializado                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Metodología  │  │ Conocimiento │  │  Handoffs    │  │
│  │ (heredada)   │  │ (conectado)  │  │ (extendidos) │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────────────────────────────────────────┘
```

## Limitaciones actuales

1. **No modifica agentes core**: Crea derivados
2. **Una especialización**: Para múltiples, crear varios agentes
3. **Scraping asíncrono**: Pedir datos no es instantáneo
4. **Análisis manual**: El creador extrae conceptos, no hay NLP automático

## Roadmap

- [ ] Análisis automático de conceptos clave
- [ ] Versionado de agentes creados
- [ ] Compartir agentes entre usuarios
- [ ] Templates predefinidos de especialización
