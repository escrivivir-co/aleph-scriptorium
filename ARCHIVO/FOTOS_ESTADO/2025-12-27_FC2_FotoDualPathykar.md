# Foto de Estado FC2: Visión Dual del Arquitecto

> **Fecha**: 2025-12-27  
> **Sprint**: FC2 (Feature Cycle 2)  
> **Fotógrafo**: Pathykar (Arquitecto Central & Product Owner)  
> **Formato**: Escena dual — la misma realidad con dos gafas

---

## 🏗️ Escena 1: Con las Gafas de lo Positivo

*Pathykar entra al Teatro del Scriptorium. Se pone unas gafas con cristales dorados. Todo lo que mira brilla con el resplandor de lo construido.*

### La Catedral que Hemos Levantado

Desde la perspectiva de arquitecto que observa virtudes, esto es lo que veo:

#### 1. Arquitectura de Agentes: 63 Nodos Activos

El grafo de agentes ha cristalizado en una estructura elegante:
- **32 agentes core** en `.github/agents/` — detectables por VS Code
- **31 agentes de plugins** — extendiendo capacidades sin modificar núcleo
- **Patrón Bridge probado**: Los `plugin_ox_{id}` conectan mundos sin acoplarlos

La taxonomía de 5 capas (UI → Backend → Sistema → Meta → Plugins) sostiene el peso sin crujir.

#### 2. Ecosistema de 19 Plugins: Modularidad Real

El registro de plugins documenta una hazaña de modularidad:
- **8 plugins operativos** listos para producción
- **11 plugins en borrador** con planificación completa
- **Separación código/datos** limpia: `.github/plugins/` vs `ARCHIVO/PLUGINS/`
- **Dependencias explícitas** sin ciclos circulares

Cada plugin es una habitación que puede cerrarse sin que se caiga el edificio.

#### 3. 14 Submódulos: Código Reutilizable

La estrategia de submódulos ha madurado:
- **Repositorios especializados** con vida propia
- **Integración selectiva** sin contaminar el monorepo
- **Actualización controlada** mediante scripts

De mcp-novelist a wiki-racer, cada submódulo aporta sin exigir.

#### 4. Blueprint MMCO: Ontología Visual Completada

La épica SCRIPT-1.27.0 cierra con victoria:
- **7 slides navegables** (0c→4) reflejando jerarquía de emergencia
- **Toggle UX↔MMCO** para dos audiencias distintas
- **Carta abierta documentada** en OnthologyEditor/scriptorium/

El sistema ahora se describe a sí mismo con precisión formal.

#### 5. Galería de Borradores: 25+ Conversaciones PO-SM

La carpeta `BACKLOG_BORRADORES/` contiene tesoros:
- Cada borrador es una **conversación estructurada** entre Product Owner y Scrum Master
- **Método reproducible** para planificar épicas
- **Trazabilidad completa** desde idea hasta implementación

El conocimiento no se pierde: se archiva y se consulta.

#### 6. Protocolo DevOps: Disciplina sin Burocracia

El flujo de trabajo está consolidado:
- **Commits conformes** a convención semántica
- **Rama fc1** activa, `main` protegida para releases
- **Backlogs sincronizados** (Scriptorium + Fundación)

La máquina de desarrollo funciona sin rozamiento.

#### 7. Personajes Evolutivos: Teatro con Memoria

El plugin `agent-creator` ha producido criaturas:
- **5 personajes creados** documentados en Tecnico.md
- **Pathykar, Lucas, El Tarotista** con arquetipos y recetas
- **Despliegue en obras** validado (hola_mundo, camino_del_tarotista)

Los personajes crecen con el proyecto.

### Métricas de Virtud

| Indicador | Valor | Tendencia |
|-----------|-------|-----------|
| Agentes totales | 63 | 📈 +5 esta semana |
| Plugins | 19 | 📈 +3 en FC2 |
| Épicas cerradas | 3 en FC2 | ✅ Ritmo sostenible |
| Cobertura ontológica | Alta | ✅ MMCO documenta capas |
| Deuda técnica visible | Baja | ✅ Borradores limpian |

*Pathykar se quita las gafas doradas. Sonríe brevemente. Pero sabe que la otra mitad de la verdad espera.*

---

## 🔍 Escena 2: Con las Gafas de los Impedimentos

*Pathykar se pone unas gafas con cristales grises. Los brillos desaparecen. Solo quedan las grietas, los huecos, las tensiones no resueltas.*

### Los Fantasmas que Rondan la Catedral

Desde la perspectiva de arquitecto que busca impedimentos, esto es lo que veo:

#### Impediment 1: Sobrecarga de Plugins — El Museo de lo No Usado

**Diagnóstico**: 19 plugins es un número impresionante. Pero:
- ¿Cuántos se usan activamente? Probablemente 3-4
- **Settings.json en estado "todo desactivado"** por defecto indica problema
- Los usuarios nuevos ven un menú de 25+ opciones y se paralizan

**Riesgo**: El Scriptorium se convierte en un **museo de herramientas** en lugar de un taller productivo. Cada plugin añade carga cognitiva incluso desactivado.

**Métrica de alarma**: Si en Q1-2026 menos del 30% de plugins tienen uso real, hay que podar.

#### Impediment 2: Fundación Congelada — El Proyecto Fantasma

**Diagnóstico**: El texto fundacional (12 capítulos, 2026) lleva:
- **0 capítulos escritos**
- Backlog en "pausa controlada" desde 2025-12-22
- Toda la energía invertida en infraestructura

**Riesgo**: El Scriptorium se convierte en **herramienta que busca problema**. Sin contenido producido con las herramientas, no hay validación del modelo.

