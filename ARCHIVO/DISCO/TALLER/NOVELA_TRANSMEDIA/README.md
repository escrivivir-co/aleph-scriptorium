# ÍNDICE DE TALLER: NOVELA_TRANSMEDIA

> **Propósito**: Gobernar el mapeo selectivo de la carpeta remota NOVELA hacia la obra teatral *Ítaca Digital*  
> **Estrategia**: SIN batch. Por demanda. Cada estadio al momento.  
> **Responsable**: Usuario + Teatro Interactivo

---

## Archivos de Gobierno

| Archivo | Propósito | Estado |
|---------|-----------|--------|
| **mapeo-selectivo.md** | Catálogo de fuentes + fases de mapeo | 📍 Maestro |
| **inicializacion.md** | Resumen de obra + fases + checklist | 📍 Maestro |
| **estadio-01-instrucciones.md** | Plantilla de cómo mapear Estadio 1 | 📐 Plantilla |
| **README.md** | Este archivo (índice de taller) | 📍 Raíz |

---

## Flujo de Mapeo Selectivo

```
1. Usuario identifica necesidad
   └─ "Necesito contenido para Estadio 4"

2. Consultar mapeo-selectivo.md
   └─ Fila de Estadio 4 → Fuente: "Capitulo02_Orfeo_y_Eurídice.md"

3. Leer fuente desde NOVELA remota
   └─ /Users/morente/Desktop/THEIA_PATH/NOVELA/Capitulo02_Orfeo_y_Eurídice.md

4. Crear estadio-04-{titulo}.md en este directorio
   └─ Documentar extracción, conexión con features, notas

5. Actualizar mapeo-selectivo.md
   └─ Cambiar [ ] a [x] en fila de Estadio 4

6. Actualizar itaca-digital.yaml
   └─ Enriquecer campo `contenido` del estadio 4
   └─ O crear referencia: "→ ver estadio-04-{titulo}.md"

7. Registrar en inicializacion.md
   └─ Actualizar checklist "Fase 3: Mapeo Selectivo"

8. Siguiente estadio
```

---

## Matriz de Decisión: ¿Mapear Ahora?

| Pregunta | Respuesta = SÍ | Respuesta = NO |
|----------|---|---|
| ¿Necesitas contenido para este estadio? | ✅ Mapear | ⏸️ Diferir |
| ¿Tienes acceso a la fuente remota? | ✅ Mapear | ❌ Bloquear |
| ¿Es núcleo narrativo o complementario? | ✅ Mapear | ⏸️ Diferir |
| ¿Requiere sincronización con otros estadios? | ✅ Mapear | ⏸️ Diferir |

---

## Categorías de Archivo NOVELA

Según mapeo-selectivo.md:

| Categoría | Incluir | Por Qué |
|-----------|---------|--------|
| **Narrativa Core** (Cap01-08) | ✅ Sí | Eje del monomito |
| **Fragmentos Clave** (poema, fandangos) | 🔍 Revisar | Posibles subtramas |
| **Filosófico** (filo/) | ✅ Sí (Estadio 12) | Base de Elixir |
| **Código/IDE** (.ts, .py) | ⏸️ Diferir | Implementación técnica |
| **Compiladas** (CHULETA/, LIBRO/) | 🗂️ Referencia | Derivadas, no mapear |
| **Alternativas** (ALTERMUNDIAL/, SPOT*) | ⏸️ Diferir | Solo si necesario |

---

## Plantilla de Estadio

Cuando crees `estadio-{N}-{titulo}.md`:

```markdown
# Estadio {N}: {Nombre del Estadio}

**Fuente**: {ruta en NOVELA}
**Duración**: {X min}
**Feature**: {@agente(s)}

## Contexto de Mapeo
{Qué rol juega este estadio en el monomito}

## Extracción Planificada
### De leer
- [ ] {archivo1}
- [ ] {archivo2}

### Palabras Clave
- `keyword1`

### Temas Nucleares
1. Tema 1
2. Tema 2

## Contenido Extraído (Borrador)
{2-3 párrafos clave de la fuente}

## Conexión con Features
{Cómo se relaciona con @agentes asignados}

## Checklist
- [ ] Leer fuentes
- [ ] Extraer párrafos
- [ ] Validar conexión con features
- [ ] Marcar como "mapeado" en mapeo-selectivo.md
```

---

## Referencias Cruzadas

| Documento | Contiene | Responsabilidad |
|-----------|----------|-----------------|
| `mapeo-selectivo.md` | Catálogo + fases globales | Actualizar estado de fases |
| `inicializacion.md` | Resumen + checklist | Actualizar checklist de Fase 3 |
| `estadio-{N}-*.md` | Detalles de mapeo | Crear uno por estadio mapeado |
| `itaca-digital.yaml` | YAML de la obra | Enriquecer con contenido extraído |

---

## Convenciones

### Nombres de Archivo
- Estadios: `estadio-{N:02d}-{titulo-kebab-case}.md`
- Ejemplo: `estadio-04-orfeo-canta.md`

### Frontmatter (opcional)
```yaml
---
numero_estadio: 4
nombre: "El Encuentro con el Mentor: Orfeo Canta"
duracion: "35 min"
feature: "@plugin_ox_enciclopedia"
fuente: "/Users/morente/Desktop/THEIA_PATH/NOVELA/Capitulo02_Orfeo_y_Eurídice.md"
estado: "mapeado"
fecha_mapeo: "2025-12-28"
---
```

### Commits
```
feat(teatro/novela): mapear estadio-04 (Orfeo Canta)

- Leer Capitulo02_Orfeo_y_Eurídice.md
- Extraer 2 párrafos sobre mentoraje narrativo
- Conectar con @plugin_ox_enciclopedia
- Actualizar mapeo-selectivo.md + itaca-digital.yaml

refs #SCRIPT-1.23.0-T015
```

---

## Métricas de Progreso

| Fase | Completadas | Total | % |
|------|------------|-------|---|
| Generación (YAML) | 1 | 1 | 100% |
| Taller inicializado | 1 | 1 | 100% |
| Mapeo selectivo | 0 | 12 | 0% |
| Instalación | 0 | 1 | 0% |
| Ejecución (publicada) | 0 | 1 | 0% |

---

## Próximas Acciones

### Inmediato
1. Leer `mapeo-selectivo.md` → Entender catálogo de fuentes
2. Decidir: ¿Mapear Estadios 1-5 ahora (núcleo)?
3. O diferir hasta tener claros los usuarios finales

### Instalación (cuando esté lista)
Invocar: `@plugin_ox_teatro instalar itaca-digital`

---

## Contacto y Recursos

- **Instrucciones Teatro**: `.github/plugins/teatro/instructions/teatro-interactivo.instructions.md`
- **Prompt de Generación**: `.github/plugins/teatro/prompts/teatro-generar-obra.prompt.md`
- **YAML de Obra**: `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml`
- **Documentación**: `docs/teatro.md`

---

**Última actualización**: 2025-12-28  
**Estado**: 🟢 Listo para mapeo selectivo
