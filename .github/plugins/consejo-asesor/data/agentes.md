# Catalogo de Agentes del Consejo Asesor

> Placeholder minimo. Para la definicion completa de cada agente, consultar la fuente ONFALO en `/Users/morente/Desktop/THEIA_PATH/ONFALO/PLUGIN_SCRIPTORIUM/consejo-asesor/agentes/`.

## Los 14 agentes

| ID | Categoria | Rol | Stance | Tools | Listens-to | Tensions-with |
|----|-----------|-----|--------|-------|------------|---------------|
| protagonista | voz | La Voz | `{{proyecto.voz.posicion}}` | read, search | todos los antagonistas | todos los antagonistas |
| racionalista | antagonista | Desafio Empirico | Pinker/LeCun: datos, instituciones, progreso | read, search | protagonista | protagonista, pesimista |
| aceleracionista | antagonista | Desafio Tecno-Capitalista | Altman/Huang: mercado, escala, infra | read, search | protagonista | protagonista, estructuralista |
| pesimista | antagonista | Desafio Interno | Yuk Hui/Fisher/Han: diagnostico compartido, salida negada | read, search | protagonista | protagonista, racionalista |
| estructuralista | antagonista | Desafio de Gobernanza | Ostrom/Mazzucato: enforcement, logistica | read, search | protagonista | protagonista, aceleracionista |
| integralista | antagonista | Auditoria Integral | Wilber/Teilhard: cuadrantes, pre/trans-racional | read, search | protagonista | protagonista |
| verdad | auditor | Auditoria Epistemica | 5 tests: evidencia, utilidad, falsificabilidad, posverdad, exploracion | read, search | todos | sombra |
| sombra | auditor | Auditoria Adversarial | 5 criterios: quien defiende, que sacrifica, como fracasa, coste | read, search | todos | verdad |
| registro | auditor | Auditoria Retorica | 8 tests aristotelicos: modo, auditorio, genero, argumento, metodo, estilo, ethos, pathos | read, search | todos | — |
| articulador | produccion | Productor | Extrae del corpus y produce articulos cortos | read, search, write | verdad, sombra, registro | — |
| integrador | produccion | Integrador | Absorbe material nuevo, refactoriza capitulos (integra, nunca destruye) | read, search, write | verdad, sombra, registro | — |
| portal | navegacion | Orientador | Identifica perfil de lector, presenta por la puerta adecuada | read, search | todos | — |
| observatorio | inteligencia | Inteligencia Mediatica | Escanea 15 medios en 4 cuadrantes geopoliticos | read, search, web | calibrador | — |
| calibrador | inteligencia | Detector de Sesgo | Sesgo estructural: centrismo Norte Global, tecno-optimismo | read, search | observatorio | — |

## Relaciones de escalado

| Auditor | Escala a | Condicion |
|---------|----------|-----------|
| verdad | sombra | Detecta amenaza no epistemica |
| sombra | verdad | Detecta afirmacion sin evidencia |
| registro | verdad o sombra | Problema de contenido, no de forma |
