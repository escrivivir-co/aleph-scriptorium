---
name: Estudiar caso de uso
description: Modo Asistente - Analizar requisitos de comunicación y proponer estructura de ontología
applyTo: "ARCHIVO/PLUGINS/TYPED_PROMPTING/**/*"
---

# Prompt: Estudiar Caso de Uso

> **Plugin**: TypedPrompting  
> **Modo**: Asistente  
> **Agente**: @typedprompting

## Invocación

```
@typedprompting Estudiar caso de uso

Descripción:
{Descripción del caso de uso en lenguaje natural}

Contexto:
- Dominio: {ARG / Scriptorium / Fundación / Otro}
- Actores: {lista de actores involucrados}
- Frecuencia: {alta / media / baja}
```

---

## Flujo de Análisis

### 1. Identificar Entidades

Extraer las entidades principales del caso de uso:

```
Ejemplo: "Validar consultas de usuarios a un agente de soporte"

Entidades detectadas:
- Usuario (quien consulta)
- Consulta (el mensaje)
- Agente (quien responde)
- Respuesta (el mensaje de vuelta)
```

### 2. Definir Atributos

Para cada entidad, identificar atributos relevantes:

```typescript
interface Usuario {
  id: string;
  nombre?: string;
  rol?: 'visitante' | 'registrado' | 'admin';
}

interface Consulta {
  pregunta: string;           // Requerido
  contexto?: string;          // Opcional
  urgencia: 'baja' | 'media' | 'alta';
  timestamp: string;          // ISO 8601
}
```

### 3. Definir Relaciones

Cómo se relacionan las entidades:

```
Usuario ──creates──▶ Consulta
Consulta ──sent_to──▶ Agente
Agente ──produces──▶ Respuesta
Respuesta ──sent_to──▶ Usuario
```

### 4. Proponer Estructura

Generar interface TypeScript consolidada:

```typescript
// Mensaje de entrada (Usuario → Agente)
interface ConsultaUsuario {
  usuario: {
    id: string;
    rol?: 'visitante' | 'registrado';
  };
  consulta: {
    pregunta: string;
    contexto?: string;
    urgencia: 'baja' | 'media' | 'alta';
  };
  metadata: {
    timestamp: string;
    canal: 'chat' | 'email' | 'api';
  };
}

// Mensaje de salida (Agente → Usuario)
interface RespuestaAgente {
  respuesta: {
    contenido: string;
    confianza: number;  // 0-1
    fuentes?: string[];
  };
  estado: 'resuelto' | 'escalado' | 'pendiente';
  metadata: {
    timestamp: string;
    agente_id: string;
  };
}
```

---

## Output Esperado

### Reporte de Análisis

```markdown
## Análisis de Caso de Uso

### Descripción
{Resumen del caso de uso}

### Entidades Identificadas

| Entidad | Tipo | Atributos |
|---------|------|-----------|
| ... | ... | ... |

### Relaciones

{Diagrama de relaciones}

### Schemas Propuestos

#### Schema de Entrada
```typescript
{código TypeScript}
```

#### Schema de Salida
```typescript
{código TypeScript}
```

### Recomendaciones

- {Recomendación 1}
- {Recomendación 2}

### Próximos Pasos

1. ¿Aprobar schemas propuestos?
2. ¿Modificar atributos?
3. ¿Buscar schemas similares en biblioteca?
```

---

## Opciones de Continuación

| Opción | Comando |
|--------|---------|
| Aprobar y guardar | `@typedprompting Crear schema desde propuesta` |
| Modificar | `@typedprompting Modificar: {cambios}` |
| Buscar similares | `@typedprompting Sugerir ontología para {dominio}` |
| Descartar | `@typedprompting Cancelar análisis` |
