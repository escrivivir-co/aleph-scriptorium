# Prompt: Exportar Blockly a Prolog

> **Plugin**: prolog-editor  
> **Agente**: PrologEditor  
> **Dependencia**: Plugin BlocklyEditor

---

## Entrada

- **Rutina Blockly**: Archivo JavaScript generado por Blockly
- **Nombre del módulo**: Identificador para el módulo Prolog

## Mapeo de Bloques

### Estructuras de Control

| Bloque Blockly | Código JavaScript | Código Prolog |
|----------------|-------------------|---------------|
| `controls_if` | `if (cond) { ... }` | `( Cond -> Then ; true )` |
| `controls_ifelse` | `if (cond) { ... } else { ... }` | `( Cond -> Then ; Else )` |
| `controls_repeat_ext` | `for (var i = 0; i < n; i++)` | `entre(1, N, I), ...` |
| `controls_whileUntil` | `while (cond) { ... }` | `repeat, ( Cond -> ! ; ... )` |

### Lógica

| Bloque Blockly | Código JavaScript | Código Prolog |
|----------------|-------------------|---------------|
| `logic_compare (EQ)` | `a == b` | `A = B` |
| `logic_compare (NEQ)` | `a != b` | `A \= B` |
| `logic_compare (LT)` | `a < b` | `A < B` |
| `logic_compare (GT)` | `a > b` | `A > B` |
| `logic_operation (AND)` | `a && b` | `A, B` |
| `logic_operation (OR)` | `a \|\| b` | `A ; B` |
| `logic_negate` | `!a` | `\+ A` |

### Variables

| Bloque Blockly | Código JavaScript | Código Prolog |
|----------------|-------------------|---------------|
| `variables_get` | `miVar` | `MiVar` |
| `variables_set` | `miVar = valor` | `retractall(mi_var(_)), asserta(mi_var(Valor))` |

### Funciones/Procedimientos

| Bloque Blockly | Código JavaScript | Código Prolog |
|----------------|-------------------|---------------|
| `procedures_defnoreturn` | `function foo() { ... }` | `foo :- ...` |
| `procedures_defreturn` | `function foo() { return x; }` | `foo(Resultado) :- ... , Resultado = X` |
| `procedures_callnoreturn` | `foo()` | `foo` |
| `procedures_callreturn` | `x = foo()` | `foo(X)` |

## Proceso

1. **Analizar** código JavaScript de Blockly
2. **Identificar** bloques y estructura
3. **Mapear** a predicados Prolog
4. **Declarar** variables dinámicas si hay asignaciones
5. **Generar** archivo .pl con módulo

## Ejemplo

### Entrada (JavaScript de Blockly)
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

### Salida (Prolog)
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

## Limitaciones

1. **Variables mutables**: Requieren `dynamic` y `asserta/retract`
2. **Bucles infinitos**: No soportados (usar recursión acotada)
3. **Closures**: No soportadas en Prolog estándar
4. **Efectos secundarios**: Solo via predicados impuros
5. **Arrays**: Mapear a listas Prolog

## Archivos Generados

- `ARCHIVO/PLUGINS/PROLOG_EDITOR/exports/{nombre}_export.pl`

