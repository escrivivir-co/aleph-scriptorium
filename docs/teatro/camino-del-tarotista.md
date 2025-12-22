---
layout: obra
titulo: "El Camino del Tarotista"
slug: camino-del-tarotista
tipo: onboarding
estado: en_escena

descripcion: |
  El Tarotista guía al visitante a través de las features del Scriptorium.
  Cada estadio es una prueba práctica (vestíbulo, cartas-puerta, enciclopedia,
  periódico, scraping, agentes, tablero ARG, banderas, publicación y contribución).

personaje_guia: tarotista
taller_path: "../ARCHIVO/DISCO/TALLER/camino-del-tarotista"

meta:
  autor: Aleph Scriptorium
  fecha_creacion: 2025-12-22
  duracion_estimada: "2-3 horas"
  nivel: introductorio

escenas:
  - id: 1
    nombre: "El Vestíbulo"
    anillo: 0
    tipo: inicio
    descripcion: "Reconocer el vestíbulo y elegir la carta-puerta adecuada."
    feature: "@vestibulo, @cartaspuerta"
    contenido_ref: escenas/01-vestibulo.md
  - id: 2
    nombre: "La Biblioteca"
    anillo: 1
    tipo: encuentro
    descripcion: "Consultar un tomo enciclopédico desde el plugin Enciclopedia."
    feature: "@plugin_ox_enciclopedia"
    contenido_ref: escenas/02-biblioteca.md
  - id: 3
    nombre: "La Hemeroteca"
    anillo: 1
    tipo: prueba
    descripcion: "Producir una nota con método 5W + Banderas usando @periodico."
    feature: "@periodico"
    contenido_ref: escenas/03-hemeroteca.md
  - id: 4
    nombre: "El Scriptorium"
    anillo: 1
    tipo: mentor
    descripcion: "Conocer a los 5 auditores (Banderas) y cuándo invocarlos."
    feature: "@blueflag, @blackflag, @redflag, @yellowflag, @orangeflag"
    contenido_ref: escenas/04-scriptorium.md
  - id: 5
    nombre: "El Foro"
    anillo: 2
    tipo: umbral
    descripcion: "Descargar material externo con Foro Scraper."
    feature: "@plugin_ox_foroscraper"
    contenido_ref: escenas/05-foro.md
  - id: 6
    nombre: "El Laboratorio"
    anillo: 2
    tipo: aliados
    descripcion: "Crear un agente especializado con Agent Creator."
    feature: "@plugin_ox_agentcreator"
    contenido_ref: escenas/06-laboratorio.md
  - id: 7
    nombre: "El Teatro"
    anillo: 2
    tipo: cueva
    descripcion: "Desplegar un personaje en el tablero ARG."
    feature: "@plugin_ox_argboard"
    contenido_ref: escenas/07-teatro.md
  - id: 8
    nombre: "La Ordalía"
    anillo: 2
    tipo: ordalia
    descripcion: "Auditar una propuesta con las 5 Banderas."
    feature: "Método de auditoría (5 banderas)"
    contenido_ref: escenas/08-ordalia.md
  - id: 9
    nombre: "La Publicación"
    anillo: 3
    tipo: recompensa
    descripcion: "Publicar en GitHub Pages usando GH-Pages."
    feature: "@plugin_ox_ghpages"
    contenido_ref: escenas/09-publicacion.md
  - id: 10
    nombre: "El Mapa"
    anillo: 3
    tipo: retorno
    descripcion: "Leer el roadmap y ubicar siguientes features."
    feature: "docs/roadmap.md"
    contenido_ref: escenas/10-mapa.md
  - id: 11
    nombre: "La Integración"
    anillo: 3
    tipo: resurreccion
    descripcion: "Entender el flujo DISCO → ARCHIVO → Web."
    feature: "docs/archivo.md"
    contenido_ref: escenas/11-integracion.md
  - id: 12
    nombre: "El Elixir"
    anillo: 3
    tipo: elixir
    descripcion: "Proponer una contribución al proyecto."
    feature: "CONTRIBUTING.md"
    contenido_ref: escenas/12-elixir.md

permalink: /teatro/camino-del-tarotista/
---

<!-- Generado a partir de ARCHIVO/DISCO/TALLER/camino-del-tarotista/obra.yaml -->
<!-- El layout 'obra' renderiza las escenas mediante impress.js -->
