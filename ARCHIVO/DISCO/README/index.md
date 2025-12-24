# Índice Estructural: README.md

> **Fuente de verdad**: `/README.md` (raíz del proyecto)  
> **Última actualización**: 2025-12-24  
> **Épica**: SCRIPT-1.17.0

---

## 1. Propósito de este índice

Este documento es el **mapa estructural** del README.md del proyecto. Sirve para:
- Orquestar refactorizaciones del README
- Detectar discrepancias entre README y codebase
- Generar warnings en commits cuando hay cambios que deberían reflejarse en README

---

## 2. Estructura del README.md

| Línea | Sección | Contenido | Dependencias |
|-------|---------|-----------|--------------|
| 1-14 | **Cabecera** | Título, badges, descripción, enlace web | `package.json`, releases, LICENSE.md |
| 16-25 | **Qué es** | Descripción del proyecto y separación de carpetas | Arquitectura general |
| 27-44 | **Quick Start** | Comandos de instalación y primera invocación | scripts/, .github/agents/ |
| 46-75 | **Arquitectura** | Árbol de directorios con descripción | Estructura real del proyecto |
| 77-95 | **Setup del Workspace** | Discovery de plugins, script de inicialización | .vscode/settings.json, scripts/setup-workspace.sh |
| 97-113 | **Submódulos (14)** | Tabla de submódulos por categoría | .gitmodules |
| 115-160 | **Agentes** | Diagrama visual + tablas por capa | .github/agents/, registry.json |
| 162-195 | **Las 5 Banderas** | Tabla de auditores y sus tests | .github/agents/*flag.agent.md |
| 197-220 | **Plugin Bridges** | Tabla bridges → plugins → agentes | registry.json, .github/agents/plugin_ox_*.agent.md |
| 222-238 | **Plugins (18)** | Tabla de plugins por categoría | .github/plugins/registry.json |
| 240-275 | **Teatro Interactivo** | Diagrama de anillos, cartelera, componentes | docs/teatro.md, ARG_BOARD |
| 277-300 | **Contribuir** | Flujo FOSS, guías, issues | CONTRIBUTING.md, DEVOPS.md |
| 302-335 | **Estado** | ASCII art, tabla de versiones, rama activa | BACKLOG, FOTOS_ESTADO, package.json |
| 337-355 | **Documentación** | Tabla de recursos | docs/ |
| 357-366 | **Licencia y Origen** | AIPL, VibeBitacora | LICENSE.md |

---

## 3. Badges (líneas 3-7)

| Badge | Fuente | Cuándo actualizar |
|-------|--------|-------------------|
| Version | `package.json` + GitHub Releases | Al crear release |
| License | `LICENSE.md` | Rara vez |
| GitHub Pages | URL fija | Nunca (salvo cambio de dominio) |
| VibeBitacora | URL fija | Nunca |
| PRs Welcome | `CONTRIBUTING.md` | Nunca |

---

## 4. Secciones sincronizables

### 4.1. Agentes (sincronizar con registry.json + ox.agent.md)

| Dato | Fuente de verdad |
|------|------------------|
| Diagrama de capas | `.github/agents/ox.agent.md` → Índice Maestro |
| Tabla "Por capa" | Escanear `.github/agents/*.agent.md` |
| Tabla "Las 5 Banderas" | 5 archivos `*flag.agent.md` |
| Tabla "Plugin Bridges" | Escanear `plugin_ox_*.agent.md` + `registry.json` |
| Contador total | `12 core + N bridges + M plugins` |

### 4.2. Plugins (sincronizar con registry.json)

| Dato | Fuente de verdad |
|------|------------------|
| Plugins Core (8) | `registry.json` → enabled: true |
| Plugins por categoría | Campo `category` si existe, o inferir de descripción |
| Contador total | Longitud de `registry.json.plugins` |

### 4.3. Submódulos (sincronizar con .gitmodules)

| Dato | Fuente de verdad |
|------|------------------|
| Lista de 14 | `git submodule status` o `.gitmodules` |
| Categorización | Convención de naming (ver BUG-003) |
| Rama de integración | `integration/beta/scriptorium` |

### 4.4. Estado (sincronizar con backlog + fotos)

| Dato | Fuente de verdad |
|------|------------------|
| Versión | `package.json` + último tag |
| Sprint/FC actual | `BACKLOG-SCRIPTORIUM.md` → Sprint actual |
| Rama activa | `.github/workspace-config.json` → branch |
| Contadores | Derivar de registry.json, git submodule, agents/ |

---

## 5. Cuándo actualizar el README

| Evento | Sección a revisar |
|--------|-------------------|
| Nuevo release | Badges, Estado |
| Nuevo plugin instalado | Plugins, Plugin Bridges, contadores |
| Nuevo submódulo | Submódulos, contadores |
| Nuevo agente core | Agentes, contadores |
| Cambio de rama de trabajo | Estado |
| Nuevo milestone/sprint | Estado |
| Cambio de estructura de carpetas | Arquitectura |
| Cambio en Quick Start | Quick Start |

---

## 6. Operaciones de refactorización

### 6.1. Añadir plugin

1. Verificar que está en `registry.json`
2. Añadir a tabla "Plugins" con categoría correcta
3. Si tiene bridge, añadir a tabla "Plugin Bridges"
4. Actualizar contador total de agentes

### 6.2. Añadir submódulo

1. Verificar en `.gitmodules`
2. Añadir a tabla "Submódulos" con categoría correcta
3. Actualizar contador en sección Estado

### 6.3. Crear release

1. Actualizar badge de versión
2. Actualizar tabla Estado (versión, fecha)
3. Si cambia rama activa, actualizar Estado

---

## 7. Checklist de coherencia

Antes de commit que afecte `README.md` o archivos relacionados:

- [ ] Contador de agentes coincide con realidad (12 core + bridges + plugins)
- [ ] Contador de plugins coincide con `registry.json`
- [ ] Contador de submódulos coincide con `.gitmodules`
- [ ] Versión en badge coincide con `package.json`
- [ ] Rama activa en Estado coincide con `workspace-config.json`
- [ ] Diagrama de agentes refleja estructura actual

---

## 8. Referencia cruzada

| Documento | Relación con README |
|-----------|---------------------|
| `ARCHIVO/DEVOPS/Funcional.md` | Visión usuario — puede referenciar README |
| `ARCHIVO/DEVOPS/Tecnico.md` | Visión técnica — complementa README |
| `ARCHIVO/DISCO/SPLASH/index.md` | Índice de docs/ — paralelo a este índice |
| `.github/copilot-instructions.md` | Hub de instrucciones — puede duplicar info |

---

## 9. Cuándo NO actualizar el README

- Cambios internos de agentes sin impacto en API pública
- Correcciones de typos en archivos internos
- Actualizaciones de backlogs sin cambio de estado
- Cambios en ARCHIVO/ (doctrina, no código)

---

## 10. Historial de cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-24 | Crear índice estructural | @aleph |
