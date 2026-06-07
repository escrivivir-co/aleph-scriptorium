# Importaciones ESM y el uso de `.js`

**¿Puedes usar un paquete que usa `.js` en sus imports internos o exportaciones, aunque tú no uses `.js` en los tuyos?**
**Sí, absolutamente.**

**¿Tienes que importar sus objetos con `.js`?**
**Depende de cómo importes, pero por lo general, NO.**

Aquí te explico los detalles:

1. **Importaciones de paquetes de terceros (Bare imports):**
   Cuando importas la raíz de un paquete desde `node_modules` (ej. `import { Algo } from 'nombre-paquete'`), Node.js y TypeScript resuelven el punto de entrada usando el `package.json` del paquete (campos `exports`, `main`, o `module`). No necesitas preocuparte de si el paquete usa internamente `.js` o no. Simplemente usas el nombre del paquete.

2. **Importaciones profundas (Deep imports):**
   Si tienes que importar un archivo específico del paquete que no está mapeado en los `exports` principales (ej. `import { Algo } from 'nombre-paquete/carpeta/archivo'`), y el paquete es nativo ESM sin un mapeo adecuado, **sí** tendrías que incluir el `.js` al final (`'nombre-paquete/carpeta/archivo.js'`), porque Node.js en ESM estricto requiere extensiones para resolver archivos concretos. Sin embargo, los paquetes modernos bien construidos usan el campo `exports` en su `package.json` para evitar que tengas que hacer esto.

3. **Sobre tu configuración actual sin `.js`:**
   Mencionas que en tu código no usas `.js`. Esto significa que probablemente estás usando un empaquetador (como Webpack, Vite, esbuild), o ejecutando tu código con herramientas como `tsx`, `ts-node`, o tienes TypeScript configurado de una manera que resuelve las extensiones automáticamente (ej. `moduleResolution: "node"`). 
   
   *Nota de TypeScript maximizado (Layer 0):* Si alguna vez cambias a resolución ESM nativa estricta de Node (`"moduleResolution": "NodeNext"` o `"Bundler"` en `tsconfig.json`), TypeScript te obligará a poner `.js` en tus **importaciones relativas locales**. Pero en lo que respecta a consumir paquetes externos, el comportamiento estándar (`import 'paquete'`) se mantiene igual.

**En resumen:**
Instala el paquete y úsalo de manera estándar. Su uso interno de `.js` no contamina la forma en que tú lo importas desde tu código.

```typescript
import { moduloPaquete } from 'el-paquete';
```
