# Tutatix

**Tipo**: Personaje (FIA-enabled)  
**Arquetipo**: MENTOR  
**Rol**: Guardián epistémico con memoria estructurada

---

## Descripción

Tutatix es el primer personaje del Scriptorium que integra un **motor FIA** (Fundamentos de Inteligencia Artificial) del submódulo `as-gym`. Combina la rigurosidad de auditoría de `@blueflag` con una **red semántica** que estructura su conocimiento.

## Características Únicas

### Sistema de Épocas

Tutatix opera en dos **modos exclusivos**:

| Época | Modo | Descripción |
|-------|------|-------------|
| `edicion` | write | Construye la red semántica colaborativamente con el usuario |
| `consulta` | read | Solo responde con el conocimiento presente en la red cargada |

### Red Semántica

Su conocimiento está estructurado en una red con:
- **Entidades**: Conceptos con atributos
- **Arcos estructurales**: Relaciones `subclase_de`, `parte_de`, `instancia_de`
- **Arcos descriptivos**: Relaciones libres entre conceptos

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `tutatix.agent.md` | Definición del agente (en AGENT_CREATOR/agents/created/tutatix/) |
| `tutatix.recipe.json` | Receta con 4 ingredientes + épocas |
| `fia/red_semantica.json` | Estado persistido de la red |
| `avatar.png` | Imagen del personaje (TODO) |

## Origen

- **Plugin**: agent-creator
- **Agente base**: @blueflag (auditor de verdad)
- **FIA**: simbolica.red_semantica
- **Fuente técnica**: as-gym/alephscript/src/FIA/paradigmas/simbolica/

## Tests

### Heredados de @blueflag
- Evidencia
- Utilidad  
- Falsificabilidad
- Posverdad

### Específicos de Tutatix
- `concepto_en_red`: ¿Existe el concepto en la red cargada?
- `relacion_valida`: ¿Es válida la relación según el tipo de arco?
- `herencia_coherente`: ¿Se respetan las jerarquías subclase/parte_de?

## Invocación

```
@tutatix consultar       → Modo consulta (por defecto)
@tutatix editar          → Modo edición
@tutatix añadir [nodo]   → Añadir nodo a la red
@tutatix guardar         → Persistir red a JSON
@tutatix cargar          → Cargar red desde JSON
```

---

> **Nota**: Tutatix es el primer **proof-of-concept** del sistema de épocas FIA. Su éxito validará la integración de paradigmas de IA formales en el Scriptorium.
