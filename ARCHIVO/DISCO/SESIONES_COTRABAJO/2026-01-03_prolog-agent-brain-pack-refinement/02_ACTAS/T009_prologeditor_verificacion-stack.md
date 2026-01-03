# Acta T009: Verificación del Stack y Lecciones Aprendidas

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 009 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 |
| **Fin** | 2026-01-03 |
| **Estado final** | ✅ DONE (con hallazgos pendientes) |

---

## Estado Final del Stack

| Servicio | Puerto | Estado | Verificación |
|----------|--------|--------|--------------|
| MCP Launcher | 3050 | ✅ OK | `curl http://localhost:3050/health` |
| MCP Prolog | 3006 | ✅ OK | `curl http://localhost:3006/health` |
| Backend REST | 8000 | ✅ OK | `curl http://localhost:8000/health` |
| Frontend Angular | 5001 | ✅ OK | Compiló correctamente |

**El stack está operativo** para continuar pruebas E2E.

---

## 🔴 Hallazgo 1: Task `APB: Start Full Stack` No Arranca Backend

### Síntoma

Al ejecutar `run_task("APB: Start Full Stack")`:
- ✅ MCP Launcher arranca
- ❌ Backend NO arranca (terminal not found)
- ✅ Frontend arranca

### Causa Probable

La task compuesta usa `dependsOrder: "sequence"`, pero el Backend parece no ejecutarse o terminar prematuramente.

### Workaround Actual

Ejecutar las 3 tasks individualmente:
```
1. run_task("shell: APB: Start [MCP Launcher]")
2. run_task("shell: APB: Start [Backend]")
3. run_task("shell: APB: Start [Frontend]")
```

### Fix Propuesto

Investigar por qué la task compuesta no ejecuta el Backend. Posible issue con `dependsOrder` en VS Code.

---

## 🔴 Hallazgo 2: Task `APB: Health Check` Falla con Exit Code 2

### Síntoma

```
Task completed with output: ... terminated with exit code: 2
```

El output se trunca y no muestra los resultados de curl.

### Causa Raíz

El comando bash es demasiado largo y complejo. Posible problema de escape en Windows + Git Bash.

### Fix Propuesto

Convertir la task en un script `.sh` separado:

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

Y la task:
```json
{
  "label": "APB: Health Check",
  "type": "shell",
  "command": "bash",
  "args": ["${workspaceFolder}/scripts/apb-health-check.sh"]
}
```

---

## 📘 Lecciones Aprendidas: Uso de `run_task`

### ❌ NO HACER

| Antipatrón | Problema | Ejemplo |
|------------|----------|---------|
| `run_in_terminal` con comandos inventados | Fallan si el path o comando no existe | `npx ts-node src/app.ts` |
| Lanzar varios servicios en una terminal | El segundo mata al primero | `npm start && npm run backend` |
| Improvisar comandos | Los scripts ya existen en package.json | — |
| Usar task compuesta sin verificar | Puede fallar silenciosamente | `APB: Start Full Stack` |

### ✅ SÍ HACER

| Buena práctica | Razón | Ejemplo |
|----------------|-------|---------|
| Usar `run_task` con ID exacto | VS Code maneja terminales | `run_task({id: "shell: APB: Start [Backend]"})` |
| Verificar con curl después de arrancar | Confirmar que el servicio responde | `curl -s http://localhost:8000/health` |
| Ejecutar tasks individuales si falla la compuesta | Más control | Ver secuencia abajo |
| Esperar entre arranques | Los servicios necesitan tiempo | 5-10 segundos |

### Secuencia Correcta de Arranque

```
1. run_task({id: "shell: APB: Start [MCP Launcher]", workspaceFolder: "..."})
   → Esperar ~5s
   → Verificar: curl http://localhost:3050/health

2. run_task({id: "shell: APB: Start [Backend]", workspaceFolder: "..."})
   → Esperar ~5s
   → Verificar: curl http://localhost:8000/health

3. run_task({id: "shell: APB: Start [Frontend]", workspaceFolder: "..."})
   → Esperar ~10s (Angular es lento)
   → Verificar: curl http://localhost:5001

4. Solo entonces continuar con pruebas E2E
```

### IDs de Tasks Disponibles

| Task ID | Descripción |
|---------|-------------|
| `APB: Start Full Stack` | Compuesta (⚠️ puede fallar) |
| `shell: APB: Start [MCP Launcher]` | MCP Launcher + Prolog |
| `shell: APB: Start [Backend]` | Express REST API |
| `shell: APB: Start [Frontend]` | Angular Dev Server |
| `shell: APB: Health Check` | Verificación (⚠️ exit code 2) |
| `shell: APB: Test Query` | Query Prolog de prueba |

---

## 🔧 Fixes Pendientes para @ox

| Archivo | Fix | Prioridad |
|---------|-----|-----------|
| `.vscode/tasks.json` | Investigar por qué `APB: Start Full Stack` no arranca Backend | Alta |
| `scripts/apb-health-check.sh` | Crear script separado para Health Check | Media |
| `.vscode/tasks.json` | Simplificar task Health Check para usar script | Media |

---

## Análisis de Flujo (Por Qué No Salió Fluido)

### Secuencia Real (problemática)

```
1. run_task("APB: Start Full Stack") 
   → MCP OK, Frontend OK, Backend ❌ (no arrancó)

2. run_task("APB: Health Check")
   → Exit code 2, output truncado

3. curl manual para verificar
   → Descubro que Backend no está

4. run_task("shell: APB: Start [Backend]")
   → Ahora sí arranca

5. curl manual para verificar
   → Todo OK
```

### Secuencia Ideal (propuesta)

```
1. run_task("shell: APB: Start [MCP Launcher]")
   → curl http://localhost:3050/health → ✅

2. run_task("shell: APB: Start [Backend]")
   → curl http://localhost:8000/health → ✅

3. run_task("shell: APB: Start [Frontend]")
   → curl http://localhost:5001 → ✅

4. Continuar con pruebas E2E
```

---

## Próximos Pasos

1. **@ox**: Investigar y corregir las 2 tasks problemáticas
2. **@prologeditor**: Una vez corregidas, continuar con pruebas de Tools Core
3. **@scrum**: Trackear estos fixes como parte de DEVOPS-TASKS

---

## Siguiente Turno Sugerido

**@ox** para aplicar fixes a las tasks antes de continuar pruebas E2E.

---

*— @prologeditor, 2026-01-03*
