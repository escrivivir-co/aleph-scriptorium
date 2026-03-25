# 🚀 QUICKSTART HACKATHON — Para Product Owner

**Aleph Scriptorium**  
Hackathon Ready — 30 de diciembre de 2025

---

## ⚡ En 30 segundos

**Estado actual**: ✅ **TODO OPERATIVO**

```bash
# Verificar que todo corre
./DEMO-VERIFICACION-VIVA.sh

# O ver estado en vivo
curl http://localhost:3003/health  # DevOps
curl http://localhost:4001/status   # Presets
open http://localhost:3012          # Zeus UI Dashboard
```

---

## 📋 Qué mostrar al público (5 min demo)

### Demo 1: Agentes en Acción (2 min)
```
Mostrar árbol de agentes:
@aleph         [Productor principal]
  ├→ @revisor  [Auditor doctrinal]
  └→ @periodico [Publica noticia]
       └→ 5 Banderas de auditoría
           • @blueflag   (Verdad)
           • @blackflag  (Sombras)
           • @redflag    (Estructura)
           • @yellowflag (Límites)
           • @orangeflag (Registro)
```

**Archivos a mostrar**:
- `.github/agents/AGENTS.md` (Índice de agentes)
- docs/agentes.md

### Demo 2: DevOps en Tiempo Real (2 min)
```
Ejecutar:
  curl http://localhost:3003/health | jq .
  
Mostrar respuesta:
  {
    "status": "healthy",
    "server": "DevOps MCP Server",
    "version": "1.0.0",
    "timestamp": "2025-12-30T13:45:20.515Z"
  }
```

**Explicar**:
- Protocolo Agile/Scrum con sprints mensuales
- 12 épicas = 1 libro (Fundación 2026)
- Commits traceables con refs #TASK-ID
- Backlog DRY (Índice Maestro)

### Demo 3: Dashboard Zeus (1 min)
```
Abrir navegador:
  http://localhost:3012
  
Ver:
  • Catálogo dinámico de servidores MCP
  • Presets de contexto disponibles
  • Estado de orquestación
```

---

## 📚 Documentación para Distribuir

Compartir estos archivos al público:

1. **[HACKATHON-RESUMEN-EJECUTIVO.md](HACKATHON-RESUMEN-EJECUTIVO.md)**
   - Arquitectura entregada
   - Capas de agentes
   - Métricas de éxito
   - Roadmap 2026

2. **[.github/DEVOPS.md](.github/DEVOPS.md)**
   - Metodología Agile/Scrum
   - Convención de commits
   - Definition of Done
   - 12 sprints para Fundación

3. **[.github/agents/AGENTS.md](.github/agents/AGENTS.md)**
   - Índice completo de agentes
   - Handoffs disponibles
   - Cuándo usar cada agente

4. **[MCPGallery/README-SCRIPTORIUM.md](MCPGallery/README-SCRIPTORIUM.md)**
   - Arquitectura MCP mesh
   - Servidores disponibles
   - Integración con VS Code

---

## 🎯 Puntos Clave a Enfatizar

### Para el Público General
> "Aleph Scriptorium demuestra que **los agentes IA, cuando se organizan como equipos sistémicos**, pueden producir contenido de calidad verificable mediante auditoría doctrinal."

### Para Desarrolladores
> "La malla MCP aporta **orquestación, composabilidad y agnósticismo de modelo** — funciona igual con Claude, GPT, Gemini."

### Para Gestores de Proyecto
> "Protocolo Agile comprobado: 24+ épicas completadas en Sprint 0, ~150 story points, 16 submódulos integrados."

---

## 🔧 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| **DevOps Server no responde** | `cd MCPGallery/mcp-mesh-sdk && npm start` |
| **Zeus UI no abre** | `cd MCPGallery/zeus && npm start` |
| **Agentes no aparecen** | Verificar `.github/agents/*.agent.md` |
| **Plugins no se cargan** | Ejecutar `@pluginmanager status` |

---

## 📞 En Caso de Emergencia

**Contacto técnico**: Invocar `@ox` en Copilot Chat

```
@ox: Diagnóstica los siguientes problemas [describe el issue]
```

---

## ✅ Checklist Pre-Demo

- [ ] MCPGallery arrancado (`npm start`)
- [ ] DevOps Server respondiendo (`:3003`)
- [ ] Zeus UI accesible (`:3012`)
- [ ] Documentos descargados/compartidos
- [ ] Demos practicadas (5 min timing)
- [ ] Slides o presentación visual lista

---

## 🎪 Cierre Sugerido

> **"La obra está creada. Los agentes están vivos. El código está limpio."**
>
> *Aleph Scriptorium 2025 → 2026*
>
> *Opus: 12 capítulos de Fundación, auditoría sistémica, ingeniería humanista.*

---

**¡Buena suerte en el hackathon!** 🚀

---

*Última actualización: 2025-12-30*  
*Generado para: Product Owner + Hackathon Public*
