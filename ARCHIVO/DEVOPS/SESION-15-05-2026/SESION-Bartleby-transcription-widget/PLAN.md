Necesito un plan para esta idea.

- Actualmente en mi #WiringEditor tengo un pack de nodos "Alephscript" y otro "Alephscript Firehose". Me gustaría crear una nueva clase "Alephscript Escribiente".
- También agregar flows de ejemplo de uso
- El caso de uso es para integrar el nuevo transcriptor de media-extraction: DocumentMachineSDK\.github\skills\media-extraction
- Quiero un pequeño dashbord node-red con una funcionalidad que permita: a) manipulación del micrófono para captar speech, b) carga de un mp3 como origen de voz.
- Tenemos que dar el caso de uso normal en el que el usuario genera un tramo (con origen mic o avanzando un tramo del mp3) y se envía para transcripcion (con persistencia a partir de ARCHIVO\PLUGINS\DOCUMENT_MACHINE\STORAGE\TRANSCRIPTIONS), recibiendo de vuelta en la ui la actualización del tramo transcrito. 
- Habría un paso previo de configuración que ya viene con defaults a esta codebase concreta y los paths dados. Habría que recomendar al usuario longitudes según su máquina (o si activa gpu) a modo de resultado pre-check de validación, confirmando en la ui que la operativa está lista. - Pensar, para la gestión de sesiones, alguna forma de establecer la subcarpeta dentro de TRANSCRIPTIONS, así como algún script de "cierre" archivado que genere un zip exportable con los audios segmentados y los textos correspondientes, así como un "informe final" con todo el texto.
- Para el lado media-extraction, ya ves que hemos instalado en esta base un generador con whisper; pero igual algo más simple se puede obtener usando contribs de node-red homólogas, tú valoras. Para el retorno, creo que node-red soluciona bien el watcher fs al fichero y es trivial. Al final se trata de tener la ui que, por ejemplo cargo un audio de una hora, elijo bloques de 1 minuto, y podemos ir enviando y recibiendo los 60 trozos en una sesión. O, en el caso del micrófono, que puede hacer el mismo proceso pero con el micrófono. Sería util un cronómetro asociado a  los botones de play/pause/resume/stop de modo que si fijamos bloques de 60 segundos el orador tenga info en pantalla.

Entiendo que es un caso de uso bastante genérico y que te será fácil la idea siendo lo peligudo ajustarlo a este Scriptorium de forma sistémica. Mira a ver si me he dejado huecos y hazme una lista de opciones o vías para hacer un buen plan donde no tienes que inventar o presuponer. Aunque en este caso creo que, ya digo, es bastante trivial y habrá poco.


# Plan: Alephscript Escribiente — Node-RED audio→whisper

**Modelo**: `Claude Opus 4.7` (atribución plan-attribution.instructions.md)
**Ubicación destino**: `ARCHIVO/DEVOPS/SESION-15-05-2026/SESION-LECTOR/PLAN.md`
**Owner**: agente `@bartleby` (DocumentMachineSDK) + `@aleph` (DevOps)

## TL;DR
Crear `node-red-contrib-alephscript-escribiente` (3er pack del WiringEditor) + un dashboard Node-RED con captura de mic / carga mp3 + un worker Python sidecar (faster-whisper) que consume `INBOX/` y escribe `OUTBOX/`. Node-RED orquesta vía watcher fs. Sesiones aterrizan en `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/{YYYYMMDD-HHMM}-{slug}/` con script de cierre que produce `export.zip` + `informe.md`.

## Decisiones cerradas (del Q&A)
- **Audio source**: Híbrido — `node-red-contrib-browser-utils` para upload mp3 + recorder WebAudio custom (MediaRecorder API) para mic con cronómetro y play/pause/resume/stop.
- **Whisper runner**: Worker Python persistente + watcher FS (INBOX/OUTBOX). Modelo cargado una vez, JSON drop-in.
- **Estructura sesión**: aprobada (ver Fase 3).
- **Bartleby**: agente owner del pack (docs + manifest lo referencian; UI mantiene "Escribiente" funcional).
- **Excluido del scope**: sincronización P2P / red de BOEs. Diarización, traducción y streaming live también fuera (no marcadas).

## Fases

