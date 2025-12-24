# Prompt: Crear Mapa de Enlaces

Guía al usuario para crear un mapa de enlaces desde una fuente de datos.

---

## Input esperado

El usuario describe:
- Tema del mapa
- Fuente de datos (Wikipedia, custom, etc.)
- Nodo inicial

---

## Flujo del prompt

1. **Tema**: ¿Sobre qué quieres el mapa de enlaces?

2. **Fuente de datos**:
   - MediaWiki (preset disponible)
   - JSON personalizado
   - API externa

3. **Configuración**:
   - Nodo inicial (punto de partida)
   - Profundidad de exploración (1-3 niveles)
   - Límite de enlaces por nodo

4. **Visualización**:
   - Formato de salida (JSON, SVG, HTML)
   - ¿Guardar para navegación posterior?

5. **Generación**:
   - Llamar a IGraphSource.getNode() para nodo inicial
   - Llamar a IGraphSource.getLinks() recursivamente
   - Generar estructura de grafo
   - Guardar en `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/graphs/`

---

## Output

Archivo JSON con el grafo generado:

```json
{
  "name": "Mapa IA",
  "source": "mediawiki",
  "root": "Inteligencia artificial",
  "nodes": [
    {"id": "ai", "title": "Inteligencia artificial"},
    {"id": "ml", "title": "Machine learning"},
    {"id": "nn", "title": "Neural network"}
  ],
  "links": [
    {"source": "ai", "target": "ml"},
    {"source": "ml", "target": "nn"}
  ]
}
```
