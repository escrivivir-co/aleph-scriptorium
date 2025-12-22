---
mode: 'agent'
description: 'UC3: Activa una obra (genera página impress.js y publica en GitHub Pages)'
tools: ['read', 'edit', 'agent']
---

# Ejecutar Obra (Poner en Escena)

Activa una obra instalada: genera su página interactiva impress.js y la publica en GitHub Pages.

## Entrada

- **ID de obra**: Identificador de la obra a ejecutar

## Precondiciones

- La obra debe estar en estado `en_cartel` en obras.json
- El personaje guía debe existir en actores.json
- Debe existir el directorio `docs/teatro/{id}/`

## Proceso

### 1. Leer Datos de la Obra

Cargar YAML completo:
```
ARCHIVO/PLUGINS/TEATRO/obras/{id}.yaml
```

Verificar estado en obras.json (debe ser `en_cartel`).

### 2. Generar Página Impress.js

Crear `docs/teatro/{id}/index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{titulo} | Teatro Scriptorium</title>
    <link rel="stylesheet" href="../assets/css/teatro.css">
    <script src="https://cdn.jsdelivr.net/npm/impress.js@2.0.0/js/impress.min.js"></script>
</head>
<body class="impress-not-supported">

<div class="fallback-message">
    <p>Tu navegador no soporta las características necesarias.</p>
    <p>Usa Chrome, Firefox, Safari o Edge.</p>
</div>

<div id="impress" data-transition-duration="1000">

    <!-- Estadio 0: Centro -->
    <div id="inicio" class="step" 
         data-x="0" data-y="0" data-z="0"
         data-rotate="0" data-scale="1">
        <h1>{titulo}</h1>
        <p class="guia">Guía: {personaje_guia}</p>
        <p class="descripcion">{descripcion}</p>
        <p class="instruccion">Usa las flechas para navegar →</p>
    </div>

    <!-- Estadios 1-12 generados dinámicamente -->
    {%- for estadio in estadios %}
    <div id="estadio-{{ estadio.id }}" class="step anillo-{{ estadio.anillo }}" 
         data-x="{{ posicion_x(estadio) }}" 
         data-y="{{ posicion_y(estadio) }}" 
         data-z="{{ estadio.anillo * -100 }}"
         data-rotate="{{ rotacion(estadio) }}"
         data-scale="{{ 1 - (estadio.anillo * 0.1) }}">
        <span class="numero">{{ estadio.id }}</span>
        <h2>{{ estadio.nombre }}</h2>
        <p class="tipo">{{ estadio.tipo | capitalize }}</p>
        <div class="prueba">
            <strong>Prueba:</strong>
            <p>{{ estadio.prueba }}</p>
        </div>
        <div class="feature">
            <code>{{ estadio.feature }}</code>
        </div>
    </div>
    {%- endfor %}

</div>

<!-- Panel de navegación -->
<nav id="navegacion">
    <div class="anillos">
        <label>Anillo:</label>
        <input type="range" id="slider-anillo" min="0" max="3" value="0">
        <span id="anillo-actual">0</span>
    </div>
    <div class="arbol">
        <h3>Índice</h3>
        <ul>
            <li><a href="#inicio">Inicio</a></li>
            {%- for estadio in estadios %}
            <li class="anillo-{{ estadio.anillo }}">
                <a href="#estadio-{{ estadio.id }}">
                    {{ estadio.id }}. {{ estadio.nombre }}
                </a>
            </li>
            {%- endfor %}
        </ul>
    </div>
</nav>

<script src="../assets/js/teatro.js"></script>
<script>
    impress().init();
</script>
</body>
</html>
```

### 3. Generar CSS (si no existe)

Verificar existencia de `docs/teatro/assets/css/teatro.css`. Si no existe, crear estilos base.

### 4. Generar JS (si no existe)

Verificar existencia de `docs/teatro/assets/js/teatro.js`. Si no existe, crear navegación base.

### 5. Actualizar Estado en obras.json

Cambiar estado de `en_cartel` a `en_escena`:

```json
{
  "id": "{id}",
  "estado": "en_escena",
  "ejecutado": "{ISO timestamp}",
  ...
}
```

### 6. Actualizar Cartelera

En `docs/teatro.md`:

1. Mover la obra de "En Cartel" a "En Escena"
2. Destacarla como obra activa
3. Añadir enlace directo a la página

```markdown
## 🎭 En Escena

<div class="obra-destacada">

### [{titulo}](teatro/{id}/)

> **Tipo**: {tipo} | **Nivel**: {nivel} | **Duración**: {duracion}

{descripcion}

**▶️ [Iniciar experiencia →](teatro/{id}/)**

</div>
```

### 7. Publicar vía GH-PAGES

Invocar GH-PAGES en modo fusionar:

```
@plugin_ox_ghpages fusionar
- archivos: docs/teatro/{id}/
- mensaje: "Publicar obra {titulo}"
```

### 8. Log de Ejecución

Registrar en:
```
ARCHIVO/PLUGINS/TEATRO/logs/ejecuciones.json
```

### 9. Commit

```
feat(teatro): ejecutar "{titulo}" (poner en escena)

- Generada página impress.js en docs/teatro/{id}/
- Estado actualizado a "en_escena"
- Publicado en GitHub Pages

refs #SCRIPT-1.0.0-T024
```

## Cálculo de Posiciones (Sistema de Anillos)

Para distribuir los estadios en círculos concéntricos:

```javascript
function calcularPosicion(estadio) {
    const anillo = estadio.anillo;
    const radio = anillo * 400; // 0, 400, 800, 1200 px
    
    // Distribuir estadios del anillo en círculo
    const estadiosEnAnillo = estadiosPorAnillo(anillo);
    const indiceEnAnillo = estadio.id - primerEstadioAnillo(anillo);
    const angulo = (2 * Math.PI * indiceEnAnillo) / estadiosEnAnillo;
    
    return {
        x: Math.cos(angulo) * radio,
        y: Math.sin(angulo) * radio,
        rotacion: (angulo * 180 / Math.PI) + 90
    };
}

function estadiosPorAnillo(anillo) {
    return [1, 4, 4, 4][anillo]; // Centro + 3 anillos de 4
}
```

## Salida

```
✅ Obra "{titulo}" en escena

🌐 URL: https://escrivivir-co.github.io/aleph-scriptorium/teatro/{id}/
📄 Página: docs/teatro/{id}/index.html
🎭 Estado: en_escena

La obra está ahora disponible para el público.
```

## Validaciones

- [ ] La obra existe en obras.json
- [ ] Estado actual es `en_cartel`
- [ ] YAML tiene los 12 estadios válidos
- [ ] Directorio de destino existe
- [ ] GH-PAGES está disponible

## Clausurar Obra

Para retirar una obra de escena:

1. Cambiar estado a `clausurado`
2. Mover en cartelera a sección "Archivo"
3. (Opcional) Eliminar página o marcar como archivada
4. Commit correspondiente

## MVP vs Futuro

| Aspecto | MVP (actual) | Futuro |
|---------|--------------|--------|
| Generación | Template estático | Desde JSON dinámico |
| Navegación | impress.js básico | Animaciones avanzadas |
| Persistencia | No | Progreso del usuario |
| Multi-usuario | No | WebSockets |
