---
layout: presentation
title: El Viaje de tu Pregunta
description: Simulación interactiva del flujo User Prompt → System Message → LLM
permalink: /blueprint-copilot/
---

<!-- ==========================================
     BLUEPRINT COPILOT: El Viaje de tu Pregunta
     SCRIPT-1.31.1 - Navegación en Cubo 3D
     
     Estructura de coordenadas:
     - Eje X: Flujo principal (→)
     - Eje Y: Subdiapos verticales (↓)
     - Eje Z: Profundidad (detalle técnico)
     
     Navegación: ← → entre fases, ↑ ↓ subdiapos
     ========================================== -->

<!-- ==========================================
     SLIDE 0: TU PREGUNTA (Punto de entrada)
     Coordenadas: (0, 0, 0)
     ========================================== -->
<div id="prompt" class="step copilot-step" 
     data-x="0" 
     data-y="0" 
     data-z="0"
     data-scale="1.2">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 0</span>
    <span class="copilot-title">Tu Pregunta</span>
  </div>
  
  <div class="user-prompt-box">
    <div class="prompt-avatar">👤</div>
    <div class="prompt-content">
      <div class="prompt-label">User Prompt</div>
      <div class="prompt-text">@aleph escribe un borrador sobre tecnofeudalismo</div>
    </div>
  </div>
  
  <div class="copilot-explanation">
    <p>Escribes algo en Copilot Chat. Parece simple, pero internamente desencadenas una cadena de 5 pasos que transforman tu pregunta en una respuesta inteligente.</p>
  </div>
  
  <div class="journey-preview">
    <span class="journey-node current">Prompt</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">Registry</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">Agent</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">Instructions</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">LLM</span>
  </div>
  
  <div class="nav-hint">→ Siguiente: PromptRegistry</div>
</div>

<!-- ==========================================
     SLIDE 1: PROMPT REGISTRY (Principal)
     Coordenadas: (2000, 0, 0)
     ========================================== -->
<div id="registry" class="step copilot-step" 
     data-x="2000" 
     data-y="0" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 1</span>
    <span class="copilot-title">PromptRegistry</span>
  </div>
  
  <div class="copilot-explanation">
    <p>El <strong>PromptRegistry</strong> es un singleton que detecta tu modelo LLM y selecciona el prompt adecuado.</p>
  </div>
  
  <div class="mock-data-panel">
    <div class="mock-label">🔍 Detección de Modelo</div>
    <div class="mock-flow">
      <div class="mock-input">
        <span class="mock-key">Tu modelo:</span>
        <span class="mock-value">claude-sonnet-4-20250514</span>
      </div>
      <div class="mock-arrow">↓ matchesModel()</div>
      <div class="mock-output">
        <span class="mock-key">Prefijo detectado:</span>
        <span class="mock-value">anthropic</span>
      </div>
      <div class="mock-arrow">↓</div>
      <div class="mock-output">
        <span class="mock-key">Prompt seleccionado:</span>
        <span class="mock-value">AnthropicAgentPrompt</span>
      </div>
    </div>
  </div>
  
  <div class="journey-preview">
    <span class="journey-node done">Prompt</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node current">Registry</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">Agent</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">Instructions</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">LLM</span>
  </div>
  
  <div class="depth-hint">
    <span class="arrow">↓</span>
    <span>Ver código fuente</span>
  </div>
</div>

<!-- ==========================================
     SLIDE 1.1: REGISTRY - Código (Subdiapo)
     Coordenadas: (2000, 700, 0)
     ========================================== -->
<div id="registry-code" class="step copilot-step" 
     data-x="2000" 
     data-y="700" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 1 · Detalle</span>
    <span class="copilot-title">Código: promptRegistry.ts</span>
  </div>
  
  <div class="code-context">
    <div class="file-tab">📄 src/vs/workbench/contrib/chat/browser/promptRegistry.ts</div>
    <pre class="code-block"><code>// Singleton que gestiona prompts por modelo
class PromptRegistry {
  private familyPrefixes = [
    '<span class="highlight-match">anthropic</span>',  // Claude
    'openai',     // GPT-4, GPT-4o
    'google',     // Gemini
    'xai'         // Grok
  ];
  
  matchesModel(modelFamily: string): IAgentPrompt {
    // Tu modelo: <span class="highlight-model">claude-sonnet-4-20250514</span>
    return this.promptsWithMatcher.find(
      p => modelFamily.startsWith(p.prefix)
    );
  }
}</code></pre>
  </div>
  
  <div class="scriptorium-note">
    <span class="note-icon">💡</span>
    <span class="note-text">
      Cada familia de modelos tiene su propia implementación de <code>IAgentPrompt</code>, optimizada para sus capacidades específicas.
    </span>
  </div>
  
  <div class="nav-hint">↑ Volver a vista general</div>
