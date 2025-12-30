# RESUMEN DE GENERACIÓN: Ítaca Digital

**Fecha**: 28 de diciembre de 2025  
**Agente**: Teatro Interactivo (via prompts/teatro-generar-obra.prompt.md)  
**Estado**: ✅ LISTA PARA INSTALAR

---

## Qué se ha generado

### 1. **Obra Teatral YAML**
📍 **Ruta**: `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml`

- **ID**: `itaca-digital`
- **Título**: Ítaca Digital: El Retorno del Navegante
- **Estructura**: 12 estadios del monomito de Campbell
- **Duración**: 6 horas
- **Personaje Guía**: Penélope
- **Dependencias**: 4 plugins + 14 agentes

**Contenido**: Adaptación teatral de la carpeta NOVELA remota, con cada uno de los 12 estadios vinculado a un archivo fuente específico.

---

### 2. **Espacio de Taller Selectivo**
📍 **Ruta**: `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/`

Contiene 4 archivos de gobierno:

| Archivo | Propósito |
|---------|-----------|
| `mapeo-selectivo.md` | Catálogo de fuentes NOVELA + fases de mapeo |
| `inicializacion.md` | Resumen de obra + phases + checklists |
| `estadio-01-instrucciones.md` | Plantilla de cómo mapear un estadio |
| `README.md` | Índice de taller + flujo de trabajo |

**Característica**: Mapeo **selectivo, no batch**. Cada estadio se mapea solo cuando se necesita.

---

## Estructura del Monomito

```
Estadio  Nombre                           Anillo  Feature
─────────────────────────────────────────────────────────────
  1     Mundo Ordinario                    0     @vestibulo
  2     Llamada a la Aventura              1     @periodico
  3     Rechazo                            1     @blueflag
  4     Mentor                             1     @enciclopedia
  5     Umbral                             1     @blackflag
  6     Aliados                            2     @redflag
  7     Cueva Oculta                       2     @yellowflag
  8     Prueba Suprema                     2     @orangeflag
  9     Recompensa                         2     @aleph
 10     Retorno a Casa                     3     @revisor
 11     Resurrección                       3     @argboard
 12     Elixir                             3     @ghpages
```

---

## Mapeo de Fuentes (NOVELA)

| Estadio | Fuente (archivo NOVELA) |
|---------|---|
| 1 | `Abstract_Portada.md` |
| 2 | `Apertura_Ulises_y_Penelope.md` |
| 3 | `Capitulo01_Onan_y_Tamar.md` |
| 4 | `Capitulo02_Orfeo_y_Eurídice.md` |
| 5 | `Capitulo03_Edipo_y_Electra.md` |
| 6 | `Capitulo04_La_Caverna_y_el_Sol.md` |
| 7 | `Capitulo04_Z_Intermezzo_Homero_y_Joyce.md` |
| 8 | `Capitulo05_Atenas.md` |
| 9 | `Capitulo06_Politica_en_Platon.md` |
| 10 | `Capitulo07_Polis.md` |
| 11 | `Capitulo08_Gaia.md` |
| 12 | `filo/00_Exordio/` |

---

## Agentes Involucrados

### Capa UI (3)
- `@vestibulo` — Orientación
- `@cartaspuerta` — Presentación
- `@aleph` — Producción
- `@revisor` — Auditoría
- `@periodico` — Noticias

### Backend / 5 Banderas (5)
- `@blueflag` — Verdad
- `@blackflag` — Sombras
- `@redflag` — Estructura
- `@yellowflag` — Límites
- `@orangeflag` — Registro

### Plugins (4)
- `@plugin_ox_enciclopedia`
- `@plugin_ox_agentcreator`
- `@plugin_ox_argboard`
- `@plugin_ox_ghpages`

---

## Fases de Implementación

### Fase 1: ✅ COMPLETADA
- [x] Generar YAML de obra (12 estadios)
- [x] Crear taller `/DISCO/TALLER/NOVELA_TRANSMEDIA/`
- [x] Inicializar mapeo selectivo

### Fase 2: 📋 PRÓXIMA (Instalación)
- [ ] Validar personaje "penelope" en ARG Board
- [ ] Registrar obra en `obras.json`
- [ ] Actualizar `docs/teatro.md`
- [ ] Confirmar 4 plugins instalados

**Comando**: `@plugin_ox_teatro instalar itaca-digital`

### Fase 3: 🎯 (Mapeo Selectivo)
**Selectivo, no batch**. Ejemplo:

1. Usuario: "Dame contenido para Estadio 4"
2. Sistema consulta `mapeo-selectivo.md` → Fuente: `Capitulo02_Orfeo_y_Eurídice.md`
3. Se crea `estadio-04-orfeo-canta.md` en el taller
4. Se enriquece `itaca-digital.yaml` con el contenido
5. Siguiente estadio cuando se necesite

### Fase 4: 🎬 (Ejecución)
- [ ] Generar página interactiva (impress.js)
- [ ] Publicar en GitHub Pages
- [ ] Registrar estado: `en_escena`

---

## Acciones Recomendadas

### Ahora
1. **Revisar** `itaca-digital.yaml` → Validar estructura
2. **Consultar** `mapeo-selectivo.md` → Entender el catálogo
3. **Leer** `inicializacion.md` → Ver próximos pasos

### Próximo Paso
Invocar: `@plugin_ox_teatro` con:
```
instalar itaca-digital
```

### Durante Mapeo
Para cada estadio que necesites:
```
mapear estadio-{N} {titulo}
→ Crea estadio-{N:02d}-{titulo}.md
→ Actualiza mapeo-selectivo.md
→ Enriquece itaca-digital.yaml
```

---

## Archivos Clave

| Archivo | Para... |
|---------|---------|
| `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml` | Ver estructura completa de la obra |
| `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/README.md` | Entender flujo de taller |
| `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/mapeo-selectivo.md` | Ver catálogo de fuentes NOVELA |
| `.github/plugins/teatro/instructions/teatro-interactivo.instructions.md` | Referencia técnica |
| `docs/teatro.md` | Documentación pública |

---

## Notas

- **Fuente Remota**: `/Users/morente/Desktop/THEIA_PATH/NOVELA/`
- **No es batch**: Cada estadio se mapea selectivamente
- **Personajes**: Extraídos de la narrativa (Penélope, Ulises, Orfeo, Edipo, Platón)
- **Nivel**: Intermedio (requiere familiaridad con clásicos griegos)
- **Tipo**: Narrativa (no onboarding/educativa/ritual)

---

**Status**: 🟢 LISTA PARA INSTALAR  
**Próximo**: Invocar `@plugin_ox_teatro` con comando `instalar itaca-digital`
