# Índice Funcional — Aleph Scriptorium

> **Agente responsable**: @aleph  
> **Propósito**: Mapa de navegación para usuarios del sistema  
> **Última actualización**: 2025-01-02  
> **Estado**: 🌱 Esqueleto inicial (rellenar DRY)

---

## 1. ¿Qué es Aleph Scriptorium?

**Framework de escritura asistida por IA** para proyectos de largo aliento.

| Concepto | Descripción |
|----------|-------------|
| **Scriptorium** | El taller de escritura (agentes, prompts, instrucciones) |
| **Fundación** | El texto en producción (12 capítulos, 2026) |
| **Teatro** | Sistema de experiencias transmedia interactivas |
| **ARCHIVO** | Memoria doctrinal y datos de runtime |

---

## 2. Puntos de Entrada para Usuarios

### 2.1. Vestíbulo (Orientación)

| Perfil de usuario | Carta-puerta | Ubicación |
|-------------------|--------------|-----------|
| Maestro Vista Total | Completitud, corrección | `ARCHIVO/CARTAS/carta-maestro-vista-total.md` |
| Maestro Blueflag | Evidencia, falsificabilidad | `ARCHIVO/CARTAS/carta-maestro-blueflag.md` |
| Maestro Blackflag | Poder, adversario, captura | `ARCHIVO/CARTAS/carta-maestro-blackflag.md` |
| Maestro Redflag | Escala, enforcement, viabilidad | `ARCHIVO/CARTAS/carta-maestro-redflag.md` |
| Maestro Yellowflag | Integración, límites, condiciones | `ARCHIVO/CARTAS/carta-maestro-yellowflag.md` |

> **Agentes**: `@vestibulo` → `@cartaspuerta`

### 2.2. Web Pública

| Página | URL relativa | Propósito |
|--------|--------------|-----------|
| Inicio | `/` | Landing con galería de features |
| Ecosistema | `/ecosistema/` | Agentes, plugins, submódulos |
| Teatro | `/teatro/` | Cartelera de obras transmedia |
| Periódico | `/periodico/` | Noticias con método doctrinal |
| Archivo | `/archivo/` | Navegación del ARCHIVO |
| Roadmap | `/roadmap/` | Estado del proyecto + fotos |
| Fundación | `/fundacion/` | El texto de 2026 |

> **Fuente**: `docs/` (Jekyll + GitHub Pages)

---

## 3. Capacidades Principales

### 3.1. Producción de Texto (@aleph)

| Capacidad | Descripción | Handoff |
|-----------|-------------|---------|
| Redactar capítulos | Texto fundacional con método | — |
| Invocar auditores | Stress-test de propuestas | 5 Banderas |
| Verificar doctrina | Coherencia con ARCHIVO | @revisor |
| Gestionar backlog | Scrum adaptado | @plugin_ox_scrum |

### 3.2. Producción Periodística (@periodico)

| Capacidad | Descripción | Ubicación |
|-----------|-------------|-----------|
| Editar noticia | Conversación editorial en DISCO | `ARCHIVO/DISCO/` |
| Publicar noticia | Plana final con 5W + Banderas | `ARCHIVO/NOTICIAS/` |
| Generar imagen | Prompt de cabecera | `imagen-cabecera.prompt.md` |

### 3.3. Teatro Interactivo (@plugin_ox_teatro)

| Capacidad | Descripción |
|-----------|-------------|
| Generar obra | YAML con 12 estadios (monomito) |
| Instalar obra | Registrar en cartelera |
| Ejecutar obra | Poner en escena (impress.js) |
| Crear personaje | Vía AGENT_CREATOR → ARG_BOARD |

### 3.4. Consulta Documental

| Plugin | Qué consulta | Agente |
|--------|--------------|--------|
| Enciclopedia | Tomos filosóficos | @plugin_ox_enciclopedia |
| Foro Scraper | Foros y blogs externos | @plugin_ox_foroscraper |
| MCP-Presets | Herramientas MCP | @plugin_ox_mcppresets |

### 3.5. Publicación (@plugin_ox_ghpages)