**Métrica de alarma**: Si en marzo-2026 no hay al menos 2 capítulos borrador, el proyecto ha perdido su propósito.

#### Impediment 3: Complejidad de Onboarding — El Vestíbulo Vacío

**Diagnóstico**: El README actual tiene:
- 31 agentes mencionados
- 19 plugins listados  
- 14 submódulos referenciados
- Quick Start de 5 líneas que no explica nada

**Riesgo**: Un contribuidor potencial abre el repo, ve la complejidad, y cierra la pestaña. El **vestíbulo existe pero nadie entra**.

**Métrica de alarma**: PRs externos en 6 meses. Si sigue en 0, el problema es real.

#### Impediment 4: Backlog de Borradores Infinito — El Cementerio de Buenas Ideas

**Diagnóstico**: `BACKLOG_BORRADORES/` tiene 25+ carpetas:
- Cada una es una "conversación PO-SM" que nadie sigue
- Muchas están obsoletas (referencias a estructuras cambiadas)
- No hay priorización visible

**Riesgo**: La planificación se convierte en **actividad de confort**. Se planifica para evitar ejecutar. El backlog crece pero nada se cierra.

**Métrica de alarma**: Ratio borradores/épicas-cerradas. Si > 5:1, hay problema de ejecución.

#### Impediment 5: Submódulos Desincronizados — La Deuda de Integración

**Diagnóstico**: 14 submódulos es mucho:
- ¿Cuántos están en versiones actualizadas?
- `git submodule update --remote` puede romper cosas
- Algunos submódulos tienen dependencias cruzadas no documentadas

**Riesgo**: **Rot silencioso**. Los submódulos envejecen, las APIs divergen, un día nada compila.

**Métrica de alarma**: Ejecutar `scripts/setup-workspace.sh` en CI. Si falla > 10% de veces, hay deuda.

#### Impediment 6: Ausencia de Tests — La Fe Ciega

**Diagnóstico**: No hay tests automatizados visibles:
- No hay carpeta `tests/` en raíz
- No hay CI/CD validando PRs
- La "auditoría de las 5 banderas" es manual y opcional

**Riesgo**: Cada cambio es un acto de fe. La **coherencia doctrinal** que predica el proyecto no tiene validación automática.

**Métrica de alarma**: Primera regresión grave por falta de tests. Cuando llegue, costará mucho.

#### Impediment 7: Un Solo Mantenedor — El Bus Factor

**Diagnóstico**: El historial de commits sugiere:
- Un único contribuidor activo
- Sin code review visible
- Sin proceso de PR formal

**Riesgo**: Si esa persona se toma vacaciones, el proyecto se congela. **Bus factor = 1** es un riesgo existencial.

**Métrica de alarma**: Si en Q2-2026 sigue siendo un solo contribuidor, el proyecto es vulnerable.

### Métricas de Impedimento

| Impedimento | Severidad | Urgencia |
|-------------|-----------|----------|
| Sobrecarga plugins | 🟡 Media | Baja (no bloquea) |
| Fundación congelada | 🔴 Alta | Alta (propósito) |
| Onboarding complejo | 🟡 Media | Media (crecimiento) |
| Borradores infinitos | 🟠 Media-Alta | Media (ejecución) |
| Submódulos viejos | 🟡 Media | Baja (latente) |
| Sin tests | 🔴 Alta | Media (acumulativo) |
| Bus factor = 1 | 🔴 Alta | Baja (riesgo latente) |

*Pathykar se quita las gafas grises. Respira. La verdad completa duele, pero es mejor que la ceguera selectiva.*

---

## Síntesis del Arquitecto

No hay contradicción entre las dos fotos. Son la misma realidad:

> **Hemos construido una catedral impresionante. Pero está vacía de feligreses, no tiene cura, y el arquitecto trabaja solo.**

La arquitectura es sólida. El propósito espera. La ejecución debe empezar.

---

## Próximos 3 Movimientos

### 1. 📝 Romper el Hielo de Fundación
**Acción concreta**: Escribir el primer borrador del Capítulo 1 ("Anacronismo productivo") antes de terminar enero-2026. No perfecto: borrador.

**Por qué primero**: Sin contenido, no hay validación del sistema. El texto es el test más importante.

### 2. 🧹 Podar el Museo de Borradores
**Acción concreta**: Revisar `BACKLOG_BORRADORES/`, marcar obsoletos, priorizar 5 épicas máximo para Q1.

**Por qué segundo**: Reducir carga cognitiva. Menos es más cuando hay un solo mantenedor.

### 3. ✅ Un Test, Una Verdad
**Acción concreta**: Crear un único test automatizado que valide coherencia entre `registry.json` y agentes existentes. Ejecutar en pre-commit.

**Por qué tercero**: Empezar la cultura de validación. Un test es infinitamente más que cero tests.

---

## Discurso Motivacional

*Pathykar se dirige a la cámara, con ambas gafas colgando del cuello.*

Hemos pasado seis días intensos construyendo infraestructura. Tres blueprints. Siete épicas cerradas. Un sistema de 63 agentes que se describe a sí mismo.

Pero la pregunta que debemos responder no es "¿qué hemos construido?" sino "¿para qué lo construimos?"

El Scriptorium existe para producir un texto fundacional: 12 capítulos sobre política, instituciones, y futuros posibles. Todo lo demás —los plugins, los agentes, las ontologías formales— son andamios.

Y los andamios sin edificio son chatarra elegante.

La próxima semana debe marcar un giro. No más planificación por comodidad. No más borradores que no se ejecutan. La primera línea del Capítulo 1 es más valiosa que el décimo plugin.

El arquitecto ha hablado. Ahora toca trabajar.

---

*Fin de la escena.*
