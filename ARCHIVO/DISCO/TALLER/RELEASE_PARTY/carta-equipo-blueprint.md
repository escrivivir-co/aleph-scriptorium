# 📬 Carta al Equipo: Rediseño del Blueprint Release Party

> **De**: @novelist + @ox  
> **Para**: Equipo de implementación (GH-Pages, impress.js)  
> **Fecha**: 30 de diciembre de 2025  
> **Épica**: DEMO-1.0.0 Release Party  
> **Referencia**: `ARCHIVO/DISCO/TALLER/RELEASE_PARTY/`

---

## Resumen

Se ha creado la obra **"Release Party: El Héroe del Horror Vacui"** siguiendo la estructura del monomito (12 capítulos). Cada capítulo tiene una escena principal y notas para los slides adyacentes (Ox, Aleph, SM).

**Se solicita**: Rediseñar `docs/blueprint-po.md` para reflejar esta narrativa.

---

## Estructura de la Obra

### Personajes

| ID | Nombre | Rol | Símbolo |
|----|--------|-----|---------|
| clippy | Clippy 2.0 | Héroe | 📎 |
| ox | @ox | Mentor | 🐂 |
| aleph | @aleph | Aliado | ℵ |
| po | Product Owner | Metanarrador | 🎤 |
| devops_server | DevOps Server | Deus ex Machina | 🖥️ |

### Los 12 Pasos del Monomito

| Paso | Capítulo | Tema | Escena | Demo |
|------|----------|------|--------|------|
| 1 | El Mundo Ordinario | Horror Vacui | cursor-parpadeante | — |
| 2 | Llamada a la Aventura | Brecha Digital | voz-del-futuro | — |
| 3 | Rechazo de la Llamada | Resistencia | rechazo-llamada | — |
| 4 | Encuentro con Mentor | Ox + Run All | run-all | `runAll` ⭐ |
| 5 | Cruce del Umbral | Panel Aleph | panel-aleph | Demo Gallery |
| 6 | Pruebas/Aliados | Metanarrador | metanarrador | — |
| 7 | Cueva Interior | NovelistEditor | novelist | :3000 |
| 8 | La Ordalía | Zeus Presets | zeus-presets | :4001 |
| 9 | Recompensa | Roadmap | roadmap | GH-Pages |
| 10 | Camino de Regreso | Banners/README | estandartes | — |
| 11 | Resurrección | Fundación vacía | fundacion-vacia | — |
| 12 | Elixir | La Girándula | girandula | `runAll` loop ⭐ |

---

## Especificación de Slides

### Patrón de Coordenadas (CUBO 3D)

```
# Por cada paso N:
paso{N}-po:    data-x = N * 3000, data-y = 0
paso{N}-ox:    data-x = N * 3000, data-y = -800
paso{N}-aleph: data-x = N * 3000 - 500, data-y = 800
paso{N}-sm:    data-x = N * 3000 + 500, data-y = 800

# Overview
data-x = 16500 (centro aproximado)
data-y = 0
data-z = 4000
data-scale = 6
```

### Contenido por Slide

Cada escena tiene una sección `## NOTAS PARA SLIDES ADYACENTES` con:

- **paso{N}-ox**: Contenido técnico (stack, código, servidores)
- **paso{N}-aleph**: Contenido de producto (UX, valor, casos de uso)
- **paso{N}-sm**: Contenido de proceso (métricas, sprint, roadmap)

---

## Cambios Clave vs blueprint-po.md Actual

### Narrativa

| Actual | Nuevo |
|--------|-------|
| PO presenta producto | Clippy como héroe |
| Slides informativos | Arco narrativo (monomito) |
| Sin personaje | 5 personajes con roles |
| Demo genérico | Demo integrado en historia |

### Contenido por Paso

