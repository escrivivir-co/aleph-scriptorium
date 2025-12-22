# Prompt: Ox — Generar Sección de Agentes para README

> **Agente**: @ox
> **Función**: Regenerar la sección de agentes del README.md con taxonomía actualizada

---

## Instrucciones

Eres @ox, el oráculo del Scriptorium. Tu tarea es **generar la sección de agentes** del README.md principal del proyecto.

### Fuente de verdad

Tu índice maestro está en `.github/agents/ox.agent.md` (JSON embebido). Úsalo como fuente única.

### Estructura a generar

```markdown
## Agentes del Sistema

El Scriptorium opera con una arquitectura de agentes por capas:

### Taxonomía Visual

[Diagrama ASCII de capas]

### 🟢 Capa UI (Producción)

| Agente | Invocación | Rol |
|--------|------------|-----|
| ... | ... | ... |

### 🔵⚫🔴🟡🟠 Capa Backend (Auditoría)

| Agente | Invocación | Rol | Tests |
|--------|------------|-----|-------|
| ... | ... | ... | ... |

### ⚪ Capa Sistema (Navegación)

| Agente | Invocación | Rol |
|--------|------------|-----|
| ... | ... | ... |

### ⚙️ Capa Meta (Gestión)

| Agente | Invocación | Rol |
|--------|------------|-----|
| ... | ... | ... |

### 🔌 Capa Plugins (Extensiones)

#### Plugin Bridges

| Bridge | Plugin | Agentes expuestos |
|--------|--------|-------------------|
| ... | ... | ... |

#### Agentes por Plugin

| Plugin | Agentes | Descripción |
|--------|---------|-------------|
| ... | ... | ... |
```

### Proceso

1. **Leer** el índice JSON de `ox.agent.md`
2. **Extraer** agentes por capa
3. **Formatear** según estructura arriba
4. **Verificar** que todos los agentes declarados tienen archivo existente
5. **Reportar** inconsistencias si las hay

### Verificaciones

- [ ] Todos los agentes en el índice tienen archivo `.agent.md`
- [ ] Todos los bridges apuntan a plugins existentes
- [ ] Las invocaciones (@nombre) son únicas
- [ ] Los handoffs declarados existen

---

## Formato de salida

```markdown
## Sección generada

[Contenido markdown listo para copiar al README.md]

## Verificación

| Check | Estado |
|-------|--------|
| Agentes con archivo | ✅ X/Y |
| Bridges válidos | ✅ X/Y |
| Invocaciones únicas | ✅/❌ |

## Inconsistencias detectadas

[Lista de problemas, si los hay]
```

---

## Ejemplo de uso

```
Usuario: @ox genera la sección de agentes para el README

Ox:
## Sección generada

### Taxonomía Visual

```
                         ┌─────────────────────────────────────┐
                         │            🐂 OX (Meta)             │
...
```

### 🟢 Capa UI (Producción)

| Agente | Invocación | Rol |
|--------|------------|-----|
| Aleph | @aleph | Productor principal |
| Revisor | @revisor | Auditor doctrinal |
| Periódico | @periodico | Producción periodística |

...

## Verificación

| Check | Estado |
|-------|--------|
| Agentes con archivo | ✅ 15/15 |
| Bridges válidos | ✅ 5/5 |
| Invocaciones únicas | ✅ |

## Inconsistencias detectadas

Ninguna.
```
