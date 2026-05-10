---
mode: 'agent'
description: 'Produce un articulo o integra material en un capitulo'
---

# Produccion

Produce un articulo nuevo con @articulador o integra material en un capitulo con @integrador.

## Entrada

- **Tipo**: `articulo` o `integrar`
- **Tema/capitulo**: Tematica del articulo o capitulo-ancla para integracion
- **Material** (para integrar): Articulos, relatos, criticas a incorporar

## Proceso para articulo

1. Leer corpus del proyecto (`proyecto.config.md` -> `corpus.rutas`).
2. Como @articulador: leer indices y fuentes relevantes.
3. Producir borrador en la voz del proyecto (`proyecto.estilo`).
4. Autodiagnostico: buscar codigo de agente en la produccion.
5. Opcional: pasar por auditoria.

## Proceso para integracion

1. Leer capitulo-ancla y material nuevo.
2. Como @integrador: formular plan (que tocar, que preservar).
3. Ejecutar intervencion (sin destruir lo que funciona).
4. Verificacion contra el modelo del proyecto.

## Regla clave

**El output es un artefacto limpio**: sin metadata de sesion, sin menciones a agentes, sin metacomentario. Solo texto en la voz del proyecto.
