---
mode: 'agent'
description: 'Somete un texto a auditoria triple del consejo asesor'
---

# Auditoria del Consejo

Somete un texto a revision de los tres auditores del consejo.

## Entrada

- **Texto a auditar**: Texto inline o ruta a archivo
- **Proyecto**: Proyecto activo en ARCHIVO/DISCO/CONSEJO/

## Proceso

1. Leer el texto a auditar.
2. Leer `.github/plugins/consejo-asesor/data/agentes.md` para los criterios de cada auditor.
3. Evaluar como cada auditor:
   - **@verdad**: evidencia, utilidad, falsificabilidad, posverdad, exploracion
   - **@sombra**: quien defiende, que sacrifica, como fracasa, coste
   - **@registro**: modo, auditorio, genero, argumento, metodo, estilo, ethos, pathos
4. Gestionar escalados cruzados si procede.
5. Consolidar veredicto.
6. Guardar sesion.

## Formato por auditor

```markdown
## Auditoria @{id-auditor}

**Texto auditado:** {referencia}
**Veredicto:** {adecuado | con observaciones | requiere revision}

### Evaluacion

| Criterio | Resultado | Observacion |
|----------|-----------|-------------|
| ... | OK/ALERTA | ... |

### Recomendaciones
{Si aplica}

### Escalados
{Si aplica}
```
