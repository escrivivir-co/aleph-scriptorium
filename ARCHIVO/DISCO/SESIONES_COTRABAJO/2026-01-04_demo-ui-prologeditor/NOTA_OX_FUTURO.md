# 📝 Nota para @ox del Futuro

> **Cuando el PO diga "ya"** — lee esto y actúa.

---

## Contexto

El PO lanzó la demo UI de PrologEditor en **otra ventana** con `@plugin_ox_prologeditor`.  
Tú (@ox) estás aquí para el **post-mortem**.

## Tu Misión

### 1. Recuperar Estado

```
Leer: ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_demo-ui-prologeditor/
├── 01_TABLERO.md   → Ver qué pasos se completaron (Estado de Pasos)
├── 02_ACTAS/       → Leer actas generadas (acta-01.md a acta-12.md)
└── 00_SESION.md    → Ver si está CERRADA o sigue ACTIVA
```

### 2. Evaluar Resultado

| Pregunta | Dónde buscar |
|----------|--------------|
| ¿Cuántos pasos OK vs Error? | 01_TABLERO.md § Estado de Pasos |
| ¿Qué falló? | Actas con ❌ o ⚠️ |
| ¿Hay bugs abiertos? | Notas del PO en actas |

### 3. Validar con @indice

Invocar:
```
@indice validar coherencia pre-commit
```

Verificar que:
- Los endpoints usados coinciden con openapi.yaml
- Los tools corresponden a mcpspec.yaml
- No hay discrepancias con la guía de arquitectura

### 4. Escribir Acta de Crítica

Crear: `02_ACTAS/acta-critica-ox.md`

```markdown
# Acta de Validación Técnica (@ox)

## Resumen de Demo
- Pasos completados: X/12
- Pasos OK: X
- Pasos con error: X

## Hallazgos Técnicos
{Lo que funcionó bien}
{Lo que falló y por qué}

## Validación @indice
- Coherencia con specs: ✅/❌
- DRY violations: {si hay}

## Recomendaciones
{Fixes o mejoras a trackear}

## Veredicto
✅ DEMO APROBADA / ⚠️ DEMO PARCIAL / ❌ REQUIERE FIXES
```

### 5. Decidir Siguiente Paso

| Resultado | Acción |
|-----------|--------|
| ✅ 12/12 OK | Felicitar, cerrar sesión, actualizar BACKLOG |
| ⚠️ Algunos errores | Documentar bugs, proponer fixes |
| ❌ Muchos errores | Abrir épica de debugging |

---

## Recordatorio

- **Los logs de Copilot son per-window** — no verás lo que hizo PrologEditor
- **Los snapshots SÍ son compartidos** — busca si capturó alguno
- **Las actas son tu fuente de verdad** — léelas todas antes de opinar

---

**Escrito por**: @ox  
**Fecha**: 2026-01-04  
**Trigger**: PO dice "ya"
