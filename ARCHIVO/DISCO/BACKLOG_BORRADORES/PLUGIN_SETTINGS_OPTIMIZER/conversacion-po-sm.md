# Planificación: Conversación PO-SM — Optimización Settings de Plugins

> **Fecha**: 2025-12-24  
> **Participantes**: Product Owner (PO), Scrum Master (SM)  
> **Contexto**: Los plugins actualmente se instalan y activan automáticamente en `.vscode/settings.json`, lo que puede sobrecargar el sistema cuando hay muchos plugins.

---

## Apertura

**SM**: Actualmente tenemos 18 plugins instalados en el registry. El protocolo vigente (`as_plugin-install.prompt.md`) añade automáticamente cada plugin a `chat.promptFilesLocations` y `chat.instructionsFilesLocations` con valor `true`. Esto significa que todos los prompts e instructions están **siempre activos**.

El problema detectado:
- **Sobrecarga cognitiva**: Al escribir `/` en el chat, aparecen 49+ prompts
- **Latencia**: Copilot indexa más carpetas de las necesarias
- **Confusión**: Usuarios no saben qué plugins están usando

**PO**: Entiendo. ¿Cuántos plugins tiene un usuario típico activos de verdad?

**SM**: En la práctica, un usuario usa 2-4 plugins por sesión. Pero los 18 están siempre escaneando.

---

## Definición del Problema

**PO**: Quiero que los plugins se instalen pero que **por defecto estén desactivados** en los settings de VS Code. Así el usuario elige cuáles necesita.

**SM**: Técnicamente es sencillo. En el paso 5 del `as_plugin-install.prompt.md`, en lugar de:

```json
{
  "chat.promptFilesLocations": {
    ".github/plugins/{id}/prompts": true
  }
}
```

Pondríamos:

```json
{
  "chat.promptFilesLocations": {
    ".github/plugins/{id}/prompts": false
  }
}
```

**PO**: Perfecto. Pero esto genera un problema de UX: el usuario instala un plugin, no le aparecen los prompts, y piensa que está roto.

**SM**: Exacto. Necesitamos:
1. **FAQ en el agente**: Respuesta tipo "¿No te aparecen los prompts? Es que el plugin está desactivado."
2. **Handoff de activación**: Un comando para activar/desactivar plugins en settings.
3. **Sistema de avisos**: Cuando hay demasiados plugins activos, avisar.

---

## Análisis de Solución

**PO**: Me gusta. Pero, ¿qué es "demasiados"?

**SM**: Propongo umbrales basados en experiencia de usuario:

| Plugins Activos | Estado | Acción |
|-----------------|--------|--------|
| 0-3 | 🟢 Óptimo | Sin aviso |
| 4-6 | 🟡 Aceptable | Info suave |
| 7-10 | 🟠 Cargado | Warning |
| 11+ | 🔴 Sobrecargado | Recomendación fuerte |

**PO**: ¿Y cómo detectamos cuántos hay activos?

**SM**: Parseando `.vscode/settings.json`:

```javascript
const activePlugins = Object.entries(settings["chat.promptFilesLocations"])
  .filter(([path, enabled]) => path.includes(".github/plugins") && enabled)
  .length;
```

**PO**: ¿Y dónde mostramos el aviso?

**SM**: Tres opciones:
1. **Al instalar un plugin nuevo**: "Ya tienes N plugins activos..."
2. **Al activar un plugin**: "Ahora tienes N plugins activos..."
3. **Con un comando de diagnóstico**: `@pluginmanager status`

---

## Diseño del FAQ

**PO**: Detállame el FAQ.

**SM**: Propongo una sección en `plugin-manager.agent.md`:

```markdown
## FAQ de Resolución de Problemas

### "No me aparecen los prompts del plugin X"

**Causa**: El plugin está instalado pero desactivado en settings.

**Diagnóstico**:
1. Verificar `.vscode/settings.json`
2. Buscar `".github/plugins/{id}/prompts": false`

**Solución**:
```
@pluginmanager activar {id}
```

Esto cambiará el valor a `true` en settings.json.

### "El chat está muy lento"

**Causa**: Demasiados plugins activos.

**Diagnóstico**:
```
@pluginmanager status
```

**Solución**:
```
@pluginmanager desactivar {id}
```
Desactiva plugins que no uses en esta sesión.
```

