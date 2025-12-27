---
name: Paradigma Flove (CONFLUENTISM)
description: Instrucciones para modelar dominios según el paradigma Flove y su estructura de 3 niveles.
applyTo: "ARCHIVO/PLUGINS/FLOVE_EDITOR/**/*.md, OnthologyEditor/**/*.md"
---

# Paradigma Flove: CONFLUENTISM

> **Fuente**: [Flove.org](https://flove.org) y [FloveDocs](https://codeberg.org/FloveDocs/Main)

## Qué es Flove

Flove (Fuzzy Logic + Love) es un paradigma para modelar **sistemas confluentes** donde la lógica difusa, las relaciones psicosociales y la economía de la libertad se integran.

---

## Estructura de 3 Niveles

### Nivel 1: Fuzzy Logic (Lógica Difusa)

Los conceptos no son binarios sino graduales. Tres operaciones fundamentales:

| Operación | Función | Pregunta clave |
|-----------|---------|----------------|
| **RELATE** | Establecer relaciones | ¿Cómo se conectan las entidades? |
| **EXPLAIN** | Explicar/definir | ¿Qué significa cada concepto? |
| **VIEW** | Visualizar/descubrir | ¿Cómo se presenta la información? |

### Nivel 2: PsicoSocial

La identidad y la confianza como fundamentos de la interacción:

| Dimensión | Función | Pregunta clave |
|-----------|---------|----------------|
| **SOULS** | Identidad/pertenencia | ¿Quién es el actor? ¿A qué grupos pertenece? |
| **TRUSTFUL** | Validación/confianza | ¿Cómo se verifica la confianza? |

### Nivel 3: Freedom/Economy

La libertad de acción y la producción de valor:

| Dimensión | Función | Pregunta clave |
|-----------|---------|----------------|
| **FREE** | Libertad de acción | ¿Qué puede hacer el actor libremente? |
| **MAKING** | Producción/economía | ¿Qué valor produce? ¿Qué recursos consume? |

---

## Cómo Mapear un Dominio a Flove

### Paso 1: Identificar Entidades y Relaciones (RELATE)

```yaml
relate:
  - entidad: "Usuario"
    relaciones:
      - tipo: "es_amigo_de"
        target: "Usuario"
        cardinalidad: "N:M"
      - tipo: "pertenece_a"
        target: "Grupo"
        cardinalidad: "N:1"
```

### Paso 2: Definir Conceptos (EXPLAIN)

```yaml
explain:
  - concepto: "Amistad"
    definicion: "Relación bidireccional de confianza mutua"
    grados:
      - nivel: 0.3
        etiqueta: "conocido"
      - nivel: 0.6
        etiqueta: "amigo"
      - nivel: 0.9
        etiqueta: "amigo_cercano"
```

### Paso 3: Diseñar Vistas (VIEW)

```yaml
view:
  - vista: "PerfilUsuario"
    campos:
      - nombre: "avatar"
        tipo: "imagen"
      - nombre: "bio"
        tipo: "texto"
      - nombre: "amigos"
        tipo: "lista<Usuario>"
```

### Paso 4: Modelar Identidades (SOULS)

```yaml
souls:
  - identidad: "MiembroComunidad"
    pertenencias:
      - grupo: "Desarrolladores"
        rol: "contributor"
      - grupo: "Mentores"
        rol: "mentor"
    credenciales:
      - tipo: "github"
        verificado: true
```

### Paso 5: Definir Validación (TRUSTFUL)

```yaml
trustful:
  - validador: "VerificacionGitHub"
    criterios:
      - campo: "commits"
        operador: ">="
        valor: 10
      - campo: "años_actividad"
        operador: ">="
        valor: 1
    resultado:
      - nivel: 0.0
        etiqueta: "no_verificado"
      - nivel: 0.5
        etiqueta: "verificado_basico"
      - nivel: 1.0
        etiqueta: "verificado_completo"
```

### Paso 6: Establecer Libertades (FREE)

```yaml
free:
  - accion: "CrearProyecto"
    condiciones:
      - "identidad.verificado >= 0.5"
      - "recursos.creditos >= 10"
    restricciones:
      - "max 5 proyectos activos"
```

### Paso 7: Definir Producción (MAKING)

```yaml
making:
  - producto: "Proyecto"
    recursos_consumidos:
      - tipo: "creditos"
        cantidad: 10
    recursos_producidos:
      - tipo: "reputacion"
        cantidad: "variable"
    ciclo: "mensual"
```

---

## Integración con Scriptorium

### Con Agentes

Cada nivel Flove puede mapearse a una capa de agentes:

| Nivel Flove | Capa Scriptorium | Función |
|-------------|------------------|---------|
| Fuzzy (RELATE/EXPLAIN/VIEW) | UI | Presentación y relaciones |
| PsicoSocial (SOULS/TRUSTFUL) | Backend | Auditoría y validación |
| Freedom (FREE/MAKING) | Sistema | Permisos y recursos |

### Con Plugins

- **TypedPrompting**: Exportar ontología como JSON Schema
- **AGENT_CREATOR**: Asignar ontología a recetas de agentes
- **MCP-Presets**: Crear toolkits específicos por ontología

### Con Teatro ARG

Una ontología Flove puede definir:
- Personajes (SOULS)
- Reglas de interacción (TRUSTFUL)
- Acciones disponibles (FREE)
- Economía del juego (MAKING)

---

## Apps Flove como Referencia

Cada app Flove implementa el paradigma en un dominio específico:

| App | Dominio | Nivel Principal |
|-----|---------|-----------------|
| floveDate | Citas | RELATE |
| floveFamilyMates | Familia | RELATE |
| floveChoir | Coordinación | EXPLAIN |
| floveEdu | Educación | EXPLAIN |
| floveBizz | Negocios | VIEW |
| floveCorp | Corporativo | VIEW |
| floveLawyers | Legal | SOULS |
| floveGamers | Gaming | SOULS |
| floveMD | Médico | TRUSTFUL |
| floveSafe | Seguridad | TRUSTFUL |
| floveMentor | Mentoría | FREE |
| flovePledge | Compromisos | FREE |
| floveRent | Alquileres | MAKING |
| floveRoom | Espacios | MAKING |

---

## Lo que NO hacer

- **No forzar binarios**: Flove es fuzzy, usa grados (0.0-1.0)
- **No ignorar niveles**: Cada nivel aporta una dimensión esencial
- **No mezclar capas**: Mantener separación entre Fuzzy/PsicoSocial/Freedom
- **No olvidar TRUSTFUL**: La confianza es el puente entre identidad y acción

---

## Recursos

- **Documentación**: `OnthologyEditor/README-SCRIPTORIUM.md`
- **FloveDocs**: https://codeberg.org/FloveDocs/Main
- **Presentaciones**: FloveSlides25.12.pdf
- **Tablas técnicas**: FloveTables25.12.ods
