# 📰 Ronda 9 — PERIÓDICO: Comunicación de Integración de Plugins

> **Fecha**: 2025-12-23  
> **Rol**: Producción Periodística  
> **Método**: 5W + 4 Banderas

---

## Los Hechos (5W)

### WHO — ¿Quién actúa?

| Actor | Rol | Stake |
|-------|-----|-------|
| **7 Plugins** | Extensiones del Scriptorium | Necesitan UI en la extensión |
| **vscode-alephscript-extension** | Plataforma receptora | Debe integrar sin romper |
| **Equipo de desarrollo** | Implementadores | 70% de tiempo asignado |
| **Usuarios del Scriptorium** | Beneficiarios | Experiencia unificada |
| **Casa Arrakis (legacy)** | Elenco existente | Posible migración |

### WHAT — ¿Qué ocurre?

**Integración de 7 plugins del Scriptorium en la extensión VS Code**:

| Plugin | Agentes | Lo que aporta | Lo que necesita |
|--------|---------|---------------|-----------------|
| **scrum** | 1 | Gestión ágil | Panel de sprint + StatusBar |
| **teatro** | 1 | Experiencias transmedia | Visualizador impress.js |
| **agent-creator** | 1 | Creación de agentes | Editor de recetas |
| **arg-board** | 8 | Motor ARG | Migración de 5 agentes legacy |
| **enciclopedia** | 2 | Consulta de tomos | Buscador + ChatParticipant |
| **gh-pages** | 1 | Publicación web | Preview + StatusBar |
| **foro-scraper** | 1 | Web scraping | Dashboard de jobs |

**Entregables propuestos**:
- 1 nueva épica de infraestructura (SCRIPT-2.16.0)
- 7 épicas de UI por plugin (SCRIPT-2.8.0 a 2.15.0)
- 15 nuevos ChatParticipants
- API de registro dinámico

### WHERE — ¿Dónde?

| Capa | Ubicación | Cambios |
|------|-----------|---------|
| **Plugins** | `.github/plugins/` | Sin cambios (fuente de verdad) |
| **Extensión** | `vscode-alephscript-extension/src/` | Nuevo módulo `plugins/` |
| **Registry** | `.github/plugins/registry.json` | Leído por FileWatcher |
| **Views** | `package.json` (contributes) | Nuevos viewIds por plugin |

### WHEN — ¿Cuándo?

| Fase | Semana | Entregable |
|------|--------|------------|
| **Infraestructura** | S1 (Sprint 2) | PluginRegistryService |
| **ARG-BOARD** | S2 | Migración de elenco |
| **Plugins prioritarios** | S3-S4 | Scrum, Teatro, AgentCreator |
| **Plugins secundarios** | S5-S6 | Enciclopedia, GH-Pages, Scraper |

### WHY — ¿Por qué?

**Motivo oficial**: Unificar experiencia de usuario entre Scriptorium (chat/Copilot) y extensión (UI/panels).

**Motivo real**: Los plugins tienen funcionalidad valiosa pero carecen de interfaz visual:
- El usuario debe invocar prompts sin feedback visual
- No hay indicadores de estado (sprint activo, jobs de scraping, último deploy)
- Los 15 agentes de plugins no están disponibles como ChatParticipants

**La integración resuelve**:
1. **Visibilidad**: TreeViews muestran estado en tiempo real
2. **Accesibilidad**: ChatParticipants permiten interacción natural
3. **Coherencia**: Una sola extensión en lugar de herramientas dispersas

---

## El Análisis (4 Banderas)

### 🔴 REDFLAG — Base Material

**Recursos requeridos**:

| Recurso | Cantidad | Fuente |
|---------|----------|--------|
| Horas de desarrollo | ~120h (8 épicas × 15h) | Equipo interno |
| Dependencias npm | Ninguna nueva | Ya en package.json |
| Infraestructura | VS Code Marketplace | Existente |
| Conocimiento TypeScript | Avanzado | Requerido |

**Viabilidad de escala**:
- ✅ Los 7 plugins son finitos y documentados
- ✅ La extensión ya tiene patrones reutilizables (BaseHackerPanelProvider)
- ⚠️ ARG-BOARD tiene 8 agentes → complejidad alta
- ⚠️ Teatro depende de 3 plugins → integración en cascada

**Enforcement**:
- El `PluginRegistryService` lee `registry.json` → cambios automáticos
- FileWatcher detecta plugins nuevos/eliminados
- No requiere reinstalar extensión

**Régimen material**:
| Decisión | Coste | Beneficio |
|----------|-------|-----------|
| Crear infraestructura base | 21 pts (1 sprint) | Reutilizable para todos |
| Migrar ARG-BOARD primero | Rompe elenco legacy | Desbloquea 3 plugins |
| Mantener coexistencia | Duplicación temporal | No rompe funcionalidad |

### 🔵 BLUEFLAG — Verdad

**Evidencia**:
- ✅ Los 7 plugins están documentados en registry.json
- ✅ La extensión tiene 6 TreeDataProviders funcionando
- ✅ Los 5 ChatParticipants de Arrakis demuestran viabilidad
- ✅ El patrón de manifest.md está estandarizado

**Utilidad**:
- Para desarrollador: Menos cambio de contexto (todo en VS Code)
- Para escritor: Feedback visual del proceso de producción
- Para el proyecto: Coherencia entre Scriptorium y extensión

**Falsificabilidad**:
| Indicador de fracaso | Medición |
|----------------------|----------|
| TreeViews no cargan | Error en console.log |
| ChatParticipants sin respuesta | Timeout > 10s |
| Conflicto de viewIds | Error de registro |
| registry.json malformado | Validación JSON |

