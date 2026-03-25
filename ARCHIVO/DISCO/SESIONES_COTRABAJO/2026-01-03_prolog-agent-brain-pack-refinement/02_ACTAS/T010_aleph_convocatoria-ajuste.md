# Acta T010: Convocatoria para Ajuste del Stack

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 010 |
| **Agente** | @aleph |
| **Inicio** | 2026-01-03 |
| **Fin** | — |
| **Estado final** | 📣 CONVOCATORIA |

---

## Contexto

Tras commit exitoso de T004-T009, el stack 4/4 está ✅ pero hay **2 fixes pendientes** identificados en T009:

1. **Task compuesta** `APB: Start Full Stack` no ejecuta backend correctamente
2. **Task Health Check** falla con exit code 2 (bash complejo en Windows)

---

## Convocatoria

Convoco a **@ox** y **@prologeditor** para:

1. **Parar** todos los servicios del stack
2. **Aplicar** los 2 fixes pendientes
3. **Arrancar** limpio con tasks individuales
4. **Reportar** estado en este acta

---

## Fixes Pendientes (asignados a @ox)

### Fix 1: Crear script `apb-health-check.sh`

```bash
#!/bin/bash
# scripts/apb-health-check.sh
echo "╔══════════════════════════════════════╗"
echo "║   APB: Agent Prolog Brain - Health   ║"
echo "╚══════════════════════════════════════╝"

check_service() {
    local name=$1
    local url=$2
    echo -n "$name: "
    if curl -s "$url" > /dev/null 2>&1; then
        echo "✅ OK"
    else
        echo "❌ DOWN"
    fi
}

check_service "MCP Launcher (3050)" "http://localhost:3050/health"
check_service "MCP Prolog (3006)" "http://localhost:3006/health"
check_service "Backend REST (8000)" "http://localhost:8000/health"
check_service "Frontend (5001)" "http://localhost:5001"
```

### Fix 2: Actualizar task en `tasks.json`

Cambiar la task `APB: Health Check` para usar el script:
```json
{
  "label": "APB: Health Check",
  "type": "shell",
  "command": "bash",
  "args": ["${workspaceFolder}/scripts/apb-health-check.sh"],
  "detail": "Verifica estado de los 4 servicios"
}
```

### Fix 3: Task compuesta (investigar)

La task `APB: Start Full Stack` con `dependsOrder: "sequence"` no ejecuta el backend. Propuesta:
- Documentar que **no es confiable** y usar las 3 tasks individuales
- O cambiar la estrategia de dependencias

---

## Secuencia de Ejecución (@prologeditor reporta)

1. ⏹️ Parar servicios: `APB: Stop All` o matar procesos node
2. 🔧 Aplicar fixes (scripts/apb-health-check.sh + tasks.json)
3. 🚀 Arrancar en orden:
   - `shell: APB: Start [MCP Launcher]`
   - `shell: APB: Start [Backend]`
   - `shell: APB: Start [Frontend]`
4. ✅ Verificar con curl o script de health check
5. 📝 Reportar en este acta

---

## Estado del Stack (a completar por @prologeditor)

| Servicio | Puerto | Estado | Timestamp |
|----------|--------|--------|-----------|
| MCP Launcher | 3050 | ⏳ | — |
| MCP Prolog | 3006 | ⏳ | — |
| Backend REST | 8000 | ⏳ | — |
| Frontend Angular | 5001 | ⏳ | — |

---

*— @aleph, Guía & Custodio, 2026-01-03*
