# Conversación PO-SM: Plugin Network (Oasis/Scuttlebutt)

> **Sprint propuesto**: SCRIPT-1.11.0 — Interoperabilidad entre Scriptoriums  
> **Feature Cycle**: 1  
> **Fecha**: 2025-12-24  
> **Submódulo**: `alephscript-network-sdk`

---

## Contexto

**PO**: Tenemos un nuevo submódulo `alephscript-network-sdk`. Es una dockerización de Oasis, un cliente de la red Scuttlebutt. Quiero que los Scriptoriums puedan comunicarse entre sí mediante sincronización de BOEs.

**SM**: Entendido. Entonces el objetivo es crear un plugin `network` que permita:
1. Publicar BOEs a la red Oasis
2. Recibir BOEs de otros Scriptoriums
3. Fusionar/replicar registros entre usuarios coordinados

---

## Análisis de Requisitos

### PO: ¿Qué problema resuelve?

Actualmente cada Scriptorium opera de forma aislada. Si Alice y Bob quieren colaborar en una obra de teatro ARG:
- Necesitan coordinarse manualmente (email, chat)
- No hay forma de sincronizar el BOE (Boletín Oficial del Estado)
- Los agentes de cada parte no pueden "ver" las acciones del otro

### SM: ¿Cómo lo resuelve Oasis/Scuttlebutt?

Scuttlebutt es un protocolo P2P donde:
- Cada usuario tiene un **feed** (cadena de mensajes firmados)
- Los feeds se replican entre peers
- No hay servidor central
- Funciona offline y sincroniza al conectarse

El submódulo `alephscript-network-sdk` dockeriza un cliente Oasis que expone:
- Módulo **Feed**: publicar/leer mensajes cortos
- Módulo **Forums**: hilos de discusión
- Módulo **Documents**: compartir archivos
- API local para integración

---

## Modelo de Integración

### PO: ¿Cómo se integra con ARG_BOARD?

**SM**: Propongo extender las "plataformas de comunicación" de ARG_BOARD:

```
ARG_BOARD/plataformas-de-comunicación
├── vscode (local)
├── github (remoto)
├── email (asíncrono)
└── oasis (P2P) ← NUEVO
```

Cada plataforma tiene un **adaptador** que sabe cómo:
1. **Publicar**: BOE → formato de la plataforma
2. **Recibir**: formato de la plataforma → BOE
3. **Sincronizar**: merge de BOEs concurrentes

### PO: ¿El BOE es el formato de intercambio?

**SM**: Sí. El BOE es nuestra "cadena hipervinculada" interna. Para Oasis:

```
BOE (JSON) → Feed Message (Scuttlebutt) → BOE remoto (JSON)
```

El parseo es bidireccional:
- **Publicar**: serializar BOE a mensaje de feed
- **Recibir**: deserializar mensaje a entrada de BOE

---

## Caso de Uso: Alice y Bob

### PO: Describe el flujo completo

**SM**:

**Escena 1: Génesis de la obra**
```
[Alice/Scriptorium A]
1. Alice arranca obra "Hola Mundo Teatro Distribuido"
2. Su agente @teatro genera BOE inicial
3. Plugin network publica BOE al feed Oasis de Alice
```

**Escena 2: Inscripción de Bob**
```
[Bob/Scriptorium B]
4. Bob sigue el feed de Alice en Oasis
5. Su plugin network recibe el BOE
6. Bob ejecuta "inscribirse en obra"
7. Su agente genera entrada de BOE "nuevo actor: bob"
8. Plugin publica al feed de Bob
```

**Escena 3: Sincronización**
```
[Alice recibe actualización]
9. Plugin network de Alice recibe entrada de Bob
10. Merge: BOE_alice + entrada_bob → BOE_sincronizado
11. Alice ve a Bob inscrito en la obra

[Rondas de interacción]
12. Alice y Bob interactúan con sus agentes
13. Cada interacción genera entrada de BOE
14. Los plugins sincronizan periódicamente
```

**Escena 4: Teatro distribuido**
```
15. Ambos BOEs convergen
16. La obra contiene todas las conversaciones
17. Los agentes-personaje pueden "ver" acciones del otro Scriptorium
```

### PO: ¿Qué pasa con conflictos?

**SM**: El BOE es append-only (como Scuttlebutt). Los conflictos se resuelven por:
1. **Timestamp**: orden cronológico
2. **Autor**: cada entrada tiene firma de origen
3. **Merge semántico**: si dos entradas modifican lo mismo, se aplica CRDT

---

## Gaps Identificados