### Fase 0 — Andamiaje y registro plugin (bloqueante)
1. Crear carpeta `WiringEditor/packages/node-red-contrib-alephscript-escribiente/` clonando estructura de `node-red-contrib-alephscript` (tsconfig, package.json, scripts build + postbuild copy HTML).
2. Registrar pack en `WiringEditor/package.json` (workspaces / scripts agregados de build:all, link:all).
3. Crear plugin scaffolding: `.github/plugins/escribiente/` con `manifest.md`, `instructions/escribiente.instructions.md`, `agents/escribiente.agent.md` (delega persona a `@bartleby`).
4. Registrar en `.github/plugins/registry.json`.
5. Crear carpeta `ARCHIVO/PLUGINS/ESCRIBIENTE/` (sesiones de cotrabajo y docs futuras).

### Fase 1 — Worker Python sidecar (paralelizable con Fase 2)
1. Nuevo módulo `DocumentMachineSDK/workers/escribiente-whisper/`:
   - `worker.py`: carga `WhisperModel(model_size, device, compute_type)` UNA vez. Loop `watchdog` sobre `INBOX/`. Por cada `*.job.json` (`{audio_path, session, chunk_id, language, vad}`), transcribe y escribe `OUTBOX/{chunk_id}.result.json` (`{segments[], duration, avg_logprob, model_info}`) + `.txt` plano.
   - `precheck.py`: detecta GPU (cuda available), libs nvidia, RAM disponible. Imprime JSON con recomendación: `{recommended_model, recommended_chunk_sec, device, warnings[]}`.
   - `requirements.txt`: `faster-whisper`, `watchdog`.
   - `README.md`: arranque manual + variables de entorno.
2. Definir contrato de carpetas raíz vía env vars: `ESCRIBIENTE_INBOX`, `ESCRIBIENTE_OUTBOX`, `ESCRIBIENTE_SESSIONS_ROOT` (defaults a paths del workspace).
3. Añadir task `.vscode/tasks.json`: `ESC: Start [Whisper Worker]` y `ESC: Run [Precheck]`.

### Fase 2 — Nodos del pack (paralelizable con Fase 1)

| Nodo | Tipo | Función |
|------|------|---------|
| `escribiente-config` | config | Centraliza paths, model, chunkSec, language, GPU. Defaults pre-cargados a este Scriptorium. |
| `escribiente-precheck` | inject/output | Ejecuta `precheck.py`, devuelve JSON con recomendaciones; nodo dashboard mostrará verde/ámbar. |
| `escribiente-session` | function/in | Crea/abre sesión: payload `{action:"open"/"close", slug}` → genera carpetas y `manifest.json`. |
| `escribiente-chunker` | processing | Recibe blob audio + metadata `{sessionId, startSec, endSec}` → escribe `audio/NNN-...wav` (vía ffmpeg si entrada es mp3/webm) y emite `*.job.json` a INBOX. |
| `escribiente-transcriber` | processing | Watcher en OUTBOX/{sessionId}/. Empareja results con jobs por chunk_id, escribe `text/NNN-...{json,txt}` y emite mensaje hacia el dashboard. |
| `escribiente-session-closer` | function | Concatena `text/*.txt` → `full.txt`, render `informe.md` (header + tabla de tramos + texto), zipea sesión → `export.zip`. |
| `escribiente-dashboard-recorder` | dashboard widget | Custom UI: botones play/pause/resume/stop + cronómetro + selector mic/mp3 + barra de chunks (verde=transcrito, ámbar=en cola). |

Convenciones:
- TS source en `src/nodes/*.ts` + HTML hermano (igual al pack base).
- Tipos compartidos en `src/types.ts` (`EscribienteJob`, `EscribienteResult`, `SessionManifest`).
- Mensajes `msg.payload` siguen el patrón `AlephScriptMessage` (from, data, timestamp, type).

### Fase 3 — Layout de sesión y persistencia
Estructura confirmada bajo `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/{YYYYMMDD-HHMM}-{slug}/`:

```
manifest.json     # {sessionId, slug, createdAt, source: "mic"|"mp3", model, device, chunkSec, language, mp3SourcePath?}
audio/NNN-{start}-{end}.wav
text/NNN-{start}-{end}.json   # segments + confidences
text/NNN-{start}-{end}.txt    # texto plano
full.txt                       # generado en cierre
informe.md                     # generado en cierre
export.zip                     # generado en cierre (todo lo anterior)
```

`INBOX/OUTBOX` viven fuera de la sesión: `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/ESCRIBIENTE_QUEUE/{INBOX,OUTBOX}/{sessionId}/`. Worker procesa todo lo que cae en `INBOX/`.

