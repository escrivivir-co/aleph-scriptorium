# Prompt: Importar Reglas Prolog

> **Plugin**: prolog-editor  
> **Agente**: PrologEditor

---

## Entrada

- **Archivo .pl**: Ruta al archivo Prolog a importar
- **Nombre** (opcional): Nombre para el archivo en el repositorio

## Proceso

1. **Leer** archivo fuente
2. **Validar** sintaxis básica:
   - Declaración de módulo
   - Predicados exportados
   - Puntos finales en cláusulas
3. **Copiar** a `ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/`
4. **Registrar** en catálogo si aplica

## Validaciones

### Estructura de Módulo
```prolog
:- module(nombre, [export1/arity, export2/arity]).
```

### Sintaxis
- [ ] Cada cláusula termina en `.`
- [ ] Variables empiezan con mayúscula
- [ ] Paréntesis balanceados
- [ ] No hay caracteres inválidos

## Salida

```markdown
## Reglas Importadas

**Archivo**: `mi-logica.pl`
**Destino**: `ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/mi-logica.pl`

### Predicados Exportados
| Predicado | Aridad | Descripción |
|-----------|--------|-------------|
| decidir | 2 | Decide acción según contexto |
| puede_hablar | 1 | Verifica si puede hablar |

### Validación
- ✅ Módulo declarado
- ✅ Exports válidos
- ✅ Sintaxis correcta
```

## Ejemplo

**Input**:
```
Importar: /Users/usuario/mis-reglas.pl
```

**Output**:
```
Reglas importadas a ARCHIVO/PLUGINS/PROLOG_EDITOR/rules/mis-reglas.pl

Predicados encontrados:
- regla_principal/3
- condicion_auxiliar/2

¿Deseas asignar estas reglas a un agente? (ver prompt asignar-prolog-agente)
```

