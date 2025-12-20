# ARCHIVO/PLUGINS — Datos de Runtime de Plugins

> **Propósito**: Almacenar datos generados durante la ejecución de plugins  
> **Convención**: Cada plugin tiene su carpeta en `SCREAMING_SNAKE_CASE`

---

## Separación Código / Datos

El sistema de plugins de Scriptorium separa **código** de **datos**:

| Tipo | Ubicación | Naturaleza |
|------|-----------|------------|
| **Código** | `.github/plugins/{plugin-id}/` | Inmutable tras instalación |
| **Datos** | `ARCHIVO/PLUGINS/{PLUGIN_ID}/` | Mutable durante ejecución |

### Razones

1. **Backup selectivo**: Los datos cambian frecuentemente, el código no
2. **Versionado diferenciado**: El código se versiona con el plugin, los datos con el proyecto
3. **Limpieza**: Desinstalar un plugin no borra automáticamente sus datos históricos
4. **Coherencia**: Los datos viven en ARCHIVO/, junto al resto del contenido del proyecto

---

## Plugins Instalados

| Plugin | Carpeta de Datos | Estado |
|--------|------------------|--------|
| **ARG Board** | `ARG_BOARD/` | ✅ Activo |

---

## Estructura Típica por Plugin

```
{PLUGIN_ID}/
├── .arrakis/              # Estado del teatro (si ARG)
│   ├── theater_state.json
│   ├── obras.json
│   ├── actores.json
│   ├── monomitos.json
│   ├── tickets.json
│   └── README.md
├── BOE/                   # Boletín Oficial (si ARG)
│   └── boe-YYYY-MM-DD.json
└── ...                    # Otros datos específicos del plugin
```

---

## Convención de Nombres

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Carpeta de plugin | SCREAMING_SNAKE_CASE | `ARG_BOARD/` |
| Archivos JSON | kebab-case | `theater_state.json` |
| Boletines | `boe-YYYY-MM-DD.json` | `boe-2025-12-20.json` |

---

## Referencias

- **Protocolo de Plugins**: [.github/PLUGINS.md](../../.github/PLUGINS.md)
- **Registry**: [.github/plugins/registry.json](../../.github/plugins/registry.json)
- **Plugin Manager**: [.github/agents/plugin-manager.agent.md](../../.github/agents/plugin-manager.agent.md)
