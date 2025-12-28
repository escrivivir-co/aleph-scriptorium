# ESTRUCTURA FINAL: Ítaca Digital — Vista Arquitectónica

**Generado**: 2025-12-28  
**Estado**: ✅ Fase 1 completada

---

## Árbol de Directorios

```
ARCHIVO/
├── PLUGINS/TEATRO/obras/
│   └── itaca-digital.yaml ✅ [194 líneas]
│       └── 12 estadios (monomito)
│           ├── Anillo 0: 1 estadio
│           ├── Anillo 1: 4 estadios  
│           ├── Anillo 2: 4 estadios
│           └── Anillo 3: 3 estadios
│
└── DISCO/TALLER/NOVELA_TRANSMEDIA/ ✅
    ├── 00-RESUMEN-GENERACION.md ✅ [Referencia rápida]
    ├── README.md ✅ [Índice de taller + flujo]
    ├── mapeo-selectivo.md ✅ [Catálogo NOVELA + fases]
    ├── inicializacion.md ✅ [Resumen + checklists]
    └── estadio-01-instrucciones.md ✅ [Plantilla de mapeo]
```

---

## Flujo de Datos

```
                 FUENTE REMOTA
                 /Users/morente/Desktop/THEIA_PATH/NOVELA/
                           ↓
                  [12 archivos seleccionados]
                           ↓
         ┌───────────────────┴───────────────────┐
         │   MAPEO SELECTIVO (por demanda)       │
         │   ARCHIVO/DISCO/TALLER/...            │
         └───────────────────┬───────────────────┘
                           ↓
         ┌─────────────────────────────────────┐
         │   ENRIQUECIMIENTO DE YAML            │
         │   itaca-digital.yaml                 │
         │   (campo 'contenido' x 12)           │
         └─────────────────────────────────────┘
                           ↓
         ┌─────────────────────────────────────┐
         │   INSTALACIÓN (Fase 2)               │
         │   @plugin_ox_teatro instalar...      │
         └─────────────────────────────────────┘
                           ↓
         ┌─────────────────────────────────────┐
         │   EJECUCIÓN (Fase 4)                 │
         │   @plugin_ox_teatro ejecutar...      │
         │   → docs/teatro/itaca-digital/       │
         │   → GitHub Pages publicada           │
         └─────────────────────────────────────┘
```

---

## Conexión con Ecosistema Scriptorium

```
itaca-digital.yaml
        ↓
    ┌───┴────┬────────────┬──────────────┬──────────────┐
    ↓        ↓            ↓              ↓              ↓
ARG_BOARD  AGENT_CREATOR  GH-PAGES    VESTIBULO/CARTAS BANDERAS
(obras.json) (personajes)  (publicar)    (UI Layer)    (auditoría)
```

### Dependencias Verificadas

| Plugin | Función | Status |
|--------|---------|--------|
| arg-board | Gestión de obras y actores | ✅ Registrado en YAML |
| agent-creator | Creación de personajes (Penélope, etc.) | ✅ Registrado en YAML |
| gh-pages | Publicación en GitHub Pages | ✅ Registrado en YAML |
| teatro | Orquestador (este plugin) | ✅ Soporte completo |

---

## Monomito: Distribución de Agentes

```
          ANILLO 0: MUNDO ORDINARIO
          ┌─────────────────────────────────┐
          │ 1: @vestibulo, @cartaspuerta    │
          │    "Conoce Ítaca Digital"       │
          └─────────────────────────────────┘
                        ↓
        ╔════════════════════════════════════╗
        ║  ANILLO 1: INICIACIÓN             ║
        ║  ┌──────────────────────────────┐ ║
        ║  │ 2: @periodico                │ ║
        ║  │    "Llamada a la aventura"   │ ║
        ║  ├──────────────────────────────┤ ║
        ║  │ 3: @blueflag                 │ ║
        ║  │    "Verdad del rechazo"      │ ║
        ║  ├──────────────────────────────┤ ║
        ║  │ 4: @enciclopedia             │ ║
        ║  │    "Mentor (Orfeo)"          │ ║
        ║  ├──────────────────────────────┤ ║
        ║  │ 5: @blackflag                │ ║
        ║  │    "Sombras del umbral"      │ ║
        ║  └──────────────────────────────┘ ║
        ╚════════════════════════════════════╝
                        ↓
        ╔════════════════════════════════════╗
        ║  ANILLO 2: TRANSFORMACIÓN         ║
        ║  ┌──────────────────────────────┐ ║
        ║  │ 6: @redflag                  │ ║
        ║  │    "Aliados y estructura"    │ ║
        ║  ├──────────────────────────────┤ ║
        ║  │ 7: @yellowflag               │ ║
        ║  │    "Límites de la escritura" │ ║
        ║  ├──────────────────────────────┤ ║
        ║  │ 8: @orangeflag               │ ║
        ║  │    "Registro de lo vivido"   │ ║
        ║  ├──────────────────────────────┤ ║
        ║  │ 9: @aleph                    │ ║
        ║  │    "Síntesis política"       │ ║
        ║  └──────────────────────────────┘ ║
        ╚════════════════════════════════════╝
                        ↓
        ╔════════════════════════════════════╗
        ║  ANILLO 3: RETORNO                ║
        ║  ┌──────────────────────────────┐ ║
        ║  │ 10: @revisor                 │ ║
        ║  │     "Retorno a Ítaca"        │ ║
        ║  ├──────────────────────────────┤ ║
        ║  │ 11: @argboard                │ ║
        ║  │     "Resurrección narrativa" │ ║
        ║  ├──────────────────────────────┤ ║
        ║  │ 12: @ghpages                 │ ║
        ║  │     "Elixir publicado"       │ ║
        ║  └──────────────────────────────┘ ║
        ╚════════════════════════════════════╝
```

