% Finite state machine skeleton
:- dynamic state/1.
:- dynamic start_state/1.
:- dynamic final_state/1.
:- dynamic transition/3.

% Sample states
state(idle).
state(running).
state(error).

% Entry and exit points
start_state(idle).
final_state(running).

% Transitions: transition(From, Event, To)
transition(idle, start, running).
transition(running, stop, idle).
transition(running, fail, error).
transition(error, reset, idle).

% Validate transition against declared states
can_transition(From, Event, To) :-
    state(From),
    state(To),
    transition(From, Event, To).

% Compute next state for an event
next_state(Current, Event, Next) :-
    can_transition(Current, Event, Next).

% Guard hook (override as needed)
next_state(Current, Event, Next) :-
    can_transition(Current, Event, Next),
    \+ blocked(Current, Event, Next).

% Example guard stub
blocked(_From, _Event, _To) :- fail.

% Trace helper: list of events to reach a final state
run_path(State, [], State) :- final_state(State).
run_path(State, [Event|Rest], Final) :-
    next_state(State, Event, Next),
    run_path(Next, Rest, Final).
