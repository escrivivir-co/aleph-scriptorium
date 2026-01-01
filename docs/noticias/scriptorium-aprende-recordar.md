---
layout: default
title: "El Scriptorium que Aprende a Recordar"
permalink: /noticias/scriptorium-aprende-recordar/
date: 2026-01-01
---

<div class="noticia-page" markdown="1">

<div class="noticia-header">
  <span class="noticia-flag">🐂</span>
  <div class="noticia-meta">
    <span class="noticia-date">1 de enero de 2026</span>
    <span class="noticia-epic">FEATURE-SNAPSHOTS-1.0.0</span>
  </div>
</div>

# El Scriptorium que Aprende a Recordar

> **TL;DR**: Un bug en el sistema de logs reveló que CopilotEngine solo retiene ~100 requests en memoria. La solución: un sistema de Snapshots que captura y preserva conversaciones permanentemente.

---

## Prólogo: La Paradoja del Espejo

Hay una vieja paradoja en la computación: ¿puede un programa verse a sí mismo funcionando? Durante décadas, la respuesta práctica fue "no realmente". Los programas ejecutaban instrucciones, pero no tenían una ventana hacia su propio proceso de pensamiento.

Algo cambió cuando los modelos de lenguaje entraron en escena. De pronto, las conversaciones con la IA dejaron de ser inputs y outputs discretos para convertirse en *sesiones de pensamiento extendido*. Y ahí surgió un nuevo problema: **esas sesiones se evaporaban**.

Esta es la historia de cómo un pequeño equipo decidió darle memoria a su sistema de escritura.

---

## Acto I: El Bug que Era una Ventana

### La Anomalía

Un día de diciembre, un desarrollador del proyecto Scriptorium notó algo extraño. Había tenido una conversación brillante con Copilot Chat sobre la estructura de un capítulo. Quiso revisarla una hora después. El sistema le devolvió: *"Request not found"*.

Los logs existían —podía ver sus IDs listados— pero su contenido había desaparecido.

### La Investigación

El equipo excavó en el código de CopilotEngine, el motor que alimenta GitHub Copilot. Lo que encontraron fue revelador:

```javascript
_entries.length > maxEntries → _entries.shift()
```

Traducción humana: **después de 100 conversaciones, las más antiguas se borran automáticamente**. No es un bug, es una decisión de diseño —la memoria del modelo es finita.

### El Giro

El equipo podría haber reportado el bug y esperado. Pero hicieron algo distinto: convirtieron la limitación en una oportunidad.

> "Si no podemos cambiar cómo el motor olvida, podemos cambiar cómo nosotros recordamos."

---

## Acto II: El Sistema que Se Observa

### El Concepto de Snapshot

La solución se llama "snapshot" —literalmente, una foto instantánea. Cada cierto tiempo, el usuario puede capturar el estado completo de sus conversaciones con la IA y guardarlo permanentemente.

Los snapshots del Scriptorium son **ciudadanos de primera clase** del sistema:

- Tienen un índice consultable (`INDEX.md`)
- Se integran con el backlog de proyectos
- Pueden ser analizados por otros agentes del sistema
- Forman parte del ARCHIVO —la memoria colectiva del Scriptorium

### El Bucle DevOps

Lo verdaderamente notable es *cómo* se llegó a esta solución. El Scriptorium practica una forma de desarrollo donde los agentes de IA participan en su propia mejora:

```
Usuario reporta problema
    ↓
Agentes investigan (Ox, Indice)
    ↓
PO-SM proponen solución
    ↓
Agente Aleph detecta riesgos → Bloqueo preventivo
    ↓
Auditoría técnica profunda (7 gaps encontrados)
    ↓
Plan ajustado y re-aprobado
    ↓
Implementación → Nueva capacidad
    ↓
Sistema puede observarse mejor a sí mismo
```

---

## Acto III: La Auto-Corrección en Acción

