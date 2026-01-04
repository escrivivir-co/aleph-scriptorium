%% =============================================================================
%% Lucas Prolog Brain — Scrum Master del Índice
%% Obra: Ítaca Digital
%% Pack: AgentPrologBrain v1.0.0
%% =============================================================================
%%
%% Este archivo define la lógica declarativa de Lucas como personaje del Teatro
%% ARG. Puede ser consultado vía MCPPrologServer (puerto 3006) para validar
%% coherencia documental en tiempo real.
%%
%% Uso:
%%   1. prolog_create_session({sessionId: 'lucas-itaca', obraId: 'itaca-digital'})
%%   2. prolog_consult_file({sessionId: 'lucas-itaca', filePath: 'lucas-prolog.brain.pl'})
%%   3. prolog_query({sessionId: 'lucas-itaca', query: 'documentacion_coherente(Doc).'})
%%

:- module(lucas_brain, [
    % Validación DRY
    duplicado/2,
    coherente/1,
    documentacion_coherente/1,
    
    % Índices
    indice_funcional/2,
    indice_tecnico/2,
    ubicacion_canonica/2,
    
    % Scrum
    tarea_pendiente/3,
    epic_activa/1,
    sprint_actual/1,
    
    % Mentor
    consejo/2,
    estadio_actual/2,
    
    % Sensor/Actuador (DRAMATURGIA-MAQUINA-1.0.0 S02)
    recibir_senal/2,
    procesar_cambio/2,
    notificar/2,
    verificar_coherencia_antes/0,
    estado_actual/1,
    suscriptor/1,
    demo_sensor_actuador/0
]).

%% =============================================================================
%% HECHOS BASE — Índice Funcional
%% =============================================================================

%% indice_funcional(Capacidad, Ubicacion).
indice_funcional(editar_reglas_prolog, 'PrologEditor/frontend').
indice_funcional(ejecutar_query_prolog, 'MCPGallery/mcp-mesh-sdk/src/MCPPrologServer.ts').
indice_funcional(crear_packs_mcp, '.github/plugins/mcp-presets/packs').
indice_funcional(validar_coherencia, 'ARCHIVO/DEVOPS/Funcional.md').
indice_funcional(publicar_web, 'docs/').
indice_funcional(gestionar_plugins, '.github/plugins').
indice_funcional(crear_agentes, '.github/plugins/agent-creator').

%% =============================================================================
%% HECHOS BASE — Índice Técnico
%% =============================================================================

%% indice_tecnico(Estructura, Ruta).
indice_tecnico(agentes_core, '.github/agents').
indice_tecnico(agentes_plugin, '.github/plugins/*/agents').
indice_tecnico(instrucciones, '.github/plugins/scriptorium-pack/instructions').
indice_tecnico(prompts, '.github/prompts').
indice_tecnico(backlog_activo, 'ARCHIVO/DISCO/BACKLOG_BORRADORES').
indice_tecnico(backlog_archivado, 'ARCHIVO/DISCO/BACKLOG_ARCHIVADOS').
indice_tecnico(noticias, 'ARCHIVO/NOTICIAS').
indice_tecnico(teatro_obras, 'ARCHIVO/PLUGINS/TEATRO/obras').
indice_tecnico(elenco, 'ARCHIVO/DISCO/TALLER/ELENCO').

%% =============================================================================
%% REGLAS DRY — Validación de Duplicados
%% =============================================================================

%% Un documento está duplicado si tiene la misma capacidad en dos ubicaciones
duplicado(Capacidad, [Ubic1, Ubic2]) :-
    indice_funcional(Capacidad, Ubic1),
    indice_funcional(Capacidad, Ubic2),
    Ubic1 \= Ubic2.

%% Un documento es coherente si NO está duplicado
coherente(Capacidad) :-
    indice_funcional(Capacidad, _),
    \+ duplicado(Capacidad, _).

%% Validar toda la documentación
documentacion_coherente(Capacidad) :-
    coherente(Capacidad).

%% =============================================================================
%% REGLAS — Ubicación Canónica
%% =============================================================================

%% Dada una pregunta, determinar dónde buscar
ubicacion_canonica(que, 'ARCHIVO/').
ubicacion_canonica(como, '.github/instructions').
ubicacion_canonica(cuando, 'BACKLOG-SCRIPTORIUM.md').
ubicacion_canonica(quien, '.github/agents').
ubicacion_canonica(donde, 'ARCHIVO/DEVOPS/Funcional.md').

