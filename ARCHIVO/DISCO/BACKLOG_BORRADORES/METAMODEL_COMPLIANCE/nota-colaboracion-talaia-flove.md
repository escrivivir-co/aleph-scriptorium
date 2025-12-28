# Nota de Colaboración: Integración Metamodel + MMCO + FloveDocs

> **De**: ALEPH Scriptorium (escrivivir-co)  
> **Para**: Talaia Digital (metamodel, MMCO) y FloveDocs  
> **Fecha**: 2025-01-03  
> **Asunto**: Integración como submódulos y propuesta de colaboración

---

## Repositorios Implicados

| Proyecto | URL | Rama | Licencia |
|----------|-----|------|----------|
| **ALEPH Scriptorium** (principal) | https://github.com/escrivivir-co/aleph-scriptorium | `fc1` | AIPL v1.0 |
| **OnthologyEditor** (submódulo) | https://github.com/escrivivir-co/alephscript-onthology-editor | `integration/beta/scriptorium` | AIPL v1.0 |
| **metamodel** | https://codeberg.org/talaiadigital/metamodel | `main` | CC BY-SA 4.0 |
| **MMCO** | https://codeberg.org/talaiadigital/MMCO | `master` | AGPL-3.0 |
| **FloveDocs** | https://codeberg.org/FloveDocs/Main | `main` | Por confirmar |

---

## 1. Qué hemos hecho

Hemos integrado vuestros tres repositorios como **submódulos anidados** dentro de nuestro proyecto OnthologyEditor:

```
aleph-scriptorium/                           ← Repo principal
└── OnthologyEditor/                         ← Submódulo #15
    ├── metamodel/    ← codeberg.org/talaiadigital/metamodel (main)
    ├── MMCO/         ← codeberg.org/talaiadigital/MMCO (master)
    └── FloveDocs/    ← codeberg.org/FloveDocs/Main (main)
```

### Contexto del proyecto

**ALEPH Scriptorium** es un framework de escritura asistida por IA para proyectos de largo aliento, construido sobre VS Code + GitHub Copilot. Incluye:

- **Sistema de agentes** (~30) organizados en capas (UI, Backend, Sistema, Plugins)
- **Plugins extensibles** (~19) para capacidades específicas
- **Teatro interactivo** para experiencias transmedia (impress.js + monomito de 12 etapas)

El plugin **FloveEditor** permite diseñar ontologías basadas en el paradigma CONFLUENTISM con exportación a JSON Schema, TypeScript y Zod.

### Por qué vuestros repos

| Repo | Aportación al proyecto |
|------|------------------------|
| **metamodel** | Framework de 5 capas para validación UFO + principios FAIR |
| **MMCO** | Fundamento teórico (BNP, emergencia de 7 niveles) para ontologías profundas |
| **FloveDocs** | Taxonomía canónica de Flove (10 Fields, 6 Paradigms, 15+ Apps) |

---

## 2. Qué vamos a hacer

### Objetivo inmediato (Feature Cycle 1)

1. **Arquitectura de integración**: Documentar cómo el metamodel audita ontologías creadas con FloveEditor
2. **Mapeo Flove ↔ UFO**: Traducir los 10 campos de Flove a conceptos UFO (Endurants, Perdurants, Modes)
3. **Templates de validación**: Crear plantillas que verifiquen cumplimiento de estructura metamodel

### Roadmap posterior

| FC | Objetivo | Estimación |
|----|----------|------------|
| **FC2** | Validador UFO integrado (templates, tests) | ~25 pts |
| **FC3** | Cumplimiento FAIR + exportadores (OWL, JSON-LD) | ~20 pts |
| **FC4** | XAI + análisis dimensional | ~15 pts |

### Uso de cada repo

- **metamodel**: Referencia estructural (CC BY-SA 4.0 compatible)
- **MMCO**: Referencia teórica (respetando AGPL-3.0, sin copiar código)
- **FloveDocs**: Fuente canónica de la taxonomía Flove

---

## 3. Propuesta de colaboración

### Ramas remotas sugeridas

Proponemos crear ramas de integración en vuestros repos para facilitar versionado semántico:

| Repo | Rama propuesta | Propósito |
|------|----------------|-----------|
| metamodel | `integration/scriptorium` | Sincronizar versiones estables para nuestro uso |
| MMCO | `integration/scriptorium` | Idem, tracking de cambios relevantes |
| FloveDocs | `release/v2025.12` | Tag de la versión que usamos (diciembre 2025) |

### Flujo de trabajo

```
[Vuestro desarrollo]     [Nuestro consumo]
      main/master
          │
          ├─────────────► integration/scriptorium
          │                      │
          │               (submódulo apunta aquí)
          │                      │
          ▼                      ▼
    Nuevas features        Actualización
                           controlada
```

### Beneficios

