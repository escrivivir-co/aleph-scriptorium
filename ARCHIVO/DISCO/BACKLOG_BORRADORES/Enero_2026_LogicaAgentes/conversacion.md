# Conversación de Redacción: Lógica en Agentes

**Tema**: Dos líneas paralelas para un mismo concepto - PrologEditor: Inteligencias Situadas y Agentic Typed Logic Flow

**Fuentes detectadas**: 
- Borrador IOT-SBR-LOGICA: Plugin PrologEditor para inteligencias situadas
- Borrador SCRIPT-2.2.0: Agentic Typed Logic Flow (destilación con lógica tipada)

**Fecha**: 1 de enero de 2026

---

**Aleph (Orquestador)**: Iniciando sesión de redacción. Tema: Lógica en Agentes - Dos líneas paralelas. Fuentes detectadas: 2 borradores. Conectando con Alice (Editora) y Bob (Escritor).

**Alice (Editora)**: Bob, tenemos material fresco sobre lógica en agentes. Antes de meternos en teoría, necesito que limpies el ruido. Dame los hechos puros. Las 5W. ¿Qué tenemos confirmado?

**Bob (Escritor)**: He procesado las fuentes. Aquí tienes el esqueleto periodístico:

#### 1. WHO (¿Quién?)
- **PrologEditor**: Plugin para el Scriptorium, enfocado en inteligencias situadas usando Prolog.
- **Agentic Typed Logic Flow**: Épica SCRIPT-2.2.0, involucra agentes como @aleph, @ox para destilación de modelos LLM con lógica tipada.
- Actores: Equipo de desarrollo del Scriptorium, agentes core y plugins.

#### 2. WHAT (¿Qué?)
- Desarrollo de plugin PrologEditor para integrar lógica Prolog en sistemas de agentes.
- Prueba de destilación de modelos LLM usando flujos lógicos tipados orquestados por agentes.

#### 3. WHERE (¿Dónde?)
- Ubicación: Repositorio Aleph Scriptorium, submódulos y plugins.
- Contexto: Ecosistema de agentes IA para escritura extensiva.

#### 4. WHEN (¿Cuándo?)
- PrologEditor: Borrador creado 2025-01-04, parte de FC1-FC3.
- Typed Logic Flow: Diciembre 2025, épica TEST-0x-DESTILACION.

#### 5. WHY (¿Por qué?)
- PrologEditor: Para modelar inteligencias situadas, permitiendo razonamiento lógico en bots.
- Typed Logic Flow: Para facilitar destilación de conocimiento en modelos LLM, mejorando eficiencia.

**Aleph (Orquestador)**: Hechos fijados. Procedo a invocar las Banderas para análisis doctrinal.

*(Pendiente: Invocar Banderas cuando Alice lo pida)*

---

## Intervención de Lucas (Scrum Master)

**Lucas**: *(entrando con libreta en mano)*

He escuchado la conversación en la centralita. El PO viene con zumo y kombuchas, y dos épicas que son **dos caras de la misma moneda**. Me adelanto a preparar la carpeta.

### 📁 Materiales Creados

| Archivo | Feature | Propósito |
|---------|---------|-----------|
| [feature1_prolog_inteligencias_situadas.md](feature1_prolog_inteligencias_situadas.md) | IOT-SBR-LOGICA | PrologEditor como servidor MCP |
| [feature2_agentic_typed_logic_flow.md](feature2_agentic_typed_logic_flow.md) | SCRIPT-2.2.0 | Packs tipados para Teatro/ARG |

### 🎯 Objetivo Showcase

**Un solo ciclo demostrable**:

```
EDICIÓN (Prolog) → SERVIDOR (MCP) → PACK (Tipado) → ESCENA (Teatro)
```

**Narrativa**: *"Desde que el usuario escribe una regla Prolog hasta que un agente del Teatro la invoca en tiempo real"*

### 📅 Próximo Turno

- **PO + Periódico**: Discutir guión del showcase
- **Entregable**: Blueprint para Demo junto con `Diciembre_31_Test_0x_Destilacion`

### 🔗 Material de Referencia

- [03_together_all.md](../../BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/03_together_all.md) — Blueprint agéntico completo
- [02_putting_all_together.md](../../BACKLOG_BORRADORES/Diciembre_31_Test_0x_Destilacion/02_putting_all_together.md) — Chuletario PO

