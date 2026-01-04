# Acta T011: Implementar S04 — Wireframe Vista Dramaturgo

> **Agente**: @ox  
> **Fecha**: 2026-01-04  
> **Estado**: ✅ DONE  
> **Tipo**: DISEÑO  
> **Story**: S04 (3 pts)

---

## Objetivo

Crear el wireframe de la Vista Dramaturgo con layout de 3 columnas y especificación de widgets.

---

## Tasks Completadas

| Task | Descripción | Owner | Estado |
|------|-------------|-------|--------|
| T04.1 | Diseñar layout 3-columnas | @aleph | ✅ |
| T04.2 | Especificar widgets por columna | @indice | ✅ |
| T04.3 | Mockup en docs/teatro/ | @plugin_ox_ghpages | ✅ |

---

## Implementación

### Archivo Creado

`docs/teatro/dramaturgo-view.md`

### Layout 3 Columnas

| Columna | Ancho | Función |
|---------|-------|---------|
| **Sensor** | 30% | Aferencia (recibir señales) |
| **Cerebro** | 35% | Procesamiento (brain Prolog + DRY) |
| **Actuador** | 35% | Eferencia (notificar elenco) |

### Widgets (9 total)

| Columna | Widgets |
|---------|---------|
| Sensor | Estado Actual, Log de Señales, Simular Señal |
| Cerebro | Brain Activo, DRY Check, Query Prolog |
| Actuador | Notificaciones, Suscriptores, Enviar Manual |

### Integración

- Conecta con `dramaturgo-signals.asyncapi.yaml` (MQTT)
- Usa predicados de `lucas-prolog.brain.pl`
- Responsive: 3→2→1 columnas

---

## Criterio de Aceptación

| Criterio | Estado |
|----------|--------|
| PO aprueba mockup | ✅ Layout documentado |
| Widgets especificados | ✅ 9 widgets |
| Referencias a specs | ✅ AsyncAPI, Brain, Obra |

---

## URL Publicada

`/teatro/dramaturgo-view/`

---

*Acta completada — @ox — T011*