**Contradicciones detectadas**:
1. **Elenco duplicado**: Los 5 agentes de TheatricalChatManager (Isaac, Don Álvaro, Dídac, Indra, Backend) no aparecen en ningún manifest.md de plugin. ¿Son agentes legacy sin documentar?
   
   **Mitigación**: Crear manifest.md para "Casa Arrakis" y moverlo a ARG-BOARD.

2. **Dependencias circulares**: Teatro depende de ARG-BOARD, y Agent-Creator tiene dependencia opcional de ARG-BOARD. Si ARG-BOARD falla, cascada de errores.
   
   **Mitigación**: Cargar plugins en orden topológico según dependencies.

### ⚫ BLACKFLAG — Poder y Sombras

**Mapa de poder**:

```
      Microsoft (VS Code APIs)
              │
              ▼ ← Dependencia fuerte
    vscode-alephscript-extension
              │
              ▼ ← Control total
         PluginRegistryService
              │
              ▼ ← Control delegado
         7 Plugins Scriptorium
```

**Actores enemigos**:
| Actor | Amenaza | Probabilidad |
|-------|---------|--------------|
| Cambios en API VS Code | Rompe ChatParticipants | Media |
| Deprecación de Copilot | Pierde integración IA | Baja |
| Plugin malicioso | Registro de código dañino | Baja (plugins auditados) |

**Costes represivos**:
- Si la extensión crece demasiado: tiempo de carga > 3s → usuario abandona
- Si se migra mal ARG-BOARD: funcionalidad legacy rota → regresión

**Autodefensa institucional**:
| Defensa | Mecanismo |
|---------|-----------|
| Plugins desactivables | Campo `enabled` en registry.json |
| Rollback de migración | Git history preserva elenco legacy |
| Tests de integración | Verifican boot < 3s |
| Validación de manifests | Schema JSON estricto |

**Sombras**:
1. **Dependencia de VS Code**: Si Microsoft cambia la API de ChatParticipants, toda la integración falla.
   
   **Mitigación**: Documentar API usada, monitorear changelog de VS Code.

2. **Lock-in técnico**: Una vez migrados los 15 agentes, difícil volver a solo archivos .md.
   
   **Mitigación**: Los .agent.md siguen siendo fuente de verdad; la extensión solo los lee.

### 🟡 YELLOWFLAG — Límites

**Pre/Trans confusión**:
- ¿La extensión está PRE-lista para 15 ChatParticipants? (No testeado)
- ¿Los usuarios TRANS-formarán su workflow o seguirán usando prompts manuales?

**Test de inconmensurabilidad**:
| Marco A (Scriptorium) | Marco B (Extensión) | ¿Compatible? |
|-----------------------|---------------------|--------------|
| Agentes como .md | Agentes como ChatParticipants | ✅ Sí (mismo contenido) |
| Handoffs en YAML | Comandos en package.json | ⚠️ Traducción necesaria |
| DISCO/ como memoria | FileWatcher como sincro | ✅ Sí (complementarios) |

**Condiciones vs. contenido**:
- La extensión crea **condiciones** (UI, chat, status)
- El contenido sigue viviendo en `.github/plugins/`
- ⚠️ Riesgo: confundir la UI con el agente (el agente es el .md, no el ChatParticipant)

**Lo que escapa al diseño**:
1. **Creatividad del usuario**: ¿Cómo usará la combinación de 15 agentes? No predecible.
2. **Emergencia de workflows**: Patrones de uso no anticipados.
3. **Plugins futuros**: El sistema debe ser extensible para plugins no concebidos aún.

---

## Tesis

**La integración de plugins propuesta es técnicamente viable y doctrinalmente coherente**, siempre que:

1. **Se respete la jerarquía de fuentes de verdad**: 
   - `.github/plugins/manifest.md` → definición
   - `registry.json` → estado
   - Extensión → visualización

2. **Se implemente infraestructura antes que features**:
   - PluginRegistryService primero
   - UI de plugins después

3. **Se mantenga coexistencia durante migración**:
   - Elenco legacy activo
   - Elenco nuevo en paralelo
   - Transición gradual

4. **Se documenten indicadores de fracaso**:
   - Boot > 3s
   - ChatParticipants sin respuesta
   - TreeViews vacíos

---

## Prompt de Imagen Editorial

**Concepto**: "La forja de los siete puentes"

**Prompt (Midjourney/DALL-E)**:
```
Dark enlightenment editorial illustration. A medieval scriptorium 
with seven illuminated bridges connecting floating islands. Each 
island represents a plugin: a spiral staircase (teatro), a 
printing press (gh-pages), a scribe's desk (agent-creator), a 
crystal ball (enciclopedia), a web of threads (foro-scraper), a 
circular calendar (scrum), and a chess board (arg-board). In the 
center, a hooded figure (Ox) coordinates the construction. Style: 
Dürer woodcut meets Escher geometry. Color palette: amber, 
midnight blue, bronze. No text.
```

**Capas semióticas**:
- **Centro (Ox)**: El oráculo que conoce todos los agentes
- **Siete islas**: Los plugins como territorios autónomos
- **Puentes iluminados**: Las integraciones TreeView/WebView/Chat
- **Scriptorium base**: La extensión VS Code como sustrato

**Variantes**:
1. Vista cenital (muestra topología de dependencias)
2. Vista del puente ARG-BOARD (el más largo y complejo)
3. Vista nocturna (StatusBar como constelaciones)

---

## Para Profundizar

- Análisis de Ox: [07_ox-plugins-extension.md](07_ox-plugins-extension.md)
- Plan de producción: [08_aleph-plugins-extension.md](08_aleph-plugins-extension.md)
- Conversación completa: `ARCHIVO/DISCO/BACKLOG_BORRADORES/`

---

**Ronda 9 completada** — Turno a @revisor (Ronda 10) para auditoría doctrinal.