| Modo | Descripción |
|------|-------------|
| Fusionar | Añade contenido sin borrar |
| Reemplazar | Sobrescribe sección |

---

## 4. Sistema de Agentes (Capas)

### 4.1. Capa UI (Producción)

| Agente | Símbolo | Función |
|--------|---------|---------|
| @aleph | 🟢 | Productor principal |
| @revisor | 🟢 | Auditor doctrinal |
| @periodico | 🟢 | Producción periodística |

### 4.2. Capa Backend (Auditoría)

| Agente | Símbolo | Tests |
|--------|---------|-------|
| @blueflag | 🔵 | Evidencia, utilidad, falsificabilidad |
| @blackflag | ⚫ | Poder, sombras, captura |
| @redflag | 🔴 | Escala, enforcement, suministro |
| @yellowflag | 🟡 | Límites, condiciones, inconmensurabilidad |
| @orangeflag | 🟠 | Registro, estilo, auditorio |

### 4.3. Capa Sistema (Navegación)

| Agente | Símbolo | Función |
|--------|---------|---------|
| @vestibulo | ⚪ | Identifica perfil, asigna carta-puerta |
| @cartaspuerta | ⚪ | Presenta carta-puerta |

### 4.4. Capa Meta (Gestión)

| Agente | Símbolo | Función |
|--------|---------|---------|
| @pluginmanager | ⚙️ | Gestión de plugins |
| @ox | 🐂 | Oráculo, índice, documentación |
| @indice | 🗂️ | Navegador DRY, validación pre-commit |

### 4.5. Capa Plugins (Bridges)

> **19 bridges** en `.github/agents/plugin_ox_*.agent.md`

| Bridge | Plugin | Agentes internos |
|--------|--------|------------------|
| @plugin_ox_argboard | ARG Board | 8 agentes |
| @plugin_ox_enciclopedia | Enciclopedia | 2 agentes |
| @plugin_ox_ghpages | GH-Pages | 1 agente |
| @plugin_ox_foroscraper | Foro Scraper | 1 agente |
| @plugin_ox_agentcreator | Agent Creator | 1 agente |
| @plugin_ox_teatro | Teatro | 1 agente |
| @plugin_ox_scrum | Scrum | 1 agente |
| @plugin_ox_mcppresets | MCP-Presets | 1 agente |
| @plugin_ox_network | Network | 1 agente |
| @plugin_ox_novelist | Novelist | 1 agente |
| @plugin_ox_blocklyeditor | Blockly Editor | 1 agente |
| @plugin_ox_wireeditor | Wire Editor | 1 agente |
| @plugin_ox_prologeditor | Prolog Editor | 1 agente |
| @plugin_ox_typedprompting | TypedPrompting | 1 agente |
| @plugin_ox_n8neditor | N8N Editor | 1 agente |
| @plugin_ox_wiringapp | WiringApp | 1 agente |
| @plugin_ox_argboardapp | ArgBoardApp | 1 agente |
| @plugin_ox_hypergrapheditor | HyperGraphEditor | 1 agente |
| @plugin_ox_floveeditor | Flove Editor | 1 agente |

---

## 5. Flujos de Trabajo Principales

### 5.1. Redactar Capítulo

```
Usuario → @aleph (redactar)
           ↓
       [borrador]
           ↓
       @blueflag (evidencia) → @blackflag (sombras) → @redflag (estructura)
           ↓
       @revisor (coherencia)
           ↓
       [capítulo listo]
```

### 5.2. Producir Noticia

```
Usuario → @periodico [EDITAR]
           ↓
       DISCO/{carpeta}/conversacion.md
           ↓
       Alice (frame) ↔ Bob (hechos)
           ↓
       5 Banderas (auditoría)
           ↓
       @periodico [PUBLICAR]
           ↓
       NOTICIAS/{plana}.md
```

### 5.3. Crear Agente Especializado

```
Usuario → @plugin_ox_agentcreator
           ↓
       [receta + fuente DISCO]
           ↓
       [agente.agent.md generado]
           ↓
       @plugin_ox_argboard (desplegar como personaje)
```

### 5.4. Publicar Obra en Teatro

