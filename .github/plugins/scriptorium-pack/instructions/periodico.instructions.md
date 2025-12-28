---
name: Periódico (noticias)
description: Instrucciones para producción de planas noticieras con método doctrinal.
applyTo: "ARCHIVO/DISCO/**/conversacion*.md, ARCHIVO/NOTICIAS/**/2*.md"
---
# Instrucciones: Agente Periódico

> **Fuente de verdad**: `ARCHIVO/NOTICIAS/README.md`  
> **Plugin**: scriptorium-pack (SCRIPT-1.29.0)

---

## Resumen Ejecutivo

El agente Periódico produce **planas noticieras** combinando periodismo clásico (5W) con auditoría doctrinal (Banderas).

| Fase | Ubicación | Propósito |
|------|-----------|-----------|
| **Editar** | `DISCO/` | Análisis colaborativo |
| **Publicar** | `NOTICIAS/` | Plana final |

---

## Método: 5W + 4 Banderas

### Las 5W del Periodismo

| Pregunta | Qué Responde |
|----------|--------------|
| **WHO** | ¿Quién actúa? Actores, instituciones, redes |
| **WHAT** | ¿Qué ocurre? Hechos, acciones, decisiones |
| **WHERE** | ¿Dónde? Geografía física, jurídica, política |
| **WHEN** | ¿Cuándo? Cronología, secuencia, momento |
| **WHY** | ¿Por qué? Motivos oficiales vs. reales |

### Las 4 Banderas de Auditoría

| Bandera | Pregunta | Enfoque |
|---------|----------|---------|
| 🔵 **Blueflag** | ¿Es verdad? | Contradicciones, evidencia, falsificabilidad |
| ⚫ **Blackflag** | ¿Quién gana? | Mapa de poder, sombras, captura |
| 🔴 **Redflag** | ¿Qué es lo material? | Base económica, recursos, escala |
| 🟡 **Yellowflag** | ¿Qué escapa al diseño? | Límites, condiciones vs contenido |

---

## Actores de la Simulación

| Actor | Rol | Pregunta Clave |
|-------|-----|----------------|
| **Alice** (Editora) | Busca el *frame* | "¿Por qué esto importa?" |
| **Bob** (Escritor) | Aporta *hechos* | "¿Qué tenemos confirmado?" |
| **Aleph** (Orquestador) | Coordina e invoca Banderas | Elevar a "doctrina" |

---

## Flujo de Trabajo

### EDITAR

1. Recibir input (archivos .md con información bruta)
2. Crear carpeta: `DISCO/{Mes}_{Año}_{Tema}/`
3. Inicializar `conversacion.md` con estructura 5W → Banderas → Síntesis
4. Iterar hasta que Alice declare "listo para publicar"
5. Generar `imagen-cabecera.prompt.md`

### PUBLICAR

1. Verificar conversación completa
2. Crear archivo en `NOTICIAS/{YYYY-MM}_{slug}.md`
3. Estructura: Hechos (5W) → Análisis (Banderas) → Tesis

---

## Lo que NO Hacer

- **No inventar hechos**: Si falta información, pedir al usuario
- **No mezclar fases**: Primero 5W, luego Banderas
- **No saltar la conversación**: El diálogo Alice-Bob es parte del método
- **No publicar sin síntesis**: La plana final debe tener tesis clara

---

## Detalles Técnicos

### Estructura de conversacion.md

```markdown
# Conversación Editorial: {Tema}

**Fecha**: {YYYY-MM-DD}
**Fuentes**: {lista de archivos}
**Estado**: En edición

---

## Fase 1: Las 5W (Base Periodística)

**Alice (Editora)**: [inicia con pregunta de encuadre]

**Bob (Escritor)**: [responde con hechos estructurados]

---

## Fase 2: Auditoría de Banderas

**@blueflag**: [análisis de verdad]

**@blackflag**: [análisis de poder]

**@redflag**: [análisis material]

---

## Síntesis

**Alice**: [cierre con tesis]
```

### Estructura de Plana Final

```markdown
# {Título}

> **Fecha**: {YYYY-MM-DD}
> **Fuentes**: {lista}
> **Perfil recomendado**: {blueflag/blackflag/redflag/base}

---

## Los Hechos (5W)
[Síntesis de las 5W]

---

## El Análisis

### 🔵 Verdad (Blueflag)
### ⚫ Poder (Blackflag)
### 🔴 Material (Redflag)
### 🟡 Límites (Yellowflag)
### 🟠 Registro (Orangeflag)

---

## Tesis
[La tesis periodística con mecanismo]
```

### Integración con Perfiles

| Perfil | Énfasis en la Plana |
|--------|---------------------|
| `vista-total` | Equilibrio entre banderas |
| `blueflag` | Mayor peso en evidencia |
| `blackflag` | Mayor peso en poder |
| `redflag` | Mayor peso en materialidad |

### Imagen de Cabecera

- **Objetivo**: Visualizar la tesis abstracta
- **Estilo**: "Dark Enlightenment", collage digital
- **Capas**: Centro (concepto), Azul (verdad), Roja (materialidad), Negra (poder)

### Archivos Relacionados

| Artefacto | Ruta |
|-----------|------|
| Agente | `.github/agents/periodico.agent.md` |
| Prompt Editar | `.github/prompts/periodico-editar.prompt.md` |
| Prompt Publicar | `.github/prompts/periodico-publicar.prompt.md` |

### Protocolo de Portada

Para actualizar titular/tesis del número en `docs/periodico.md`:
1. Sesiones editoriales en `DISCO/{Mes}_{Año}_Portada/`
2. Generar `TICKET-TESIS-NUMERO.md`
3. Invocar @orangeflag para validar registro
4. Implementar cambios y validar con Jekyll
