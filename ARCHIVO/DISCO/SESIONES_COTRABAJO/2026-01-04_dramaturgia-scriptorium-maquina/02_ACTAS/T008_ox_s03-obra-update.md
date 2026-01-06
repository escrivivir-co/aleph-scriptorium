# Acta T008: Implementar S03 — Actualizar itaca-digital.yaml

> **Agente**: @ox  
> **Fecha**: 2026-01-04  
> **Estado**: ✅ DONE  
> **Tipo**: IMPLEMENTACIÓN  
> **Story**: S03 (2 pts)

---

## Objetivo

Actualizar la obra `itaca-digital.yaml` con mcpPacks v3.0.0 y configuración sensorBridge.

---

## Tasks Completadas

| Task | Descripción | Estado |
|------|-------------|--------|
| T03.1 | Upgrade mcpPacks v1.0.0 → v3.0.0 | ✅ |
| T03.2 | Añadir sensorBridge config con eventos dinámicos | ✅ |

---

## Implementación

### Archivo Modificado

`ARCHIVO/PLUGINS/TEATRO/obras/itaca-digital.yaml`

### Cambios Aplicados

#### 1. Upgrade de Versión

```yaml
# Antes
version: "1.0.0"

# Después
version: "3.0.0"
```

#### 2. Nueva Configuración sensorBridge

```yaml
sensorBridge:
  enabled: true
  sensors:
    - source: "@ox"
      target: "lucas"
      predicate: "recibir_senal/2"
  actuators:
    - source: "lucas"
      targets:
        - "penelope"
        - "orfeo"
        - "viajero"
      predicate: "notificar/2"
  events:
    - trigger: "estado_parado"
      action: "anunciar_a_elenco"
    - trigger: "estado_operativo"
      action: "confirmar_reanudacion"
    - trigger: "coherencia_rota"
      action: "alerta_dry"
```

#### 3. Descripción Actualizada

```yaml
description: |
  Habilita razonamiento Prolog para personajes de la obra.
  Lucas opera como ACTUADOR del modelo Scriptorium-como-Máquina:
  - Recibe señales de sensores (@ox, otros agentes)
  - Procesa cambios con verificación DRY
  - Notifica a personajes suscritos (eferencia)
```

---

## Criterio de Aceptación

| Criterio | Estado |
|----------|--------|
| Schema Teatro valida OK | ✅ YAML válido |
| Eventos dinámicos (no hardcoded) | ✅ Lista extensible |
| Compatible con brain.pl S02 | ✅ Predicados alineados |

---

## Validación Lucas

| Propuesta @ox (T004b) | Implementado |
|----------------------|--------------|
| sensorBridge config | ✅ |
| Eventos en obra, no hardcoded | ✅ |
| Upgrade v3.0.0 | ✅ |

---

*Acta completada — @ox — T008*
