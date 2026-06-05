# Apps Technical Constitution

## Arquitectura de Dependencias

`@network-engine/apps` es el punto más alto en la jerarquía de dependencias del monorepo.

*   **Obligatorio:** Consumir `@network-engine/core` vía `workspace:*`.
*   **Permitido:** Consumir adaptadores de runtime (`@network-engine/node`, `@network-engine/browser`).
*   **Permitido:** Dependencias de infraestructura final (ej. `express`, bases de datos, librerías de UI) exclusivas para levantar la app.
*   **Prohibido:** Exportar abstracciones de negocio desde `apps` hacia otros paquetes. Las apps no tienen consumidores (excepto el propio ejecutor).
*   **Prohibido:** Replicar la lógica de inicialización del `NetworkOrchestrator` de forma manual. Siempre deben usar las fábricas de los adaptadores (ej. `createNodeEngine()`).

---

# Patrones Estructurales

## 1. La Interfaz `App`

Toda aplicación ejecutable debe implementar estrictamente la interfaz genérica provista por el núcleo.

```ts
import { App, AppStatus, createAppId } from '@network-engine/core';

type Config = { port: number };

export class MiApp implements App<Config, 'mi-app', '1.0.0'> {
  public readonly manifest = {
    id: createAppId('app_mi-app'),
    rawId: 'mi-app' as const,
    name: 'Mi App',
    version: '1.0.0' as const
  } satisfies App<Config, 'mi-app', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };

  public init(config: Config) { /* ... */ }
  public run() { /* ... */ }
  public isRunning(): this is App<Config, 'mi-app', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}
```

## 2. El Patrón Registry (Launcher)

Las apps no se auto-ejecutan directamente. Se exponen como módulos y se registran en el `launcher.ts`.

*   El launcher mantiene una tupla `const apps = [...] as const;` con todas las apps disponibles.
*   El launcher infiere un `AppRegistry` tipado a partir de esta tupla.
*   El launcher es el único que intercepta `process.argv` y ejecuta el ciclo `init()` -> `run()`.

---

# Evolución del Código

## Al añadir una nueva App
*   Asegurar que el `rawId` es único y es un string literal (usar `as const`).
*   Registrarla explícitamente en el array `apps` y en el objeto `registry` del `launcher.ts`.
*   No modificar las reglas del `launcher.ts` sin un rediseño mayor acordado (afecta a todas las apps).

---

# Checklist Técnico de Merge

□ La aplicación implementa la interfaz genérica `App` del núcleo.

□ Se utiliza `satisfies` en el manifest para verificar los tipos de TypeScript 5.

□ La instanciación del engine se realiza importando un Factory de un adaptador, nunca usando `new NetworkOrchestrator()` directamente.

□ Ejecuta `npm run typecheck` en el workspace sin errores.
