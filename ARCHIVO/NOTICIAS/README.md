# ARCHIVO/NOTICIAS — Planas Noticieras (Release)

> **Función**: Carpeta de **release** para artículos periodísticos publicados.  
> **Agente principal**: `periodico.agent.md`  
> **Carpeta de trabajo**: `ARCHIVO/DISCO/`

---

## Qué es esto

Esta carpeta contiene **planas noticieras publicadas** (release) producidas mediante el sistema Aleph Scriptorium. Cada plana combina:

1. **Periodismo clásico** (5W: Who, What, Where, When, Why)
2. **Auditoría doctrinal** (Banderas: Blueflag, Blackflag, Redflag, Yellowflag, Orangeflag)
3. **Diálogo editorial** (Alice y Bob simulan una redacción)

---

## Nomenclatura de archivos

**Formato obligatorio**:
```
{codigo_scrum}-{mes}-{categoria}-{tema}-{titulo}.md
```

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `codigo_scrum` | ID de Story/Task del backlog | `S08-T019` |
| `mes` | Fecha en formato YYYY-MM | `2025-12` |
| `categoria` | Área temática | `geopolitica` |
| `tema` | Subtema (2-3 palabras) | `nobel-venezuela` |
| `titulo` | Título corto (3-5 palabras) | `paz-como-arma` |

**Ejemplo**: `S08-T019-2025-12-geopolitica-nobel-venezuela-paz-como-arma.md`

---

## Flujo de trabajo

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO "PERIÓDICO"                        │
├─────────────────────────────────────────────────────────────┤
│  1. INPUT                                                   │
│     Usuario copia N archivos .md con información bruta      │
│     → Se guardan en DISCO/{Mes}_{Año}_{Tema}/               │
│                                                             │
│  2. HANDOFF: EDITAR (en DISCO)                              │
│     @periodico → inicializa conversacion.md                 │
│     Alice (Editora) + Bob (Escritor) analizan:              │
│       • 5W (periodismo clásico)                             │
│       • Banderas (auditoría doctrinal)                      │
│     → La conversación se va guardando en DISCO              │
│                                                             │
│  3. HANDOFF: PUBLICAR (release a NOTICIAS)                  │
│     @periodico → verifica si existe publicación previa      │
│       • Si existe: pregunta fusionar/reemplazar/nueva ver.  │
│       • Si no existe: genera plana nueva                    │
│     → Formato: {codigo_scrum}-{mes}-{categoria}-{tema}.md   │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura de una plana

Cada plana publicada contiene:

| Sección | Contenido |
|---------|-----------|
| **Frontmatter** | codigo_scrum, fecha, categoria, tema, perfil, fuente_disco |
| **Cabecera** | Título, fecha, fuentes, perfil recomendado |
| **Las 5W** | Who, What, Where, When, Why |
| **Auditoría Blueflag** | Contradicciones normativas, evidencia |
| **Auditoría Blackflag** | Mapa de poder, enemigos, sombras |
| **Auditoría Redflag** | Base material, viabilidad, escala |
| **Síntesis** | Tesis periodística con mecanismo |
| **Metadata** | Perfil de lector (si aplica), fuentes DISCO |

---

## Carpetas relacionadas

| Carpeta | Función |
|---------|---------|
| `DISCO/` | Memoria de trabajo (borradores, conversaciones) |
| `NOTICIAS/` | Planas publicadas (producto final) |
| `PERFILES/` | Personalización por perfil de lector |

---

## Agente y prompts

| Artefacto | Ruta |
|-----------|------|
| Agente Periódico | `.github/agents/periodico.agent.md` |
| Instrucciones | `.github/instructions/periodico.instructions.md` |
| Prompt Editar | `.github/prompts/periodico-editar.prompt.md` |
| Prompt Publicar | `.github/prompts/periodico-publicar.prompt.md` |

---

## Ejemplo

Ver el ejemplo de referencia en:
- **DISCO**: `ARCHIVO/DISCO/Diciembre_25_Geopolitica/`
- **Plana final**: (por migrar a NOTICIAS/)