%% =============================================================================
%% HECHOS SCRUM — Sprint FC1
%% =============================================================================

sprint_actual('FC1').

%% epic_activa(NombreEpic).
epic_activa('SCRIPT-2.2.0').
epic_activa('SCRIPT-2.3.0').
epic_activa('RELEASE-1.0.0-beta.1').

%% tarea_pendiente(Epic, Tarea, Estado).
tarea_pendiente('SCRIPT-2.3.0', 'Crear AgentPrologBrain.pack.json', completada).
tarea_pendiente('SCRIPT-2.3.0', 'Crear lucas-prolog.brain.pl', completada).
tarea_pendiente('SCRIPT-2.3.0', 'Actualizar itaca-digital.yaml', completada).
tarea_pendiente('SCRIPT-2.3.0', 'Documentar flujo import/export', completada).
tarea_pendiente('SCRIPT-2.3.0', 'Test end-to-end MCPPrologServer', completada).

%% =============================================================================
%% REGLAS MENTOR — Consejos para el Viajero
%% =============================================================================

%% consejo(Situacion, Mensaje).
consejo(perdido, 
    'Cuando no sepas dónde buscar, consulta @indice. El mapa existe.').
consejo(duplicando,
    'Si copias información, pregúntate: ¿hay una fuente única? DRY es ley.').
consejo(bloat,
    'Si el contexto crece sin control, reduce: menos instrucciones, más foco.').
consejo(confundido,
    'Ante la confusión, invoca @ox. El oráculo conoce todos los agentes.').

%% =============================================================================
%% REGLAS TEATRO — Estadios de Ítaca Digital
%% =============================================================================

%% estadio_actual(Personaje, Estadio).
%% Lucas opera en el estadio 11 (La Integración) del Anillo 3
estadio_actual(lucas, 11).

%% El viajero puede avanzar si completa la prueba
puede_avanzar(Viajero, ProximoEstadio) :-
    estadio_actual(Viajero, EstadioActual),
    EstadioActual < 12,
    ProximoEstadio is EstadioActual + 1.

%% Lucas ayuda en la prueba del estadio 11
prueba_estadio(11, 'Entender el ciclo completo DISCO → ARCHIVO → Web').
ayuda_disponible(11, lucas).

%% =============================================================================
%% REGLAS DE INFERENCIA — Meta-validación
%% =============================================================================

%% Verificar si el sistema de índices está sano
sistema_indices_sano :-
    \+ duplicado(_, _),
    indice_funcional(_, _),
    indice_tecnico(_, _).

%% Generar reporte de salud
reporte_salud(Reporte) :-
    (sistema_indices_sano 
        -> Reporte = 'OK: Sistema de índices coherente'
        ;  Reporte = 'WARN: Hay duplicados o índices vacíos').

%% =============================================================================
%% CICLO SENSOR/ACTUADOR — DRAMATURGIA-MAQUINA-1.0.0 (S02)
%% =============================================================================
%%
%% Lucas opera como ACTUADOR del modelo Scriptorium-como-Máquina:
%%   - Recibe señales de sensores (@ox, otros agentes)
%%   - Procesa cambios de estado con verificación DRY
%%   - Notifica a personajes suscritos (eferencia)
%%

%% Exportar nuevos predicados
:- module(lucas_brain, [
    % ... (predicados existentes) ...
    % Sensor/Actuador (S02)
    recibir_senal/2,
    procesar_cambio/2,
    notificar/2,
    verificar_coherencia_antes/0,
    estado_actual/1,
    suscriptor/1,
    demo_sensor_actuador/0
]).

%% Estado dinámico
:- dynamic estado_actual/1.
:- dynamic sensor_log/3.
:- dynamic notificacion_log/3.

%% Estado inicial
estado_actual(operativo).

%% Suscriptores por defecto (personajes que reciben notificaciones)
suscriptor(penelope).
suscriptor(orfeo).
suscriptor(viajero).

%% -----------------------------------------------------------------------------
%% T02.1: recibir_senal/2 — Aferencia generalizada
%% -----------------------------------------------------------------------------
%% recibir_senal(+Fuente, +NuevoEstado)
%% Recibe señal de cualquier sensor (no solo @ox) y registra en log.

recibir_senal(Fuente, NuevoEstado) :-
    get_time(Timestamp),
    assertz(sensor_log(Fuente, NuevoEstado, Timestamp)),
    format('[SENSOR] ~w reporta: ~w~n', [Fuente, NuevoEstado]),
    procesar_cambio(estado_actual, NuevoEstado).

