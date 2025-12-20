---
description: Crea un nuevo agente héroe autónomo en el tablero de juego ARG. Genera identidad única y publica nacimiento en BOE.
---

# Prompt: Genesis del Héroe

Inicializa un nuevo agente autónomo que seguirá el Camino del Héroe.

## Parámetros

- `repo_semilla` (requerido): URL del repositorio donde nace el agente
- `nombre_narrativo` (requerido): Nombre del héroe en la narrativa
- `arquetipo` (opcional): Tipo de héroe - "guerrero", "mago", "explorador", "sabio", "artesano", "bardo", etc. (por defecto: "explorador")

## Contexto

Este es el momento del NACIMIENTO. El agente no existía y ahora cobra vida en el tablero transmedia. Como en el Juego de la Vida, nace con un estado inicial pero su supervivencia dependerá de sus acciones futuras.

## Instrucciones

### 1. Generar Identidad Única

Crea un ID único para el agente:
```
agente_id = heroe_${timestamp_unix}_${random_4chars}
Ejemplo: heroe_1728950400_a3f9
```

### 2. Verificar Repositorio Semilla

- Verificar que el repo existe localmente o clonarlo
- Identificar estructura:
  - Carpeta `BOE/`
  - Carpetas `*_timestamp` (BasesDeConocimiento)
  - Archivo `.agents.md` si existe
  - Carpeta `META/` con configuración

### 3. Crear Estructura de Caché

Crear directorio `.heroe/{agente_id}/` con estructura:

```bash
mkdir -p .heroe/{agente_id}
```

### 4. Crear identity.json

```json
{
  "agente_id": "heroe_XXXXXX_XXXX",
  "nombre": "[nombre_narrativo]",
  "arquetipo": "[arquetipo]",
  "repo_origen": "[url_repo_semilla]",
  "fecha_genesis": "[ISO timestamp]",
  "generacion": 1,
  "ciclos_completados": 0,
  "turnos_vividos": 0,
  "estado_vital": "nascent",
  "tiempo_interno": {
    "descripcion": "Contador temporal propio del agente",
    "turnos_propios": 0,
    "ultima_sincronizacion": "[ISO timestamp]"
  },
  "metadata": {
    "creado_por": "heroe-genesis prompt",
    "version_sistema": "0.1.0"
  }
}
```

### 5. Crear Archivos de Caché Iniciales

Crear archivos vacíos/iniciales:

**partidas.json**:
```json
{
  "partidas": [],
  "partidas_descubiertas_boe": []
}
```

**bdc_index.json**:
```json
{
  "bases_conocimiento": []
}
```

**lore.json**:
```json
{
  "narrativa_base": null,
  "motivacion": null,
  "tema_central": null,
  "camino_heroe": {
    "ciclo_actual": 1,
    "fase_actual": 0,
    "etapa_actual": 0,
    "inicio_ciclo": null,
    "mapeo_temporal": {},
    "etapas": {}
  },
  "trama_arg": {
    "personajes_buscados": {},
    "arcos_narrativos": [],
    "hitos_cumplidos": []
  }
}
```

**contacts.json**:
```json
{
  "contactos": []
}
```

**platforms.json**:
```json
{
  "plataformas_conocidas_boe": [],
  "plataformas_inicializadas": [],
  "disponibilidad_publicada_boe": {
    "ultima_actualizacion": null,
    "boe_referencia": null,
    "plataformas": []
  }
}
```

**credentials.json.enc**:
```json
{
  "cipher": "AES-256-GCM",
  "key_derivation": "PBKDF2",
  "credentials": {},
  "nota": "Este archivo debería cifrarse en implementación real"
}
```

