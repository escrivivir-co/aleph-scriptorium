---
layout: default
title: Guía de Inicio
permalink: /leeme/
---
<div class="leeme-page" markdown="1">

<!-- HERO -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div class="leeme-hero">
  <div class="hero-icon">📖</div>
  <h1>Guía de Inicio Rápido</h1>
  <p class="hero-subtitle">
    Todo lo que necesitas para instalar, configurar y empezar a usar 
    <strong>Aleph Scriptorium</strong> como tu taller de escritura asistida por IA.
  </p>
  <span class="hero-time">⏱ Tiempo estimado: 15 minutos</span>
</div>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- ÍNDICE -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div class="leeme-index">
  <h2>// Índice</h2>
  <ol>
    <li>
      <a href="#instalacion">¿Cómo instalar?</a>
      <span>VS Code + GitHub Copilot Chat + Scriptorium</span>
    </li>
    <li>
      <a href="#uso">¿Cómo usar?</a>
      <span>Modo Escritor, Plugins, ARG-BOARD</span>
    </li>
    <li>
      <a href="#costes">¿Cuánto cuesta?</a>
      <span>Licencia, Planes de Copilot, IDEs compatibles</span>
    </li>
  </ol>
</div>

---

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- PARTE 1: INSTALACIÓN -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div class="leeme-section" id="instalacion">
  <h2><span class="section-num">1</span> ¿Cómo instalar?</h2>
</div>

El ecosistema Aleph Scriptorium se compone de **tres capas** que necesitas reunir:

<table class="leeme-table">
  <thead>
    <tr>
      <th>Componente</th>
      <th>Proveedor</th>
      <th>Función</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>VS Code</strong></td>
      <td>Microsoft</td>
      <td>IDE base (multiplataforma)</td>
    </tr>
    <tr>
      <td><strong>GitHub Copilot Chat</strong></td>
      <td>Microsoft/GitHub</td>
      <td>Motor de IA conversacional</td>
    </tr>
    <tr>
      <td><strong>Aleph Scriptorium</strong></td>
      <td>Escrivivir.co</td>
      <td>Framework de agentes (este repositorio)</td>
    </tr>
  </tbody>
</table>

<div class="step-grid">

<!-- PASO 1.1 -->
<div class="step-card" data-step="Paso 1.1">
  <h3>Instalar VS Code</h3>
  <p>
    Visual Studio Code es el IDE gratuito de Microsoft donde funciona el sistema de agentes.
    Disponible para Windows, macOS y Linux.
  </p>
  <a href="https://code.visualstudio.com/download" class="btn" target="_blank">↓ Descargar VS Code</a>
</div>

<!-- PASO 1.2 -->
<div class="step-card" data-step="Paso 1.2">
  <h3>Instalar GitHub Copilot Chat</h3>
  <p>
    Extensión oficial que conecta VS Code con los modelos de IA de GitHub.
    Requiere cuenta de GitHub y suscripción a Copilot.
  </p>
  <a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat" class="btn" target="_blank">↓ Instalar Extensión</a>
</div>

<!-- PASO 1.3 -->
<div class="step-card" data-step="Paso 1.3">
  <h3>Clonar Scriptorium</h3>
  <p>
    Descarga el repositorio con todos los agentes, instrucciones y prompts del taller.
  </p>
  <a href="https://github.com/escrivivir-co/aleph-scriptorium" class="btn" target="_blank">→ Ver en GitHub</a>
</div>

</div>

### Paso 1.1: Instalar VS Code

<table class="leeme-table">
  <thead>
    <tr>
      <th>Plataforma</th>
      <th>Enlace</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Windows</td>
      <td><a href="https://code.visualstudio.com/download">code.visualstudio.com/download</a></td>
    </tr>
    <tr>
      <td>macOS</td>
      <td><a href="https://code.visualstudio.com/download">code.visualstudio.com/download</a></td>
    </tr>
    <tr>
      <td>Linux</td>
      <td><a href="https://code.visualstudio.com/download">code.visualstudio.com/download</a> (deb/rpm/snap)</td>
    </tr>
    <tr>
      <td>Web</td>
      <td><a href="https://vscode.dev">vscode.dev</a> (versión navegador)</td>
    </tr>
  </tbody>
