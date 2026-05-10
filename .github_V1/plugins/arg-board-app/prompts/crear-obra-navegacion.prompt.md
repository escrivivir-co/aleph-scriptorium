# Prompt: Crear Obra de Navegación

Guía al usuario para crear una obra de navegación interactiva basada en wiki-racer.

---

## Input esperado

El usuario describe:
- Tema de la obra (ej: filosofía, ciencia, historia)
- Nodo inicial y objetivo
- Límites de juego

---

## Flujo del prompt

1. **Tema**: ¿Sobre qué tema será la navegación?

2. **Fuente de datos**:
   - Wikipedia (por defecto)
   - Fuente personalizada (requiere API)

3. **Configuración de partida**:
   - Nodo de inicio (artículo/concepto inicial)
   - Nodo objetivo (artículo/concepto a alcanzar)
   - Máximo de pasos permitidos
   - ¿Permitir backtrack?

4. **Interfaz**:
   - impress.js con anillos
   - Número de anillos (1-3)
   - Mostrar camino recorrido

5. **Registro**:
   - ¿Guardar en BOE?
   - ¿Qué métricas trackear?

6. **Generación**:
   - Crear archivo YAML en `ARCHIVO/PLUGINS/ARG_BOARD_APP/obras/`
   - Registrar en `obras.json` de ARG Board
   - Opcional: crear personaje guía

---

## Output

Archivo YAML con la obra configurada + entrada en obras.json.

---

## Ejemplo

```yaml
# el-camino-del-filosofo.yaml
titulo: "El Camino del Filósofo"
tipo: navegacion-wiki-racer
motor: ArgBoardApp

mapa:
  fuente: "wikipedia"
  idioma: "es"
  inicio: "Sócrates"
  fin: "Immanuel Kant"
  max_pasos: 10

interfaz:
  tipo: impress.js
  anillos: 2

registro:
  boe: true
  metricas: ["pasos", "tiempo", "backtrack"]
```
