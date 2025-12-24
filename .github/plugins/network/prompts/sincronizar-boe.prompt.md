---
mode: agent
description: "Sincronización bidireccional de BOEs con la red Oasis."
tools: ['read', 'edit', 'execute']
---

# Sincronizar BOE bidireccional

## Contexto

El usuario quiere ejecutar una sincronización completa: publicar sus cambios locales y recibir cambios de otros Scriptoriums.

## Flujo de sincronización

```
┌─────────────────────────────────────────┐
│         SINCRONIZACIÓN BOE              │
├─────────────────────────────────────────┤
│                                         │
│   BOE Local                Oasis Feed   │
│      │                         │        │
│      ├──── PUBLICAR ──────────▶│        │
│      │     (entradas nuevas)   │        │
│      │                         │        │
│      │◀────── RECIBIR ─────────┤        │
│      │     (entradas remotas)  │        │
│      │                         │        │
│      ▼                         ▼        │
│   BOE Sincronizado                      │
│                                         │
└─────────────────────────────────────────┘
```

## Pasos

### 1. Verificar conexión

```bash
curl -s http://localhost:3000/api/status
```

### 2. Publicar entradas locales

Ejecutar lógica de `publicar-boe.prompt.md`:
- Leer BOE local
- Serializar entradas no publicadas
- Publicar al feed

### 3. Recibir entradas remotas

Ejecutar lógica de `recibir-boe.prompt.md`:
- Leer feed de Oasis
- Filtrar por obra_id
- Fusionar con BOE local

### 4. Ordenar BOE final

```
Todas las entradas ordenadas por:
  1. timestamp (ascendente)
  2. hash (en caso de empate)
```

### 5. Detectar conflictos

Un conflicto ocurre cuando:
- Dos entradas modifican el mismo campo en el mismo segundo
- Acciones incompatibles (ej: dos actores en la misma posición)

Para conflictos detectados:
1. Registrar en `sync-state.json`
2. Notificar al usuario
3. No bloquear el resto del sync

### 6. Actualizar sync-state completo

```json
{
  "ultima_sincronizacion": "2025-12-24T12:00:00Z",
  "entradas_publicadas": [...],
  "entradas_recibidas": [...],
  "conflictos_pendientes": [...],
  "peers_conocidos": [...],
  "estadisticas": {
    "publicadas_total": 42,
    "recibidas_total": 37,
    "sincronizaciones": 15
  }
}
```

### 7. Guardar BOE sincronizado

Escribir BOE final en:
- `ARCHIVO/PLUGINS/ARG_BOARD/BOE/{obra_id}/boe-sync.json`

## Salida esperada

```
✅ Sincronización completa
   ────────────────────────
   📤 Publicadas: {N} entradas
   📥 Recibidas:  {M} entradas
   📋 BOE total:  {T} entradas
   ⚠️  Conflictos: {C} (ver log)
   
   Último sync: {timestamp}
   Peers activos: {lista}
```

## Modo automático

Para sync periódico, el usuario puede configurar:

```json
{
  "sync_automatico": true,
  "intervalo_minutos": 5
}
```

## Errores posibles

| Error | Acción |
|-------|--------|
| "Oasis no disponible" | Reintentar en 30s |
| "Conflicto no resuelto" | Registrar y continuar |
| "BOE corrupto" | Restaurar desde backup |
