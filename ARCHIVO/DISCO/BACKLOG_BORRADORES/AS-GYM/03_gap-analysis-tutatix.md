# Análisis de Gaps: Caso de Uso Tutatix

> **Fecha**: 2025-12-24  
> **Formato**: Conversación PO-SM según protocolo Scrum  
> **Propósito**: Validar si el backlog SCRIPT-1.10.0 cubre el caso de uso del personaje Tutatix

---

## Resumen Ejecutivo

**Caso de uso evaluado**: Creación del personaje **Tutatix**, un auditor de verdad basado en @blueflag que utiliza una Red Semántica (paradigma simbólico de as-gym) con dos épocas de operación:
1. **Época de Edición**: Chat para construir/modificar la red semántica
2. **Época de Conversación**: Diálogo usando la red como límites de contexto

**Despliegue objetivo**: Obra "Hola Mundo" junto a Nonsi y Tarotista

---

## Estado del Backlog

| Área | Cubierta | Gaps Identificados |
|------|----------|-------------------|
| Catálogo FIA básico | ✅ | Falta modelo concreto (RedSemantica) |
| Extensión schema recipe | ✅ | Falta campo `epochs` |
| Prompt de creación | ⚠️ Parcial | Solo 4 ingredientes, no épocas |
| Despliegue ARG | ⚠️ Parcial | No soporta runtime FIA |
| Documentación | ✅ | - |

---

## Conversación PO-SM

### 🎯 Product Owner (PO)

**PO**: Quiero validar que nuestro backlog SCRIPT-1.10.0 puede crear el personaje Tutatix. Te describo el caso de uso completo:

**Requisitos del personaje Tutatix**:

| Aspecto | Especificación |
|---------|----------------|
| Nombre | Tutatix |
| Agente Base | @blueflag (Auditor de Verdad) |
| FIA | Red Semántica (paradigma simbólico) |
| Fuente de datos | Por definir (conceptos de verdad/evidencia) |
| Presets MCP | Opcional |
| Despliegue | Obra "Hola Mundo" con Nonsi y Tarotista |

**El diferencial es el sistema de épocas**:

1. **Época A - Edición de Red**: El usuario interactúa con Tutatix para construir/editar una red semántica de conceptos. Tutatix guía la definición de:
   - Entidades (nodos)
   - Arcos estructurales (SUBCLASE, PARTE_DE, INSTANCIA_DE)
   - Arcos descriptivos (propiedades)

2. **Época B - Conversación Limitada**: Una vez construida la red, Tutatix conversa usando **solo** los conceptos de la red como límites de contexto. Si el usuario pregunta algo fuera de la red, Tutatix declara "no conozco ese concepto".

**Pregunta crítica**: ¿El backlog actual cubre esto?

---

### 🔧 Scrum Master (SM)

**SM**: Voy a analizar cada componente del caso de uso contra el backlog actual.

#### 1. Agente Base @blueflag → ✅ CUBIERTO

El sistema actual de AGENT_CREATOR ya soporta seleccionar agentes base. El campo `agentes_base` en el schema de recipe está listo.

```json
"agentes_base": [
  {
    "id": "blueflag",
    "file": ".github/agents/blueflag.agent.md",
    "elementos_heredados": ["Evidencia", "Utilidad", "Falsificabilidad"]
  }
]
```

**Estado**: ✅ Listo

---

#### 2. FIA - Red Semántica → ⚠️ PARCIALMENTE CUBIERTO

**Lo que está cubierto**:
- El backlog crea un catálogo de los 10 paradigmas FIA
- El schema de recipe incluye campo `fia_paradigmas`

**Lo que FALTA**:

La Red Semántica no es un paradigma independiente. Está **dentro** del paradigma `simbolica`:

```
as-gym/alephscript/src/FIA/paradigmas/simbolica/
└── modelos/formal/sistema/semantica/
    ├── red.ts          ← Clase RedSemantica
    ├── grafo.ts        ← Grafos de nodos
    ├── arco.ts         ← Arcos estructurales/descriptivos
    └── regla.ts        ← Reglas de inferencia
```

**Gap identificado**: El catálogo debe exponer **modelos concretos** dentro de cada paradigma, no solo paradigmas de alto nivel.

**Nueva task requerida**:

| Task ID | Descripción | Effort | Story |
|---------|-------------|--------|-------|
| T050 | Añadir sub-catálogo de modelos por paradigma (`simbolica` → `red_semantica`, `frames`, etc.) | 1 | S02 |

---

#### 3. Épocas de Operación → ❌ NO CUBIERTO

Este es el **gap más crítico**. El backlog actual no contempla que un personaje pueda tener **modos de operación distintos**.