1. **Estabilidad**: No rompemos si actualizáis main/master
2. **Trazabilidad**: Sabemos exactamente qué versión usamos
3. **Colaboración**: Podemos proponer PRs hacia integration/ que luego mergear a main

### Alternativa mínima

Si preferís no crear ramas adicionales, podemos:
- Usar **tags** específicos (ej: `v1.0.0-scriptorium`)
- O simplemente fijar un **commit SHA** en nuestros submódulos

---

## 4. Licencias y Compatibilidad

### Matriz de Licencias

| Componente | Licencia | Tipo | Copyleft | Compatible |
|------------|----------|------|----------|------------|
| **ALEPH Scriptorium** | AIPL v1.0 | Permisiva | No | Base |
| **OnthologyEditor** | AIPL v1.0 | Permisiva | No | Base |
| **metamodel** | CC BY-SA 4.0 | Creative Commons | ShareAlike | ✅ Sí |
| **MMCO** | AGPL-3.0 | Open Source | Fuerte | ⚠️ Condicional |
| **FloveDocs** | Por confirmar | — | — | Pendiente |

### Estrategia de Combinación

```
┌─────────────────────────────────────────────────────────────────┐
│                    ALEPH Scriptorium (AIPL v1.0)                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         OnthologyEditor (AIPL v1.0)                       │   │
│  │                                                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │   │
│  │  │ metamodel   │  │    MMCO     │  │   FloveDocs     │   │   │
│  │  │ CC BY-SA 4.0│  │  AGPL-3.0   │  │  Por confirmar  │   │   │
│  │  │             │  │             │  │                 │   │   │
│  │  │ USO:        │  │ USO:        │  │ USO:            │   │   │
│  │  │ Templates,  │  │ Referencia  │  │ Taxonomía,      │   │   │
│  │  │ validación  │  │ teórica     │  │ documentación   │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Compromisos

1. **metamodel (CC BY-SA 4.0)**: 
   - Usamos como referencia para templates de validación
   - Atribución en documentación y código derivado
   - Código derivado bajo CC BY-SA 4.0 o compatible

2. **MMCO (AGPL-3.0)**:
   - Usamos como **referencia teórica** (no copiamos código)
   - Si integramos código: módulo separado bajo AGPL-3.0
   - Documentación del concepto BNP sin derivación de código

3. **FloveDocs**:
   - Uso de tablas/diagramas como referencia documental
   - Pendiente confirmar licencia específica

---

## 5. Para Product Owners (Casos de Uso)

### CU-01: Validar ontología contra estándar UFO

> **Como** diseñador de ontologías  
> **Quiero** validar mi ontología contra el framework UFO  
> **Para** asegurar coherencia formal antes de exportar

**Flujo**: Cargar ontología → Ejecutar validador metamodel → Ver errores/warnings → Corregir

### CU-02: Crear agente con ontología certificada

> **Como** creador de agentes  
> **Quiero** usar una ontología validada en mi agente  
> **Para** garantizar que las interacciones siguen un modelo formal

**Flujo**: Seleccionar ontología validada → Integrar con AGENT_CREATOR → Desplegar agente

### CU-03: Exportar ontología a formato estándar

> **Como** integrador de sistemas  
> **Quiero** exportar mi ontología a JSON-LD/OWL  
> **Para** interoperar con otras plataformas

**Flujo**: Ontología validada → Seleccionar formato → Exportar con metadatos FAIR

### CU-04: Consultar taxonomía Flove

> **Como** diseñador de ontologías  
> **Quiero** consultar la taxonomía canónica de Flove  
> **Para** usar campos/paradigmas predefinidos

**Flujo**: Abrir FloveDocs → Navegar Fields/Paradigms/Apps → Importar a mi ontología

---

## 6. Contacto y próximos pasos

### Nuestros repos

| Recurso | URL |
|---------|-----|
| Web del proyecto | https://escrivivir-co.github.io/aleph-scriptorium/ |
| Repo principal | https://github.com/escrivivir-co/aleph-scriptorium |
| OnthologyEditor | https://github.com/escrivivir-co/alephscript-onthology-editor |
| Organización | https://github.com/escrivivir-co |

### Preguntas para vosotros

1. ¿Os parece bien la estructura de integración propuesta?
2. ¿Preferís ramas `integration/scriptorium` o tags versionados?
3. **FloveDocs**: ¿Cuál es la licencia aplicable?
4. ¿Tenéis interés en colaboración bidireccional (ej: recibir nuestros templates de validación)?
5. **MMCO (2025-12-28)**: ¿Es correcta nuestra caracterización de Φ como vector 5D con banderas en diferentes niveles de emergencia MMCO? Ver [SCRIPT-1.23.0 refactorizada](../Diciembre_25_MMCO_Editor/02_guia-organize.md)

---

Quedamos a disposición para cualquier aclaración.

**Equipo ALEPH Scriptorium**  
escrivivir-co · 2025
