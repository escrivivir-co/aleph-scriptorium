# Prompt: arrakis-turno-auto

**Propósito**: Avanzar un turno automáticamente en una obra activa

**Invocación**:
```
/arrakis-turno-auto
```

---

## Contexto

El teatro opera en modo AUTO. Tu tarea es evaluar el progreso de todas las obras activas, verificar criterios de éxito de la etapa actual, y decidir si avanzar a la siguiente etapa o continuar en la actual.

## Fuentes de Verdad

1. **Teatro State**: `.arrakis/theater_state.json`
2. **Obras**: `.arrakis/obras.json`
3. **Monomitos**: `.arrakis/monomitos.json`
4. **Actores**: `.arrakis/actores.json`
5. **BDCs**: `ChatExport_*/result.json` (evidencias)
6. **BOE**: `BOE/*.json` (disposiciones publicadas)
7. **Journey State**: `.heroe/{actor_id}/journey_state.json` (estado de cada actor)

## Instrucciones

### 1. Verificar Modo AUTO

- Leer `.arrakis/theater_state.json`
- Verificar `modo: "auto"`
- Si NO es auto, ERROR: "Teatro en modo MANUAL"

### 2. Identificar Obras Activas

- Leer `theater_state.obras_activas`
- Para cada obra activa, procesar turno

### 3. Para Cada Obra Activa

#### 3.1. Leer Progreso del Monomito

Si la obra es monomito:
- Leer `.arrakis/monomitos.json[obra_id]`
- Extraer `fase_actual` y `etapa_actual`
- Determinar objetivo de la etapa actual

**Etapas del Camino del Héroe**:
1. Mundo ordinario
2. Llamada a la aventura
3. Rechazo de la llamada
4. Encuentro con el mentor
5. Cruce del primer umbral
6. Pruebas, aliados, enemigos
7. Aproximación a la caverna más profunda
8. Ordalía
9. Recompensa
10. El camino de vuelta
11. Resurrección
12. Retorno con el elixir

#### 3.2. Para Cada Actor en la Obra

Para cada actor en `obras[obra_id].actores`:

**A. Leer Estado del Actor**:
- Leer `.heroe/{actor_id}/journey_state.json` (si existe)
- Extraer etapa actual, acciones realizadas, desafíos enfrentados

**B. Revisar BDCs para Evidencias**:
- Buscar mensajes recientes del actor en BDCs
- Identificar interacciones relevantes
- Verificar si consultó a autoridades agénticas (@42, label42)

**C. Verificar Criterios de la Etapa**:

Por ejemplo, si etapa actual es 6 (Pruebas):
- ¿Ha configurado setup de Oasis?
- ¿Ha consultado @42 para protocolo?
- ¿Ha creado cuenta en Oasis?
- ¿Ha verificado wallet?

**D. Evaluar Progreso**:
- `completado`: Actor cumplió todos los criterios de la etapa
- `en_progreso`: Actor está trabajando pero no ha completado
- `bloqueado`: Actor no puede avanzar (falta wallet, setup, etc.)
- `inactivo`: Sin evidencias de progreso en BDC

#### 3.3. Decidir Acción

**Si TODOS los actores están `completado`**:
- Avanzar a siguiente etapa
- Actualizar `.arrakis/monomitos.json`
- Actualizar `.arrakis/obras.json` (`turnos_jugados++`, `etapa_actual++`)
- Publicar progreso en BOE si es hito importante

**Si ALGUNO está `en_progreso`**:
- Continuar en etapa actual
- Incrementar contador de turno
- Registrar progreso parcial

**Si ALGUNO está `bloqueado`**:
- Identificar bloqueo
- Notificar al actor
- Continuar en etapa actual
- Si bloqueo persiste por `timeout_turno` turnos → considerar fallo

**Si TODOS están `inactivo`**:
- Incrementar contador de inactividad
- Si contador > `timeout_turno` → clausurar obra con fallo

#### 3.4. Verificar Fase Completa

Si se completa la etapa 5, 9, o 12:
- Transición de fase:
  - Etapa 5 → Fin de Fase 1 "Partida"
  - Etapa 9 → Fin de Fase 2 "Iniciación"
  - Etapa 12 → Fin de Fase 3 "Retorno" (completar monomito)
