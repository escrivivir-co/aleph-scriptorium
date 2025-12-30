# Mapeo Selectivo: NOVELA → Teatro Transmedia → Novelist

> **Proyecto**: Adaptación teatral de la carpeta NOVELA  
> **Inicio**: 2025-12-28  
> **Estrategia**: Mapeo por demanda (selectivo, no batch)

---

## Enlaces de Sincronización

| Sistema | Ruta | Operación |
|---------|------|-----------|
| **Teatro** | `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml` | Bidireccional |
| **Novelist** | `ARCHIVO/PLUGINS/NOVELIST/obras/itaca-digital/` | Bidireccional |
| **Fuente** | `/Users/morente/Desktop/THEIA_PATH/NOVELA/` | Lectura selectiva |

### Comandos de Sincronización

```bash
# Sincronizar Novelist ↔ Teatro
@novelist sincronizar itaca-digital

# Importar fuente a capítulo específico
@novelist importar-fuente itaca-digital 4

# Exportar cambios a Teatro
@novelist exportar-teatro itaca-digital
```

---

## Fuente Remota

**Ruta**: `/Users/morente/Desktop/THEIA_PATH/NOVELA`

### Categorización Inicial

| Categoría | Archivos | Estado | Nota |
|-----------|----------|--------|------|
| **Narrativa Core** | Cap01-08, Apertura, Cierre | 📍 Mapear | Eje principal del monomito |
| **Fragmentos Clave** | De Ajedrez, poema, fandangos | 🔍 Revisar | Posibles subtramas |
| **Filosófico** | filo/0* | 📍 Mapear | Base temática de estadios 9-12 |
| **Código/IDE** | aleph-script-idle.ts, .py | ⏸️ Diferido | Para implementación técnica |
| **Versiones Compiladas** | CHULETA/, LIBRO/ | 🗂️ Referencia | No mapear (derivadas) |
| **Versiones Alternativas** | ALTERMUNDIAL/, SPOT*, v10/ | ⏸️ Diferido | Solo si necesario |

---

## Fases de Mapeo

### Fase 1: Núcleo Narrativo (INMEDIATA)
- [ ] Leer Abstract_Portada.md → **Estadio 1 (Mundo Ordinario)**
- [ ] Leer Apertura_Ulises_y_Penelope.md → **Estadio 2 (Llamada a la Aventura)**
- [ ] Leer Capitulo01_Onan_y_Tamar.md → **Estadio 3 (Rechazo)**
- [ ] Leer Capitulo02_Orfeo_y_Eurídice.md → **Estadio 4 (Encuentro con Mentor)**
- [ ] Leer Capitulo03_Edipo_y_Electra.md → **Estadio 5 (Cruce del Umbral)**

### Fase 2: Desarrollo Temático (SELECTIVA)
- [ ] Leer Capitulo04 + Intermezzo → **Estadios 6-7 (Aliados, Cueva Oculta)**
- [ ] Leer Capitulo05_Atenas.md → **Estadio 8 (Prueba Suprema)**
- [ ] Leer Capitulo06_Politica_en_Platon.md → **Estadio 9 (Recompensa)**
- [ ] Leer Capitulo07_Polis.md → **Estadio 10 (Retorno)**

### Fase 3: Síntesis Filosófica (OPCIONAL)
- [ ] Leer Capitulo08_Gaia.md → **Estadio 11 (Resurrección)**
- [ ] Consultar filo/00_Exordio → **Estadio 12 (Elixir)**

---

## Extractos Planificados

| Estadio | Fuente | Extracto Clave |
|---------|--------|---|
| 1 | Abstract_Portada.md | Portada + sinopsis |
| 2 | Apertura_Ulises_y_Penelope.md | Primera aparición del viaje |
| 3 | Capitulo01_Onan_y_Tamar.md | Conflicto inicial |
| 4 | Capitulo02_Orfeo_y_Eurídice.md | Aparición del guía |
| 5 | Capitulo03_Edipo_y_Electra.md | Cruce de umbral |
| 6 | Capitulo04_La_Caverna_y_el_Sol.md | Descubrimiento de herramientas |
| 7 | Capitulo04_Z_Intermezzo_Homero_y_Joyce.md | Desafío narrativo |
| 8 | Capitulo05_Atenas.md | Prueba central |
| 9 | Capitulo06_Politica_en_Platon.md | Recompensa: comprensión política |
| 10 | Capitulo07_Polis.md | Aplicación de conocimiento |
| 11 | Capitulo08_Gaia.md | Síntesis con naturaleza |
| 12 | filo/00_Exordio | Elixir: Nueva forma de escritura |

---

## Notas de Integración

- **Personaje Guía**: Penélope (extraída de Apertura_Ulises_y_Penelope.md)
- **Tipo de Obra**: `narrativa` (adaptación de novela clásica remezclada)
- **Nivel**: `intermedio` (requiere familiaridad con literatura clásica)
- **Duración Estimada**: 4-6 horas
- **Tags**: `[monomito, filología, clásicos-remezclados, transmedia]`

---

## Política de Actualización

```
SIN batch imports
├─ Leer + mapear archivo
├─ Confirmar conexión al estadio del monomito
├─ Registrar en esta tabla
└─ Pasar a siguiente
```
