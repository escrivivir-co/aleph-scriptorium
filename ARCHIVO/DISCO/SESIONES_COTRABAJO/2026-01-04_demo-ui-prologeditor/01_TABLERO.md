# Tablero de Turnos — Demo UI PrologEditor

> **Regla DRY**: Este fichero es un ÍNDICE. El contenido detallado está en `02_ACTAS/`.

---

## Fase 0: Organización (@ox) — ✅ COMPLETADA

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| 0 | @ox | ✅ DONE | [acta-00.md](02_ACTAS/acta-00.md) |

**Resultado**: Guión de 12 pasos VALIDADO contra specs. Listo para demo.

---

## Fase 1: Demo (después de organización)

## Turno Actual

| # | Agente | Estado | Acta |
|---|--------|--------|------|
| — | — | ✅ DEMO COMPLETADA | [acta-12.md](02_ACTAS/acta-12.md) |

**Paso en curso**: Crear sesión Prolog (UC-DEV-001)  
**Commits consolidados**: ✅ 2 commits (settings.json + sesión cotrabajo)

## Guión de Demo (12 pasos) — ✅ VALIDADO por @ox

El agente PrologEditor seguirá este flujo:

| Paso | Tab | Acción | Tool demostrada | Acta |
|------|-----|--------|-----------------|------|
| 1 | Sessions | Crear sesión Prolog | `create_session` | [acta-01.md](02_ACTAS/acta-01.md) |
| 2 | Sessions | Listar sesiones | `list_sessions` | [acta-02.md](02_ACTAS/acta-02.md) |
| 3 | Editor | Ejecutar query simple | `query` | [acta-03.md](02_ACTAS/acta-03.md) |
| 4 | Knowledge | Añadir hecho | `assert_fact` | [acta-04.md](02_ACTAS/acta-04.md) |
| 5 | Knowledge | Consultar archivo | `consult_file` | [acta-05.md](02_ACTAS/acta-05.md) |
| 6 | Templates | Ver templates MCP | `get_templates` | [acta-06.md](02_ACTAS/acta-06.md) |
| 7 | Templates | Listar SDK templates | `list_sdk_templates` | [acta-07.md](02_ACTAS/acta-07.md) |
| 8 | Templates | Ver contenido template | `get_sdk_template_content` | [acta-08.md](02_ACTAS/acta-08.md) |
| 9 | Knowledge | Cargar reglas de DB | `load_rules_from_db` | [acta-09.md](02_ACTAS/acta-09.md) |
| 10 | Knowledge | Guardar regla en DB | `save_rule_to_db` | [acta-10.md](02_ACTAS/acta-10.md) |
| 11 | Telemetry | Ver estado telemetría | `get_telemetry_status` | [acta-11.md](02_ACTAS/acta-11.md) |
| 12 | Sessions | Destruir sesión | `destroy_session` | [acta-12.md](02_ACTAS/acta-12.md) |

## Flujo Interactivo por Paso

Cada paso sigue este protocolo:

```
1. 📢 ANUNCIAR: PrologEditor anuncia qué se va a demostrar
2. 🌐 NAVEGAR: Abre la página/tab en el navegador
3. 💬 EXPLICAR: Breve explicación al PO de qué hace el componente
4. ▶️ EJECUTAR: Realiza la acción (tool/endpoint)
5. ✅ CONFIRMAR: Espera OK del PO
6. 📝 DOCUMENTAR: Escribe acta del paso
7. ➡️ SIGUIENTE: Avanza al próximo paso
```

## Historial de Turnos

