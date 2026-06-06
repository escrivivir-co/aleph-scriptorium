# Sprint 0 — Plan propuesto

> Propuesta de arranque para que scrum la ajuste en planning. **No es un compromiso cerrado**: es un punto de partida con objetivo, items candidatos y criterios. Capacidad y commit los fija el equipo.

## Objetivo del Sprint (Sprint Goal)

> **Desbloquear la federación y fijar el instrumento de medida.** Al final del Sprint 0, dos sujetos pueden intercambiar un evento por `room` a través del hub (deuda resuelta), el math core está canonizado por escrito, y los spikes raíz han reducido las incertidumbres que condicionan el resto del programa.

En una frase: **"el relay funciona, sabemos qué medir, y sabemos por dónde seguir."**

## Por qué este objetivo

- El **relay** (S-F1/S-F2/S-F3) es el primer ladrillo compartido por ③ Router y ④ Regulador. Sin él no hay federación, y sin federación no hay topología que medir. Riesgo bajo, desbloqueo alto.
- Los **spikes raíz** (SP-F1, SP-F2, SP-B1) resuelven las decisiones que, si se posponen, hacen retrabajar las features.
- **Canonizar el math core** (S-C1) es barato y fija el vocabulario de medida (NOMON/Region/ℵ) que el resto necesita.
- **Trazabilidad** (S-X3, S-X6) cumple el DoD del repo (ADR + ECOSYSTEM) sin la cual nada se da por "hecho".

## Items candidatos (sprint backlog propuesto)

| ID | Título | Pts | Tipo | Notas |
|----|--------|-----|------|-------|
| S-F1 | Relay `network_event` en `PubSubHub` (target/room) | 5 | Story | corazón del sprint |
| S-F2 | `PubSubBridge` honra `room`/`target` + `join_room` | 3 | Story | |
| S-F3 | Test 2 bridges A→B por room | 2 | Story | cierra la deuda con prueba |
| S-C1 | Canonizar `math-core.md` desde `draft_01.ts` | 3 | Story | doc, sin código |
| SP-F1 | Spike portabilidad IACM/RNFP → `@network-engine/protocols` | 5 | Spike | resultado = decisión escrita |
| SP-F2 | Spike identidad SSB (whoami) + hub vs Pub.Rooms | 5 | Spike | resultado = hipótesis confirmada/refutada |
| SP-B1 | Spike T1: topología en RDF vs Mongo vs on-read | 5 | Spike | resultado = ADR 0013 borrador |
| S-X3 | Extender `ECOSYSTEM.md` con repos hermanos | 2 | Story | trazabilidad |
| S-X6 | Redactar ADR 0010-0013 (borradores) | 5 | Story | puede partirse |

**Total orientativo:** ~35 pts (ajustar a capacidad real; los spikes son time-boxed, no se "terminan" — producen aprendizaje).

## Fuera de alcance (explícito)

- Adaptador Pub.Rooms WSS real (S-F5) y identidad SSB productiva (S-F6) → Sprint siguiente.
- Visor HC y regulador con slider (S-B3/S-B4/S-C3) → tras el sustrato.
- Cualquier operación real sobre VPS/DNS/SSB pub vivo → requiere aprobación PO (ver `RUNBOOK` de `ScriptoriumVps`).

## Definition of Ready (DoR) — para que una story entre al sprint

- [ ] Tiene criterios de aceptación (Gherkin) en [`USER_STORIES.md`](USER_STORIES.md).
- [ ] Las dependencias están en `done` o no bloquean el inicio.
- [ ] Está estimada por el equipo (no solo el punto de partida del backlog).
- [ ] Se conoce qué incertidumbre (T*/F*) resuelve o asume.
- [ ] Cabe en un sprint; si no, se parte.

## Definition of Done (DoD) — según [`DOD.instructions.md`](../../../INSTRUCTIONS/LAYER_0/DOD.instructions.md)

- [ ] Funciona sin regresiones; contratos TS estrictos (`strict: true`, sin `any` injustificado).
- [ ] Validado con **Bun** (`bun run typecheck && bun run test`) — nunca npm/npx.
- [ ] Decisión de diseño importante → registrada en `ADR/`.
- [ ] Comportamiento funcional alterado → dossier actualizado en `DOSSIERS/`.
- [ ] Patrón estructural nuevo → reflejado en `INSTRUCTIONS/LAYER_1` o `LAYER_3`.
- [ ] Código auto-explicativo (nombres, branded types si aplica); logs semánticos.
- [ ] Toda idea inconclusa → plasmada en Dossier o Scratchpad (el conocimiento no se pierde).
- [ ] Para spikes: el **aprendizaje** está escrito (hipótesis, evidencia, recomendación). Aprender es un resultado válido.

## Ceremonias sugeridas

- **Planning:** re-estimar, confirmar Sprint Goal, comprometer subset realista.
- **Daily:** foco en el relay y los spikes (lo que más desbloquea).
- **Review:** demo del test A→B por room + lectura de los 3 spikes.
- **Retro:** ¿el reencuadre ASI (federación como proyección) sostiene la ejecución o aparecen fricciones?

## Riesgo principal del sprint

Que un spike (SP-F2) revele que la identidad SSB no es trivialmente accesible desde el core → mitigación: el relay (S-F1/2/3) y el canon (S-C1) **no dependen** de ese spike, así que el sprint entrega valor aunque el spike concluya "más complejo de lo esperado".
