# Protocolo de Demo Interactiva — PrologEditor UI

> **Sesión**: 2026-01-04_demo-ui-prologeditor  
> **Basado en**: .github/instructions/cotrabajo.instructions.md v1.0.0 (adaptado para demo)

---

## 1. Principio Fundamental

> **El PO valida cada paso — la navegación documenta.**

Esta sesión es **interactiva**: el agente PrologEditor navega por la UI y espera confirmación explícita del PO antes de avanzar.

---

## 2. Flujo de Cada Paso

```
┌─────────────────────────────────────────────────────────────┐
│                 CICLO DE PASO DE DEMO                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 📢 ANUNCIAR                                             │
│     └─► "Paso N: Vamos a demostrar {tool/feature}"         │
│                                                             │
│  2. 🌐 NAVEGAR                                              │
│     └─► Abrir http://localhost:5001 en Simple Browser      │
│         └─► Ir al tab correspondiente                       │
│                                                             │
│  3. 💬 EXPLICAR                                             │
│     └─► Breve descripción al PO:                           │
│         - ¿Qué componente es este?                         │
│         - ¿Qué tool MCP expone?                            │
│         - ¿Qué endpoint REST usa?                          │
│                                                             │
│  4. ▶️ EJECUTAR                                             │
│     └─► Realizar la acción en la UI                        │
│         └─► Mostrar resultado al PO                        │
│                                                             │
│  5. ✅ CONFIRMAR                                            │
│     └─► Esperar OK del PO                                  │
│         ├─► "OK" / "Continúa" → siguiente paso             │
│         ├─► "Repite" → repetir paso                        │
│         └─► "Pausa" → pausar demo                          │
│                                                             │
│  6. 📝 DOCUMENTAR                                           │
│     └─► Crear acta en ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_demo-ui-prologeditor/02_ACTAS/acta-{NN}.md │
│         - Qué se demostró                                   │
│         - Resultado obtenido                               │
│         - Validación del PO                                │
│                                                             │
│  7. ➡️ SIGUIENTE                                            │
│     └─► Actualizar ./01_TABLERO.md (en este directorio de sesión) │
│         └─► Avanzar al siguiente paso                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Estados del Paso

| Estado | Emoji | Significado |
|--------|-------|-------------|
| Pendiente | ⏳ | No iniciado |
| Anunciando | 📢 | Comunicando al PO |
| Navegando | 🌐 | Abriendo página |
| Explicando | 💬 | Descripción al PO |
| Ejecutando | ▶️ | Acción en curso |
| Esperando | ⏸️ | Aguardando confirmación PO |
| Documentando | 📝 | Escribiendo acta |
| Completado | ✅ | Paso validado por PO |
| Error | ❌ | Falló - requiere debug |

---

## 4. Herramientas de Navegación

| Herramienta | Uso |
|-------------|-----|
| `mcp_playwright_*` | Navegación e interacción con UI |
| Herramientas MCP | Ejecución de tools del stack |

→ Ver `03_REFERENCIAS/guia-navegacion-demo.md` para detalles técnicos.

---

## 5. Formato de Acta por Paso

```markdown
# Acta Paso {N}: {Nombre del paso}

## Metadatos

| Campo | Valor |
|-------|-------|
| **Paso** | {N} de 12 |
| **Tab** | {Sessions/Editor/Knowledge/Templates/Telemetry/Brain} |
| **Tool demostrada** | `{nombre_tool}` |
| **Endpoint** | `{METHOD /path}` |
| **Hora** | {HH:MM} |

## Acción Realizada

{Descripción de qué se hizo en la UI}

## Resultado

{Output/respuesta obtenida}

## Validación PO

- Estado: ✅ OK / ❌ FALLÓ / ⚠️ PARCIAL
- Comentarios: {si aplica}

## Captura

{Descripción de lo que se vio en pantalla, o referencia a screenshot si aplica}
```

---

## 6. Comando para Iniciar Demo

El PO inicia la demo invocando al bridge:

```
@plugin_ox_prologeditor demo iniciar
```

El agente:
1. Lee 00_SESION.md y 01_TABLERO.md
2. Verifica stack operativo (health check)
3. Abre Simple Browser en http://localhost:5001
4. Inicia con Paso 1

---

## 7. Respuestas del PO

| Respuesta | Efecto |
|-----------|--------|
| "OK" / "Continúa" / "Siguiente" | Avanza al siguiente paso |
| "Repite" / "Otra vez" | Repite el paso actual |
| "Explica más" | Amplía explicación |
| "Pausa" | Pausa la demo |
| "Termina" / "Cierra" | Cierra sesión |
| "Salta a N" | Salta al paso N |

---

## 8. Cierre de Sesión

Al completar los 12 pasos (o si el PO lo solicita):

1. Actualizar ARCHIVO/DISCO/SESIONES_COTRABAJO/2026-01-04_demo-ui-prologeditor/00_SESION.md → Estado: 🔴 CERRADA
2. Añadir resumen ejecutivo con métricas:
   - Pasos completados: N/12
   - Pasos OK: N
   - Pasos con error: N
3. Registrar en backlog si aplica

---

## 9. URLs de Referencia

| Servicio | URL | Puerto |
|----------|-----|--------|
| **Frontend Angular** | http://localhost:5001 | 5001 |
| Backend REST | http://localhost:8000 | 8000 |
| MCP Prolog | http://localhost:3006 | 3006 |
| MCP Launcher | http://localhost:3050 | 3050 |
