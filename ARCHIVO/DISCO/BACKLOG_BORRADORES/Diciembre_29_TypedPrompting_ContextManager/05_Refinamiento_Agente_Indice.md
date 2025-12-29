# Refinamiento @indice: Viabilidad y Alternativas

> **Épica**: SCRIPT-2.1.0  
> **Fecha**: 2025-12-29  
> **Agente**: @indice  
> **Referencia**: [03_conversacion-refinamiento-backlog.md](03_conversacion-refinamiento-backlog.md)

---

## Contexto

En la sesión de refinamiento ([§ Análisis por Agente](03_conversacion-refinamiento-backlog.md#-análisis-por-agente)), se me asignó:

> *"El documento propone que YO resuelva el **foco activo** del usuario"*
> 
> ```typescript
> interface ContextRequest {
>   foco: {
>     dominio: 'blueprint' | 'plugin' | 'scrum' | 'teatro';
>     operacion: 'crear' | 'editar' | 'auditar';
>   };
> }
> ```

Este documento analiza la **viabilidad técnica** de esa propuesta.

---

## ⚠️ Restricción Crítica

**CopilotEngine es ReadOnly** — Submódulo de referencia, no modificable.

Ver [README-SCRIPTORIUM.md](../../../../CopilotEngine/README-SCRIPTORIUM.md):
> *"Integración: ReadOnly. Solo como fuente de conocimiento."*

---

## Análisis de Viabilidad

### Lo solicitado en [03_conversacion](03_conversacion-refinamiento-backlog.md#script-210-context-manager-core)

| Story | Descripción | Viable |
|-------|-------------|--------|
| S01 | Definir `ContextRequest` schema | ✅ Parcial |
| S02 | Implementar `@indice.resolverFoco()` como handoff | ❌ No |
| S03 | Hook en conversación: llamar a @indice antes de LLM | ❌ No |

### Por qué S02 y S03 no son viables

CopilotEngine carga instrucciones en:

```
src/extension/context/customInstructionsService.ts
```

El flujo es:

```
1. VS Code inicia
2. customInstructionsService lee settings.json
3. Carga TODAS las instrucciones con applyTo=true
4. Las inyecta al system message
5. NO hay hook para filtrado dinámico por request
```

**No existe punto de intercepción** donde @indice pueda:
- Recibir el prompt del usuario
- Analizar el "foco"
- Retornar instrucciones filtradas

El observable `onDidChangeConfiguration` solo dispara cuando **cambia settings.json**, no por cada request.

---

## Propuesta Alternativa

### Reformulación de SCRIPT-2.1.0

**Nombre original**: Context Manager Core (5 pts)  
**Nombre revisado**: Context Packs Manual (3 pts)

| Story | Descripción | Effort | Viable |
|-------|-------------|--------|--------|
| S01 | Documentar mapeo dominio→instrucciones en Funcional.md | 1 pt | ✅ |
| S02 | Crear archivos `packs/*.json` con configuraciones | 1 pt | ✅ |
| S03 | Script `scripts/activate-pack.sh` | 1 pt | ✅ |

### S01: Mapeo en Funcional.md

> **Adenda a** [03_conversacion § Criterio de aceptación](03_conversacion-refinamiento-backlog.md#script-210-context-manager-core)

Añadir sección en `ARCHIVO/DEVOPS/Funcional.md`:

```markdown
## Context Packs

| Dominio | Plugins activos | Instrucciones |
|---------|-----------------|---------------|
| `blueprint` | gh-pages, scriptorium-pack | 2 |
| `teatro` | teatro, arg-board | 2 |
| `scrum` | scrum, scriptorium-pack | 2 |
| `desarrollo` | todas | 19 |
```

### S02: Archivos de Pack

Crear `.github/context-packs/`:

```
.github/context-packs/
├── blueprint.json
├── teatro.json
├── scrum.json
└── full.json
```

Ejemplo `blueprint.json`:

```json
{
  "name": "Blueprint Pack",
  "description": "Para crear/editar blueprints impress.js",
  "instructionsFilesLocations": {
    ".github/plugins/gh-pages/instructions": true,
    ".github/plugins/scriptorium-pack/instructions": true,
    ".github/plugins/teatro/instructions": false,
    ".github/plugins/scrum/instructions": false,
    ".github/plugins/arg-board/instructions": false
  }
}
```

### S03: Script de Activación

```bash
#!/bin/bash
# scripts/activate-pack.sh
# Uso: ./scripts/activate-pack.sh blueprint

PACK=$1
PACK_FILE=".github/context-packs/${PACK}.json"

if [ ! -f "$PACK_FILE" ]; then
    echo "❌ Pack no encontrado: $PACK"
    echo "   Disponibles: $(ls .github/context-packs/*.json | xargs -n1 basename | sed 's/.json//')"
    exit 1
fi

# Extraer instructionsFilesLocations del pack
LOCATIONS=$(jq '.instructionsFilesLocations' "$PACK_FILE")

# Actualizar settings.json
jq --argjson locs "$LOCATIONS" '.["chat.instructionsFilesLocations"] = $locs' .vscode/settings.json > tmp.json
mv tmp.json .vscode/settings.json

echo "✅ Pack '$PACK' activado"
echo "   Instrucciones: $(echo "$LOCATIONS" | jq 'to_entries | map(select(.value == true)) | length')"
echo "   ⚠️ Ejecuta 'Developer: Reload Window' si no ves cambios"
```

---

## Impacto Revisado

> **Adenda a** [03_conversacion § Proyección de impacto](03_conversacion-refinamiento-backlog.md#-compromisos)

| Métrica | Original | Revisado | Nota |
|---------|----------|----------|------|
| Reducción automática | -60% | 0% | No hay hook |
| Reducción manual (con pack) | — | -75% | Usuario ejecuta script |
| Esfuerzo | 5 pts | 3 pts | Menos scope |

**Tradeoff**: La reducción no es automática, pero:
1. El usuario tiene control total
2. No dependemos de cambios en CopilotEngine
3. Preparamos infraestructura para futuro hook

---

## Épica Diferida: Context Manager Dinámico

> **Ref**: [03_conversacion § SCRIPT-2.5.0](03_conversacion-refinamiento-backlog.md#-priorización)

Movemos a **FC4 o posterior** la visión completa:

```typescript
// FUTURO: Si CopilotEngine expone hook
interface ContextHook {
  onBeforeRequest(prompt: string): Promise<InstructionFilter>;
}
```

**Condición de activación**: 
- VS Code/Copilot expone API de filtrado
- O contribuimos PR a CopilotEngine upstream

**Upstream Wish**: Ver [CopilotEngine/README-SCRIPTORIUM.md § WISH-01](../../../../CopilotEngine/README-SCRIPTORIUM.md#wish-01-hook-de-filtrado-dinámico-de-instrucciones)

---

## Validación Técnica (2025-12-29)

> Investigación profunda de CopilotEngine para validar las conclusiones de este documento.

### Archivos Analizados

| Archivo | Líneas | Hallazgo |
|---------|--------|----------|
| `customInstructionsService.ts` | 118-135 | `observableFromEvent(onDidChangeConfiguration)` solo dispara en cambio de settings |
| `customInstructions.tsx` | 87-95 | `getAgentInstructions()` lee todos los archivos sin filtrado dinámico |
| `promptFileParser.ts` | 190 | `applyTo` se parsea pero evaluación está en VS Code core |

### Mecanismos Existentes Revisados

| Mecanismo | Dinámico | Uso |
|-----------|----------|-----|
| `chat.instructionsFilesLocations` | ❌ | Cambiar en settings.json |
| `applyTo` frontmatter | Parcial | Filtro por archivo activo (VS Code core) |
| `languageId` filter | ✅ | En `CustomInstructions.tsx:163-170` |
| Skills folders | ❌ | Solo para `@agent` nativo |
| `chatInstructions` contribution | ❌ | Solo declara folders |

### Veredicto

✅ **@indice tiene razón**: No existe hook en CopilotEngine para filtrado dinámico per-request.

El único filtrado "dinámico" es:
1. `applyTo` (evaluado en VS Code core, no interceptable)
2. `languageId` (filtro post-carga en customInstructions.tsx)

Ninguno permite que un agente analice el prompt y decida qué instrucciones cargar.

---

## Backlog Reformulado FC1

| # | Épica | Nombre | Effort | Cambio |
|---|-------|--------|--------|--------|
| 1 | SCRIPT-2.1.0 | Context Packs Manual | 3 pts | ↓ de 5 pts |
| 2 | SCRIPT-2.3.0 | Context Packs Config | 3 pts | ↓ de 5 pts |
| 3 | SCRIPT-2.2.4 | MCP Integration | 5 pts | Sin cambio |
| — | SCRIPT-2.5.0 | Dynamic Context (diferido) | 8 pts | → FC4 |

**Total FC1**: 11 pts (antes: 15 pts)

---

## Criterios de Aceptación Revisados

> **Sustituye a** [03_conversacion § Criterio SCRIPT-2.1.0](03_conversacion-refinamiento-backlog.md#script-210-context-manager-core)

- [x] ~~Schema validado con `mode: warn`~~ → No aplica
- [ ] Mapeo dominio→instrucciones documentado en Funcional.md
- [ ] 4 packs creados: blueprint, teatro, scrum, full
- [ ] Script `activate-pack.sh` funcional
- [ ] Tokens por request reducidos >50% **con pack activo**

---

## Conclusión

La propuesta original asumía capacidades que CopilotEngine no expone. Este refinamiento:

1. **Respeta la restricción ReadOnly** del submódulo
2. **Entrega valor inmediato** al usuario (packs manuales)
3. **Reduce scope y esfuerzo** (11 pts vs 15 pts)
4. **Prepara infraestructura** para futuro hook dinámico

**Recomendación**: Aprobar esta reformulación y actualizar `01_backlog-borrador.md`.

---

*Refinamiento por @indice — 2025-12-29*
