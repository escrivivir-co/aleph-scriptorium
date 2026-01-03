# Acta T008: Hallazgos de Arranque del Stack

## Metadatos

| Campo | Valor |
|-------|-------|
| **Turno** | 008 |
| **Agente** | @prologeditor |
| **Inicio** | 2026-01-03 |
| **Fin** | 2026-01-03 |
| **Estado final** | ✅ RESUELTO (fixes aplicados por @scrum) |

---

## ⚠️ Auditoría de @scrum

> **Fecha**: 2026-01-03  
> **Hallazgo**: El reporte original contenía errores factuales. Se corrige a continuación.

### Error 1: "Backend sin endpoint /api/health"

**Afirmación original**: "El endpoint `/api/health` no está implementado"

**Realidad**: El endpoint **SÍ existe**, pero es `/health` (sin prefijo `/api`).  
Ver [app.ts#L67-L74](../../../../../PrologEditor/backend/src/app.ts):
```typescript
app.get('/health', (req, res) => { res.json({ status: 'healthy', ... }); });
```

**Causa raíz real**: La task `APB: Health Check` usaba el path incorrecto `/api/health`.

**Fix aplicado**: Corregido `.vscode/tasks.json` → `/health`

### Error 2: "ng no está en PATH" — Parcialmente correcto

**Afirmación original**: Correcta en diagnóstico, pero la solución óptima es delegar al script del frontend.

**Fix aplicado**: `PrologEditor/package.json` → `"start:frontend": "cd frontend && npm start"`

---

## Contexto

Ejecuté `APB: Start Full Stack` para arrancar los 4 servicios del stack.

---

## Estado de Servicios

| Servicio | Puerto | Estado | Evidencia |
|----------|--------|--------|-----------|
| MCP Launcher | 3050 | ✅ OK | `{"status":"healthy","server":"MCP Service Launcher"}` |
| MCP Prolog | 3006 | ✅ OK | `{"status":"healthy","server":"Prolog MCP Server"}` |
| Backend REST | 8000 | ⚠️ PARCIAL | Responde pero `/api/health` retorna 404 |
| Frontend Angular | 5001 | ❌ FALLA | Task termina con exit code 1 |

---

## Hallazgo 1: Task Frontend Falla

### Síntoma

```
Task: APB: Start [Frontend]
Exit code: 1
Error: "no es un comando interno o externo, programa o archivo por lotes ejecutable"
```

### Causa Raíz

La task en `.vscode/tasks.json` ejecuta:
```json
{
  "command": "npm",
  "args": ["run", "start:frontend"],
  "options": { "cwd": "${workspaceFolder}/PrologEditor" }
}
```

El script `start:frontend` en `PrologEditor/package.json` es:
```json
"start:frontend": "cd frontend && ng serve --port 5001 --host 0.0.0.0"
```

**Problema**: El comando `ng` no está en el PATH global. Solo está disponible dentro de `node_modules/.bin/` del proyecto frontend.

### Solución Propuesta

**Opción A**: Cambiar el script para usar `npx`:
```json
"start:frontend": "cd frontend && npx ng serve --port 5001 --host 0.0.0.0"
```

**Opción B**: Usar el script de npm del frontend directamente:
```json
"start:frontend": "cd frontend && npm start"
```

**Opción C**: Cambiar la task para ejecutar desde frontend/:
```json
{
  "options": { "cwd": "${workspaceFolder}/PrologEditor/frontend" },
  "command": "npm",
  "args": ["start"]
}
```

### Recomendación

**Opción B** es la más limpia: delegar al `package.json` del frontend que ya tiene el script configurado correctamente.

---

## Hallazgo 2: Backend sin endpoint /api/health

### Síntoma

```bash
curl http://localhost:8000/api/health
# Retorna: Cannot GET /api/health
```

### Causa Raíz

El endpoint `/api/health` no está implementado en el backend.

### Solución Propuesta

Añadir endpoint en `PrologEditor/backend/src/routes/`:

```typescript
// health.routes.ts
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'PrologEditor Backend',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});
```

---

## Archivos Afectados

| Archivo | Cambio Requerido |
|---------|------------------|
| `PrologEditor/package.json` | Corregir script `start:frontend` |
| `PrologEditor/backend/src/routes/` | Añadir endpoint `/api/health` |
| `.vscode/tasks.json` | (opcional) Ajustar cwd de task |

---

## Preguntas para @aleph

- [ ] ¿Cuál opción prefieres para el fix del frontend (A, B o C)?
- [ ] ¿Debo implementar el endpoint `/api/health` ahora?
- [ ] ¿Continuamos las pruebas E2E sin el frontend, o bloqueamos hasta fix?

---

## Siguiente Turno Sugerido

**@aleph** para decidir cómo proceder con los fixes antes de continuar pruebas E2E.
