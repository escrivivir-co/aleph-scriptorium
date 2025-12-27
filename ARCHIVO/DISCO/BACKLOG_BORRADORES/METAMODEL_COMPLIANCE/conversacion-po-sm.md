# Conversación PO-SM: Metamodel Compliance para FloveEditor

> **Fecha**: 2025-01-03
> **Submódulo target**: `OnthologyEditor`
> **Plugin target**: `flove-editor`
> **Fuente de auditoría**: https://codeberg.org/talaiadigital/metamodel
> **Estado**: En planificación

---

## Apertura

**SM (Scrum Master)**: Se ha identificado un framework de especificación ontológica de alta calidad en Codeberg (talaiadigital/metamodel) que puede servir como estándar de auditoría para nuestro OnthologyEditor y, por extensión, para el plugin flove-editor.

El metamodel ofrece:
- **5 capas de abstracción** (Meta-especificación → UFO → Dominio → Aplicación → Interfaz)
- **Plantillas estructurales** para entidades, relaciones y procesos
- **Análisis dimensional** (temporal, espacial, abstracción, semántico, social, epistémico, computacional)
- **Integración FAIR+XAI** para interoperabilidad y explicabilidad
- **Soporte regulatorio** (EU AI Act, responsabilidad algorítmica)
- **Licencia CC BY-SA 4.0** (compatible con nuestro AIPL)

**PO (Product Owner)**: La oportunidad es clara: usar este metamodel como benchmark de calidad para asegurar que flove-editor produce ontologías que cumplen estándares formales de la industria. Esto añade credibilidad y rigor al plugin.

---

## Análisis Técnico (SM)

### Inventario del Metamodel

| Capa | Nivel | Contenido |
|------|-------|-----------|
| **Meta-especificación** | 0 | Metamodelado, teoría de categorías |
| **Ontología Fundacional (UFO)** | 1 | Endurants, Perdurants, Momentos |
| **Dominio Core** | 2 | Entidades dominio-específicas |
| **Aplicación** | 3 | Implementaciones concretas |
| **Interfaz** | 4 | Formatos de intercambio |

### Inventario del OnthologyEditor Actual

| Componente | Estado | Notas |
|------------|--------|-------|
| `README.md` | ✅ Básico | Instrucciones npm |
| `README-SCRIPTORIUM.md` | ✅ Detallado | Análisis Flove/CONFLUENTISM |
| `src/templates/flove/` | ⏳ Planificado | No implementado |
| `src/editor/` | ⏳ Planificado | No implementado |
| `src/exporters/` | ⏳ Planificado | No implementado |

### Inventario del flove-editor Plugin

| Componente | Archivo | Estado |
|------------|---------|--------|
| Manifiesto | `manifest.md` | ✅ v0.1.0 |
| Agente | `agents/flove-editor.agent.md` | ✅ Básico |
| Instrucciones | `instructions/flove-paradigm.instructions.md` | ✅ Documentado |
| Prompt crear | `prompts/crear-ontologia.prompt.md` | ✅ Funcional |
| Prompt exportar | `prompts/exportar-schema.prompt.md` | ✅ Funcional |

### Gaps Identificados

| Gap | Descripción | Prioridad |
|-----|-------------|-----------|
| G1 | No hay validación formal de ontologías contra UFO | Alta |
| G2 | Faltan plantillas estructurales según metamodel | Alta |
| G3 | No hay análisis dimensional implementado | Media |
| G4 | Falta soporte FAIR para interoperabilidad | Media |
| G5 | No hay integración XAI para explicabilidad | Baja |
| G6 | Submódulo metamodel no integrado | Alta |

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Complejidad del metamodel | Media | Alto | Implementar por capas, empezar por UFO básico |
| Submódulo dentro de submódulo | Baja | Medio | Git soporta nested submodules |
| Licencia CC BY-SA vs AIPL | Baja | Alto | Verificar compatibilidad legal |
| Curva de aprendizaje UFO | Alta | Medio | Documentación progresiva |

---

## Visión de Producto (PO)

### Objetivo General

> Integrar el metamodel de Talaia Digital como framework de auditoría para que flove-editor produzca ontologías certificables según estándares formales.

### Casos de Uso Objetivo

1. **UC1: Validar Ontología Flove contra UFO**
   - Usuario crea ontología con flove-editor
   - Sistema valida contra patrones UFO (Endurants, Perdurants)
   - Reporte de compliance con sugerencias

2. **UC2: Exportar a Formatos Estándar**
   - Desde ontología Flove
   - Exportar a OWL, JSON-LD, RDF/Turtle
   - Con metadatos FAIR

3. **UC3: Auditoría Dimensional**
   - Analizar ontología en 7 dimensiones
   - Identificar gaps de cobertura
   - Sugerir extensiones

### Criterios de Éxito

- [ ] Ontologías Flove pasan validación UFO básica
- [ ] Exportadores generan formatos interoperables
- [ ] Documentación de compliance disponible
- [ ] Metamodel integrado como referencia navegable

---

## Decisiones

### D1: Integrar Metamodel como Submódulo

**Decisión**: Agregar `talaiadigital/metamodel` como git submodule dentro de `OnthologyEditor/metamodel/`.

**Rationale**:
- Mantiene fuente de verdad externa sincronizable
- Permite actualizaciones independientes
- Respeta autoría original (CC BY-SA)

### D2: Implementación por Fases

**Decisión**: Dividir en 3 Feature Cycles:

| FC | Objetivo | Entregables |
|----|----------|-------------|
| **FC1** | Integración submódulo + arquitectura | Submódulo instalado, documentación de mapeo |
| **FC2** | Validación UFO básica | Templates, validador, tests |
| **FC3** | FAIR + exportadores | Metadatos, formatos interoperables |

**Rationale**:
- Reduce riesgo con entregas incrementales
- Permite validar enfoque antes de invertir más
- Alinea con capacidad del equipo

### D3: Mapeo Flove ↔ UFO

**Decisión**: Crear documento de mapeo conceptual entre paradigma CONFLUENTISM (Flove) y ontología fundacional UFO.

**Mapeo preliminar**:

| Concepto Flove | Concepto UFO | Notas |
|----------------|--------------|-------|
| Field (10 campos) | Endurant | Entidades persistentes |
| Paradigm (transiciones) | Perdurant | Eventos/procesos |
| App (aplicaciones) | Mode/Quality | Propiedades dependientes |
| Levels (Fuzzy→Freedom) | Abstraction layers | Niveles de abstracción |

---

## Métricas de Éxito

| Métrica | Target | Mínimo | Estado |
|---------|--------|--------|--------|
| Submódulo integrado | ✅ | ✅ | ⏳ |
| Documento de mapeo Flove↔UFO | ✅ | ✅ | ⏳ |
| Plantillas UFO básicas | 5 | 3 | ⏳ |
| Validador funcional | ✅ | - | ⏳ |
| Exportador OWL/JSON-LD | 2 | 1 | ⏳ |

---

## Siguiente Paso

**SM**: Con estas decisiones, propongo generar el backlog borrador para Feature Cycle 1 con foco en:
1. Instalación del submódulo metamodel dentro de OnthologyEditor
2. Creación del documento de mapeo Flove ↔ UFO
3. Actualización de flove-editor con referencias al metamodel

**PO**: Aprobado. Proceder con backlog borrador para FC1.

---

## Cierre

**SM**: Se abre Feature Cycle 1 para SCRIPT-1.21.0 (Metamodel Compliance).

**Próxima sesión**: Revisar backlog borrador y aprobar para publicación.

