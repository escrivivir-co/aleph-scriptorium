# Prompt: Actualizar Índice

## Instrucción

Cuando el usuario pida actualizar los índices o cuando detectes que están desincronizados, ejecuta este procedimiento.

---

## Fuentes a comparar

| Fuente | Compara con | Detecta |
|--------|-------------|---------|
| `.github/plugins/registry.json` | Tecnico.md § Plugins | Plugins no documentados |
| `.github/agents/*.agent.md` | Funcional.md § Agentes | Agentes no listados |
| `.gitmodules` | Tecnico.md § Submódulos | Submódulos no documentados |
| `.github/instructions/` | Tecnico.md § Ontología | Instructions no listadas |

---

## Procedimiento

### Paso 1: Escanear estado actual

```bash
# Plugins
cat .github/plugins/registry.json | jq '.plugins | keys'

# Agentes
ls .github/agents/*.agent.md

# Submódulos
git submodule status

# Instructions
ls .github/instructions/*.instructions.md
```

### Paso 2: Comparar con índices

1. Leer `ARCHIVO/DEVOPS/Funcional.md`
2. Leer `ARCHIVO/DEVOPS/Tecnico.md`
3. Identificar discrepancias

### Paso 3: Proponer ediciones

Para cada discrepancia, generar propuesta:

```markdown
**Discrepancia detectada**

Tipo: [Plugin no documentado | Agente faltante | ...]
Elemento: [nombre]
Índice afectado: [Funcional.md | Tecnico.md]

**Propuesta de edición**:

En [archivo], sección [§N]:

+ | [nombre] | [descripción] | [ruta] | [estado] |
```

### Paso 4: Aplicar cambios

Tras aprobación del usuario:
1. Editar el archivo correspondiente
2. Verificar formato consistente
3. Confirmar cambio aplicado

---

## Formato de entrada por tipo

### Para plugins (Tecnico.md § 3)

```markdown
| {id} | {nombre} | {descripción corta} | ✅ |
```

### Para agentes (Funcional.md § 2)

```markdown
| @{nombre} | {descripción} | {capa} |
```

### Para submódulos (Tecnico.md § 4)

```markdown
| {nombre} | {descripción} | {rama} | {estado} |
```

### Para instructions (Tecnico.md § 2.2)

```markdown
| {nombre} | {applyTo} | {descripción} |
```

---

## Ejemplo completo

**Usuario**: Acabo de instalar el plugin novelist, actualiza el índice

**@indice**:

```
📊 Escaneando estado actual...

Plugins en registry.json: 18
Plugins en Tecnico.md: 17

⚠️ Discrepancia detectada

Tipo: Plugin no documentado
Elemento: novelist
Índice afectado: Tecnico.md

Propuesta de edición:

En Tecnico.md, sección § 3.1 Plugins Operativos:

+ | novelist | MCP Novelist | Narrativas con memoria | ✅ |

¿Aplicar cambio? (S/n)
```

Tras aprobación:

```
✅ Cambio aplicado en ARCHIVO/DEVOPS/Tecnico.md

Verificación:
- Línea añadida en § 3.1
- Formato consistente con otras entradas
- Total plugins documentados: 18
```

---

## Actualización masiva

Si hay múltiples discrepancias:

```markdown
📊 Resumen de sincronización

| Índice | Discrepancias | Acción |
|--------|---------------|--------|
| Funcional.md | 2 | Añadir agentes |
| Tecnico.md | 3 | Añadir plugins |

Propuestas:
1. Funcional.md: Añadir @plugin_ox_novelist
2. Funcional.md: Añadir @plugin_ox_network
3. Tecnico.md: Añadir novelist
4. Tecnico.md: Añadir network
5. Tecnico.md: Añadir blockly-editor

¿Aplicar todos los cambios? (S/n/seleccionar)
```
