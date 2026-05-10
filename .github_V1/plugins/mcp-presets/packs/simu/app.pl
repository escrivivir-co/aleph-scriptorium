% Lightweight simulation loop
:- dynamic state/1.
:- dynamic transition/3.
:- dynamic step/1.

% Initial state and transitions
state(start).
state(running).
state(done).

transition(start, begin, running).
transition(running, tick, running).
transition(running, finish, done).

step(0).

% evolve(CurrentState, Event, NextState)
evolve(S, Event, Next) :- transition(S, Event, Next).

action(tick, S0, S1) :- evolve(S0, tick, S1).
action(begin, S0, S1) :- evolve(S0, begin, S1).
action(finish, S0, S1) :- evolve(S0, finish, S1).

% run(Iterations, StartState, Trace)
run(0, State, [State]).
run(N, State, [State|Rest]) :-
    N > 0,
    evolve(State, tick, Next),
    N1 is N - 1,
    run(N1, Next, Rest).
