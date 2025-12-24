# Conversación PO-SM: HyperGraphEditor (Wiki-Racer → Navegador de Hipergrafos)

**Fecha**: 2025-12-24  
**Submódulo**: `wiki-racer`  
**Plugin objetivo**: `hypergraph-editor`

---

## Análisis Técnico (SM)

### Inventario del submódulo

**Componentes relevantes para HyperGraphEditor**:
- `src/juego.ts` — Motor de navegación entre nodos
- `src/index.ts` — API de búsqueda de caminos
- `CRIPTA/tree.json` — Almacenamiento de grafos explorados
- Wikipedia API integration — Extracción de hipervínculos

**Capacidades del motor**:
- Búsqueda bidireccional (desde inicio y desde final)
- Detección de caminos óptimos
- Gestión de candidatos (hipervínculos disponibles)
- Almacenamiento de árboles de exploración

### Abstracción del concepto

El wiki-racer es un caso específico de **navegador de hipergrafos**:

```
Wikipedia → MediaWiki → Cualquier sistema con hipervínculos
                                ↓
                        HyperGraphEditor
                                ↓
                  ┌─────────────┼─────────────┐
                  ↓             ↓             ↓
            MediaWiki      ARCHIVO/       ARG Board
             preset       Enciclopedia     obras.json
```

### Gaps identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | Abstraer motor para aceptar cualquier ontología | Must | 1 |
| G2 | Crear interfaz `IGraphSource` para conectores | Must | 1 |
| G3 | Implementar preset MediaWiki como ejemplo | Must | 1 |
| G4 | Implementar preset ARCHIVO/ (navegar documentos) | Should | 2 |
| G5 | Visualización del grafo explorado | Could | 2 |

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Abstracción rompe funcionalidad específica Wikipedia | Media | Medio | Mantener preset por defecto |
| Grafos grandes causan problemas de rendimiento | Media | Alto | Limitar profundidad de búsqueda |
| API rate limiting en fuentes externas | Alta | Medio | Implementar caché y throttling |

---

## Visión de Producto (PO)

### Casos de uso objetivo

1. **UC1**: Usuario define nodo inicio y nodo destino en un grafo
2. **UC2**: Sistema explora caminos posibles mostrando candidatos
3. **UC3**: Usuario (o agente) selecciona siguiente hipervínculo
4. **UC4**: Sistema traza y visualiza el camino recorrido
5. **UC5**: Usuario guarda el camino como "mapa de navegación"

### Presets planificados

| Preset | Fuente | Uso |
|--------|--------|-----|
| `mediawiki` | Wikipedia/MediaWiki | Navegación enciclopédica |
| `archivo` | ARCHIVO/ del Scriptorium | Navegación interna |
| `enciclopedia` | Plugin Enciclopedia | Navegación de tomos |

### Criterios de éxito

- [ ] Motor acepta cualquier `IGraphSource` compatible
- [ ] Preset MediaWiki funciona con Wikipedia ES
- [ ] Al menos un camino puede trazarse y guardarse
- [ ] Agente HyperGraphEditor asesora sobre navegación

---

## Decisiones Arquitectónicas

1. **HyperGraphEditor es un plugin TRANSVERSAL**:
   - No depende de otros plugins
   - Puede usarse de forma independiente
   - Ofrece su motor a otros plugins

2. **Los presets definen la fuente de datos**:
   ```json
   {
     "id": "mediawiki",
     "name": "MediaWiki",
     "baseUrl": "https://es.wikipedia.org/wiki/",
     "apiEndpoint": "/w/api.php",
     "linkSelector": "a[href^='/wiki/']"
   }
   ```

3. **Los grafos explorados se almacenan en `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/graphs/`**

4. **Interfaz IGraphSource**:
   ```typescript
   interface IGraphSource {
     getNode(id: string): Promise<Node>;
     getLinks(nodeId: string): Promise<Link[]>;
     search(query: string): Promise<Node[]>;
   }
   ```

---

## MediaWiki Preset (Entregable adicional)

**Archivo**: `ARCHIVO/PLUGINS/HYPERGRAPH_EDITOR/presets/mediawiki.json`

```json
{
  "id": "mediawiki",
  "name": "Wikipedia (MediaWiki)",
  "version": "1.0.0",
  "description": "Preset para navegar Wikipedia y otras instancias MediaWiki",
  "config": {
    "baseUrl": "https://es.wikipedia.org/wiki/",
    "apiEndpoint": "https://es.wikipedia.org/w/api.php",
    "language": "es",
    "maxDepth": 6,
    "maxCandidates": 50,
    "excludePatterns": [
      "^Especial:",
      "^Archivo:",
      "^Categor%C3%ADa:",
      "^Ayuda:"
    ]
  },
  "author": "Aleph Scriptorium",
  "license": "AIPL v1.0"
}
```

---

## Próximos Pasos

- [x] Generar backlog borrador
- [ ] Consultar al usuario (modo consultivo)
- [ ] Aprobar con `@scrum aprobar`
