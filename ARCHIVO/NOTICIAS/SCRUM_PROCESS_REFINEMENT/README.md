# README: Dossier SCRUM_PROCESS_REFINEMENT

> **Fecha**: 2026-01-01  
> **Épica**: FEATURE-SNAPSHOTS-1.0.0  
> **Tipo**: Documentación de Proceso + Chuletario Multi-audiencia

---

## Propósito

Este dossier documenta un evento significativo en la evolución del Scriptorium: el refinamiento de FEATURE-SNAPSHOTS-1.0.0 y el bloqueo preventivo que mejoró el proceso de aprobación.

Sirve tres propósitos:
1. **Chuletario DRY** para el equipo (evitar repetir investigación)
2. **Caso de estudio** para metodología DevOps
3. **Registro histórico** consultable por futuros usuarios

---

## Índice de Documentos

| # | Archivo | Audiencia | Contenido |
|---|---------|-----------|-----------|
| 01 | `01_noticia.md` | **Todos** | Resumen ejecutivo, 5W, tesis central |
| 02 | `02_chuletario_tecnico.md` | **Dev Team** | Root cause, arquitectura, código, diagramas Mermaid |
| 03 | `03_chuletario_gestion.md` | **PO + SM** | Decisiones, riesgos, timeline, stakeholders |
| 04 | `04_narrativa_publica.md` | **Comunidad** | Historia accesible, glosario, contexto general |
| 05 | `05_asamblea_agentes.md` | **Scriptorium** | Deliberación multiperspectiva, resoluciones |
| 06 | `06_bucle_devops.md` | **Metodología** | Versionado semántico, ciclo completo, métricas |

---

## Cómo Usar Este Dossier

### Si eres Desarrollador
1. Lee [02_chuletario_tecnico.md](02_chuletario_tecnico.md) para entender qué implementar
2. Consulta los diagramas Mermaid antes de tocar código
3. Verifica la sección de "Limitaciones Aceptadas" antes de proponer cambios

### Si eres PO o SM
1. Lee [03_chuletario_gestion.md](03_chuletario_gestion.md) para el contexto de decisiones
2. Usa el Decision Log como referencia para futuras discusiones
3. Revisa las resoluciones de la Asamblea para el nuevo proceso

### Si eres Nuevo en el Proyecto
1. Empieza por [04_narrativa_publica.md](04_narrativa_publica.md) para el contexto general
2. Consulta el glosario al final de ese documento
3. Luego profundiza según tu rol

### Si Quieres Entender el Proceso
1. Lee [05_asamblea_agentes.md](05_asamblea_agentes.md) para ver cómo deliberamos
2. Lee [06_bucle_devops.md](06_bucle_devops.md) para el modelo metodológico

---

## Relación con Otros Documentos

### Fuentes Primarias (Investigación Original)
```
ARCHIVO/DISCO/BACKLOG_BORRADORES/Enero_2026_CopilotLogsMCP_Bug/
├── 01_backlog-borrador.md        → Épica oficial
├── 04_correccion-bug-*.md        → Root cause empírico
├── 05_solucion-arquitectonica-*.md → Análisis de código
├── 07_analisis-viabilidad-*.md   → Gap analysis
├── 08_plan-implementacion-*.md   → Decisiones finales
└── 09_validacion_scriptorium_*.md → Auditoría completa
```

### Este Dossier Sintetiza
- Los hallazgos técnicos (dispersos en 9 docs) → En un chuletario único
- Las decisiones de gestión → En un formato consultable
- El proceso de deliberación → En registro formal
- El aprendizaje metodológico → En modelo reutilizable

---

## Palabras Clave para Búsqueda

`snapshots` `copilot-logs` `bloqueo-preventivo` `audit-gate` `definition-of-ready` `fifo-100` `copilotengine` `vscodeextension` `mcp-server` `auto-reflexion` `devops-loop` `versionado-semantico`

---

## Changelog del Dossier

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-01-01 | Creación inicial del dossier completo | @periodico |
| 2026-01-01 | Validación técnica | @ox |
| 2026-01-01 | Indexación DRY | @indice |

---

## Próximos Pasos

1. [ ] Implementar FEATURE-SNAPSHOTS-1.0.0 usando [02_chuletario_tecnico.md](02_chuletario_tecnico.md)
2. [ ] Aplicar resoluciones de la Asamblea al proceso general
3. [ ] Publicar [04_narrativa_publica.md](04_narrativa_publica.md) en blog/docs externos si aplica
