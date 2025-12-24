---
name: Prolog Editor
description: Instrucciones para el plugin de edición y ejecución de lógica Prolog en el Scriptorium.
applyTo: "ARCHIVO/PLUGINS/PROLOG_EDITOR/**/*.pl, ARCHIVO/PLUGINS/PROLOG_EDITOR/**/*.md, .github/plugins/prolog-editor/**/*.md"
---

# Instrucciones: Plugin PrologEditor

> **Fuente de verdad**: `.github/plugins/prolog-editor/manifest.md`  
> **Perfil de usuario**: Académico con alto conocimiento de Prolog

---

## Propósito

El plugin PrologEditor proporciona:
1. Asistencia para generar plantillas de código Prolog
2. Ejecución de consultas (si SWI-Prolog está instalado)
3. Exportación de lógica visual (Blockly) a código Prolog
4. Integración con agentes y obras del Teatro

---

## Ubicaciones

| Tipo | Ruta |
|------|------|
| Templates | `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/` |
| Reglas usuario | `ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/` |
| Exportaciones | `ARCHIVO/PLUGINS/PROLOG_EDITOR/exports/` |
| Motor Prolog | `iot-sbr-logica-para-bots/backend/` |

---

## Estructura de Template

### Archivo .template (JSON)
```json
{
  "name": "Nombre del Template",
  "description": "Descripción breve",
  "main": "nombre-carpeta",
  "files": ["."],
  "exports": ["predicado1/2", "predicado2/1"]
}
```

### Archivo app.pl (Código Prolog)
```prolog
:- module(app, [predicado1/2, predicado2/1]).

:- dynamic(estado/1).
:- initialization(asserta(estado(inicial))).

predicado1(Entrada, Salida) :-
    % Lógica aquí
    Salida = procesado.

predicado2(Consulta) :-
    estado(Consulta).
```

---

## Convenciones de Código

### Nombres de Predicados
- `snake_case` para predicados públicos
- Prefijo `do_` para acciones con efectos secundarios
- Prefijo `get_` para consultas puras
- Prefijo `is_` para predicados booleanos

### Aridad
- Último argumento para resultado (`Resultado`)
- Primer argumento para contexto (`Requester`, `Estado`)

### Ejemplo
```prolog
do_start(Requester, Resultado) :-
    get_estado_actual(Estado),
    (   Estado = parado
    ->  set_estado(corriendo),
        format(atom(Resultado), 'Iniciado por ~w', [Requester])
    ;   format(atom(Resultado), 'No se puede iniciar desde ~w', [Estado])
    ).
```

---

## Integración con BlocklyEditor

### Bloques Soportados para Transpilación

| Bloque Blockly | Mapeo Prolog |
|----------------|--------------|
| `controls_if` | `( Cond -> Then ; Else )` |
| `controls_repeat` | Recursión con contador |
| `logic_compare` | Operadores `=`, `\=`, `<`, `>` |
| `logic_operation` | `and` → `,`, `or` → `;` |
| `variables_get` | Variable Prolog (mayúscula) |
| `variables_set` | `asserta/retract` |
| `procedures_defnoreturn` | Predicado sin resultado |
| `procedures_defreturn` | Predicado con resultado |

### Limitaciones
- No soporta bucles `while` infinitos (usar recursión acotada)
- Variables mutables requieren `dynamic`
- No soporta closures

---

## Integración con AGENT_CREATOR

### Campo en Receta
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

### Uso en Agente
El agente puede invocar predicados Prolog para:
- Decidir acciones basadas en contexto
- Validar condiciones complejas
- Inferir conocimiento desde hechos

---

## Integración con ARG_BOARD

### Condición en Estadio
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

### Flujo de Evaluación
1. Teatro intenta evaluar `conditionProlog`
2. Si SWI-Prolog disponible → ejecuta predicado
3. Si no disponible → usa `conditionFallback` (JavaScript)

---

## Ejecución de Consultas

### Con SWI-Prolog
```bash
# Iniciar backend del submódulo
cd iot-sbr-logica-para-bots
npm start

# API disponible en http://localhost:8000/api/run-rule
```

### Desde el Agente
```
@prologeditor ejecutar: do_start(usuario, Resultado)
```

### Respuesta
```json
{
  "status": 200,
  "payload": "Iniciado por usuario"
}
```

---

## Validación de Sintaxis

Antes de guardar o ejecutar, validar:

1. **Módulo declarado**: `:- module(nombre, [exports]).`
2. **Predicados exportados**: Coinciden con declaración
3. **Variables**: Empiezan con mayúscula
4. **Puntos finales**: Cada cláusula termina en `.`
5. **Paréntesis balanceados**: Especialmente en `( -> ; )`

---

## Modo Académico

> Este plugin está diseñado para usuarios con **alto conocimiento de Prolog**.

### Lo que el agente HACE
- Genera templates con estructura correcta
- Sugiere predicados estándar
- Valida sintaxis básica
- Documenta exportaciones

### Lo que el agente NO HACE
- Enseñar Prolog desde cero
- Depurar lógica compleja
- Optimizar predicados
- Garantizar terminación

---

## Antipatrones

| ❌ No hacer | ✅ Hacer en su lugar |
|-------------|---------------------|
| Recursión sin base | Siempre definir caso base |
| Variables sin uso | Prefijar con `_` si no se usa |
| Predicados infinitos | Acotar con contador |
| Mezclar hechos/reglas | Separar en secciones |
| Olvidar `dynamic` | Declarar predicados mutables |

---

## Referencias

- [SWI-Prolog Manual](https://www.swi-prolog.org/pldoc/)
- [Learn Prolog Now!](http://www.learnprolognow.org/)
- [Plugin BlocklyEditor](../../blockly-editor/)
- [Plugin AGENT_CREATOR](../../agent-creator/)
- [Plugin ARG_BOARD](../../arg-board/)

