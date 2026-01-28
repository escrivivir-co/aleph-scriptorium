# Develop Prolog Brains

Create `.brain.pl` files for Teatro agent characters with identity, knowledge, and decision rules. Brains give agents logical reasoning capabilities via SWI-Prolog.

## Quick Start

### Brain Module Structure

Every brain follows this structure:

```prolog
:- module(brain_NOMBRE, [
    rol/2,
    especialidad/2,
    decidir_accion/2,
    conoce/2
]).

% Identity
rol(NOMBRE, ROL).
especialidad(NOMBRE, ESPECIALIDAD).

% Knowledge
conoce(NOMBRE, DOMINIO_1).
conoce(NOMBRE, DOMINIO_2).

% Decision rules
decidir_accion(NOMBRE, Accion) :-
    contexto(Contexto),
    regla_NOMBRE(Contexto, Accion), !.

% Context-action mappings
regla_NOMBRE(inicio, presentarse).
regla_NOMBRE(buscar_informacion, consultar_indice).
regla_NOMBRE(desconocido, delegar_ox).
```

### Example: Lucas Brain

```prolog
:- module(brain_lucas, [
    rol/2,
    especialidad/2,
    decidir_accion/2,
    conoce/2
]).

rol(lucas, scrum_master).
especialidad(lucas, gestion_indices).

conoce(lucas, funcional_md).
conoce(lucas, tecnico_md).

decidir_accion(lucas, Accion) :-
    contexto(Contexto),
    regla_lucas(Contexto, Accion), !.

regla_lucas(inicio, presentarse).
regla_lucas(buscar_informacion, consultar_indice).
regla_lucas(desconocido, delegar_ox).
```

**Existing brain**: `/ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl`

### Create Brain from Description

1. Identify the agent's role and specialties
2. Define knowledge domains
3. Map context to actions as rules
4. Generate the `.brain.pl` module
5. Save to `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/` or `ARCHIVO/PLUGINS/AGENT_CREATOR/templates/`

## Prolog Coding Conventions

| Convention | Example |
|-----------|---------|
| Predicate names | `snake_case` |
| Action predicates | `do_start/2`, `do_hablar/2` |
| Query predicates | `get_estado/1`, `get_nombre/1` |
| Boolean predicates | `is_activo/1`, `is_disponible/1` |
| Last arg = result | `decidir(Agente, Resultado)` |
| First arg = context | `do_accion(Requester, Resultado)` |

## Template Creation

### From Description to Template

**Input**: "A system that controls whether an agent can speak based on energy level and conversation context"

**Output** (`.template`):
```json
{
  "name": "Agent Speech Controller",
  "description": "Controls when an agent can speak based on energy and context",
  "main": "speech-controller",
  "files": ["."],
  "exports": ["puede_hablar/2", "set_energia/2", "set_contexto/1", "get_estado/1"]
}
```

Templates are stored in: `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/`

---

<details>
<summary><strong>Blockly Transpilation & Integration Patterns</strong> (click to expand)</summary>

## Blockly to Prolog Transpilation

### Block Mapping

| Blockly Block | JavaScript | Prolog |
|--------------|-----------|--------|
| `controls_if` | `if (cond) { ... }` | `( Cond -> Then ; true )` |
| `controls_ifelse` | `if...else` | `( Cond -> Then ; Else )` |
| `controls_repeat_ext` | `for (i=0; i<n; i++)` | `entre(1, N, I), ...` |
| `logic_compare (EQ)` | `a == b` | `A = B` |
| `logic_compare (NEQ)` | `a != b` | `A \= B` |
| `logic_operation (AND)` | `a && b` | `A, B` |
| `logic_operation (OR)` | `a \|\| b` | `A ; B` |
| `logic_negate` | `!a` | `\+ A` |
| `variables_get` | `myVar` | `MyVar` (uppercase) |
| `variables_set` | `myVar = val` | `retractall(my_var(_)), asserta(my_var(Val))` |
| `procedures_defnoreturn` | `function foo() {...}` | `foo :- ...` |
| `procedures_defreturn` | `function foo() { return x; }` | `foo(Resultado) :- ..., Resultado = X` |

### Transpilation Example

**JavaScript (from Blockly)**:
```javascript
function decidir(energia, contexto) {
  if (energia > 50) {
    if (contexto == 'amigable') {
      return 'hablar';
    } else {
      return 'observar';
    }
  } else {
    return 'descansar';
  }
}
```

**Prolog output**:
```prolog
:- module(decidir_export, [decidir/3]).

decidir(Energia, Contexto, Resultado) :-
    (   Energia > 50
    ->  (   Contexto = amigable
        ->  Resultado = hablar
        ;   Resultado = observar
        )
    ;   Resultado = descansar
    ).
```

**Limitations**: No closures, no infinite loops, arrays map to lists, mutable variables need `dynamic` + `asserta/retract`.

Exports saved to: `ARCHIVO/PLUGINS/PROLOG_EDITOR/exports/`

## Integration with AGENT_CREATOR

Add `prologRules` field to agent recipe:

```json
{
  "name": "agente-logico",
  "base": ["blueflag"],
  "prologRules": {
    "file": "ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/agente-logico.pl",
    "entryPoint": "decidir/2"
  }
}
```

## Integration with Teatro (ARG_BOARD)

Add Prolog condition to a scene stage:

```json
{
  "id": 5,
  "nombre": "La Prueba",
  "conditionProlog": {
    "file": "templates/obra-conditions.pl",
    "predicate": "puede_avanzar(Usuario, 5)"
  },
  "conditionFallback": "return true;"
}
```

## E2E Teatro Agent Workflow

```
1. prolog_create_session({ sessionId: "lucas-obra1", obraId: "obra1" })
2. prolog_consult_file({ sessionId: "lucas-obra1",
     filePath: "ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/lucas.brain.pl" })
3. prolog_load_rules_from_db({ sessionId: "lucas-obra1", app: "obra1" })
4. prolog_query({ sessionId: "lucas-obra1",
     query: "decidir_accion(lucas, Accion)." })
5. prolog_destroy_session({ sessionId: "lucas-obra1" })
```

## Blockly Toolbox Reference

The Blockly Prolog toolbox is defined at:
`/BlocklyEditor/packages/blockly-prolog-editor-blocks/src/toolbox/prolog-toolbox.ts`

## Related Files

- **Brain example**: `/ARCHIVO/DISCO/TALLER/ELENCO/lucas/lucas-prolog.brain.pl`
- **Templates dir**: `/ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/`
- **Blockly toolbox**: `/BlocklyEditor/packages/blockly-prolog-editor-blocks/src/toolbox/prolog-toolbox.ts`
- **Brain editor UI**: `/PrologEditor/frontend/` (BrainEditorComponent tab)
- **Crear template prompt**: `/.github/plugins/prolog-editor/prompts/crear-template-prolog.prompt.md`
- **Exportar blockly prompt**: `/.github/plugins/prolog-editor/prompts/exportar-blockly-prolog.prompt.md`

</details>
