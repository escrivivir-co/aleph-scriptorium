# Guía de Acceso: El Borrego Avispado (Archivos Originales)

> **Generado**: 7 enero 2026  
> **Tipo**: Referencia técnica de acceso  
> **Status**: ✅ Verificado

---

## 📂 UBICACIÓN FÍSICA

### Ruta Canónica
```
/Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/
```

### Sistema de Archivos
- **Ubicación en workspace**: Fuera del workspace Scriptorium (referencia externa)
- **Formato**: HTML5 (navegador compatible)
- **Codificación**: UTF-8
- **Acceso**: Lectura directa con navegador o editor de texto

---

## 📋 LISTA COMPLETA DE ARCHIVOS

### 11 Artículos de "El Borrego Avispado"

| # | Nombre archivo | Tamaño | Fecha original |
|---|---|---|---|
| 1 | `[El-borrego-avispado]-Aquí-estoy-yo.html` | 42.379 bytes | 2017-04-22 |
| 2 | `[El-borrego-avispado]-Cuídate,-compa.html` | 44.179 bytes | 2017-03-04 |
| 3 | `[El-borrego-avispado]-He-nacido-para-la-paz.html` | 38.207 bytes | 2017-02-10 |
| 4 | `[El-borrego-avispado]-Lo-que-nos-aguarda.html` | 41.420 bytes | 2017-03-15 |
| 5 | `[El-borrego-avispado]-No-estás-sola.html` | 37.865 bytes | 2017-03-22 |
| 6 | `[El-borrego-avispado]-No-estoy-solo,-sólo-que-las-jaulas.html` | 63.406 bytes | 2017-10-19 |
| 7 | `[El-borrego-avispado]-No-he-nacido-para-militar.html` | 42.379 bytes | 2017-01-29 |
| 8 | `[El-borrego-avispado]-Observando,-públicamente,-sin-pudor,-mi-bipolaridad.html` | 47.657 bytes | 2017-02-05 |
| 9 | `[El-borrego-avispado]-Por-amor-a-la-evidencia.html` | 53.943 bytes | 2017-03-08 |
| 10 | `[El-borrego-avispado]-Seguimos.html` | 44.230 bytes | 2017-05-06 |
| 11 | `[El-borrego-avispado]-Ya-tenemos,-otra-vez,-líder-supremo.html` | 44.047 bytes | 2017-02-13 |

**Total**: ~515 KB | **Período**: 5 meses (enero-mayo 2017)

---

## 🔗 CÓMO ACCEDER

### Opción 1: **Navegador (Recomendado para lectura)**

1. Abre tu navegador (Chrome, Firefox, Safari, Edge)
2. Navega a: `/Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/`
3. O en barra de dirección (macOS): `file:///Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/`
4. Selecciona archivo
5. Lee en navegador (formato HTML nativo)

**Ventajas**: Legibilidad óptima, preserva formato

### Opción 2: **Editor de Texto (Para análisis)**

1. Abre tu editor preferido (VS Code, Sublime, etc.)
2. File → Open Folder → `/Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/`
3. O File → Open → selecciona archivo individual
4. Analiza HTML y contenido

**Ventajas**: Acceso al código HTML, búsqueda avanzada

### Opción 3: **Terminal (Para extracción)**

```bash
# Ver lista de archivos
ls -lh /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/[El-borrego-avispado]*

# Contar palabras aproximadas (requiere conversión HTML→text)
wc -w /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/[El-borrego-avispado]-Aquí-estoy-yo.html

# Buscar palabra en todos los archivos
grep -r "bipolaridad" /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/[El-borrego-avispado]*
```

**Ventajas**: Automatización, análisis en batch

---

## 🔍 BÚSQUEDA DE CONTENIDO

### Si necesitas encontrar una frase específica:

**Opción A: Búsqueda en navegador**
```
1. Abre archivo HTML en navegador
2. Ctrl+F (o Cmd+F en Mac)
3. Escribe frase
4. Navega resultados
```

**Opción B: Búsqueda en terminal**
```bash
grep -l "Cada generación recibe" /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/[El-borrego-avispado]*
# Resultado: [El-borrego-avispado]-Aquí-estoy-yo.html
```

**Opción C: Buscar en todos los archivos**
```bash
grep -i "jaulas" /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/[El-borrego-avispado]* | head -5
```

---

## 📄 ESTRUCTURA DE CADA ARCHIVO HTML

### Anatomía típica:

```html
<!DOCTYPE html>
<html>
<head>
    <title>[Título del artículo]</title>
    <meta charset="UTF-8">
    <!-- Estilos y scripts -->
</head>
<body>
    <!-- Navegación de blog -->
    <nav>
        [Enlaces a artículos anteriores/siguientes]
    </nav>
    
    <!-- Título y fecha -->
    <h1>[Título del Artículo]</h1>
    <small>[Fecha de publicación]</small>
    
    <!-- Contenido principal -->
    <article>
        [Texto del artículo - prosa en párrafos]
    </article>
    
    <!-- Comentarios/Footer -->
    <footer>
        [Información adicional]
    </footer>
</body>
</html>
```

### Para extraer solo el texto:

**Comando Linux/Mac**:
```bash
lynx -dump -stdin < archivo.html | grep -v "^$"
```

