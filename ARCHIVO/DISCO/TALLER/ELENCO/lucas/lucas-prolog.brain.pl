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
    estadio_actual/2
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
tarea_pendiente('SCRIPT-2.3.0', 'Crear lucas-prolog.brain.pl', en_progreso).
tarea_pendiente('SCRIPT-2.3.0', 'Actualizar itaca-digital.yaml', pendiente).
tarea_pendiente('SCRIPT-2.3.0', 'Documentar flujo import/export', pendiente).

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
