# Aleph Scriptorium

[![VibeBitacora](https://img.shields.io/badge/Powered%20by-VibeBitacora-blue)](https://github.com/escrivivir-co/vibe-bitacora)
[![GitHub Pages](https://img.shields.io/badge/Web-GitHub%20Pages-success)](https://escrivivir-co.github.io/aleph-scriptorium/)

**El taller de escritura donde la IA trabaja para ti, no al revés.**

> 🌐 **Sitio web**: [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/)

> *Aleph (ℵ) es el símbolo que Cantor usó para los infinitos: conjuntos que nunca se completan pero siempre pueden ser trascendidos por un infinito mayor. La escritura funciona igual: cada versión es un umbral, no un destino. En el scriptorium medieval, los copistas preservaban y transmitían el conocimiento con rigor artesanal. Este sistema une ambas ideas: un proceso infinitamente perfectible, ejecutado con disciplina de oficio.*

[Leer la bitácora de esta sesión](https://escrivivir.co/aleph-scriptorium-vibe-bitacora-projects-fundacion-un-e-libro/)

---

## Status (para visitantes)

| | |
|---|---|
| **Fecha** | 2025-12-21 |
| **Sprint** | 0 (Bootstrap) |
| **Ciclo previsto** | 12 sprints × 4 iteraciones = 48 iteraciones (2026) |

**Estado detallado (DRY)**:
- Scriptorium (backlog + métricas): [`.github/BACKLOG-SCRIPTORIUM.md`](.github/BACKLOG-SCRIPTORIUM.md)
- Fundación (backlog + métricas): [`PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md`](PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md)
- Fotos de estado: [`ARCHIVO/FOTOS_ESTADO/`](ARCHIVO/FOTOS_ESTADO/)

**Sprint 0 en cierre** (Scriptorium 100%, Fundación 85%): infraestructura DevOps completada, 13 agentes operativos, 3 plugins instalados (ARG Board, Enciclopedia, GH-Pages), ARCHIVO doctrinal consolidado (24 docs), sistema de producción periodística activo (5W + 4 Banderas). Próximo: convertir plantillas de enero (caps 1-4) en texto redactado y abrir Sprint 1.

Si has llegado aquí por una razón concreta, entra por tu puerta:

Si no sabes cuál es tu puerta, usa el **vestíbulo** (clasifica tu perfil y te dirige a la carta adecuada):
- Prompt: [`.github/prompts/vestibulo-cartas.prompt.md`](.github/prompts/vestibulo-cartas.prompt.md)
- Cartas: [`ARCHIVO/CARTAS/`](ARCHIVO/CARTAS/)
- Perfiles guardados: [`ARCHIVO/PERFILES/`](ARCHIVO/PERFILES/)

| Si eres... | Empieza por |
|---|---|
| **Tutor/maestro** (dirección de TFG) | [`ARCHIVO/CARTAS/`](ARCHIVO/CARTAS/) → [`PROYECTOS/FUNDACION/Indice.md`](PROYECTOS/FUNDACION/Indice.md) |
| **Lector del método** (cómo se gobierna el proyecto) | [`.github/DEVOPS.md`](.github/DEVOPS.md) |
| **Lector del texto en producción** | [`PROYECTOS/FUNDACION/CAPITULOS/`](PROYECTOS/FUNDACION/CAPITULOS/) |
| **Lector de la base doctrinal** (herramientas, no diagnóstico) | [`ARCHIVO/marco/README.md`](ARCHIVO/marco/README.md) |

El proyecto tiene dos productos paralelos:

1. **Aleph Scriptorium** — el kit de herramientas (agentes, prompts, instrucciones, protocolo).
2. **Fundación** — el texto fundacional en 12 capítulos que demuestra el kit en acción.

---

### 1. Aleph Scriptorium (v0.0.1) — Avance Sprint 0: 100%

```
                    ┌─────────────┐
                    │   ALEPH     │ ← Producción
                    │ (redacción) │
                    └──────┬──────┘
                           │
    ┌──────────────────────┼──────────────────────┐
    ▼            ▼         ▼         ▼            ▼
┌────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐ ┌────────┐
│BLUEFLAG│ │BLACKFLAG │ │REVISOR │ │ REDFLAG  │ │YELLOW- │
│ Verdad │ │ Sombras  │ │Doctrina│ │Estructura│ │ FLAG   │
└────────┘ └──────────┘ └────────┘ └──────────┘ │Límites │
                                                └────────┘
                           │
                    ┌──────────┐
                    │ORANGE- │ ← Registro
                    │ FLAG   │
                    └──────────┘
```
El Scriptorium es el "cómo": método, agentes, prompts e instrucciones para que la IA trabaje bajo las reglas del proyecto.

| Artefacto | Estado | Ruta |
|-----------|--------|------|
| Protocolo DevOps (commits, sprints, backlogs) | ✅ | [`.github/DEVOPS.md`](.github/DEVOPS.md) |
| Backlog Scriptorium | ✅ | [`.github/BACKLOG-SCRIPTORIUM.md`](.github/BACKLOG-SCRIPTORIUM.md) |
| Agente **Aleph** (planifica, redacta, orquesta) | ✅ | [`.github/agents/aleph.agent.md`](.github/agents/aleph.agent.md) |
| Agente **Vestibulo** (clasifica perfil y asigna carta-puerta) | ✅ | [`.github/agents/vestibulo.agent.md`](.github/agents/vestibulo.agent.md) |
| Agente **CartasPuerta** (presenta la carta-puerta sin mezclar puertas) | ✅ | [`.github/agents/cartas-puerta.agent.md`](.github/agents/cartas-puerta.agent.md) |
| Agente **Revisor** (evalúa coherencia doctrinal) | ✅ | [`.github/agents/revisor.agent.md`](.github/agents/revisor.agent.md) |
| Agente **Blackflag** (audita sombras: enemigo, represión) | ✅ | [`.github/agents/blackflag.agent.md`](.github/agents/blackflag.agent.md) |
| Agente **Redflag** (audita estructura: escala, gobierno) | ✅ | [`.github/agents/redflag.agent.md`](.github/agents/redflag.agent.md) |
| Agente **Blueflag** (audita verdad: evidencia, utilidad) | ✅ | [`.github/agents/blueflag.agent.md`](.github/agents/blueflag.agent.md) |
| Agente **Yellowflag** (audita límites: condiciones vs contenido) | ✅ | [`.github/agents/yellowflag.agent.md`](.github/agents/yellowflag.agent.md) |
| Agente **Orangeflag** (audita registro: dialéctica/retórica, género, estilo) | ✅ | [`.github/agents/orangeflag.agent.md`](.github/agents/orangeflag.agent.md) |
| Agente **Periodico** (produce planas noticieras 5W + Banderas) | ✅ | [`.github/agents/periodico.agent.md`](.github/agents/periodico.agent.md) |
| Agente **PluginManager** (instala, activa, desinstala plugins) | ✅ | [`.github/agents/plugin-manager.agent.md`](.github/agents/plugin-manager.agent.md) |
| Prompt de extracción y archivo | ✅ | [`.github/prompts/extraer-archivar.prompt.md`](.github/prompts/extraer-archivar.prompt.md) |
| Prompt de convención de commits | ✅ | [`.github/prompts/commit-message.prompt.md`](.github/prompts/commit-message.prompt.md) |
| Prompt de ejecución de commits | ✅ | [`.github/prompts/ejecutar-commits.prompt.md`](.github/prompts/ejecutar-commits.prompt.md) |
| Prompt de foto de estado | ✅ | [`.github/prompts/foto-estado-y-discurso-motivacional.prompt.md`](.github/prompts/foto-estado-y-discurso-motivacional.prompt.md) |
| Prompt de vestíbulo (clasificar perfil y carta) | ✅ | [`.github/prompts/vestibulo-cartas.prompt.md`](.github/prompts/vestibulo-cartas.prompt.md) |
| Instrucciones de contexto (voz, marco, diagnóstico) | ✅ | `.github/instructions/` |

**Estado Sprint 0 (Scriptorium)**: cerrado. Épicas completadas:

| Épica | Descripción | Entregables clave |
|-------|-------------|-------------------|
| **SCRIPT-0.0.1** | Kit mínimo | DevOps, Aleph, prompts, instrucciones |
| **SCRIPT-0.1.0** | Sistema de Plugins | Protocolo, PluginManager, ARG Board instalado |
| **SCRIPT-0.2.0** | Agente Yellowflag | Auditor de límites, marco/14, carta-puerta |
| **SCRIPT-0.3.0** | Plugin Enciclopedia | Bibliotecario, tomo HDF (61 caps.) |

Métricas vivas: [`.github/BACKLOG-SCRIPTORIUM.md`](.github/BACKLOG-SCRIPTORIUM.md)

---

### 2. Fundación (v0.0.1) — Avance Sprint 0: 85%

Fundación es el "qué": un texto político serializado en 12 capítulos (uno por mes en 2026) que aspira a ser una obra tipo Constitución/Contrato/Manifiesto.

#### Base doctrinal (ARCHIVO/)

| Eje | Docs | Contenido | Ruta |
|-----|------|-----------|------|
| **Justificación** | 4 | Por qué este proyecto: lo tardío, asco→huida→odio, posverdad, fractura | [`ARCHIVO/justificacion/`](ARCHIVO/justificacion/) |
| **Diagnóstico** | 5 | Cómo estamos: SOTA izquierdo, estructura de sentimiento, patrón reaccionario, fe lúcida, carisma vs responsabilidad | [`ARCHIVO/diagnostico/`](ARCHIVO/diagnostico/) |
| **Marco** | 14 | Herramientas: selección sistémica, injusticias, acción colectiva, geopolítica, método materialista, soberanía, hybris, trabajo, teología política, Euroamérica, tecnofeudalismo, dilemas revolucionarios, bicefalia semántica, gnosis/política | [`ARCHIVO/marco/`](ARCHIVO/marco/) |

#### Plan 2026

| Mes | Capítulos | Estado |
|-----|-----------|--------|
| Enero | 1. Anacronismo productivo · 2. Autómata soberano · 3. Problema de la escala · 4. Repertorio y arquitecturas | Borradores (plantilla + estructura) |
| Feb–Oct | Por definir | — |
| Nov | Ensamblaje y revisión | — |
| Dic | Cierre y publicación | — |

**Rutas clave**:
- Índice 2026: [`PROYECTOS/FUNDACION/Indice.md`](PROYECTOS/FUNDACION/Indice.md)
- Borradores enero: [`PROYECTOS/FUNDACION/CAPITULOS/`](PROYECTOS/FUNDACION/CAPITULOS/)
- Indicadores de fracaso enero: [`PROYECTOS/FUNDACION/indicadores-fracaso-enero.md`](PROYECTOS/FUNDACION/indicadores-fracaso-enero.md)
- Backlog Fundación: [`PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md`](PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md)

**Pendiente (Fundación)**: cerrar validación de estructura anual (T010) y pasar los capítulos de enero de plantilla a texto. Estado vivo en [`PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md`](PROYECTOS/FUNDACION/BACKLOG-FUNDACION.md).

---

### 3. Noticias (Periódico)

El proyecto incluye un sistema de **producción periodística** que combina las 5W del periodismo clásico con la auditoría doctrinal de las Banderas.

| Elemento | Descripción | Ruta |
|----------|-------------|------|
| **Agente Periódico** | Coordina el proceso de edición y publicación | [`.github/agents/periodico.agent.md`](.github/agents/periodico.agent.md) |
| **DISCO** (memoria) | Carpeta de trabajo con borradores y conversaciones | [`ARCHIVO/DISCO/`](ARCHIVO/DISCO/) |
| **NOTICIAS** (publicación) | Planas noticieras finales | [`ARCHIVO/NOTICIAS/`](ARCHIVO/NOTICIAS/) |

**Flujo de trabajo**:
1. **Editar**: Usuario aporta archivos .md → Alice y Bob analizan con 5W + Banderas → conversación en DISCO
2. **Publicar**: Conversación completa → plana final en NOTICIAS

**Ejemplo de referencia**: [`ARCHIVO/DISCO/Diciembre_25_Geopolitica/`](ARCHIVO/DISCO/Diciembre_25_Geopolitica/)

**Últimas planas publicadas** (dic-2025):
- [S08-T030: Epistemología — demarcación y falsabilidad](ARCHIVO/NOTICIAS/S08-T030-2025-12-epistemologia-demarcacion-falsabilidad-frontera-plebeya.md)
- [S08-T029: Método — validación de perspectivas (Yellowflag)](ARCHIVO/NOTICIAS/S08-T029-2025-12-metodo-validacion-perspectivas-yellowflag.md)
- [S08-T028: OpenAI — gobernanza y misión como cobertura](ARCHIVO/NOTICIAS/S08-T028-2025-12-tecnologia-openai-gobernanza-mision-cobertura.md)
- [S08-T027: Geopolítica — Nobel/Venezuela, la paz como arma](ARCHIVO/NOTICIAS/S08-T027-2025-12-geopolitica-nobel-venezuela-paz-como-arma.md)

---

### 4. Sistema de Plugins

El Scriptorium es **extensible mediante plugins**. Los plugins añaden capacidades sin modificar el núcleo: nuevos agentes, prompts, instrucciones y fuentes de conocimiento.

```
.github/plugins/           ← Código de plugins (inmutable)
├── registry.json          ← Índice de plugins instalados
├── arg-board/             ← Plugin ARG Board
└── enciclopedia/          ← Plugin Enciclopedia

ARCHIVO/PLUGINS/           ← Datos de plugins (mutable)
├── ARG_BOARD/             ← Estado del teatro ARG
└── ENCICLOPEDIA/          ← Cache de índices
```

#### Plugins Instalados

| Plugin | Versión | Descripción | Agentes |
|--------|---------|-------------|---------|
| **ARG Board** | 1.0.0 | Motor de juegos ARG transmedia | `@Arrakis`, `@BOE`, `@Decoherence` |
| **Enciclopedia** | 1.0.0 | Biblioteca de tomos con búsquedas temporales y temáticas | `@Bibliotecario`, `@HDF-ErnestoCastro` |

#### Plugin: ARG Board

Motor conversacional para juegos de **Realidad Alternativa (ARG)** sobre tableros transmedia con repositorios Git, BOE y BDCs.

**Uso**:
```
@Arrakis /arrakis-genesis              # Iniciar teatro
@BOE /boe-consultar                    # Consultar boletín oficial
@Decoherence /deco-scan-lite           # Validar coherencia
```

**Documentación**: [`.github/plugins/arg-board/docs/`](.github/plugins/arg-board/docs/)

#### Plugin: Enciclopedia

Biblioteca de **tomos enciclopédicos** con motor de búsqueda temporal (por período histórico) y temática (por concepto transversal).

**Tomos cargados**:
- Historia de la Filosofía (Ernesto Castro, 2017) — 61 conferencias

**Uso**:
```
@Bibliotecario listar-tomos                    # Ver tomos disponibles
@HDF-ErnestoCastro ¿Quién habla de ética?      # Búsqueda temática
@HDF-ErnestoCastro filosofía del siglo XVII    # Búsqueda temporal
@HDF-ErnestoCastro Spinoza                     # Búsqueda directa
```

**Documentación**: [`.github/plugins/enciclopedia/docs/`](.github/plugins/enciclopedia/docs/)

#### Crear o Instalar Plugins

El sistema de plugins sigue un **protocolo documentado** que permite:
- Instalar plugins externos
- Crear plugins propios
- Activar/desactivar plugins sin eliminarlos

**Protocolo completo**: [`.github/PLUGINS.md`](.github/PLUGINS.md)

**Agente gestor**: `@PluginManager` (instalar, listar, activar, desactivar)

---

### 5. Publicación Web (GitHub Pages)

El proyecto se publica automáticamente en **GitHub Pages** mediante el plugin **GH-Pages**.

| Elemento | Valor |
|----------|-------|
| **URL canónica** | [escrivivir-co.github.io/aleph-scriptorium](https://escrivivir-co.github.io/aleph-scriptorium/) |
| **Branch** | `gh-pages` |
| **Plantilla** | Jekyll minimalista (blanco/negro + banderas) |
| **Plugin** | [`.github/plugins/gh-pages/`](.github/plugins/gh-pages/) |

#### Modos de publicación

| Modo | Comando | Efecto |
|------|---------|--------|
| **Fusionar** | `@GHPages fusionar NOTICIAS/` | Añade nuevas noticias sin eliminar las existentes |
| **Reemplazar** | `@GHPages reemplazar FUNDACION/cap01` | Sustituye todo el contenido de la sección |

#### Flujo típico (Periódico → Web)

```
Usuario: "Publica las últimas 3 noticias en la web"

@Periodico → (genera planas en NOTICIAS/)
@GHPages → (convierte a Jekyll, hace merge en gh-pages, pushea)

→ Noticias visibles en https://escrivivir-co.github.io/aleph-scriptorium/noticias/
```

#### Uso directo

```
@GHPages /gh-pages-init                    # Inicializar sitio (primera vez)
@GHPages /gh-pages-merge NOTICIAS/         # Fusionar noticias
@GHPages /gh-pages-replace cap01           # Reemplazar capítulo
```

**Documentación**: [`.github/plugins/gh-pages/docs/`](.github/plugins/gh-pages/docs/)

---

### 6. Plan inmediato

#### Sprint 0 (Bootstrap) — Estado al 21-dic-2025

| Opportunity | Estado | Siguiente |
|-------------|--------|-----------|
| **Scriptorium** | ✅ Cerrado (100%) | Mantenimiento; abrir épica 0.4.0 si surge necesidad |
| **Fundación** | 🔄 En cierre (85%) | Cerrar T010 (validar índice) y T011 (borrador cap01) |

**Hitos completados esta semana** (19→21 dic):
- 4 épicas cerradas en Scriptorium (0.0.1, 0.1.0, 0.2.0, 0.3.0)
- 4 planas noticieras publicadas en NOTICIAS/
- 3 docs nuevos en marco/ (12, 13, 14)
- Auditorías Blueflag, Blackflag y Redflag completadas para Cap01

#### Abrir Sprint 1 (Enero 2026)

- [ ] Convertir cap01–cap04 de "plantilla" a "prosa": apertura → tesis → núcleo de diseño → sacrificio → sombra → cierre.
- [ ] Aplicar los indicadores de fracaso como checklist de revisión, no como apéndice.
- [ ] Definir indicadores de fracaso para febrero.

---

### 6. Cómo leer esto en 5 minutos

| Interés | Empieza por |
|---------|-------------|
| Presentación para **tutoría/TFG** | [`ARCHIVO/CARTAS/`](ARCHIVO/CARTAS/) → índice 2026 |
| El **método** (cómo trabaja la IA) | [`DEVOPS.md`](.github/DEVOPS.md) → backlog Scriptorium → agente Aleph |
| La **doctrina** (de qué habla el texto) | [`ARCHIVO/marco/README.md`](ARCHIVO/marco/README.md) → marco 01–11 |
| El **texto en producción** | [`Indice.md`](PROYECTOS/FUNDACION/Indice.md) → capítulos 1–4 → indicadores de fracaso |
| Las **noticias** (periodismo doctrinal) | [`ARCHIVO/NOTICIAS/README.md`](ARCHIVO/NOTICIAS/README.md) → agente Periódico |
| Los **plugins** (extensiones) | [`.github/PLUGINS.md`](.github/PLUGINS.md) → registry.json → docs/ de cada plugin |
| El **linaje** (de dónde viene esto) | Sección "Origen: VibeBitacora" más abajo |

---

## Qué es esto

![](./aleph-scriptorium-banner.png)

**Aleph Scriptorium** es un sistema de escritura asistida por IA para proyectos de largo aliento: libros, ensayos serializados, investigaciones extensas, cualquier texto que requiera coherencia sostenida a lo largo del tiempo.

Este repositorio contiene:

1. **El framework** — arquitectura y herramientas configurables para estructurar conocimiento y producir textos complejos.
2. **Un proyecto de demostración** — "Fundación", un texto político en 12 capítulos que muestra el sistema en acción.

El objetivo: demostrar que es posible usar inteligencia artificial como **herramienta de amplificación intelectual**, no como sustituto del pensamiento ni como generador de ruido.

---

## Para quién es

Este proyecto está diseñado para **escritores escépticos de la IA**.

Si crees que ChatGPT solo sirve para correos corporativos y resúmenes genéricos, este sistema te propone otra cosa: un entorno donde la IA trabaja *bajo tus instrucciones*, con *tu material*, siguiendo *tu método*.

No se trata de pedirle a una máquina que escriba por ti.  
Se trata de construir un **sistema de producción intelectual** donde la IA hace lo que mejor sabe hacer —organizar, buscar, comparar, iterar— mientras tú haces lo que solo tú puedes hacer: pensar, decidir, escribir.

---

## Cómo funciona

### El entorno: un IDE, no un procesador de texto

Este sistema funciona dentro de **VS Code** (o cualquier IDE compatible con GitHub Copilot). Un IDE (*Integrated Development Environment*) es el entorno que usan los programadores para escribir código: texto plano, control de versiones, extensiones, automatización.

¿Por qué abandonar Word o Google Docs?

| Procesador de texto | IDE + IA |
|---------------------|----------|
| Un documento aislado | Un sistema de archivos interconectado |
| Formato como distracción | Texto plano, estructura como contenido |
| "Guardar como v2_final_FINAL.docx" | Control de versiones con Git |
| Sin memoria de contexto | Agentes de IA que conocen tu proyecto entero |
| Corrector ortográfico | Asistentes que entienden tu método y tu voz |

### La arquitectura: ARCHIVO + Agentes

El sistema separa claramente dos responsabilidades:

```
ARCHIVO/          ← QUÉ: tu base de conocimiento
.github/          ← CÓMO: instrucciones para los agentes
PROYECTOS/        ← DÓNDE: tus textos en progreso
```

#### El ARCHIVO (tu base de conocimiento)

Una colección estructurada de documentos que contienen las ideas, conceptos y material que alimentan tu escritura. Organizado en **ejes temáticos** que tú defines.

En el proyecto de demostración usamos tres ejes:

| Eje | Pregunta que responde |
|-----|----------------------|
| **Justificación** | ¿Por qué este proyecto? ¿Qué nos trajo aquí? |
| **Diagnóstico** | ¿Cómo estamos? ¿Hacia dónde queremos ir? |
| **Marco** | ¿Con qué herramientas conceptuales trabajamos? |

*Estos ejes son configurables. Un novelista podría usar "Personajes / Mundo / Trama". Un investigador, "Fuentes / Hipótesis / Método". El sistema se adapta a tu proyecto.*

#### Los Agentes (tus asistentes especializados)

Perfiles de IA preconfigurados para tareas específicas:

| Agente | Rol | Invocación |
|--------|-----|------------|
| **Aleph** | Productor principal. Redacta, planifica, orquesta. | `@aleph` |
| **Vestibulo** | Entrada guiada. Identifica perfil y asigna carta-puerta. | `@vestibulo` |
| **CartasPuerta** | Presenta la carta-puerta adecuada sin mezclar puertas. | `@cartaspuerta` |
| **Revisor** | Auditor doctrinal. Verifica coherencia con ARCHIVO. | `@revisor` |
| **Blackflag** | Auditor de sombras. Coste represivo, autodefensa. | `@blackflag` |
| **Redflag** | Auditor de estructura. Escala, enforcement, gobierno. | `@redflag` |
| **Blueflag** | Auditor de verdad. Evidencia, utilidad, falsificabilidad. | `@blueflag` |
| **Orangeflag** | Auditor de registro. Dialéctica/retórica, género, estilo. | `@orangeflag` |

**Arquitectura de tensión productiva:**

```
                    ┌─────────────┐
                    │   ALEPH     │ ← Producción
                    │ (redacción) │
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  ┌──────────┐      ┌──────────┐      ┌──────────┐
  │BLACKFLAG │      │ REVISOR  │      │ REDFLAG  │
  │ Sombras  │      │ Doctrina │      │Estructura│
  └──────────┘      └──────────┘      └──────────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           ▼
  ┌──────────┐      ┌──────────┐      ┌──────────┐
  │ BLUEFLAG │      │YELLOWFLAG│      │ORANGEFLAG│
  │ (verdad) │      │ (límites)│      │(registro)│
  └──────────┘      └──────────┘      └──────────┘
```

Los agentes no inventan: **consultan tu ARCHIVO**. No improvisan estilo: **siguen tus instrucciones**. No deciden por ti: **te presentan opciones**.

### La IA como herramienta, no como autor

Este sistema parte de una premisa: **la inteligencia artificial es extraordinariamente útil para tareas que los humanos hacemos mal** (organizar grandes volúmenes de información, mantener coherencia a lo largo de textos extensos, detectar contradicciones, iterar rápidamente).

Pero la IA no piensa. No decide. No tiene nada que decir.

El sistema está diseñado para que la IA haga trabajo *logístico* mientras el humano hace trabajo *intelectual*. La IA organiza tu material; tú decides qué material importa. La IA genera borradores; tú decides qué vale la pena. La IA detecta incoherencias; tú decides cómo resolverlas.

### Las herramientas MCP (extensiones de contexto)

El sistema puede conectarse a herramientas externas mediante el protocolo MCP:

- **Web Search**: Verificar referencias, consultar fuentes actualizadas
- **Playwright**: Navegar páginas web, consultar fuentes primarias
- **Y las que añadas**: El sistema es extensible

---

## Proyecto de demostración: "Fundación"

Este repositorio incluye un plan de proyecto como ejemplo: **Fundación**, un texto político serializado en 12 capítulos para el año 2026.

![](./fundacion-banner.png)

### El problema que aborda

Tres textos fundacionales han marcado el pensamiento político moderno:

- La **Constitución norteamericana** (1787): arquitectura institucional, checks and balances
- El **Contrato Social** de Rousseau (1762): legitimidad democrática, voluntad general
- El **Manifiesto Comunista** (1848): crítica materialista, análisis de clase

Pero estos textos no dialogan entre sí. El constitucionalismo liberal ignora la crítica de clase. El marxismo desprecia el diseño institucional. Rousseau ofrece legitimidad sin mecanismos.

### La propuesta

"Fundación" intenta una **síntesis operativa**: no glosar los clásicos, sino trenzar sus fortalezas en un cuerpo textual nuevo que sirva como herramienta de pensamiento para el presente.

No es un ejercicio académico. Es un intento de responder a una pregunta urgente: *¿cómo diseñar instituciones legítimas, materialmente justas y resistentes a la captura, en un mundo de posverdad técnica y fragmentación del sentido común?*

### Por qué "demo"

"Fundación" es ambicioso, pero es un ejemplo. Demuestra qué tipo de proyecto puede emerger de este sistema de escritura.

El valor no está solo en el texto final, sino en el **método reproducible**: cualquier escritor puede tomar esta arquitectura, vaciarla de contenido político, y llenarla con su propio proyecto.

---

## Estructura del repositorio

```
Fundacion/
├── README.md                 ← Estás aquí
├── ARCHIVO/                  ← Base de conocimiento (el QUÉ)
│   ├── justificacion/        ← Por qué este proyecto
│   ├── diagnostico/          ← Estado de la cuestión
│   └── marco/                ← Herramientas conceptuales
├── PROYECTOS/                ← Textos en producción
│   └── FUNDACION/            ← El proyecto demo
│       └── plan-anual-2026.md
└── .github/                  ← Configuración de agentes (el CÓMO)
    ├── agents/               ← Perfiles de IA especializados
    ├── instructions/         ← Guías de uso por eje
    └── prompts/              ← Prompts reutilizables
```

---

## Cómo empezar

### Requisitos

- [VS Code](https://code.visualstudio.com/) (u otro IDE compatible)
- [GitHub Copilot](https://github.com/features/copilot) (suscripción activa)
- Git (para control de versiones)

### Para explorar el proyecto demo

1. Clona este repositorio
2. Abre en VS Code
3. Navega `ARCHIVO/` para ver la base de conocimiento
4. Revisa `PROYECTOS/FUNDACION/plan-anual-2026.md` para el plan de producción
5. Consulta `.github/agents/` para entender cómo trabajan los asistentes

### Para crear tu propio proyecto

1. Forkea este repositorio
2. Vacía `ARCHIVO/` y define tus propios ejes temáticos
3. Adapta las instrucciones en `.github/` a tu voz y método
4. Crea tu carpeta en `PROYECTOS/`
5. Usa los agentes para poblar tu ARCHIVO y producir textos

---

## Filosofía del proyecto

### Contra el "malmenorismo"

El proyecto "Fundación" nace de una frustración específica: la sensación de que el pensamiento político contemporáneo está atrapado en el *malmenorismo* — la defensa de un sistema que sabemos injusto porque tememos que cualquier alternativa sea peor.

Este proyecto no propone utopías. Propone **mecanismos**: arquitecturas institucionales concretas, con defensas contra la captura, con anticipación de cómo podrían corromperse.

No es optimismo ingenuo. Es **fe lúcida**: la convicción de que es posible diseñar mejor sin ignorar por qué diseñar es difícil.

---

## Origen: Forjado en los Astilleros de VibeBitacora

**Aleph Scriptorium no nació de la nada.** Es la última *nave* botada por los [Astilleros de VibeBitacora](https://github.com/escrivivir-co/vibe-bitacora), el meta-framework más ambicioso de Escrivivir.co.

![](./vibe-bitacora-banner.png)

### Un linaje de cuatro generaciones

Para llegar a este sistema de escritura, tuvimos que reinventar cómo los humanos colaboran con la IA. VibeBitacora es la historia de esa obsesión:

1.  **V001 (El Experimento)**: Probamos que la IA podía mantener el contexto de una investigación compleja.
2.  **V002 (Proyecto Zeus)**: Dividimos la inteligencia en roles especializados (Backend, Frontend, Arquitecto) y creamos la "restauración de estado".
3.  **V003 (Astilleros Retro)**: El salto cuántico. La IA aprendió a construirse a sí misma. Nacieron **Githubeador** y **Astilleador**, los agentes que fabrican agentes.
4.  **V4 (mcp-vibe-framework)**: El presente. "RETRO meets CCT". Un Teatro Digital donde capitanes y tripulaciones de IA ejecutan misiones complejas.

### Tu Nave, Tu Misión

En la mitología de VibeBitacora, el conocimiento es un océano y cada proyecto es una **Isla**.

Para llegar a esas islas, necesitas una **Nave**.
**Aleph Scriptorium es esa nave**, diseñada específicamente para una misión: **la escritura de largo aliento**.

No es un simple prompt. Es tecnología de cuarta generación:
- Hereda la **meta-arquitectura** de los Astilleros.
- Usa los protocolos de **navegación** de VibeBitacora.
- Está equipada para sobrevivir a las tormentas del bloqueo creativo y la incoherencia.

### ¿Quieres construir tu propia flota?

Aleph Scriptorium es solo un ejemplo de lo que sale de nuestros Astilleros.
Si tu misión no es escribir, sino programar, investigar o diseñar, **ve a la fuente**.

Los agentes constructores (**Githubeador** y **Astilleador**) te esperan en [VibeBitacora](https://github.com/escrivivir-co/vibe-bitacora) para ayudarte a diseñar tu propia nave.

> *"Zarpamos hacia lo desconocido, no con mapas, sino con sistemas capaces de dibujarlos."*

Porque **Aleph Scriptorium no es un producto cerrado**. Es un punto de partida.

Si el sistema no encaja con tu flujo de trabajo, puedes volver a los Astilleros y construir tu propia nave. El código está ahí. Los agentes constructores también. La arquitectura es pública.

> *"Dado un navío, y dados unos astilleros donde armar la embarcación, se pueden dar una serie de islas a las que viajar —visitar y retornar— con lo aprendido y atesorado."*
> — Lore de VibeBitacora

---

## Licencia

Este proyecto usa la **Animus Iocandi Public License (AIPL) v1.0**, heredada de [VibeBitacora](https://github.com/escrivivir-co/vibe-bitacora).

- **El framework** (estructura, agentes, instrucciones): libre para usar, modificar y distribuir.
- **El contenido demo "Fundación"**: Escrivivir.co 2025, todo izquierdos SIN derechos reservados.

Ver [LICENSE.md](LICENSE.md) para los términos completos (y alguna sonrisa).
