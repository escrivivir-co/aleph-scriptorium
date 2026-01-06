---
layout: default
title: Demo Gallery
description: Panel de control para demos del Scriptorium
permalink: /demo/
---

<style>
/* Demo Gallery Styles */
.demo-gallery {
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 2rem;
}

.demo-header h1 {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.demo-header .tagline {
  color: #3b82f6;
  font-size: 1.2rem;
}

.demo-status {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #a0a0a0;
}

.status-badge.active {
  border-color: #22c55e;
  color: #22c55e;
}

.status-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

/* Grid de iframes */
.iframe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-flow: row dense;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.iframe-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.iframe-card:hover {
  border-color: #3b82f6;
}

.iframe-card.featured {
  grid-column: 1 / -1;
}

.iframe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #0f0f0f;
  border-bottom: 1px solid #333;
}

.iframe-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #fff;
}

.iframe-actions {
  display: flex;
  gap: 0.5rem;
}

.iframe-actions a {
  padding: 0.25rem 0.5rem;
  background: #333;
  border-radius: 4px;
  color: #a0a0a0;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.iframe-actions a:hover {
  background: #3b82f6;
  color: #fff;
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: #000;
}

.iframe-card.featured .iframe-container {
  height: 500px;
}

.iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.iframe-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  text-align: center;
  padding: 2rem;
}

.iframe-placeholder .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.iframe-placeholder p {
  margin: 0.5rem 0;
}