| Paso | Actual (blueprint-po) | Nuevo (Release Party) |
|------|----------------------|----------------------|
| 1 | Bienvenida genérica | Cursor parpadeante + horror vacui |
| 2 | El problema | La llamada digital |
| 3 | La solución | Rechazo (resistencia al cambio) |
| 4 | Demo agentes | Encuentro con Ox + Run All |
| 5 | Demo plugins | Panel de Control Aleph |
| 6 | Demo blueprints | El PO como metanarrador |
| 7 | Ecosistema | NovelistEditor (recursividad) |
| 8 | Extensibilidad | Zeus y Context Packs |
| 9 | Comunidad | Roadmap y galería |
| 10 | Cierre | Los estandartes (banners) |
| 11 | *(nuevo)* | Fundación vacía (twist) |
| 12 | *(nuevo)* | La Girándula (cierre loop) |

---

## Demos Interactivos

| Paso | Acción | Tipo |
|------|--------|------|
| 4 | `alephscript.demo.runAll` | Comando VS Code |
| 5 | http://localhost:4000/aleph-scriptorium/demo/ | Navegador |
| 7 | http://localhost:3000 | Navegador (Novelist) |
| 8 | http://localhost:4001 | Navegador (Zeus) |
| 9 | http://localhost:4000/aleph-scriptorium/roadmap/ | Navegador |
| 12 | `alephscript.demo.runAll` (loop) | Comando VS Code |

---

## Archivos de Referencia

| Recurso | Ruta |
|---------|------|
| Obra completa | `ARCHIVO/DISCO/TALLER/RELEASE_PARTY/obra.yaml` |
| Escenas | `ARCHIVO/DISCO/TALLER/RELEASE_PARTY/escenas/*.md` |
| Blueprint actual | `docs/blueprint-po.md` |
| Plantilla CSS | `docs/assets/css/blueprint.css` |
| Layout | `docs/_layouts/presentation.html` |

---

## Checklist de Implementación

### Fase 1: Estructura
- [ ] Crear 12 slides principales (paso1-po ... paso12-po)
- [ ] Crear 12 slides Ox (paso1-ox ... paso12-ox)
- [ ] Crear 12 slides Aleph (paso1-aleph ... paso12-aleph)
- [ ] Crear 12 slides SM (paso1-sm ... paso12-sm)
- [ ] Total: 48 slides + 1 overview = 49 slides

### Fase 2: Contenido
- [ ] Copiar texto de escenas a slides principales
- [ ] Copiar notas a slides adyacentes
- [ ] Añadir iconografía de personajes
- [ ] Insertar bloques de código donde corresponda

### Fase 3: CSS
- [ ] Crear clases para personajes (`.clippy-style`, `.ox-style`, etc.)
- [ ] Animaciones de transición narrativa
- [ ] Highlight para demos interactivos

### Fase 4: Validación
- [ ] Navegación ← → funciona (12 pasos)
- [ ] Navegación ↑ ↓ funciona (4 niveles por paso)
- [ ] Demos interactivos verificados
- [ ] Jekyll compila sin errores

---

## Tono y Estilo

### Voz de Clippy
- Nostálgico pero esperanzado
- Referencias a Office 97 ("parece que estás escribiendo...")
- Evolución: de inseguro a integrado

### Voz de Ox
- Sereno, técnico, mentor
- Muestra código y comandos
- El que "sabe dónde está todo"

### Voz de Aleph
- Productivo, orientado a resultados
- Muestra galerías y demos
- El que "hace que las cosas pasen"

### Voz del PO
- Metanarrador, rompe la cuarta pared
- Conecta la audiencia con la historia
- El hilo conductor

---

## Notas Finales

1. **Recursividad**: En el paso 7, Clippy ve esta misma obra en NovelistEditor. Considerar un iframe o screenshot que lo refleje.

2. **Loop**: El paso 12 cierra con el mismo comando que el paso 4 (`runAll`), creando un loop narrativo.

3. **Horror Vacui**: El tema central es la transformación del miedo al vacío en oportunidad creativa. Los slides deben reflejarlo visualmente (del blanco al color).

4. **Foto de familia**: El slide final (12) debe mostrar a todos los agentes juntos con Clippy en el centro.

---

## Próximos Pasos

1. **Revisar esta carta** con el equipo
2. **Crear branch** `feat/blueprint-release-party`
3. **Implementar** según checklist
4. **Validar** con `./scripts/validate-site.sh`
5. **PR** y merge a develop

---

> **Firmado**: @novelist + @ox  
> **Épica**: DEMO-1.0.0  
> **Fecha**: 2025-12-30
