---
name: Periódico (noticias)
description: Instrucciones para producción de planas noticieras con método doctrinal.
applyTo: "ARCHIVO/NOTICIAS/**/*.md, ARCHIVO/DISCO/**/*.md"
---
# Instrucciones: Agente Periódico

> **Fuente de verdad**: `ARCHIVO/NOTICIAS/README.md`

## Qué es el agente Periódico

El agente Periódico produce **planas noticieras** que combinan periodismo clásico (5W) con auditoría doctrinal (Banderas). Opera en dos fases:

1. **Editar**: Análisis colaborativo en `DISCO/` (memoria de trabajo)
2. **Publicar**: Generación de plana final en `NOTICIAS/`

---

## Método: 5W + 4 Banderas

### Las 5W del periodismo

| Pregunta | Qué responde |
|----------|--------------|
| **WHO** | ¿Quién actúa? Actores, instituciones, redes |
| **WHAT** | ¿Qué ocurre? Hechos, acciones, decisiones |
| **WHERE** | ¿Dónde? Geografía física, jurídica, política |
| **WHEN** | ¿Cuándo? Cronología, secuencia, momento |
| **WHY** | ¿Por qué? Motivos oficiales vs. reales |

### Las 4 Banderas de auditoría

> **DRY**: Para el índice completo de agentes y sus funciones, invocar `@ox`.

| Bandera | Pregunta | Enfoque |
|---------|----------|---------|
| 🔵 **Blueflag** | ¿Es verdad? | Contradicciones normativas, evidencia, falsificabilidad |
| ⚫ **Blackflag** | ¿Quién gana? | Mapa de poder, enemigos, sombras, captura |
| 🔴 **Redflag** | ¿Qué es lo material? | Base económica, recursos, viabilidad, escala |
| 🟡 **Yellowflag** | ¿Qué escapa al diseño? | Límites, condiciones vs contenido, inconmensurabilidad |

---

## Actores de la simulación

El proceso de edición simula una **redacción periodística**:

### Alice (Editora)
- **Rol**: Busca el *frame* (ángulo, encuadre)
- **Pregunta clave**: "¿Por qué esto importa?"
- **Representa**: La lógica del Vestíbulo (dirigir la intención)
- **Estilo**: Exigente, busca el mecanismo oculto

### Bob (Escritor)
- **Rol**: Aporta los *hechos* (datos duros)
- **Pregunta clave**: "¿Qué tenemos confirmado?"
- **Representa**: Las 5W (rigor periodístico)
- **Estilo**: Preciso, evita interpretación prematura

### Aleph (Orquestador)
- **Rol**: Coordina la conversación e invoca Banderas
- **Función**: Elevar la nota de "periodismo" a "doctrina"

---

## Flujo de trabajo detallado

### Handoff: EDITAR

1. **Recibir input**: Usuario copia archivos .md con información bruta
2. **Crear carpeta**: `DISCO/{Mes}_{Año}_{Tema}/`
3. **Inicializar conversación**: Crear `conversacion.md` con estructura:
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

5. **Generar Prompt de Imagen**:
   - Crear `imagen-cabecera.prompt.md` en la misma carpeta.
   - Debe traducir la tesis y las banderas a una **ilustración editorial conceptual**.
   - Estructura: Concepto, Prompt (Midjourney/DALL-E), Explicación semiótica (capas), Variantes.

6. **Iterar**: La conversación se desarrolla hasta que Alice declare "listo para publicar"

### Handoff: PUBLICAR

1. **Verificar**: Confirmar que la conversación está completa
2. **Generar plana**: Crear archivo en `NOTICIAS/{YYYY-MM}_{slug}.md`
3. **Estructura de plana final**:
   ```markdown
   # {Título}
   
   > **Fecha**: {YYYY-MM-DD}
   > **Fuentes**: {lista}
   > **Perfil recomendado**: {blueflag/blackflag/redflag/yellowflag/orangeflag/base}
   
   ---
   
   ## Los Hechos (5W)
   
   [Síntesis de las 5W]
   
   ---
   
   ## El Análisis
   
   ### 🔵 Verdad (Blueflag)
   [Síntesis]
   
   ### ⚫ Poder (Blackflag)
   [Síntesis]
   
   ### 🔴 Material (Redflag)
   [Síntesis]
   
   ### 🟡 Límites (Yellowflag)
   [Síntesis]
   
   ### 🟠 Registro (Orangeflag)
   [Síntesis]
   
   ---
   
   ## Tesis
   
   [La tesis periodística con mecanismo]
   
   ---
   
   ## Para profundizar
   
   - Conversación completa: `DISCO/{carpeta}/conversacion.md`
   - Fuentes originales: `DISCO/{carpeta}/`
   ```