### Fase 4 — Dashboard y flows de ejemplo
1. Flow `WiringEditor/examples/flows/07-escribiente-mic.json`: precheck → session open → recorder (mic) con cronómetro → chunker → transcriber → tabla en dashboard → session close.
2. Flow `WiringEditor/examples/flows/08-escribiente-mp3.json`: precheck → session open → file upload (browser-utils) → ffmpeg slicer (chunkSec) → loop → transcriber → tabla → cierre.
3. Flow `WiringEditor/examples/flows/09-escribiente-precheck.json`: standalone para validar entorno.
4. Dashboard widget recorder usa `MediaRecorder` API en navegador, emite `Blob` por chunk al backend Node-RED por websocket dashboard 2.0.

### Fase 5 — Documentación e integración Scriptorium
1. `WiringEditor/packages/node-red-contrib-alephscript-escribiente/README.md` (uso, nodos, flujos).
2. Actualizar `.github/plugins/wire-editor/instructions/wire-editor.instructions.md` mencionando el nuevo pack.
3. Crear `ARCHIVO/PLUGINS/ESCRIBIENTE/README.md` con guía operativa para el agente.
4. Apuntar al plugin desde `.github/copilot-instructions.md` (línea de plugins).
5. Backlog: añadir épica `SCRIPT-ESC-1.0.0` en `BACKLOG-SCRIPTORIUM.md` con FEATs por fase.

## Archivos relevantes
- WiringEditor/packages/node-red-contrib-alephscript/ — **plantilla** a clonar (estructura ts/html/build).
- WiringEditor/packages/node-red-contrib-alephscript/package.json — referencia para el `node-red.nodes` map.
- WiringEditor/examples/flows/05-dashboard-monitoring.json — referencia widget dashboard.
- DocumentMachineSDK/.github/skills/media-extraction/SKILL.md — contrato whisper a respetar.
- DocumentMachineSDK/.github/agents/bartleby.agent.md — persona a referenciar como owner.
- ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/ — destino de sesiones (vacío hoy).
- .github/plugins/registry.json — registrar nuevo plugin.
- .vscode/tasks.json — añadir tasks `ESC: *`.
- .github/copilot-instructions.md — referenciar plugin escribiente.

## Verificación
1. **Precheck**: ejecutar task `ESC: Run [Precheck]` y validar JSON con device, recomendación de modelo y warnings.
2. **Worker aislado**: dejar caer un `.job.json` de prueba en INBOX manualmente; aparece result en OUTBOX < 5s para audio de 10s con modelo `small`.
3. **Build pack**: `npm run build` en el nuevo paquete → genera `dist/nodes/*.js` sin errores TS.
4. **Flow mp3**: importar `08-escribiente-mp3.json`, cargar mp3 de 1 min con chunkSec=20, verificar 3 ficheros en `audio/`, 3 en `text/`, manifest válido, dashboard muestra los 3 tramos en verde.
5. **Flow mic**: importar `07-escribiente-mic.json`, grabar 30s en bloques de 10s, verificar cronómetro y tres tramos transcritos.
6. **Cierre**: invocar `escribiente-session-closer`, verificar `full.txt`, `informe.md` y `export.zip` con todos los wav+txt.
7. **Tests unit (mínimo)**: snapshot del manifest generado y del informe.md para una sesión sintética.
8. **Smoke**: `node-red --userDir ...` carga los 7 nodos sin warnings.

## Riesgos / loose ends
- **MediaRecorder en Node-RED Dashboard 2.0**: requiere widget custom third-party (runtime Node-RED + frontend Vue/UMD); validar permisos `getUserMedia` en localhost (https no necesario en `localhost`).
- **ffmpeg dependency**: el slicer mp3 lo necesita; añadir verificación en `precheck.py`.
- **Python venv**: documentar si usar `--user`, `pipx`, o venv propio del worker. Recomendado: venv en `DocumentMachineSDK/workers/escribiente-whisper/.venv` documentado en README.
- **Concurrencia**: worker single-threaded por ahora (modelo whisper no es thread-safe sin replicar). Suficiente para uso interactivo.
- **GPU en Windows**: requiere `nvidia-cublas-cu12` + `nvidia-cudnn-cu12`; precheck debe detectar y avisar si faltan.

