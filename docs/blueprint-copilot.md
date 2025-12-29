---
layout: presentation
title: El Viaje de tu Pregunta
description: Simulación interactiva del flujo User Prompt → System Message → LLM
permalink: /blueprint-copilot/
---

<!-- ==========================================
     BLUEPRINT COPILOT: El Viaje de tu Pregunta
     
     Simulación navegable del flujo interno de
     Copilot Chat usando mock data.
     
     Navegación: Prompt → Registry → Agent → Instructions → LLM → Output
     ========================================== -->

<!-- ==========================================
     SLIDE 0: TU PREGUNTA (Punto de entrada)
     ========================================== -->
<div id="prompt" class="step copilot-step" 
     data-x="0" 
     data-y="0" 
     data-z="0"
     data-scale="1.5">
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
    <p>Escribes algo en Copilot Chat. Parece simple, pero internamente desencadenas una cadena de 5 pasos.</p>
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
  
  <div class="nav-hint">↓ Comenzar el viaje</div>
</div>

<!-- ==========================================
     SLIDE 1: PROMPT REGISTRY (Selección de modelo)
     ========================================== -->
<div id="registry" class="step copilot-step" 
     data-x="1500" 
     data-y="0" 
     data-z="0"
     data-rotate-y="-30">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 1</span>
    <span class="copilot-title">PromptRegistry</span>
  </div>
  
  <div class="code-context">
    <div class="file-tab">📄 promptRegistry.ts</div>
    <pre class="code-block"><code>// Singleton que gestiona prompts por modelo
class PromptRegistry {
  private familyPrefixes = [
    'anthropic', 'openai', 'google', 'xai'
  ];
  
  matchesModel(modelFamily: string): IAgentPrompt {
    // Tu modelo: <span class="highlight-model">claude-sonnet-4-20250514</span>
    // Match: <span class="highlight-match">anthropic</span>
    return this.promptsWithMatcher.find(
      p => modelFamily.startsWith(p.prefix)
    );
  }
}</code></pre>
  </div>
  
  <div class="mock-data-panel">
    <div class="mock-label">🔍 Mock: Detección de modelo</div>
    <div class="mock-flow">
      <div class="mock-input">
        <span class="mock-key">modelFamily:</span>
        <span class="mock-value">"claude-sonnet-4-20250514"</span>
      </div>
      <div class="mock-arrow">↓ matchesModel()</div>
      <div class="mock-output">
        <span class="mock-key">prefix match:</span>
        <span class="mock-value">"anthropic"</span>
      </div>
      <div class="mock-arrow">↓</div>
      <div class="mock-output">
        <span class="mock-key">selected:</span>
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
</div>

<!-- ==========================================
     SLIDE 2a: AGENT PROMPT (Interface)
     ========================================== -->
<div id="agent-interface" class="step copilot-step" 
     data-x="3000" 
     data-y="-500" 
     data-z="0"
     data-rotate-y="-15">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 2a</span>
    <span class="copilot-title">IAgentPrompt Interface</span>
  </div>
  
  <div class="code-context">
    <div class="file-tab">📄 types.ts</div>
    <pre class="code-block"><code>interface IAgentPrompt {
  // Los 5 métodos que TODO prompt debe implementar
  
  <span class="method-highlight">resolveSystemPrompt()</span>
  // → Instrucciones base del sistema
  
  <span class="method-highlight">resolveReminderInstructions()</span>
  // → Recordatorios para tareas largas
  
  <span class="method-highlight">resolveToolReferencesHint()</span>
  // → Cómo referenciar herramientas
  
  <span class="method-highlight">resolveCopilotIdentityRules()</span>
  // → "Soy GitHub Copilot, uso Claude..."
  
  <span class="method-highlight">resolveSafetyRules()</span>
  // → Políticas de contenido
}</code></pre>
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
</div>

<!-- ==========================================
     SLIDE 2b: AGENT PROMPT (Implementación Claude)
     ========================================== -->
<div id="agent-claude" class="step copilot-step" 
     data-x="3000" 
     data-y="500" 
     data-z="0"
     data-rotate-y="-15">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 2b</span>
    <span class="copilot-title">AnthropicAgentPrompt</span>
  </div>
  
  <div class="code-context">
    <div class="file-tab">📄 anthropicPrompts.tsx</div>
    <pre class="code-block"><code>class AnthropicAgentPrompt implements IAgentPrompt {
  
  resolveSystemPrompt() {
    return (
      &lt;InstructionMessage&gt;
        &lt;Tag name='instructions'&gt;
          &lt;DefaultAgentInstructions /&gt;
          &lt;AnthropicSpecificRules /&gt;
        &lt;/Tag&gt;
      &lt;/InstructionMessage&gt;
    );
  }
  
  // Claude NO usa reminder
  resolveReminderInstructions() {
    return <span class="highlight-null">null</span>;
  }
}</code></pre>
  </div>
  
  <div class="model-comparison">
    <div class="model-card claude">
      <span class="model-icon">🟣</span>
      <span class="model-name">Claude</span>
      <ul class="model-features">
        <li>✅ DefaultAgentInstructions</li>
        <li>❌ No Reminder</li>
        <li>✅ Extended thinking</li>
      </ul>
    </div>
    <div class="model-card gpt">
      <span class="model-icon">🟢</span>
      <span class="model-name">GPT</span>
      <ul class="model-features">
        <li>✅ DefaultAgentInstructions</li>
        <li>✅ KeepGoingReminder</li>
        <li>✅ JSON mode</li>
      </ul>
    </div>
    <div class="model-card gemini">
      <span class="model-icon">🔵</span>
      <span class="model-name">Gemini</span>
      <ul class="model-features">
        <li>✅ DefaultAgentInstructions</li>
        <li>❌ No Reminder</li>
        <li>✅ Grounding</li>
      </ul>
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
</div>

