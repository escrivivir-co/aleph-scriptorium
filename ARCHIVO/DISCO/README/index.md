# Índice Estructural: README.md

> **Fuente de verdad**: `/README.md` (raíz del proyecto)  
> **Última actualización**: 2025-12-24  
> **Épica**: SCRIPT-1.18.0 (refactorización compacta)

---

## 1. Propósito de este índice

Este documento es el **mapa estructural** del README.md del proyecto. Sirve para:
- Orquestar refactorizaciones del README
- Detectar discrepancias entre README y codebase
- Generar warnings en commits cuando hay cambios que deberían reflejarse en README

---

## 2. Estructura del README.md (Refactorizado)

| Línea | Sección | Contenido | Dependencias |
|-------|---------|-----------|--------------|
| 1-12 | **Cabecera** | Título, badges, descripción, enlaces web/guía | `package.json`, releases, LICENSE.md |
| 14-29 | **Quick Start** | Clone, código @aleph, setup script | scripts/, .github/agents/ |
| 31-39 | **Estructura** | Árbol compacto (4 líneas) con contadores | Arquitectura general |
| 41-54 | **Agentes (31)** | Tabla de capas + descripción 5 Banderas | .github/agents/, ox.agent.md |
| 56-63 | **Plugins (19)** | Lista inline + referencia a PLUGINS.md | registry.json |
| 65-77 | **Submódulos (14)** | Tabla por categoría funcional | .gitmodules |
| 79-89 | **Contribuir** | Rama activa, comandos, enlaces | CONTRIBUTING.md, DEVOPS.md |
| 91-102 | **Estado** | Tabla compacta + enlace roadmap | BACKLOG, workspace-config |
| 104-108 | **Licencia** | AIPL + copyright | LICENSE.md |
| 110-112 | **Footer** | Símbolo, versión, VibeBitacora | package.json |

**Total**: ~112 líneas (antes: ~366 líneas, reducción del 69%)

---

## 3. Badges (líneas 3-6)

| Badge | Fuente | Cuándo actualizar |
|-------|--------|-------------------|
| Version | `package.json` + GitHub Releases | Al crear release |
| License | `LICENSE.md` | Rara vez |
| GitHub Pages | URL fija | Nunca |
| PRs Welcome | `CONTRIBUTING.md` | Nunca |

---

## 4. Secciones sincronizables

> **Fuente de verdad de contadores**: `ARCHIVO/DEVOPS/Tecnico.md` §3

### 4.1. Agentes (31)

| Dato | Fuente de verdad |
|------|------------------|
| Tabla de capas | `.github/agents/ox.agent.md` → Índice Maestro |
| Contadores | 13 core + 18 bridges |

### 4.2. Plugins (19)

| Dato | Fuente de verdad |
|------|------------------|
| Lista operativos | 8 en `.github/plugins/registry.json` |
| Lista borradores | 11 en registry.json |

### 4.3. Submódulos (14)

| Dato | Fuente de verdad |
|------|------------------|
| Lista completa | `.gitmodules` |
| Convención naming | PascalCase descriptivo (SCRIPT-BUG-003) |

### 4.4. Estado

| Dato | Fuente de verdad |
|------|------------------|
| Versión | `package.json` + último tag |
| Rama activa | `.github/workspace-config.json` |

---

## 5. Cuándo actualizar el README

| Evento | Sección a revisar |
|--------|-------------------|
| Nuevo release | Badges (versión), Estado |
| Nuevo plugin | Plugins (contador y lista) |
| Nuevo submódulo | Submódulos (tabla) |
| Nuevo agente core | Agentes (contador) |
| Cambio de rama | Estado, Contribuir |

---

## 6. Operaciones de refactorización

### 6.1. Añadir plugin

1. Verificar en `registry.json`
2. Añadir nombre a lista inline (Operativos u Borradores)
3. Actualizar contador si cambia

### 6.2. Añadir submódulo

1. Verificar en `.gitmodules`
2. Añadir a categoría funcional en tabla
3. Actualizar contador si cambia

### 6.3. Crear release

1. Actualizar badge de versión
2. Actualizar tabla Estado

---

## 7. Checklist de coherencia

> **Agente responsable**: @indice (Paso 2.7 de commit-message.prompt.md)

| Test | Verificación | Fuente |
|------|-------------|--------|
| Agentes | Contador = 31 | `ls .github/agents/*.agent.md \| wc -l` |
| Plugins | Contador = 19 | `jq '.plugins \| length' registry.json` |
| Submódulos | Contador = 14 | `git submodule status \| wc -l` |
| Versión | Badge correcto | `jq .version package.json` |
| Rama | Correcta en Estado | `workspace-config.json` |

---

## 8. Referencia cruzada

| Índice | Ruta | Relación |
|--------|------|----------|
| **DEVOPS Funcional** | `ARCHIVO/DEVOPS/Funcional.md` | NO MODIFICAR |
| **DEVOPS Técnico** | `ARCHIVO/DEVOPS/Tecnico.md` | NO MODIFICAR |
| **Este índice** | `ARCHIVO/DISCO/README/index.md` | Mapa del README |
| **Índice SPLASH** | `ARCHIVO/DISCO/SPLASH/index.md` | Mapa de docs/ |

---

## 9. Principios de diseño (SCRIPT-1.18.0)

El README refactorizado sigue estos principios:

1. **Compacto**: ~112 líneas vs ~366 anteriores
2. **Sin repetición**: Cada dato aparece UNA vez
3. **Enlaces, no contenido**: Detalles en docs/leeme, PLUGINS.md, etc.
4. **Escaneable**: Tablas cortas, listas inline, código mínimo
5. **Accionable**: Quick Start funciona en 4 comandos

> **Arquitectura**: DEVOPS es la única fuente de verdad del sistema.
> Este índice describe cómo sincronizar `README.md` para @indice.

### Documentos Relacionados

| Documento | Relación con README |
|-----------|---------------------|
| `ARCHIVO/DISCO/SPLASH/index.md` | Índice paralelo para docs/ |
| `.github/copilot-instructions.md` | Hub de instrucciones (puede referenciar) |

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
