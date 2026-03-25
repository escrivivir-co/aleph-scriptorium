# Guía de Navegación para Demo UI

> **Sesión**: 2026-01-04_demo-ui-prologeditor  
> **Para**: @plugin_ox_prologeditor

---

## ⚠️ Herramientas de Navegación

### ❌ NO usar Simple Browser

`open_simple_browser` pide confirmación "Allow/Skip" para URLs localhost y **bloquea la demo**.

### ✅ USAR MCP Playwright

| Tool | Propósito |
|------|-----------|
| `mcp_playwright_browser_navigate` | Abrir URL |
| `mcp_playwright_browser_snapshot` | Ver estado de página (mostrar al PO) |
| `mcp_playwright_browser_click` | Click en elementos |
| `mcp_playwright_browser_type` | Escribir en inputs |

### Activación

Si las tools no están disponibles, llamar primero:
```
activate_browser_interaction_tools()
```

---

## Flujo de Navegación por Paso

```
1. mcp_playwright_browser_navigate({url: "http://localhost:5001"})
2. mcp_playwright_browser_snapshot()  → mostrar al PO
3. Identificar elemento del snapshot (ref)
4. mcp_playwright_browser_click({element: "Sessions tab", ref: "ref123"})
5. mcp_playwright_browser_snapshot()  → verificar resultado
```

---

## Ejemplo: Paso 1 (Crear Sesión)

```javascript
// 1. Navegar al frontend
mcp_playwright_browser_navigate({url: "http://localhost:5001"})

// 2. Ver estado inicial
mcp_playwright_browser_snapshot()
// → Mostrar al PO: "Estamos en el frontend Angular"

// 3. Click en tab Sessions (usar ref del snapshot)
mcp_playwright_browser_click({
  element: "Sessions tab",
  ref: "[ref del snapshot]"
})

// 4. Llenar formulario de nueva sesión
mcp_playwright_browser_type({
  element: "Session ID input",
  ref: "[ref]",
  text: "demo-2026-01-04"
})

// 5. Click en Create
mcp_playwright_browser_click({
  element: "Create Session button",
  ref: "[ref]"
})

// 6. Snapshot final para validar
mcp_playwright_browser_snapshot()
// → Mostrar al PO: "Sesión creada exitosamente"
```

---

## URLs de Referencia

| Servicio | URL |
|----------|-----|
| Frontend Angular | http://localhost:5001 |
| Backend REST | http://localhost:8000/api |
| MCP Prolog | http://localhost:3006 |
