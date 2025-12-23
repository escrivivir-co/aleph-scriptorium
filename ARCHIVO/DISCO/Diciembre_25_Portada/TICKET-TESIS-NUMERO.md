# Ticket de Tarea: Actualización de Tesis del Número en Periódico Diciembre 2025

> **ID**: GHPAGES-1.0.0-T001  
> **Estado**: ⏳ Pendiente de decisión editorial  
> **Prioridad**: Alta  
> **Fecha**: 2025-12-23  
> **Asignado a**: Usuario (con asistencia de @orangeflag + @aleph)

---

## Resumen Ejecutivo

Actualizar la sección "Tesis del número" en [docs/periodico.md](docs/periodico.md) con la versión refinada desarrollada en las **dos sesiones editoriales** documentadas en esta carpeta (01_Cabecera.md y 02_Pie.md).

---

## Archivos a Modificar

| Archivo | Secciones | Líneas aprox. |
|---------|-----------|---------------|
| `docs/periodico.md` | `<div class="periodico-headline">` | ~15-20 |
| `docs/periodico.md` | `<div class="periodico-thesis">` | ~95-110 |

---

## Material Fuente (Sesiones Editoriales)

### Sesión 1: Cabecera (01_Cabecera.md)
- **Participantes**: @ox, @aleph, @blueflag, @blackflag, @redflag, @yellowflag, @orangeflag
- **Aportación clave**: Nuevo titular poético + subtítulo dialéctico

### Sesión 2: Pie (02_Pie.md)
- **Participantes**: Los mismos + @tarotista, @nonsi (personajes del Teatro)
- **Aportación clave**: Expansión de 3 a 5 tesis (añadir tesis 0 y tesis 4)

---

## Propuestas a Decidir

### A. CABECERA — Titular

| Opción | Contenido | Registro |
|--------|-----------|----------|
| **Actual** | «La verdad ya no es un dato: es un campo de batalla donde instituciones, infraestructuras y lenguajes compiten por definir qué cuenta como real.» | Dialéctico |
| **Propuesta A** | «Han capturado las palabras. Lo que llaman paz es intervención; lo que llaman seguridad es barrera de entrada; lo que llaman ciencia es policía de estatus.» | Poético |
| **Propuesta B** | «Han capturado las palabras.» (titular corto) + subtítulo dialéctico expandido | Mixto |

### B. PIE — Tesis del Número

| Opción | Nº de tesis | Cambio principal |
|--------|-------------|------------------|
| **Actual** | 3 tesis | Diagnóstico convergente |
| **Propuesta 5T** | 5 tesis | Añadir tesis 0 (posición) y tesis 4 (interior) |
| **Propuesta 3T+** | 3 tesis refinadas | Mantener estructura, refinar contenido |

---

## Contenido de las Propuestas

### Opción 5T (Recomendada por las sesiones)

```html
<div class="periodico-thesis">
  <h3>// diagnóstico convergente (5 tesis)</h3>
  <ol start="0">
    <li><strong>Hay un conflicto entre quienes se benefician de la captura y quienes la sufren.</strong> Este diagnóstico está escrito desde el bando de los que sufren. No pretendemos neutralidad; pretendemos rigor.</li>
    <li><strong>Las instituciones de verdad funcionan como infraestructura de poder cuando el costo de verificación es alto y el acceso está concentrado.</strong> El Nobel, OpenAI y los foros de internet ejemplifican este mecanismo.</li>
    <li><strong>La captura no es frontal; es semántica e infraestructural.</strong> Controlar los canales permite redefinir las palabras. No prohíben: redefinen. No censuran: desplazan lo decible.</li>
    <li><strong>La defensa requiere arquitectura en capas, con mecanismos anticaptura explícitos.</strong> Rotación, transparencia, validación externa, declaración de sacrificios. Sin estos, la defensa se convierte en lo que combate.</li>
    <li><strong>La captura no es solo institucional; es también subjetiva y cultural.</strong> La defensa requiere prácticas de desintoxicación: detectar la mentira interiorizada, recuperar capacidad de imaginar alternativas.</li>
  </ol>
</div>
```

### Opción 3T+ (Refinamiento conservador)

```html
<div class="periodico-thesis">
  <h3>// diagnóstico convergente</h3>
  <ol>
    <li><strong>Las instituciones de verdad funcionan como infraestructura de poder cuando el costo de verificación es alto y el acceso está concentrado.</strong> El Nobel legitima guerras; OpenAI usa "safety" como barrera de entrada; el foro usa "falsabilidad" como veto social.</li>
    <li><strong>La captura no es frontal; es semántica e infraestructural.</strong> Controlar los canales permite redefinir las palabras. No prohíben: redefinen. No censuran: desplazan lo decible.</li>
    <li><strong>La defensa requiere arquitectura con mecanismos anticaptura.</strong> Por eso construimos auditores (Banderas), métodos (5W), y distinciones operativas (condiciones vs contenido) — con rotación, transparencia y validación externa.</li>
  </ol>
</div>
```

