# 🎭 TALLER: NOVELA TRANSMEDIA — PORTADA

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║        ÍTACA DIGITAL: El Retorno del Navegante                  ║
║                                                                   ║
║         Obra Teatral Transmedia                                  ║
║         12 Estadios del Monomito de Campbell                    ║
║         Adaptación de la Carpeta NOVELA                          ║
║                                                                   ║
║         Generada: 2025-12-28                                     ║
║         Status: ✅ LISTA PARA INSTALAR                          ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## 📍 PUNTO DE PARTIDA

### Eres nuevo aquí?

**Lee en este orden**:

1️⃣ **Resumen Rápido** (5 min)
   → `00-RESUMEN-GENERACION.md`

2️⃣ **Qué se generó** (10 min)
   → `INVENTARIO.md`

3️⃣ **Vista Arquitectónica** (15 min)
   → `ARQUITECTURA.md`

4️⃣ **Cómo trabajar** (20 min)
   → `README.md` (flujo de mapeo)

### Necesitas información específica?

| Pregunta | Archivo |
|----------|---------|
| "¿Qué es esta obra?" | `00-RESUMEN-GENERACION.md` |
| "¿Cuáles son los 12 estadios?" | `ARQUITECTURA.md` |
| "¿Cómo mapeo un estadio?" | `estadio-01-instrucciones.md` |
| "¿Dónde están las fuentes?" | `mapeo-selectivo.md` |
| "¿Cómo instalo esto?" | `inicializacion.md` |
| "¿Índice de todo?" | `README.md` |

---

## 🎯 DATOS CLAVE

| Aspecto | Valor |
|---------|-------|
| **ID** | `itaca-digital` |
| **Tipo** | Narrativa Transmedia |
| **Estructura** | 12 estadios (monomito) |
| **Duración** | 6 horas |
| **Nivel** | Intermedio |
| **Personaje Guía** | Penélope |
| **Agentes** | 14 |
| **Plugins** | 4 |

**YAML**: `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml`

---

## 📊 MONOMITO EN 30 SEGUNDOS

```
ANILLO 0  →  Ítaca Perdida (Mundo ordinario)
              ↓
ANILLO 1  →  Llamada → Rechazo → Mentor → Umbral
              ↓
ANILLO 2  →  Aliados → Cueva → Ordalia → Recompensa
              ↓
ANILLO 3  →  Retorno → Resurrección → Elixir
```

Cada estadio:
- Conecta a un archivo de la carpeta NOVELA
- Asigna un @agente o @plugin
- Dura 20-50 minutos
- Incluye una prueba / tarea

---

## 🔄 FASES DE IMPLEMENTACIÓN

### Fase 1: ✅ GENERACIÓN (COMPLETADA)
- [x] YAML con 12 estadios
- [x] Taller inicializado
- [x] Documentación
- [x] Mapeo selectivo

### Fase 2: 📋 INSTALACIÓN (PRÓXIMA)
```bash
@plugin_ox_teatro instalar itaca-digital
```

### Fase 3: 🎯 MAPEO SELECTIVO (DURANTE)
Por cada estadio (cuando sea necesario):
1. Leer fuente de NOVELA
2. Crear `estadio-{N}-*.md` en este taller
3. Enriquecer `itaca-digital.yaml`
4. Actualizar catálogo

### Fase 4: 🎬 EJECUCIÓN (FINAL)
```bash
@plugin_ox_teatro ejecutar itaca-digital
→ Genera página impress.js
→ Publica en GitHub Pages
```

---

## 📚 FUENTES REMOTA

**Ubicación**: `/Users/morente/Desktop/THEIA_PATH/NOVELA/`

**12 Archivos mapeados**:
```
Estadio 1  ← Abstract_Portada.md
Estadio 2  ← Apertura_Ulises_y_Penelope.md
Estadio 3  ← Capitulo01_Onan_y_Tamar.md
Estadio 4  ← Capitulo02_Orfeo_y_Eurídice.md
Estadio 5  ← Capitulo03_Edipo_y_Electra.md
Estadio 6  ← Capitulo04_La_Caverna_y_el_Sol.md
Estadio 7  ← Capitulo04_Z_Intermezzo_Homero_y_Joyce.md
Estadio 8  ← Capitulo05_Atenas.md
Estadio 9  ← Capitulo06_Politica_en_Platon.md
Estadio 10 ← Capitulo07_Polis.md
Estadio 11 ← Capitulo08_Gaia.md
Estadio 12 ← filo/00_Exordio/
```

