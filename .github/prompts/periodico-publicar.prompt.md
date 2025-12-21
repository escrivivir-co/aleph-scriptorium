# Prompt: Publicar Plana (Periódico)

## Instrucción para el agente

Este prompt guía el proceso de **publicación** (release) de una plana noticiera. Transforma la conversación de `DISCO/` en un artículo final en `NOTICIAS/`.

**Carpeta de release**: `ARCHIVO/NOTICIAS/`  
**Carpeta de trabajo**: `ARCHIVO/DISCO/{subcarpeta}/`

---

## Prerrequisitos

Antes de publicar, verificar:

1. **¿Existe conversación completa?** 
   - Buscar `conversacion.md` en `DISCO/{carpeta}/`
   - Verificar que el `Estado` sea "Listo para publicar"
   
2. **¿Están las 5W respondidas?**
   - WHO, WHAT, WHERE, WHEN, WHY deben tener contenido

3. **¿Están las Banderas auditadas?**
   - Blueflag, Blackflag, Redflag deben tener veredicto

4. **¿Hay síntesis de Alice?**
   - La tesis periodística debe estar formulada

5. **¿Existe publicación previa?** ⚠️ NUEVO
   - Buscar en `NOTICIAS/` si ya existe un archivo con el mismo código Scrum
   - Si existe, preguntar al usuario (ver Paso 2B)

**Si falta algo**:
> La conversación no está completa. Falta: {elemento}. 
> ¿Quieres continuar la edición o publicar con lo que hay?

---

## Flujo de publicación

### Paso 1: Leer conversación

1. Abrir `DISCO/{carpeta}/conversacion.md`
2. Extraer:
   - Metadata (fecha, fuentes, perfil)
   - Las 5W de Bob
   - Los veredictos de las Banderas
   - La síntesis de Alice

---

### Paso 2: Generar nombre de archivo (release)

**Formato obligatorio**:
```
{codigo_scrum}-{mes}-{categoria}-{tema}-{titulo}.md
```

**Componentes**:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `codigo_scrum` | ID de la Story o Task del backlog | `S08-T019` |
| `mes` | Mes en formato `YYYY-MM` | `2025-12` |
| `categoria` | Área temática (geopolitica, economia, tecnologia, sociedad) | `geopolitica` |
| `tema` | Subtema específico (2-3 palabras, guiones) | `nobel-venezuela` |
| `titulo` | Título corto (3-5 palabras, guiones) | `paz-como-arma` |

**Ejemplo completo**:
```
S08-T019-2025-12-geopolitica-nobel-venezuela-paz-como-arma.md
```

**Reglas**:
- Todo en minúsculas
- Guiones en lugar de espacios
- Sin caracteres especiales ni tildes
- Máximo 80 caracteres en total

---

### Paso 2B: Verificar publicación previa

Buscar en `NOTICIAS/` archivos que coincidan con `{codigo_scrum}-{mes}-{categoria}*`:

**Si existe publicación previa**:
> ⚠️ He detectado una publicación previa:
> - `NOTICIAS/{archivo_existente}.md`
> 
> ¿Cómo quieres proceder?
> 1. **Fusionar**: Integro los cambios nuevos con el contenido existente
> 2. **Reemplazar**: Sustituyo completamente el archivo anterior
> 3. **Nueva versión**: Creo un archivo nuevo con sufijo `-v2`

**Comportamiento según opción**:
- **Fusionar**: Comparar secciones, mantener lo mejor de ambas versiones, marcar conflictos si los hay
- **Reemplazar**: Mover el anterior a `DISCO/{carpeta}/backup/` y crear nuevo
- **Nueva versión**: Crear `{nombre}-v2.md` sin tocar el original

---

### Paso 3: Crear plana final (release)

**Ruta de release**: `ARCHIVO/NOTICIAS/{codigo_scrum}-{mes}-{categoria}-{tema}-{titulo}.md`

**Cabecera obligatoria**:

