# TASK-06 — Stack Verdaccio público

> **Estado:** libre  
> **Agente recomendado:** `verdaccio-keeper`  
> **Dependencias:** VPS-01, VPS-03  
> **Entrega esperada:** Verdaccio público para paquetes `@alephscript/*`

## Lee primero

1. `MCPGallery/mcp-core-sdk/package.json`
2. `MCPGallery/**/package.json` relevantes
3. `WiringEditor/packages/**/package.json`
4. `sala/dossiers/scriptorium-vps/RESPUESTAS.md`

## Objetivo

Levantar un registry npm público para que los Dockerfiles del VPS puedan instalar paquetes internos del ecosistema MCPGallery/WiringEditor sin depender de empaquetados locales ad hoc.

## Cambios requeridos

- Crear stack `verdaccio` en `ScriptoriumVps/PATTERN-DOCKER/verdaccio/`.
- Configurar host público `npm.scriptorium.escrivivir.co`.
- Configurar auth `htpasswd` y tokens npm para CI.
- Usar scope `@alephscript/*`.
- Configurar proxy upstream a `https://registry.npmjs.org`.
- Persistir storage en `/srv/scriptorium/verdaccio/storage`.
- Crear `.npmrc.example`.
- Preparar pipeline de publicación desde MCPGallery/WiringEditor.

## Informe operativo

### Scope confirmado

El scope es el mismo de `mcp-core-sdk`:

```json
{
  "name": "@alephscript/mcp-core-sdk"
}
```

Por tanto, los paquetes internos deben publicar/instalar desde:

```text
@alephscript:registry=https://npm.scriptorium.escrivivir.co
```

### Paquetes lote inicial

- `@alephscript/mcp-core-sdk`
- `@alephscript/mcp-mesh-sdk`
- `@alephscript/mcp-channels-sdk` si aplica como paquete separado
- Paquetes Node-RED del monorepo WiringEditor según manifiesto, sin tratar `escribiente` como excepción

## Salida mínima esperada

1. Candidato `config.yaml`, compose y `.npmrc.example`.
2. `ENTREGA_VPS-06.md` con:
   - Config auth.
   - Lista inicial de paquetes.
   - Smoke test publish/install.

## Criterio de aceptación

- `npm.scriptorium.escrivivir.co` responde con Verdaccio.
- Auth requerida para publish.
- `npm install @alephscript/mcp-core-sdk --registry ...` funciona tras publicación.
- El storage persiste en `/srv/scriptorium/verdaccio/storage`.