</table>

### Paso 1.2: Instalar GitHub Copilot Chat

<div class="alert alert-info">
  <strong>Requisitos previos</strong>
  <p>Necesitas una cuenta de GitHub con suscripción activa a GitHub Copilot (Individual, Business o Enterprise).</p>
</div>

**Proceso de instalación:**

1. Abrir VS Code
2. Ir a **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Buscar **"GitHub Copilot Chat"**
4. Instalar la extensión oficial de GitHub
5. Autenticar con tu cuenta de GitHub cuando se solicite

**Planes disponibles de GitHub Copilot:**

<table class="leeme-table cost-table">
  <thead>
    <tr>
      <th>Plan</th>
      <th>Precio</th>
      <th>Incluye</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Free</strong></td>
      <td>$0/mes</td>
      <td>2000 completions/mes, 50 mensajes chat/mes</td>
    </tr>
    <tr class="cost-row-highlight">
      <td><strong>Pro</strong></td>
      <td>$10/mes</td>
      <td>Completions y chat ilimitados</td>
    </tr>
    <tr>
      <td><strong>Business</strong></td>
      <td>$19/mes</td>
      <td>+ Gestión de organización, políticas</td>
    </tr>
    <tr>
      <td><strong>Enterprise</strong></td>
      <td>Personalizado</td>
      <td>+ Fine-tuning, seguridad avanzada</td>
    </tr>
  </tbody>
</table>

### Paso 1.3: Clonar el Scriptorium

**Opción A: Con Git (recomendado)**

<div class="code-block">
<code><span class="comment"># Clonar el repositorio</span>
<span class="command">git clone</span> https://github.com/escrivivir-co/aleph-scriptorium.git

<span class="comment"># Entrar al directorio</span>
<span class="command">cd</span> aleph-scriptorium

<span class="comment"># Abrir en VS Code</span>
<span class="command">code</span> .</code>
</div>

**Opción B: Descarga directa**

