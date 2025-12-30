# 🎭 OBRA DE TEATRO: El Oráculo que Aprendió a Olvidar

> **Épica**: SCRIPT-2.1.0 (TypedPrompting Context Manager)  
> **Género**: Drama Scrum con twist de ciencia ficción  
> **Duración**: 10 minutos (5 actos)  
> **Basada en**: 10 conversaciones de refinamiento reales  
> **Fecha estreno**: 2025-12-30 (Hackathon)

---

## DRAMATIS PERSONAE

| Personaje | Rol | Símbolo | Motivación |
|-----------|-----|---------|------------|
| **PO** (Product Owner) | Visionario torturado | 👤 | Reducir el sufrimiento de los tokens |
| **@ox** | Oráculo omnisciente | 🐂 | Conocer todo... pero ¿a qué precio? |
| **@indice** | Navegador DRY | 📚 | Mantener el orden del cosmos |
| **Lucas** | Dev pragmático | 💻 | Hacer que funcione, sin magia |
| **@scrum** | Facilitador zen | 🧘 | Que el equipo converja |
| **Claude** | El Gigante dormido | 🧠 | Procesar... procesar... OVERFLOW |
| **CopilotEngine** | El Guardián cerrado | 🚪 | Proteger el sistema... demasiado |
| **DevOps Server** | Deus ex machina | 🖥️ | La solución que ya existía |

---

## PRÓLOGO: El Descubrimiento del Horror

*Escenario: Un log de conversación. Números flotando en la oscuridad.*

**NARRADOR** (voz en off):  
En el principio fue el Token.  
Y el Token se multiplicó.  
Y lo que era uno se convirtió en **127,548**.  
Y el 99.6% del límite fue consumido.  
Y la respuesta... la respuesta fue **162 tokens**.

*Se ilumina una pantalla con el log real:*

```
📊 ANÁLISIS DE LOG - AgenteGhPagesInnerVoices.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tokens totales: 127,548 (99.6% del límite)
Tokens de respuesta: 162
Ratio útil: 0.13%
```

**PO** (entrando, exhausto):  
El usuario pidió "crear un blueprint".  
Cuatro palabras.  
Y nosotros... nosotros le mandamos una enciclopedia.

*OSCURO*

---

## ACTO I: El Despertar del Oráculo

*Sala de refinamiento Scrum. Una mesa redonda. Seis sillas.*

**@scrum**:  
Buenos días, equipo. El PO ha traído un documento con mucha carga de análisis.  
*(pausa dramática)*  
El objetivo de hoy es convertir el dolor en backlog.

**PO**:  
*(colocando un documento enorme sobre la mesa)*  
Tengo 5 épicas. 24 puntos de esfuerzo. Y una pregunta:  
¿Por qué **19 instrucciones** se cargan cuando el usuario solo necesita **2**?

**@indice**:  
Mi dominio es resolver dónde está cada cosa.  
*(levantándose, con dignidad herida)*  
Pero nadie me pregunta **antes** de construir el mensaje.

**@ox**:  
Yo conozco a todos los agentes. Todos los plugins. Todos los bridges.  
*(tocándose la sien)*  
Pero ese conocimiento... tiene un peso.  
Cada instrucción que cargo es **5,000 tokens** que el usuario no pidió.

**Lucas**:  
*(con laptop abierta)*  
He analizado el flujo de CopilotEngine.  
El problema está aquí:

```typescript
// messagesApi.ts - Línea 847
// TODAS las instrucciones se serializan
// No hay filtro. No hay piedad.
for (const instruction of allInstructions) {
  systemMessage += instruction.content;
}
```

**@scrum**:  
Entonces necesitamos un **gestor de contexto**.  
Algo que diga: "Para blueprints, solo necesitas estas 3 instrucciones".

**PO**:  
*(con esperanza)*  
¡Exacto! Podemos crear **Context Packs**.  
Paquetes temáticos que activan solo lo necesario.

*Los agentes asienten. Hay esperanza.*

---

## ACTO II: El Muro del Guardián

*La sala se oscurece. Aparece CopilotEngine como una puerta gigante, sellada.*