```
Usuario → @plugin_ox_teatro [generar]
           ↓
       obra.yaml (12 estadios)
           ↓
       @plugin_ox_teatro [instalar]
           ↓
       cartelera actualizada
           ↓
       @plugin_ox_ghpages [publicar]
           ↓
       docs/teatro/{obra}/
```

---

## 6. Memoria del Sistema (ARCHIVO)

### 6.1. Estructura Principal

| Carpeta | Contenido | Mutabilidad |
|---------|-----------|-------------|
| `CARTAS/` | Cartas-puerta (presentación) | Estable |
| `DEVOPS/` | Documentación técnica/funcional | Estable |
| `DISCO/` | Memoria de trabajo (borradores) | Activa |
| `ENCICLOPEDIA/` | Tomos consultables | Estable |
| `FOTOS_ESTADO/` | Capturas de sprint | Creciente |
| `NOTICIAS/` | Planas publicadas | Creciente |
| `PERFILES/` | Fichas de usuarios | Creciente |
| `PLUGINS/` | Datos de runtime de plugins | Activa |
| `SITE/` | Assets adicionales web | Estable |
| `diagnostico/` | Estado de la cuestión | Memoria |
| `justificacion/` | Por qué hace falta | Memoria |
| `marco/` | Herramientas conceptuales | Activo |

### 6.2. DISCO (Memoria de Trabajo)

| Carpeta | Uso |
|---------|-----|
| `BACKLOG_BORRADORES/` | Borradores de épicas Scrum |
| `Backlogs_Sprint0_Archivado/` | Histórico cerrado |
| `Diciembre_25_*/` | Sesiones editoriales diciembre |
| `Foro_*/` | Material scrapeado |
| `TALLER/` | Proyectos de usuario (obras) |
| `WIRING/` | Flujos Node-RED |

---

## 7. Invocaciones Comunes

### 7.1. Empezar a Escribir

```
@aleph Redacta el capítulo 3 sobre vivienda.
```

### 7.2. Auditar Propuesta

```
@blueflag Audita las afirmaciones de este texto: [texto]
```

### 7.3. Crear Noticia

```
@periodico EDITAR
Tema: Geopolítica diciembre 2025
Fuentes: [archivos adjuntos]
```

### 7.4. Orientarse en el Proyecto

```
@vestibulo ¿Por dónde empiezo?
```

### 7.5. Consultar Qué Agente Usar

```
@ox ¿Qué agente uso para auditar evidencia?
```

### 7.6. Crear Agente Especializado

```
@plugin_ox_agentcreator Crea un agente basado en yellowflag con fuente DISCO/Foro_t8941392/
```

---

## 8. Recursos de Ayuda

| Recurso | Ubicación | Propósito |
|---------|-----------|-----------|
| README principal | `/README.md` | Visión general |
| Manual de usuario | `docs/leeme.md` | Guía de uso |
| Roadmap | `docs/roadmap.md` | Estado y próximos pasos |
| Acerca de | `docs/acerca.md` | Historia y filosofía |
| Contribuir | `/CONTRIBUTING.md` | Cómo aportar |

---

## 9. Métricas del Sistema

### 9.1. Contadores Actuales

| Recurso | Cantidad |
|---------|----------|
| Agentes core | 13 |
| Agentes bridge | 19 |
| Plugins instalados | 19 |
| Submódulos | 15 |
| Prompts (.github) | 18+ |
| Instructions (.github) | 10+ |

### 9.2. Backlogs Activos

| Backlog | Sprint | Estado |
|---------|--------|--------|
| SCRIPTORIUM | 2 (FC1) | 🔄 Activo |
| FUNDACION | — | ⏸️ Pausa |

---

## 10. Próximos Pasos (Onboarding)

1. **Explorar el Vestíbulo**: `@vestibulo`
2. **Leer una carta-puerta** según tu perfil
3. **Consultar el Roadmap**: `docs/roadmap.md`
4. **Probar un flujo simple**: Crear noticia o consultar enciclopedia
5. **Revisar el Teatro**: Abrir obra demo "Camino del Tarotista"

---

> **Regla DRY**: Este índice apunta a ubicaciones. No duplica contenido. Si necesitas detalle, navega al archivo referenciado.
