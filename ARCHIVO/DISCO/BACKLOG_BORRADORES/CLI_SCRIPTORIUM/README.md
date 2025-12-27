# Scriptorium CLI

> Aplicación de consola Node.js para gestión del Aleph Scriptorium con hot-reload de plantillas Markdown.

## 📐 Estado: Diseño

Este es un borrador arquitectónico. Los tipos e interfaces están definidos pero **sin implementación**.

## Estructura del Monorepo

```
scriptorium-cli/
├── packages/
│   ├── @scriptorium/types       # ✅ Tipos definidos
│   ├── @scriptorium/core        # ✅ Interfaces definidas
│   ├── @scriptorium/cli         # ⏳ Pendiente
│   ├── @scriptorium/menu-renderer # ⏳ Pendiente
│   ├── @scriptorium/md-parser   # ⏳ Pendiente
│   ├── @scriptorium/agent-runtime # ⏳ Pendiente
│   └── @scriptorium/plugin-loader # ⏳ Pendiente
│
└── apps/
    └── cli/                     # ⏳ Entry point
```

## Características Planificadas

### 1. Modelado desde Índices DRY
- Carga `ARCHIVO/DEVOPS/Funcional.md` → Vista usuario
- Carga `ARCHIVO/DEVOPS/Tecnico.md` → Vista técnica
- Genera menús de consola dinámicamente

### 2. Hot-Reload de Plantillas
- Observa cambios en `.github/agents/`, `prompts/`, `instructions/`
- Sincroniza estado en <1 segundo
- Invalida cache selectivamente

### 3. Menús Estructurados
- Deriva estructura desde `ARCHIVO/DISCO/SPLASH/index.md`
- Sincroniza con `ARCHIVO/DISCO/README/index.md`
- Navegación interactiva con `@inquirer/prompts`

### 4. Runtime de Agentes
- Invocación de agentes desde CLI
- Soporte para handoffs encadenados
- Métricas de ejecución

## Instalación (futura)

```bash
# Clonar el Scriptorium
git clone https://github.com/escrivivir-co/aleph-scriptorium.git
cd aleph-scriptorium

# Instalar CLI (cuando esté implementado)
cd ARCHIVO/DISCO/BACKLOG_BORRADORES/CLI_SCRIPTORIUM
pnpm install
pnpm build
pnpm cli
```

## Comandos Planificados

```bash
scriptorium                    # Menú principal interactivo
scriptorium agents             # Listar agentes
scriptorium invoke @aleph      # Invocar agente
scriptorium sync --watch       # Modo hot-reload
scriptorium status             # Estado de sincronización
```

## Para Equipos

Este documento sirve como **especificación de anchura**. Cada equipo puede:

1. Leer [PLAN_ARQUITECTURA.md](./PLAN_ARQUITECTURA.md) para visión completa
2. Tomar un paquete (`@scriptorium/{nombre}`)
3. Implementar las interfaces definidas
4. Añadir tests y documentación

### Épicas por Equipo

| Equipo | Paquete | Épica |
|--------|---------|-------|
| Core | `@scriptorium/core` | Implementar loaders y sync |
| Parser | `@scriptorium/md-parser` | Implementar parser Markdown |
| UI | `@scriptorium/menu-renderer` | Implementar renderizado |
| Runtime | `@scriptorium/agent-runtime` | Implementar invocación |
| CLI | `apps/cli` | Integrar todo en comandos |

## Dependencias Clave

| Paquete | Propósito |
|---------|-----------|
| `chokidar` | File watching |
| `gray-matter` | Parse frontmatter YAML |
| `marked` | Parse Markdown |
| `@inquirer/prompts` | Input interactivo |
| `chalk` | Colores terminal |

## Licencia

AIPL v1.0 — Ver [LICENSE.md](../../../../LICENSE.md)
