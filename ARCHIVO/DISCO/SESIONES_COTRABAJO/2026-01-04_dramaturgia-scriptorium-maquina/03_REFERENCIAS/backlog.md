# Referencias de Backlog

## Épica Nueva

- **ID**: DRAMATURGIA-MAQUINA-1.0.0
- **Nombre**: Modelar Scriptorium como Máquina (Sensor/Actuador)
- **Estado**: 📋 Planificación

## Obra Objetivo

- **Archivo**: `ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml`
- **Personaje clave**: Lucas (MENTOR, estadio 11)
- **Brain existente**: `ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl`

## Specs Relacionadas

- `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-dramaturgo.yaml`
- `ARCHIVO/PLUGINS/OPENASYNCAPI_EDITOR/specs/PrologEditor/usecases-agente-personaje.yaml`

## Sesiones Previas Relacionadas

1. [2026-01-03_prolog-agent-brain-pack-refinement](../2026-01-03_prolog-agent-brain-pack-refinement/)
2. [2026-01-03_prolog-e2e-testing](../2026-01-03_prolog-e2e-testing/)
3. [2026-01-04_demo-ui-prologeditor](../2026-01-04_demo-ui-prologeditor/)

## Patrón a Implementar

```prolog
% SENSOR: Ox detecta estado
sensor(ox, Estado, Timestamp) :- 
    evento_detectado(ox, Estado, Timestamp).

% CEREBRO: Procesa cambio de estado
estado_cambiado(NuevoEstado) :-
    sensor(ox, NuevoEstado, _),
    \+ estado_actual(NuevoEstado),
    retractall(estado_actual(_)),
    assert(estado_actual(NuevoEstado)).

% ACTUADOR: Lucas anuncia a otros agentes
anunciar_estado(lucas, Destinatarios) :-
    estado_actual(Estado),
    forall(member(D, Destinatarios),
           notificar(lucas, D, Estado)).
```
