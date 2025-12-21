---
layout: default
title: Inicio
---

# Aleph Scriptorium

> *El taller de escritura donde la IA trabaja para ti, no al revés.*

Bienvenido al sitio web del proyecto **Aleph Scriptorium**, un sistema de escritura asistida por IA para proyectos de largo aliento.

---

## Contenido

### 📰 Noticias

Planas noticieras producidas con el método 5W + Banderas.

{% if site.posts.size > 0 %}
<ul class="post-list">
{% for post in site.posts limit:5 %}
  <li>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d/%m/%Y" }}</time>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    {% if post.perfil %}<span class="perfil perfil-{{ post.perfil }}">{{ post.perfil }}</span>{% endif %}
  </li>
{% endfor %}
</ul>
<p><a href="{{ site.baseurl }}/noticias/">Ver todas las noticias →</a></p>
{% else %}
<p><em>Aún no hay noticias publicadas.</em></p>
{% endif %}

---

### 📚 Fundación

Texto fundacional serializado en 12 capítulos (2026).

{% if site.capitulos.size > 0 %}
<ul>
{% assign caps = site.capitulos | sort: 'nav_order' %}
{% for cap in caps %}
  <li><a href="{{ cap.url | relative_url }}">{{ cap.title }}</a></li>
{% endfor %}
</ul>
{% else %}
<p><em>Los capítulos se publicarán durante 2026.</em></p>
{% endif %}

---

### 🗂️ Archivo

Base de conocimiento doctrinal del proyecto.

- [Marco conceptual]({{ site.baseurl }}/archivo/marco/) — Herramientas para diseño político
- [Diagnóstico]({{ site.baseurl }}/archivo/diagnostico/) — Estado de la cuestión
- [Justificación]({{ site.baseurl }}/archivo/justificacion/) — Por qué este proyecto

---

## Sobre el proyecto

Aleph Scriptorium es un **framework de escritura asistida por IA** que demuestra cómo usar inteligencia artificial como herramienta de amplificación intelectual, no como sustituto del pensamiento.

**Fundación** es el proyecto de demostración: un texto político serializado en 12 capítulos que aspira a ser una síntesis operativa del pensamiento constitucional, contractual y materialista.

[Leer más en GitHub →]({{ site.repository }})

---

## Enlaces

- [Repositorio en GitHub]({{ site.repository }})
- [README del proyecto]({{ site.repository }}/blob/main/README.md)
- [Bitácora VibeBitacora](https://escrivivir.co/aleph-scriptorium-vibe-bitacora-projects-fundacion-un-e-libro/)