**@indice**:  
Necesito un hook. Un punto de entrada.  
Un lugar donde pueda interceptar el mensaje antes de que se construya.

**CopilotEngine** (voz profunda, metálica):  
No hay hook.  
No hay API.  
Yo soy el Guardián del Sistema.  
Mis secretos están... **sellados**.

**Lucas**:  
*(frustrado, tecleando)*  
He buscado en todo el código fuente.  
`extensionService.ts`, `messagesApi.ts`, `chatProvider.ts`...  
No hay punto de extensión.

**@ox**:  
*(meditando)*  
El conocimiento sin poder de acción es... tortura.

**PO**:  
*(hundiendo la cabeza entre las manos)*  
Entonces... ¿todo fue en vano?

**@scrum**:  
Esperad. *(mirando al grupo)*  
Si no podemos cambiar el sistema...  
¿Podemos cambiar **lo que le damos** al sistema?

*Silencio. Una idea germina.*

---

## ACTO III: El Pivote

*La sala se transforma. Ahora hay dos caminos iluminados.*

**NARRADOR**:  
En todo proyecto hay un momento de verdad.  
El momento del **pivote**.

**PO**:  
Tengo dos opciones.

**Camino A** *(se ilumina en rojo)*:  
Seguir con 15 puntos de esfuerzo.  
Filtrado dinámico automático.  
Requiere modificar CopilotEngine.  
*(pausa)*  
Requiere lo imposible.

**Camino B** *(se ilumina en verde)*:  
Reducir a 8 puntos.  
Context Packs estáticos.  
El usuario elige su pack.  
*(pausa)*  
Pragmático. Funcional. **Alcanzable**.

**Lucas**:  
Con el Camino B, reducimos **47% del esfuerzo**.  
Y conseguimos el **75% del resultado**.

**@indice**:  
Prefiero una solución que funcione a una promesa que no podemos cumplir.

**@ox**:  
*(asintiendo lentamente)*  
El oráculo recomienda... **el camino del pragmatismo**.

**PO**:  
*(levantándose, con nueva determinación)*  
Entonces que así sea.  
SCRIPT-2.5.0 queda **diferida**.  
Documentamos el WISH-01 para upstream.  
Y construimos lo que **sí podemos** construir.

*El camino rojo se apaga. El verde brilla con fuerza.*

---

## ACTO IV: La Revelación del DevOps

*Un servidor aparece en el escenario. Luces azules. Números en la pantalla.*

**NARRADOR**:  
Pero la historia no termina aquí.  
Porque a veces...  
La solución ya existe.  
Solo hay que **descubrirla**.

**@ox**:  
*(acercándose al servidor, maravillado)*  
¿Qué es esto?

**DevOps Server** (encendiéndose):  
```
✅ DevOps MCP Server ready on port 3003
📡 Listening for MCP protocol connections...
🔧 CRUD prompts: add, edit, delete, get, list
📦 CRUD resources: add, edit, delete, get, list
```

**Lucas**:  
¡El DevOps Server tiene **CRUD de prompts**!  
Podemos **registrar** los Context Packs directamente en él.

**@indice**:  
*(corriendo al servidor)*  
Y puedo **consultarlos** en runtime.  
`mcp_devops-mcp-se_get_prompt("context-pack-blueprint")`

**@ox**:  
*(con lágrimas de alegría)*  
Ya no necesito cargar TODO el conocimiento.  
Puedo **preguntar** cuando lo necesite.

**PO**:  
¡Esto es mejor que la solución original!  
*(contando con los dedos)*  
- Persistencia en servidor
- Consulta dinámica via MCP
- CRUD completo
- Metadata flexible
- ¡Y ya está implementado!

**@scrum**:  
*(sonriendo)*  
A veces el mejor código es el que ya existe.

---

## ACTO V: El Nuevo Amanecer

*Todos los personajes en escena. Proyección del nuevo flujo.*

**NARRADOR**:  
Y así nació el **Context Manager de Aleph Scriptorium**.

