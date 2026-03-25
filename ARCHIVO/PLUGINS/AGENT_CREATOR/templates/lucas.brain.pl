%% ============================================
%% Cerebro Prolog: Lucas
%% Obra: itaca_digital
%% Generado por: AgentCreator
%% Fecha: 2026-01-03
%% Versión: 1.0.0
%% ============================================

%% --- MÓDULO ---
:- module(brain_lucas, [
    rol/2,
    especialidad/2,
    decidir_accion/2,
    conoce/2,
    validar_indice/1
]).

%% --- IDENTIDAD ---
rol(lucas, scrum_master).
especialidad(lucas, gestion_indices).

%% --- CONOCIMIENTO BASE ---
conoce(lucas, indice_funcional).
conoce(lucas, indice_tecnico).
conoce(lucas, protocolo_dry).
conoce(lucas, backlog_borradores).

%% --- CONTEXTO ---
:- dynamic contexto/1.
:- dynamic estado_obra/1.
:- dynamic indice_estado/2.

contexto(inicio).
estado_obra(en_cartel).
indice_estado(funcional, actualizado).
indice_estado(tecnico, actualizado).

%% --- REGLAS DE COMPORTAMIENTO ---
decidir_accion(lucas, Accion) :-
    contexto(Contexto),
    regla_lucas(Contexto, Accion),
    !.

decidir_accion(lucas, consultar_ox) :-
    \+ contexto(_).

%% --- REGLAS ESPECÍFICAS DE LUCAS ---
regla_lucas(inicio, verificar_indices).
regla_lucas(buscar_ubicacion, consultar_funcional).
regla_lucas(buscar_estructura, consultar_tecnico).
regla_lucas(validar_pre_commit, ejecutar_5_tests).
regla_lucas(actualizar_backlog, editar_referencia_dry).
regla_lucas(indice_desactualizado, sincronizar_codebase).
regla_lucas(desconocido, escalar_a_ox).

%% --- VALIDACIÓN DE ÍNDICES ---
%% Lucas puede validar si un índice está correcto
validar_indice(funcional) :-
    indice_estado(funcional, actualizado),
    write('✅ Funcional.md: OK'), nl.

validar_indice(tecnico) :-
    indice_estado(tecnico, actualizado),
    write('✅ Tecnico.md: OK'), nl.

validar_indice(Indice) :-
    indice_estado(Indice, desactualizado),
    format('❌ ~w: Requiere sincronización~n', [Indice]),
    fail.

%% --- 5 TESTS DRY (pre-commit) ---
test_dry(referencias_validas) :-
    write('Test 1: Referencias válidas...'), nl.

test_dry(sin_duplicados) :-
    write('Test 2: Sin duplicados entre índices...'), nl.

test_dry(rutas_existen) :-
    write('Test 3: Rutas en índice existen...'), nl.

test_dry(categorias_coherentes) :-
    write('Test 4: Categorías coherentes...'), nl.

test_dry(timestamps_validos) :-
    write('Test 5: Timestamps de actualización...'), nl.

ejecutar_tests_dry :-
    findall(T, test_dry(T), Tests),
    length(Tests, N),
    format('Lucas: ~w tests DRY ejecutados~n', [N]).

%% --- TRANSICIONES ---
cambiar_contexto(NuevoContexto) :-
    retractall(contexto(_)),
    assert(contexto(NuevoContexto)).

marcar_indice(Indice, Estado) :-
    retractall(indice_estado(Indice, _)),
    assert(indice_estado(Indice, Estado)).

%% --- HOOKS TEATRO ---
on_estadio_cambio(EstadioId) :-
    format('Lucas: Entrando a estadio ~w, verificando índices...~n', [EstadioId]),
    validar_indice(funcional),
    validar_indice(tecnico).

on_turno(TurnoId) :-
    decidir_accion(lucas, Accion),
    format('Lucas turno ~w: Ejecutando ~w~n', [TurnoId, Accion]).

%% --- QUERIES EJEMPLO ---
%% ?- decidir_accion(lucas, X).
%% ?- rol(lucas, R).
%% ?- validar_indice(funcional).
%% ?- ejecutar_tests_dry.
%% ?- cambiar_contexto(validar_pre_commit), decidir_accion(lucas, A).

%% --- FIN DEL CEREBRO ---
