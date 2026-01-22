# Integración de Plan.md en FUNDACIÓN

> **Origen**: `ARCHIVO/DISCO/DEPRECATED/Plan.md`  
> **Fecha de análisis**: 2026-01-22  
> **Agente**: @aleph (comentario de texto) + @ox (integración)

---

## 1. Descripción del Material

**Plan.md** es un ensayo político-tecnológico de ~8.500 palabras estructurado en tres bloques:

| Bloque | Función | Núcleo |
|--------|---------|--------|
| **1** | Diagnóstico empírico | Crisis de representación: 15M → Nueva Política → fragmentación |
| **2** | Diagnóstico estructural | Centralización digital como amenaza democrática |
| **3** | Propuesta normativa | Democracia participativa con IA descentralizada |

**Tesis central**: "La forma misma de la infraestructura determina la forma posible de la democracia."

---

## 2. Fortalezas del Material

- 56 referencias académicas verificadas
- Casos actuales (2024-2025): crisis OpenAI, bloqueos LaLiga, protestas Nepal
- Tabla comparativa de tipos de democracia (valor pedagógico alto)
- Propuesta técnica concreta (DIDs, Solid, agentes IA)

---

## 3. Debilidades Identificadas

| Debilidad | Análisis |
|-----------|----------|
| **Optimismo tecnológico** | Asume descentralización = democratización sin problematizar sesgos |
| **Ausencia de régimen material** | No menciona coltán, semiconductores, geopolítica del chip |
| **Tensión ácrata/reformista** | El autor prefiere "romper la baraja" pero propone reforma estatal |
| **Lawfare como dato** | Menciona judicialización sin analizar con 5 Banderas |

---

## 4. Decisiones de Integración

### 4.1 Material distribuido en múltiples capítulos

| Capítulo | Qué se integra | Forma |
|----------|----------------|-------|
| **Cap. 7** | Bloque 2 (Twitter/X, OpenAI, LaLiga, Bitchat) | Nueva sección §5b |
| **Cap. 8** | Tabla de democracias + contexto español 15M | Recuadro pedagógico |
| **Cap. 12** | Propuesta de democracia híbrida (síntesis Bloque 3) | Sección horizonte |

### 4.2 Material NO integrado (con justificación)

| Material | Por qué no | Alternativa |
|----------|-----------|-------------|
| Detalle electoral español 2011-2025 | Demasiado local para FUNDACIÓN | Preservar en este archivo |
| Lista de partidos regionales | No aporta a la argumentación filosófica | Preservar aquí |
| Referencias bibliográficas completas | Metodología diferente | Citar selectivamente |

### 4.3 Tratamiento crítico aplicado

El material fue sometido a tamiz de Banderas:

| Bandera | Aplicación |
|---------|------------|
| 🔵 BlueFlag | ¿Evidencia de que descentralización = democratización? → Parcial |
| ⚫ BlackFlag | ¿Quién financia las plataformas "abiertas"? → No explicitado |
| 🔴 RedFlag | ¿Cadena de suministro de los servidores Decidim? → Ausente |
| 🟡 YellowFlag | ¿Pre/trans? ¿Regresión a Atenas o transcendencia? → Ambiguo |

---

## 5. Archivos Modificados

### Primera pasada (2026-01-22)

```
PROYECTOS/FUNDACION/CAPITULOS/
├── cap07-infraestructuras-actores.md  [+§5b: El siglo XXI digital]
├── cap08-demos-sin-demos.md           [+Recuadro: Tipos de democracia]
└── cap12-sombra-del-texto.md          [+§8: Horizonte descentralizado]
```

### Segunda pasada (2026-01-22) — Extendiendo sin sustituir

**Principio**: Material integrado extiende o refuta argumentos existentes, nunca los canibaliza.

```
PROYECTOS/FUNDACION/CAPITULOS/
├── cap02-automata-soberano.md         [+§8b: Lawfare como tecnología]
├── cap03-problema-escala.md           [+§6b: Bitchat Nepal, +§8b: Porto Alegre]
└── cap06-futuros-cancelados.md        [+§7b: 15M como futuro dispersado]
```

