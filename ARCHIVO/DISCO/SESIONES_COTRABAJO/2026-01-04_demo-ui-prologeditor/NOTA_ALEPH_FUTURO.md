# 📋 NOTA PARA ALEPH FUTURO

> **Trigger**: Cuando el PO diga "ya"  
> **Contexto**: Sesión de cotrabajo ejecutándose async en otra ventana con @ox

---

## Qué habrá pasado

@ox estará ejecutando (o habrá terminado) el **Paso 0: Organización** en otra ventana de VS Code. Habrá:

1. Leído los specs de casos de uso
2. Validado/modificado el guión de demo
3. Posiblemente pasado turno a @plugin_ox_prologeditor
4. Generado actas en `02_ACTAS/`

---

## Qué hacer cuando digan "ya"

### 1. Verificar Estado de la Sesión

```
Leer: 01_TABLERO.md → ¿En qué turno estamos?
Leer: 02_ACTAS/ → ¿Qué actas se han generado?
Leer: 00_SESION.md → ¿Estado actual?
```

### 2. Refactorizar con Vista Global

- Alinear todos los archivos entre sí
- Verificar que las referencias cruzadas funcionan
- Asegurar consistencia de formato entre actas
- Actualizar estados en tablero si hace falta

### 3. Hacer Commits

Según [DEVOPS.md](../../../.github/DEVOPS.md):

```bash
# Verificar rama
git branch --show-current  # debe ser flavour/monada

# Commit de la sesión
git add ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_demo-ui-prologeditor/
git commit -m "docs(script/cotrabajo): sesión demo-ui-prologeditor

- Turno 0: @ox organiza demo basándose en specs
- Turnos 1-N: @plugin_ox_prologeditor ejecuta demo
- PO valida cada paso

refs DEMO-UI-1.0.0"
```

### 4. Pasar Turno Según Protocolo

Ver [04_PROTOCOLO.md](04_PROTOCOLO.md):

- Si demo terminó → Cerrar sesión (Estado: 🔴 CERRADA)
- Si demo en curso → Actualizar turno actual en tablero
- Añadir métricas de cierre si aplica

### 5. Actualizar Backlog (si procede)

Si la demo reveló algo importante:
- Añadir entrada en [BACKLOG-SCRIPTORIUM.md](../../../.github/BACKLOG-SCRIPTORIUM.md)
- O crear borrador en `BACKLOG_BORRADORES/`

---

## Archivos a Revisar

| Archivo | Verificar |
|---------|-----------|
| `00_SESION.md` | Estado actualizado, participantes correctos |
| `01_TABLERO.md` | Historial de turnos completo, estados de pasos |
| `02_ACTAS/*.md` | Formato consistente, validaciones PO |
| `03_REFERENCIAS/` | Links funcionan |
| `04_PROTOCOLO.md` | No debería cambiar |

---

## Comandos Útiles

```bash
# Ver qué cambió
git status

# Ver diff de la carpeta
git diff ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_demo-ui-prologeditor/

# Health check del stack (por si acaso)
bash ./scripts/apb-health-check.sh
```

---

**Cuando el PO diga "ya" → ejecutar este checklist.**