</div>

<!-- ==========================================
     SLIDE 2: AGENT PROMPT (Principal)
     Coordenadas: (4000, 0, 0)
     ========================================== -->
<div id="agent" class="step copilot-step" 
     data-x="4000" 
     data-y="0" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 2</span>
    <span class="copilot-title">IAgentPrompt Interface</span>
  </div>
  
  <div class="copilot-explanation">
    <p>Cada modelo implementa <strong>5 métodos</strong> que definen cómo se construye el system message.</p>
  </div>
  
  <div class="interface-cards">
    <div class="interface-card">
      <span class="card-icon">📋</span>
      <span class="card-name">SystemPrompt</span>
      <span class="card-desc">~2000 tokens</span>
    </div>
    <div class="interface-card">
      <span class="card-icon">🔔</span>
      <span class="card-name">Reminder</span>
      <span class="card-desc">Solo OpenAI</span>
    </div>
    <div class="interface-card">
      <span class="card-icon">🔧</span>
      <span class="card-name">ToolHints</span>
      <span class="card-desc">MCP refs</span>
    </div>
    <div class="interface-card">
      <span class="card-icon">🤖</span>
      <span class="card-name">Identity</span>
      <span class="card-desc">Quién soy</span>
    </div>
    <div class="interface-card">
      <span class="card-icon">🛡️</span>
      <span class="card-name">Safety</span>
      <span class="card-desc">Políticas</span>
    </div>
  </div>
  
  <div class="journey-preview">
    <span class="journey-node done">Prompt</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Registry</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node current">Agent</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">Instructions</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">LLM</span>
  </div>
  
  <div class="depth-hint">
    <span class="arrow">↓</span>
    <span>Comparar implementaciones por modelo</span>
  </div>
</div>

<!-- ==========================================
     SLIDE 2.1: AGENT - Comparación Modelos (Subdiapo)
     Coordenadas: (4000, 700, 0)
     ========================================== -->
<div id="agent-models" class="step copilot-step" 
     data-x="4000" 
     data-y="700" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 2 · Detalle</span>
    <span class="copilot-title">Implementaciones por Modelo</span>
  </div>
  
  <div class="model-comparison">
    <div class="model-card claude">
      <span class="model-icon">🟣</span>
      <span class="model-name">Claude</span>
      <ul class="model-features">
        <li>✅ DefaultAgentInstructions</li>
        <li>❌ No Reminder</li>
        <li>✅ Extended thinking</li>
        <li>✅ Sonnet optimizations</li>
      </ul>
    </div>
    <div class="model-card gpt">
      <span class="model-icon">🟢</span>
      <span class="model-name">GPT-4</span>
      <ul class="model-features">
        <li>✅ DefaultAgentInstructions</li>
        <li>✅ KeepGoingReminder</li>
        <li>✅ JSON mode nativo</li>
        <li>✅ Function calling</li>
      </ul>
    </div>
    <div class="model-card gemini">
      <span class="model-icon">🔵</span>
      <span class="model-name">Gemini</span>
      <ul class="model-features">
        <li>✅ DefaultAgentInstructions</li>
        <li>❌ No Reminder</li>
        <li>✅ Grounding</li>
        <li>✅ Long context</li>
      </ul>
    </div>
  </div>
  
  <div class="code-context">
    <div class="file-tab">📄 anthropicPrompts.tsx</div>
    <pre class="code-block"><code>class AnthropicAgentPrompt implements IAgentPrompt {
  resolveSystemPrompt() {
    return &lt;DefaultAgentInstructions /&gt;;
  }
  
  // Claude NO usa reminder (contexto largo)
  resolveReminderInstructions() {
    return <span class="highlight-null">null</span>;
  }
}</code></pre>
  </div>
  
  <div class="nav-hint">↑ Volver a vista general</div>
</div>

<!-- ==========================================
     SLIDE 3: INSTRUCTIONS (Principal)
     Coordenadas: (6000, 0, 0)
     ========================================== -->