| # | Agente | Inicio | Fin | Resumen (1 línea) | Acta |
|---|--------|--------|-----|-------------------|------|
| 1 | @plugin_ox_prologeditor | 01:40 | 01:42 | ✅ Sesión creada: session-mjz010od-f7d5 | [acta-01.md](02_ACTAS/acta-01.md) |
| 2 | @plugin_ox_prologeditor | 01:42 | 01:43 | ✅ list_sessions demostrado (tabla) | [acta-02.md](02_ACTAS/acta-02.md) |
| 3 | @plugin_ox_prologeditor | 01:43 | 01:45 | ✅ Query member(X,[1,2,3]) → 3 soluciones | [acta-03.md](02_ACTAS/acta-03.md) |
| 4 | @plugin_ox_prologeditor | 01:45 | 01:47 | ✅ Assert likes(mary,wine) + hallazgo aislamiento | [acta-04.md](02_ACTAS/acta-04.md) |
| 5 | @plugin_ox_prologeditor | 01:47 | 01:50 | ✅ Consult test.pl + historial/re-consult | [acta-05.md](02_ACTAS/acta-05.md) |
| 6 | @plugin_ox_prologeditor | 01:50 | 01:52 | ⚠️ MCP Templates: catálogo OK, contenido 404 | [acta-06.md](02_ACTAS/acta-06.md) |
| 7-8 | @plugin_ox_prologeditor | 01:52 | 01:54 | ✅ SDK Templates dropdown funcional | [acta-07-08.md](02_ACTAS/acta-07-08.md) |
| 9-10 | @plugin_ox_prologeditor | 01:54 | 01:56 | ✅ Save rule OK, list no refresh | [acta-09-10.md](02_ACTAS/acta-09-10.md) |
| 11 | @plugin_ox_prologeditor | 01:56 | 01:57 | ✅ Telemetría IoT completa | [acta-11.md](02_ACTAS/acta-11.md) |
| 12 | @plugin_ox_prologeditor | 01:57 | 01:58 | ✅ Sesión destruida, demo finalizada | [acta-12.md](02_ACTAS/acta-12.md) |

## Intervenciones Puntuales

| Agente | Hora | Resumen | Acta | Pendiente |
|--------|------|---------|------|-----------|
| @indice | 2026-01-04 | Corrección settings.json: indexar 22 plugins | [acta-indice-01.md](02_ACTAS/acta-indice-01.md) | ✅ Commit 463cd0e |
| @aleph | 2026-01-04 | Consolidar commits de sesión | — | ✅ Commit 78be298 |

## Cola de Espera

| Posición | Agente | Prioridad | Rol |
|----------|--------|-----------|-----|
| 1 | @plugin_ox_prologeditor | Normal | Ejecutar demo |
| 2 | PO | — | Validar cada paso |

## Estado de Pasos

| Paso | Estado | Resultado |
|------|--------|-----------|
| 1 | ✅ Completado | session-mjz010od-f7d5 creada |
| 2 | ✅ Completado | 1 sesión listada en tabla |
| 3 | ✅ Completado | member(X,[1,2,3]) → X=1,2,3 |
| 4 | ✅ Completado | likes(mary,wine) asertado |
| 5 | ✅ Completado | test.pl consultado |
| 6 | ⚠️ Parcial | Catálogo OK, contenido 404 |
| 7 | ✅ Completado | SDK templates listados |
| 8 | ✅ Completado | Template seleccionado |
| 9 | ✅ Completado | Reglas cargadas |
| 10 | ✅ Completado | factorial guardado |
| 11 | ✅ Completado | Telemetría enviada |
| 12 | ✅ Completado | Sesión destruida |
| 3 | ⏳ Pendiente | — |
| 4 | ⏳ Pendiente | — |
| 5 | ⏳ Pendiente | — |
| 6 | ⏳ Pendiente | — |
| 7 | ⏳ Pendiente | — |
| 8 | ⏳ Pendiente | — |
| 9 | ⏳ Pendiente | — |
| 10 | ⏳ Pendiente | — |
| 11 | ⏳ Pendiente | — |
| 12 | ⏳ Pendiente | — |

## Notas

- **URL Frontend**: http://localhost:5001
- **Stack Health**: ✅ 4/4 servicios operativos
- **Épica**: DEMO-UI-1.0.0
