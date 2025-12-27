# Test: Flujo Completo de Generación de Obra

> **ID**: T037  
> **Sprint**: 1.0.0 (Teatro Interactivo)  
> **Tipo**: Test de integración manual

---

## Objetivo

Validar que el pipeline completo funciona:

```
TALLER → obra.yaml → ARG_BOARD → docs/teatro/ → GH-Pages
```

---

## Prerrequisitos

- [ ] VS Code con GitHub Copilot Chat activo
- [ ] Workspace ALEPH abierto
- [ ] Plugin Teatro instalado (verificar `registry.json`)

---

## Pasos del Test

### 1. Crear proyecto en TALLER

```bash
# Verificar estructura
ls ARCHIVO/DISCO/TALLER/_plantilla/
```

**Esperado**: `obra.yaml`, `personajes/`, `escenas/`

```
@aleph crea un proyecto de obra llamado "test-flujo" en el TALLER
```

**Esperado**: Carpeta `ARCHIVO/DISCO/TALLER/test-flujo/` creada con estructura base

---

### 2. Definir obra.yaml

**Verificar que contiene**:
- [ ] `id` único
- [ ] `titulo`
- [ ] `tipo` (onboarding/laboratorio/exploracion)
- [ ] `personaje_guia` (debe existir en AGENT_CREATOR o actores.json)
- [ ] `estadios[]` con 12 elementos
- [ ] Cada estadio tiene: `id`, `nombre`, `anillo`, `tipo`, `prueba`

---

### 3. Registrar en ARG_BOARD

```
@aleph instala la obra "test-flujo" en el teatro
```

**Verificar**:
- [ ] Entrada en `ARCHIVO/PLUGINS/ARG_BOARD/.arrakis/obras.json`
- [ ] Campo `estado: "registrada"`
- [ ] Campo `estadios` poblado

---

### 4. Generar página impress.js

```
@aleph pon en escena la obra "test-flujo"
```

**Verificar**:
- [ ] Archivo `docs/teatro/test-flujo.md` creado
- [ ] Frontmatter con `layout: obra`
- [ ] 12 diapositivas generadas (una por estadio)
- [ ] Coordenadas 3D correctas según anillo

---

### 5. Actualizar cartelera

**Verificar** `docs/teatro.md`:
- [ ] Obra anterior movida de "En Escena" a "En Cartel"
- [ ] "test-flujo" aparece en "En Escena"
- [ ] No hay duplicaciones

---

### 6. Validar visualización

```bash
# Servir localmente
cd docs && bundle exec jekyll serve
```

**Verificar en navegador** (`http://localhost:4000/aleph-scriptorium/teatro/test-flujo/`):
- [ ] Impress.js carga correctamente
- [ ] Diapositiva inicial visible
- [ ] Navegación con flechas funciona
- [ ] Slider de anillos visible
- [ ] Árbol-índice lateral funcional

---

## Limpieza

```bash
# Eliminar proyecto de test
rm -rf ARCHIVO/DISCO/TALLER/test-flujo/
rm docs/teatro/test-flujo.md
# Revertir cambios en obras.json y teatro.md manualmente
```

---

## Resultado

| Paso | Estado | Notas |
|------|--------|-------|
| 1. Crear proyecto | ⬜ | |
| 2. Definir YAML | ⬜ | |
| 3. Registrar ARG | ⬜ | |
| 4. Generar página | ⬜ | |
| 5. Actualizar cartelera | ⬜ | |
| 6. Validar visual | ⬜ | |

**Fecha**: ____  
**Tester**: ____  
**Versión**: 1.0.0
