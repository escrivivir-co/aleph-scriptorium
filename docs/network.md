---
layout: default
title: Red distribuida
description: Directorio técnico y operativo del ecosistema PUB + ROOMS del Scriptorium
permalink: /network/
---

<div class="home-page" markdown="1">

# Red distribuida del Scriptorium

Directorio de acceso al ecosistema **layer 1** y **layer 2** del Scriptorium: PUB Oasis/SSB, malla Rooms/Node-RED y la expansión técnica hacia `parlament`.

> **Layer 1**: Oasis SSB Pub · replicación · invites · memoria append-only  
> **Layer 2**: Rooms · Socket.IO · Node-RED · dashboards · MCP · registry

<section class="home-section" style="margin-top:2rem;">
<h2>// Acceso por capas</h2>
<table>
<tr>
<td width="50%">

[![pub.escrivivir.co — Oasis SSB Pub]({{ site.baseurl }}/assets/img/pub-subdominios/pub-escrivivir-co.png)](https://pub.escrivivir.co)

### Layer 1 · PUB

**[pub.escrivivir.co](https://pub.escrivivir.co)** · Nodo de replicación Oasis/SSB. Invites, PUB KEY y CONNECT para unirte a la red.

| Ruta | Función |
|---|---|
| [/](https://pub.escrivivir.co) | Landing pública del pub |
| [/scriptorium/](https://pub.escrivivir.co/scriptorium/) | Vestíbulo de salas layer2 |
| [/admin/](https://pub.escrivivir.co/admin/) | Panel local del pub |
| [/public/status](https://pub.escrivivir.co/public/status) | Estado JSON del pub |

Repositorio operativo: [`BlockchainComPort/OASIS_PUB`](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/BlockchainComPort/OASIS_PUB)

</td>
<td width="50%">

[![rooms.scriptorium.escrivivir.co — Node-RED mesh peer]({{ site.baseurl }}/assets/img/pub-subdominios/rooms-scriptorium-escrivivir-co.png)](https://pub.escrivivir.co/scriptorium/)

### Layer 2 · ROOMS

**[rooms.scriptorium.escrivivir.co](https://rooms.scriptorium.escrivivir.co)** · Mesh peer Node-RED. Federación con bootstrap, HTTPS/WSS saliente y tooling alrededor del runtime.

| Acceso | Función |
|---|---|
| [scriptorium.escrivivir.co/red](https://scriptorium.escrivivir.co/red) | Editor Node-RED público (read-only) |
| [scriptorium.escrivivir.co/ui](https://scriptorium.escrivivir.co/ui) | Dashboard clásico (v1) |
| [scriptorium.escrivivir.co/dashboard](https://scriptorium.escrivivir.co/dashboard) | Dashboard 2 (v2) |
| [admin.scriptorium.escrivivir.co](https://admin.scriptorium.escrivivir.co) | Editor admin + projects |
| [rooms.scriptorium.escrivivir.co](https://rooms.scriptorium.escrivivir.co) | Mesh peer Socket.IO |
| [mcp.scriptorium.escrivivir.co](https://mcp.scriptorium.escrivivir.co) | MCP DevOps |
| [npm.scriptorium.escrivivir.co](https://npm.scriptorium.escrivivir.co) | Verdaccio `@alephscript/*` |

Manuales: [Desde cero](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/WiringEditor/NOD-RED-FED-NOTES/NOTA-AMIGO-DESDE-CERO.md) · [Con Node-RED ya operativo](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/WiringEditor/NOD-RED-FED-NOTES/NOTA-AMIGO-PEER-NODE-RED.md) · [Owner / recordatorio](https://github.com/escrivivir-co/aleph-scriptorium/blob/main/WiringEditor/NOD-RED-FED-NOTES/NOTA-OWNER-RECORDATORIO.md)

</td>
</tr>
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
  <td>Registry público `@alephscript/*`</td>
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
