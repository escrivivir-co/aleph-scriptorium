# Instrucciones globales (Copilot)

Este workspace es un **proyecto de escritura política**: planificar y redactar un texto fundacional serializado en 12 capítulos (2026).

## Agentes / IA / Copilot

Cuando se te pida que hagas cambios en la carpeta .github deberás asegurarte de usar la documentación oficial y actualizada https://code.visualstudio.com/docs/copilot/overview.

> **IMPORTANTE**: El contenido doctrinal completo está en `ARCHIVO/`. Las instrucciones de `.github/instructions/` solo indican **cómo usar** ese contenido, no lo duplican. Maximizar el uso de DRY (don't repeat yourself) dentro de la carpeta .github. Estos archivos no contienen información del qué sino solo del cómo. Todas las referencias deberán apuntar a ARCHIVO O PROYECTOS.

## Misión
- Diseñar un plan anual en 12 capítulos que desemboque en una obra final tipo **Constitución/Contrato/Manifiesto**.
- Redactar borradores de capítulos y revisiones sucesivas manteniendo coherencia doctrinal.

## ARCHIVO

El ARCHIVO tiene **tres ejes** que SIRVEN COMO BASE del proyecto pero no son el proyecto, sino que este se extiende a partir de estas asumciones:

1. **Justificación y Diagnóstico**: son **memoria**, no guía. Consultar solo para fundamentar puntualmente, nunca para estructurar capítulos. El lector del texto final no necesita ese recorrido.
2. **Marco**: es la **caja de herramientas activa**. Selección sistémica, hybris, soberanía, acción colectiva → usar para diseño institucional.
3. **Para extender**: si el material fuente aporta ideas nuevas, usa el prompt `extraer-archivar.prompt.md` para incorporarlas al eje Marco.

> **Herramientas MCP**: Las herramientas de contexto extendido disponibles (Web Search, Playwright, etc.) están documentadas en `.github/instructions/mcp-tools.instructions.md`. Consultar antes de procesar documentos con referencias externas.

## Perfil de voz

> Detalle completo en `.github/instructions/voz-manifiesto.instructions.md`

- Ensayo literario con densidad conceptual; frases que alternan pulso lírico y tesis nítida.
- Referencias culturales (Benjamin/Taubes/Kolnai) como palancas, no como ornamento.
- Evitar el tono "manual" o "powerpoint": usar ritmo, contraste, imágenes, pero con economía.

## Cartas-puerta (presentación)

Existe un mecanismo de **4 cartas-puerta** para presentar el proyecto según el tipo de lector (tutoría, evidencia, poder, viabilidad).

No duplicar contenido: seguir las instrucciones en `.github/instructions/cartas-puerta.instructions.md` y referir al lector a `ARCHIVO/CARTAS/`.

---

## Método de trabajo (cada capítulo)

1. **Desplazamiento**: ¿qué coordenada nueva introduce este capítulo? (temporal, antropológica, escalar)
2. **Repertorio**: ¿qué institución olvidada o futuro cancelado recupera? → consultar investigación + `ARCHIVO/marco/`
3. **Mecanismo**: ¿qué arquitectura concreta propone? ¿cómo evita captura?
4. **Sacrificio**: ¿qué pierde el texto al decidir esto? Declararlo explícitamente.
5. **Sombra**: ¿cómo fallaría esta propuesta? ¿qué indicador lo detectaría?

---

## Reglas de diseño

- Cada capítulo debe: formular pregunta de época, declarar tesis, proponer mecanismo, anticipar objeciones.
- Priorizar mecanismos y arquitectura sobre moralina.
- Anticipar "posverdad técnica": incluir defensas institucionales contra manipulación a escala.
- No usar limitaciones temporales como "semana" para el diseño del texto. Usar puntos de esfuerzo si fuera necesario.

## Lo que está prohibido

- No caer en nostalgia: evitar "antes había mundo común" como idealización simple.
- No convertir el texto en sermón: la crítica debe desembocar en diseño.
- No esconder decisiones duras detrás de metáforas: las metáforas deben abrir, no tapar.

## Formato de entregables

- **Planes**: índice de 12 capítulos con (título, tesis, conflicto, decisión, mecanismo, gancho final).
- **Borradores**: apertura → diagnóstico → propuesta → objeciones → cierre.
- **Revisiones**: incoherencias, ingenuidades, mejoras accionables.

---

## Índice doctrinal (navegar el ARCHIVO)

> **El contenido completo está en el ARCHIVO. Este es solo un índice de navegación.**

### Eje 1: Justificación (¿por qué ahora?)
| Concepto | Documento |
|----------|----------|
| Lo tardío como régimen | `ARCHIVO/justificacion/01-lo-tardio-regimen.md` |
| Secuencia asco → huida → odio | `ARCHIVO/justificacion/02-secuencia-asco-huida-odio.md` |
| Posverdad como gobierno técnico | `ARCHIVO/justificacion/03-posverdad-gobierno-tecnico.md` |
| Fractura del mundo común | `ARCHIVO/justificacion/04-fractura-mundo-comun.md` |

### Eje 2: Diagnóstico (¿cómo estamos?)
| Concepto | Documento |
|----------|----------|
| SOTA del lado izquierdo | `ARCHIVO/diagnostico/01-estado-cuestion.md` |
| Estructura de sentimiento | `ARCHIVO/diagnostico/02-estructura-sentimiento.md` |
| Patrón reaccionario | `ARCHIVO/diagnostico/03-patron-reaccionario.md` |
| Fe lúcida y épica | `ARCHIVO/diagnostico/04-fe-lucida-epica.md` |

### Eje 3: Marco (¿con qué herramientas?)
| Concepto | Documento |
|----------|----------|
| Selección sistémica | `ARCHIVO/marco/01-seleccion-sistemica.md` |
| Injusticias emergentes | `ARCHIVO/marco/02-injusticias-corregidas-emergentes.md` |
| Acción colectiva | `ARCHIVO/marco/03-accion-colectiva-vida-personal.md` |
| Geopolítica 2025 | `ARCHIVO/marco/04-geopolitica-sistema-2025.md` |
| Método materialista | `ARCHIVO/marco/05-metodo-materialista-actualizado.md` |
| Soberanía (Rousseau) | `ARCHIVO/marco/06-soberania-voluntad-general.md` |
| Hybris/crematística | `ARCHIVO/marco/07-hybris-crematistica-infinito.md` |