**Concepto nuevo**: `epochs` — Épocas de uso del personaje con comportamientos diferenciados.

**Propuesta de schema**:

```json
"epochs": [
  {
    "id": "edicion",
    "nombre": "Edición de Red Semántica",
    "descripcion": "El usuario construye/edita la red semántica con ayuda del personaje",
    "fia_activo": "simbolica.red_semantica",
    "modo": "write",
    "system_prompt_override": "Actúa como editor colaborativo de una red semántica..."
  },
  {
    "id": "conversacion",
    "nombre": "Conversación Limitada",
    "descripcion": "El personaje conversa usando solo los conceptos de la red",
    "fia_activo": "simbolica.red_semantica",
    "modo": "read",
    "system_prompt_override": "Responde usando SOLO los conceptos de la red cargada. Si algo no está en la red, di 'no conozco ese concepto'."
  }
],
"epoch_default": "conversacion"
```

**Nuevas tasks requeridas**:

| Task ID | Descripción | Effort | Story Nueva |
|---------|-------------|--------|-------------|
| T051 | Diseñar schema de epochs en recipe | 1 | S10 |
| T052 | Implementar selector de época en prompt de creación | 1 | S10 |
| T053 | Documentar patrones de épocas (write/read, contexto limitado) | 1 | S10 |

---

#### 4. Persistencia de la Red Semántica → ❌ NO CUBIERTO

Las épocas implican que la red semántica debe **persistirse** entre sesiones:

- En Época A (edición): Se guarda/carga la red
- En Época B (conversación): Se carga la red como contexto

**Ubicación propuesta**:

```
ARCHIVO/PLUGINS/AGENT_CREATOR/agents/created/tutatix/
├── tutatix.agent.md        # Definición del agente
├── tutatix.recipe.json     # Receta de 4 ingredientes + épocas
└── fia/
    └── red_semantica.json  # Red semántica persistida
```

**Nuevas tasks requeridas**:

| Task ID | Descripción | Effort | Story Nueva |
|---------|-------------|--------|-------------|
| T054 | Definir estructura de carpeta por agente con FIA persistente | 1 | S10 |
| T055 | Crear prompt `editar-red-semantica.prompt.md` | 2 | S10 |
| T056 | Crear prompt `cargar-contexto-fia.prompt.md` | 1 | S10 |

---

#### 5. Despliegue en ARG (Obra Hola Mundo) → ⚠️ PARCIALMENTE CUBIERTO

**Lo que está cubierto**:
- El prompt `desplegar-en-arg.prompt.md` existe
- La obra "hola_mundo" ya tiene actores (tarotista, nonsi)

**Lo que FALTA**:
- El registro en `actores.json` no incluye configuración de épocas
- No hay forma de indicar qué época está activa al invocar el personaje

**Propuesta de extensión de actores.json**:

```json
"tutatix": {
  "nombre": "Tutatix",
  "tipo": "personaje",
  "arquetipo": "MENTOR",
  "descripcion": "Auditor de verdad con red semántica editable",
  "origen": {
    "plugin": "agent-creator",
    "agente_base": "blueflag",
    "fia_modelo": "simbolica.red_semantica"
  },
  "epochs": {
    "edicion": {
      "nombre": "Editor de Red",
      "comando": "@tutatix editar"
    },
    "conversacion": {
      "nombre": "Consultor",
      "comando": "@tutatix consultar"
    }
  },
  "epoch_actual": "conversacion"
}
```

**Nuevas tasks requeridas**:

| Task ID | Descripción | Effort | Story Nueva |
|---------|-------------|--------|-------------|
| T057 | Extender schema de actores.json con epochs | 1 | S10 |
| T058 | Actualizar prompt desplegar-en-arg con config de épocas | 1 | S10 |

---

### 📊 Resumen de Gaps

**SM**: Aquí está el resumen consolidado de lo que falta:

| # | Gap | Impact | Effort | Story |
|---|-----|--------|--------|-------|
| G1 | Sub-catálogo de modelos FIA | Medio | 1 | S02 (extender) |
| G2 | Schema de epochs en recipe | Alto | 1 | S10 (nueva) |
| G3 | Selector de época en creación | Alto | 1 | S10 |
| G4 | Patrones de épocas documentados | Medio | 1 | S10 |
| G5 | Carpeta FIA persistente por agente | Alto | 1 | S10 |
| G6 | Prompt editar-red-semantica | Alto | 2 | S10 |
| G7 | Prompt cargar-contexto-fia | Alto | 1 | S10 |
| G8 | Schema epochs en actores.json | Medio | 1 | S10 |
| G9 | Actualizar desplegar-en-arg | Medio | 1 | S10 |

**Effort adicional total**: 11 puntos

---

### 🆕 Nueva Story Propuesta: S10 - Sistema de Épocas

