---
mode: 'agent'
description: 'Instala un plugin externo en Scriptorium'
---

# Instalar Plugin

Instala un plugin desde una ubicación externa en el sistema de plugins de Scriptorium.

## Entrada Requerida

- **Ruta del plugin**: Ubicación del directorio con el plugin a instalar

## Proceso

### 1. Localizar y Validar Manifest

```
Lee el archivo manifest.md en la raíz del plugin.
Extrae el frontmatter YAML con los metadatos.
```

### 2. Verificar Requisitos

Comprobar:
- [ ] `scriptorium_version` compatible con 0.0.1+
- [ ] `id` no existe en registry.json
- [ ] Todas las `dependencies` están instaladas

### 3. Copiar Estructura

Crear directorio `.github/plugins/{id}/` y copiar:
- manifest.md
- agents/
- prompts/
- instructions/
- docs/
- data/
- Cualquier otra carpeta definida

### 4. Actualizar Registry

Añadir entrada en `.github/plugins/registry.json`:

```json
{
  "{id}": {
    "name": "{name}",
    "version": "{version}",
    "installed_at": "{timestamp}",
    "enabled": true,
    "agents_count": N,
    "prompts_count": M
  }
}
```

### 5. Integrar Handoffs

Si el manifest define `handoffs`, añadirlos a `aleph.agent.md`:

```yaml
- label: "[{ID}] {label original}"
  agent: {AgentName}
  prompt: "{prompt}"
  send: false
```

### 6. Actualizar Índice

Añadir referencia en `copilot-instructions.md` sección Plugins.

### 7. Generar Commit

```
feat(script/plugins): instalar plugin "{name}" v{version}

{description}

Incluye:
- {agents_count} agentes
- {prompts_count} prompts
- Documentación en docs/

refs #SCRIPT-0.1.0-Txx
```

## Salida

- Confirmación de instalación exitosa
- Resumen de recursos instalados
- Commit message propuesto

## Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "Manifest no encontrado" | Falta manifest.md | Crear archivo con estructura válida |
| "ID duplicado" | Plugin ya instalado | Desinstalar primero o usar otro ID |
| "Versión incompatible" | scriptorium_version no cumple | Actualizar constraint en manifest |

