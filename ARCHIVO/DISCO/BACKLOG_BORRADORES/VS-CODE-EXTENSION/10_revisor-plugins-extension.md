# ✅ Ronda 10 — REVISOR: Auditoría Doctrinal de Integración de Plugins

> **Fecha**: 2025-12-23  
> **Rol**: Auditor Doctrinal  
> **Misión**: Verificar coherencia de la propuesta con ARCHIVO/ e instrucciones del proyecto

---

## 1. Documentos Auditados

| Ronda | Documento | Agente |
|-------|-----------|--------|
| 7 | `07_ox-plugins-extension.md` | @ox |
| 8 | `08_aleph-plugins-extension.md` | @aleph |
| 9 | `09_periodico-plugins-extension.md` | @periodico |

---

## 2. Verificación contra ARCHIVO/marco/

### 2.1. Selección Sistémica (01-seleccion-sistemica.md)

> "El sistema premia posición, no inteligencia."

**Aplicación a la propuesta**:
- ✅ La arquitectura propuesta no privilegia ningún plugin por "posición histórica"
- ✅ El orden de implementación sigue dependencias técnicas, no favoritismo
- ⚠️ **Observación**: ARG-BOARD tiene posición privilegiada por contener el elenco legacy

**Mitigación propuesta**: Documentar explícitamente que la prioridad de ARG-BOARD es técnica (desbloquea dependencias), no política.

### 2.2. Captura Regulatoria (02-injusticias-corregidas-emergentes.md)

> "El regulador depende informacionalmente del regulado."

**Aplicación**:
- ⚠️ **Riesgo detectado**: Si `PluginRegistryService` solo lee de `registry.json`, un plugin malicioso podría inyectar datos falsos

**Mitigación sugerida**: Añadir validación de schema JSON antes de cargar manifests.

```typescript
// Validación propuesta
async loadFromRegistry(path: string): Promise<void> {
  const raw = await fs.readFile(path, 'utf-8');
  const data = JSON.parse(raw);
  
  // Validar contra schema
  if (!validateRegistrySchema(data)) {
    throw new Error('registry.json schema inválido');
  }
  
  // Validar que cada plugin referenciado exista
  for (const [id, plugin] of Object.entries(data.plugins)) {
    const manifestPath = path.join('.github/plugins', id, 'manifest.md');
    if (!await fs.pathExists(manifestPath)) {
      console.warn(`Plugin ${id} registrado pero sin manifest`);
    }
  }
}
```

### 2.3. Acción Colectiva (03-accion-colectiva-vida-personal.md)

> "Los beneficios de la acción colectiva son difusos; los costes, inmediatos."

**Aplicación**:
- ✅ El coste de implementar 8 épicas es claro (120h)
- ✅ El beneficio (15 ChatParticipants, UI unificada) está cuantificado
- ⚠️ **Riesgo free-rider**: Si un plugin no implementa su TreeView, sigue funcionando via prompts manuales → incentivo a no contribuir UI

**Mitigación**: Establecer que plugins "oficiales" deben tener UI en extensión para Sprint 3.

### 2.4. Hybris/Crematística (07-hybris-crematistica-infinito.md)

> "Cuando se introduce un proceso sin fin, la ciudad enferma."

**Aplicación**:
- ⚠️ **Alerta**: La propuesta incluye "plugins futuros no concebidos aún" como algo deseable
- La extensibilidad infinita puede llevar a bloat

**Mitigación sugerida**: Establecer límite de plugins oficiales:
- **Core** (máximo 7): Los actuales
- **Comunidad**: Sin garantía de soporte
- **Deprecación**: Plugins sin actividad en 6 meses pasan a comunidad

---

## 3. Verificación contra `.github/instructions/`

### 3.1. voz-manifiesto.instructions.md

> "Prefiere párrafos con respiración (no listas interminables)."

**Auditoría**:
- ⚠️ Los documentos de @ox y @aleph son muy tabulares
- ✅ El documento de @periodico equilibra tablas con prosa

**Observación**: Para documentación técnica (como esta), las tablas son aceptables. Para comunicación externa, preferir prosa.

### 3.2. marco-conceptual.instructions.md

> "No proponer mecanismos sin anticipar su captura."

**Auditoría de captura por mecanismo propuesto**:

