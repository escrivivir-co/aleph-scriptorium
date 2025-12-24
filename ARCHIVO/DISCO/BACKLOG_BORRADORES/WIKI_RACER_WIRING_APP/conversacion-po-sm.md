# Conversación PO-SM: WiringApp (Wiki-Racer → Node-RED Flows)

**Fecha**: 2025-12-24  
**Submódulo**: `wiki-racer`  
**Plugin objetivo**: `wiring-app`

---

## Análisis Técnico (SM)

### Inventario del submódulo

**Componentes relevantes para WiringApp**:
- `node-red-contrib-wikir-racer/flow.json` — Flow de 1680 líneas con UI dashboard
- `node-red-contrib-wikir-racer/game.js` — Nodo personalizado
- `node-red-contrib-wikir-racer/package.json` — Configuración del nodo Node-RED

**Tecnologías**:
- Node-RED 2.1.5
- Dashboard UI components (ui_form, ui_text, ui_button)
- Nodos function y switch

### Relación con plugins existentes

| Plugin existente | Relación con WiringApp |
|------------------|------------------------|
| `wire-editor` | WiringApp **extiende** WireEditor como ejemplo de app |
| `typed-prompting` | Validación de payloads JSON en flows |
| `n8n-editor` | Concepto similar pero diferente formato |

### Gaps identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | Adaptar flow.json al formato esperado por WireEditor | Must | 1 |
| G2 | Documentar nodos personalizados disponibles | Must | 1 |
| G3 | Crear template base para flows tipo "juego" | Should | 1 |
| G4 | Integrar con TypedPrompting para validación | Could | 2 |

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Flow incompatible con Node-RED versiones nuevas | Baja | Medio | Testear en Node-RED 3.x |
| Nodos UI dashboard deprecados | Media | Bajo | Usar nodos base sin dashboard |
| Dependencia de Wikipedia API | Baja | Bajo | Mockear para desarrollo |

---

## Visión de Producto (PO)

### Casos de uso objetivo

1. **UC1**: Usuario abre WireEditor y carga un flow tipo WikiRacer
2. **UC2**: Usuario crea un flow nuevo basado en la plantilla de juego
3. **UC3**: Usuario exporta un flow a formato Node-RED compatible
4. **UC4**: Agente WiringApp asesora sobre nodos disponibles

### Criterios de éxito

- [ ] Flow.json de wiki-racer se carga correctamente en WireEditor
- [ ] Al menos 1 template de "juego de navegación" disponible
- [ ] Documentación de nodos personalizados completa
- [ ] Agente WiringApp responde consultas sobre flows

---

## Decisiones Arquitectónicas

1. **WiringApp es una EXTENSIÓN de WireEditor, no un reemplazo**:
   - Usa la infraestructura de WireEditor
   - Añade templates y nodos específicos para juegos de navegación

2. **El agente WiringApp se especializa en flows de juego**:
   - Conoce el patrón de wiki-racer
   - Puede adaptar el patrón a otros casos

3. **Los flows se almacenan en `ARCHIVO/PLUGINS/WIRING_APP/flows/`**:
   - Separación de datos runtime del código

---

## Próximos Pasos

- [x] Generar backlog borrador
- [ ] Consultar al usuario (modo consultivo)
- [ ] Aprobar con `@scrum aprobar`
