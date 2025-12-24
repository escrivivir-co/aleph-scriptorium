# Prompt: Crear Flow de Juego

Guía al usuario para crear un flow de juego de navegación tipo wiki-racer.

---

## Input esperado

El usuario describe qué tipo de juego quiere crear:
- Navegación entre conceptos (ej: Wikipedia)
- Búsqueda de caminos
- Exploración de grafos

---

## Flujo del prompt

1. **Pregunta inicial**: ¿Quieres partir del template wiki-racer o crear desde cero?

2. **Si template**:
   - Copiar `ARCHIVO/PLUGINS/WIRING_APP/templates/wiki-racer.json`
   - Renombrar según nombre del juego
   - Personalizar nodos de configuración
   - Actualizar endpoints de API

3. **Si desde cero**:
   - Definir estados del juego (usar enum de wiki-racer como referencia)
   - Crear nodos de configuración (ui_form)
   - Crear motor de juego (function + switch)
   - Crear interfaz (ui_text, ui_button)

4. **Personalización**:
   - ¿Qué API usará? (Wikipedia, otra fuente)
   - ¿Cuántos jugadores?
   - ¿Qué métricas mostrar?

5. **Exportación**:
   - Generar JSON compatible con Node-RED
   - Guardar en `ARCHIVO/PLUGINS/WIRING_APP/flows/`

---

## Output

Archivo JSON con el flow configurado, listo para importar en Node-RED o usar con WireEditor.

---

## Ejemplo

```
Usuario: Quiero crear un juego de navegación por conceptos científicos

WiringApp:
1. Partiré del template wiki-racer y lo adaptaré
2. Cambiaré el endpoint a una API de artículos científicos
3. Crearé los nodos de visualización de camino
4. Exportaré como `ciencia-racer.json`
```
