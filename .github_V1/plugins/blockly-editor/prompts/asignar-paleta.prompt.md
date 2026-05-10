---
name: Asignar Paleta
description: Asigna o cambia la paleta de paradigma FIA a un personaje.
mode: agent
tools: ['read', 'edit', 'agent']
---

# Asignar Paleta de Paradigma

## Objetivo

Asignar una paleta de bloques Blockly a un personaje, basada en su paradigma FIA.

## Parámetros

- **personaje**: ID del personaje (obligatorio)
- **paleta**: ID de paleta a asignar (obligatorio)

## Paletas Disponibles

| ID | Paradigma FIA | Estado | Descripción |
|----|---------------|--------|-------------|
| `sbr` | Sistemas Basados en Reglas | ✅ Activo | IF-THEN, condiciones, acciones |
| `logica` | Lógica Formal | ⏳ Sprint 3 | Proposiciones, implicación |
| `simbolica` | IA Simbólica | ⏳ Sprint 3 | Marcos, slots, herencia |
| `conexionista` | Redes Neuronales | ⏳ Sprint 4 | Capas, activación |
| `gramaticas` | Gramáticas Formales | ⏳ Sprint 4 | Parsers, tokens |

## Flujo

1. **Verificar personaje** en actores.json
2. **Verificar paleta** existe en `paletas/`
3. **Si hay rutina existente**:
   - Advertir que el código puede no ser compatible
   - Ofrecer backup del workspace anterior
4. **Actualizar** campo `rutina.paleta` en actores.json
5. **Confirmar** cambio

## Advertencia de Compatibilidad

Si el personaje ya tiene una rutina con otra paleta:

```markdown
⚠️ **Advertencia**: El personaje ya tiene rutina con paleta `{paleta_anterior}`.

Cambiar a `{paleta_nueva}` puede hacer incompatibles los bloques existentes.

**Opciones**:
1. Crear backup de workspace actual y continuar
2. Cancelar y mantener paleta actual
3. Reiniciar rutina desde cero con nueva paleta

¿Qué deseas hacer? [1] [2] [3]
```

## Mapeo con Banderas (para auditoría)

| Paleta | Bandera afín | Auditoría sugerida |
|--------|--------------|-------------------|
| sbr | @blackflag | Reglas de poder, efectos colaterales |
| logica | @blueflag | Verdad formal, consistencia |
| simbolica | @aleph | Producción, completitud |
| conexionista | @yellowflag | Límites del modelo |

## Output Esperado

```markdown
### Paleta asignada: {personaje}

**Paleta anterior**: {anterior|ninguna}
**Paleta nueva**: {paleta}
**Paradigma FIA**: {paradigma}

**actores.json actualizado** ✅

**Próximo paso**: 
- [Abrir editor](prompt:abrir-editor) con nueva paleta
- [Crear rutina](prompt:crear-rutina) desde cero
```