<div id="instructions" class="step copilot-step" 
     data-x="6000" 
     data-y="0" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 3</span>
    <span class="copilot-title">DefaultAgentInstructions</span>
  </div>
  
  <div class="copilot-explanation">
    <p>Instrucciones base compartidas por todos los modelos, estructuradas en <strong>Tags XML</strong>.</p>
  </div>
  
  <div class="tag-structure">
    <div class="tag-card root">
      <span class="tag-name">&lt;InstructionMessage&gt;</span>
      <div class="tag-children">
        <div class="tag-card">
          <span class="tag-name">&lt;Tag name='instructions'&gt;</span>
          <div class="tag-children">
            <span class="tag-leaf">toolUseInstructions</span>
            <span class="tag-leaf">notebookInstructions</span>
            <span class="tag-leaf">outputFormatting</span>
            <span class="tag-leaf">fileLinkification</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="scriptorium-note">
    <span class="note-icon">💡</span>
    <span class="note-text">
      Tu <strong>copilot-instructions.md</strong> se inyecta aquí, sumándose a estas instrucciones base. ¡Es tu oportunidad de personalizar el comportamiento!
    </span>
  </div>
  
  <div class="journey-preview">
    <span class="journey-node done">Prompt</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Registry</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Agent</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node current">Instructions</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">LLM</span>
  </div>
  
  <div class="depth-hint">
    <span class="arrow">↓</span>
    <span>Ver estructura de Tags completa</span>
  </div>
</div>

<!-- ==========================================
     SLIDE 3.1: INSTRUCTIONS - Tags Detail (Subdiapo)
     Coordenadas: (6000, 700, 0)
     ========================================== -->
<div id="instructions-tags" class="step copilot-step" 
     data-x="6000" 
     data-y="700" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 3 · Detalle</span>
    <span class="copilot-title">Estructura de Tags XML</span>
  </div>
  
  <div class="code-context">
    <div class="file-tab">📄 defaultAgentInstructions.tsx</div>
    <pre class="code-block"><code>&lt;InstructionMessage&gt;
  &lt;Tag name='<span class="highlight-match">instructions</span>'&gt;
    You are an expert AI programming assistant...
    
    &lt;Tag name='<span class="highlight-model">toolUseInstructions</span>'&gt;
      When using a tool, follow the JSON schema...
      If you think running multiple tools can answer 
      the user's question, prefer calling them in parallel.
    &lt;/Tag&gt;
    
    &lt;Tag name='notebookInstructions'&gt;
      Use run_notebook_cell instead of jupyter...
    &lt;/Tag&gt;
    
    &lt;Tag name='outputFormatting'&gt;
      Use proper Markdown formatting...
      &lt;Tag name='fileLinkification'&gt;
        When mentioning files, convert to markdown links...
      &lt;/Tag&gt;
    &lt;/Tag&gt;
  &lt;/Tag&gt;
&lt;/InstructionMessage&gt;</code></pre>
  </div>
  
  <div class="nav-hint">↑ Volver a vista general</div>
</div>

<!-- ==========================================
     SLIDE 4: ASSEMBLY (Principal)
     Coordenadas: (8000, 0, 0)
     ========================================== -->
<div id="assembly" class="step copilot-step" 
     data-x="8000" 
     data-y="0" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 4</span>
    <span class="copilot-title">Ensamblaje del System Message</span>
  </div>
  
  <div class="copilot-explanation">
    <p>Todas las piezas se combinan en un único <strong>System Message</strong> que guía al LLM.</p>
  </div>
  
  <div class="assembly-diagram">
    <div class="assembly-row">
      <div class="assembly-block base">
        <span class="block-label">Base</span>
        <span class="block-content">DefaultAgentInstructions</span>
        <span class="block-tokens">~1500 tokens</span>
      </div>
      <span class="assembly-plus">+</span>
      <div class="assembly-block model">
        <span class="block-label">Modelo</span>
        <span class="block-content">AnthropicRules</span>
        <span class="block-tokens">~200 tokens</span>
      </div>
    </div>
    <div class="assembly-arrow">↓</div>
    <div class="assembly-row">
      <div class="assembly-block user">
        <span class="block-label">Usuario</span>
        <span class="block-content">copilot-instructions.md</span>
        <span class="block-tokens">~300 tokens</span>
      </div>
      <span class="assembly-plus">+</span>
      <div class="assembly-block context">
        <span class="block-label">Contexto</span>
        <span class="block-content">*.instructions.md</span>
        <span class="block-tokens">variable</span>
      </div>
    </div>
    <div class="assembly-arrow">↓</div>
    <div class="assembly-result">
      <span class="result-label">System Message Final</span>
      <span class="result-tokens">~2000-4000 tokens</span>
    </div>
  </div>
  
  <div class="journey-preview">
    <span class="journey-node done">Prompt</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Registry</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Agent</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node current">Instructions</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node">LLM</span>
  </div>
  
  <div class="depth-hint">
    <span class="arrow">↓</span>
    <span>Ver mensaje ensamblado (mock)</span>
  </div>
