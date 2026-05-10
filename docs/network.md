---
layout: default
title: Red distribuida
description: Directorio técnico y operativo del ecosistema PUB + ROOMS del Scriptorium
permalink: /network/
---

<div class="home-page">
  <h1>Red distribuida del Scriptorium</h1>

  <p>
    Directorio de acceso al ecosistema <strong>layer 1</strong> y <strong>layer 2</strong> del
    Scriptorium: PUB Oasis/SSB, malla Rooms/Node-RED y la expansión técnica hacia
    <code>parlament</code>.
  </p>

  <blockquote>
    <p><strong>Layer 1</strong>: Oasis SSB Pub · replicación · invites · memoria append-only<br>
    <strong>Layer 2</strong>: Rooms · Socket.IO · Node-RED · dashboards · MCP · registry</p>
  </blockquote>

  <section class="home-section" style="margin-top:2rem;">
    <h2>// Acceso por capas</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 18%;">Capa</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Layer 1 · PUB</th>
          <td>
            <p>
              <a href="https://pub.escrivivir.co">
                <img src="{{ site.baseurl }}/assets/img/pub-subdominios/pub-escrivivir-co.png" alt="pub.escrivivir.co — Oasis SSB Pub">
              </a>
            </p>

            <p>
              <strong><a href="https://pub.escrivivir.co">pub.escrivivir.co</a></strong>
              · Nodo de replicación Oasis/SSB. Invites, PUB KEY y CONNECT para unirte a la red.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Ruta</th>
                  <th>Función</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="https://pub.escrivivir.co">/</a></td>
                  <td>Landing pública del pub</td>
                </tr>
                <tr>
                  <td><a href="https://pub.escrivivir.co/scriptorium/">/scriptorium/</a></td>
                  <td>Vestíbulo de salas layer2</td>
                </tr>
                <tr>
                  <td><a href="https://pub.escrivivir.co/admin/">/admin/</a></td>
                  <td>Panel local del pub</td>
                </tr>
                <tr>
                  <td><a href="https://pub.escrivivir.co/public/status">/public/status</a></td>
                  <td>Estado JSON del pub</td>
                </tr>
              </tbody>
            </table>

            <p>
              Repositorio operativo:
              <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/BlockchainComPort/OASIS_PUB"><code>BlockchainComPort/OASIS_PUB</code></a>
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row">Layer 2 · ROOMS</th>
          <td>
            <p>
              <a href="https://pub.escrivivir.co/scriptorium/">
                <img src="{{ site.baseurl }}/assets/img/pub-subdominios/rooms-scriptorium-escrivivir-co.png" alt="rooms.scriptorium.escrivivir.co — Node-RED mesh peer">
              </a>
            </p>

            <p>
              <strong><a href="https://rooms.scriptorium.escrivivir.co">rooms.scriptorium.escrivivir.co</a></strong>
              · Mesh peer Node-RED. Federación con bootstrap, HTTPS/WSS saliente y tooling alrededor del runtime.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Acceso</th>
                  <th>Función</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="https://scriptorium.escrivivir.co/red">scriptorium.escrivivir.co/red</a></td>
                  <td>Editor Node-RED público (read-only)</td>
                </tr>
                <tr>
                  <td><a href="https://scriptorium.escrivivir.co/ui">scriptorium.escrivivir.co/ui</a></td>
                  <td>Dashboard clásico (v1)</td>
                </tr>
                <tr>
                  <td><a href="https://scriptorium.escrivivir.co/dashboard">scriptorium.escrivivir.co/dashboard</a></td>
                  <td>Dashboard 2 (v2)</td>
                </tr>
                <tr>
                  <td><a href="https://admin.scriptorium.escrivivir.co">admin.scriptorium.escrivivir.co</a></td>
                  <td>Editor admin + projects</td>
                </tr>
                <tr>
                  <td><a href="https://rooms.scriptorium.escrivivir.co">rooms.scriptorium.escrivivir.co</a></td>
                  <td>Mesh peer Socket.IO</td>
                </tr>
                <tr>
                  <td><a href="https://mcp.scriptorium.escrivivir.co">mcp.scriptorium.escrivivir.co</a></td>
                  <td>MCP DevOps</td>
                </tr>
                <tr>
                  <td><a href="https://npm.scriptorium.escrivivir.co">npm.scriptorium.escrivivir.co</a></td>
                  <td>Verdaccio <code>@alephscript/*</code></td>
                </tr>
              </tbody>
            </table>

            <p>
              Manuales:
              <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/WiringEditor/NOD-RED-FED-NOTES/NOTA-AMIGO-DESDE-CERO.md">Desde cero</a>
              ·
              <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/WiringEditor/NOD-RED-FED-NOTES/NOTA-AMIGO-PEER-NODE-RED.md">Con Node-RED ya operativo</a>
              ·
              <a href="https://github.com/escrivivir-co/aleph-scriptorium/blob/main/WiringEditor/NOD-RED-FED-NOTES/NOTA-OWNER-RECORDATORIO.md">Owner / recordatorio</a>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="home-section">
    <h2>// Feature destacado</h2>
    <div class="product-cards">
      <div class="product-card">
        <h3><span class="icon">🏛️</span> Parlament</h3>
        <p>Expansión técnica del ecosistema: teatro layer2 sobre Oasis/SSB donde <strong>Casa Arrakis</strong> prepara, el <strong>MC</strong> conduce, el <strong>Elenco</strong> actúa, el <strong>Público</strong> empuja y el <strong>BOE</strong> cristaliza antes del retorno verificable a la red.</p>
        <p><code>ROOM</code> · <code>FIREHOSE</code> · <code>BOE</code> · <code>FUTURE-MACHINE</code></p>
        <a class="cta" href="https://pub.escrivivir.co/parlament/">Abrir landing parlament →</a>
      </div>
      <div class="product-card">
        <h3><span class="icon">🧭</span> Dossiers de ingeniería</h3>
        <p>La infraestructura actual no sale de la nada: está descrita en el dossier del VPS y en el puente layer2 que conecta la operación actual con la siguiente fase de rooms-ui, WebRTC y peer federation.</p>
        <ul>
          <li><a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/sala/dossiers/scriptorium-vps">Dossier Scriptorium VPS</a></li>
          <li><a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/sala/dossiers/dossier-layer2-bridge">Dossier Layer2 Bridge</a></li>
          <li><a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/BlockchainComPort/OASIS_PUB/site/parlament">Fuente de la landing Parlament</a></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="home-section">
    <h2>// Directorio técnico</h2>
    <table>
      <thead>
        <tr>
          <th>Subdominio</th>
          <th>Tecnología</th>
          <th>Acceso</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="https://pub.escrivivir.co">pub.escrivivir.co</a></td>
          <td>Oasis / SSB v0.7.4 · SHS · :8008</td>
          <td>Landing pública, invites, CONNECT, estado y vestíbulo</td>
        </tr>
        <tr>
          <td><a href="https://scriptorium.escrivivir.co/red">scriptorium.escrivivir.co</a></td>
          <td>Node-RED · :1880 · read-only</td>
          <td>Editor público y dashboards <a href="https://scriptorium.escrivivir.co/ui">v1</a> / <a href="https://scriptorium.escrivivir.co/dashboard">v2</a></td>
        </tr>
        <tr>
          <td><a href="https://admin.scriptorium.escrivivir.co">admin.scriptorium.escrivivir.co</a></td>
          <td>Node-RED admin · projects</td>
          <td>Editor con escritura y despliegue</td>
        </tr>
        <tr>
          <td><a href="https://rooms.scriptorium.escrivivir.co">rooms.scriptorium.escrivivir.co</a></td>
          <td>Socket.IO mesh · :3010</td>
          <td>Peer room runtime y federación</td>
        </tr>
        <tr>
          <td><a href="https://mcp.scriptorium.escrivivir.co">mcp.scriptorium.escrivivir.co</a></td>
          <td>Streamable HTTP MCP · :3003</td>
          <td>DevOps MCP expuesto por edge</td>
        </tr>
        <tr>
          <td><a href="https://npm.scriptorium.escrivivir.co">npm.scriptorium.escrivivir.co</a></td>
          <td>Verdaccio · :4873</td>
          <td>Registry público <code>@alephscript/*</code></td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="home-section">
    <h2>// Navegación relacionada</h2>
    <nav class="home-nav">
      <a href="{{ site.baseurl }}/" class="nav-card">
        <span class="card-icon">ℵ</span>
        <span class="card-title">Inicio</span>
        <span class="card-desc">Portada reorganizada</span>
      </a>
      <a href="{{ site.baseurl }}/scriptorium-v1/" class="nav-card">
        <span class="card-icon">🗃️</span>
        <span class="card-title">Scriptorium v1</span>
        <span class="card-desc">Índice archivado</span>
      </a>
      <a href="{{ site.baseurl }}/ecosistema/" class="nav-card">
        <span class="card-icon">🧬</span>
        <span class="card-title">Ecosistema</span>
        <span class="card-desc">Submódulos, plugins y agentes</span>
      </a>
      <a href="{{ site.baseurl }}/roadmap/" class="nav-card">
        <span class="card-icon">🗺️</span>
        <span class="card-title">Roadmap</span>
        <span class="card-desc">De Aleph a Euler</span>
      </a>
    </nav>
  </section>
</div>