1. Ir a [github.com/escrivivir-co/aleph-scriptorium](https://github.com/escrivivir-co/aleph-scriptorium)
2. Click en **"Code"** → **"Download ZIP"**
3. Extraer en tu carpeta de trabajo
4. Abrir la carpeta en VS Code

### Verificar instalación

<div class="code-block">
<code><span class="comment"># En el chat de Copilot (Ctrl+Shift+I), escribe:</span>
<span class="command">@aleph</span> hola

<span class="comment"># Si el agente responde, ¡instalación completa!</span></code>
</div>

### Paso 1.4: Inicializar el setup del workspace

Este paso configura **VS Code** para detectar prompts e instrucciones de los plugins y prepara la extensión como submódulo para trabajo de integración.

<div class="code-block">
<code><span class="comment"># Desde la raíz del repositorio</span>
<span class="command">./scripts/setup-workspace.sh</span>

<span class="comment"># Luego reinicia VS Code para aplicar los settings</span></code>
</div>

Qué hace:
- Crea/actualiza `.vscode/settings.json` con `chat.promptFilesLocations` y `chat.instructionsFilesLocations` para todos los plugins
- Sincroniza el submódulo `vscode-alephscript-extension`
- Prepara la rama `integration/beta/scriptorium` en el submódulo (lista para publicar)

Verificación:
- En Copilot Chat, escribe `/` y confirma que aparecen prompts de los plugins
- En `vscode-alephscript-extension`, comprueba la rama activa `integration/beta/scriptorium`

---

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- PARTE 2: USO -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div class="leeme-section" id="uso">
  <h2><span class="section-num">2</span> ¿Cómo usar?</h2>
</div>

Aleph Scriptorium ofrece varios **modos de trabajo** según tu objetivo:

### 2.1 Modo Escritor (Vestíbulo)

El **Vestíbulo** es el punto de entrada para nuevos usuarios. Identifica tu perfil y te dirige a la carta-puerta adecuada.

<div class="code-block">
<code><span class="comment"># Invocar el vestíbulo</span>
<span class="command">@vestibulo</span> ¿por dónde empiezo?

<span class="comment"># El agente identificará tu perfil y te guiará</span></code>
</div>

**Cartas-Puerta disponibles:**

<table class="leeme-table">
  <thead>
    <tr>
      <th>Carta</th>
      <th>Perfil</th>
      <th>Enfoque</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Vista Total</td>
      <td>Completitud</td>
      <td>El <em>cómo</em> del proyecto, método completo</td>
    </tr>
    <tr>
      <td>🔵 Blueflag</td>
      <td>Evidencia</td>
      <td>Falsificabilidad, utilidad, posverdad</td>
    </tr>
    <tr>
      <td>⚫ Blackflag</td>
      <td>Poder</td>
      <td>Adversarios, captura, coste represivo</td>
    </tr>
    <tr>
      <td>🔴 Redflag</td>
      <td>Viabilidad</td>
      <td>Escala, enforcement, régimen material</td>
    </tr>
    <tr>
      <td>🟡 Yellowflag</td>
      <td>Integración</td>
      <td>Cuadrantes, límites, condiciones vs contenido</td>
    </tr>
  </tbody>
</table>

### 2.2 Mapa de Agentes (Ox)

El agente **Ox** es el **oráculo del sistema**: conoce todos los agentes disponibles y puede orientarte.

<div class="code-block">
<code><span class="comment"># Consultar el oráculo</span>
<span class="command">@ox</span> ¿qué agentes tengo disponibles?

<span class="comment"># Pedir ayuda específica</span>
<span class="command">@ox</span> ¿qué agente uso para auditar evidencia?</code>
</div>

**Taxonomía de Agentes:**

<div class="agents-compact">
  <div class="agent-mini">🟢 <strong>@aleph</strong><span>Producción, redacción</span></div>
  <div class="agent-mini">🟢 <strong>@revisor</strong><span>Auditoría doctrinal</span></div>
  <div class="agent-mini">🟢 <strong>@periodico</strong><span>Noticias 5W+Banderas</span></div>
  <div class="agent-mini">🔵 <strong>@blueflag</strong><span>Verdad, evidencia</span></div>
  <div class="agent-mini">⚫ <strong>@blackflag</strong><span>Poder, sombras</span></div>
  <div class="agent-mini">🔴 <strong>@redflag</strong><span>Viabilidad, escala</span></div>
  <div class="agent-mini">🟡 <strong>@yellowflag</strong><span>Límites, gnosis</span></div>
  <div class="agent-mini">🟠 <strong>@orangeflag</strong><span>Registro, estilo</span></div>
  <div class="agent-mini">⚪ <strong>@vestibulo</strong><span>Entrada, orientación</span></div>
  <div class="agent-mini">⚙️ <strong>@ox</strong><span>Oráculo, índice</span></div>
</div>

### 2.3 Plugins

Los **plugins** extienden las capacidades del Scriptorium:

<div class="step-grid">

<div class="step-card" data-step="Enciclopedia">
  <h3>📚 Biblioteca de Tomos</h3>
  <p>Consulta tomos académicos con búsquedas temporales y temáticas.</p>
  <div class="code-block" style="margin: 0;">
<code><span class="command">@plugin_ox_enciclopedia</span> 
buscar "Aristóteles" en 
Historia de la Filosofía</code>
  </div>
</div>

<div class="step-card" data-step="Foro Scraper">
  <h3>🔗 Scraping de Foros</h3>
  <p>Descarga hilos de foros y blogs para archivo en DISCO/.</p>
  <div class="code-block" style="margin: 0;">
<code><span class="command">@plugin_ox_foroscraper</span> 
iniciar scraping [URL]</code>
  </div>
</div>

<div class="step-card" data-step="Agent Creator">
  <h3>🔧 Crear Agentes</h3>
  <p>Combina agentes base con fuentes de datos para crear especialistas.</p>
  <div class="code-block" style="margin: 0;">
<code><span class="command">@plugin_ox_agentcreator</span> 
crear agente desde 
DISCO/mi_fuente/</code>
  </div>
</div>

</div>

### 2.4 ARG-BOARD (Teatro Transmedia)

**ARG-BOARD** permite crear **obras de teatro transmedia** con personajes IA que pueden desplegarse como interfaces dinámicas.

<div class="code-block">
<code><span class="comment"># Acceder al teatro</span>
<span class="command">@plugin_ox_argboard</span> abrir teatro

<span class="comment"># Crear una obra</span>
<span class="command">@plugin_ox_argboard</span> crear obra "Mi_Obra"

<span class="comment"># Desplegar personaje</span>
<span class="command">@plugin_ox_argboard</span> invocar personaje Tarotista en Mi_Obra</code>
</div>

<div class="alert alert-info">
  <strong>UI/UX Dinámica</strong>
  <p>ARG-BOARD genera interfaces de usuario dinámicamente mediante personajes IA que interactúan con el usuario según la narrativa de la obra.</p>
</div>

---

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- PARTE 3: COSTES -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div class="leeme-section" id="costes">
  <h2><span class="section-num">3</span> ¿Cuánto cuesta?</h2>
</div>

### 3.1 Licencia AIPL v1.0

**Aleph Scriptorium** se distribuye bajo la licencia **AIPL v1.0** (Animus Iocandi Public License), heredada de VibeBitacora.

<table class="leeme-table">
  <thead>
    <tr>
      <th>Aspecto</th>
      <th>Términos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Uso</strong></td>
      <td>Libre para uso académico y experimental</td>
    </tr>
    <tr>
      <td><strong>Modificación</strong></td>
      <td>Permitida sin restricciones</td>
    </tr>
    <tr>
      <td><strong>Distribución</strong></td>
      <td>Permitida con o sin atribución</td>
    </tr>
    <tr>
      <td><strong>Comercialización</strong></td>
      <td>El framework es libre; el contenido demo ("Fundación") no</td>
    </tr>
  </tbody>
</table>

**Lo que SÍ puedes hacer:**
- Usar, copiar, modificar el framework completo
- Crear tus propios scriptoriums con otros nombres
- Adaptar los agentes a tu voz y método
- Ignorar completamente el proyecto demo "Fundación"

**Lo que NO incluye:**
- Soporte técnico garantizado
- Responsabilidad por resultados
- El contenido del proyecto "Fundación" (© Escrivivir.co)

<div class="disclaimer">
  <h4>Aviso Legal Importante</h4>
  <p>
    Este repositorio es un <strong>proyecto de investigación académica</strong>. 
    Escrivivir.co / VibeCoding / Aleph Scriptorium <strong>no vende productos ni servicios</strong>.
  </p>
  <p>
    Solo se provee código fuente para experimentación, sin garantías de ningún tipo.
    El uso es bajo tu propia responsabilidad y está pensado principalmente para <strong>ámbito académico</strong>.
  </p>
  <ul>
    <li>No garantizamos que los agentes escriban mejor que tú</li>
    <li>No garantizamos que el ARCHIVO resuelva tus bloqueos creativos</li>
    <li>No garantizamos que la IA deje de alucinar ocasionalmente</li>
  </ul>
  <p>
    → <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/LICENSE.md">Leer licencia completa</a>
  </p>
</div>

### 3.2 Costes de GitHub Copilot

<div class="alert alert-important">
  <strong>Escrivivir.co NO cobra por usar Aleph Scriptorium</strong>
  <p>Los únicos costes son los de tu suscripción a GitHub Copilot, que pagas directamente a Microsoft/GitHub.</p>
</div>

**Modos de Chat y Costes:**

<table class="leeme-table cost-table">
  <thead>
    <tr>
      <th>Modo</th>
      <th>Coste</th>
      <th>Recomendación</th>
    </tr>
  </thead>
  <tbody>
    <tr class="cost-row-highlight">
      <td><strong>Auto</strong> <span class="discount-badge">-10%</span></td>
      <td>Descuento 10%</td>
      <td>Tareas generales, rutinarias</td>
    </tr>
    <tr>
      <td><strong>Claude Sonnet</strong></td>
      <td>Base</td>
      <td>Tareas complejas, análisis profundo</td>
    </tr>
    <tr>
      <td><strong>GPT-4o</strong></td>
      <td>Base</td>
      <td>Rapidez, código, tareas simples</td>
    </tr>
    <tr>
      <td><strong>o1-preview</strong> <span class="premium-badge">PREMIUM</span></td>
      <td>Mayor coste</td>
      <td>Razonamiento paso a paso, problemas difíciles</td>
    </tr>
  </tbody>
</table>

**Consejos de optimización:**

Para **minimizar costes**:
1. Usa modo **Auto** para tareas rutinarias (10% descuento automático)
2. Cambia a **Claude Sonnet** solo para auditorías complejas
3. Reserva **o1-preview** para razonamiento paso a paso cuando sea imprescindible

Para **maximizar calidad**:
1. Usa **Claude Sonnet** (u **Opus** si está disponible) como modelo principal
2. Activa **o1-preview** para capítulos finales o revisiones críticas

### 3.3 Compatibilidad con otros IDEs

Aleph Scriptorium está diseñado para VS Code, pero el sistema de agentes es **agnóstico de plataforma**.

<div class="compat-grid">
  <div class="compat-item">
    <div class="icon">💻</div>
    <span class="name">VS Code</span>
    <span class="status status-ok">✅ Completo</span>
  </div>
  <div class="compat-item">
    <div class="icon">🖱️</div>
    <span class="name">Cursor</span>
    <span class="status status-dev">🔄 En desarrollo</span>
  </div>
  <div class="compat-item">
    <div class="icon">🌊</div>
    <span class="name">Windsurf</span>
    <span class="status status-dev">🔄 En desarrollo</span>
  </div>
  <div class="compat-item">
    <div class="icon">🤖</div>
    <span class="name">Claude Code</span>
    <span class="status status-research">🔬 Investigación</span>
  </div>
  <div class="compat-item">
    <div class="icon">🚀</div>
    <span class="name">Antigravity</span>
    <span class="status status-research">🔬 Investigación</span>
  </div>
  <div class="compat-item">
    <div class="icon">🧠</div>
    <span class="name">JetBrains</span>
    <span class="status status-research">⏳ Futuro</span>
  </div>
</div>

**Requisitos mínimos para otros IDEs:**

Para que Scriptorium funcione en otro IDE necesita:
1. Soporte para archivos `.agent.md` (o equivalente)
2. Sistema de chat con IA conversacional
3. Acceso al filesystem del workspace
4. Capacidad de invocar herramientas (tools/MCP)

<div class="alert alert-info">
  <strong>¿Usas otro IDE?</strong>
  <p>Si logras adaptar Scriptorium a otro IDE, considera contribuir al repositorio con tus hallazgos.</p>
</div>

---

<div class="leeme-footer">
  <p>
    ¿Listo para empezar? Vuelve al <a href="{{ site.baseurl }}/">inicio</a> o explora el <a href="{{ site.baseurl }}/agentes/">mapa de agentes</a>.
  </p>
</div>

</div>