---

## Estadios Detallados

### Estadios 1-5: INICIACIÓN

| # | Nombre | Fuente NOVELA | Duración | Feature |
|---|--------|---|---|---|
| 1 | Mundo Ordinario | Abstract_Portada.md | 20m | @vestibulo |
| 2 | Llamada | Apertura_Ulises_y_Penelope.md | 30m | @periodico |
| 3 | Rechazo | Cap01_Onan_y_Tamar.md | 25m | @blueflag |
| 4 | Mentor | Cap02_Orfeo_y_Eurídice.md | 35m | @enciclopedia |
| 5 | Umbral | Cap03_Edipo_y_Electra.md | 30m | @blackflag |

**Subtotal**: 2 horas 20 minutos

### Estadios 6-9: TRANSFORMACIÓN

| # | Nombre | Fuente NOVELA | Duración | Feature |
|---|--------|---|---|---|
| 6 | Aliados | Cap04_La_Caverna_y_el_Sol.md | 40m | @redflag |
| 7 | Cueva | Cap04_Z_Intermezzo_Homero_y_Joyce.md | 45m | @yellowflag |
| 8 | Ordalia | Cap05_Atenas.md | 50m | @orangeflag |
| 9 | Recompensa | Cap06_Politica_en_Platon.md | 40m | @aleph |

**Subtotal**: 3 horas 35 minutos

### Estadios 10-12: RETORNO

| # | Nombre | Fuente NOVELA | Duración | Feature |
|---|--------|---|---|---|
| 10 | Retorno | Cap07_Polis.md | 35m | @revisor |
| 11 | Resurrección | Cap08_Gaia.md | 40m | @argboard |
| 12 | Elixir | filo/00_Exordio/ | 50m | @ghpages |

**Subtotal**: 2 horas 5 minutos

**TOTAL**: 6 horas (aproximado)

---

## Mapeo de Personajes

| Personaje | Rol | Aparición | Fuente |
|-----------|-----|-----------|--------|
| **Penélope** | Guía (personaje_guia) | Estadios 1, 12 | Apertura_Ulises_y_Penelope.md |
| **Ulises** | Navegante ausente | Estadios 1-3 | Abstract_Portada.md |
| **Orfeo** | Mentor | Estadio 4 | Cap02_Orfeo_y_Eurídice.md |
| **Edipo** | Revelador | Estadio 5 | Cap03_Edipo_y_Electra.md |
| **Platón** | Filósofo | Estadios 6-8 | Cap04 + Cap06 |
| **Homero/Joyce** | Escritores meta | Estadio 7 | Cap04_Z_Intermezzo |

---

## Checklist de Validación

### YAML Generado
- [x] ID único: `itaca-digital`
- [x] 12 estadios completos
- [x] Anillos 0-3 asignados correctamente
- [x] Features (@agentes) asignados
- [x] Duraciones estimadas
- [x] Metadatos completos
- [x] Dependencias registradas

### Taller Inicializado
- [x] Directorio: `/ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/`
- [x] 5 archivos de gobierno creados
- [x] Mapeo selectivo documentado (no batch)
- [x] Plantilla de estadio lista
- [x] README y referencias cruzadas

### Listo para
- [ ] Fase 2: Instalación (cuando ejecutes `@plugin_ox_teatro instalar itaca-digital`)
- [ ] Fase 3: Mapeo selectivo (estadio a estadio, por demanda)
- [ ] Fase 4: Ejecución (publicación en GitHub Pages)

---

## Acceso Rápido

| Necesitas... | Archivo |
|---|---|
| Ver YAML completo | `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml` |
| Resumen rápido | `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/00-RESUMEN-GENERACION.md` |
| Catálogo de fuentes | `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/mapeo-selectivo.md` |
| Flujo de trabajo | `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/README.md` |
| Pasos de instalación | `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/inicializacion.md` |
| Cómo mapear un estadio | `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/estadio-01-instrucciones.md` |

---

**Estado Final**: 🟢 **GENERACIÓN COMPLETADA**  
**Próximo Paso**: `@plugin_ox_teatro instalar itaca-digital`
