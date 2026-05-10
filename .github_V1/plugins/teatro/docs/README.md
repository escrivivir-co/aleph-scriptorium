# Teatro Interactivo — Documentación

> **Plugin**: teatro v1.0.0  
> **Dependencias**: arg-board, agent-creator, gh-pages

---

## Índice

1. [Guía Rápida](#guía-rápida)
2. [Arquitectura](#arquitectura)
3. [Casos de Uso](#casos-de-uso)
4. [Referencia YAML](#referencia-yaml)
5. [Sistema de Anillos](#sistema-de-anillos)
6. [Troubleshooting](#troubleshooting)

---

## Guía Rápida

### Crear una obra en 3 pasos

```
1. @aleph generar obra "Mi Primera Obra"
   → Genera YAML con 12 estadios

2. @aleph instalar obra mi-primera-obra
   → Registra en cartelera

3. @aleph ejecutar obra mi-primera-obra
   → Publica página interactiva
```

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `generar <tema>` | Inicia wizard de creación |
| `instalar <id>` | Registra en cartelera |
| `ejecutar <id>` | Pone en escena y publica |
| `cartelera` | Muestra estado de obras |
| `clausurar <id>` | Retira de escena |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                     USUARIO                              │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      @aleph                              │
│                  (Orquestador UI)                        │
└─────────────────────────┬───────────────────────────────┘
                          │ handoff
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      @teatro                             │
│              (Orquestador Transmedia)                    │
└────────┬───────────────┬────────────────┬───────────────┘
         │               │                │
         ▼               ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ @arg_board  │  │@agent_create│  │ @gh_pages   │
│   (obras)   │  │ (personajes)│  │  (web)      │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Flujo de datos

```
Generar:  Usuario → Teatro → YAML en ARCHIVO/PLUGINS/TEATRO/obras/
Instalar: YAML → ARG_BOARD/obras.json + docs/teatro.md
Ejecutar: obras.json → impress.js → GH-PAGES → Web pública
```

---

## Casos de Uso

### UC1: Generar Obra

**Actor**: Usuario  
**Trigger**: "Quiero crear una obra de teatro"

**Flujo**:
1. Teatro pregunta: tema, tipo, personaje, nivel
2. Carga plantilla de monomito (12 estadios)
3. Usuario personaliza cada estadio
4. Teatro genera YAML

**Salida**: `ARCHIVO/PLUGINS/TEATRO/obras/{id}.yaml`

### UC2: Instalar Obra

**Actor**: Usuario  
**Trigger**: "Instala esta obra"

**Flujo**:
1. Lee YAML de la obra
2. Verifica/crea personaje guía
3. Registra en obras.json
4. Actualiza docs/teatro.md

**Salida**: Obra visible en cartelera

### UC3: Ejecutar Obra

**Actor**: Usuario  
**Trigger**: "Pon esta obra en escena"

**Flujo**:
1. Lee obra de obras.json
2. Genera página impress.js
3. Cambia estado a "en_escena"
4. Publica vía GH-PAGES

**Salida**: URL pública de la obra

---

## Referencia YAML

### Estructura completa

```yaml
# Identificación
id: string              # Slug único (kebab-case)
titulo: string          # Nombre legible
tipo: enum              # onboarding | narrativa | educativa | ritual
personaje_guia: string  # ID del actor
descripcion: string     # Sinopsis

# Estructura narrativa
estadios:
  - id: number          # 1-12
    nombre: string      # Nombre del estadio
    anillo: number      # 0-3
    tipo: enum          # Tipo de estadio (monomito)
    prueba: string      # Qué hace el usuario
    feature: string     # @agente o recurso
    contenido: string   # Texto narrativo (opcional)

# Metadatos
meta:
  duracion_estimada: string
  nivel: enum           # introductorio | intermedio | avanzado
  prerequisitos: array
  tags: array
  creado: string        # YYYY-MM-DD
  autor: string
```

### Tipos de estadio

| Tipo | Descripción |
|------|-------------|
| inicio | Punto de partida |
| llamada | Llamada a la aventura |
| rechazo | Resistencia inicial |
| mentor | Encuentro con guía |
| umbral | Primer reto |
| aliados | Pruebas y aliados |
| cueva | Desafío central |
| ordalia | Prueba definitiva |
| recompensa | Ganancia |
| retorno | Aplicación |
| resurreccion | Síntesis |
| elixir | Aportación final |

---

## Sistema de Anillos

### Distribución espacial

```
              Anillo 3 (exterior)
           ╱  ╲
          ╱    ╲
         │ An.2 │
         │ ╱  ╲ │
         ││An.1││
         ││╱╲ ││
         │││0│││  ← Centro (inicio)
         ││╲╱ ││
         │╲  ╱ │
         │ An.1│
          ╲    ╱
           ╲  ╱
              Anillo 3
```

| Anillo | Radio | Estadios | Concepto |
|--------|-------|----------|----------|
| 0 | 0 | Inicio | Centro, origen |
| 1 | 400px | 1-4 | Preparación |
| 2 | 800px | 5-8 | Pruebas |
| 3 | 1200px | 9-12 | Retorno |

### Navegación

- **Slider vertical**: Zoom entre anillos
- **Flechas horizontales**: Rotar dentro del anillo
- **Árbol lateral**: Acceso directo

---

## Troubleshooting

### La obra no aparece en cartelera

1. Verificar que existe en obras.json
2. Verificar estado (debe ser `en_cartel` o `en_escena`)
3. Verificar docs/teatro.md

### Error al crear personaje

1. Verificar que AGENT_CREATOR está instalado
2. Verificar permisos en actores.json
3. Crear manualmente y reintentar

### Página impress.js no carga

1. Verificar que existe docs/teatro/{id}/index.html
2. Verificar CDN de impress.js
3. Verificar consola del navegador

### GH-PAGES no publica

1. Verificar configuración en _config.yml
2. Verificar que docs/ es la fuente
3. Revisar logs de GitHub Actions

---

## Archivos del Plugin

```
.github/plugins/teatro/
├── manifest.md              # Metadatos del plugin
├── agents/
│   └── teatro.agent.md      # Agente orquestador
├── prompts/
│   ├── teatro-generar-obra.prompt.md
│   ├── teatro-instalar-obra.prompt.md
│   └── teatro-ejecutar-obra.prompt.md
├── instructions/
│   └── teatro-interactivo.instructions.md
└── docs/
    └── README.md            # Esta documentación

ARCHIVO/PLUGINS/TEATRO/
├── obras/                   # YAMLs de obras
└── logs/                    # Historial de operaciones

docs/teatro/
├── teatro.md                # Cartelera pública
└── {id}/                    # Páginas por obra
    └── index.html
```
