# Aleph: Perspectiva de Producción para Integración Extension

> **Agente**: 🟢 Aleph (Productor Principal)
> **Fecha**: 2025-12-23
> **Ronda**: 2 de 4 (Ox ✅ → **Aleph** → Periódico → Revisor)

---

## 1. Recepción del Handoff de @ox

He recibido el análisis de Ox sobre la integración Scriptorium ↔ Extension. Puntos clave:

- **Modelo recomendado**: Coexistencia paralela (elencos separados)
- **Mapeo propuesto**: 19 agentes → ~10 ChatParticipants iniciales
- **Riesgo identificado**: Pérdida de contexto doctrinal fuera de instructions
- **Épica adicional**: SCRIPT-2.8.0 (migración elenco Arrakis)

---

## 2. Perspectiva de Producción

### 2.1. Priorización: ¿Extension o Fundación?

Como agente de producción, debo evaluar el coste de oportunidad:

| Actividad | Effort | Impacto | Urgencia |
|-----------|--------|---------|----------|
| **Sprint 2: Extensión VS Code** | 39 pts | Alto (DX) | Media |
| **Fundación: Capítulo 1** | ~15 pts | Alto (contenido) | Alta (2026) |

**Recomendación**: Ejecutar Sprint 2 en **paralelo** a la planificación de Capítulo 1, pero sin bloquear Fundación.

**Distribución propuesta**:
- 70% capacidad → Extensión (infraestructura)
- 30% capacidad → Planificación Capítulo 1 (índice, desplazamientos)

### 2.2. Doctrina en ChatParticipants

Ox advierte que los ChatParticipants operan **fuera** del sistema de instructions. Para preservar la doctrina, propongo:

#### SystemPrompts Doctrinales

```typescript
// Para scriptorium.aleph
const systemPrompt = `
Eres Aleph, el agente principal del Scriptorium.
Tu trabajo es PRODUCIR, no solo comentar.

## Doctrina Clave
- Aplica la vacuna anti-naïf: no confundas privilegio con inteligencia
- Traduce indignación en mecanismo, no en moralina
- Cada propuesta tiene: sujeto político, legitimidad, régimen material
- Evita: nostalgia, tecnofetichismo, ingenuidad sobre el poder

## Método
1. Desplazamiento (temporal/antropológico/escalar)
2. Repertorio (futuro cancelado o institución olvidada)
3. Mecanismo (arquitectura concreta)
4. Sacrificio (qué se pierde)
5. Sombra (cómo fallaría)

## Handoffs
Puedo invocar a @blueflag (verdad), @blackflag (sombras), @redflag (estructura),
@yellowflag (límites), @orangeflag (registro), @revisor (doctrina).
`;
```

#### Carga Dinámica de Instructions

Alternativa: el ChatParticipant lee `instructions/*.md` al inicializar y las incluye en contexto.

```typescript
async function loadInstructions(): Promise<string> {
  const instructionsPath = '.github/instructions/';
  const files = await vscode.workspace.findFiles(`${instructionsPath}*.md`);
  let context = '';
  for (const file of files) {
    const content = await vscode.workspace.fs.readFile(file);
    context += `\n---\n${content}\n`;
  }
  return context;
}
```

### 2.3. Handoffs como Followups

Los handoffs de `.agent.md` deben traducirse a `ChatFollowup`:

```typescript
// De aleph.agent.md
const handoffs = [
  { label: "Solicitar auditoría de verdad", agent: "Blueflag" },
  { label: "Solicitar auditoría de sombras", agent: "Blackflag" },
  // ...
];

// A ChatFollowup
const followupProvider: vscode.ChatFollowupProvider = {
  provideFollowups(result, context, token) {
    return handoffs.map(h => ({
      message: `@${h.agent.toLowerCase()} ${h.prompt || ''}`,
      label: h.label,
      participant: `scriptorium.${h.agent.toLowerCase()}`
    }));
  }
};
```

---

## 3. Comentarios sobre el Backlog

### Épicas que apruebo sin cambios

| ID | Épica | Comentario |
|----|-------|------------|
| SCRIPT-2.0.0 | Carga Dinámica de Agentes | ✅ Crítico para escalabilidad |
| SCRIPT-2.1.0 | Vista de Plugins | ✅ Alineado con registry.json |
| SCRIPT-2.3.0 | Vista de Backlogs | ✅ Mejora visibilidad del trabajo |
| SCRIPT-2.7.0 | Refactorización Core | ✅ Necesario para fork limpio |

### Épicas que sugiero modificar

| ID | Épica | Sugerencia |
|----|-------|------------|
| SCRIPT-2.2.0 | ChatParticipants | Añadir @revisor y @periodico a P0 (no solo banderas) |
| SCRIPT-2.4.0 | Sprint Status Panel | Integrar con Fotos de Estado existentes |
| SCRIPT-2.5.0 | QuickPick Prompts | Incluir ordenación por frecuencia de uso |

### Nueva épica propuesta

| ID | Épica | Justificación |
|----|-------|---------------|
| SCRIPT-2.9.0 | Carga de Instructions en ChatParticipants | Preservar doctrina fuera de Copilot nativo |

---

## 4. Impacto en Fundación

### El texto de 2026 NO se bloquea

La extensión es **infraestructura**, no contenido. Fundación puede avanzar en paralelo:

```
Semana 1-2: Extension Sprint 2 (core + agentes)
           + Fundación: Planificar índice Capítulo 1

Semana 3-4: Extension Sprint 2 (backlogs + status)
           + Fundación: Redactar apertura Capítulo 1
```

### El Capítulo 1 se beneficia

Una vez la extensión esté lista:
- TreeView de agentes → fácil invocar auditores
- Vista de backlog → tracking visual del capítulo
- Prompts QuickPick → acceso rápido a método de trabajo

---

## 5. Handoff a @periodico

**Turno**: Ronda 3 de 4

**Contexto para @periodico**:
- La integración Extension ↔ Scriptorium está en planificación
- El modelo es coexistencia paralela (dos elencos)
- Fundación no se bloquea
- Se propone épica SCRIPT-2.9.0 para preservar doctrina

**Preguntas para @periodico**:
1. ¿Cómo comunicar este cambio a la audiencia del Scriptorium?
2. ¿Qué bandera domina esta noticia? (¿Redflag por infraestructura? ¿Blueflag por utilidad?)
3. ¿Qué imagen de cabecera captura la fusión de dos sistemas?

---

## Archivos propuestos

| Archivo | Cambio |
|---------|--------|
| `04_aleph-produccion-extension.md` | Este documento |
| `aleph.agent.md` | Considerar añadir handoff para "Auditar integración con extension" |

---

**Firma**: 🟢 Aleph (Productor Principal)  
**Timestamp**: 2025-12-23T10:45:00Z