**PO**: Me convence. ¿Y el sistema de avisos?

---

## Sistema de Avisos

**SM**: Propongo tres niveles de mensaje:

### Nivel 1: Info (4-6 plugins)
```
ℹ️ Tienes {N} plugins activos. El sistema funciona bien, 
pero considera desactivar los que no uses para mejor rendimiento.
```

### Nivel 2: Warning (7-10 plugins)
```
⚠️ Tienes {N} plugins activos. Esto puede afectar la velocidad 
del autocompletado. Usa `@pluginmanager status` para revisar.
```

### Nivel 3: Alerta (11+ plugins)
```
🔴 Tienes {N} plugins activos. Recomendamos desactivar al menos 
{N-5} para experiencia óptima. Plugins menos usados: {lista}
```

**PO**: ¿Cómo sabemos cuáles son "menos usados"?

**SM**: Para el MVP, simplemente ordenamos por fecha de última modificación del plugin. En el futuro podríamos añadir tracking de uso real, pero eso sería otra épica.

**PO**: Acepto. MVP primero.

---

## Impacto en Archivos

**SM**: Los archivos afectados serían:

| Archivo | Cambio |
|---------|--------|
| `.github/prompts/as_plugin-install.prompt.md` | Paso 5: valor `false` por defecto |
| `.github/agents/plugin-manager.agent.md` | Nuevos handoffs + FAQ + avisos |
| `.github/PLUGINS.md` | Documentar nuevo comportamiento |
| `.vscode/settings.json` | Estructura de ejemplo actualizada |

**PO**: ¿Y los plugins ya instalados?

**SM**: Propongo una **migración opcional**: un prompt `migrar-settings.prompt.md` que:
1. Lee settings actuales
2. Cambia todos los `true` a `false` excepto los que el usuario elija
3. Genera el nuevo settings.json

**PO**: Pero eso rompe instalaciones existentes...

**SM**: Por eso es **opcional**. Los existentes siguen funcionando. Solo aplica para nuevas instalaciones o migraciones explícitas.

---

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Usuarios no entienden por qué no ven prompts | Alta | Medio | FAQ prominente + mensaje post-instalación |
| Settings.json corrupto | Baja | Alto | Validación JSON antes de escribir |
| Plugins críticos desactivados | Media | Medio | Lista de plugins "core" siempre activos |

**PO**: ¿Cuáles serían plugins "core"?

**SM**: Propongo que ninguno sea obligatorio. Pero podemos añadir un campo `core: true` en el manifest para plugins esenciales que se activan por defecto.

---

## Métricas de Éxito

| Métrica | Target | Método |
|---------|--------|--------|
| Prompts visibles por defecto | ≤20 (core) | Auditoría de settings |
| Tiempo de respuesta Chat | ≤500ms | Medición subjetiva |
| Tickets "no me aparecen prompts" | →0 | FAQ efectivo |
| Usuarios con >10 plugins activos | ≤10% | Diagnóstico periódico |

---

## Cierre

**SM**: Resumen de la épica:

1. **Cambio de default**: Plugins instalados → desactivados en settings
2. **FAQ en plugin-manager**: Guía de troubleshooting
3. **Sistema de activación/desactivación**: Comandos dedicados
4. **Sistema de avisos**: Umbrales de plugins activos
5. **Migración opcional**: Para instalaciones existentes

**Effort estimado**: 13-21 puntos (épica mediana)

**PO**: Aprobado. Genera el backlog borrador.

**SM**: Procedo a crear `01_backlog-borrador.md` con las stories desglosadas.

---

## Decisiones Tomadas

| Decisión | Rationale |
|----------|-----------|
| Default `false` en settings | Optimizar rendimiento por defecto |
| Umbrales 3/6/10 | Balance entre usabilidad y rendimiento |
| Migración opcional | No romper instalaciones existentes |
| No tracking de uso (MVP) | Complejidad innecesaria para v1 |
| Campo `core` opcional | Flexibilidad para plugins esenciales |

---

## Siguiente Paso

- [x] Conversación PO-SM completada
- [ ] Generar backlog borrador (01_backlog-borrador.md)
- [ ] Revisión y aprobación
- [ ] Publicar en BACKLOG-SCRIPTORIUM.md
