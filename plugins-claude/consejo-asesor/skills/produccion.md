# Produccion (Articulo / Integracion)

Produce un texto nuevo o integra material en un capitulo existente.

## Quick Usage

```
/produccion articulo {tema}
/produccion integrar {capitulo} {material}
```

Usa @articulador para articulos nuevos o @integrador para incorporar material a capitulos.

## What It Creates

Texto producido en la voz del proyecto, opcionalmente auditado.

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

## Two Sub-modes

### Articulo (@articulador)

1. Usuario indica tematica, referencias del corpus, longitud
2. @articulador lee indices y corpus del proyecto (`proyecto.corpus`)
3. Produce borrador con la voz del proyecto (`proyecto.estilo`)
4. Autodiagnostico: busca codigo de agente en su propia produccion
5. Opcional: el borrador pasa por modo AUDITORIA
6. Revision final basada en la auditoria

### Integracion (@integrador)

1. Usuario indica capitulo-ancla y material nuevo
2. @integrador lee diagnostico del capitulo y material nuevo
3. Formula plan de intervencion (que tocar, que preservar)
4. Ejecuta intervencion (sin destruir lo que funciona)
5. Verificacion: busca codigo de agente, compara con modelo del proyecto
6. Opcional: pasa por modo AUDITORIA

## Key Rule

**El output es un artefacto limpio**: sin metadata de sesion, sin menciones a agentes, sin metacomentario. Solo texto en la voz del proyecto.

## Output Location

`ARCHIVO/DISCO/CONSEJO/{proyecto}/PRODUCCIONES/OUTPUT/`

</details>
