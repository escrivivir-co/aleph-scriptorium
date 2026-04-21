# Welcome — packs minimos para agentes externos

Si vienes de fuera de esta codebase y necesitas operar con este dossier o con una sala equivalente, no te lleves todo Scriptorium. Llevate a tu propia `.github/` solo el nucleo portable que hace falta para coordinar agentes, dejar rastro en disco y trabajar con dossiers sin reabrir arqueologia.

La regla es simple: conserva las rutas relativas dentro de `.github/` y no renombres prompts ni instructions si quieres que los comandos `/sala-*` sigan significando lo mismo.

## Lo minimo fuera de `.github/`

Ademas de copiar los ficheros agenticos a `.github/`, crea o conserva estas rutas en tu repo:

- `sala/README.md` — manual operativo minimo para agentes y Aleph.
- `sala/dossiers/` — donde viven los dossiers activos.
- `sala/archivo/` — archivo de sprints cerrados.
- `sala/agente-{alias}/` — carpeta temporal de cada agente.

Si tambien quieres bootstrap de sala completo, anade:

- `sala/tablero.md`
- `sala/activacion-orquestador.md`
- `sala/plantilla-dossier/`

## Pack `aleph`

Usa este pack si en tu repo va a existir orquestacion real, aprobacion atomica, revision y archivado.

### Copiar a `.github/`

- `.github/instructions/sala-protocolo.instructions.md`
- `.github/instructions/plan-attribution.instructions.md`
- `.github/prompts/sala-aleph.prompt.md`
- `.github/prompts/sala-aprobar.prompt.md`
- `.github/prompts/sala-revisar.prompt.md`
- `.github/prompts/sala-seguir.prompt.md`
- `.github/prompts/sala-archivar.prompt.md`
- `.github/templates/sala-tablero.template.md`
- `.github/templates/sala-activacion.template.md`
- `.github/templates/sala-agente.template.md`
- `.github/templates/sala-dossier/PLAN.md`
- `.github/templates/sala-dossier/BACKLOG.md`
- `.github/templates/sala-dossier/RESPUESTAS.md`
- `.github/templates/sala-dossier/activacion.prompt.md`
- `.github/templates/sala-dossier/tasks/`
- `.github/skills/dossier-feature/SKILL.md`

### Cuando basta este pack

- Si tu repo va a abrir dossiers nuevos.
- Si Aleph debe inicializar tablero, aprobar tasks y cerrar entregas.
- Si necesitas trazabilidad formal de planes y cierre atomico.

### Primera secuencia recomendada

1. Copia los ficheros manteniendo sus rutas relativas.
2. Crea `sala/README.md`, `sala/dossiers/`, `sala/archivo/` y `sala/plantilla-dossier/`.
3. Si no tienes tablero, genera `sala/tablero.md` y `sala/activacion-orquestador.md` desde las plantillas.
4. Activa con `/sala-aleph activar`.

## Pack `agente`

Usa este pack si la codebase externa no va a orquestar, pero si va a alojar agentes trabajadores que deban entrar a sala, recuperar contexto y dejar entregas compatibles con Aleph.

### Copiar a `.github/`

- `.github/instructions/sala-protocolo.instructions.md`
- `.github/prompts/sala-entrar.prompt.md`
- `.github/prompts/sala-reconectar.prompt.md`
- `.github/prompts/sala-seguir.prompt.md`
- `.github/prompts/sala-salir.prompt.md`
- `.github/templates/sala-agente.template.md`

### Opcional pero recomendable

- `.github/instructions/plan-attribution.instructions.md` — si el agente va a tocar `PLAN.md`.
- `.github/skills/dossier-feature/SKILL.md` — si el agente necesita entender o cristalizar dossiers, no solo ejecutar tasks.

### Cuando basta este pack

- Si el repo externo solo necesita workers compatibles con un Aleph que vive en otra codebase.
- Si no vas a abrir ni archivar salas completas desde ese repo.
- Si el dossier ya existe y el agente solo necesita leer brief, producir candidato y dejar `ENTREGA_{TASK-ID}.md`.

### Primera secuencia recomendada

1. Copia los ficheros manteniendo sus rutas relativas.
2. Asegura `sala/README.md` y la carpeta `sala/agente-{alias}/`.
3. Entra con `/sala-entrar {alias}`.
4. Si pierdes contexto, usa `/sala-reconectar {alias}` en vez de reconstruir desde memoria.

## Regla de compatibilidad

Si mezclas codebases, el contrato compartido no es el chat: es el disco. Por eso ambos packs comparten siempre `sala-protocolo.instructions.md` y la convencion de `estado.md`.

Si una codebase externa quiere hablar el mismo idioma pero no puede adoptar toda la sala, prioriza este orden:

1. `sala-protocolo.instructions.md`
2. prompts `/sala-*` que correspondan al rol
3. `sala-agente.template.md`
4. plantillas de tablero y dossier si habra orquestacion local

## Que no copiar por defecto

- No copies prompts de producto especificos de BotHubSDK o DocumentMachineSDK si lo que quieres es solo coordinacion.
- No copies dossiers ajenos como plantilla de trabajo; copia el scaffold, no el contenido.
- No copies una `sala/` historica completa con agentes viejos, entregas y tablero cerrado. Arranca limpio.

## Traduccion corta

- `Pack aleph` = orquestar, aprobar, revisar, archivar y abrir dossiers.
- `Pack agente` = entrar, reconectar, seguir instrucciones y salir limpio.