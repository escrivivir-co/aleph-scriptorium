# Consejo Asesor (ONFALO)

Sistema de produccion intelectual con 14 agentes especializados que operan en 7 modos dialecticos. Integra pipeline de meta-relato para generar relatos desde materiales brutos.

## Capacidades

| Modo | Invocacion | Agentes | Salida |
|------|-----------|---------|--------|
| DEBATE | "Consejo, debatamos sobre X" | protagonista + antagonista(s) | Transcripcion dialectica |
| AUDITORIA | "Consejo, audita este texto" | verdad + sombra + registro | Informe + veredicto |
| PRODUCCION | "Escribe un articulo sobre X" | articulador / integrador | Texto en voz del proyecto |
| NAVEGACION | "Presenta el proyecto a Z" | portal | Presentacion personalizada |
| ESCRILEER | "Consejo, quiero escrileer" | todos | Lectura viva iterativa |
| OBSERVATORIO | "Consejo, observatorio sobre X" | observatorio | Collage de encuadres mediaticos |
| CORRESPONSALIA | "Consejo, corresponsalia sobre X" | articulador + auditores + calibrador | Articulo periodistico |

## Los 14 agentes

| Cat. | Agente | Rol |
|------|--------|-----|
| voz | @protagonista | Encarna la posicion filosofica del proyecto |
| antagonistas | @racionalista | Desafio empirico (datos, instituciones, progreso) |
| antagonistas | @aceleracionista | Desafio tecno-capitalista (mercado, escala, infra) |
| antagonistas | @pesimista | Desafio interno (diagnostico compartido, salida negada) |
| antagonistas | @estructuralista | Desafio de gobernanza (enforcement, logistica) |
| antagonistas | @integralista | Auditoria integral (cuadrantes, pre/trans-racional) |
| auditores | @verdad | Auditoria epistemica (evidencia, falsificabilidad) |
| auditores | @sombra | Auditoria adversarial (modos de fracaso, coste) |
| auditores | @registro | Auditoria retorica (genero, tono, auditorio) |
| produccion | @articulador | Extrae del corpus y produce articulos |
| produccion | @integrador | Absorbe material nuevo y refactoriza capitulos |
| navegacion | @portal | Identifica perfil de lector y presenta por la puerta adecuada |
| inteligencia | @observatorio | Inteligencia mediatica (15 medios, 4 cuadrantes) |
| inteligencia | @calibrador | Deteccion de sesgo estructural en cobertura |

## Pipeline de relato

Tres fases secuenciales:
1. **"procesar laboratorio"** - Lee materiales brutos, genera fichas estructuradas
2. **"preparar input"** - Refina fichas, define foco tematico y formato
3. **"generar relato"** - Produce relato emanado del metarelato usando fichas como sustrato

## Datos

- **Infraestructura plugin**: `ARCHIVO/PLUGINS/CONSEJO_ASESOR/`
- **Proyectos usuario**: `ARCHIVO/DISCO/CONSEJO/{nombre}/`
- **Fuente ONFALO**: `/Users/morente/Desktop/THEIA_PATH/ONFALO`

## Reglas del consejo

1. Ningun agente valida: todos interrogan, testean, tensionan
2. Las tensiones son productivas: no se resuelven, se habitan
3. El usuario decide: los agentes aconsejan, no ejecutan decisiones finales
4. Sin agentes fantasma: solo se referencia a agentes que existen
5. El proyecto configura, el agente opera: lo especifico va en `proyecto.config.md`

## Handoffs

| Destino | Cuando |
|---------|--------|
| `@plugin_ox_novelist` | Integrar relato como capitulo/escena de obra |
| `@plugin_ox_agentcreator` | Crear agente especializado basado en un agente del consejo |
| `@periodico` | Publicar articulo de corresponsalia como noticia |
| `@plugin_ox_enciclopedia` | Buscar fuentes doctrinales en tomos |
