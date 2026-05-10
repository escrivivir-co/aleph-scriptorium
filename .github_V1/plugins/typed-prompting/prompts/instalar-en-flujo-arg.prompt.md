---
name: Instalar en flujo ARG
description: Modo Gestor - Instalar protocolo de comunicación tipado en una obra Teatro ARG
applyTo: "ARCHIVO/DISCO/TALLER/**/*.yaml, ARCHIVO/PLUGINS/ARG_BOARD/**/*"
---

# Prompt: Instalar Protocolo en Flujo ARG

> **Plugin**: TypedPrompting  
> **Modo**: Gestor  
> **Agente**: @typedprompting

## Invocación

```
@typedprompting Instalar en flujo ARG

Obra: {nombre de la obra .yaml}
Personajes involucrados:
- {personaje1} → {personaje2}: {tipo de comunicación}
- {personaje2} → {personaje1}: {tipo de comunicación}

Schemas a usar:
- {schema-id-1}
- {schema-id-2}
```

---

## Flujo de Instalación

### 1. Verificar Obra

Validar que la obra existe y tiene la estructura correcta:

```yaml
# Estructura esperada en {obra}.yaml
elenco:
  - nombre: Lucas
    rol: mentor
    # ...
  - nombre: Usuario
    rol: aprendiz
    # ...
```

### 2. Definir Contratos

Crear estructura `communicationProtocol`:

```yaml
# Se añade al archivo de la obra
communicationProtocol:
  version: "1.0.0"
  enforcement: "warn"  # warn | strict | off
  
  contracts:
    # Contrato: Usuario → Lucas
    usuario_to_lucas:
      from: "Usuario"
      to: "Lucas"
      schema: "lucas-query-request"
      validation:
        mode: "strict"
        onError: "reject"
    
    # Contrato: Lucas → Usuario
    lucas_to_usuario:
      from: "Lucas"
      to: "Usuario"
      schema: "lucas-query-response"
      validation:
        mode: "warn"
        onError: "log"
```

### 3. Registrar Schemas

Verificar que los schemas referenciados existen:

```
✅ lucas-query-request → ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/
✅ lucas-query-response → ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/
```

### 4. Actualizar Obra

Añadir la sección `communicationProtocol` al archivo YAML:

```yaml
# itaca-digital.yaml (actualizado)
metadata:
  titulo: "Ítaca Digital"
  version: "2.0.0"
  
elenco:
  - nombre: Lucas
    # ...

actos:
  # ...

# NUEVO: Protocolo de comunicación tipado
communicationProtocol:
  version: "1.0.0"
  enforcement: "warn"
  contracts:
    usuario_to_lucas:
      from: "Usuario"
      to: "Lucas"
      schema: "lucas-query-request"
    lucas_to_usuario:
      from: "Lucas"
      to: "Usuario"
      schema: "lucas-query-response"
```

---

## Modos de Enforcement

| Modo | Comportamiento |
|------|----------------|
| `off` | No valida, solo documenta contratos |
| `warn` | Valida y registra errores, no bloquea |
| `strict` | Valida y rechaza mensajes inválidos |

### Configuración por Contrato

Cada contrato puede tener su propio nivel:

```yaml
contracts:
  critico:
    schema: "schema-critico"
    validation:
      mode: "strict"
      onError: "reject"
      
  informativo:
    schema: "schema-info"
    validation:
      mode: "warn"
      onError: "log"
```

---

## Integración con Teatro

### Validación en Runtime

El Teatro puede validar mensajes usando el pack MCP:

```typescript
// En el handler de mensajes del Teatro
import { validateMessage } from '@typedprompts/validation';

async function handleMessage(from: string, to: string, message: any) {
  const contract = obra.communicationProtocol.contracts[`${from}_to_${to}`];
  
  if (contract) {
    const report = await validateMessage(contract.schema, message);
    
    if (!report.valid && contract.validation.mode === 'strict') {
      throw new ValidationError(report.errors);
    }
  }
}
```

### Conexión con Prolog

Los schemas pueden incluir campos que Prolog entiende:

```json
{
  "type": "object",
  "properties": {
    "intent": {
      "type": "string",
      "enum": ["validar_coherencia", "consultar_ubicacion", "verificar_estado"]
    },
    "params": {
      "type": "object"
    }
  }
}
```

---

## Ejemplos

### Ejemplo 1: Instalar en Ítaca Digital

```
@typedprompting Instalar en flujo ARG

Obra: itaca-digital.yaml
Personajes involucrados:
- Usuario → Lucas: consultas de aprendizaje
- Lucas → Usuario: respuestas mentoriales

Schemas a usar:
- lucas-query-request
- lucas-query-response
```

### Ejemplo 2: Crear nuevo contrato para obra nueva

```
@typedprompting Instalar en flujo ARG

Obra: nueva-obra.yaml (crear si no existe)
Personajes involucrados:
- Narrador → Audiencia: narración
- Audiencia → Sistema: interacciones

Schemas a usar:
- (sugerir basado en caso de uso)
```

---

## Verificación Post-Instalación

Después de instalar, verificar:

```bash
# 1. Validar YAML
npx yaml-lint ARCHIVO/DISCO/TALLER/OBRAS/itaca-digital.yaml

# 2. Verificar schemas referenciados
ls ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/lucas-*.json

# 3. Test de validación
curl -X POST localhost:3019/api/validate \
  -H "Content-Type: application/json" \
  -d '{"schemaId": 1, "message": {"intent": "validar_coherencia"}}'
```

---

## Referencias

- Obra ejemplo: `ARCHIVO/DISCO/TALLER/OBRAS/itaca-digital.yaml`
- Schemas de Lucas: `ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/lucas-*.json`
- Pack Prolog: `.github/plugins/mcp-presets/packs/AgentPrologBrain.pack.json`
- Plugin Teatro: `.github/plugins/teatro/`
