---
layout: obra
titulo: "Hola Mundo"
slug: hola-mundo
tipo: laboratorio
estado: registrada

descripcion: |
  Obra de demostración para el plugin AGENT_CREATOR.
  Primer despliegue de agente creado como personaje teatral.
  El Tarotista se presenta y demuestra sus capacidades.

personaje_guia: tarotista
taller_path: "../ARCHIVO/DISCO/TALLER/hola-mundo"

meta:
  autor: Aleph Scriptorium
  fecha_creacion: 2025-12-22
  duracion_estimada: "15-30 minutos"
  nivel: introductorio
  
escenas:
  - id: 1
    nombre: "Presentación"
    anillo: 0
    tipo: inicio
    descripcion: |
      El Tarotista se presenta y explica su rol: 
      auditor de demarcación científica.
    
  - id: 2
    nombre: "Tirada de cartas"
    anillo: 1
    tipo: prueba
    descripcion: |
      Usando metáforas del tarot, evalúa una propuesta 
      del usuario con criterios de demarcación.
    prueba:
      tarea: "El usuario propone una afirmación para evaluar"
      exito: "El Tarotista entrega su lectura completa"
    
  - id: 3
    nombre: "Lectura"
    anillo: 1
    tipo: cierre
    descripcion: |
      Entrega su análisis integrando Popper, Kuhn, 
      Feyerabend y los cuadrantes de Wilber.

permalink: /teatro/hola-mundo/
---

<!-- Este archivo es generado automáticamente desde ARCHIVO/DISCO/TALLER/hola-mundo/obra.yaml -->
<!-- El layout 'obra' (docs/_layouts/obra.html) maneja la visualización impress.js -->
