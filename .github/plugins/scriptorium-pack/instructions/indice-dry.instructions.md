---
name: Índice DRY
description: Contrato para mantener los índices Funcional.md y Tecnico.md como fuente única de navegación.
applyTo: "ARCHIVO/DEVOPS/Funcional.md, ARCHIVO/DEVOPS/Tecnico.md"
---
# Instrucciones: Índice DRY

> **Fuente de verdad**: `ARCHIVO/DEVOPS/Funcional.md` y `ARCHIVO/DEVOPS/Tecnico.md`  
> **Agente**: `@indice`  
> **Plugin**: scriptorium-pack (SCRIPT-1.29.0)

---

## Resumen Ejecutivo

Los índices son el **mapa de navegación rápida** del proyecto. No duplican contenido, solo estructuran rutas.

| Índice | Audiencia | Contenido |
|--------|-----------|-----------|
| **Funcional.md** | Usuarios | Capacidades, agentes, flujos, invocaciones |
| **Tecnico.md** | Desarrolladores | Arquitectura, plugins, submódulos, DevOps || **BACKLOG_ARCHIVADOS/INDEX.md** | Scrum | Épicas cerradas, sprints históricos, spikes descartados |
| **BACKLOG_BORRADORES/INDEX.md** | Scrum | Trabajo en progreso, conversaciones PO-SM |
---

## Cuándo Actualizar

| Evento | Acción en índice |
|--------|------------------|
| Nuevo plugin instalado | Añadir en § Plugins |
| Nuevo agente creado | Añadir en § Agentes por capa |
| Nueva instrucción | Añadir en § Ontología |
| Submódulo añadido | Añadir en § Submódulos |
| Épica cerrada | Mover a BACKLOG_ARCHIVADOS, actualizar INDEX.md |
| Spike descartado | Mover a BACKLOG_ARCHIVADOS/Spikes/, actualizar INDEX_ABSTRACT.md |

---

## Reglas de Oro

### ✅ Hacer
- Mantener una línea por elemento
- Incluir ruta exacta o comando de invocación
- Enlazar a documentación detallada
- Actualizar estado (✅/⏳/🔄)

### ❌ No Hacer
- Copiar contenido completo de otros archivos
- Duplicar información entre Funcional.md y Tecnico.md
- Añadir detalles de implementación (solo estructura)

---

## Detalles Técnicos

### Estructura de Funcional.md

1. **Capacidades principales** — Qué puede hacer el Scriptorium
2. **Agentes por capa** — Quién hace qué (UI, Backend, Sistema, Plugins, Meta)
3. **Flujos principales** — Cómo se orquesta el trabajo
4. **Memoria ARCHIVO** — Dónde está el conocimiento persistente
5. **Invocaciones rápidas** — Ejemplos de uso común

Formato:
```markdown
| Elemento | Descripción | Ruta/Invocación |
|----------|-------------|-----------------|
| nombre | Una línea | ruta o @agente |
```

### Estructura de Tecnico.md

1. **Arquitectura de 5 capas** — UI, Backend, Sistema, Meta, Plugins
2. **Ontología .github/** — Qué hay en cada carpeta
3. **Sistema de plugins** — Operativos y borradores
4. **Submódulos** — Infraestructura externa
5. **Flujo DevOps** — Cómo hacer commits, releases

Formato:
```markdown
| Componente | Tipo | Ruta | Estado |
|------------|------|------|--------|
| nombre | tipo | ruta | ✅/⏳/🔄 |
```

### Validación Pre-Commit (@indice validar)

| Test | Pregunta |
|------|----------|
| coherencia_funcional_tecnico | ¿Agentes y plugins coinciden entre índices? |
| dry_violation | ¿Hay párrafos/tablas duplicadas? |
| indice_desactualizado | ¿Referencias a agentes/plugins eliminados? |
| archivo_huerfano | ¿Archivos no mencionados en índices? |
| commit_sin_trazabilidad | ¿Commit sigue protocolo DevOps? |

### Formato de Warning

```
⚠️ VALIDACIÓN DE ÍNDICE

Test fallido: {nombre_test}
Detalle: {descripción del problema}
Archivo afectado: {ruta}

Sugerencia: @indice actualizar
Este warning es informativo y no bloquea el commit.
```

### Responsabilidades

| Agente | Responsabilidad |
|--------|----------------|
| @indice | Mantener y validar índices |
| @aleph | Consultar índices antes de trabajar |
| @ox | Fuente de verdad de agentes (índice es subconjunto) |
| @pluginmanager | Notificar cambios de plugins |
