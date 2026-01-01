# NOTICIA: El Scriptorium que Aprende a Recordar

> **Fecha**: 2026-01-01  
> **Épica**: FEATURE-SNAPSHOTS-1.0.0  
> **Agente**: @periodico  
> **Estado**: Dossier completo para Asamblea

---

## Índice del Dossier

Este documento es el **índice ejecutivo** de un dossier completo. Cada sección tiene su documento expandido:

| # | Documento | Audiencia | Propósito |
|---|-----------|-----------|-----------|
| 01 | **Este archivo** | Todos | Resumen ejecutivo y 5W |
| 02 | [Chuletario Técnico](02_chuletario_tecnico.md) | Dev Team | Referencia DRY para implementación |
| 03 | [Chuletario Gestión](03_chuletario_gestion.md) | PO + SM | Decisiones, riesgos, timeline |
| 04 | [Narrativa Pública](04_narrativa_publica.md) | Comunidad | Historia accesible del desarrollo |
| 05 | [Asamblea de Agentes](05_asamblea_agentes.md) | Scriptorium | Deliberación multiperspectiva |
| 06 | [Bucle DevOps](06_bucle_devops.md) | Metodología | Versionado semántico y ciclo completo |

---

## 1. Los Datos (5W)

### ¿Qué (What)?

Dos eventos entrelazados:

**Evento A: El Bug que se Convirtió en Feature**
Un bug en el sistema de logs de Copilot Chat (`get_copilot_request` retornaba vacío) reveló una limitación de diseño: CopilotEngine solo mantiene ~100 requests en memoria antes de sobrescribir los más antiguos.

**Evento B: El Bloqueo Preventivo**
Durante la aprobación del plan de solución, el agente Aleph detectó un patrón de riesgo: el plan prometía componentes que no existían. Activó un bloqueo preventivo que desencadenó una auditoría profunda.

**Resultado**: Sistema de Snapshots aprobado con scope clarificado y nuevo gate de calidad en el proceso.

### ¿Quién (Who)?

```
                    ACTORES DEL INCIDENTE
    
    ┌─────────────────────────────────────────────┐
    │                PROMOTORES                   │
    │   PO (Product Owner) + Lucas (SM)           │
    │   Investigaron, documentaron, propusieron   │
    └─────────────────────────────────────────────┘
                         │
                         ▼
    ┌─────────────────────────────────────────────┐
    │              GATEKEEPERS                    │
    │   Aleph (Bloqueo) + Ox (Auditoría)          │
    │   + Indice (Coherencia)                     │
    │   Validaron, cuestionaron, ajustaron        │
    └─────────────────────────────────────────────┘
                         │
                         ▼
    ┌─────────────────────────────────────────────┐
    │              UPSTREAM                       │
    │   CopilotEngine (GitHub)                    │
    │   Limitación de 100 requests (no negociable)│
    └─────────────────────────────────────────────┘
```

### ¿Cuándo (When)?

| Fecha | Evento |
|-------|--------|
| 2025-12-30 | Bug reportado |
| 2026-01-01 AM | Root cause identificado (límite 100) |
| 2026-01-01 AM | Plan propuesto por PO-SM |
| 2026-01-01 PM | Aleph activa bloqueo preventivo |
| 2026-01-01 PM | Ox-Indice auditan: 7 gaps técnicos |
| 2026-01-01 PM | Plan ajustado y re-aprobado |

### ¿Dónde (Where)?

- **Investigación**: `BACKLOG_BORRADORES/Enero_2026_CopilotLogsMCP_Bug/` (9 documentos)
- **Código afectado**: `VsCodeExtension/src/copilotLogs/`
- **Código upstream**: `CopilotEngine/src/extension/prompt/`
- **Persistencia futura**: `ARCHIVO/DISCO/COPILOT_SNAPSHOTS/`

### ¿Por qué (Why)?

**Causa inmediata**: Las conversaciones con Copilot Chat desaparecían, perdiendo contexto valioso.

**Causa profunda**: CopilotEngine no está diseñado para persistencia a largo plazo. Es un motor de conversación, no un archivo.

**Causa del bloqueo**: Patrón histórico de aprobaciones sin verificación técnica profunda.

**Motivación de la solución**: Convertir al Scriptorium en un sistema que puede **recordar sus propias conversaciones** y aprender de ellas.

---

## 2. Análisis Multiperspectiva: La Asamblea de Agentes

> **Nota**: Las perspectivas completas están en [05_asamblea_agentes.md](05_asamblea_agentes.md)

### 🟢 Aleph (El Orquestador)
> "Activé el freno de emergencia no por desconfianza, sino por responsabilidad. Si el plan sobrevive a mi bloqueo, entonces es digno de ser ejecutado."

**Función ontológica**: Coordinar producción, detectar riesgos sistémicos.

### 🐂 Ox (El Oráculo DevOps)
> "Mi veredicto es técnico, no político: el equipo PO-SM ha hecho su trabajo. La limitación de los 100 requests es real, pero el plan no la ignora; la mitiga con ingeniería."

**Función ontológica**: Validar viabilidad técnica, documentar decisiones.