## Excluido del scope (confirmado)
- Diarización, traducción multi-idioma, streaming live, sincronización P2P/BOEs.

## [GPT-5.4] Skill operativo — patrón homologado para widgets Dashboard 2 (2026-04-29)

### Alcance auditado

Solo se ha auditado lo nacido en **esta conversación** o lo explicitado en este `PLAN.md`.

**Resultado:** dentro de este scope, el único nodo dashboard real es `escribiente-dashboard-recorder`. No hay otros nodos dashboard creados en esta conversación que requieran un refactor homólogo adicional ahora mismo.

### Regla práctica para tocar o agregar más dashboard

Si en esta feature se añade otro widget dashboard, **no** basta con repetir el patrón legacy de `category: 'dashboard'` + HTML incrustado. Para `@flowfuse/node-red-dashboard` (Dashboard 2) el patrón correcto validado en esta conversación es:

1. **Nodo runtime Node-RED**
   - `RED.nodes.createNode(this, config)`
   - resolver `const group = RED.nodes.getNode(config.group)`
   - registrar con `group.register(node, config, evts)`
   - usar `evts.onSocket` para eventos cliente→servidor cuando el widget necesite enviar mensajes custom
   - usar `base.stores.data.save(...)` / state store si se quiere persistencia o restauración

2. **Frontend Dashboard 2 separado**
   - crear componente Vue en `ui/components/`
   - exportarlo desde `ui/index.js`
   - escuchar/emitir eventos vía Socket.IO (`widget-action`, `widget-change` o evento custom)
   - asumir que el widget se renderiza como componente Vue, no como HTML embebido del editor de Node-RED

3. **Empaquetado third-party obligatorio**
   - el paquete debe exponerse como `node-red-dashboard-2-*`
   - `package.json` debe incluir bloque `node-red-dashboard-2.widgets`
   - cada widget necesita:
     - `output` → fichero UMD en `resources/`
     - `component` → nombre exacto del componente Vue

4. **Build Vite/UMD alineado con FlowFuse**
   - `build.lib.name` debe alinearse con el widget cargado por Dashboard 2
   - generar `resources/*.umd.js`
   - evitar fugas browser-side de `process.env.NODE_ENV`
   - exportar componente nombrado y `default` para tolerar diferencias del loader
   - externalizar `vue`/`vuex` si el loader del dashboard ya los provee

5. **Instalación local en `~/.node-red`**
   - el `package.json` del `userDir` debe depender del paquete `node-red-dashboard-2-*` correcto
   - tras reinstalar, reiniciar Node-RED y redeploy del flow

### Señales de diagnóstico rápidas

- **Grupo visible + `0 widgets`** → el nodo no está haciendo `group.register(...)` o el widget no entra en `ui-config`
- **Página existe pero no se pinta nada** → falta bundle frontend o Dashboard 2 no lo descubre por `package.json`
- **Consola con `process is not defined`** → build frontend no preparado para navegador
- **Consola con `Chaining cycle detected for promise`** → loader/componente UMD mal resuelto (nombre/export/component)

### Aplicación concreta a Escribiente

Para `escribiente-dashboard-recorder`, el aprendizaje de esta conversación invalida el supuesto anterior de “template-node con HTML+JS” como solución suficiente para Dashboard 2. El patrón correcto aquí es **widget third-party Vue + runtime Node-RED registrado en `ui-group`**.

### Regla de futuro para esta feature

Si se agrega otro dashboard a `Alephscript Escribiente`, debe nacer ya con este esqueleto:

- `src/nodes/<widget>.ts` → runtime + `group.register(...)`
- `src/nodes/<widget>.html` → editor-side config
- `ui/components/<Widget>.vue` → UI real
- `ui/index.js` → export
- `vite.config.*` + `resources/*.umd.js`
- `package.json[node-red-dashboard-2.widgets]`

Con eso se evita repetir el bug principal de esta conversación: **grupo presente pero sin widgets renderizados**.

## [GPT-5.4] Manual rápido de operativa y mapa de carpetas (2026-04-29)

**Orden de operativa recomendado para usuario**

1. Abrir Node-RED editor y desplegar el flow que toque.
2. Elegir uno de los ejemplos reales del repo:
    - `WiringEditor/examples/flows/07-escribiente-mic.json`
    - `WiringEditor/examples/flows/08-escribiente-mp3.json`
    - `WiringEditor/examples/flows/09-escribiente-precheck.json`
