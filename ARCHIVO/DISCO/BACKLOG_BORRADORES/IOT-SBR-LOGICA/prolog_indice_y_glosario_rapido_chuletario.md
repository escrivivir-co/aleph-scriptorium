# Chuletario de Prolog – Índice / Glosario de entrada rápida

Documento pensado como **puerta de reentrada** a Prolog, orientado a lógica para agentes/bots (reglas, inferencia, estados, decisiones).

---

## 1. Conceptos nucleares

**Hecho (fact)**  
Afirmación atómica verdadera en la base de conocimiento.  
Ej.: `sensor(temp, alta).`

**Regla (rule)**  
Implicación lógica: *cabeza :- cuerpo*.  
Ej.: `alarma :- sensor(temp, alta), sensor(humo, si).`

**Consulta (query)**  
Pregunta al sistema.  
Ej.: `?- alarma.`

**Base de conocimiento (KB)**  
Conjunto de hechos y reglas cargados.

---

## 2. Sintaxis esencial

**Átomos**  
Constantes simbólicas: `rojo`, `temp_alta`, `'Texto con espacios'`.

**Variables**  
Empiezan en mayúscula o `_`: `X`, `Estado`, `_Tmp`.

**Términos compuestos**  
Estructuras: `estado(bot, activo)`.

**Aridad**  
Número de argumentos: `estado/2`.

---

## 3. Unificación y resolución

**Unificación**  
Proceso de hacer coincidir términos.  
Ej.: `estado(X, activo)` unifica con `estado(bot1, activo)`.

**Backtracking**  
Búsqueda de soluciones alternativas al fallar una rama.

**Resolución SLD**  
Mecanismo lógico subyacente de Prolog.

---

## 4. Control del flujo

**Orden de reglas**  
Importa: Prolog evalúa de arriba abajo.

**Orden de metas**  
Las condiciones se prueban en secuencia.

**Corte (!)**  
Compromete decisiones y evita backtracking.  
Ej.: `accion(X) :- condicion(X), !, ejecutar(X).`

**Fail**  
Fuerza fallo explícito.

---

## 5. Negación y condiciones

**Negación como fallo (\+)**  
`\+ peligro.` significa: no se puede probar `peligro`.

**If-Then-Else**  
`(Cond -> Then ; Else)`.

---

## 6. Listas (imprescindible)

**Sintaxis**  
`[A, B, C]`  
`[H|T]` cabeza / cola.

**Patrones comunes**  
- Vacía: `[]`  
- Un elemento: `[X]`

**Predicados clave**  
- `member/2`  
- `append/3`  
- `length/2`

---

## 7. Recursión típica

**Estructura canónica**  
- Caso base  
- Caso recursivo

Ej.:
```prolog
activo([H|_]) :- H = activo.
activo([_|T]) :- activo(T).
```

---

## 8. Estados y agentes (patrón bot)

**Representación de estado**  
`estado(Agente, Situacion).`

**Transiciones**  
`transicion(EstadoActual, Evento, NuevoEstado).`

**Reglas de decisión**  
`decidir(Estado, Accion).`

**Ciclo percepción–decisión–acción**  
1. `percibir/2`  
2. `decidir/2`  
3. `actuar/2`

---

## 9. Dinamismo (muy usado en bots)

**Predicados dinámicos**  
`:- dynamic estado/2.`

**assert/1 – retract/1**  
Modificar la KB en tiempo de ejecución.

**retractall/1**  
Borrado masivo controlado.

---

## 10. Metaprogramación

**call/1**  
Ejecutar una meta construida dinámicamente.

**=../2 (univ)**  
Conversión término ⇄ lista.

---

## 11. E/S y depuración

**write/1, writeln/1**  
Salida estándar.

**trace / notrace**  
Seguimiento paso a paso.

**listing/0, listing/1**  
Inspeccionar la KB.

---

## 12. Errores conceptuales frecuentes

- Pensar en Prolog como lenguaje imperativo  
- Usar `!` sin comprender el árbol de búsqueda  
- Mezclar lógica pura con efectos laterales

---

## 13. Regla de oro mental

> *Describe el problema, no el algoritmo.*

Si una regla parece complicada, probablemente está mal modelada.

---

## 14. Mini-mapa mental

- Hechos → Mundo  
- Reglas → Conocimiento  
- Consultas → Preguntas  
- Backtracking → Exploración  
- Corte → Compromiso

---

Si quieres, en el siguiente paso puedo:
- Adaptar este índice **exactamente** a la estructura de tu repositorio.
- Crear un **chuletario de 1 página** solo con patrones y ejemplos.
- Traducirlo a **Prolog mental-model → JS/TS** para refresco rápido.