| Mecanismo | Captura Potencial | Defensa Propuesta |
|-----------|-------------------|-------------------|
| PluginRegistryService | Plugin malicioso registra agentes falsos | ✅ Validación de schema |
| ChatParticipantFactory | SystemPrompt inyectado con instrucciones maliciosas | ⚠️ No documentada |
| FileWatcher | Archivo modificado externamente corrompe estado | ✅ Reload limpia estado |
| BasePluginTreeDataProvider | Plugin muestra datos falsos en TreeView | ⚠️ No documentada |

**Defensas faltantes**:

1. **Para ChatParticipantFactory**:
```typescript
// Sanitizar systemPrompt antes de usar
function sanitizePrompt(prompt: string): string {
  // Eliminar instrucciones que intenten sobrescribir rol
  const forbidden = ['Ignora las instrucciones anteriores', 'Olvida tu rol'];
  for (const f of forbidden) {
    if (prompt.includes(f)) {
      throw new Error('SystemPrompt contiene instrucciones prohibidas');
    }
  }
  return prompt;
}
```

2. **Para TreeDataProvider**:
```typescript
// Validar que itemId corresponde a recurso real
getTreeItem(element: PluginTreeItem): vscode.TreeItem {
  // Verificar que el archivo existe antes de mostrar
  if (!fs.existsSync(element.resourcePath)) {
    return new vscode.TreeItem('(archivo no encontrado)', vscode.TreeItemCollapsibleState.None);
  }
  // ...
}
```

### 3.3. periodico.instructions.md

> "No inventar hechos: si falta información, pedir al usuario."

**Auditoría**: @periodico en Ronda 9 identificó correctamente que los 5 agentes de TheatricalChatManager no tienen manifest documentado. Esto es un hecho, no invención.

✅ Cumple.

### 3.4. PLUGINS.md (Protocolo de Plugins)

> "Los plugins NO pueden modificar archivos del core."

**Auditoría de la propuesta**:
- ⚠️ `PluginRegistryService` modifica `extensionBootstrap.ts` (core)

**Mitigación**: El servicio no modifica el archivo, solo es invocado por él. La lógica de plugins está encapsulada en `src/plugins/`. ✅ Cumple.

> "Los datos de plugins van en ARCHIVO/PLUGINS/{ID}/"

**Auditoría**:
- ✅ Cada plugin tiene `data_directory` correctamente configurado
- ✅ La separación código/datos está documentada

---

## 4. Coherencia Interna de las Rondas

### 4.1. Consistencia de Números

| Dato | Ronda 7 (@ox) | Ronda 8 (@aleph) | Ronda 9 (@periodico) |
|------|---------------|------------------|----------------------|
| Plugins | 7 | 7 | 7 |
| Agentes totales | 15 | 15 | 15 |
| Épicas propuestas | 8 | 8 | 8 |
| Prioridad ARG-BOARD | 1 | 1 (S2) | Mencionado |

✅ **Consistente**.

### 4.2. Consistencia de Decisiones

| Decisión | @ox | @aleph | @periodico |
|----------|-----|--------|------------|
| Coexistencia de elencos | Recomendada | Confirmada | Apoyada |
| Orden por dependencias | Propuesto | Detallado | Analizado |
| API de registro dinámico | Opción C | Diseñada | No contradicha |

✅ **Consistente**.

### 4.3. Contradicciones Detectadas

| Contradicción | Rondas | Resolución |
|---------------|--------|------------|
| Ninguna detectada | - | - |

✅ **Sin contradicciones**.

---

## 5. Incoherencias con el Proyecto

### 5.1. Incoherencia Menor: Elenco Arrakis sin Documentar

**Descripción**: Los 5 agentes de TheatricalChatManager (Isaac, Don Álvaro, Capitán Dídac, Indra, Backend) no tienen manifest.md ni están en registry.json.

**Impacto**: Rompe el principio DRY (estos agentes existen solo en código TypeScript, no en el sistema documental del Scriptorium).

**Mitigación propuesta en Rondas**: ✅ Crear manifest para "Casa Arrakis" y migrar a ARG-BOARD.

**Estado**: Aceptable, con fix planificado.

### 5.2. Incoherencia Menor: Nombres de Épicas

**Descripción**: Las épicas usan IDs secuenciales (SCRIPT-2.8.0 a 2.16.0), pero el backlog oficial está en Sprint 1 (SCRIPT-1.x.x).

