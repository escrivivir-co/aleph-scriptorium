# 🐂 ESCENA 04-01: Run All

> **Capítulo**: 4 — Encuentro con el Mentor  
> **Tema**: Ox muestra el camino  
> **Slide Principal**: paso4-po  
> **Demo**: `alephscript.demo.runAll`

---

## ESCENA

*Interior del Scriptorium. Una sala oscura con múltiples monitores apagados.*

*Clippy cruza el umbral, tímido. Una figura emerge de las sombras.*

**OX**:  
*(voz profunda, serena)*  
🐂 Bienvenido al Scriptorium.

**CLIPPY**:  
*(dando un paso atrás)*  
¿Quién... eres tú?

**OX**:  
Soy Ox. El oráculo.  
Conozco a todos los agentes. Todos los plugins. Todos los bridges.  
*(tocándose la sien)*  
Tengo la respuesta a "¿qué agente uso para X?".

**CLIPPY**:  
Vaya. Eso es... impresionante.

**OX**:  
*(sonriendo)*  
Pero lo más impresionante...  
Es esto.

*Ox levanta un hoof y ejecuta un comando.*

```
Cmd+Shift+P → "AlephScript Demo: ▶️ Run All Demo Servers"
```

*Los monitores cobran vida. 5 terminales se abren en cascada.*

| Terminal | Servidor | Puerto |
|----------|----------|--------|
| 🌐 | Jekyll Site | :4000 |
| 🚀 | MCP Launcher | :3050 |
| 🤖 | MCP Model | :3001 |
| ⚡ | Zeus | :4001 |
| 📝 | Novelist | :3066 |

**CLIPPY**:  
*(boquiabierto)*  
¿Todo... con un solo comando?

**OX**:  
Este es el Scriptorium en acción.  
Cada servidor es un órgano. Cada agente, una función.  
Juntos, forman un sistema que piensa.

**CLIPPY**:  
¿Y yo... dónde encajo?

**OX**:  
*(apuntando a la pantalla de Novelist)*  
Ahí. En las historias.  
Alguien tiene que ayudar a los humanos a escribirlas.

*FUNDIDO*

---

## NOTAS PARA SLIDES ADYACENTES

### paso4-ox (↑ arriba)
**Demo Live**: Mostrar el comando `alephscript.demo.runAll`.
```bash
# Abre 5 terminales simultáneas:
./scripts/serve-site.sh    # Jekyll :4000
npm run start:launcher     # MCP Launcher :3050
npm run start:model        # MCP Model :3001
npm run start:zeus         # Zeus :4001
npm start                  # Novelist :3066
```

### paso4-aleph (↙ abajo-izquierda)
**Flujo de Usuario**: Cómo funciona la interacción.
1. Usuario pregunta a @ox
2. @ox consulta AGENTS.md (fuente DRY)
3. Identifica agente apropiado
4. Agente especializado responde

### paso4-sm (↘ abajo-derecha)
**Métricas de Uso**:
| Métrica | Valor |
|---------|-------|
| Agentes disponibles | 31+ |
| Plugins instalados | 19 |
| Submódulos | 16 |
| Handoffs totales | 50+ |

---

## TRANSICIÓN

*Los servidores parpadean suavemente, vivos.*

**OX**:  
"Ahora que el sistema está despierto...  
Es hora de que conozcas a alguien más."

→ **Siguiente**: Escena 05-01 (Panel de Control Aleph)
