# Carta para el Día de la Demo — DEMO-1.0.0

> **Fecha**: 30 de diciembre de 2025  
> **Épica**: DEMO-1.0.0 Demo Screens Hackathon  
> **Duración estimada**: 20-25 minutos

---

## Preparación Previa (Ox)

### 1. Levantar todos los servidores

En VS Code, ejecutar:
```
Cmd+Shift+P → "AlephScript Demo: ▶️ Run All Demo Servers"
```

Esto abre 5 terminales:
| Terminal | Puerto | Verificar |
|----------|--------|-----------|
| 🌐 Jekyll Site | :4000 | http://localhost:4000 |
| 🚀 MCP Launcher | :3050 | Terminal sin errores |
| 🤖 MCP Model | :3001 | Terminal sin errores |
| ⚡ Zeus | :4001 | http://localhost:4001 |
| 📝 Novelist | :3000 | http://localhost:3000 |

### 2. Verificar MCP Playwright disponible

Antes de abrir navegadores, verificar que las tools MCP están activas:
```
@ox ¿están disponibles las tools mcp_playwright_*?
```

### 3. Abrir navegadores via MCP Playwright (NO Simple Browser)

> **IMPORTANTE**: Cada agente abre su navegador via MCP Playwright desde conversaciones Chat separadas.

| Agente | URL | Comando MCP |
|--------|-----|-------------|
| @indice/PO | Blueprint | `mcp_playwright_navigate({ url: "http://127.0.0.1:4000/aleph-scriptorium/blueprint-po/" })` |
| @aleph | Galería | `mcp_playwright_navigate({ url: "http://127.0.0.1:4000/aleph-scriptorium/demo/" })` |
| @ox | Zeus | `mcp_playwright_navigate({ url: "http://localhost:4001" })` |

### 4. Configurar conversaciones Chat paralelas

Para control independiente:
1. **Ventana 1**: `@ox` (servidores, técnico)
2. **Ventana 2**: `@aleph` (galería, producto)
3. **Ventana 3**: `@indice` (blueprint PO, navegación)

Cada conversación puede usar MCP Playwright para interactuar con su navegador.

### 5. Tener VS Code visible

Para mostrar:
- Copilot Chat con @ox
- Terminal con servidores
- Código de agentes (.agent.md)

---

## Flujo de la Demo

### Navegación del Blueprint

- **← →**: Avanzar/retroceder entre pasos del PO
- **↑**: Subir a slide de Ox (técnico)
- **↓**: Bajar a slides de Aleph o SM

Cada paso tiene esta estructura:
```
         Ox (arriba)
            ↑
    ← PO (centro) →
       ↙         ↘
   Aleph        SM
```

---

## 🎤 Product Owner — Guión

### Tu rol
Eres el hilo conductor. Presentas cada paso y das paso a los especialistas.

### Materiales
- **Pantalla principal**: http://127.0.0.1:4000/aleph-scriptorium/blueprint-po/
- **Slides**: paso1-po, paso2-po, ... paso10-po

### Frases de transición

| Después de | Decir |
|------------|-------|
| Paso 1 | "Ox, cuéntanos el stack técnico" → ↑ |
| Volver de Ox | "Aleph, la propuesta de valor" → ↓ |
| Volver de Aleph | "SM, ¿cómo vamos en el sprint?" → → (a SM) |
| Volver de SM | "Pasemos al siguiente punto" → → |

### Pasos clave

| Paso | Tu mensaje principal |
|------|---------------------|
| 1. Bienvenida | "El taller donde la IA trabaja para ti" |
| 2. Problema | "Copilot pierde contexto, sin metodología" |
| 3. Solución | "Ox + Aleph + Plugins" |
| 4. Demo agentes | "@ox ¿qué agente uso para X?" |
| 5. Demo plugins | "X plugins, extensible" |
| 6. Blueprints | "Presentaciones 3D interactivas" |
| 7. Ecosistema | "16 submódulos, todo integrado" |
| 8. Extensibilidad | "Crea tus propios agentes y plugins" |
| 9. Comunidad | "Open source, AIPL license" |
| 10. Cierre | "⭐ Star en GitHub, empezar hoy" |

---

## 🐂 Ox — Guión

### Tu rol
El técnico. Explicas arquitectura, código, servidores.

### Materiales
- **Slides**: paso1-ox, paso2-ox, ... paso10-ox (navegas con ↑ desde PO)
- **Demo live**: http://localhost:4001 (Zeus)
- **VS Code**: Mostrar terminales, código

### Momentos clave

| Paso | Qué mostrar | Acción |
|------|-------------|--------|
| 1 | Stack técnico | Slide con capas |
| 2 | Diagnóstico | Problema de context window |
| 3 | MCP Servers | **Demo**: Tab Zeus, mostrar UI |
| 4 | Comandos CLI | **Demo**: Copilot Chat, @ox diagnosticar |
| 5 | Plugin Registry | Mostrar .github/plugins/ en VS Code |
| 6 | impress.js | Mencionar 3000+ líneas CSS |
| 7 | Submódulos | Listar los 5 principales |
| 8 | SDKs | mcp-core-sdk, mesh, model |
| 9 | Contribuir | Fork → DEVOPS.md → PR |
| 10 | Repos | URLs de GitHub |

