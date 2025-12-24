# Conversación PO-SM: ArgBoardApp (Wiki-Racer → Máquina de Estados ARG)

**Fecha**: 2025-12-24  
**Submódulo**: `wiki-racer`  
**Plugin objetivo**: `arg-board-app`

---

## Análisis Técnico (SM)

### Inventario del submódulo

**Componentes relevantes para ArgBoardApp**:
- `src/estado.ts` — Máquina de estados con Etapa y Error
- `src/juego.ts` — Lógica de transiciones
- Patrón de navegación por hipervínculos

**Estados disponibles** (`estado.ts`):
```typescript
enum Etapa {
    NoIniciado = "NoIniciado",
    Reintentar = "Reintentar",
    Iniciado = "Iniciado",
    Acabado = "Acabado",
    Esperando = "Esperando"
}
```

### Mapeo a Teatro ARG

| Estado wiki-racer | Estado en Teatro | Acción impress.js |
|-------------------|------------------|-------------------|
| NoIniciado | Obra en cartelera | Mostrar portada |
| Iniciado | Obra en escena | Navegar a diapositiva 1 |
| Esperando | Pausa narrativa | Mostrar opciones al usuario |
| Reintentar | Volver atrás | `impress().prev()` |
| Acabado | Fin de obra | Mostrar créditos/resumen |

### Gaps identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | Crear adaptador estado.ts → BOE (Boletín Oficial) | Must | 1 |
| G2 | Integrar con sistema de obras.json de Teatro | Must | 1 |
| G3 | Implementar transiciones como eventos impress.js | Should | 1 |
| G4 | Sincronizar camino trazado con mapa de diapositivas | Should | 2 |

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Estados de wiki-racer no cubren casos de Teatro | Media | Medio | Extender enum Etapa |
| Conflicto con sistema de estados de ARG Board | Baja | Alto | Usar adaptador |
| Transiciones síncronas vs asíncronas | Media | Bajo | Usar RxJS del submódulo |

---

## Visión de Producto (PO)

### Casos de uso objetivo

1. **UC1**: Obra de Teatro usa máquina de estados de wiki-racer para navegación
2. **UC2**: Usuario (o agente) decide transiciones que mueven diapositivas
3. **UC3**: El camino trazado se registra en BOE como cadena de eventos
4. **UC4**: Al finalizar, se genera resumen del camino recorrido

### Criterios de éxito

- [ ] Una obra existente puede usar ArgBoardApp como motor de estados
- [ ] Las transiciones de estado disparan eventos de navegación
- [ ] El BOE registra cada transición como entrada oficial
- [ ] El usuario puede "volver atrás" sin perder contexto

---

## Decisiones Arquitectónicas

1. **ArgBoardApp EXTIENDE el concepto de obras en Teatro**:
   - No reemplaza obras.yaml, lo complementa
   - Añade lógica de estados a las escenas

2. **Los estados se sincronizan con BOE**:
   - Cada transición genera una entrada en el Boletín Oficial
   - El BOE es la fuente de verdad del camino recorrido

3. **Integración bidireccional con impress.js**:
   - Estado → impress.js: Transición dispara `goto(step)`
   - impress.js → Estado: Navegación manual actualiza estado

4. **Los datos de partida se almacenan en `ARCHIVO/PLUGINS/ARG_BOARD_APP/partidas/`**

---

## Próximos Pasos

- [x] Generar backlog borrador
- [ ] Consultar al usuario (modo consultivo)
- [ ] Aprobar con `@scrum aprobar`