**Story**: SCRIPT-1.10.0-S10 — Sistema de Épocas para Personajes FIA  
**Effort**: 10 pts  
**Prioridad**: Must  
**Justificación**: Sin épocas, no se puede crear Tutatix ni ningún personaje con modos de operación diferenciados.

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| T051 | Diseñar schema de epochs en recipe.json | 1 | ⏳ |
| T052 | Implementar selector de época en crear-agente.prompt.md | 1 | ⏳ |
| T053 | Documentar patrones de épocas (write/read, contexto limitado) | 1 | ⏳ |
| T054 | Definir estructura de carpeta con FIA persistente | 1 | ⏳ |
| T055 | Crear prompt `editar-red-semantica.prompt.md` | 2 | ⏳ |
| T056 | Crear prompt `cargar-contexto-fia.prompt.md` | 1 | ⏳ |
| T057 | Extender schema de actores.json con epochs | 1 | ⏳ |
| T058 | Actualizar desplegar-en-arg.prompt.md | 1 | ⏳ |

**Definition of Done**:
- Se puede crear un personaje con 2+ épocas
- Las épocas persisten configuración FIA
- El despliegue en ARG respeta las épocas
- El usuario puede cambiar de época vía comando

---

### ✅ Decisión PO

**PO**: Aprobado. Añade la Story S10 al backlog. También necesito:

1. **Extender S02** con T050 (sub-catálogo de modelos)
2. **Añadir S10** completa como nueva story
3. **Actualizar el effort total** del sprint

**SM**: Entendido. Voy a:

1. Añadir T050 a S02 → +1 punto
2. Añadir S10 con 8 tasks → +10 puntos
3. Actualizar effort total: 34 → 45 puntos

---

## Backlog Actualizado (Diff)

### Cambios en Iteración 1: Catálogo FIA

**S02 - Poblar Catálogo** (actualizada):

| Task ID | Descripción | Effort | Estado |
|---------|-------------|--------|--------|
| ... | (tasks existentes T005-T014) | 5 | ⏳ |
| T050 | Añadir sub-catálogo de modelos por paradigma | 1 | ⏳ |

**Nuevo effort S02**: 5 → 6 puntos

### Nueva Iteración 5: Sistema de Épocas

> **Nota**: Insertada como nueva iteración entre I4 (Documentación) e integración.

| Iteración | Nombre | Objetivo | Effort |
|-----------|--------|----------|--------|
| FC1-I5 | Sistema de Épocas | Permitir personajes con modos de operación diferenciados | 22% |

**Stories de I5**:

#### SCRIPT-1.10.0-S10: Sistema de Épocas para Personajes FIA
**Effort**: 10 pts

(Ver tabla de tasks arriba)

---

## Métricas Actualizadas

| Métrica | Antes | Después | Δ |
|---------|-------|---------|---|
| Stories | 9 | 10 | +1 |
| Tasks | 42 | 51 | +9 |
| Effort total | 34 pts | 45 pts | +11 |
| Iteraciones | 4 | 5 | +1 |

---

## Próximos Pasos

1. **Actualizar `02_backlog-sprint-asgym.md`** con S10 y T050
2. **Crear Tutatix** usando el flujo actualizado como prueba
3. **Desplegar en Hola Mundo** con épocas configuradas

---

## Apéndice: Árbol de Red Semántica en as-gym

```
as-gym/alephscript/src/FIA/
└── paradigmas/simbolica/
    ├── fia-simbolica.ts                    # Paradigma principal
    └── modelos/formal/sistema/semantica/
        ├── red.ts                          # Clase RedSemantica
        ├── grafo.ts                        # IGrafo, Grafo
        ├── arco.ts                         # ArcoEstructural, ArcoDescriptivo
        ├── etiqueta.ts                     # RelacionEstructural, EtiquetaEstructural
        ├── regla.ts                        # ReglaRed, TecnicasInferenciaRed
        ├── motor-inferencia.ts             # MotorInferencia
        ├── exportador-red.ts               # ExportadorDeRed
        └── ejemplos/
            └── sintactico.ts               # Ejemplo de red sintáctica
```

**Interfaz IRedSemantica (extracto de red.ts)**:

```typescript
export interface IRedSemantica extends IModeloFormal {
    baseR: Base;
    cargar(red: any, entidades: IGrafo[]): void;
    crearNodosEntidad(clave: string): void;
    crearArcosSubclase(clase_hija: string): void;
    crearArcosParteDe(clase_padre: string): void;
    crearArcosInstanciaDe(clase_hija: string): void;
    crearArcosDescriptivos(clase_padre: string): void;
}
```

Esta interfaz es la que se usará para construir la red de Tutatix en la Época de Edición.