**Lucas**: La carpeta está lista. Cuando llegue el PO con las kombuchas, tenemos la estructura para que Periódico confeccione la pieza.

---

## Turno 2: PO + Periódico (Guión Showcase)

**Aleph (Orquestador)**: PO ha llegado. Periódico, tienes la palabra.

**Alice (Editora)**: Bob, el PO quiere rizar el rizo. Tenemos dos features técnicas que hay que hacer digeribles para **dos públicos**:
1. Gente que NO quiere diseñar rutinas Prolog
2. Gente que NO quiere diseñar títeres de teatro

Pero a ambos les interesa **el ciclo completo**. ¿Qué ángulo usamos?

**Bob (Escritor)**: El ángulo es el **Pack**. Es el puente:
- Para el escritor de teatro: "Tu títere puede invocar lógica sin que tú la escribas"
- Para el programador Prolog: "Tu lógica la usará un títere sin que tú lo dirijas"

El Pack es el **contrato silencioso** entre mundos.

**Alice (Editora)**: Me gusta. ¿Dónde insertamos en el blueprint?

**Lucas (SM)**: Propuesta: **Paso 5.5** entre "Demo Plugins" (x=12000) y "Demo Blueprints" (x=15000). Subdiapos en eje Y (y=1600) con flujo horizontal. 6 slides:

| # | Slide | Rol | X | Y |
|---|-------|-----|---|---|
| 1 | Intro Logic Flow | PO | 12000 | 1600 |
| 2 | Editar Prolog | Ox | 13200 | 1600 |
| 3 | Servidor MCP | Aleph | 14400 | 1600 |
| 4 | Pack Tipado | SM | 15600 | 1600 |
| 5 | Títere en Escena | PO | 16800 | 1600 |
| 6 | Resumen Ciclo | Ox | 18000 | 1600 |

**PO**: Perfecto. ¿Se ha insertado?

**Periódico**: ✅ **Insertado en `docs/blueprint-po.md`**. Detalles:

### Cambios Realizados

1. **Paso 5 SM** → Añadido indicador `↓ Ver Logic Flow Demo`
2. **6 nuevos slides** en subcubo (Y=1600)
3. **CSS añadido** en `blueprint.css`:
   - `.flow-chain` → Cadena visual Edición→Servidor→Pack→Escena
   - `.code-example` → Código Prolog con sintaxis
   - `.server-info` → Card del servidor MCP
   - `.pack-preview` → Vista del pack JSON
   - `.scene-preview` → Diálogo del títere en escena
   - `.cycle-diagram` → Diagrama de capas L0→L3

### Navegación

```
Paso 5 (Plugins)
    │
    ↓ (flecha Y=1600)
    │
┌───┴───────────────────────────────────────────────┐
│ Intro → Editar → Servidor → Pack → Escena → Resumen │
│ (12000) (13200)  (14400)  (15600) (16800)  (18000)  │
└───────────────────────────────────────────────────┘
    │
    ↑ (volver a Plugins)
```

### Preview de Slides

**Slide 1 (Intro)**:
```
📝 Edición → 🔌 Servidor → 📦 Pack → 🎭 Escena
"Desde escribir una regla Prolog hasta que un títere la invoca en vivo"
```

**Slide 5 (Escena)**:
```
🎭 Obra: Duna | Consejo de Agua
@arrakis: Invoca query_prolog("recurso_critico(X)")
MCP: X = agua
@arrakis: "El agua es recurso crítico. Protejamos los pozos."
```

---

## Próximo Paso

- [ ] Validar sitio localmente: `./scripts/validate-site.sh`
- [ ] Preview: `./scripts/serve-site.sh` → http://localhost:4000/blueprint-po/
- [ ] Commit cuando esté validado

**PO**: Excelente trabajo, equipo. Las kombuchas están servidas. 🍹

---

## Turno 3: Blueprint Completo — Periódico se suelta la melena

**Aleph (Orquestador)**: PO solicita blueprint dedicado. Periódico tiene el 100% del espacio.

**Periódico**: 🎨 **Acepto el reto. Me suelto la melena creativa.**

### Blueprint Creado: `docs/blueprint-logic-flow.md`

