---
mode: agent
title: Exportar Ontología a Schema
description: Exporta una ontología Flove a JSON Schema, TypeScript o Zod
variables:
  - name: ontologia
    description: Ruta a la ontología a exportar (ARCHIVO/PLUGINS/FLOVE_EDITOR/ontologias/*.yaml)
  - name: formato
    description: Formato de salida (json-schema, typescript, zod)
  - name: destino
    description: Ruta de destino para el schema generado
---

# Exportar Ontología a Schema

## Ontología Fuente

**Archivo**: {{ontologia}}
**Formato destino**: {{formato}}
**Archivo destino**: {{destino}}

---

## Proceso de Exportación

### 1. Leer Ontología

Carga el archivo YAML de ontología y valida su estructura:

- [ ] Nivel Fuzzy (RELATE/EXPLAIN/VIEW)
- [ ] Nivel PsicoSocial (SOULS/TRUSTFUL)
- [ ] Nivel Freedom (FREE/MAKING)

### 2. Generar Schema

#### Si formato = `json-schema`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "{{ontologia.nombre}}",
  "title": "{{ontologia.nombre}}",
  "description": "Ontología Flove: {{ontologia.descripcion}}",
  "type": "object",
  "properties": {
    "fuzzy": {
      "type": "object",
      "properties": {
        "relate": { "$ref": "#/$defs/RelateArray" },
        "explain": { "$ref": "#/$defs/ExplainArray" },
        "view": { "$ref": "#/$defs/ViewArray" }
      }
    },
    "psicosocial": {
      "type": "object",
      "properties": {
        "souls": { "$ref": "#/$defs/SoulsArray" },
        "trustful": { "$ref": "#/$defs/TrustfulArray" }
      }
    },
    "freedom": {
      "type": "object",
      "properties": {
        "free": { "$ref": "#/$defs/FreeArray" },
        "making": { "$ref": "#/$defs/MakingArray" }
      }
    }
  },
  "$defs": {
    // Definiciones generadas desde ontología
  }
}
```

#### Si formato = `typescript`

```typescript
export interface {{OntologiaNombre}} {
  fuzzy: {
    relate: RelateItem[];
    explain: ExplainItem[];
    view: ViewItem[];
  };
  psicosocial: {
    souls: SoulsItem[];
    trustful: TrustfulItem[];
  };
  freedom: {
    free: FreeItem[];
    making: MakingItem[];
  };
}

// Interfaces generadas desde ontología
```

#### Si formato = `zod`

```typescript
import { z } from 'zod';

export const {{OntologiaNombre}}Schema = z.object({
  fuzzy: z.object({
    relate: z.array(RelateItemSchema),
    explain: z.array(ExplainItemSchema),
    view: z.array(ViewItemSchema),
  }),
  psicosocial: z.object({
    souls: z.array(SoulsItemSchema),
    trustful: z.array(TrustfulItemSchema),
  }),
  freedom: z.object({
    free: z.array(FreeItemSchema),
    making: z.array(MakingItemSchema),
  }),
});

// Schemas generados desde ontología
```

### 3. Guardar Schema

Guarda el schema en la ruta de destino especificada.

### 4. Integración (Opcional)

#### Con TypedPrompting

```
@plugin_ox_typedprompting Instalar schema {{destino}} para validación
```

#### Con AGENT_CREATOR

```
@plugin_ox_agentcreator Asignar ontología {{ontologia}} a receta {{agente}}
```

---

## Validación

Verifica que el schema generado:

- [ ] Es válido según el formato elegido
- [ ] Contiene todos los niveles Flove
- [ ] Incluye descripciones y ejemplos
- [ ] Es compatible con las herramientas target (AJV, tsc, zod)
