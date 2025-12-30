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
    
    <!-- Blueprint Copilot -->
    <div class="iframe-card">
      <div class="iframe-header">
        <span class="iframe-title">🧠 Blueprint Copilot</span>
        <div class="iframe-actions">
          <a href="{{ site.baseurl }}/blueprint-copilot/" target="_blank">↗ Abrir</a>
        </div>
      </div>
      <div class="iframe-container">
        <iframe src="{{ site.baseurl }}/blueprint-copilot/" loading="lazy"></iframe>
      </div>
    </div>
    
    <!-- Blueprint PO (nuevo) -->
    <div class="iframe-card featured">
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
  { id: 'novelist-placeholder', url: 'http://localhost:8080', iframe: true }
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