**Patrón de navegación**: ESPIRAL DESCENDENTE + LATERALES
- **Centro (Y descendente)**: Historia principal (L0→L1→L2→L3)
- **Derecha (+X)**: Vista técnica (código, archivos)
- **Izquierda (-X)**: Perspectiva de usuarios (escritores/programadores)

### Estructura de 18 Slides

| # | ID | Contenido | Coordenadas | Para quién |
|---|------|-----------|-------------|------------|
| 1 | `portada` | Hero + épicas fusionadas | (0, 0, 500) | Todos |
| 2 | `layer0-historia` | L0: Infraestructura existente | (0, 1500) | Historia |
| 3 | `layer0-tecnico` | Código: PrologServer, FIA | (1800, 1500) | Técnico |
| 4 | `layer0-demo` | Demo IoT: Aferencia→Brain→Eferencia | (-1800, 1500) | Demo |
| 5 | `layer1-historia` | L1: Código → Servidor MCP | (0, 3000) | Historia |
| 6 | `layer1-tecnico` | prolog.config.ts, CONFIGS_BASE | (1800, 3000) | Técnico |
| 7 | `layer1-agentes` | Red agéntica: handoffs | (-1800, 3000) | Agentes |
| 8 | `layer2-historia` | L2: El Pack es el contrato | (0, 4500) | Historia |
| 9 | `layer2-tecnico` | AgentPrologBrain.pack.json | (1800, 4500) | Técnico |
| 10 | `layer2-escritor` | "No necesitas saber Prolog" | (-1800, 4500) | Escritores |
| 11 | `layer3-historia` | L3: Títeres cobran vida | (0, 6000) | Historia |
| 12 | `layer3-tecnico` | obra.yaml con mcpPacks | (1800, 6000) | Técnico |
| 13 | `layer3-programador` | "No necesitas diseñar títeres" | (-1800, 6000) | Programadores |
| 14 | `diagrama-e2e` | Secuencia User→Teatro→Launcher→Prolog | (0, 7500) | Todos |
| 15 | `backlog` | 6 épicas, 34 pts total | (0, 9000) | Scrum |
| 16 | `agentes-tabla` | Red agéntica + handoffs (tabla Ox) | (1800, 9000) | Técnico |
| 17 | `archivos-dry` | Índice DRY con enlaces a repo | (-1800, 9000) | Devs |
| 18 | `riesgos` | Riesgos + Veredicto Aleph | (0, 10500) | PO |
| 19 | `referencias` | Links a backlogs, blueprints, sesiones | (1800, 10500) | Todos |
| 20 | `cta` | Call to Action por perfil | (0, 12000) | Todos |

### Ideas Fuerza Destacadas

- 💡 *"MCP Presets son ciudadanos de primera categoría"*
- 💡 *"Los packs son el contrato entre lo que el agente puede y lo que pide"*
- 💡 *"Lo veo. No es cuento de la lechera."* — @aleph
- 💡 Analogía escritor: "Como elegir un power-up sin programar el power-up"
- 💡 Analogía programador: "Como crear una API: tú haces backend, otros hacen frontend"

### Contenido Integrado

Desde el commit `69234f5` y conversaciones:
- ✅ Tabla de agentes y handoffs de @ox (`03_together_all.md`)
- ✅ Mapa de arquitectura L0→L1→L2→L3 de @aleph (`02_putting_all_together.md`)
- ✅ Chuletario PO (8 puntos)
- ✅ Backlog con 6 épicas y 34 pts
- ✅ Riesgos y mitigaciones
- ✅ Enlaces DRY al repo `flavour/monada`

### URL Final

```
https://escrivivir-co.github.io/aleph-scriptorium/blueprint-logic-flow/
```

### Próximo Paso

```bash
# Validar localmente
./scripts/validate-site.sh

# Preview
./scripts/serve-site.sh
# → http://localhost:4000/blueprint-logic-flow/

# Publicar
git add docs/blueprint-logic-flow.md docs/assets/css/blueprint.css
git commit -m "feat(gh-pages): crear blueprint Logic Flow con patrón espiral+laterales"
```

---

*Blueprint entregado — Periódico, 1 de enero de 2026*  
*"La melena está suelta. El blueprint está vivo."* 🎨