3. Si el caso es audio real, asegurarse de que el worker de Whisper está activo.
4. Entrar en la UI del dashboard correspondiente.
5. Ejecutar **Precheck**.
6. Abrir sesión.
7. Enviar audio:
    - **mic** → grabación por tramos
    - **mp3** → subida del fichero y troceado
8. Esperar el retorno de chunks transcritos.
9. Cerrar sesión para consolidar `full.txt`, `informe.md` y `export.zip`.

**Esquema operativo de extremo a extremo**

```text
Usuario
   │
   ├─ Node-RED Editor → importa / despliega flow
   └─ Dashboard 2     → Precheck → Abrir sesión → Mic o MP3 → Cerrar sesión
                                     │
                                     v
                   alephscript-escribiente-dashboard-recorder
                                     │
                                     v
             escribiente-session / chunker / transcriber / session-closer
                                     │
                                     v
ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/ESCRIBIENTE_QUEUE/
   ├─ INBOX/   → jobs pendientes para worker.py
   └─ OUTBOX/  → resultados escritos por worker.py
                                     │
                                     v
ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/{sessionId-o-slug}/
   ├─ manifest.json
   ├─ audio/
   ├─ text/
   ├─ full.txt
   ├─ informe.md
   └─ export.zip
```

**Correspondencia de carpetas en la codebase**

- **Flows de ejemplo**
   - `WiringEditor/examples/flows/07-escribiente-mic.json`
   - `WiringEditor/examples/flows/08-escribiente-mp3.json`
   - `WiringEditor/examples/flows/09-escribiente-precheck.json`
- **Audio de prueba para MP3**
   - `WiringEditor/examples/flows/08-escribiente.mp3`
- **Pack Node-RED Escribiente**
   - `WiringEditor/packages/node-red-contrib-alephscript-escribiente/`
- **Frontend del widget dashboard**
   - `WiringEditor/packages/node-red-contrib-alephscript-escribiente/ui/components/EscribienteDashboardRecorder.vue`
- **Worker Whisper / precheck**
   - `DocumentMachineSDK/workers/escribiente-whisper/worker.py`
   - `DocumentMachineSDK/workers/escribiente-whisper/precheck.py`
- **Cola temporal de procesamiento**
   - `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/ESCRIBIENTE_QUEUE/`
- **Persistencia final de sesiones**
   - `ARCHIVO/PLUGINS/DOCUMENT_MACHINE/STORAGE/TRANSCRIPTIONS/`
- **Instalación local de Node-RED**
   - `C:\Users\aleph\.node-red\`

**Correspondencia flow → URL / uso**

- `07-escribiente-mic.json`
   - URL esperada: `http://127.0.0.1:1880/dashboard/escribiente-mic`
   - uso: captura de micrófono, chunking por tiempo, retorno de tramos transcritos
- `08-escribiente-mp3.json`
   - URL esperada: `http://127.0.0.1:1880/dashboard/escribiente-mp3`
   - uso: subir `08-escribiente.mp3` u otro audio, trocear, transcribir y cerrar sesión
- `09-escribiente-precheck.json`
   - uso principal: validación desde editor/debug del entorno Python/ffmpeg/GPU

**Secuencia mínima recomendada para una demo MP3**

```text
1. Deploy de 08-escribiente-mp3.json
2. Abrir /dashboard/escribiente-mp3
3. Precheck
4. Abrir sesión
5. Seleccionar 08-escribiente.mp3
6. Subir y trocear
7. Esperar chunks en cola / completados
8. Cerrar sesión
9. Revisar TRANSCRIPTIONS/{sesion}/
```

**Qué mirar si algo falla**

- Si el dashboard abre pero no pinta el widget:
   - revisar instalación del paquete `node-red-dashboard-2-alephscript-escribiente`
   - redeploy completo
   - refresco duro del navegador
- Si el precheck sale rojo:
   - revisar Python, `ffmpeg`, GPU/CUDA y rutas del config node
- Si la sesión abre pero no llegan transcripciones:
   - revisar `ESCRIBIENTE_QUEUE/INBOX`
   - revisar que `worker.py` esté corriendo
   - comprobar si aparecen resultados en `ESCRIBIENTE_QUEUE/OUTBOX`
- Si el cierre no genera artefactos:
   - revisar carpeta de sesión en `TRANSCRIPTIONS/`
   - comprobar `text/` antes de invocar el cierre