<!-- ==========================================
     SLIDE 3: DEFAULT AGENT INSTRUCTIONS (Base común)
     ========================================== -->
<div id="instructions" class="step copilot-step" 
     data-x="4500" 
     data-y="0" 
     data-z="0"
     data-rotate-y="0">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 3</span>
    <span class="copilot-title">DefaultAgentInstructions</span>
  </div>
  
  <div class="code-context">
    <div class="file-tab">📄 defaultAgentInstructions.tsx</div>
    <pre class="code-block"><code>&lt;InstructionMessage&gt;
  &lt;Tag name='instructions'&gt;
    You are an expert AI programming assistant...
    
    &lt;Tag name='toolUseInstructions'&gt;
      When using a tool, follow the JSON schema...
    &lt;/Tag&gt;
    
    &lt;Tag name='notebookInstructions'&gt;
      Use run_notebook_cell instead of jupyter...
    &lt;/Tag&gt;
    
    &lt;Tag name='outputFormatting'&gt;
      Use proper Markdown formatting...
    &lt;/Tag&gt;
  &lt;/Tag&gt;
&lt;/InstructionMessage&gt;</code></pre>
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
      <strong>Tu copilot-instructions.md</strong> se inyecta aquí, 
      sumándose a estas instrucciones base.
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
</div>

<!-- ==========================================
     SLIDE 4: SYSTEM MESSAGE COMPLETO (Ensamblaje)
     ========================================== -->
<div id="assembly" class="step copilot-step" 
     data-x="6000" 
     data-y="0" 
     data-z="0"
     data-rotate-y="15">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 4</span>
    <span class="copilot-title">Ensamblaje del System Message</span>
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
        <span class="block-content">AnthropicSpecificRules</span>
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
        <span class="block-content">*.instructions.md (applyTo)</span>
        <span class="block-tokens">variable</span>
      </div>
    </div>
    <div class="assembly-arrow">↓</div>
    <div class="assembly-result">
      <span class="result-label">System Message Final</span>
      <span class="result-tokens">~2000-4000 tokens</span>
    </div>
  </div>
  
  <div class="mock-data-panel">
    <div class="mock-label">📦 Mock: Tu mensaje ensamblado</div>
    <div class="mock-system-message">
      <div class="msg-section">You are an expert AI programming assistant...</div>
      <div class="msg-section highlight-user">// Instrucciones Globales — Aleph Scriptorium</div>
      <div class="msg-section highlight-user">**Aleph Scriptorium** es un sistema de agentes...</div>
      <div class="msg-section">When using a tool, follow the JSON schema...</div>
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
</div>

<!-- ==========================================
     SLIDE 5: LLM (Envío al modelo)
     ========================================== -->
<div id="llm" class="step copilot-step" 
     data-x="7500" 
     data-y="0" 
     data-z="0"
     data-rotate-y="30">
  <div class="copilot-header">
    <span class="copilot-phase">Fase 5</span>
    <span class="copilot-title">Envío al LLM</span>
  </div>
  
  <div class="llm-request">
    <div class="request-box">
      <div class="request-header">
        <span class="request-icon">📤</span>
        <span class="request-title">API Request → Claude</span>
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
      </div>
    </div>
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
</div>

<!-- ==========================================
     SLIDE 6: OUTPUT (Respuesta)
     ========================================== -->
<div id="output" class="step copilot-step" 
     data-x="9000" 
     data-y="0" 
     data-z="0"
     data-rotate-y="45">
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
      <p>Encontré referencias en <code>ARCHIVO/marco/economia-digital.md</code>. Basándome en el marco teórico del Scriptorium...</p>
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
     SLIDE 7: OVERVIEW (Vista panorámica)
     ========================================== -->
<div id="overview-copilot" class="step" 
     data-x="4500" 
     data-y="0" 
     data-z="3000"
     data-scale="5">
  <div class="copilot-overview-card">
    <h2>🧠 El Viaje de tu Pregunta</h2>
    <p>Has navegado el flujo completo de Copilot Chat: desde tu prompt hasta la respuesta.</p>
    
    <div class="journey-complete">
      <div class="journey-step">
        <span class="step-num">1</span>
        <span class="step-name">Prompt</span>
      </div>
      <div class="journey-step">
        <span class="step-num">2</span>
        <span class="step-name">Registry</span>
      </div>
      <div class="journey-step">
        <span class="step-num">3</span>
        <span class="step-name">Agent</span>
      </div>
      <div class="journey-step">
        <span class="step-num">4</span>
        <span class="step-name">Instructions</span>
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
      </ul>
    </div>
    
    <div class="blueprint-toggle">
      <a href="{{ '/blueprint/' | relative_url }}" class="toggle-btn">📐 Vista UX</a>
      <a href="{{ '/blueprint-mmco/' | relative_url }}" class="toggle-btn">🧬 Vista MMCO</a>
      <span class="toggle-current">🧠 Vista Copilot</span>
    </div>
    
    <p class="copilot-footer">
      Basado en análisis de <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/CopilotEngine">CopilotEngine</a> · 
      <a href="{{ '/ecosistema/' | relative_url }}">Volver al Ecosistema →</a>
    </p>
  </div>
</div>
