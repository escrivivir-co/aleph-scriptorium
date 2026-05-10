# Prompt: Asesorar sobre Nodos

> **Plugin**: WireEditor  
> **Agente**: WireEditor

## Objetivo

Recomendar qué nodos usar según el caso de uso descrito por el usuario.

## Input

El usuario describe:
- **Qué quiere lograr** (objetivo)
- **De dónde vienen los datos** (fuente)
- **Qué transformaciones necesita**
- **Dónde van los resultados** (destino)

## Catálogo de Nodos (13)

### Bot (2)

| Nodo | Cuándo usar |
|------|-------------|
| **BotClientNode** | Establecer conexión con servidor de bots |
| **BotNode** | Representar un bot específico, recibir/enviar mensajes |

### Channel (3)

| Nodo | Cuándo usar |
|------|-------------|
| **ChannelConfigNode** | Configurar parámetros de canal (credenciales, opciones) |
| **ChannelNode** | Enrutar mensajes a canales específicos |
| **PlatformContextNode** | Acceder a información de plataforma (Kick, Twitch, Discord) |

### Format (3)

| Nodo | Cuándo usar |
|------|-------------|
| **FormatNode** | Transformar formato de datos (JSON ↔ texto, etc.) |
| **MessageParserNode** | Extraer datos de mensajes (comandos, argumentos, metadata) |
| **ResponseBuilderNode** | Construir respuestas estructuradas |

### Orchestration (2)

| Nodo | Cuándo usar |
|------|-------------|
| **FlowControlNode** | Bifurcar, filtrar, rate-limit, enrutar condicionalmente |
| **StateManagerNode** | Mantener estado entre ejecuciones (sesiones, contadores) |

### Dashboard (3)

| Nodo | Cuándo usar |
|------|-------------|
| **DashboardNode** | Crear panel de control visual |
| **UIWidgetNode** | Mostrar información (gráficos, texto, indicadores) |
| **FormNode** | Capturar input del usuario (formularios) |

## Proceso de Asesoramiento

### 1. Identificar categoría principal

| Si el usuario menciona... | Categoría |
|---------------------------|-----------|
| chat, bot, mensaje, comando | Bot + Format |
| canal, plataforma, Kick, Twitch | Channel |
| transformar, parsear, formatear | Format |
| filtrar, bifurcar, limitar, estado | Orchestration |
| interfaz, formulario, mostrar | Dashboard |

### 2. Recomendar combinación

Patrones comunes:

| Patrón | Nodos |
|--------|-------|
| Bot de comandos | BotClientNode → BotNode → MessageParserNode → FlowControlNode |
| Filtro de mensajes | ChannelNode → FlowControlNode → FormatNode |
| Dashboard de config | DashboardNode + FormNode + StateManagerNode |
| Respuesta automática | MessageParserNode → ResponseBuilderNode → BotNode |
| Multi-canal | ChannelConfigNode → ChannelNode (×N) → merge |

### 3. Sugerir plantilla

Si existe plantilla que coincide:
- Proponer usarla como base
- Listar modificaciones necesarias

### 4. Advertir sobre complejidad

| Complejidad | Indicadores |
|-------------|-------------|
| Baja | 1-3 nodos, sin estado |
| Media | 4-7 nodos, con estado simple |
| Alta | 8+ nodos, múltiples canales, estado complejo |

## Output

1. **Nodos recomendados** (lista ordenada)
2. **Diagrama de conexión** (texto)
3. **Plantilla sugerida** (si existe)
4. **Advertencias** (si aplica)
5. **Próximos pasos**

## Ejemplo

```
Usuario: Quiero filtrar los mensajes de un chat de Kick que empiecen 
         con "!" y pasarlos a un agente del Scriptorium

WireEditor:

## Análisis
- Fuente: Chat de Kick (streaming)
- Transformación: Filtrar por prefijo "!"
- Destino: Agente vía feed JSON

## Nodos Recomendados

1. **BotClientNode** → Conectar con Kick
2. **BotNode** → Recibir eventos de chat
3. **FlowControlNode** → Filtrar mensajes que empiezan con "!"
4. **MessageParserNode** → Extraer comando y argumentos
5. **FormatNode** → Formatear como entry de feed

## Diagrama

```
Kick Chat
    │
    ▼
┌──────────────┐
│ BotClientNode │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   BotNode    │ ← eventos de chat
└──────┬───────┘
       │
       ▼
┌─────────────────┐
│ FlowControlNode │ ← filtrar por "!"
└──────┬──────────┘
       │
       ▼
┌───────────────────┐
│ MessageParserNode │ ← extraer !comando args
└──────┬────────────┘
       │
       ▼
┌──────────────┐
│  FormatNode  │ ← JSON entry
└──────┬───────┘
       │
       ▼
   feeds/kick-commands.json
```

## Plantilla Sugerida
`basic-kick-bot-commands` (adaptar filtro y destino)

## Próximos Pasos
1. Crear proyecto: `@wireeditor crear proyecto kick-filter`
2. Importar plantilla como base
3. Configurar feed de salida
```