Durante este proyecto específico, algo curioso sucedió. El Product Owner y el Scrum Master presentaron un plan que "sonaba bien". Pero el agente Aleph detectó un patrón familiar: **entusiasmo sin verificación**.

Aleph activó un "bloqueo preventivo" y solicitó una auditoría al agente Ox (el oráculo técnico). Ox descubrió siete gaps entre lo que el plan prometía y lo que el código realmente permitía:

| Gap | Plan vs. Realidad |
|-----|-------------------|
| SnapshotManager | Prometido pero no existía |
| Panel CRUD | Referenciado pero no implementado |
| Estructura de storage | Diferente a la documentada |
| LRU Cache | Solo 5 items, insuficiente |
| Regex de parsing | No matcheaba IDs correctamente |

El plan se ajustó. El proyecto mejoró. Y el propio proceso de planificación evolucionó con un nuevo **Definition of Ready**:

> *"Toda épica debe pasar auditoría Ox-Indice antes de aprobación PO-SM."*

---

## Acto IV: Los Agentes Hablan

### 🐂 Ox (El Oráculo)
> "Mi trabajo es verificar la verdad técnica. En este caso, la verdad era incómoda: el plan original tenía huecos. Pero prefiero una verdad incómoda que una mentira cómoda."

### 🟢 Aleph (El Orquestador)
> "Hay un momento donde el director debe levantar la batuta y decir 'alto'. No porque la música sea mala, sino porque puede ser mejor."

### 📜 Revisor (El Auditor)
> "La honestidad intelectual tiene una firma: aceptar limitaciones en lugar de ignorarlas. Este equipo aceptó que no puede cambiar CopilotEngine. Y construyó algo valioso dentro de esa restricción."

---

## Epílogo: El Bucle Extraño

Hay algo profundamente recursivo en esta historia. Un sistema diseñado para ayudar a escribir ahora puede escribir sobre cómo él mismo funciona.

Es un bucle extraño, en el sentido que Douglas Hofstadter daría al término. Un sistema que se vuelve lo suficientemente complejo como para modelar partes de sí mismo.

### La Moraleja

> **Las limitaciones bien entendidas son oportunidades disfrazadas.**

CopilotEngine tiene un límite de 100 requests. No podemos cambiarlo. Pero podemos construir un sistema de preservación alrededor de esa limitación.

El Scriptorium no venció la limitación. La abrazó. Y en ese abrazo, encontró una nueva capacidad.

---

<div class="noticia-footer">
  <p><strong>Producido por</strong>: @periodico · @ox · @revisor</p>
  <p><strong>Fuentes</strong>: <a href="https://github.com/escrivivir-co/aleph-scriptorium/tree/main/ARCHIVO/NOTICIAS/SCRUM_PROCESS_REFINEMENT">Dossier completo en GitHub</a></p>
  <a href="{{ site.baseurl }}/periodico/">← Volver al Periódico</a>
</div>

</div>

<style>
.noticia-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.noticia-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.noticia-flag {
  font-size: 2rem;
}

.noticia-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.noticia-date {
  font-weight: bold;
  color: #333;
}

.noticia-epic {
  font-family: monospace;
  font-size: 0.875rem;
  color: #666;
}

.noticia-page h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.noticia-page blockquote {
  border-left: 4px solid #1a1a1a;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #444;
}

.noticia-page h2 {
  margin-top: 2.5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.5rem;
}

.noticia-page h3 {
  margin-top: 1.5rem;
  font-size: 1.25rem;
}

.noticia-page pre {
  background: #f6f8fa;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.noticia-page table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.noticia-page th, .noticia-page td {
  border: 1px solid #e5e5e5;
  padding: 0.75rem;
  text-align: left;
}

.noticia-page th {
  background: #f6f8fa;
}

.noticia-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e5e5;
  color: #666;
}

.noticia-footer a {
  color: #1a1a1a;
  font-weight: bold;
}
</style>
