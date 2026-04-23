---
name: Crear Voz
description: "Scaffold de nueva Voz (mod): corriente ideológica → corpus inicial → análisis → cristalización de @voz"
applyTo: "DocumentMachineSDK/**/*.md, ARCHIVO/PLUGINS/LORE_SDK/**/*"
---

# Prompt: Crear Voz

## Objetivo

Crear un nuevo **mod** (módulo de lore específico) en el SDK para una corriente ideológica a analizar. Al final del proceso, existe una Voz (`@voz`) que puede generar poemas *desde* ese corpus, no *sobre* él.

## Input Esperado

El usuario debe proporcionar:
1. **Nombre del mod** — identificador kebab-case (ej: `ecosocialista`, `reformista`)
2. **Corriente a analizar** — descripción de la publicación, colectivo o movimiento
3. **Primer editorial** — texto completo del primer editorial a procesar
4. **Idioma** — idioma del corpus (defecto: español)

## Proceso

### Fase 0: Preparación

1. Leer `DocumentMachineSDK/proyecto.config.template.md` para entender la estructura
2. Verificar que el mod no existe ya en el submódulo
3. Confirmar con el usuario los datos de input

### Fase 1: Crear Estructura del Mod

Crear en el submódulo `DocumentMachineSDK/`:

```
proyecto.config.md          ← rellenar template con datos del usuario
corpus/
  editoriales/              ← directorio para material fuente
    [YYYY-MM-DD_slug].md    ← primer editorial (si provisto)
  analisis/                 ← directorio para informes de @bartleby
  corpus.md                 ← archivo inicial vacío (solo cabecera)
guiones/                    ← directorio para flujos de trabajo
mod/
  agents/    (.gitkeep)
  prompts/   (.gitkeep)
  instructions/ (.gitkeep)
  skills/
    editorial-analysis/     ← directorio para taxonomías
  hooks/     (.gitkeep)
docs/
  _poemas/                  ← directorio para poemas publicados
  _config.yml               ← configurar baseurl y nombre del mod
```

### Fase 2: Primer Editorial

Si el usuario proporcionó un editorial:

4. Guardar en `corpus/editoriales/[YYYY-MM-DD_slug].md`
5. Invocar `/feed` → `@bartleby` analiza y produce informe en `corpus/analisis/[YYYY-MM-DD_slug].analisis.md`

### Fase 3: Bootstrap del Corpus

6. Invocar `/diff-corpus` → `@archivero` compara con corpus.md vacío (todo es NUEVO)
7. Invocar `/merge-corpus` → `@archivero` integra en corpus.md
8. Invocar `/status` → verificar nick identificado

### Fase 4: Cristalización

Si se han procesado ≥1 editorial:

9. Invocar `/design` → `@cristalizador` propone:
   - `mod/agents/voz.agent.md` — agente generativo
   - `mod/instructions/voz-[nick].instructions.md` — 6 marcas del nick + proporciones retóricas
   - `mod/instructions/perfil-lector.instructions.md` — subsumption protocol
   - `mod/prompts/poema.prompt.md` — flujo de generación de poemas

10. Revisar con el usuario y aprobar los artefactos propuestos

### Fase 5: Verificación

11. Ejecutar `/status` — confirmar que el mod está operativo
12. Generar poema de prueba con `@voz` (si existe) para verificar la cristalización

## Output Esperado

```
✅ Mod [nombre] creado
✅ proyecto.config.md configurado
✅ Primer editorial procesado por @bartleby
✅ corpus.md inicializado con [N] hallazgos
✅ Nick identificado: [nick]
✅ @voz cristalizada por @cristalizador
✅ /poema disponible

Próximos pasos:
- Añadir más editoriales con /alimentar-corpus
- Generar poemas con @voz: "genera un poema sobre [tensión]"
- Publicar catálogo con /publicar-catalogo
```

## Notas Técnicas

- **Rama**: El trabajo del Scriptorium ocurre sobre `integration/beta/scriptorium` en `DocumentMachineSDK`
- **Patrón**: `main → mod` sigue siendo la referencia editorial interna del SDK, pero la integración del monorepo vive en la rama estándar del Scriptorium
- **Subsumption**: @portal-editorial se activa automáticamente para adaptar el lenguaje al perfil del lector
- **Nick**: Una vez identificado en el primer editorial, el nick se confirma acumulativamente

## Ejemplo

```
Usuario: "quiero una voz para el colectivo Marea Ecosocialista. 
Aquí está su editorial de marzo 2026: [texto]"

@plugin_ox_loresdk crea:
1. mod: ecosocialista
2. corpus/editoriales/2026-03-01_marea-ecosocialista.md
3. Análisis @bartleby → nick: ecosocialista-radical
4. @cristalizador propone @voz + instructions
5. /poema disponible
```
