# Browser Adapter Technical Constitution

## Arquitectura de Dependencias

`@network-engine/browser` es una implementación concreta que conecta los contratos de `@network-engine/core` con el ecosistema de Web APIs del navegador.

*   **Obligatorio:** `@network-engine/core` es la única dependencia arquitectónica permitida para el motor base.
*   **Permitido:** Web APIs estándar (`window`, `document`, `localStorage`, `fetch`, `IndexedDB`).
*   **Prohibido:** Cualquier dependencia de módulos `node:*`. Si accidentalmente se importa `node:fs` aquí, el build para el cliente fallará.
*   **Prohibido:** Importar `xstate` o `rxjs` directamente. Todo acceso debe ocurrir vía el core.

---

# Patrones Estructurales

## 1. El Patrón Plugin

Todo acceso a APIs del navegador debe encapsularse en una clase que implemente `NetworkPlugin`.

```ts
import { NetworkPlugin, PluginId, PluginCapabilities, getEnv } from '@network-engine/core';

export class LocalStoragePlugin implements NetworkPlugin {
  public readonly id = 'browser-localstorage' as PluginId;
  public readonly capabilities: PluginCapabilities = {
    canInfer: false,
    canPersist: true,
    canVisualize: false
  };

  public install<const TOptions extends Record<string, unknown>>(options: TOptions): void {
    // Implementación usando window.localStorage
  }

  public isInstalled(): this is NetworkPlugin & { installed: true } {
    return this.installed;
  }
}
```

## 2. El Patrón Factory

El consumidor nunca ensambla el orquestador y los plugins manualmente. Usa factory functions.

```ts
export function createBrowserEngine(): NetworkOrchestrator {
  const engine = new NetworkOrchestrator();
  const storagePlugin = new LocalStoragePlugin();

  storagePlugin.install({ prefix: 'aleph_' });
  engine.registerPlugin(storagePlugin);

  return engine;
}
```

---

# Evolución del Código

## Entornos del Navegador
Si se construyen adaptadores específicos para Web Workers (donde el DOM no está disponible), deben separarse las implementaciones y verificar qué Web APIs son lícitas (ej. `WorkerGlobalScope` vs `Window`).

---

# Checklist Técnico de Merge

□ Ningún import usa paquetes incompatibles con navegadores (ej. dependencias de CJS/Node puras).

□ No se re-exportan tipos del core.

□ Las factory functions retornan tipos tipados explícitamente (`NetworkOrchestrator`).

□ Ejecuta `npm run typecheck` en el workspace sin errores.
