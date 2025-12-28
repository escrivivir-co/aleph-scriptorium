# Context Optimization Guide

> **Plugin**: scriptorium-pack  
> **Épica**: SCRIPT-1.29.0  
> **Fecha**: 2025-12-28

## El Problema del Context Bloat

El análisis de `Pathykar.inner.md` reveló un problema crítico:

| Métrica | Valor | Problema |
|---------|-------|----------|
| Tokens de prompt | 117,877 | 92% del límite de 128K |
| Tokens cacheados | 115,430 | 98% redundante |
| Attachments | 23 | Mayoría innecesarios |
| **Ratio señal/ruido** | **~3%** | Solo ~250 líneas eran la tarea real |

## Causas Raíz

1. **Patrones `applyTo` demasiado amplios**: `**/*.md` captura todo
2. **Instructions redundantes**: Duplicación con copilot-instructions.md
3. **Sin filtrado por tarea**: Edición y configuración cargan lo mismo
4. **Falta de separación por dominio**: Todo se inyecta siempre

## Solución: Patrones `applyTo` Específicos

### Principio DRY Aplicado

> Ninguna instrucción debe auto-inyectarse si el usuario no está trabajando activamente en esa tarea.

### Antes vs. Después

| Instrucción | Antes (Problemático) | Después (Optimizado) |
|-------------|----------------------|----------------------|
| ox-ontologia | `.github/agents/*.agent.md, README.md` | `.github/agents/ox.agent.md, .github/agents/AGENTS.md` |
| periodico | `ARCHIVO/NOTICIAS/**/*.md, ARCHIVO/DISCO/**/*.md` | `ARCHIVO/DISCO/**/conversacion*.md, ARCHIVO/NOTICIAS/**/2*.md` |
| submodulo-integracion | `scripts/**, .github/plugins/**` | `scripts/setup-*.sh, .gitmodules, **/README-SCRIPTORIUM.md` |

### Estrategia de Patrones

1. **Por nombre de archivo** sobre ubicación:
   - ✅ `**/conversacion*.md` (específico)
   - ❌ `ARCHIVO/DISCO/**/*.md` (captura todo)

2. **Por prefijo funcional**:
   - ✅ `scripts/setup-*.sh` (solo scripts de setup)
   - ❌ `scripts/**` (todos los scripts)

3. **Por archivo clave**:
   - ✅ `.gitmodules` (archivo específico de submódulos)
   - ❌ `**/*` (literalmente todo)

---

## isSummarized Pattern

### Qué es `isSummarized`

`isSummarized` es una **propiedad interna de VS Code Copilot Chat** que indica cuando un attachment ha sido resumido automáticamente para ahorrar tokens.

```xml
<!-- Ejemplo de attachment resumido internamente -->
<attachment id="file:ox.agent.md" isSummarized="true" filePath="...">
  <!-- VS Code omite secciones largas automáticamente -->
</attachment>
```

### Aplicación del Patrón

Aunque `isSummarized` no es configurable por el usuario, **el patrón es aplicable al diseño de documentos**:

> **Las primeras 50-100 líneas de cualquier instrucción deben ser auto-contenidas y útiles sin leer el resto.**

### Estructura Recomendada

```markdown
# Documento X

> **Resumen ejecutivo**: [2-3 líneas con la esencia]

## Referencia Rápida (líneas 1-50)
<!-- SIEMPRE incluido - debe ser suficiente para tareas comunes -->

| Concepto | Definición |
|----------|------------|
| ... | ... |

## Detalles Técnicos (líneas 51-200)
<!-- Expandido solo si necesario - OK si se omite -->

### Sección detallada 1
...

### Sección detallada 2
...
```

### Checklist de Validación

Para cada instrucción, verificar:

- [ ] ¿Las primeras 50 líneas contienen la información esencial?
- [ ] ¿Un LLM puede responder preguntas básicas sin leer el resto?
- [ ] ¿El patrón `applyTo` es específico al tipo de tarea?
- [ ] ¿Hay duplicación con copilot-instructions.md?
- [ ] ¿El documento tiene resumen ejecutivo?

---

## Métricas de Éxito

| Métrica | Antes | Target | Cómo Medir |
|---------|-------|--------|------------|
| Tokens por request | 117K | <50K | Logs de Copilot Chat |
| Instrucciones inyectadas | 23 | <5 | Contar attachments |
| Ratio relevantes | 26% | >80% | Auditoría manual |
| Tiempo respuesta | 16s | <5s | Timestamp delta |

## Diagnóstico

Para verificar qué instrucciones se están cargando:

1. Abrir panel de Copilot Chat
2. Ejecutar una tarea de prueba
3. Revisar los attachments en el dump (si disponible)
4. Contar tokens: `prompt_tokens` en metadata

## Referencias

- [critica-prompting-pathykar.md](../../../ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/critica-prompting-pathykar.md)
- [nfr-context-bloat.prompt.md](../../../ARCHIVO/DISCO/Diciembre_25_MMCO_Editor/nfr-context-bloat.prompt.md)
- [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