.iframe-placeholder code {
  background: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

/* Sección de instrucciones */
.demo-instructions {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.demo-instructions h2 {
  color: #fff;
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.demo-instructions ol {
  color: #a0a0a0;
  line-height: 1.8;
}

.demo-instructions code {
  background: #333;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #3b82f6;
}

/* Responsive */
@media (max-width: 900px) {
  .iframe-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="demo-gallery">
  <div class="demo-header">
    <h1>🎬 Demo Gallery</h1>
    <p class="tagline">Panel de control para demos del Aleph Scriptorium</p>
  </div>
  
  <div class="demo-status">
    <span class="status-badge">
      <span class="dot"></span>
      Jekyll :4000
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      Launcher :3050
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      Zeus :3012
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      Novelist :8080
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      TypedPrompts :3019
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      Prolog :5001
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      Swagger :3021
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      AsyncAPI :3022
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      Node-RED :1880
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      Blockly :4200
    </span>
    <span class="status-badge">
      <span class="dot"></span>
      Inspector :6274
    </span>
  </div>
  
  <div class="iframe-grid">
    
    <!-- Index GH-Pages -->
    <div class="iframe-card featured">
      <div class="iframe-header">
        <span class="iframe-title">🏠 Index GH-Pages</span>
        <div class="iframe-actions">
          <a href="{{ site.baseurl }}/" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <iframe src="{{ site.baseurl }}/" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Zeus Presets -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">⚡ Zeus Presets</span>
        <div class="iframe-actions">
          <a href="http://localhost:3012" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="zeus-placeholder">
          <span class="icon">⚡</span>
          <p>Zeus MCP Server</p>
          <p><code>localhost:3012</code></p>
          <p>Ejecuta: <code>npm run start:zeus</code></p>
        </div>
        <iframe src="http://localhost:3012/editor" loading="lazy"></iframe> 
      </div>
    </div>
    
    <!-- Novelist -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">📝 Novelist Editor</span>
        <div class="iframe-actions">
          <a href="http://localhost:8080" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="novelist-placeholder">
          <span class="icon">📝</span>
          <p>Novelist Editor</p>
          <p><code>localhost:8080</code></p>
          <p>Ejecuta: <code>npm start</code> en NovelistEditor/</p>
        </div>
        <iframe src="http://localhost:8080" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- ═══════════════ EDITORES LÓGICOS ═══════════════ -->
    
    <!-- TypedPromptsEditor -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🧠 TypedPrompts Editor</span>
        <div class="iframe-actions">
          <a href="http://localhost:3019" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="typed-placeholder">
          <span class="icon">🧠</span>
          <p>TypedPrompts Editor</p>
          <p><code>localhost:3019</code></p>
          <p>Ejecuta: <code>npm run dev</code> en TypedPromptsEditor/</p>
        </div>
        <iframe src="http://localhost:3019" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- PrologEditor -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🔬 Prolog Editor</span>
        <div class="iframe-actions">
          <a href="http://localhost:5001" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="prolog-placeholder">
          <span class="icon">🔬</span>
          <p>Prolog Editor (Angular)</p>
          <p><code>localhost:5001</code></p>
          <p>Ejecuta: <code>npm run start:frontend</code> en PrologEditor/</p>
        </div>
        <iframe src="http://localhost:5001" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- ═══════════════ API SPECS ═══════════════ -->
    
    <!-- Swagger UI (OpenAPI) -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">📋 Swagger UI (OpenAPI)</span>
        <div class="iframe-actions">
          <a href="http://localhost:3021" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="swagger-placeholder">
          <span class="icon">📋</span>
          <p>Swagger UI (REST API)</p>
          <p><code>localhost:3021</code></p>
          <p>Ejecuta: <code>npx @redocly/cli preview-docs</code></p>
        </div>
        <iframe src="http://localhost:3021" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- AsyncAPI Studio -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🔌 AsyncAPI Studio</span>
        <div class="iframe-actions">
          <a href="http://localhost:3022" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="asyncapi-placeholder">
          <span class="icon">🔌</span>
          <p>AsyncAPI Studio</p>
          <p><code>localhost:3022</code></p>
          <p>Ejecuta: <code>npx @asyncapi/cli start studio</code></p>
        </div>
        <iframe src="http://localhost:3022" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- ═══════════════ MCP INSPECTOR ═══════════════ -->
    
    <!-- MCP Inspector -->
    <div class="iframe-card featured">
      <div class="iframe-header">
        <span class="iframe-title">🔍 MCP Inspector</span>
        <div class="iframe-actions">
          <a href="http://localhost:6274" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="inspector-placeholder">
          <span class="icon">🔍</span>
          <p>MCP Inspector</p>
          <p><code>localhost:6274</code></p>
          <p>Ejecuta: Task <code>INS: Start [Inspector]</code></p>
        </div>
        <iframe src="http://localhost:6274" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- ═══════════════ WIRING EDITORS (Node-RED) ═══════════════ -->
    
    <!-- Node-RED Editor -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🔗 Node-RED Editor</span>
        <div class="iframe-actions">
          <a href="http://localhost:1880" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="nodered-placeholder">
          <span class="icon">🔗</span>
          <p>Node-RED Flow Editor</p>
          <p><code>localhost:1880</code></p>
          <p>Ejecuta: <code>node-red</code> o Task: NRE: Start [Editor]</p>
        </div>
        <iframe src="http://localhost:1880" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Node-RED Dashboard -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🎮 Node-RED Dashboard</span>
        <div class="iframe-actions">
          <a href="http://localhost:1880/ui" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="nodered-ui-placeholder">
          <span class="icon">🎮</span>
          <p>Node-RED Dashboard UI</p>
          <p><code>localhost:1880/ui</code></p>
          <p>Requiere: Flow desplegado con nodos Dashboard</p>
        </div>
        <iframe src="http://localhost:1880/ui" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- ═══════════════ BLOCKLY EDITOR ═══════════════ -->
    
    <!-- Blockly Editor -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🧩 Blockly Editor</span>
        <div class="iframe-actions">
          <a href="http://localhost:4200" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="blockly-placeholder">
          <span class="icon">🧩</span>
          <p>Blockly Visual Programming</p>
          <p><code>localhost:4200</code></p>
          <p>Ejecuta: <code>npm run dev:ui</code> o Task: BLE: Start [Editor]</p>
        </div>
        <iframe src="http://localhost:4200" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Blockly Runtime -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">▶️ Blockly Runtime</span>
        <div class="iframe-actions">
          <a href="http://localhost:5000" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <div class="iframe-placeholder" id="blockly-runtime-placeholder">
          <span class="icon">▶️</span>
          <p>Blockly Runtime Execution</p>
          <p><code>localhost:5000</code></p>
          <p>Ejecuta: <code>npm run dev:runtime</code> o Task: BLE: Start [Runtime]</p>
        </div>
        <iframe src="http://localhost:5000" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- ═══════════════ BLUEPRINTS ═══════════════ -->
    
    <!-- Blueprint UX -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">📐 Blueprint UX</span>
        <div class="iframe-actions">
          <a href="{{ site.baseurl }}/blueprint/" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <iframe src="{{ site.baseurl }}/blueprint/" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Blueprint MMCO -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🧬 Blueprint MMCO</span>
        <div class="iframe-actions">
          <a href="{{ site.baseurl }}/blueprint-mmco/" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <iframe src="{{ site.baseurl }}/blueprint-mmco/" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Blueprint Copilot (+ Self-Reflection subcubo) -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🧠 Blueprint Copilot + Self-Reflection</span>
        <div class="iframe-actions">
          <a href="{{ site.baseurl }}/blueprint-copilot/" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <iframe src="{{ site.baseurl }}/blueprint-copilot/" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Blueprint PO (nuevo) -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🎤 Blueprint PO Showcase</span>
        <div class="iframe-actions">
          <a href="{{ site.baseurl }}/blueprint-po/" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <iframe src="{{ site.baseurl }}/blueprint-po/" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Blueprint Release Party (DEMO-1.0.0) -->
    <div class="iframe-card featured">
      <div class="iframe-header">
        <span class="iframe-title">🎉 Release Party - Monomito de Clippy</span>
        <div class="iframe-actions">
          <a href="{{ site.baseurl }}/blueprint-release-party/" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <iframe src="{{ site.baseurl }}/blueprint-release-party/" loading="lazy"></iframe>
      </div>
    </div>
    
  </div>
  
  <div class="demo-instructions">
    <h2>🚀 Cómo usar</h2>
    <ol>
      <li>Abre VS Code con el workspace del Scriptorium</li>
      <li>Ejecuta el comando <code>AlephScript Demo: ▶️ Run All Demo Servers</code> desde la paleta (Cmd+Shift+P)</li>
      <li>Espera ~30 segundos a que todos los servidores arranquen</li>
      <li>Refresca esta página para ver los iframes activos</li>
      <li>Para detener: <code>AlephScript Demo: ⏹️ Stop All Demo Servers</code></li>
    </ol>
  </div>
</div>

<script>
// Auto-check server status
const servers = [
  { id: 'zeus-placeholder', url: 'http://localhost:3012', iframe: true },
  { id: 'novelist-placeholder', url: 'http://localhost:8080', iframe: true },
  // Editores Lógicos (DS-S02)
  { id: 'typed-placeholder', url: 'http://localhost:3019', iframe: true },
  { id: 'prolog-placeholder', url: 'http://localhost:5001', iframe: true },
  // API Specs (OpenAsyncAPI Editor)
  { id: 'swagger-placeholder', url: 'http://localhost:3021', iframe: true },
  { id: 'asyncapi-placeholder', url: 'http://localhost:3022', iframe: true },
  // MCP Inspector
  { id: 'inspector-placeholder', url: 'http://localhost:6274', iframe: true },
  // Wiring Editors (Node-RED)
  { id: 'nodered-placeholder', url: 'http://localhost:1880', iframe: true },
  { id: 'nodered-ui-placeholder', url: 'http://localhost:1880/ui', iframe: true }
];

async function checkServer(server) {
  try {
    const response = await fetch(server.url, { mode: 'no-cors', timeout: 2000 });
    // If fetch doesn't throw, server might be up
    const placeholder = document.getElementById(server.id);
    if (placeholder && server.iframe) {
      const container = placeholder.parentElement;
      placeholder.style.display = 'none';
      const iframe = document.createElement('iframe');
      iframe.src = server.url;
      iframe.loading = 'lazy';
      container.appendChild(iframe);
    }
  } catch (e) {
    // Server not available
  }
}

// Check on load
window.addEventListener('load', () => {
  servers.forEach(checkServer);
});
</script>