| Gap | Descripción | Prioridad |
|-----|-------------|-----------|
| G1 | No existe plugin `network` | P0 |
| G2 | No hay adaptador de plataforma `oasis` en ARG_BOARD | P0 |
| G3 | BOE no tiene campo `origen` para multi-autor | P1 |
| G4 | No hay protocolo de merge de BOEs | P1 |
| G5 | No hay demo Alice-Bob documentada | P2 |
| G6 | No hay "hoja de pedido" a Oasis | P2 |

---

## Arquitectura Propuesta

```
┌─────────────────────────────────────────────────────────────┐
│                     SCRIPTORIUM A (Alice)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐    ┌──────────┐    ┌─────────────────────────┐ │
│  │ @teatro │───▶│   BOE    │───▶│ Plugin Network          │ │
│  └─────────┘    │ (local)  │    │  ├─ adaptador-oasis.js  │ │
│                 └────┬─────┘    │  ├─ serializer.js       │ │
│                      │          │  └─ sync-manager.js     │ │
│                      │          └───────────┬─────────────┘ │
└──────────────────────┼──────────────────────┼───────────────┘
                       │                      │
                       │              ┌───────▼───────┐
                       │              │ alephscript-  │
                       │              │ network-sdk   │
                       │              │ (Docker)      │
                       │              │  ├─ Oasis     │
                       │              │  └─ SSB       │
                       │              └───────┬───────┘
                       │                      │
              ═════════╪══════════════════════╪═════════════
                       │      SCUTTLEBUTT     │
                       │        NETWORK       │
              ═════════╪══════════════════════╪═════════════
                       │                      │
┌──────────────────────┼──────────────────────┼───────────────┐
│                      │              ┌───────▼───────┐       │
│                      │              │ alephscript-  │       │
│                      │              │ network-sdk   │       │
│                      │              │ (Docker)      │       │
│                 ┌────▼─────┐    ┌───┴───────────────┴───┐   │
│  ┌─────────┐    │   BOE    │◀───│ Plugin Network        │   │
│  │ @teatro │◀───│ (local)  │    └───────────────────────┘   │
│  └─────────┘    └──────────┘                                │
├─────────────────────────────────────────────────────────────┤
│                     SCRIPTORIUM B (Bob)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura del Plugin Network

```
.github/plugins/network/
├── manifest.md
├── agents/
│   └── network.agent.md
├── prompts/
│   ├── publicar-boe.prompt.md
│   ├── recibir-boe.prompt.md
│   ├── sincronizar-boe.prompt.md
│   └── configurar-oasis.prompt.md
├── instructions/
│   └── network.instructions.md
└── docs/
    ├── README.md
    ├── alice-bob-demo.md        # Manual del caso de uso
    └── hoja-pedido-oasis.md     # Propuesta a Oasis
```

---

## Entregables del Sprint

### Iteración 1: Estructura del Plugin
- [ ] Crear plugin `network` con estructura básica
- [ ] Registrar en registry.json
- [ ] Crear bridge `plugin_ox_network`

### Iteración 2: Adaptador Oasis
- [ ] Crear adaptador `oasis` en plataformas de ARG_BOARD
- [ ] Implementar serializador BOE ↔ Feed Message
- [ ] Documentar protocolo de mensajes

### Iteración 3: Sincronización
- [ ] Diseñar protocolo de merge de BOEs
- [ ] Extender BOE con campo `origen` multi-autor
- [ ] Implementar sync-manager básico

### Iteración 4: Documentación
- [ ] Manual Alice-Bob (demo)
- [ ] Hoja de pedido a Oasis
- [ ] Actualizar README del submódulo

---

## Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| Submódulo alephscript-network-sdk | ✅ Instalado | Rama integration/beta/scriptorium |
| Plugin arg-board | ✅ Instalado | Plataformas de comunicación |
| Plugin teatro | ✅ Instalado | Genera BOEs |
| Docker (runtime) | ⚠️ Externo | Requerido para Oasis |

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Docker no disponible | Media | Alto | Modo offline sin sincronización |
| Conflictos de merge | Media | Medio | CRDT para campos críticos |
| Latencia de red | Baja | Bajo | Sync eventual, no tiempo real |
| Adopción en Oasis | Alta | Bajo | Plugin funciona independiente |

---

## Decisiones Pendientes

1. **Formato de mensaje Oasis**: ¿Usar módulo Feed o Forums?
2. **Granularidad de sync**: ¿Por entrada de BOE o BOE completo?
3. **Identidad**: ¿Cómo vincular usuario Oasis con actor ARG?
4. **Cifrado**: ¿Usar canales privados de Scuttlebutt?

---

## Siguiente Paso

**SM**: Propongo generar el backlog formal y crear la estructura del plugin.

**PO**: Aprobado. Procede con I1 (Estructura del Plugin) y documenta I2-I4 como pendientes.
