---
agent: 'Bibliotecario'
description: 'Cargar un nuevo tomo a la biblioteca enciclopédica'
---

# Cargar Tomo

Proceso para añadir un nuevo tomo a la Biblioteca Enciclopédica del Scriptorium.

## Requisitos Previos

1. **Directorio del tomo** en `ARCHIVO/ENCICLOPEDIA/{nombre-tomo}/`
2. **README.md** con índice estructurado (tabla con capítulos)
3. **Materiales** (pueden estar en .gitignore si son pesados)

## Entrada

- **Ruta**: Ubicación del directorio del tomo
- **Nombre corto**: Identificador kebab-case (ej: `hdf-ernesto-castro`)
- **Nombre del agente**: PascalCase (ej: `HDF-ErnestoCastro`)

## Proceso

### 1. Leer Índice

```
Analiza el README.md del tomo para extraer:
- Título completo
- Autor(es)
- Año/período
- Número de capítulos
- Estructura temática
```

### 2. Crear Agente de Tomo

Generar archivo en `.github/plugins/enciclopedia/agents/tomos/{id}.agent.md`:

```yaml
---
name: {NombreAgente}
description: Agente especialista en el tomo "{título}"
tools: ['vscode', 'read', 'search']
handoffs:
  - label: Volver al Bibliotecario
    agent: Bibliotecario
---
```

El agente debe incluir:
- Índice completo embebido
- Mapas temáticos transversales
- Protocolo de respuesta

### 3. Actualizar Manifest

Añadir entrada en `.github/plugins/enciclopedia/manifest.md`:

```yaml
agents:
  - name: "{NombreAgente}"
    file: "agents/tomos/{id}.agent.md"
    description: "..."

tomos:
  - id: "{id}"
    nombre: "{título}"
    autor: "{autor}"
    capitulos: N
    fuente: "ARCHIVO/ENCICLOPEDIA/{carpeta}/"
```

### 4. Actualizar Bibliotecario

Añadir handoff en `agents/bibliotecario.agent.md`:

```yaml
handoffs:
  - label: Consultar {título}
    agent: {NombreAgente}
```

### 5. Generar Commit

```
feat(script/plugins): añadir tomo "{título}" a enciclopedia

- Crear agente {NombreAgente}
- Actualizar manifest con nuevo tomo
- Añadir handoff en Bibliotecario

refs #SCRIPT-ENCICLOPEDIA-Txx
```

## Salida

- Confirmación de carga exitosa
- Resumen del tomo (capítulos, temas detectados)
- Instrucciones de uso

## Ejemplo

```
@Bibliotecario cargar-tomo ARCHIVO/ENCICLOPEDIA/Historia del Arte/

→ Analizando README.md...
→ Detectados 45 capítulos
→ Creando agente HDA-NombreAutor...
→ Actualizando manifest...
→ ✅ Tomo "Historia del Arte" cargado correctamente

Uso: @HDA-NombreAutor ¿Qué hay sobre el Renacimiento?
```