**Con Python**:
```python
from html.parser import HTMLParser
import re

# Extraer texto limpio de HTML
with open('archivo.html', 'r', encoding='utf-8') as f:
    html = f.read()
    # Eliminar etiquetas
    text = re.sub(r'<[^>]+>', '', html)
    # Normalizar espacios
    text = re.sub(r'\s+', ' ', text).strip()
    print(text[:1000])  # Primeros 1000 caracteres
```

---

## 🗺️ NAVEGACIÓN ENTRE ARCHIVOS

### Orden de Lectura Recomendado

**Lectura Mínima** (30 minutos):
1. `[El-borrego-avispado]-Aquí-estoy-yo.html` — Entrada
2. `[El-borrego-avispado]-Observando,-públicamente,-sin-pudor,-mi-bipolaridad.html` — Núcleo
3. `[El-borrego-avispado]-No-estoy-solo,-sólo-que-las-jaulas.html` — Síntesis
4. `[El-borrego-avispado]-Seguimos.html` — Clausura

**Lectura Integral** (2-3 horas):
→ Ver [02_navegacion_tematica_borrego.md](02_navegacion_tematica_borrego.md) Sección IV

---

## 📋 METADATOS Y CATALOGACIÓN

### Información en Scriptorium:

| Ubicación | Contenido | Referencia |
|-----------|-----------|-----------|
| `INDICE_THEIA_LIBRO.md` | Metadatos básicos (archivos, tamaños) | [Ubicación](../TALLER/NOVELA_TRANSMEDIA/INDICE_THEIA_LIBRO.md) |
| `INSTRUCCIONES_REFACTORIZACION_ITACA.md` | Mapeo para novela transmedia | [Ubicación](../TALLER/NOVELA_TRANSMEDIA/INSTRUCCIONES_REFACTORIZACION_ITACA.md) |
| `MAPA_FUENTES_CAPITULO1.md` | Fragmentos autorizados | [Ubicación](../../NovelistEditor/docs/informes/MAPA_FUENTES_CAPITULO1.md) |
| `INSTRUCCIONES_CAP1_INTEGRACION_LIBRO.md` | Uso narrativo | [Ubicación](../../NovelistEditor/docs/informes/INSTRUCCIONES_CAP1_INTEGRACION_LIBRO.md) |

---

## ✅ VERIFICACIÓN DE INTEGRIDAD

### Verificar que los archivos estén completos:

```bash
# Contar archivos esperados (11)
ls -1 /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/[El-borrego-avispado]*.html | wc -l
# Resultado esperado: 11

# Verificar tamaños totales
du -ch /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/[El-borrego-avispado]*.html | tail -1
# Resultado esperado: ~515K total
```

### Si faltan archivos:

**Archivo faltante**: `[El-borrego-avispado]-Que-alguien-me-enseñe.html`?
→ **Acción**: Consultar con @indice sobre completitud del corpus

---

## 🔐 PERMISOS Y ACCESO

### Estado de Acceso:
- ✅ **Lectura**: Sí (acceso directo)
- ✅ **Copia**: Sí (para análisis personal)
- ⚠️ **Modificación**: No recomendada (fuente canónica)
- ⚠️ **Distribución**: Verificar licencia original

### Licencia Original:
Archivos de THEIA_PATH (fuente remota canónica)
→ Verificar derechos en sitio original si redistribuyes

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema: "No puedo abrir los archivos"

**Posible causa 1**: Ruta incorrecta
```bash
# Verificar ruta
test -d /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO && echo "OK" || echo "Path not found"
```

**Posible causa 2**: Permisos
```bash
# Dar permisos de lectura
chmod +r /Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/*
```

**Posible causa 3**: Caracteres especiales en nombres
→ Los nombres de archivos contienen acentos (Aquí-estoy-yo)
→ Terminal/Editor debe soportar UTF-8

### Problema: "El HTML se ve raro en editor"

**Solución**: 
→ Abrir con navegador (mejor formato)
→ O usar editor con soporte HTML (VS Code)

### Problema: "¿Cómo extraigo solo el texto?"

```python
# Script simple
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
    
    def handle_data(self, data):
        if data.strip():
            self.text.append(data.strip())

parser = TextExtractor()
with open('/Users/morente/Desktop/THEIA_PATH/NOVELA/LIBRO/[El-borrego-avispado]-Aquí-estoy-yo.html') as f:
    parser.feed(f.read())

texto = ' '.join(parser.text)
print(texto)
```

---

## 📊 ESTADÍSTICAS DE ACCESO

### Consultados en análisis (2026-01-07):
- ✅ Todos 11 archivos verificados
- ✅ Contenidos indexados
- ✅ Fragmentos autorizados extraídos
- ✅ Metadatos validados

### Próxima revisión:
- 2026-01-14 (pre-integración Cap.1)

---

## 🎯 PRÓXIMO PASO

**Después de acceder a los archivos originales**:
1. Consulta [01_ficha_comentario_borrego_avispado.md](01_ficha_comentario_borrego_avispado.md)
2. Compara análisis teórico con experiencia lectora
3. Anota preguntas o discrepancias
4. Reporta a @revisor

---

**Guía compilada por**: @aleph  
**Versión**: 1.0  
**Fecha**: 7 enero 2026  
**Status**: ✅ Lista para uso