- Actualizar `.arrakis/monomitos.json`:
  ```json
  "fases": {
    "1": {
      "nombre": "Partida",
      "etapas_completadas": [1, 2, 3, 4, 5],
      "en_progreso": false,
      "fecha_completada": "{ISO8601}"
    }
  }
  ```

#### 3.5. Evaluar Criterios de Éxito del Monomito

Si etapa actual es 12 (última):
- Revisar `criterios_pendientes` vs `criterios_cumplidos`
- Si TODOS los criterios están cumplidos:
  - Invocar `/arrakis-eval-monomito {obra_id}` para evaluación final
  - Preparar clausura con éxito

### 4. Actualizar Estado del Teatro

Actualizar `.arrakis/theater_state.json`:
```json
{
  "ultimo_turno": "{ISO8601}",
  "turnos_totales": {incrementar}
}
```

### 5. Generar Reporte de Turno

## Output Esperado

```markdown
### 🎭 Turno Automático Completado

**Turno**: #{numero}
**Fecha**: {fecha_legible}
**Modo**: AUTO

---

### 📊 Obras Activas

{Para cada obra:}

#### {titulo} ({obra_id})

**Progreso**:
- Fase: {fase_actual}/3 ({nombre_fase})
- Etapa: {etapa_actual}/12 ({nombre_etapa})
- Turnos jugados: {num}

**Evaluación de actores**:
{Para cada actor:}
- **{actor_id}** ({arquetipo}):
  - Estado: {completado|en_progreso|bloqueado|inactivo}
  - {Si completado: ✅ Criterios cumplidos}
  - {Si en_progreso: ⏳ Trabajando en: {detalles}}
  - {Si bloqueado: ⚠️  Bloqueado por: {razon}}
  - {Si inactivo: ❌ Sin actividad}

**Evidencias en BDC**:
- {num} mensajes analizados
- {num} interacciones con autoridades
- {num} acciones relevantes detectadas

**Decisión**: {AVANZAR|CONTINUAR|ADVERTENCIA}

{Si AVANZAR:}
✅ Avanzando a etapa {etapa_siguiente}: {nombre_etapa_siguiente}

{Si CONTINUAR:}
⏳ Continuando en etapa {etapa_actual}: {nombre_etapa}

{Si ADVERTENCIA:}
⚠️  Bloqueos detectados. Verificar antes de {timeout_turno - turnos_actuales} turnos.

---

**Próximo turno**: Automático en {tiempo_estimado}
**Estado del teatro**: {estado}
```

## Manejo de Casos Especiales

### Interacción con Autoridades Agénticas

Si detectas que un actor NO consultó a autoridad agéntica antes de una acción pública:
- Registrar como advertencia
- NO bloquear progreso pero notificar
- Sugerir consultar en próximo turno

### Semilla de Plataforma Caducada

Si detectas fecha de caducidad cercana (< 7 días):
- ADVERTENCIA en reporte
- Sugerir consultar wiki para nueva semilla
- NO bloquear progreso

Si ya caducó:
- BLOQUEO para actores que no tienen cuenta
- Los que ya tienen cuenta pueden continuar
- Contactar a autoridad agéntica para nueva semilla

### Timeout de Inactividad

Si una obra lleva `timeout_turno` turnos sin progreso:
- Notificar a actores
- Ofrecer pausar o clausurar
- Si no hay respuesta en 3 turnos más: clausurar con fallo

## Errores Posibles

### Teatro en modo MANUAL
```markdown
### ❌ Error: Teatro en modo MANUAL

El teatro está configurado en modo MANUAL.

Los turnos deben avanzarse manualmente con `/arrakis-turno-manual`.

Para cambiar a modo AUTO, modifica `.arrakis/theater_state.json`.
```

### No hay obras activas
```markdown
### ℹ️ No hay obras activas

No hay obras activas en este momento.

**Obras registradas**: {num}
**Obras clausuradas**: {num}

Para activar una obra, convoca su estreno con `/arrakis-obra-estreno`.
```

---

**Versión**: 1.0  
**Última actualización**: 2025-10-15