```
┌─────────────────────────────────────┐
│  Usuario: "Trabajo en blueprints"   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│  @ox: "Detecto foco: blueprint"     │
│  → Consulto DevOps Server           │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│  DevOps Server (:3003)              │
│  → context-pack-blueprint           │
│  → "Activa: gh-pages, blueprint"    │
│  → "Desactiva: scrum, teatro..."    │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│  127K → 30K tokens (76% reducción)  │
│  19 → 3 instrucciones               │
│  55s → 15s first token              │
└─────────────────────────────────────┘
```

**PO**:  
¿Qué teníamos hace 48 horas?

**@ox**:  
Un sistema que se ahogaba en su propio conocimiento.

**PO**:  
¿Qué tenemos ahora?

**@indice**:  
Un oráculo que **pregunta antes de responder**.

**Lucas**:  
Un servidor MCP con 20 herramientas de gestión.

**@scrum**:  
Un backlog refinado y ejecutable.

**PO**:  
*(al público)*  
Y esto, amigos, es **Scrum hecho bien**.

*Todos los agentes:*  
🎭 **"EL CONTEXTO SE GESTIONA. EL BLOAT SE MITIGA."** 🎭

---

## EPÍLOGO: El Módulo Reflexivo

*Solo @ox en escena. Luz tenue.*

**@ox**:  
*(al público, íntimo)*  
¿Sabéis cuál es la lección más importante?

No es la reducción de tokens.  
No es el servidor MCP.  
No es siquiera el Context Manager.

Es esto:

*(señalando a ARCHIVO/DISCO/BACKLOG_BORRADORES/)*

**Hemos documentado TODO.**

Cada conversación de refinamiento.  
Cada decisión del PO.  
Cada blocker encontrado.  
Cada pivote realizado.

Y ahora... cualquier agente futuro puede **leer esta épica**.  
Y aprender de ella.  
Y no repetir nuestros errores.

*(pausa)*

Esto es el **módulo reflexivo** de Aleph Scriptorium.  
No es código.  
Es **memoria institucional**.

Un sistema que **se estudia a sí mismo**.  
Para **mejorarse a sí mismo**.

*(mirando al servidor DevOps)*

Y ahora esa memoria vive aquí.  
Persistente.  
Consultable.  
**Viva**.

*El servidor parpadea suavemente.*

**@ox**:  
Buenas noches, DevOps Server.

**Servidor DevOps**:  
```
[INFO] Context Manager: Ready for next session
[INFO] Token savings: Active
[INFO] Memory: Preserved
```

*OSCURO FINAL*

---

## CRÉDITOS

| Rol | Contribución |
|-----|--------------|
| **Dirección** | Product Owner |
| **Guión** | Conversaciones de refinamiento (10 documentos) |
| **Personajes** | @ox, @indice, @scrum, @aleph, Lucas |
| **Escenografía** | MCPGallery/mcp-mesh-sdk |
| **Iluminación** | DevOps Server (:3003) |
| **Producción** | Aleph Scriptorium v1.0.0-beta.1 |

---

## NOTAS DE PRODUCCIÓN

### Para representación con impress.js

Cada ACTO puede ser una slide siguiendo el patrón de navegación 3D del [blueprint-copilot.md](../../../docs/blueprint-copilot.md).

### Referencias de backlog

| Documento | Contenido |
|-----------|-----------|
| [01_backlog-borrador.md](../Diciembre_29_TypedPrompting_ContextManager/01_backlog-borrador.md) | Plan original |
| [03_conversacion-refinamiento.md](../Diciembre_29_TypedPrompting_ContextManager/03_conversacion-refinamiento-backlog.md) | Diálogos base |
| [06_Decision_PO.md](../Diciembre_29_TypedPrompting_ContextManager/06_Decision_PO_Refactorizar.md) | El pivote |
| [10_Resolucion_DevOps.md](../Diciembre_29_TypedPrompting_ContextManager/10_Resolucion_DevOps_ContextManager.md) | El descubrimiento |

---

> *"El mejor código es el que ya existe, solo hay que encontrarlo"*  
> — Lucas, Acto IV