</div>

<!-- ==========================================
     SLIDE 4.1: ASSEMBLY - Mock Message (Subdiapo)
     Coordenadas: (8000, 700, 0)
     ========================================== -->
<div id="assembly-mock" class="step copilot-step" 
     data-x="8000" 
     data-y="700" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 4 · Detalle</span>
    <span class="copilot-title">Tu System Message Ensamblado</span>
  </div>
  
  <div class="mock-data-panel">
    <div class="mock-label">📦 Mock: Contenido del System Message</div>
    <div class="mock-system-message">
      <div class="msg-section">You are an expert AI programming assistant, working with a user in the VS Code editor...</div>
      <div class="msg-section">When asked for your name, you must respond with "GitHub Copilot"...</div>
      <div class="msg-section highlight-user">// Instrucciones Globales — Aleph Scriptorium</div>
      <div class="msg-section highlight-user">**Aleph Scriptorium** es un sistema de agentes de IA para VS Code + GitHub Copilot Chat...</div>
      <div class="msg-section">When using a tool, follow the JSON schema very carefully...</div>
      <div class="msg-section">Use proper Markdown formatting. When referring to symbols wrap in backticks...</div>
    </div>
  </div>
  
  <div class="scriptorium-note">
    <span class="note-icon">🎯</span>
    <span class="note-text">
      Las secciones <strong style="color: var(--cp-warning);">resaltadas</strong> son TUS instrucciones del Scriptorium, inyectadas en el system message.
    </span>
  </div>
  
  <div class="nav-hint">↑ Volver a vista general</div>
</div>

<!-- ==========================================
     SLIDE 5: LLM (Principal)
     Coordenadas: (10000, 0, 0)
     ========================================== -->
<div id="llm" class="step copilot-step" 
     data-x="10000" 
     data-y="0" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 5</span>
    <span class="copilot-title">Envío al LLM</span>
  </div>
  
  <div class="copilot-explanation">
    <p>Todo listo. El mensaje se envía a la API del modelo seleccionado.</p>
  </div>
  
  <div class="llm-visualization">
    <div class="llm-box">
      <span class="llm-icon">🧠</span>
      <span class="llm-name">Claude Sonnet 4</span>
      <div class="llm-processing">
        <span class="processing-dot"></span>
        <span class="processing-dot"></span>
        <span class="processing-dot"></span>
      </div>
    </div>
  </div>
  
  <div class="journey-preview">
    <span class="journey-node done">Prompt</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Registry</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Agent</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Instructions</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node current">LLM</span>
  </div>
  
  <div class="depth-hint">
    <span class="arrow">↓</span>
    <span>Ver estructura de la API Request</span>
  </div>
</div>

<!-- ==========================================
     SLIDE 5.1: LLM - API Request (Subdiapo)
     Coordenadas: (10000, 700, 0)
     ========================================== -->
<div id="llm-api" class="step copilot-step" 
     data-x="10000" 
     data-y="700" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 5 · Detalle</span>
    <span class="copilot-title">API Request Structure</span>
  </div>
  
  <div class="llm-request">
    <div class="request-box">
      <div class="request-header">
        <span class="request-icon">📤</span>
        <span class="request-title">POST → api.anthropic.com/v1/messages</span>
      </div>
      <div class="request-body">
        <div class="request-field">
          <span class="field-key">model:</span>
          <span class="field-value">"claude-sonnet-4-20250514"</span>
        </div>
        <div class="request-field">
          <span class="field-key">system:</span>
          <span class="field-value">[System Message ~2500 tokens]</span>
        </div>
        <div class="request-field">
          <span class="field-key">messages:</span>
          <span class="field-value">[{ role: "user", content: "@aleph escribe..." }]</span>
        </div>
        <div class="request-field">
          <span class="field-key">tools:</span>
          <span class="field-value">[read_file, replace_string, run_in_terminal, ...]</span>
        </div>
        <div class="request-field">
          <span class="field-key">max_tokens:</span>
          <span class="field-value">16384</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="nav-hint">↑ Volver a vista general</div>
</div>

<!-- ==========================================
     SLIDE 6: OUTPUT (Respuesta Final)
     Coordenadas: (12000, 0, 0)
     ========================================== -->
