---
layout: default
title: Noticias
permalink: /noticias/
---

# 📰 NOTICIAS

> **Análisis doctrinal de actualidad** — Método 5W + Banderas

---

## Collage Editorial

Las noticias del Scriptorium combinan **periodismo clásico** (5W: WHO, WHAT, WHERE, WHEN, WHY) con **auditoría doctrinal** (las 4 Banderas).

No son solo resúmenes: son **diagnósticos posicionados** que revelan el mecanismo oculto detrás de los hechos.

---

## Método: 5W + 4 Banderas

| Fase | Pregunta | Enfoque |
|------|----------|---------|
| **5W** | Los hechos | WHO, WHAT, WHERE, WHEN, WHY |
| 🔵 **Blueflag** | ¿Es verdad? | Contradicciones normativas, evidencia, falsificabilidad |
| ⚫ **Blackflag** | ¿Quién gana? | Mapa de poder, enemigos, sombras, captura |
| 🔴 **Redflag** | ¿Qué es lo material? | Base económica, recursos, viabilidad, escala |
| 🟡 **Yellowflag** | ¿Qué escapa al diseño? | Límites, condiciones vs contenido, inconmensurabilidad |

---

## Últimas Planas Publicadas

{% assign noticias = site.pages | where_exp: "page", "page.path contains 'ARCHIVO/NOTICIAS'" | sort: "date" | reverse %}

{% if noticias.size > 0 %}
<div class="news-grid">
{% for noticia in noticias limit:10 %}
  <div class="news-card">
    <h3><a href="{{ noticia.url }}">{{ noticia.title }}</a></h3>
    <p class="meta">{{ noticia.date | date: "%Y-%m-%d" }} · {{ noticia.bandera }}</p>
    <p>{{ noticia.excerpt | strip_html | truncatewords: 30 }}</p>
  </div>
{% endfor %}
</div>
{% else %}
<p><em>Las planas noticieras se gestionan en el repositorio y se publican periódicamente.</em></p>
{% endif %}

---

## Archivo Completo

Todas las noticias están disponibles en el repositorio:

→ **[ARCHIVO/NOTICIAS/](https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/NOTICIAS)**

Cada plana incluye:
- Conversación editorial completa (DISCO/)
- Análisis de las 4 Banderas
- Prompt de imagen conceptual
- Fuentes y referencias

---

## Presentación Estilizada

Para una experiencia de lectura tipo "periódico digital", ver:

→ **[Periódico (diseño editorial)]({{ site.baseurl }}/periodico/)**

---

<div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #333;">
  <a href="{{ site.baseurl }}/" style="color: #888;">← Volver a Aleph Scriptorium</a>
</div>