### Demo live sugerida (Paso 4)

En Copilot Chat:
```
@ox ¿Qué agente uso para publicar en GitHub Pages?
```

Respuesta esperada: "@plugin_ox_ghpages que delega a GHPages"

---

## ℵ Aleph — Guión

### Tu rol
El producto. Explicas valor para el usuario, casos de uso, experiencia.

### Materiales
- **Slides**: paso1-aleph, paso2-aleph, ... (navegas con ↓ desde PO, luego ←)
- **Demo live**: http://localhost:3000 (Novelist)
- **Galería**: http://127.0.0.1:4000/aleph-scriptorium/demo/

### Momentos clave

| Paso | Qué mostrar | Acción |
|------|-------------|--------|
| 1 | Propuesta valor | 3 beneficios clave |
| 2 | Pain points | "Tengo que repetir contexto cada vez" |
| 3 | Agentes UI | @aleph, @revisor, @periodico |
| 4 | Flujo usuario | Diagrama pregunta → Ox → agente → respuesta |
| 5 | Casos de uso | Teatro, noticias, blueprints, agentes |
| 6 | Galería | **Demo**: Mostrar /demo/ con iframes |
| 7 | Integraciones | Copilot, MCP, Jekyll, Socket.io |
| 8 | Templates | .agent.md, manifest.md, blueprint |
| 9 | Documentación | Léeme, Ecosistema, Teatro |
| 10 | Contacto | Issues, Discussions |

### Demo live sugerida (Paso 6)

Abrir http://127.0.0.1:4000/aleph-scriptorium/demo/ y mostrar:
1. Los 7 iframes cargando
2. Hacer clic en "↗ Abrir" de un blueprint
3. Navegar con flechas

---

## 📋 Scrum Master — Guión

### Tu rol
El proceso. Explicas metodología, métricas, roadmap, estado del proyecto.

### Materiales
- **Slides**: paso1-sm, paso2-sm, ... (navegas con ↓ desde PO, luego →)
- **VS Code**: .github/BACKLOG-SCRIPTORIUM.md

### Momentos clave

| Paso | Qué mostrar | Acción |
|------|-------------|--------|
| 1 | Sprint actual | PRE, v1.0.0-beta objetivo |
| 2 | Backlog | Épicas principales |
| 3 | Épicas solución | Context Bloat ✅, CopilotEngine ✅, DEMO ✅ |
| 4 | Métricas | 31 agentes, 50+ handoffs, 5 capas |
| 5 | Burndown | Plugins por sprint |
| 6 | Impedimentos | Todos resueltos ✅ |
| 7 | Roadmap | 4 quarters 2026 |
| 8 | Releases | Ciclo trimestral FC1-FC4 |
| 9 | Retro | 24+ épicas, 36% reducción context |
| 10 | Next steps | Unirse al backlog, crear plugin, definir agente |

### Demo live sugerida (Paso 3)

Abrir en VS Code:
```
.github/BACKLOG-SCRIPTORIUM.md
```

Mostrar tabla de Sprint Activo con los ✅.

---

## Timing Sugerido

| Bloque | Duración | Contenido |
|--------|----------|-----------|
| Intro | 2 min | Pasos 1-2 (todos) |
| Core | 10 min | Pasos 3-6 (demos live) |
| Ecosistema | 5 min | Pasos 7-8 |
| Cierre | 3 min | Pasos 9-10 + Q&A |

**Total**: ~20 minutos + preguntas

---

## Checklist Pre-Demo

- [ ] Servidores levantados (5 terminales verdes)
- [ ] Jekyll respondiendo en :4000
- [ ] Zeus respondiendo en :4001
- [ ] Novelist respondiendo en :3000
- [ ] Blueprint PO carga correctamente
- [ ] Galería /demo/ muestra iframes
- [ ] Copilot Chat funciona con @ox
- [ ] Pantalla compartida configurada

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Jekyll no arranca | `cd scripts && ./serve-site.sh` manual |
| Puerto ocupado | `lsof -i :PUERTO` → `kill -9 PID` |
| Blueprint no carga | Verificar Jekyll, refrescar |
| Copilot no responde | Reiniciar VS Code |
| Iframe en blanco | El servidor local no está corriendo |

---

## Palabras Clave para Recordar

- **PO**: "Coherencia", "Valor", "Experiencia"
- **Ox**: "Arquitectura", "MCP", "Submódulos"  
- **Aleph**: "Usuario", "Flujo", "Galería"
- **SM**: "Sprint", "Épicas", "Roadmap"

---

> **¡Éxito en la demo!** 🎬
>
> Recuerda: El blueprint es navegable con teclado.  
> Si algo falla, la galería /demo/ tiene todo en iframes como backup.
