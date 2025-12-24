---
name: Índice DRY
description: Contrato para mantener los índices Funcional.md y Tecnico.md como fuente única de navegación.
applyTo: "ARCHIVO/DEVOPS/*.md"
---
# Instrucciones: Índice DRY

> **Fuente de verdad**: `ARCHIVO/DEVOPS/Funcional.md` y `ARCHIVO/DEVOPS/Tecnico.md`

## Propósito

Los índices son el **mapa de navegación rápida** del proyecto. No duplican contenido, solo estructuran rutas.

---

## Estructura de Funcional.md

### Secciones obligatorias

1. **Capacidades principales** — Qué puede hacer el Scriptorium
2. **Agentes por capa** — Quién hace qué (UI, Backend, Sistema, Plugins, Meta)
3. **Flujos principales** — Cómo se orquesta el trabajo
4. **Memoria ARCHIVO** — Dónde está el conocimiento persistente
5. **Invocaciones rápidas** — Ejemplos de uso común

### Formato de entrada

```markdown
### N. Título de Sección

| Elemento | Descripción | Ruta/Invocación |
|----------|-------------|-----------------|
| nombre | Una línea | ruta o @agente |
```

---

## Estructura de Tecnico.md

### Secciones obligatorias

1. **Arquitectura de 5 capas** — UI, Backend, Sistema, Meta, Plugins
2. **Ontología .github/** — Qué hay en cada carpeta
3. **Sistema de plugins** — Operativos y borradores
4. **Submódulos** — Infraestructura externa
5. **Flujo DevOps** — Cómo hacer commits, releases
6. **Checklists de validación** — Tests antes de cerrar

### Formato de entrada

```markdown
### N. Título de Sección

| Componente | Tipo | Ruta | Estado |
|------------|------|------|--------|
| nombre | tipo | ruta | ✅/⏳/🔄 |
```

---

## Reglas de Actualización

### Cuándo actualizar

| Evento | Acción en índice |
|--------|------------------|
| Nuevo plugin instalado | Añadir en § Plugins |
| Nuevo agente creado | Añadir en § Agentes por capa |
| Nueva instrucción | Añadir en § Ontología |
| Submódulo añadido | Añadir en § Submódulos |
| Cambio de arquitectura | Revisar § Arquitectura |

### Qué NO hacer

- ❌ Copiar contenido completo de otros archivos
- ❌ Duplicar información entre Funcional.md y Tecnico.md
- ❌ Añadir detalles de implementación (solo estructura)
- ❌ Mezclar visión usuario (Funcional) con técnica (Tecnico)

### Qué SÍ hacer

- ✅ Mantener una línea por elemento
- ✅ Incluir ruta exacta o comando de invocación
- ✅ Enlazar a documentación detallada
- ✅ Actualizar estado (✅/⏳/🔄)

---

## Validación Pre-Commit

Al ejecutar `@indice validar`, se comprueban:

### Test 1: coherencia_funcional_tecnico

```
¿Los agentes listados en Funcional.md coinciden con los de Tecnico.md?
¿Los plugins mencionados son los mismos?
```

### Test 2: dry_violation

```
¿Hay párrafos duplicados entre ambos índices?
¿Hay tablas con la misma información?
```

### Test 3: indice_desactualizado

```
¿Funcional.md menciona un agente que ya no existe?
¿Tecnico.md lista un plugin que fue desinstalado?
```

### Test 4: archivo_huerfano

```
¿Hay archivos en .github/agents/ no mencionados en índices?
¿Hay plugins en registry.json no documentados?
```

### Test 5: commit_sin_trazabilidad

```
¿El mensaje de commit sigue el protocolo DevOps?
¿Incluye refs #TASK-ID?
```

---

## Formato de Warning

Cuando un test falla, el warning debe ser:

```
⚠️ VALIDACIÓN DE ÍNDICE

Test fallido: {nombre_test}
Detalle: {descripción del problema}
Archivo afectado: {ruta}

Sugerencia: @indice actualizar
Este warning es informativo y no bloquea el commit.
```

---

## Responsabilidades

| Agente | Responsabilidad |
|--------|----------------|
| @indice | Mantener y validar índices |
| @aleph | Consultar índices antes de trabajar |
| @ox | Fuente de verdad de agentes (índice es subconjunto) |
| @pluginmanager | Notificar cambios de plugins |
| lucas | Versión Teatro de @indice |
