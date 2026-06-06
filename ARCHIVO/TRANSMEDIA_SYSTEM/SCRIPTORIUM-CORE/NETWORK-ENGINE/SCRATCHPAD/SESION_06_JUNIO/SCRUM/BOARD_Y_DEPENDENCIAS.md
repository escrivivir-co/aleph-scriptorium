# Tablero kanban + grafo de dependencias

> Foto inicial del tablero y el orden de desbloqueo. Mover tarjetas en vuestra herramienta; aquí queda el estado de partida y, sobre todo, **qué desbloquea qué**.

## Kanban inicial (estado de partida)

| 🧊 Icebox | 📋 Ready (candidatas Sprint 0) | 🚧 In progress | 👀 Review | ✅ Done |
|-----------|-------------------------------|----------------|-----------|---------|
| S-F6 identidad SSB real | S-F1 relay hub | — | — | — |
| S-X1 LAYER_0 SSB/PROTOCOLS | S-F2 bridge room/target | | | |
| S-X2 LAYER_1 IDENTITY/FED | S-F3 test A→B | | | |
| S-X4 LAYER_2 repos | S-C1 canon math-core | | | |
| S-X5 LAYER_3 functional | SP-F1 spike protocols | | | |
| S-B4 visor HC | SP-F2 spike identidad/transporte | | | |
| S-C3 simulador UI | SP-B1 spike topología (T1) | | | |
| | S-X3 ECOSYSTEM repos | | | |
| | S-X6 ADR 0010-0013 | | | |

> Las stories de "jugabilidad" (S-A*, S-B1/2/3, S-C2, S-F4/5) están **Ready pero no en Sprint 0**: entran cuando el desbloqueo (relay + spikes) libera sus dependencias.

## Grafo de dependencias (qué desbloquea qué)

```mermaid
flowchart TD
  classDef must fill:#ffe3e3,stroke:#e03131,color:#000
  classDef should fill:#fff3bf,stroke:#f08c00,color:#000
  classDef spike fill:#d0ebff,stroke:#1971c2,color:#000

  %% Spikes raíz
  SPF1["SP-F1 spike protocols"]:::spike
  SPF2["SP-F2 spike identidad/transporte"]:::spike
  SPB1["SP-B1 spike topología T1"]:::spike
  SPC2["SP-C2 hops==NOMON"]:::spike

  %% Relay (desbloqueo)
  SF1["S-F1 relay hub"]:::must
  SF2["S-F2 bridge room/target"]:::must
  SF3["S-F3 test A→B"]:::must

  %% Math core
  SC1["S-C1 canon math-core"]:::must
  SC2["S-C2 alcance ℵ"]:::must

  %% Sustrato topología
  SB1["S-B1 arista subscribesTo"]:::must
  SB2["S-B2 derivar alcance"]:::must

  %% Sujeto
  SA1["S-A1 ventana contexto"]:::must
  SA3["S-A3 player invoca"]:::must

  %% Proyección y adaptadores
  SF4["S-F4 projectDomainToFederation"]:::must
  SF5["S-F5 adaptador Pub.Rooms"]:::should
  SF6["S-F6 adaptador identidad SSB"]:::should

  %% Regulador
  SB3["S-B3 regulador slider"]:::should
  SB4["S-B4 visor HC"]:::should
  SC3["S-C3 simulador UI"]:::should

  SF1 --> SF2 --> SF3
  SF3 --> SB1
  SPB1 --> SB1
  SC1 --> SC2
  SPC2 --> SC2
  SB1 --> SB2
  SC2 --> SB2
  SA1 --> SA3
  SPF1 --> SF4
  SF1 --> SF4
  SF4 --> SF5
  SPF2 --> SF6
  SB1 --> SB3
  SB3 --> SB4
  SC3 --> SB4
  SC2 --> SB4

  SPB1 -.->|"informa"| SPC2
  SPF2 -.->|"informa"| SF6
```

## Camino crítico al MVP (5 pasos del slice vertical)

```mermaid
flowchart LR
  R["Relay\nS-F1/F2/F3"] --> E["Arista grafo\nS-B1"]
  E --> Alc["Alcance ℵ\nS-B2 (+S-C2)"]
  Suj["Sujeto local\nS-A1/A3"] --> R
  Alc --> Reg["Regulador+visor\nS-B3/B4/C3"]
```

El **MVP** ([`../MVP.md`](../MVP.md) §3) se demuestra cuando: sujeto local → se federa por relay → escribe arista → se deriva alcance ℵ → regulador gradúa y el visor muestra radicoma↔hegemón. **Una pasada completa = release del programa.**

## Leyenda de bloqueos

- **Bloqueo duro (flecha sólida):** la tarjeta destino no puede empezar hasta que la origen esté `done`.
- **Informa (flecha punteada):** el resultado de un spike orienta la tarjeta, pero no la bloquea formalmente.
- **Decisiones abiertas que afectan al grafo:** ver [`RAID_LOG.md`](RAID_LOG.md) (T1 cambia el sustrato de S-B1; F4 cambia si S-F5 reemplaza al hub propio).