### 🧭 Indice (El Navegante)
> "El camino trazado en el Backlog no es un callejón sin salida, sino una ruta transitable que se integra en la arquitectura mayor del Scriptorium."

**Función ontológica**: Verificar coherencia estructural, mantener índices DRY.

### 📋 Scrum (El Facilitador)
> "El conflicto no es un fallo, es una feature. El bloqueo de Aleph forzó una revisión que transformó un 'plan probable' en un 'plan blindado'."

**Función ontológica**: Gestionar proceso, facilitar iteración.

### 📜 Revisor (El Auditor)
> "Al aceptar la limitación de la memoria en lugar de fingir que no existe, el equipo ha actuado con honestidad intelectual."

**Función ontológica**: Validar verdad, rechazar magia.

---

## 3. Tesis Central

### El Enunciado

> **Un sistema de escritura con IA que no puede recordar sus conversaciones es un sistema amnésico. Los snapshots transforman la amnesia en archivo.**

### Las Tres Capas de Significado

**Capa Técnica**: Resolvemos una limitación upstream (CopilotEngine) construyendo persistencia local (snapshots en DISCO).

**Capa Metodológica**: El proceso de aprobación ahora incluye un gate de auditoría técnica. El equipo aprendió a **desconfiar sistemáticamente** antes de implementar.

**Capa Filosófica**: El Scriptorium evoluciona hacia un sistema **autopoiético** —uno que produce, documenta su producción, y aprende de su documentación.

### El Bucle Completo

```
Conversación → Snapshot → Archivo → Consulta → Mejor Conversación
                                                        ↓
                                              (Nuevo ciclo)
```

---

## 4. Implicaciones y Propuestas

### Para el Proceso (Resoluciones de la Asamblea)

| # | Resolución | Implementación |
|---|------------|----------------|
| R1 | Nuevo gate de validación técnica | Ox-Indice auditan antes de aprobación PO-SM |
| R2 | Definition of Ready actualizado | Verificación de componentes + gap analysis |
| R3 | Bloqueo preventivo normalizado | Cualquier agente puede invocarlo |
| R4 | Documentación de decisiones | Asambleas archivadas como registro |

### Para el Producto (Roadmap)

| Fase | Scope | Estimación |
|------|-------|------------|
| MVP | Snapshots por comando + persistencia | 10h |
| UI | Panel View con CRUD | 10h adicionales |
| AI | ABSTRACT.md generado automáticamente | P2 |

### Para la Comunidad

Este dossier es un ejemplo de **transparencia radical**: no solo documentamos *qué* decidimos, sino *cómo* lo decidimos. Incluyendo los conflictos.

---

## 5. Referencias Cruzadas

### Documentos del Borrador Original

| Doc | Ruta | Contenido |
|-----|------|-----------|
| 01 | [backlog-borrador.md](../../DISCO/BACKLOG_BORRADORES/Enero_2026_CopilotLogsMCP_Bug/01_backlog-borrador.md) | Épica y ACs |
| 04 | [correccion-bug-verificacion-empirica.md](../../DISCO/BACKLOG_BORRADORES/Enero_2026_CopilotLogsMCP_Bug/04_correccion-bug-verificacion-empirica.md) | Root cause |
| 05 | [solucion-arquitectonica-propuesta.md](../../DISCO/BACKLOG_BORRADORES/Enero_2026_CopilotLogsMCP_Bug/05_solucion-arquitectonica-propuesta.md) | Análisis de código |
| 07 | [analisis-viabilidad-plan-po-sm.md](../../DISCO/BACKLOG_BORRADORES/Enero_2026_CopilotLogsMCP_Bug/07_analisis-viabilidad-plan-po-sm.md) | Gap analysis |
| 08 | [plan-implementacion-aprobado.md](../../DISCO/BACKLOG_BORRADORES/Enero_2026_CopilotLogsMCP_Bug/08_plan-implementacion-aprobado.md) | Decisiones finales |
| 09 | [validacion_scriptorium_team.md](../../DISCO/BACKLOG_BORRADORES/Enero_2026_CopilotLogsMCP_Bug/09_validacion_scriptorium_team.md) | Auditoría completa |

### Documentos de Este Dossier

| Doc | Audiencia | Uso |
|-----|-----------|-----|
| [02_chuletario_tecnico.md](02_chuletario_tecnico.md) | Dev | Implementación |
| [03_chuletario_gestion.md](03_chuletario_gestion.md) | PO/SM | Decisiones |
| [04_narrativa_publica.md](04_narrativa_publica.md) | Público | Divulgación |
| [05_asamblea_agentes.md](05_asamblea_agentes.md) | Scriptorium | Deliberación |
| [06_bucle_devops.md](06_bucle_devops.md) | Metodología | Proceso |

---

## Cierre

**El Scriptorium aprende.**

No solo a escribir mejor. A planificar mejor. A validar mejor. A recordar mejor.

Los snapshots son solo el primer paso hacia un sistema que puede verse a sí mismo.

---

*Dossier producido por @periodico*  
*Validación técnica por @ox*  
*Coherencia estructural por @indice*  
*Facilitación de proceso por @scrum*  
*Auditoría doctrinal por @revisor*  
*Fecha: 1 de enero de 2026*