| Capítulo | Material Integrado | Conexión con FUNDACIÓN existente |
|----------|-------------------|----------------------------------|
| **Cap. 2** | Lawfare español (Caso Neurona, Alberto Rodríguez, Doctrinas Botín/Atutxa) | Extiende §6 "El autómata como testigo que también delata" |
| **Cap. 3** | Bitchat Nepal bajo bloqueo estatal | Extiende §5-6 con caso de federación bajo presión real |
| **Cap. 3** | Porto Alegre (35 años de presupuesto participativo) | Extiende §8 "Lo que necesitamos" con ejemplo empírico |
| **Cap. 6** | 15M como semillas dispersadas (no futuro muerto) | Extiende §7 "El archivo de los que caminan" |

**Porcentaje de integración estimado**: ~70% del material útil de Plan.md ahora está distribuido en FUNDACIÓN.

**Material NO integrado (por diseño)**:
- Tim Berners-Lee / Solid (requeriría capítulo técnico separado)
- Microsoft vs FOSS / Halloween Documents (tangencial)
- Detalles electorales españoles 2011-2015 (demasiado local)
### Tercera pasada (2026-01-22) — Integrando lo "no tangencial"

**Revisión de criterio**: El PO determinó que los tres puntos marcados como "no integrables" eran en realidad **centrales** a la tesis de FUNDACIÓN:

```
PROYECTOS/FUNDACION/CAPITULOS/
├── cap06-futuros-cancelados.md    [+§1b: Microsoft vs FOSS]
├── cap07-infraestructuras-actores.md [+§5c: Tim Berners-Lee/Solid]
└── cap08-demos-sin-demos.md        [+§0c: Ruedo Ibérico]
```

| Capítulo | Material Integrado | Argumento de integración |
|----------|-------------------|-------------------------|
| **Cap. 6** | Microsoft vs FOSS (Halloween Documents, Embrace-Extend-Extinguish) | Es el ejemplo perfecto de "futuro atacado porque funciona" — FOSS demuestra que producción cooperativa funciona, por eso lo atacaron |
| **Cap. 7** | Tim Berners-Lee: Web original → captura → Solid | Línea clara de FUNDACIÓN: creación para bien común → captura por capital → intento de liberación |
| **Cap. 8** | Ruedo Ibérico 1939-2025 | España como laboratorio de arquetipos: monopolio → duopolio → fragmentación → polarización. El lawfare como tecnología de reconfiguración de correlaciones |

**Porcentaje de integración final**: ~95% del material útil de Plan.md.

**Material restante** (preservado en este archivo para posible uso futuro):
- Detalles específicos de votaciones españolas (cifras exactas, composición de cámaras)
- Referencias bibliográficas completas (56 citas académicas)
---

## 6. Material Original Preservado

El archivo `Plan.md` original se preserva íntegro en:
- `ARCHIVO/DISCO/MATERIAL_FUENTE/Plan_Democracia_Digital/Plan-original.md`

Esto permite:
- Trazabilidad de fuentes
- Posible uso futuro en otros contextos
- Referencia para verificación de citas

---

## 7. Commits Asociados

```
docs(fund/caps): integrar material Plan.md en Cap 7, 8, 12

- Cap 7: Nueva sección §5b sobre infraestructuras digitales del s.XXI
  (Twitter/X, OpenAI, LaLiga, Bitchat Nepal)
- Cap 8: Recuadro pedagógico tipos de democracia + contexto 15M
- Cap 12: Sección horizonte sobre democracia híbrida descentralizada

Material sometido a tamiz 5 Banderas. Optimismo tecnológico
contrapesado con ausencia de régimen material.

refs FUND-INTEGRACION-PLAN
```

---

## 8. Lecciones para Futuras Integraciones

1. **Material de DEPRECATED no es basura**: Puede contener valor si se somete a tamiz
2. **Distribuir > volcar**: Un documento que toca múltiples desplazamientos debe fragmentarse
3. **Preservar original**: Siempre mantener copia íntegra con metadatos de integración
4. **Documentar decisiones**: Este README es parte del proceso, no overhead