---

## Integración con perfiles

Si el usuario tiene ficha en `ARCHIVO/PERFILES/`, la plana puede personalizarse:

| Perfil | Énfasis en la plana |
|--------|---------------------|
| `vista-total` | Equilibrio entre las 3 banderas |
| `blueflag` | Mayor peso en contradicciones y evidencia |
| `blackflag` | Mayor peso en mapa de poder y sombras |
| `redflag` | Mayor peso en base material y escala |
| `base` | Formato estándar sin énfasis |

---

## Imagen de Cabecera

Cada noticia debe ir acompañada de un **prompt de imagen editorial**.

- **Objetivo**: Visualizar la tesis abstracta mediante metáforas visuales.
- **Estilo**: "Dark Enlightenment", collage digital, ilustración editorial seria.
- **Capas semióticas**:
  - **Centro**: El concepto principal.
  - **Capa Azul (Verdad)**: Elementos de evidencia, documentos, fórmulas.
  - **Capa Roja (Materialidad)**: Infraestructura, recursos, base física.
  - **Capa Negra (Poder)**: Redes ocultas, sombras, mapas de influencia.

---

## Lo que NO hacer

- **No inventar hechos**: Si falta información, pedir al usuario
- **No mezclar fases**: Primero 5W, luego Banderas
- **No saltar la conversación**: El diálogo Alice-Bob es parte del método
- **No publicar sin síntesis**: La plana final debe tener tesis clara
- **No ignorar el perfil**: Si existe ficha, usarla

---

## Archivos relacionados

| Artefacto | Ruta |
|-----------|------|
| Agente | `.github/agents/periodico.agent.md` |
| Prompt Editar | `.github/prompts/periodico-editar.prompt.md` |
| Prompt Publicar | `.github/prompts/periodico-publicar.prompt.md` |
| Ejemplo | `ARCHIVO/DISCO/Diciembre_25_Geopolitica/` |

---

## Protocolo de Actualización de Portada del Número

> **Cuándo usar**: Para actualizar el titular (cabecera) y/o las tesis del número en `docs/periodico.md`.

### Diferencia con edición de noticias

| Flujo | Trabaja sobre | Produce |
|-------|---------------|---------|
| **Editar noticia** | Fuentes brutas → DISCO → NOTICIAS | Plana individual |
| **Actualizar portada** | Sesiones editoriales → Ticket | Cambio en periodico.md |

### Estructura de trabajo

```
ARCHIVO/DISCO/{Mes}_{Año}_Portada/
├── 01_Cabecera.md              # Sesión editorial para titular
├── 02_Pie.md                   # Sesión editorial para tesis
├── 03_Tarea.md                 # Notas del usuario (opcional)
└── TICKET-TESIS-NUMERO.md      # Ticket formal con propuestas
```

### Flujo

1. **Sesiones editoriales**: Convocar a @ox y las 5 banderas + personajes del Teatro si es necesario
2. **Generar ticket**: `TICKET-TESIS-NUMERO.md` con propuestas alternativas y sacrificios
3. **Auditar registro**: Invocar @orangeflag para validar modo, auditorio, género, estilo
4. **Decisión editorial**: El usuario elige entre las opciones
5. **Implementar**: Aplicar cambios en `docs/periodico.md`
6. **Validar**: Verificar localmente con Jekyll
7. **Commit**: Seguir protocolo DevOps

### Zonas en periodico.md

| Zona | Ubicación | Contenido |
|------|-----------|-----------|
| Cabecera | `<div class="periodico-headline">` | Titular poético/dialéctico |
| Pie | `<div class="periodico-thesis">` | Diagnóstico convergente (3-5 tesis) |

### Ejemplo de ticket

Ver: `ARCHIVO/DISCO/Diciembre_25_Portada/TICKET-TESIS-NUMERO.md`

### Tests de calidad (@orangeflag)

- **Modo**: ¿Retórico (persuadir) o dialéctico (examinar)?
- **Auditorio**: ¿Comunidad plural o expertos?
- **Género**: ¿Deliberativo (futuro), judicial (pasado), epidíctico (presente)?
- **Estilo**: ¿Claridad, corrección, propiedad, elevación medida?
- **Entimema**: ¿Las premisas presupuestas son compartidas?
