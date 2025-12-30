# Backlog: Demo Screens Hackathon

> **Épica**: DEMO-1.0.0  
> **Effort total**: 11 pts  
> **Estado**: ✅ Completado  
> **Fecha**: 2025-12-30

---

## Objetivo

Preparar las pantallas necesarias para la demo del hackathon, incluyendo:
1. Blueprint showcase de 10 pasos (PO + equipo)
2. Script para levantar todos los servidores
3. Galería de iframes para visualización

---

## Features

| ID | Nombre | Owner | Effort | Estado |
|----|--------|-------|--------|--------|
| F001 | Blueprint PO Showcase | @aleph | 5 pts | ✅ |
| F002 | Script Runall | @ox | 3 pts | ✅ |
| F003 | Galería Demo | @aleph | 3 pts | ✅ |

---

## F001: Blueprint PO Showcase

**Objetivo**: Crear presentación impress.js con 10 pasos principales (PO) + 3 slides adyacentes por paso (Ox, Aleph, SM).

**Archivo**: `docs/blueprint-po.md`

**Estructura de navegación (Patrón Cubo 3D extendido)**:

```
Eje X: Flujo principal PO (→)
┌──────────────────────────────────────────────────────────────────────┐
│ Paso1(0,0) → Paso2(3000,0) → Paso3(6000,0) → ... → Paso10(27000,0)  │
└──────────────────────────────────────────────────────────────────────┘

Por cada Paso N en (X, 0, 0):
┌─────────────────────────────────────────┐
│     Ox: (X, -800, 0)      ← arriba      │
│            ↑                             │
│     PO: (X, 0, 0)         ← centro      │
│     ↙           ↘                        │
│ Aleph: (X-500, 800, 0)  SM: (X+500, 800, 0)  │
└─────────────────────────────────────────┘
```

**Total slides**: 40 (10 PO + 10 Ox + 10 Aleph + 10 SM)

### Tasks F001

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T001 | Crear estructura base blueprint-po.md con frontmatter | 1 | ⏳ |
| T002 | Implementar 10 slides PO (eje X principal) | 2 | ⏳ |
| T003 | Añadir 30 slides adyacentes (Ox, Aleph, SM) | 2 | ⏳ |

### Contenido por Paso

| Paso | PO (tema) | Ox (técnico) | Aleph (producto) | SM (proceso) |
|------|-----------|--------------|------------------|--------------|
| 1 | Bienvenida | Stack técnico | Propuesta valor | Sprint actual |
| 2 | Problema | Arquitectura | Pain points | Backlog |
| 3 | Solución | MCP Servers | Agentes UI | Épicas |
| 4 | Demo agentes | Comandos CLI | Flujo usuario | Métricas |
| 5 | Demo plugins | Registry | Casos de uso | Burndown |
| 6 | Demo blueprints | impress.js | Galería visual | Impediments |
| 7 | Ecosistema | Submódulos | Integraciones | Roadmap |
| 8 | Extensibilidad | API/SDK | Templates | Releases |
| 9 | Comunidad | Contribuir | Docs | Retro |
| 10 | Cierre/CTA | Repos | Contacto | Next steps |

---

## F002: Script Runall

**Objetivo**: Comando en VsCodeExtension que abre 5 terminales en split con los servidores necesarios.

**Archivo**: `VsCodeExtension/src/commands/runAllDemo.ts`

### Terminales a abrir

| # | Directorio | Comando | Puerto |
|---|------------|---------|--------|
| 1 | `scripts/` | `./serve-site.sh` | 4000 (Jekyll) |
| 2 | `MCPGallery/` | `npm run start:launcher` | 3050 |
| 3 | `MCPGallery/` | `npm run start:model` | 3001 |
| 4 | `MCPGallery/` | `npm run start:zeus` | 4001 |
| 5 | `NovelistEditor/` | `npm start` | 3000 |

### Tasks F002

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T004 | Añadir comando al package.json | 1 | ⏳ |
| T005 | Implementar runAllDemo.ts | 1 | ⏳ |
| T006 | Registrar comando en extension.ts | 1 | ⏳ |

---

## F003: Galería Demo

**Objetivo**: Página en gh-pages con 7 iframes para visualización durante demo.

**Archivo**: `docs/demo.md`

### Iframes

| # | Título | URL | Tipo |
|---|--------|-----|------|
| 1 | Index GH-Pages | `/` | Relativa |
| 2 | Zeus Presets | `http://localhost:4001` | Local |
| 3 | Novelist | `http://localhost:3000` | Local |
| 4 | Blueprint UX | `/blueprint/` | Relativa |
| 5 | Blueprint MMCO | `/blueprint-mmco/` | Relativa |
| 6 | Blueprint Copilot | `/blueprint-copilot/` | Relativa |
| 7 | Blueprint PO | `/blueprint-po/` | Relativa (nuevo) |

### Tasks F003

| Task | Descripción | Effort | Estado |
|------|-------------|--------|--------|
| T007 | Crear docs/demo.md con layout gallery | 1 | ⏳ |
| T008 | Añadir estilos CSS para grid de iframes | 1 | ⏳ |
| T009 | Añadir enlace en navegación (index.md) | 1 | ⏳ |

---

## Definition of Done

- [ ] Blueprint PO navegable con 40 slides
- [ ] Comando `alephscript.demo.runAll` funcional
- [ ] Página `/demo/` visible en gh-pages local
- [ ] Todos los iframes cargan correctamente
- [ ] Commit según protocolo DevOps

---

## Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2025-12-30 | Crear borrador inicial | @scrum |
