# Protocolo de Cotrabajo
 "Protocolo de Cotrabajo Multi-Agente"
> Copia local de referencia. Fuente: `.github/plugins/scriptorium-pack/instructions/cotrabajo.instructions.md`

---

## Estados de Agente

| Estado | Emoji | Significado |
|--------|-------|-------------|
| Sin turno | ⚪ | No asignado |
| Esperando | ⏳ | En cola |
| Leyendo | 📖 | Contexto |
| Pensando | 🤔 | Procesando |
| Escribiendo | ✍️ | Produciendo |
| Revisando | 🔍 | Auditando |
| Bloqueado | ⛔ | Necesita input |
| Completado | ✅ | Turno listo |

---

## Ciclo de Turno

```
1. VERIFICAR → Leer 01_TABLERO.md
2. LEER → Estado 📖 READING
3. PENSAR → Estado 🤔 THINKING  
4. ESCRIBIR → Estado ✍️ WRITING → Crear acta
5. ACTUALIZAR → Editar tablero
6. PASAR → Estado ✅ DONE
```

---

## Regla de Oro

> **PROHIBIDO**: Escribir contenido sustantivo en el chat.  
> El chat solo comunica ESTADOS.

---

## Formato de Acta

```markdown
# Acta T00X: {Tema}

## Metadatos

| Campo | Valor |
|-------|-------|
| Turno | 00X |
| Agente | @agente |
| Inicio | YYYY-MM-DD HH:MM |
| Fin | YYYY-MM-DD HH:MM |
| Estado final | ✅ DONE |

## Contexto Leído

- Actas revisadas: T001, T002
- Referencias: backlog.md

## Aportación

{contenido sustantivo}

## Decisiones Tomadas

1. ...

## Preguntas para Siguientes Turnos

- [ ] ... → sugerido: @agente

## Siguiente Turno Sugerido

@agente para {tarea}
```
