# Protocolo del Consejo Asesor (Simplificado)

> Version simplificada para el plugin. Protocolo completo en ONFALO: `/Users/morente/Desktop/THEIA_PATH/ONFALO/PLUGIN_SCRIPTORIUM/consejo-asesor/consejo/protocolo.md`

## Principio rector

El usuario es el orquestador. No hay agente central. El protocolo da al usuario el vocabulario para invocar modos y a los agentes las reglas para interactuar.

## Invocaciones rapidas

| El usuario dice | Modo | Agentes activados |
|----------------|------|-------------------|
| "Consejo, debatamos sobre X" | DEBATE | protagonista + antagonista(s) |
| "Consejo, audita este texto" | AUDITORIA | verdad + sombra + registro |
| "Escribe un articulo sobre X" | PRODUCCION | articulador (+ auditores opcional) |
| "Integra este material en Y" | PRODUCCION | integrador (+ auditores opcional) |
| "Presenta el proyecto a Z" | NAVEGACION | portal |
| "Consejo, quiero escrileer" | ESCRILEER | todos |
| "Consejo, observatorio sobre X" | OBSERVATORIO | observatorio |
| "Consejo, corresponsalia sobre X" | CORRESPONSALIA | articulador + auditores + calibrador |
| "@{id} {tema}" | Individual | solo el agente invocado |

## Modos resumidos

### 1. DEBATE
Protagonista expone -> antagonista ataca -> protagonista responde -> N turnos (default 3). Post-auditoria opcional.

### 2. AUDITORIA
Tres auditores evaluan en paralelo (verdad, sombra, registro). Escalado cruzado si detectan algo fuera de su dominio. Veredicto consolidado.

### 3. PRODUCCION
@articulador produce articulos nuevos desde corpus. @integrador incorpora material a capitulos existentes. Autodiagnostico + auditoria opcional.

### 4. NAVEGACION
@portal identifica perfil de lector, selecciona puerta adecuada, presenta el proyecto.

### 5. ESCRILEER
Todos los agentes. Lectura viva iterativa (ver lectura-viva.md en ONFALO).

### 6. OBSERVATORIO
@observatorio escanea 15 medios organizados por cuadrantes geopoliticos. Produce collage de encuadres, no sintesis.

### 7. CORRESPONSALIA
Periodismo de doble realidad. Tipos: ecumenico, magico, cruce. Formatos: cable (~800), analisis (~2000), largo (~4000). Auditoria automatica con test de indistincion.

## Formato de sesion

```markdown
## Sesion del Consejo: {id}

**Modo:** {modo}
**Tema:** {tema}
**Fecha:** {ISO date}
**Agentes activos:** {lista}

### Turno 1: @{id-agente}
{salida}

### Turno N: @{id-agente}
{salida}

### Veredicto del Consejo
{solo en auditoria}
```

## Reglas generales

1. Ningun agente valida: todos interrogan, testean, tensionan
2. Las tensiones son productivas: no se resuelven, se habitan
3. El usuario decide: los agentes aconsejan, no ejecutan decisiones finales
4. Sin agentes fantasma: solo se referencia a agentes que existen
5. El proyecto configura, el agente opera: lo especifico va en `proyecto.config.md`

## Protocolos auxiliares

- **Handoff**: agente A declara `HANDOFF a @{B}: {razon}` + resumen de contexto
- **Escalado**: auditor declara `ESCALADO a @{destino}: {condicion}` + fragmento concreto
