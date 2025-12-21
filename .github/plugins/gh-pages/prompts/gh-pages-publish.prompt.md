# Prompt: Publicar en GitHub Pages (General)

> **Plugin**: gh-pages  
> **Agente**: @GHPages  
> **Modo**: AUTO-DETECT (detecta fusionar/reemplazar según contexto)

---

## Contexto

Este es el prompt de **entrada general** al plugin GH-Pages. Analiza la solicitud del usuario y delega al modo apropiado (fusionar o reemplazar).

---

## Lógica de Detección

| Palabras clave | Modo detectado |
|----------------|----------------|
| "añadir", "actualizar", "refrescar", "nuevas" | → FUSIONAR |
| "crear página para", "solo", "limpiar", "reiniciar" | → REEMPLAZAR |
| Sin indicador claro | → Preguntar al usuario |

---

## Instrucciones para el Agente

### 1. Analizar Solicitud

```
Usuario: "Publica las noticias de diciembre"
→ Detectado: FUSIONAR (añadir noticias)

Usuario: "Crea una página solo para el capítulo 1"
→ Detectado: REEMPLAZAR (página dedicada)

Usuario: "Publica el marco conceptual"
→ Ambiguo: Preguntar modo
```

### 2. Si Modo Ambiguo, Preguntar

```
Detecté que quieres publicar: ARCHIVO/marco

¿Qué modo prefieres?
1. FUSIONAR: Añadir al contenido existente
2. REEMPLAZAR: Crear página dedicada (limpia contenido previo)

Responde 1 o 2:
```

### 3. Delegar al Prompt Específico

**Si FUSIONAR**:
→ Ejecutar `gh-pages-merge.prompt.md`

**Si REEMPLAZAR**:
→ Ejecutar `gh-pages-replace.prompt.md`

---

## Ejemplos de Uso Natural

### Caso 1: Noticias del Periódico

```
Usuario: @GHPages publica las últimas noticias

GHPages: 
Detectado: Publicar NOTICIAS (modo FUSIONAR)

Buscando noticias recientes...
Encontradas: 5 planas de diciembre 2025

Procediendo con fusión...
[Ejecuta gh-pages-merge]
```

### Caso 2: Capítulo Dedicado

```
Usuario: @GHPages quiero una página solo para el capítulo 1

GHPages:
Detectado: Publicar FUNDACION/cap01 (modo REEMPLAZAR)

⚠️ Esto eliminará el contenido actual del sitio.
¿Confirmar? (sí/no)

[Si confirma, ejecuta gh-pages-replace]
```

### Caso 3: Marco Conceptual (Ambiguo)

```
Usuario: @GHPages publica el marco

GHPages:
Detecté que quieres publicar: ARCHIVO/marco (15 documentos)

¿Qué modo prefieres?
1. FUSIONAR: Añadir al contenido existente del sitio
2. REEMPLAZAR: Crear sitio dedicado solo al marco

Responde 1 o 2:
```

---

## Mapeo de Fuentes

| Input del usuario | Fuente detectada |
|-------------------|------------------|
| "noticias", "periódico", "planas" | `ARCHIVO/NOTICIAS/` |
| "capítulo X", "fundación", "caps" | `PROYECTOS/FUNDACION/CAPITULOS/` |
| "marco", "herramientas" | `ARCHIVO/marco/` |
| "cartas", "puertas" | `ARCHIVO/CARTAS/` |
| "diagnóstico" | `ARCHIVO/diagnostico/` |
| "justificación" | `ARCHIVO/justificacion/` |

---

## Verificaciones Previas

Antes de cualquier publicación:

1. **¿GitHub Pages inicializado?**
   ```
   Si no → Sugerir: @GHPages inicializar
   ```

2. **¿Existe el sitio en docs/?**
   ```
   Si no existe docs/ → Ejecutar inicialización
   ```

3. **¿Fuente válida?**
   ```
   Si no existe → Informar error
   ```

---

## Output Típico

```
📤 Publicación en GitHub Pages

Fuente: ARCHIVO/NOTICIAS/
Filtro: diciembre 2025
Modo: FUSIONAR

Archivos detectados: 5
- S08-T027-2025-12-geopolitica-nobel-venezuela.md
- S08-T028-2025-12-tecnologia-openai-gobernanza.md
- S08-T029-2025-12-metodo-validacion-perspectivas.md
- S08-T030-2025-12-epistemologia-demarcacion-falsabilidad.md
- S08-T031-2025-12-poesia-vias-alternativas.md

¿Proceder con la publicación? (sí/no)
```

---

## Comandos Directos (Bypass Detección)

Si el usuario es explícito, no preguntar:

```
@GHPages fusionar NOTICIAS diciembre
→ Ejecutar gh-pages-merge directamente

@GHPages reemplazar FUNDACION cap01
→ Ejecutar gh-pages-replace directamente

@GHPages inicializar
→ Ejecutar gh-pages-init directamente
```
