# Auditoria del Consejo

Somete un texto a revision de los tres auditores del consejo asesor.

## Quick Usage

```
/auditoria {texto o ruta al archivo}
```

Los tres auditores (@verdad, @sombra, @registro) evaluan en paralelo y consolidan un veredicto.

## What It Creates

Informe estructurado por auditor + veredicto consolidado, guardado en `ARCHIVO/DISCO/CONSEJO/{proyecto}/sesiones/`.

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

## Required Inputs

1. **Texto a auditar** (required): Texto inline o ruta a archivo .md
2. **Proyecto** (required): Proyecto activo con `proyecto.config.md`

## The Three Auditors

| Auditor | Evalua | Criterios |
|---------|--------|-----------|
| @verdad | Epistemica | Evidencia, utilidad, falsificabilidad, posverdad, exploracion |
| @sombra | Adversarial | Quien defiende, que sacrifica, como fracasa, coste |
| @registro | Retorica | Modo, auditorio, genero, argumento, metodo, estilo, ethos, pathos |

## Execution Flow

### Step 1: Cada auditor evalua

Formato por auditor:
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
{Si aplica: a que auditor y por que}
```

### Step 2: Protocolo de escalado

Si un auditor detecta algo fuera de su dominio:
- @verdad escala a @sombra si detecta amenaza no epistemica
- @sombra escala a @verdad si detecta afirmacion sin evidencia
- @registro escala a @verdad o @sombra si el problema es de contenido

### Step 3: Veredicto consolidado

Sintesis de los tres informes en un veredicto unico del consejo.

## Output Example

```
Auditoria completada

Texto: cap04-repertorio-arquitecturas.md
Auditores: @verdad, @sombra, @registro

@verdad: con observaciones (2 afirmaciones sin fuente)
@sombra: adecuado
@registro: con observaciones (tono excesivamente academico para audiencia general)

Veredicto: CON OBSERVACIONES
Escalados: 0

Sesion guardada en: ARCHIVO/DISCO/CONSEJO/FUNDACION/sesiones/2026-02-21_auditoria-cap04.md
```

</details>
