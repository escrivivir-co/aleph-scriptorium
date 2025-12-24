# Prompt: Listar Templates Prolog

> **Plugin**: prolog-editor  
> **Agente**: PrologEditor

---

## Entrada

Ninguna (lista todos los templates disponibles).

## Proceso

1. Escanear `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/`
2. Leer archivos `.template`
3. Parsear JSON de cada template
4. Mostrar tabla con información

## Salida

```markdown
## Templates Prolog Disponibles

| Template | Descripción | Exports |
|----------|-------------|---------|
| state-machine | Control de máquina de estados | do_init/2, do_start/2, do_pause/2... |
| agent-behavior | Reglas de comportamiento para agentes | decidir/2, puede_actuar/1... |
| obra-conditions | Condiciones para estadios de obras | puede_avanzar/2, evaluar_estado/1... |

### Detalle de Templates

#### state-machine
- **Archivo**: `templates/state-machine/app.pl`
- **Predicados**: 8 exportados
- **Uso**: Control de flujo en agentes y obras

#### agent-behavior
...
```

## Ubicaciones Escaneadas

1. `ARCHIVO/PLUGINS/PROLOG_EDITOR/templates/` — Templates de usuario
2. `iot-sbr-logica-para-bots/backend/src/services/codigo/web/plugins/` — Templates del submódulo