**Estrategia**: Mapeo **selectivo, no batch**
- Leer archivo → Mapear → Documentar
- Uno a uno, por demanda
- No contaminamos el taller con archivos no usados

---

## 🎭 PERSONAJES

| Personaje | Rol | Estadios |
|-----------|-----|----------|
| **Penélope** | Guía principal | 1, 12 |
| **Ulises** | Navegante ausente | 1-3 |
| **Orfeo** | Mentor | 4 |
| **Edipo** | Revelador | 5 |
| **Platón** | Filósofo | 6-8 |
| **Homero/Joyce** | Escritores meta | 7 |

---

## 🔧 AGENTES ASIGNADOS

### Capa UI (Producción)
- `@vestibulo` — Orientación inicial
- `@cartaspuerta` — Presentación por perfil
- `@aleph` — Producción de contenido
- `@revisor` — Auditoría doctrinal
- `@periodico` — Noticias

### Backend (5 Banderas)
- `@blueflag` — Auditoría de verdad
- `@blackflag` — Auditoría de sombras
- `@redflag` — Auditoría de estructura
- `@yellowflag` — Auditoría de límites
- `@orangeflag` — Auditoría de registro

### Plugins
- `@plugin_ox_enciclopedia` — Consulta de tomos
- `@plugin_ox_agentcreator` — Creación de personajes
- `@plugin_ox_argboard` — Gestión de obras
- `@plugin_ox_ghpages` — Publicación web

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
ARCHIVO/
├── PLUGINS/TEATRO/obras/
│   └── itaca-digital.yaml ✅
│
└── DISCO/TALLER/NOVELA_TRANSMEDIA/
    ├── 00-RESUMEN-GENERACION.md
    ├── README.md (flujo de trabajo)
    ├── INVENTARIO.md (qué se generó)
    ├── ARQUITECTURA.md (vista técnica)
    ├── mapeo-selectivo.md (catálogo NOVELA)
    ├── inicializacion.md (checklists)
    ├── estadio-01-instrucciones.md (plantilla)
    ├── PORTADA.md ← TÚ ESTÁS AQUÍ
    └── [próximos: estadio-{N}-*.md se crearán bajo demanda]
```

---

## ⚡ ACCIONES RÁPIDAS

### Ver la obra completa
```
cat ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml
```

### Entender la estructura
```
cat ARQUITECTURA.md
```

### Empezar a mapear
```
cat README.md
→ Ir a "Flujo de Mapeo Selectivo"
```

### Instalar la obra
```
@plugin_ox_teatro instalar itaca-digital
```

### Ejecutar / Publicar
```
@plugin_ox_teatro ejecutar itaca-digital
```

---

## ✅ CHECKLIST RÁPIDO

- [x] Obra YAML generada (194 líneas)
- [x] Taller inicializado (6 archivos)
- [x] Documentación completa (~3500 líneas)
- [x] 12 estadios mapeados a fuentes
- [x] 14 agentes asignados
- [x] 4 dependencias de plugins registradas
- [x] Política selectiva documentada
- [ ] Fase 2: Instalar en ARG Board
- [ ] Fase 3: Mapear contenidos (por demanda)
- [ ] Fase 4: Ejecutar y publicar

---

## 🌐 REFERENCIAS

- **Instrucciones Teatro**: `.github/plugins/teatro/instructions/teatro-interactivo.instructions.md`
- **Prompt de Generación**: `.github/plugins/teatro/prompts/teatro-generar-obra.prompt.md`
- **Documentación Pública**: `docs/teatro.md`
- **Índice AGENTS**: `.github/agents/AGENTS.md`

---

## 💬 PRÓXIMO PASO

Elige uno:

1. **Lee primero**: `00-RESUMEN-GENERACION.md` (5 min)
2. **Quiero entender todo**: `ARQUITECTURA.md` (20 min)
3. **Listo para instalar**: `inicializacion.md` (revisar checklist Fase 2)
4. **Quiero mapear contenido**: `README.md` → "Flujo de Mapeo Selectivo"

---

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║              🎭 ¡BIENVENIDO AL TALLER DE ÍTACA! 🎭              ║
║                                                                   ║
║         Generado: 2025-12-28                                     ║
║         Status: ✅ FASE 1 COMPLETADA                            ║
║         Próximo: Fase 2 (Instalación)                           ║
║                                                                   ║
║         @plugin_ox_teatro instalar itaca-digital                 ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

**Última actualización**: 2025-12-28  
**Versión**: 1.0 (Generación completada)  
**Agente**: Teatro Interactivo
