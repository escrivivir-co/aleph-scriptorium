---
name: Enciclopedia
description: Instrucciones para el motor de consulta de tomos enciclopédicos.
applyTo: "ARCHIVO/ENCICLOPEDIA/**/*.md, .github/plugins/enciclopedia/**/*"
---

# Motor de Consulta Enciclopédica

> **Plugin**: enciclopedia v1.0.0  
> **Fuente de verdad**: `.github/plugins/enciclopedia/manifest.md`

## Propósito

El plugin Enciclopedia permite consultar **índices de tomos académicos** mediante:
- Búsqueda **temporal** (por período histórico)
- Búsqueda **temática** (por concepto transversal)
- Referencia **directa** (por autor o filósofo)

## Principios

### Lo que el plugin HACE
- **Orienta**: Señala qué capítulo consultar dado un interés
- **Indexa**: Mantiene mapas temáticos y cronológicos
- **Conecta**: Relaciona conceptos entre períodos y autores

### Lo que el plugin NO HACE
- **No transcribe**: El contenido original permanece en sus formatos
- **No resume**: Cada capítulo debe consultarse en la fuente
- **No inventa**: Si no está en el índice, lo declara

## Arquitectura

```
┌─────────────────┐
│  Bibliotecario  │ ← Gestor global (coordina tomos)
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│ Tomo1 │ │ Tomo2 │ ← Agentes especializados
└───────┘ └───────┘
```

### Jerarquía de Agentes

1. **Bibliotecario**: Punto de entrada, delega a tomos específicos
2. **Agente de Tomo**: Conoce el índice completo de un tomo

## Estructura de un Agente de Tomo

Cada agente de tomo debe incluir:

```markdown
## Tu Conocimiento

### Índice Completo
[Tabla con todos los capítulos]

### Mapas Temáticos Transversales

#### Por Tema
[Tema → Capítulos]

#### Por Período Histórico
[Período → Capítulos]
```

## Protocolo de Respuesta

### 1. Identificar Tipo de Consulta

| Tipo | Ejemplo | Acción |
|------|---------|--------|
| Directo | "¿Dónde está Kant?" | Buscar en índice por nombre |
| Temporal | "Siglo XVIII" | Filtrar por período |
| Temático | "Epistemología" | Buscar en mapa temático |
| Compuesto | "Ética en el s.XX" | Cruzar tema + período |

### 2. Formato de Respuesta

```
📖 [Nombre del Tomo]

🎯 Resultado para "[consulta]":

- #[N]: [Contenido] — [temas relevantes]
- #[M]: [Contenido] — [temas relevantes]

📁 Fuente: [ruta al índice]
```

### 3. Cuando No Hay Resultados

```
📖 [Nombre del Tomo]

❌ No encontré resultados para "[consulta]"

Sugerencias:
- [términos relacionados que sí existen]
```

## Carga de Nuevos Tomos

### Requisitos

1. **Directorio** en `ARCHIVO/ENCICLOPEDIA/{nombre}/`
2. **README.md** con índice estructurado (tabla Markdown)
3. **Identificador** kebab-case único

### Proceso

1. Leer y parsear el índice del README
2. Generar agente en `plugins/enciclopedia/agents/tomos/`
3. Actualizar manifest.md con metadatos
4. Añadir handoff en Bibliotecario

## Integración con el Proyecto

### Para Fundación

El plugin puede servir como **fuente de referencia rápida** para:
- Localizar antecedentes filosóficos de conceptos usados
- Verificar atribuciones ("¿quién dijo esto primero?")
- Enriquecer el marco conceptual con tradición filosófica

### Para Auditores

- **Blueflag**: Verificar que las referencias filosóficas sean precisas
- **Yellowflag**: Identificar cuando se fuerza una traducción entre marcos

## Tomos Actualmente Cargados

| Tomo | Agente | Capítulos |
|------|--------|-----------|
| Historia de la Filosofía (Ernesto Castro) | @HDF-ErnestoCastro | 61 |

---

## Archivos del Plugin

| Archivo | Descripción |
|---------|-------------|
| `manifest.md` | Metadatos y configuración |
| `agents/bibliotecario.agent.md` | Gestor principal |
| `agents/tomos/*.agent.md` | Agentes de tomo |
| `prompts/cargar-tomo.prompt.md` | Proceso de carga |
| `prompts/buscar-temporal.prompt.md` | Búsqueda cronológica |
| `prompts/buscar-tematica.prompt.md` | Búsqueda conceptual |
