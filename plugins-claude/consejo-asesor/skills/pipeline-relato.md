# Pipeline Relato

Pipeline de 3 fases para transformar materiales brutos en relatos emanados del metarelato.

## Quick Usage

```
/pipeline-relato {fase} {proyecto}
```

Fases: `laboratorio`, `input`, `relato`.

## What It Creates

| Fase | Input | Output |
|------|-------|--------|
| laboratorio | Archivos brutos en LABORATORIO/ | Fichas en PRODUCCIONES/INPUT/ |
| input | Fichas existentes | config.md (foco + formato + restricciones) |
| relato | Fichas + config + metarelato | Relato en PRODUCCIONES/OUTPUT/ |

---

<details>
<summary><strong>Full Documentation</strong> (click to expand)</summary>

## Fase 1: "procesar laboratorio"

1. Preguntar al usuario que carpeta de `LABORATORIO/` procesar
2. Leer todos los archivos (PDFs, textos, etc.)
3. Para cada documento, generar una **ficha**:

```markdown
# Ficha: [titulo del documento]

## Metadatos
- **Titulo**: ...
- **Autor**: ...
- **Fecha**: ...
- **Fuente**: ruta al archivo original

## Resumen
[200-300 palabras]

## Conceptos clave
- [concepto 1]: breve explicacion
- ...

## Conexiones con el metarelato
[Para cada capitulo de indice.md con relacion:]
- **[capitulo]**: como conecta

## Citas relevantes
> "cita textual" (pagina/seccion)
```

4. Guardar como `PRODUCCIONES/{PROYECTO}/INPUT/ficha_NN_[nombre].md`

**Consejo opcional**: @verdad puede auditar las fichas.

## Fase 2: "preparar input"

1. Leer fichas existentes
2. Trabajar con el usuario para:
   - Ampliar o corregir fichas
   - Identificar conexiones adicionales
   - Definir **foco del relato** (las "gafas" tematicas)
   - Elegir **formato de salida**:
     - `micro-bloging`: plantilla relato.md (180/2000 chars)
     - `ensayo`: ~500 palabras
     - `libre`: usuario especifica
3. Generar `config.md`:

```markdown
# Configuracion del relato

## Proyecto
[nombre]

## Foco tematico
[descripcion del foco]

## Formato de salida
[micro-bloging | ensayo | libre]

## Restricciones y pautas
- [pauta 1]
- ...

## Capitulos del metarelato a priorizar
- [capitulo 1]
- ...
```

**Consejo opcional**: @protagonista define foco; @portal identifica audiencia.

## Fase 3: "generar relato"

1. Leer en orden:
   - `indice.md` (metarelato)
   - Fichas en INPUT/
   - `config.md`
2. Generar relato:
   - **No es un resumen de fichas**: es una creacion narrativa que usa materiales como sustrato
   - Respetar foco tematico y formato de config.md
   - Tono: objetivacion participativa, "nosotros" asambleario como sujeto constituyente
3. Guardar en `PRODUCCIONES/{PROYECTO}/OUTPUT/`

**Consejo opcional**: @articulador produce borrador; @registro audita tono; @sombra audita coste.

## Integration Points

- Relato -> `@plugin_ox_novelist`: integrar como escena/capitulo
- Relato -> `@periodico`: publicar como noticia
- Fichas -> `@plugin_ox_enciclopedia`: cruzar con tomos

## Key Principle

> El relato emana del metarelato. Los materiales del laboratorio son sustrato, no contenido. El metarelato es la estructura generativa.

</details>
