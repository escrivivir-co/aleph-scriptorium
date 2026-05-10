---
name: Instalar schema en agente
description: Modo Gestor - Instalar validationSchema en la receta de un agente del Scriptorium
applyTo: "ARCHIVO/PLUGINS/TYPED_PROMPTING/**/*"
---

# Prompt: Instalar Schema en Agente

> **Plugin**: TypedPrompting  
> **Modo**: Gestor  
> **Agente**: @typedprompting

## Invocación

```
@typedprompting Instalar schema en agente

Agente destino: {nombre del agente}
Schema(s) de entrada: {id o nombre del schema}
Schema(s) de salida: {id o nombre del schema}
Modo: {strict / warn / log}
```

---

## Flujo de Instalación

### 1. Validar Schema

Verificar que el schema existe y es válido:

```bash
# Buscar en schemas locales
ls ARCHIVO/PLUGINS/TYPED_PROMPTING/schemas/

# O en el submódulo
cat alephscript-typed-prompting/data/stored-prompts.json | jq '.schemas[] | select(.name == "{nombre}")'
```

### 2. Localizar Receta del Agente

Buscar en AGENT_CREATOR o en el sistema:

```bash
# Buscar receta
find ARCHIVO/PLUGINS/AGENT_CREATOR -name "*{agente}*"

# O en el registro de creación
cat ARCHIVO/PLUGINS/AGENT_CREATOR/creation-log.json | jq '.[] | select(.name == "{agente}")'
```

### 3. Generar validationSchema

Crear el objeto de configuración:

```json
{
  "validationSchema": {
    "input": ["{schema-entrada-id}"],
    "output": ["{schema-salida-id}"],
    "mode": "warn"
  }
}
```

### 4. Inyectar en Receta

Añadir el campo a la receta del agente:

```json
{
  "name": "{agente}",
  "base": ["aleph"],
  "personality": "...",
  "knowledge": "...",
  "validationSchema": {
    "input": ["schema-consulta-usuario"],
    "output": ["schema-respuesta-agente"],
    "mode": "warn"
  }
}
```

### 5. Actualizar Registro

Añadir entrada al log de instalaciones:

```json
{
  "timestamp": "2025-12-24T...",
  "action": "install_schema",
  "agent": "{agente}",
  "schemas": {
    "input": ["..."],
    "output": ["..."]
  },
  "mode": "warn"
}
```

---

## Modos de Validación

| Modo | Comportamiento | Uso recomendado |
|------|----------------|-----------------|
| `strict` | Rechaza mensajes inválidos | Producción, crítico |
| `warn` | Advierte en log, procesa | Desarrollo, testing |
| `log` | Solo registra, no afecta | Debug, monitoreo |

---

## Output Esperado

```markdown
## Instalación Completada

### Resumen

| Campo | Valor |
|-------|-------|
| Agente | {nombre} |
| Schemas entrada | {lista} |
| Schemas salida | {lista} |
| Modo | {modo} |

### Cambios Realizados

**Archivo**: `ARCHIVO/PLUGINS/AGENT_CREATOR/recipes/{agente}.recipe.json`

```diff
+ "validationSchema": {
+   "input": ["schema-consulta-usuario"],
+   "output": ["schema-respuesta-agente"],
+   "mode": "warn"
+ }
```

### Verificación

Para probar la validación:

```bash
@typedprompting Validar mensaje contra {schema-id}
{mensaje de prueba}
```

### Próximos Pasos

- [ ] Probar con mensaje válido
- [ ] Probar con mensaje inválido
- [ ] Ajustar modo si es necesario
- [ ] Documentar en README del agente
```

---

## Validaciones

- [ ] Schema existe en el sistema
- [ ] Agente existe y tiene receta
- [ ] Modo es válido (strict/warn/log)
- [ ] No hay conflicto con schemas previos
