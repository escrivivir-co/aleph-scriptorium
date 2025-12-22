---
mode: 'agent'
description: 'Extrae el patrón de URL de un foro'
---

# Parsear Patrón de URL de Foro

Analiza una URL de muestra y extrae el patrón para navegación.

## Entrada

- **url**: URL completa de una página del hilo

## Patrones Soportados

### 1. Foro / vBulletin

```
URL: https://Foro.com/foro/showthread.php?t=8941392&page=1

Patrón:
{
  "type": "vbulletin",
  "base": "https://Foro.com/foro/showthread.php",
  "thread_param": "t",
  "thread_id": "8941392",
  "page_param": "page",
  "page_start": 1
}

Generación: {base}?{thread_param}={thread_id}&{page_param}={n}
```

### 2. phpBB

```
URL: https://ejemplo.com/viewtopic.php?t=12345&start=20

Patrón:
{
  "type": "phpbb",
  "base": "https://ejemplo.com/viewtopic.php",
  "thread_param": "t",
  "thread_id": "12345",
  "page_param": "start",
  "page_start": 0,
  "posts_per_page": 20
}

Generación: {base}?{thread_param}={thread_id}&{page_param}={(n-1)*posts_per_page}
```

### 3. Discourse

```
URL: https://foro.ejemplo.com/t/titulo-del-tema/12345/2

Patrón:
{
  "type": "discourse",
  "base": "https://foro.ejemplo.com/t",
  "slug": "titulo-del-tema",
  "thread_id": "12345",
  "page_start": 1
}

Generación: {base}/{slug}/{thread_id}/{n}
```

### 4. SMF (Simple Machines Forum)

```
URL: https://ejemplo.com/index.php?topic=12345.20

Patrón:
{
  "type": "smf",
  "base": "https://ejemplo.com/index.php",
  "topic_prefix": "topic",
  "thread_id": "12345",
  "posts_per_page": 20
}

Generación: {base}?{topic_prefix}={thread_id}.{(n-1)*posts_per_page}
```

## Proceso de Detección

```javascript
function detectPattern(url) {
  const parsed = new URL(url);
  
  // vBulletin / Foro
  if (parsed.pathname.includes('showthread.php')) {
    return {
      type: 'vbulletin',
      base: `${parsed.origin}${parsed.pathname}`,
      thread_param: 't',
      thread_id: parsed.searchParams.get('t'),
      page_param: 'page',
      page_start: 1
    };
  }
  
  // phpBB
  if (parsed.pathname.includes('viewtopic.php')) {
    return {
      type: 'phpbb',
      base: `${parsed.origin}${parsed.pathname}`,
      thread_param: 't',
      thread_id: parsed.searchParams.get('t'),
      page_param: 'start',
      page_start: 0,
      posts_per_page: 20
    };
  }
  
  // Discourse
  if (parsed.pathname.match(/\/t\/[^/]+\/\d+/)) {
    const parts = parsed.pathname.split('/');
    return {
      type: 'discourse',
      base: `${parsed.origin}/t`,
      slug: parts[2],
      thread_id: parts[3],
      page_start: 1
    };
  }
  
  // SMF
  if (parsed.searchParams.has('topic')) {
    const topic = parsed.searchParams.get('topic');
    const [id, offset] = topic.split('.');
    return {
      type: 'smf',
      base: `${parsed.origin}${parsed.pathname}`,
      thread_id: id,
      posts_per_page: 20
    };
  }
  
  throw new Error('Patrón no reconocido');
}
```

## Función de Generación de URL

```javascript
function generateUrl(pattern, pageNumber) {
  switch (pattern.type) {
    case 'vbulletin':
      return `${pattern.base}?${pattern.thread_param}=${pattern.thread_id}&${pattern.page_param}=${pageNumber}`;
    
    case 'phpbb':
      const offset = (pageNumber - 1) * pattern.posts_per_page;
      return `${pattern.base}?${pattern.thread_param}=${pattern.thread_id}&${pattern.page_param}=${offset}`;
    
    case 'discourse':
      return `${pattern.base}/${pattern.slug}/${pattern.thread_id}/${pageNumber}`;
    
    case 'smf':
      const smfOffset = (pageNumber - 1) * pattern.posts_per_page;
      return `${pattern.base}?topic=${pattern.thread_id}.${smfOffset}`;
  }
}
```

## Salida

```
✅ Patrón detectado

Tipo: {type}
Base: {base}
Thread ID: {thread_id}
Parámetro página: {page_param}

URLs de ejemplo:
- Página 1: {url_1}
- Página 2: {url_2}
- Página 3: {url_3}
```

## Errores

| Error | Causa | Solución |
|-------|-------|----------|
| "Patrón no reconocido" | Foro no soportado | Añadir nuevo patrón o usar modo manual |
| "Falta thread ID" | URL incompleta | Proporcionar URL con todos los parámetros |
| "URL inválida" | Formato incorrecto | Verificar URL completa con protocolo |