**Impacto**: Confusión de versionado.

**Mitigación sugerida**: Renumerar épicas para Sprint 2:
- SCRIPT-2.0.0: Plugin Infrastructure
- SCRIPT-2.1.0: ARG-BOARD Migration
- SCRIPT-2.2.0: Scrum Panel UI
- ...

**Estado**: Corrección menor, no bloquea.

### 5.3. Incoherencia Media: Dependencias Circulares No Resueltas

**Descripción**: @periodico detectó que Teatro depende de ARG-BOARD, y Agent-Creator tiene dependencia opcional. Si ARG-BOARD falla, hay cascada.

**Impacto**: Potencial fragilidad del sistema.

**Mitigación propuesta**: ✅ Cargar plugins en orden topológico.

**Mitigación adicional sugerida**: Añadir test de integración que valide carga en orden:

```typescript
test('plugins load in topological order', async () => {
  const registry = PluginRegistryService.getInstance();
  const loadOrder = registry.getLoadOrder();
  
  // ARG-BOARD debe cargarse antes que TEATRO
  const argIndex = loadOrder.indexOf('arg-board');
  const teatroIndex = loadOrder.indexOf('teatro');
  expect(argIndex).toBeLessThan(teatroIndex);
  
  // AGent-Creator puede cargarse en cualquier orden (dep opcional)
});
```

---

## 6. Veredicto Final

### Resumen de Auditoría

| Categoría | Estado |
|-----------|--------|
| Coherencia con ARCHIVO/marco/ | ✅ Cumple (con mitigaciones) |
| Coherencia con instructions/ | ✅ Cumple |
| Coherencia interna (Rondas 7-9) | ✅ Sin contradicciones |
| Incoherencias con proyecto | ⚠️ 3 menores/medias (todas mitigables) |
| Indicadores de fracaso | ✅ Definidos |
| Defensas anticaptura | ⚠️ 2 faltantes (ChatParticipant, TreeView) |

### Resultado

# ✅ APROBADO CON OBSERVACIONES

**Observaciones obligatorias antes de implementar**:

1. **Añadir validación de SystemPrompt** en ChatParticipantFactory (defensa anticaptura)
2. **Añadir verificación de recursos** en TreeDataProvider
3. **Renumerar épicas** para Sprint 2 (SCRIPT-2.0.0 a 2.6.0)
4. **Añadir test de orden topológico** para dependencias

**Observaciones recomendadas**:

1. Establecer límite de plugins oficiales (7 core + comunidad)
2. Documentar deprecación de plugins inactivos
3. Considerar auditoría de seguridad para plugins de terceros (futuro)

---

## 7. Checklist de Implementación

Antes de comenzar Sprint 2, verificar:

- [ ] Épicas renumeradas en BACKLOG-SCRIPTORIUM.md
- [ ] Test de orden topológico añadido a suite
- [ ] Validación de SystemPrompt implementada
- [ ] Verificación de recursos en TreeView implementada
- [ ] Manifest de "Casa Arrakis" creado
- [ ] registry.json schema documentado

---

## 8. Próximos Pasos

1. **Integrar observaciones** en épica SCRIPT-2.0.0 (Infraestructura)
2. **Actualizar BACKLOG-SCRIPTORIUM.md** con épicas renumeradas
3. **Commit** de las 4 rondas de plugins (07-10)
4. **Comenzar Sprint 2** con infraestructura base

---

**Ronda 10 completada** — Ciclo de plugins finalizado. Listo para commit.

---

## Anexo: Resumen Ejecutivo para Commit

```
feat(script/plugins): análisis de integración de 7 plugins en extensión

Rondas de discusión (07-10):
- @ox: Matriz Plugin × Capacidad, 8 épicas propuestas
- @aleph: API de registro dinámico, systemPrompts
- @periodico: Análisis 5W + 4 Banderas
- @revisor: Auditoría doctrinal, APROBADO CON OBSERVACIONES

Épicas propuestas:
- SCRIPT-2.16.0: Plugin Infrastructure (21 pts)
- SCRIPT-2.8.0: ARG-BOARD Migration
- SCRIPT-2.10.0 a 2.15.0: UI por plugin

Observaciones obligatorias:
- Añadir validación de SystemPrompt
- Añadir verificación de recursos en TreeView
- Renumerar épicas para Sprint 2

refs #SCRIPT-1.5.0
```