%% -----------------------------------------------------------------------------
%% T02.2: procesar_cambio/2 — Cerebro SBR con verificación DRY
%% -----------------------------------------------------------------------------
%% procesar_cambio(+EstadoAnterior, +NuevoEstado)
%% Procesa cambio de estado solo si pasa verificación de coherencia.

procesar_cambio(_, NuevoEstado) :-
    estado_actual(E),
    E == NuevoEstado,
    !,
    format('[CEREBRO] Estado sin cambios: ~w~n', [E]).

procesar_cambio(_, NuevoEstado) :-
    verificar_coherencia_antes,
    !,
    retractall(estado_actual(_)),
    assertz(estado_actual(NuevoEstado)),
    format('[CEREBRO] Estado cambiado a: ~w~n', [NuevoEstado]),
    notificar_a_todos(NuevoEstado).

procesar_cambio(_, NuevoEstado) :-
    format('[CEREBRO] BLOQUEADO: Coherencia falló. No se aplica: ~w~n', [NuevoEstado]),
    fail.

%% Verificar coherencia DRY antes de cualquier cambio
verificar_coherencia_antes :-
    sistema_indices_sano,
    format('[DRY-CHECK] Coherencia OK~n', []).

verificar_coherencia_antes :-
    \+ sistema_indices_sano,
    format('[DRY-CHECK] WARN: Índices con problemas~n', []),
    fail.

%% -----------------------------------------------------------------------------
%% T02.3: notificar/2 — Eferencia broadcast
%% -----------------------------------------------------------------------------
%% notificar(+Destinatario, +Mensaje)
%% Notifica a un personaje específico y registra en log.

notificar(Destinatario, Mensaje) :-
    get_time(Timestamp),
    assertz(notificacion_log(Destinatario, Mensaje, Timestamp)),
    format('[LUCAS→~w] ~w~n', [Destinatario, Mensaje]).

%% Notificar a todos los suscriptores
notificar_a_todos(Estado) :-
    format(atom(Mensaje), 'Estado actualizado: ~w', [Estado]),
    forall(suscriptor(P), notificar(P, Mensaje)).

%% -----------------------------------------------------------------------------
%% DEMO: demo_sensor_actuador/0
%% -----------------------------------------------------------------------------
%% Ejecuta ciclo completo para verificar implementación.

demo_sensor_actuador :-
    format('~n=== DEMO SENSOR/ACTUADOR ===~n', []),
    format('1. Estado inicial...~n', []),
    estado_actual(E0),
    format('   Estado: ~w~n', [E0]),
    
    format('2. Simulando señal de @ox...~n', []),
    recibir_senal(ox, parado),
    
    format('3. Verificando nuevo estado...~n', []),
    estado_actual(E1),
    format('   Estado: ~w~n', [E1]),
    
    format('4. Restaurando estado operativo...~n', []),
    recibir_senal(ox, operativo),
    
    format('5. Estado final...~n', []),
    estado_actual(E2),
    format('   Estado: ~w~n', [E2]),
    
    format('=== DEMO COMPLETADA ===~n~n', []).

%% =============================================================================
%% EJEMPLOS DE QUERIES
%% =============================================================================
%%
%% ?- documentacion_coherente(X).
%% X = editar_reglas_prolog ;
%% X = ejecutar_query_prolog ;
%% ...
%%
%% ?- ubicacion_canonica(como, Donde).
%% Donde = '.github/instructions'.
%%
%% ?- tarea_pendiente('SCRIPT-2.3.0', Tarea, Estado).
%% Tarea = 'Crear AgentPrologBrain.pack.json', Estado = completada ;
%% ...
%%
%% ?- consejo(perdido, Mensaje).
%% Mensaje = 'Cuando no sepas dónde buscar, consulta @indice...'
%%
%% ?- reporte_salud(R).
%% R = 'OK: Sistema de índices coherente'.
%%
%% ?- demo_sensor_actuador.
%% === DEMO SENSOR/ACTUADOR ===
%% 1. Estado inicial...
%%    Estado: operativo
%% 2. Simulando señal de @ox...
%% [SENSOR] ox reporta: parado
%% [DRY-CHECK] Coherencia OK
%% [CEREBRO] Estado cambiado a: parado
%% [LUCAS→penelope] Estado actualizado: parado
%% ...
%% === DEMO COMPLETADA ===
