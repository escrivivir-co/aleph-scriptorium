# Browser Adapter Functional Constitution

## El Adaptador como Interfaz Interactiva y Distribuida

Mientras que el adaptador de Node suele encargarse de la carga pesada o persistente, el adaptador de Browser es la ventana humana al ecosistema metalingüístico.

Funcionalmente, permite que los universos y las máquinas de Network-Engine se ejecuten de manera local, distribuida y visual en el cliente.

---

# Casos de Uso Funcionales

Un universo corriendo bajo el adaptador de Browser asume típicamente los siguientes roles:

* **Visualización Dinámica:** Extrae los flujos de observación del orquestador y los convierte en representaciones visuales (grafos, consolas interactivas, entornos inmersivos).
* **Entornos Locales de Simulación (Sandboxing):** Permite al usuario interactuar y expandir un universo (ej. deduciendo axiomas) puramente en su máquina, sin coste de servidor, garantizando privacidad total y operabilidad offline.
* **Agentes Ligeros en el Borde (Edge Agents):** Máquinas de inferencia ligeras que pueden delegarse al navegador del usuario final usando Web Workers.

---

# Filosofía del Enchufe en el Cliente

Al igual que Node, el navegador no altera las reglas matemáticas del núcleo. Simplemente cambia el sustrato físico. 

Donde Node persistía en disco, el Browser persiste en `localStorage` o `IndexedDB`. Donde Node emitía logs de terminal, el Browser puede renderizar un canvas 3D. 

El universo computacional permanece idéntico; su encarnación es la que se adapta.
