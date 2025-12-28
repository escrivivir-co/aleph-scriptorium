# Inicialización de Obra: Ítaca Digital

**Fecha**: 2025-12-28  
**Obra**: itaca-digital (YAML generado)  
**Estado**: ✅ Generada → Instalación pendiente

---

## Resumen Ejecutivo

| Aspecto | Valor |
|--------|-------|
| **ID** | `itaca-digital` |
| **Título** | Ítaca Digital: El Retorno del Navegante |
| **Tipo** | narrativa |
| **Personaje Guía** | Penélope |
| **Duración Estimada** | 6 horas |
| **Nivel** | intermedio |
| **Estadios** | 12 (monomito Campbell) |
| **Dependencias** | 4 plugins, 14 agentes |

---

## Ubicaciones de Archivos

| Recurso | Ruta |
|--------|------|
| YAML Obra | `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml` |
| Mapeo Selectivo | `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/mapeo-selectivo.md` |
| Fuente Remota | `/Users/morente/Desktop/THEIA_PATH/NOVELA/` |
| Inicialización | `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/inicializacion.md` (este archivo) |

---

## Estructura de Monomito

```
Anillo 0: Mundo Ordinario (Estadio 1)
     ↓
Anillo 1: Llamada + Rechazo + Mentor + Umbral (Estadios 2-5)
     ↓
Anillo 2: Aliados + Cueva + Ordalia + Recompensa (Estadios 6-9)
     ↓
Anillo 3: Retorno + Resurrección + Elixir (Estadios 10-12)
```

---

## Mapeo a Fuente (NOVELA)

| Estadio | Nombre | Fuente |
|---------|--------|--------|
| 1 | Mundo Ordinario | Abstract_Portada.md |
| 2 | Llamada | Apertura_Ulises_y_Penelope.md |
| 3 | Rechazo | Capitulo01_Onan_y_Tamar.md |
| 4 | Mentor | Capitulo02_Orfeo_y_Eurídice.md |
| 5 | Umbral | Capitulo03_Edipo_y_Electra.md |
| 6 | Aliados | Capitulo04_La_Caverna_y_el_Sol.md |
| 7 | Cueva | Capitulo04_Z_Intermezzo_Homero_y_Joyce.md |
| 8 | Ordalia | Capitulo05_Atenas.md |
| 9 | Recompensa | Capitulo06_Politica_en_Platon.md |
| 10 | Retorno | Capitulo07_Polis.md |
| 11 | Resurrección | Capitulo08_Gaia.md |
| 12 | Elixir | filo/00_Exordio/ |

---

## Personajes Identificados

| Personaje | Rol | Fuente |
|-----------|-----|--------|
| **Penélope** | Guía (personaje_guia) | Apertura_Ulises_y_Penelope.md |
| **Ulises** | Navegante ausente | Abstract_Portada.md + Apertura |
| **Orfeo** | Mentor (Estadio 4) | Capitulo02_Orfeo_y_Eurídice.md |
| **Edipo** | Revelación (Estadio 5) | Capitulo03_Edipo_y_Electra.md |
| **Platón** | Filósofo-guía (Estadios 6-8) | Capitulo04 + Capitulo06 |

**Nota**: Estos personajes necesitarán ser creados/validados en `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/actores.json` durante la **Fase 2: Instalación**.

---

## Agentes Asignados

### Capa UI
- `@vestibulo` — Orientación inicial (Estadio 1)
- `@cartaspuerta` — Presentación por perfil (Estadio 1)
- `@aleph` — Producción de contenido (Estadio 9)
- `@revisor` — Auditoría doctrinal (Estadio 10)
- `@periodico` — Generación de noticias (Estadio 2)

### Capa Backend (5 Banderas)
- `@blueflag` — Auditoría de verdad (Estadio 3)
- `@blackflag` — Auditoría de sombras (Estadio 5)
- `@redflag` — Auditoría de estructura (Estadio 6)
- `@yellowflag` — Auditoría de límites (Estadio 7)
- `@orangeflag` — Auditoría de registro (Estadio 8)

### Plugins
- `@plugin_ox_enciclopedia` — Consulta de tomos (Estadios 4, 8)
- `@plugin_ox_agentcreator` — Creación de personajes (Estadio 6)
- `@plugin_ox_argboard` — Gestión de obras (Estadio 11)
- `@plugin_ox_ghpages` — Publicación web (Estadio 12)

---

## Próximos Pasos

### Fase 1: ✅ Completada
- [x] Generar YAML de obra (estructura monomito)
- [x] Crear directorio de taller `/DISCO/TALLER/NOVELA_TRANSMEDIA/`
- [x] Inicializar mapeo selectivo

### Fase 2: 📋 Instalación
- [ ] **Validar Personaje Guía**: ¿Existe `penelope` en `ARG_BOARD/actores.json`?
  - Si NO: crear con `@plugin_ox_agentcreator`
- [ ] **Registrar Obra en ARG Board**: Actualizar `obras.json`
- [ ] **Crear entrada en GH-Pages**: Actualizar `docs/teatro.md`
- [ ] **Verificar dependencias**: Confirmar instalación de 4 plugins

### Fase 3: 🎯 Mapeo Selectivo de Contenidos
Por cada estadio (1-12):
1. Abrir archivo fuente de NOVELA
2. Extraer 1-2 párrafos clave
3. Almacenar en `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/estadio-{N}.md`
4. Actualizar `itaca-digital.yaml` con `contenido` refinado

**IMPORTANTE**: No hacer batch. Selectivo por necesidad.

### Fase 4: 🎬 Ejecución
- [ ] Generar página interactiva (impress.js)
- [ ] Publicar en GitHub Pages
- [ ] Registrar estado: `en_escena`

---

## Notas Técnicas

### Validación Pre-Instalación

```bash
# Antes de pasar a Fase 2, verificar:
1. ¿Existe itaca-digital.yaml con estructura válida?
2. ¿Están los 12 estadios completos?
3. ¿Todos los @agentes están disponibles?
4. ¿Existen las 4 dependencias de plugins?
```

### Convenciones Aplicadas

- **ID**: `itaca-digital` (kebab-case, slug único)
- **Tipo**: `narrativa` (no onboarding/educativa/ritual)
- **Anillos**: 0-3 (visualización concéntrica del monomito)
- **Features**: Mezcla de banderas + plugins especializados
- **Duración**: 6h total ≈ 30-50 min por estadio

---

## Integración con Backlog

- **Epic**: SCRIPT-1.23.0 (MMCO Editor Transmedia)
- **Story**: Implementar Cartelera de Obras
- **Task**: Crear obra piloto de narrativa clásica

**Refs**: `#SCRIPT-1.23.0-T015` (crear)

---

## Punto de Contacto

Para consultas sobre la estructura:
- Instrucciones: `.github/plugins/teatro/instructions/teatro-interactivo.instructions.md`
- Prompt de generación: `.github/plugins/teatro/prompts/teatro-generar-obra.prompt.md`
- Documentación: `docs/teatro.md`

---

**Estado Actual**: ✅ **LISTA PARA INSTALAR**  
**Próximo Agente**: `@plugin_ox_teatro` (fase 2)