```markdown
---
codigo_scrum: {codigo_scrum}
fecha: {YYYY-MM-DD}
categoria: {categoria}
tema: {tema}
perfil_recomendado: {blueflag/blackflag/redflag/yellowflag/orangeflag/base}
fuente_disco: DISCO/{carpeta}/
imagen_cabecera: DISCO/{carpeta}/imagen-cabecera.png
estado: publicado
---

# {Título}

![Imagen de cabecera](../DISCO/{carpeta}/imagen-cabecera.png)

> **Código**: `{codigo_scrum}`  
> **Fecha**: {YYYY-MM-DD}  
> **Categoría**: {categoria} / {tema}  
> **Fuentes**: {lista de archivos originales}  
> **Perfil recomendado**: {blueflag/blackflag/redflag/yellowflag/orangeflag/base}  
> **Conversación**: `DISCO/{carpeta}/conversacion.md`

---

## Los Hechos

### ¿Quién? (WHO)
{Síntesis de actores, instituciones, redes}

### ¿Qué? (WHAT)
{Síntesis de hechos, acciones, decisiones}

### ¿Dónde? (WHERE)
{Síntesis de geografía, jurisdicción, espacio político}

### ¿Cuándo? (WHEN)
{Síntesis de cronología y momento crítico}

### ¿Por qué? (WHY)
- **Motivo oficial**: {lo declarado}
- **Motivo real**: {lo inferido de las fuentes}

---

## El Análisis

### 🔵 Verdad (Blueflag)

{Veredicto de Blueflag: contradicciones normativas, evidencia}

### ⚫ Poder (Blackflag)

{Veredicto de Blackflag: mapa de poder, sombras, beneficiarios}

### 🔴 Material (Redflag)

{Veredicto de Redflag: base económica, recursos, escala}

---

## Tesis

{La síntesis de Alice: el mecanismo + la conclusión}

---

## Para profundizar

- **Conversación completa**: [`DISCO/{carpeta}/conversacion.md`](../DISCO/{carpeta}/conversacion.md)
- **Fuentes originales**: 
  - [`{archivo1}`](../DISCO/{carpeta}/{archivo1})
  - [`{archivo2}`](../DISCO/{carpeta}/{archivo2})

---

*Plana producida con el método Periódico de Aleph Scriptorium.*
```

---

### Paso 4: Actualizar conversación

En `DISCO/{carpeta}/conversacion.md`, añadir al final:

```markdown
---

## Publicación

**Fecha de publicación**: {YYYY-MM-DD}
**Plana final**: [`NOTICIAS/{slug}.md`](../../NOTICIAS/{slug}.md)
**Estado**: Publicado
```

---

## Personalización por perfil

Si el usuario tiene ficha en `PERFILES/`:

| Perfil | Ajuste en la plana |
|--------|-------------------|
| `blueflag` | Expandir sección Verdad, contraer Poder y Material |
| `blackflag` | Expandir sección Poder, contraer Verdad y Material |
| `redflag` | Expandir sección Material, contraer Verdad y Poder |
| `vista-total` | Equilibrio entre las tres secciones |
| `base` | Formato estándar |

El campo `Perfil recomendado` en la cabecera indica qué tipo de lector encontrará más valor en esta plana.

---

## Validación final

Antes de guardar, verificar:

- [ ] Título claro y descriptivo
- [ ] Fecha correcta
- [ ] Links a fuentes funcionan
- [ ] Las 5W están completas
- [ ] Las 3 Banderas tienen veredicto
- [ ] La tesis es clara y tiene mecanismo
- [ ] El slug es correcto

---

## Mensaje de confirmación

```markdown
✅ **Plana publicada**

- **Archivo**: `NOTICIAS/{slug}.md`
- **Título**: {título}
- **Fecha**: {fecha}

La conversación en `DISCO/` ha sido actualizada con el enlace a la publicación.

¿Quieres que abra la plana para revisión final?
```

---

## Reglas

- **No publicar incompleto**: Si falta contenido, volver a edición
- **Mantener enlaces**: Los links a DISCO deben ser relativos y funcionales
- **Declarar perfil**: Indicar siempre el perfil recomendado
- **Actualizar DISCO**: Marcar la conversación como publicada