<div id="output" class="step copilot-step" 
     data-x="12000" 
     data-y="0" 
     data-z="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 6</span>
    <span class="copilot-title">La Respuesta</span>
  </div>
  
  <div class="output-box">
    <div class="output-header">
      <span class="output-icon">🤖</span>
      <span class="output-title">@aleph responde</span>
    </div>
    <div class="output-content">
      <p>Voy a redactar un borrador sobre tecnofeudalismo. Primero consultaré el ARCHIVO para verificar si hay material previo...</p>
      <div class="output-tool-call">
        <span class="tool-icon">🔧</span>
        <span class="tool-name">semantic_search</span>
        <span class="tool-args">"tecnofeudalismo"</span>
      </div>
      <p>Encontré referencias en <code>ARCHIVO/marco/economia-digital.md</code>. Basándome en el marco teórico del Scriptorium, procedo a redactar...</p>
    </div>
  </div>
  
  <div class="output-analysis">
    <div class="analysis-card">
      <span class="analysis-icon">✅</span>
      <span class="analysis-title">Lo que funcionó</span>
      <ul>
        <li>Reconoció el agente @aleph</li>
        <li>Consultó ARCHIVO primero</li>
        <li>Usó herramientas disponibles</li>
      </ul>
    </div>
    <div class="analysis-card">
      <span class="analysis-icon">🎯</span>
      <span class="analysis-title">Gracias a</span>
      <ul>
        <li>copilot-instructions.md</li>
        <li>Handoffs definidos</li>
        <li>Instrucciones contextuales</li>
      </ul>
    </div>
  </div>
  
  <div class="journey-preview complete">
    <span class="journey-node done">Prompt</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Registry</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Agent</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">Instructions</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node done">LLM</span>
    <span class="journey-arrow">→</span>
    <span class="journey-node current">✓</span>
  </div>
</div>

<!-- ==========================================
     SLIDE 7: OVERVIEW (Vista Panorámica)
     Coordenadas: (6000, 0, 3500) - Alejado en Z
     ========================================== -->
<div id="overview-copilot" class="step" 
     data-x="6000" 
     data-y="0" 
     data-z="3500"
     data-scale="5">
  <div class="copilot-overview-card">
    <h2>🧠 El Viaje de tu Pregunta</h2>
    <p>Has navegado el flujo completo de Copilot Chat: desde tu prompt hasta la respuesta inteligente.</p>
    
    <div class="journey-complete">
      <div class="journey-step">
        <span class="step-num">0</span>
        <span class="step-name">Prompt</span>
      </div>
      <div class="journey-step">
        <span class="step-num">1</span>
        <span class="step-name">Registry</span>
      </div>
      <div class="journey-step">
        <span class="step-num">2</span>
        <span class="step-name">Agent</span>
      </div>
      <div class="journey-step">
        <span class="step-num">3</span>
        <span class="step-name">Instructions</span>
      </div>
      <div class="journey-step">
        <span class="step-num">4</span>
        <span class="step-name">Assembly</span>
      </div>
      <div class="journey-step">
        <span class="step-num">5</span>
        <span class="step-name">LLM</span>
      </div>
      <div class="journey-step">
        <span class="step-num">6</span>
        <span class="step-name">Output</span>
      </div>
    </div>
    
    <div class="key-insights">
      <h3>💡 Insights Clave</h3>
      <ul>
        <li><strong>Tus instrucciones importan:</strong> Se suman al system message, no lo reemplazan</li>
        <li><strong>El modelo importa:</strong> Claude y GPT reciben instrucciones diferentes</li>
        <li><strong>El contexto importa:</strong> Los <code>applyTo</code> inyectan instrucciones según el archivo</li>
        <li><strong>Navegación 3D:</strong> Usa ↑↓ para explorar detalles técnicos en cada fase</li>
      </ul>
    </div>
    
    <div class="blueprint-toggle">
      <a href="{{ '/blueprint/' | relative_url }}" class="toggle-btn">📐 Vista UX</a>
      <a href="{{ '/blueprint-mmco/' | relative_url }}" class="toggle-btn">🧬 Vista MMCO</a>
      <span class="toggle-current">🧠 Vista Copilot</span>
    </div>
    
    <p class="copilot-footer">
      Basado en análisis de <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/CopilotEngine">CopilotEngine</a> · 
      SCRIPT-1.31.1 · 
      <a href="{{ '/ecosistema/' | relative_url }}">Volver al Ecosistema →</a>
    </p>
  </div>
</div>
