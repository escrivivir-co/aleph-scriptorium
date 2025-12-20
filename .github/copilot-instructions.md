# Instrucciones Globales (Copilot)

> **Hub Central de Instrucciones**
> Este archivo actúa como índice maestro. No duplica reglas definidas en otros documentos.

## 1. Identidad del Workspace

Este es un proyecto de **escritura política** dividido en dos "Opportunities":
1. **Aleph Scriptorium** (`.github/`): Infraestructura, agentes y herramientas.
2. **Fundación** (`ARCHIVO/`, `PROYECTOS/`): Contenido doctrinal y capítulos del texto fundacional (2026).

## 2. Protocolo DevOps y Gestión

**Fuente de verdad**: [DEVOPS.md](DEVOPS.md)

- **Metodología**: Agile/Scrum adaptado.
- **Backlogs**:
  - Scriptorium: [BACKLOG-SCRIPTORIUM.md](BACKLOG-SCRIPTORIUM.md)
  - Fundación: [../PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md](../PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md)
- **Commits**: Seguir estrictamente la convención definida en DEVOPS.md.

## 3. Agentes y Roles

**Agente Principal**: **Aleph**
- **Definición**: [agents/aleph.agent.md](agents/aleph.agent.md)
- **Responsabilidad**: Producción, orquestación y gestión del ciclo de vida.

**Sistema de Auditores**:
- `@blueflag` (Verdad/Evidencia), `@blackflag` (Sombra/Coste), `@redflag` (Estructura/Viabilidad), `@revisor` (Doctrina).
- Consultar `aleph.agent.md` para el flujo de invocación.

**Agente Periódico** (Noticias):
- **Definición**: [agents/periodico.agent.md](agents/periodico.agent.md)
- **Responsabilidad**: Producción de planas noticieras con método 5W + Banderas.
- **Handoffs**: `editar` (inicia/continúa en DISCO) y `publicar` (genera plana en NOTICIAS).

## 4. Instrucciones de Contenido (Doctrina)

El contenido se rige por instrucciones específicas. **No improvisar** estilos ni estructuras.

| Contexto | Instrucción Maestra |
|----------|---------------------|
| **Voz y Estilo** | [instructions/voz-manifiesto.instructions.md](instructions/voz-manifiesto.instructions.md) |
| **Diagnóstico** | [instructions/diagnostico.instructions.md](instructions/diagnostico.instructions.md) (Memoria, no guía) |
| **Justificación** | [instructions/justificacion.instructions.md](instructions/justificacion.instructions.md) (Memoria, no guía) |
| **Marco Conceptual** | [instructions/marco-conceptual.instructions.md](instructions/marco-conceptual.instructions.md) (Herramientas activas) |
| **Presentación** | [instructions/cartas-puerta.instructions.md](instructions/cartas-puerta.instructions.md) (Cartas de entrada) |
| **Noticias (Periódico)** | [instructions/periodico.instructions.md](instructions/periodico.instructions.md) (5W + Banderas) |
| **Herramientas MCP** | [instructions/mcp-tools.instructions.md](instructions/mcp-tools.instructions.md) |

## 5. Flujo de Trabajo (Resumen)

1. **Consultar Backlog**: Identificar tarea activa.
2. **Ejecutar**: Usar las instrucciones específicas del contexto (ver tabla arriba).
3. **Auditar**: Invocar auditores si es una tarea de redacción compleja.
4. **Commit**: Generar mensaje siguiendo protocolo (`feat(scope): ... refs #ID`).
5. **Actualizar Backlog**: Marcar tarea como completada.

## 6. Reglas de Oro (DRY)

- **No duplicar**: Si una regla está en `DEVOPS.md` o en `instructions/`, referénciala, no la copies.
- **Ubicación**:
  - El *qué* (contenido) está en `ARCHIVO/`.
  - El *cómo* (reglas) está en `.github/instructions/`.
  - El *cuándo* (plan) está en los Backlogs.
