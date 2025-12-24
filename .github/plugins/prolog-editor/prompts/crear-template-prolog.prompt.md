# Prompt: Crear Template Prolog

> **Plugin**: prolog-editor  
> **Agente**: PrologEditor

---

## Entrada

Usuario describe la lógica que quiere implementar en Prolog.

## Proceso

1. **Identificar dominio**: ¿Qué tipo de problema resuelve?
   - Máquina de estados
   - Reglas de decisión
   - Inferencia sobre hechos
   - Validación de condiciones

2. **Diseñar predicados**:
   - Listar acciones/consultas necesarias
   - Definir aridad de cada predicado
   - Identificar datos dinámicos

3. **Generar estructura**:
   ```prolog
   :- module(nombre, [lista_de_exports]).
   
   :- dynamic(dato_mutable/N).
   :- initialization(setup_inicial).
   
   % Predicados exportados
   ```

4. **Crear archivos**:
   - `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/{nombre}.template`
   - `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/{nombre}/app.pl`

## Salida

### Archivo .template
```json
{
  "name": "{Nombre del Template}",
  "description": "{Descripción}",
  "main": "{nombre}",
  "files": ["."],
  "exports": ["{pred1/arity1}", "{pred2/arity2}"]
}
```

### Archivo app.pl
```prolog
:- module(app, [{exports}]).

:- dynamic({datos_dinamicos}).

% Inicialización
:- initialization({setup}).

% Predicados
{predicados_generados}
```

## Ejemplo

**Input**: "Quiero un sistema que controle si un agente puede hablar según su nivel de energía y el contexto de la conversación"

**Output**:

`.template`:
```json
{
  "name": "Agent Speech Controller",
  "description": "Controla cuándo un agente puede hablar según energía y contexto",
  "main": "speech-controller",
  "files": ["."],
  "exports": ["puede_hablar/2", "set_energia/2", "set_contexto/1", "get_estado/1"]
}
```

`app.pl`:
```prolog
:- module(app, [puede_hablar/2, set_energia/2, set_contexto/1, get_estado/1]).

:- dynamic(energia/1).
:- dynamic(contexto/1).

:- initialization((
    asserta(energia(100)),
    asserta(contexto(neutral))
)).

% Consultar si el agente puede hablar
puede_hablar(Agente, Resultado) :-
    energia(E),
    contexto(C),
    (   E > 20, C \= silencio
    ->  format(atom(Resultado), '~w puede hablar (energia: ~w, contexto: ~w)', [Agente, E, C])
    ;   format(atom(Resultado), '~w no puede hablar (energia: ~w, contexto: ~w)', [Agente, E, C])
    ).

% Modificar energía
set_energia(Cantidad, Resultado) :-
    retractall(energia(_)),
    asserta(energia(Cantidad)),
    format(atom(Resultado), 'Energia establecida a ~w', [Cantidad]).

% Modificar contexto
set_contexto(Nuevo) :-
    retractall(contexto(_)),
    asserta(contexto(Nuevo)).

% Obtener estado actual
get_estado(Estado) :-
    energia(E),
    contexto(C),
    Estado = estado(energia(E), contexto(C)).
```

