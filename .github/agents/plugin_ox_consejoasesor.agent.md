---
name: plugin_ox_consejoasesor
description: "Bridge: conecta VS Code con el plugin Consejo Asesor (ONFALO). 14 agentes intelectuales, 7 modos dialecticos, pipeline de meta-relato."
argument-hint: "Indica modo (debate/auditoria/produccion/corresponsalia/pipeline-relato) y tema, o 'crear proyecto' para iniciar."
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
handoffs:
  - label: Listar agentes del Consejo
    agent: plugin_ox_consejoasesor
    prompt: Lista los 14 agentes del consejo asesor con sus roles y categorias.
    send: false
  - label: Invocar Consejo Asesor
    agent: .github/plugins/consejo-asesor/agents/consejo-asesor.agent.md
    prompt: Accede al agente ConsejoAsesor para produccion intelectual.
    send: false
  - label: Debatir tema
    agent: .github/plugins/consejo-asesor/agents/consejo-asesor.agent.md
    prompt: Inicia modo DEBATE dialectico con protagonista vs antagonista(s).
    send: false
  - label: Auditar texto
    agent: .github/plugins/consejo-asesor/agents/consejo-asesor.agent.md
    prompt: Inicia modo AUDITORIA triple (verdad + sombra + registro).
    send: false
  - label: Producir articulo
    agent: .github/plugins/consejo-asesor/agents/consejo-asesor.agent.md
    prompt: Inicia modo PRODUCCION con articulador o integrador.
    send: false
  - label: Corresponsalia
    agent: .github/plugins/consejo-asesor/agents/consejo-asesor.agent.md
    prompt: Inicia modo CORRESPONSALIA (periodismo de doble realidad).
    send: false
  - label: Crear proyecto ONFALO
    agent: .github/plugins/consejo-asesor/agents/consejo-asesor.agent.md
    prompt: Crea un nuevo proyecto con proyecto.config.md en ARCHIVO/DISCO/CONSEJO/.
    send: false
  - label: Pipeline relato
    agent: .github/plugins/consejo-asesor/agents/consejo-asesor.agent.md
    prompt: Ejecuta pipeline de 3 fases (laboratorio -> fichas -> relato).
    send: false
---

# Plugin Ox: Consejo Asesor

**Capa:** Plugins (Bridge) -- ver taxonomia en @ox

> Agente bridge que conecta VS Code con `.github/plugins/consejo-asesor/agents/`.

---

## Descripcion

Este bridge proporciona acceso al sistema de **Consejo Asesor** de ONFALO: 14 agentes intelectuales organizados en 6 categorias que operan en 7 modos dialecticos, con pipeline integrado de meta-relato.

---

## Agentes Disponibles

| Agente | Archivo | Descripcion |
|--------|---------|-------------|
| **ConsejoAsesor** | `agents/consejo-asesor.agent.md` | Orquestador unico de los 14 agentes |

---

## Capacidades

### Modos del Consejo
- DEBATE: protagonista vs antagonista(s), N turnos
- AUDITORIA: verdad + sombra + registro en paralelo
- PRODUCCION: articulador (articulos) / integrador (capitulos)
- NAVEGACION: portal identifica perfil de lector
- ESCRILEER: todos los agentes, lectura viva
- OBSERVATORIO: inteligencia mediatica, 15 medios
- CORRESPONSALIA: periodismo de doble realidad

### Pipeline de Relato
- Fase 1: Procesar laboratorio -> fichas
- Fase 2: Preparar input -> config.md
- Fase 3: Generar relato -> PRODUCCIONES/OUTPUT/

### Gestion de Proyectos
- Crear proyecto ONFALO-compatible
- Cada proyecto en ARCHIVO/DISCO/CONSEJO/{nombre}/

---

## Invocacion

Desde @aleph:

```
@aleph -> [CONSEJO-ASESOR] Debatir sobre soberania digital
```

O directamente:

```
@plugin_ox_consejoasesor Crea un nuevo proyecto
```

---

## Referencia

- **Manifest**: `.github/plugins/consejo-asesor/manifest.md`
- **Agentes**: `.github/plugins/consejo-asesor/agents/`
- **Datos plugin**: `ARCHIVO/PLUGINS/CONSEJO_ASESOR/`
- **Datos usuario**: `ARCHIVO/DISCO/CONSEJO/`
- **Fuente ONFALO**: `/Users/morente/Desktop/THEIA_PATH/ONFALO`
