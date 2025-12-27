---
mode: agent
title: Crear Ontología Flove
description: Asistente guiado para crear una ontología siguiendo el paradigma CONFLUENTISM
variables:
  - name: dominio
    description: Nombre del dominio para el que diseñar la ontología
  - name: descripcion
    description: Descripción breve del dominio y su propósito
---

# Crear Ontología Flove

Vamos a crear una ontología siguiendo el paradigma **CONFLUENTISM** de Flove.

## Información del Dominio

**Dominio**: {{dominio}}
**Descripción**: {{descripcion}}

---

## Paso 1: Nivel Fuzzy Logic

### 1.1 RELATE (Relaciones)

Lista las **entidades principales** y sus **relaciones**:

| Entidad | Relación | Target | Cardinalidad |
|---------|----------|--------|--------------|
| | | | |

### 1.2 EXPLAIN (Conceptos)

Define los **conceptos clave** con sus **grados fuzzy**:

| Concepto | Definición | Grados (0.0-1.0) |
|----------|------------|------------------|
| | | |

### 1.3 VIEW (Vistas)

Diseña las **vistas** y sus **campos**:

| Vista | Campos | Tipo |
|-------|--------|------|
| | | |

---

## Paso 2: Nivel PsicoSocial

### 2.1 SOULS (Identidades)

Define las **identidades** y **pertenencias**:

| Identidad | Grupos | Roles | Credenciales |
|-----------|--------|-------|--------------|
| | | | |

### 2.2 TRUSTFUL (Confianza)

Define los **validadores** y **criterios**:

| Validador | Criterios | Niveles de Confianza |
|-----------|-----------|---------------------|
| | | |

---

## Paso 3: Nivel Freedom/Economy

### 3.1 FREE (Libertades)

Define las **acciones** y **condiciones**:

| Acción | Condiciones | Restricciones |
|--------|-------------|---------------|
| | | |

### 3.2 MAKING (Producción)

Define los **productos** y **recursos**:

| Producto | Recursos Consumidos | Recursos Producidos | Ciclo |
|----------|---------------------|---------------------|-------|
| | | | |

---

## Paso 4: Exportación

### Opciones de exportación:

1. **JSON Schema** (compatible con AJV)
2. **TypeScript interfaces**
3. **Zod schema**
4. **YAML estructurado**

### Opciones de integración:

- [ ] Instalar en TypedPrompting
- [ ] Asignar a receta de agente
- [ ] Crear preset MCP

---

## Output

Genera el archivo de ontología en:

```
ARCHIVO/PLUGINS/FLOVE_EDITOR/ontologias/{dominio}.ontology.yaml
```

Con la estructura completa de los 3 niveles Flove.
