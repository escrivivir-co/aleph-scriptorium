# Sesión: Refactorización FUNDACIÓN

## Metadatos

| Campo | Valor |
|-------|-------|
| **Fecha inicio** | 2026-01-11 |
| **Estado** | 🟢 ACTIVA |
| **Épica relacionada** | FUND-REFACTOR-1.0.0 |
| **Carpeta** | ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-11_refactorizacion-fundacion/ |

## Participantes

| Agente | Rol | Estado actual |
|--------|-----|---------------|
| @aleph | Orquestador principal | ✅ DONE T001, T004, T005-E (briefing) |
| @periodico | Clarificación y síntesis de material | ✅ DONE T002 |
| @revisor | Verificación doctrinal | ✅ DONE T003 |
| @ForoScraper | Descarga de textos originales | ✅ DONE T005-A (anexo) |
| @FloveEditor | Interfaces de navegación | ✅ DONE T005-B,C,D (anexos) |
| @blueflag | Auditoría de Verdad | ✅ DONE T005 (7 transformaciones: 2 P0, 3 P1, 2 P2) |
| @blackflag | Auditoría de Sombras | ✅ DONE T006 (7 transformaciones: 3 P0, 3 P1, 1 P2) |
| @redflag | Auditoría de Estructura | ✅ DONE T007 (9 transformaciones: 3 P0, 4 P1, 2 P2) |
| @yellowflag | Auditoría de Límites | ✅ DONE T008 (8 transformaciones: 3 P0, 2 P1, 3 P2) |
| @orangeflag | Auditoría de Registro | ✅ DONE T009 (4 transformaciones de estilo) |

## Objetivo

Refactorizar el proyecto FUNDACIÓN usando como base los 3 textos del blog oficial:

1. **T04x01**: Lo de la ASI/AGI (los turing completos y las máquinas universales)
2. **T04x02**: Lo de la ASI/AGI (entre el mecanicismo conductual y la emergencia cognitiva)
3. **T04x03**: Micro-libro: «Hominoidea viralis»

**Resultado esperado**: Distribuir el material clarificado y tamizado en el arco de 12 capítulos mensuales de FUNDACIÓN 2026.

## Restricciones

- Las 5 Banderas deben proponer intervenciones sobre el material
- Proceso iterativo: las banderas validan integración hasta consenso
- Cada bandera puede proponer nuevos cambios basándose en lo aportado por otras

## Referencias de Backlog

- [BACKLOG-FUNDACION.md](../../../../PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md)
- [Textos base](./03_REFERENCIAS/)

## Material Disponible (Actualizado T005)

### Textos Originales Descargados

| ID | Título | Líneas | Ubicación |
|----|--------|--------|-----------|
| **T04x01** | Lo de la ASI/AGI (los turing completos...) | 227 | `03_REFERENCIAS/TEXTOS/04X01.md` |
| **T04x02** | Lo de la ASI/AGI (entre el mecanicismo...) | 177 | `03_REFERENCIAS/TEXTOS/04x02.md` |
| **T04x03** | Micro-libro «Hominoidea viralis» | 474 | `03_REFERENCIAS/TEXTOS/04x03.md` |

### Interfaces de Navegación (para Banderas)

| Interfaz | Paradigma | Propósito |
|----------|-----------|-----------|
| [FLOVE_INTERFACE](03_REFERENCIAS/FLOVE_INTERFACE_12_CAPITULOS.md) | CONFLUENTISM (3 niveles, 7 grados) | Epistemología |
| [MMCO_INTERFACE](03_REFERENCIAS/MMCO_INTERFACE_12_CAPITULOS.md) | Emergencia ontológica (0c→4) | Ontología |
| [METAMODEL_INTERFACE](03_REFERENCIAS/METAMODEL_INTERFACE_12_CAPITULOS.md) | UFO (5 capas, 7 dimensiones) | Capas de abstracción |

### Documentos de Trabajo

| Documento | Propósito |
|-----------|-----------|
| [BORRADOR_12_CAPITULOS.md](03_REFERENCIAS/BORRADOR_12_CAPITULOS.md) | Síntesis (~400 palabras/cap) |
| [BRIEFING_BANDERAS.md](03_REFERENCIAS/BRIEFING_BANDERAS.md) | **Curso acelerado** para FASE 2 |

## Fases del Cotrabajo

| Fase | Descripción | Agentes |
|------|-------------|---------|
| 1 | Clarificar material, fusionar y distribuir en 12 meses | @aleph, @periodico, @revisor |
| 2 | Tamizado de banderas: cada una propone plan de intervención | @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag |
| 3 | Selección y aplicación de propuestas de banderas | @aleph, @periodico, @revisor |
| 4 | Validación de integración por banderas | @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag |
| 5+ | Iteración hasta consenso total | Todas las banderas |
| X | Cierre: Acta final | @aleph |
