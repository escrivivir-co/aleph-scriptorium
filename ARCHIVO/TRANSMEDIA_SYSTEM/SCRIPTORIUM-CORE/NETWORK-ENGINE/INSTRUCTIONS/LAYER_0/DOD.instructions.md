# Definition of Done (DoD)

## El Estándar FOSS (Free and Open Source Software)

En este ecosistema, una tarea **nunca** está terminada únicamente porque "el código funciona en mi máquina" o porque los tests pasan.

Al ser un proyecto abierto, distribuido y con vocación arquitectónica a largo plazo, el código debe ser comprensible y mantenible por contribuidores asíncronos (humanos o agentes).

---

## Criterios de Aceptación Universales

Para dar una tarea por finalizada (especialmente en `AGI MODE` o `ASI MODE`), se debe cumplir lo siguiente:

### 1. Funcionalidad y Corrección
* El código resuelve el problema planteado sin introducir regresiones.
* Se respetan estrictamente los contratos de TypeScript (sin `any` injustificados, con `strict: true`).

### 2. Trazabilidad Arquitectónica (El "Por Qué")
* Si se tomó una decisión de diseño importante, se ha registrado en la carpeta `ADR/`.
* No hay "workarounds" (parches temporales) sin documentar explícitamente su justificación.

### 3. Coherencia Documental
* Si se ha alterado un comportamiento funcional, se ha actualizado el dossier correspondiente en `DOSSIERS/`.
* Si se ha añadido un nuevo patrón estructural, se ha reflejado en las constituciones de `INSTRUCTIONS/LAYER_1` o `LAYER_3`.

### 4. Empatía con el Contribuidor (FOSS)
* El código es auto-explicativo (buenos nombres de variables, tipos descriptivos, uso de Branded Types si es necesario).
* Los mensajes de error o logs son semánticos y ayudan a quien no escribió el código a entender qué falló.

### 5. Regla de Persistencia
* Toda idea con potencial futuro (investigaciones inconclusas, debates de ASI Mode) ha terminado plasmada en un **Dossier** o en el **Scratchpad**.
* **El conocimiento no desaparece al finalizar la sesión de trabajo.**
