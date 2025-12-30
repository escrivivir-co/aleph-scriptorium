# README: Novelist — Ítaca Digital

> **Novela**: Ítaca Digital: El Retorno del Navegante  
> **ID**: itaca-digital  
> **Estado**: Inicializada  
> **Última Sync**: 2025-12-28

---

## Estructura de la Novela

```
ARCHIVO/PLUGINS/NOVELIST/obras/itaca-digital/
├── novela.json           # Metadatos
├── estructura.json       # 12 capítulos (monomito)
├── sincronizacion.json   # Links a Teatro/TALLER/Fuente
└── capitulos/
    ├── 01-mundo-ordinario.md
    ├── 02-llamada.md
    ├── 03-rechazo.md
    ├── 04-mentor.md
    ├── 05-umbral.md
    ├── 06-aliados.md
    ├── 07-cueva.md
    ├── 08-ordalia.md
    ├── 09-recompensa.md
    ├── 10-retorno.md
    ├── 11-resurreccion.md
    └── 12-elixir.md
```

---

## Monomito (12 Capítulos)

| # | Capítulo | Tipo | Feature | Fuente |
|---|----------|------|---------|--------|
| 1 | Mundo Ordinario | inicio | @vestibulo | Abstract_Portada.md |
| 2 | Llamada | llamada | @periodico | Apertura_Ulises_y_Penelope.md |
| 3 | Rechazo | rechazo | @blueflag | Capitulo01_Onan_y_Tamar.md |
| 4 | Mentor | mentor | @enciclopedia | Capitulo02_Orfeo_y_Eurídice.md |
| 5 | Umbral | umbral | @blackflag | Capitulo03_Edipo_y_Electra.md |
| 6 | Aliados | aliados | @redflag | Capitulo04_La_Caverna_y_el_Sol.md |
| 7 | Cueva | cueva | @yellowflag | Capitulo04_Z_Intermezzo.md |
| 8 | Ordalia | ordalia | @orangeflag | Capitulo05_Atenas.md |
| 9 | Recompensa | recompensa | @aleph | Capitulo06_Politica_en_Platon.md |
| 10 | Retorno | retorno | @revisor | Capitulo07_Polis.md |
| 11 | Resurrección | resurreccion | @argboard | Capitulo08_Gaia.md |
| 12 | Elixir | elixir | @ghpages | filo/00_Exordio |

---

## Casos de Uso

### UC1: Editar un Capítulo
```bash
# Abrir capítulo 4 (Mentor)
@novelist editar itaca-digital 4
# → Abre capitulos/04-mentor.md
# → Sugerencia: usar @plugin_ox_enciclopedia
```

### UC2: Importar desde Fuente
```bash
# Importar contenido de NOVELA al capítulo 4
@novelist importar-fuente itaca-digital 4
# → Lee Capitulo02_Orfeo_y_Eurídice.md
# → Actualiza capitulos/04-mentor.md
# → Registra en sincronizacion.json
```

### UC3: Sincronizar con Teatro
```bash
# Exportar cambios a Teatro
@novelist exportar-teatro itaca-digital
# → Actualiza itaca-digital.yaml (campo contenido)
# → Registra timestamp
```

### UC4: Sincronizar Bidireccional
```bash
# Sync completo
@novelist sincronizar itaca-digital
# → Teatro ↔ Novelist ↔ Fuente
```

---

## Enlaces

| Recurso | Ruta |
|---------|------|
| Teatro YAML | `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml` |
| TALLER | `ARCHIVO/DISCO/TALLER/NOVELA_TRANSMEDIA/` |
| Fuente Remota | `/Users/morente/Desktop/THEIA_PATH/NOVELA/` |
| Plugin Manifest | `.github/plugins/novelist/manifest.md` |
| Agente | `.github/plugins/novelist/agents/novelist.agent.md` |

---

## Estado de Capítulos

| # | Estado | Palabras | Última Edición |
|---|--------|----------|----------------|
| 1 | borrador | 0 | 2025-12-28 |
| 2 | borrador | 0 | 2025-12-28 |
| 3 | borrador | 0 | 2025-12-28 |
| 4 | borrador | 0 | 2025-12-28 |
| 5 | borrador | 0 | 2025-12-28 |
| 6 | borrador | 0 | 2025-12-28 |
| 7 | borrador | 0 | 2025-12-28 |
| 8 | borrador | 0 | 2025-12-28 |
| 9 | borrador | 0 | 2025-12-28 |
| 10 | borrador | 0 | 2025-12-28 |
| 11 | borrador | 0 | 2025-12-28 |
| 12 | borrador | 0 | 2025-12-28 |

**Total**: 0 palabras | 0/12 completos

---

## Próximos Pasos

1. **Importar fuentes**: `@novelist importar-fuente itaca-digital 1` (para cada capítulo)
2. **Editar contenido**: Usar features asignados para cada capítulo
3. **Exportar a Teatro**: `@novelist exportar-teatro itaca-digital`
4. **Publicar**: `@plugin_ox_ghpages publicar itaca-digital`

---

**Última actualización**: 2025-12-28  
**Agente**: @novelist
