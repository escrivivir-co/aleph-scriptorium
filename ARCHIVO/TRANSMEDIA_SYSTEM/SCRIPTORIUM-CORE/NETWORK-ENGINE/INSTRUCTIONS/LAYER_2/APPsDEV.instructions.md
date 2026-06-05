# App Designer

## Para qué sirve este documento

Un agente ALEPH que necesita crear una nueva aplicación dentro de Network-Engine.

Este documento explica el mecanismo de apps, el launcher, y cómo arrancar una nueva app sin romper nada.

---

# Modelo Mental

```
App = Unidad ejecutable que consume Network-Engine
```

Una App no es el core.

Una App no es un adaptador.

Una App es un consumidor que:

1. importa core
2. importa uno o más adaptadores
3. se registra en el launcher
4. expone init() y run()

---

# Dónde viven las apps

```
packages/apps/src/
├── launcher.ts       ← el entrypoint que las orquesta
├── hello.ts          ← ejemplo: HelloApp
└── mi-nueva-app.ts   ← tu nueva app iría aquí
```

---

# Anatomía de una App

Toda app implementa la interfaz `App<TConfig, TId, TVersion>` de `@network-engine/core`.

## Los tres genéricos

```ts
App<TConfig, TId, TVersion>
```

* `TConfig` — tipo de la configuración que recibe en `init()`
* `TId` — literal string que identifica la app (e.g. `'hello'`)
* `TVersion` — semver como literal (e.g. `'1.0.0'`)

---

## Estructura mínima

```ts
import { App, AppStatus, createAppId } from '@network-engine/core';

type MiConfig = {
  // tus parámetros de configuración
};

class MiApp implements App<MiConfig, 'mi-app', '1.0.0'> {

  public readonly manifest = {
    id: createAppId('app_mi-app'),
    rawId: 'mi-app' as const,
    name: 'Mi App',
    version: '1.0.0' as const,
    description: 'Descripción de mi app'
  } satisfies App<MiConfig, 'mi-app', '1.0.0'>['manifest'];

  public status: AppStatus = { state: 'STOPPED' };

  public init(config: MiConfig) {
    // guardar config, preparar recursos
  }

  public run() {
    // lógica principal
  }

  public isRunning(): this is App<MiConfig, 'mi-app', '1.0.0'> & { status: { state: 'RUNNING' } } {
    return this.status.state === 'RUNNING';
  }
}

export const miApp = new MiApp() satisfies App<MiConfig, 'mi-app', '1.0.0'>;
```

---

## Qué observar

* `rawId` debe ser un literal `as const` — el launcher lo usa como clave del registry
* `version` debe ser un literal semver `as const`
* `satisfies` garantiza conformidad sin perder inferencia
* `createAppId()` produce un Branded Type
* `isRunning()` es un Type Predicate

---

# El Launcher

El launcher es el entrypoint del monorepo.

Se ejecuta con:

```bash
npm start -- <app-id>
```

Que internamente ejecuta:

```bash
cd packages/apps && bun run src/launcher.ts
```

---

## Cómo funciona

```
1. Lee process.argv para obtener el app-id
2. Si no hay app-id → lista las apps disponibles
3. Busca el app-id en el registry tipado
4. Llama a app.init(config)
5. Llama a app.run()
```

---

## El Registry

El launcher mantiene un array y un registry:

```ts
// Array de todas las apps (tuple as const)
const apps = [helloApp, miApp] as const;

// Registry tipado derivado automáticamente
type MyAppsRegistry = AppRegistry<typeof apps>;

const registry: MyAppsRegistry = {
  hello: helloApp,
  'mi-app': miApp
};
```

`AppRegistry` es un Mapped Type que extrae `rawId` como clave y la app como valor.

El tipo se infiere automáticamente de la tuple.

---

# Pasos para crear una nueva App

## 1. Crear el archivo de la app

```
packages/apps/src/mi-nueva-app.ts
```

Implementar `App<TConfig, TId, TVersion>` siguiendo la estructura mínima.

---

## 2. Registrar en el launcher

Abrir `packages/apps/src/launcher.ts`.

Añadir al array y al registry:

```ts
import { miNuevaApp } from './mi-nueva-app';

const apps = [helloApp, miNuevaApp] as const;

const registry: MyAppsRegistry = {
  hello: helloApp,
  'mi-nueva-app': miNuevaApp
};
```

---

## 3. Añadir la inicialización

En el bloque `main()` del launcher, añadir la rama de inicialización con la config específica:

```ts
if (app.manifest.rawId === 'mi-nueva-app') {
  await app.init({ /* config específica */ });
}
```

---

## 4. Ejecutar

```bash
npm start -- mi-nueva-app
```

Sin argumentos para ver la lista:

```bash
npm start
```

---

# Integración con el Engine

Una app típica:

1. Crea un engine mediante un adaptador (`createNodeEngine()`)
2. Suscribe observers a los streams del orchestrator
3. Despacha eventos al engine
4. Opcionalmente levanta un servidor HTTP o cualquier otro servicio

```ts
import { createNodeEngine } from '@network-engine/node';

// En run():
const engine = createNodeEngine();

engine.universeCreations$.subscribe(event => {
  // reaccionar a eventos
});

engine.dispatch({
  type: 'CREATE_UNIVERSE',
  payload: { id: createUniverseId('mi-universo'), config: {} },
  timestamp: Date.now()
});
```

---

# Variables de Entorno

Cada app puede tener su configuración en `packages/apps/.env`.

La utilidad `getEnv()` de core lee variables de forma cross-runtime:

```ts
import { getEnv } from '@network-engine/core';

const port = parseInt(getEnv('PORT', '3000'), 10);
```

---

# Reglas

* Una app no modifica el core
* Una app no importa directamente APIs de runtime — usa adaptadores
* Una app exporta una instancia con `satisfies`
* Una app se registra en el launcher, no se auto-ejecuta
* El launcher es el único entrypoint