---

## Sacrificios Declarados

| Si elegimos... | Perdemos... |
|----------------|-------------|
| 5T con tesis 0 | Lectores que buscan "objetividad neutral" |
| 5T con tesis 4 | Claridad; riesgo de parecer new age |
| Titular poético | Rigor inmediato (se gana gancho) |
| Titular largo | Impacto visual |

---

## Protocolo de Decisión

### Paso 1: Invocar agente
```
@orangeflag Audita las propuestas de cabecera y pie para el periódico.
Adjunto: ARCHIVO/DISCO/Diciembre_25_Portada/TICKET-TESIS-NUMERO.md
```

### Paso 2: Decisiones a tomar
1. **Cabecera**: ¿Opción Actual, A, o B?
2. **Pie**: ¿Opción Actual, 5T, o 3T+?
3. **Estilo**: ¿Mantener `<ol>` o cambiar a `<ol start="0">` para numerar desde 0?

### Paso 3: Implementar
- @aleph aplica los cambios en `docs/periodico.md`
- Validar localmente con `scripts/validate-site.sh`
- Commit siguiendo protocolo DevOps

### Paso 4: Commit
```
feat(ghpages/periodico): actualizar tesis del número Diciembre 2025

- [Cabecera: describir cambio elegido]
- [Pie: describir cambio elegido]
- Basado en sesiones editoriales en ARCHIVO/DISCO/Diciembre_25_Portada/

refs #GHPAGES-1.0.0-T001
```

---

## Tests de Calidad (@orangeflag)

| Test | Pregunta |
|------|----------|
| **Modo** | ¿Examinamos o persuadimos? → Periódico = persuadir (retórico) |
| **Auditorio** | ¿Quién lee? → Comunidad plural, no solo expertos |
| **Género** | ¿Deliberativo, judicial, epidíctico? → Deliberativo (futuro, útil) |
| **Estilo** | ¿Cumple claridad, corrección, propiedad, elevación medida? |
| **Entimema** | ¿Las premisas presupuestas son compartidas por el auditorio? |

---

## Dependencias

| Dependencia | Estado |
|-------------|--------|
| Sesión editorial cabecera | ✅ Completada (01_Cabecera.md) |
| Sesión editorial pie | ✅ Completada (02_Pie.md) |
| CSS para 5 tesis | ⚠️ Verificar que `.periodico-thesis ol` soporte más items |
| GitHub Pages build | ⏳ Pendiente tras merge |

---

## Notas del Analista

### Por qué se recomienda 5T

La sesión BIS (02_Pie.md) aportó dos perspectivas externas:
- **@tarotista**: Detectó que las 3 tesis originales están en cuadrante exterior (instituciones). Falta el cuadrante interior (sujeto, cultura).
- **@nonsi**: Detectó despolitización. Sin declarar posición, el diagnóstico puede ser leído por el adversario sin incomodarle.

Añadir tesis 0 (posición) y tesis 4 (interior) responde a estas objeciones.

### Por qué se recomienda titular mixto (B)

El titular actual es dialéctico ("campo de batalla"). Las sesiones proponen un gancho poético ("Han capturado las palabras") que moviliza más, con un subtítulo que mantiene el rigor.

### Riesgo principal

La tesis 4 ("prácticas de desintoxicación") puede sonar a autoayuda. Hay que vigilar el registro para no perder credibilidad.

---

## Anexo: Ubicación de las zonas en periodico.md

### Zona 1: Cabecera (líneas ~15-20)
```html
<!-- TITULAR PRINCIPAL -->
<div class="periodico-section-header">Tesis del número</div>
<div class="periodico-headline">
  <h2>«La verdad ya no es un dato: es un campo de batalla donde instituciones, infraestructuras y lenguajes compiten por definir qué cuenta como real.»</h2>
</div>
```

### Zona 2: Pie (líneas ~95-110)
```html
<div class="periodico-section-header">Tesis del número</div>

<div class="periodico-thesis">
  <h3>// diagnóstico convergente</h3>
  <ol>
    <li>...</li>
    <li>...</li>
    <li>...</li>
  </ol>
</div>
```

---

*Ticket generado por @ox. Pendiente de decisión editorial.*
