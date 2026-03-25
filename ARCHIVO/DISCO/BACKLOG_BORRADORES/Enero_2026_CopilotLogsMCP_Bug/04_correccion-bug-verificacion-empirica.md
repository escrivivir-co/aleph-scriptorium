# Corrección: Verificación Empírica del Bug

> **Fecha**: 2026-01-01  
> **Referencia**: [02_informe-ox-indice-scrum.md](02_informe-ox-indice-scrum.md), [03_conversacion-po-sm-justificacion.md](03_conversacion-po-sm-justificacion.md)  
> **Estado**: 🔴 Bug más grave de lo documentado

---

## ❌ Afirmación incorrecta en documentos previos

**Documentos 02 y 03 afirmaban**:
> `get_copilot_request(id)` funciona si el ID está en caché o en la sesión actual

**Realidad verificada empíricamente**:

| Tool | Input | Resultado |
|------|-------|-----------|
| `list_copilot_requests` | — | ✅ Lista 50 IDs correctamente |
| `get_copilot_request("104256da")` | ID de hace 2 min (sesión actual) | ❌ **Vacío** |
| `get_latest_request()` | — | ✅ **Funciona** (contenido completo) |

---

## 🔍 Evidencia diagnóstica

```json
{
  "cache": {
    "size": 5,
    "maxSize": 5,
    "cachedIds": []  // ← Caché NO se está poblando
  }
}
```

---

## 📋 Corrección al diagnóstico

| Afirmación previa | Corrección |
|-------------------|------------|
| "Funciona para sesión actual" | ❌ NO funciona ni para sesión actual |
| "Solo IDs históricos fallan" | ❌ TODOS los IDs fallan excepto `latest` |
| "Caché retiene 5 requests" | ❌ Caché está vacío (`cachedIds: []`) |

---

## 🎯 Único caso funcional

**Solo `get_latest_request()` funciona** — usa internamente `ccreq:latest.copilotmd`

---

## 🔧 Siguiente paso

Investigar en código fuente:
1. Por qué `ccreq:{id}` no resuelve
2. Por qué el caché no se está poblando
3. Diferencia de implementación entre `latest` y `{id}`

→ Ver archivo `05_*.md` para hallazgos de investigación.

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2026-01-01 | 🔴 Corrección empírica: bug más grave |