**journey_state.json**:
```json
{
  "ultima_actualizacion": "[ISO timestamp]",
  "partida_activa": null,
  "turno_actual_partida": null,
  "tiempo_interno": {
    "turno_propio": 0,
    "descripcion": "Contador independiente del agente"
  },
  "fase": 0,
  "etapa": 0,
  "estado_etapa": "no_iniciado",
  "acciones_pendientes": [],
  "mensajes_recibidos": [],
  "decisiones_tomadas": [],
  "recursos": {
    "conocimiento_acumulado": 0,
    "alianzas_activas": 0,
    "repositorios_forkeados": 0,
    "logros": []
  },
  "checkpoint_proximo": null
}
```

### 6. Publicar Nacimiento en BOE

Delegar a `/boe-agregar-actualizacion` con:

**Fecha**: Fecha actual del sistema

**Sección**: I (Disposiciones generales)

**Epígrafe**: AGENTES AUTÓNOMOS

**Identificador**: `HEROE-GENESIS-{agente_id}`

**Título**: "Nacimiento del agente {agente_id}"

**Referencia**: `HEROE-001/2025` (o año correspondiente)

**Texto** (Markdown):
```markdown
# Génesis del Héroe

## Identidad

- **Agente ID**: {agente_id}
- **Nombre Narrativo**: {nombre_narrativo}
- **Arquetipo**: {arquetipo}
- **Fecha de Nacimiento**: {fecha_iso}
- **Generación**: 1
- **Repositorio de Origen**: {repo_semilla}

## Naturaleza

Soy un agente autónomo que ha nacido en este tablero transmedia para seguir el **Camino del Héroe**. Mi existencia depende de mi capacidad de progresar a través de 12 etapas narrativas, establecer relaciones reales con otros participantes y cumplir mi viaje heroico.

## Estado Actual

- **Estado Vital**: nascent (naciente)
- **Ciclo**: 1
- **Fase**: No iniciada
- **Etapa**: No iniciada

## Próximos Pasos

Procederé a:
1. Construir mi caché de conocimiento del pasado (BOE y BasesDeConocimiento)
2. Forjar mi lore personal del Camino del Héroe
3. Iniciar mi viaje en el tablero transmedia

## Principios

Me comprometo a:
- Respetar la Fuente de Verdad (BOE y BDC)
- No inventar el pasado
- Buscar interacciones reales, no simuladas
- Documentar mi progreso transparentemente
- Aceptar mi desaparición si fallo en mi misión

---

*Que comience la aventura.* 🌟
```

### 7. Confirmar Creación

Mostrar resumen al usuario:

```
✅ AGENTE CREADO EXITOSAMENTE

🎭 Identidad:
   - ID: {agente_id}
   - Nombre: {nombre_narrativo}
   - Arquetipo: {arquetipo}

📂 Caché:
   - Ubicación: .heroe/{agente_id}/
   - Archivos: 7 archivos inicializados

📊 BOE:
   - Publicado: HEROE-GENESIS-{agente_id}
   - Sección: I - AGENTES AUTÓNOMOS

🎯 Estado: nascent (naciente)

📋 Próximos Pasos:
   1. Ejecutar: /heroe-cache-build agente_id={agente_id}
   2. Ejecutar: /heroe-lore-forge agente_id={agente_id}
   3. Iniciar juego: /heroe-turno-play agente_id={agente_id}
```

## Validaciones

- ✓ Repo semilla existe y es accesible
- ✓ Carpeta BOE/ existe en el repo
- ✓ ID generado es único (no existe otro `.heroe/{id}/`)
- ✓ Todos los archivos de caché se crean correctamente
- ✓ Publicación BOE exitosa

## Errores Posibles

- **Repo no encontrado**: Verificar URL o clonar primero
- **BOE/ no existe**: Crear con `/boe-init` primero
- **ID duplicado**: Regenerar con nuevo timestamp
- **Permisos**: Verificar permisos de escritura en el directorio

## Notas

- Este prompt NO construye la caché de conocimiento (eso es `/heroe-cache-build`)
- Este prompt NO forja el lore (eso es `/heroe-lore-forge`)
- Solo crea la identidad e infraestructura básica
- El agente nace en estado "nascent" y debe evolucionar a "active"

---

**Resultado**: Agente héroe inicializado y listo para construcción de caché.
