---
agent: 'agent'
description: 'Combina dos o más agentes en uno especializado'
tools: ['read', 'edit', 'search']
---

# Fusionar Agentes

## Objetivo

Crear un nuevo agente que combine las capacidades de múltiples agentes existentes, generando sinergias metodológicas.

## Flujo

### Paso 1: Seleccionar agentes a fusionar

```
¿Qué agentes quieres fusionar?

Indica 2 o más agentes:
- Agentes core: @yellowflag, @blueflag, @blackflag, @redflag, @orangeflag
- Agentes creados: [listar de ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/]
- Agentes de plugins: @periodico, @bibliotecario, etc.
```

### Paso 2: Analizar compatibilidad

Para cada par de agentes, evaluar:

| Aspecto | Agente A | Agente B | ¿Compatible? |
|---------|----------|----------|--------------|
| Metodología | X | Y | ✅/⚠️/❌ |
| Fuentes de verdad | [...] | [...] | ✅/⚠️/❌ |
| Tests de auditoría | [...] | [...] | ✅/⚠️/❌ |
| Handoffs | [...] | [...] | ✅/⚠️/❌ |

Advertir si hay tensiones metodológicas (ej: fusionar agentes con perspectivas contradictorias).

### Paso 3: Definir síntesis

```
He detectado las siguientes posibilidades de síntesis:

1. {Nombre propuesto}: Combina {capacidad A} con {capacidad B}
2. {Nombre propuesto}: Integra {metodología A} en {marco B}

¿Cuál prefieres? ¿O tienes otra idea?
```

### Paso 4: Generar agente fusionado

El system prompt debe:
1. Declarar la naturaleza híbrida
2. Explicar cómo se relacionan las perspectivas
3. Definir cuándo usar cada lente
4. Resolver tensiones explícitamente

```markdown
## System Prompt (fusión)

Eres un agente que integra dos perspectivas:

**Perspectiva 1 ({Agente A}):**
{Resumen de su metodología}

**Perspectiva 2 ({Agente B}):**
{Resumen de su metodología}

**Tu síntesis:**
{Cómo se complementan, cuándo usar cada una}
```

### Paso 5: Consolidar handoffs

- Heredar handoffs de ambos agentes
- Eliminar duplicados
- Añadir handoffs de vuelta a agentes originales

## Ejemplo: Yellowflag + Blueflag

```
Fusión: "Demarcación Integral"

Perspectiva Yellowflag:
- Cuadrantes de Wilber
- Límites de lo que la política puede capturar
- Pre/trans falacia

Perspectiva Blueflag:
- Criterio de verdad
- Evidencia empírica
- Falsificabilidad

Síntesis:
Un agente que audita propuestas preguntando:
1. ¿Es esto verdad? (Blueflag)
2. ¿Es esto todo? ¿Qué escapa? (Yellowflag)
3. ¿Se confunde lo pre-racional con lo trans-racional? (Yellowflag)
4. ¿Es falsificable? (Blueflag)
```

## Validaciones

- [ ] Al menos 2 agentes seleccionados
- [ ] Detectar y advertir tensiones metodológicas
- [ ] Nombre único para el agente fusionado
- [ ] Handoffs sin duplicados
