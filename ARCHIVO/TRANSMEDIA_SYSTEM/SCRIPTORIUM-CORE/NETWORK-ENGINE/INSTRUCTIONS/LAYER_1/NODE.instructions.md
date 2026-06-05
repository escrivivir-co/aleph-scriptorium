# Node Adapter Technical Constitution

## Arquitectura de Dependencias

`@network-engine/node` es una implementación concreta que conecta los contratos de `@network-engine/core` con el runtime Node.js.

*   **Obligatorio:** Importar módulos de Node siempre con el protocolo `node:` (ej. `node:fs`).
*   **Obligatorio:** `@network-engine/core` es la única dependencia arquitectónica permitida para el motor base.
*   **Prohibido:** Importar `xstate` o `rxjs` directamente. Todo acceso debe ocurrir vía el core.
*   **Prohibido:** Inventar interfaces de plugins nuevas. Siempre se implementa `NetworkPlugin` del core.

---

# Patrones Estructurales

## 1. El Patrón Plugin

Todo acceso a APIs de Node (filesystem, child_process, crypto) debe encapsularse en una clase que implemente `NetworkPlugin`.

```ts
import { NetworkPlugin, PluginId, PluginCapabilities } from '@network-engine/core';

export class FileSystemPlugin implements NetworkPlugin {
  public readonly id = 'node-fs-persistence' as PluginId;
  public readonly capabilities: PluginCapabilities = {
    canInfer: false,
    canPersist: true,
    canVisualize: false
  };

  public install<const TOptions extends Record<string, unknown>>(options: TOptions): void {
    // Implementación usando node:fs
  }

  public isInstalled(): this is NetworkPlugin & { installed: true } {
    return this.installed;
  }
}
```

## 2. El Patrón Factory

El consumidor (la aplicación) nunca instancia plugins ni el orquestador manualmente. Usa factory functions que pre-ensamblan el entorno.

```ts
export function createNodeEngine(): NetworkOrchestrator {
  const engine = new NetworkOrchestrator();
  const fsPlugin = new FileSystemPlugin();

  fsPlugin.install({ path: './data' });
  engine.registerPlugin(fsPlugin);

  return engine;
}
```

---

# Evolución del Código

## Al añadir un nuevo plugin
*   Declarar honestamente sus `capabilities`.
*   Usar Const Type Parameters (`<const TOptions>`) en su método `install`.
*   Registrarlo dentro de la factory function correspondiente, no forzar al consumidor a hacerlo.

---

# Checklist Técnico de Merge

□ Todos los imports built-in de Node usan el prefijo `node:`.

□ No se re-exportan tipos del core.

□ No se declara lógica de estado ni RxJS de forma independiente al core.

□ Las factory functions retornan tipos tipados explícitamente (`NetworkOrchestrator`).

□ Ejecuta `npm run typecheck` en el workspace sin errores.
