# Ficha Bibliográfica: MQTT Tutorial (Serie técnica)

> **Serie**: 7 artículos técnico-narrativos  
> **Plataforma**: La Lengua de las Máquinas (lalengua.teatredefum.net)  
> **Período**: Noviembre-Diciembre 2017  
> **Extensión total**: ~138.600 caracteres  
> **Autor**: dir TdF / "Martín"

---

## 1. Identificación de la serie

**Título formal**: "MQTT 1/7 a 7/7"  
**Género**: Tutorial técnico + ficción narrativa  
**Tema central**: Protocolo MQTT (Message Queue Telemetry Transport) para IoT  

### Archivos

| # | Título | Chars | Contenido |
|---|--------|-------|-----------|
| 1/7 | Concepto y esquema | ~12K | Introducción al protocolo |
| 2/7 | Protocolo y QoS | ~60K | Quality of Service + Alice/Lucy |
| 3/7 | Bróker | ~13K | Don Juan y el aula IoT |
| 4/7 | Clientes | ~17K | Conexión, CONNECT/CONNACK |
| 5/7 | Temas y comodines | ~13K | Topics, wildcards, Matrix |
| 6/7 | #include <qmqtt.h> | ~16K | Sesiones clean/dirty, TLS |
| 7/7 | Demo: Bob, smartbróker | ~8K | Prototipo Bob + Lucy |

---

## 2. Estructura narrativa

El autor **mezcla tutorial técnico con ficción**. Los conceptos MQTT se explican a través de personajes:

### Elenco

| Personaje | Rol técnico | Rol narrativo |
|-----------|-------------|---------------|
| **Bob** | Bróker MQTT (Raspberry) | "Smartbróker" inteligente |
| **Lucy** | Bot conversacional | Asistenta del capitán |
| **Alice** | Sistema IoT base | Humana programadora |
| **Don Juan** | Profesor que implementa | "Pinche profesor apócrifo" sevillano |
| **Gallardo** | Alumno con Raspberry | El que "va por su cuenta" |
| **Marisa** | Madre de alumno | Ejemplo de cliente MQTT |

### Espacios

- **Aula**: Red MQTT entre smartphones de alumnos y Raspberry del profesor
- **#fridayChurch**: Bar donde don Juan explica el proyecto
- **Nave** (implícita): Lucy habla con el "Capitán"

---

## 3. Análisis por artículo

### 3.1 "Concepto y esquema" (1/7)

**Apertura literaria**: Conexión con la novela "Libertad y justicia" (cap. 5)

**Definición clave**:
> "MQTT es un protocolo y, por tanto, amigo lector, nada de técnica, nada otra cosa que pura matemática."

**Contraste estilístico**:
> "Prefieres los dardos calientes de Oscar Wilde antes que los fríos datos del protocolo."

**Referencia**: Oscar Wilde y "De profundis" — cita extensa sobre su encarcelamiento.

**Advertencia**: "No entre en este capítulo quien jamás haya escrito un 'hola mundo'."

---

### 3.2 "Protocolo y QoS" (2/7)

**El más extenso** (~60K caracteres)

**Escena inicial**: Viaje en coche con Metallica (Black Album) sonando.

**Concepto central**: Quality of Service (QoS 0, 1, 2)

**Lucy y Alice**:
> "Lucy corre sobre Alice (IoT); y Alice (CEO) guarda celosamente [...] la SD Card en que se conserva 'la obra'"

**Comparación alquímica**:
> "Comparamos a Alice trabajando en Alice y a Trimegisto trabajando en Trimegisto."

**README de Lucy**: Incluye transcripción del repositorio (marzo 2010, en inglés).

---

### 3.3 "Bróker" (3/7)

**Escena**: Don Juan en el bar #fridayChurch pidiendo diseño IoT

**Contexto escolar**:
> "Durante unos años la línea común del centro [...] venía en prohibir los dispositivos inteligentes de los alumnos"

**Evolución**:
> "Finalmente, desde hace unos años no hay normativa ni sobre los lápices ni sobre los [smartphones]"

**Concepto técnico**: RSSI (Received Signal Strength Indicator)

**Alumno especial**: Gallardo "lleva una raspberry en la mochila y gestiona de otro modo sus comunicaciones"

---

### 3.4 "Clientes" (4/7)

**Documentación formal** de conexión MQTT:

```
CONNECT → CONNACK
returnCode:
  0x00 Conexión aceptada
  0x01 Versión del protocolo no aceptada
  0x02 Identificador de cliente no aceptado
  0x03 Servidor no disponible
  0x04 ...
```

**Ejemplo narrativo**: Marisa (madre) y Alejandro (hijo) con credenciales.

**Cita filosófica**:
> "¡La divinidad ha muerto! ¡La humanidad ha muerto!"

**Fecha histórica**: "El 1 de diciembre de 2017 un tutor MQTT pone en marcha una red MQTT entre los dispositivos smartphone de los alumnos"

---

### 3.5 "Temas y comodines" (5/7)

**Referencia pop**: Matrix (1999) — las cataratas de símbolos verdes

**Estructura de topics**:
> "calles/casas/puertas/dormitorios/mesas/luz/llave_casa"

**Especificación técnica**: Sección 4.7 del estándar MQTT
- 4.7.1 Topic wildcards
- 4.7.2 Topics beginning with $
- 4.7.3 Topic semantic and usage

**Tipos de sensores**:
- Binary sensors (open/closed, on/off)
- Multi-value sensors (temperatura, presión)

---

### 3.6 "#include <qmqtt.h>" (6/7)

**Tema**: Sesiones clean vs dirty

**Concepto clave**:
> "Si Bob recibe la petición de conexión de un cliente que quiere una sesión 'sucia' [...] la persistencia de mensajes tanto de su parte como de la del servidor jugarán un papel clave"

**Terna de identificación**:
1. Nada (cliente anónimo)
2. Client ID
3. Usuario/contraseña

**Metáfora cósmica**: "Si el cliente que llega a la red es un cometa que pasa de esos de casa siete milenios o es un nuevo miembro de la comunidad"

**Seguridad**: TLS sobre SSL

---

### 3.7 "Demo: Bob, smartbróker" (7/7)

**El más corto** — esquema de implementación

**Pasos**:
1. Dibujar a Bob (bróker MQTT)
2. Dibujar a Lucy (bot conversacional tipo ALICE)
3. Implementar los dibujos
4. Generar informe

**Diálogo Lucy-Capitán**:
> "— Capitán, una cuestión de logística.  
> — ¿Sí, Lucy? ¿De qué se trata? Tengo mucho trabajo dándole grasa de caballo a la piel de mis botos..."

**Petición de financiación**:
> "Se busca financiación para implementar a Bob."

---

## 4. Hallazgos textuales

### 4.1 Conexión con otras series

| Elemento | MQTT | Columna Lit. | Borrego | A partir 40 |
|----------|------|--------------|---------|-------------|
| Bob (bróker) | **central** | s-Bob | — | — |
| Alice (sistema) | **central** | s-Alice | — | — |
| Lucy (bot) | **central** | — | — | — |
| Don Juan | **profesor** | — | — | — |
| IoT / Smart | **central** | ✓ | ✓ | — |
| Gallardo (alumno) | ✓ | — | — | — |

### 4.2 Stack técnico real

El autor documenta tecnologías reales:
- **MQTT**: Protocolo de mensajería IoT
- **Raspberry Pi**: Hardware para bróker
- **QMQTT**: Librería Qt para MQTT
- **TLS/SSL**: Seguridad de transporte
- **SPARQL/RDF**: Mencionado en otras partes

### 4.3 "Bob" como proyecto real

Bob no es solo ficción — es un **prototipo de bróker inteligente** que el autor quería implementar:
- Bróker MQTT con capacidades smart
- Integración con Lucy (bot conversacional)
- Demo buscando financiación

---

## 5. Evaluación crítica

### 5.1 Fortalezas

1. **Didáctica narrativa**: Los conceptos técnicos entran mejor con personajes
2. **Documentación real**: Incluye especificaciones MQTT auténticas
3. **Proyecto viable**: Bob/Lucy es arquitectura IoT coherente

### 5.2 Debilidades

1. **Dispersión**: El artículo 2/7 (60K chars) es inmanejable
2. **Mezcla excesiva**: A veces no se sabe si es tutorial o ficción
3. **Proyecto incompleto**: La demo 7/7 quedó en esquema

### 5.3 Valor

**Para técnicos**: Tutorial MQTT funcional con ejemplos narrativos  
**Para el corpus**: Origen de Bob/Alice/Lucy que aparecen en otros proyectos  
**Para arqueología**: Muestra al autor como desarrollador IoT real

---

## 6. Lo que conecta con el presente

Los conceptos de esta serie de 2017 **anticipan** proyectos actuales:

| 2017 (MQTT) | 2026 (Scriptorium) |
|-------------|-------------------|
| Bob (bróker) | MCPPrologServer |
| Lucy (bot) | Agentes conversacionales |
| Alice (sistema IoT) | s-Alice en Smart City |
| Don Juan (profesor) | El "no-maestro" |
| Aula con Raspberry | PrologEditor + IoT |

---

## 7. Citas para antología

### Sobre protocolo vs implementación
> "MQTT es un protocolo y, por tanto, amigo lector, nada de técnica, nada otra cosa que pura matemática."

### Sobre Alice trabajando en Alice
> "Comparamos a Alice trabajando en Alice y a Trimegisto trabajando en Trimegisto. No sé si notan ahí la apertura de la base."

### Sobre el alumno que "va por su cuenta"
> "Gallardo que va por su cuenta — lleva una raspberry en la mochila y gestiona de otro modo sus comunicaciones"

### Sobre clientes y cometas
> "Si el cliente que llega a la red es un cometa que pasa de esos de casa siete milenios o es un nuevo miembro de la comunidad."

---

## 8. Conclusión

La serie MQTT es el **laboratorio técnico** del autor. Mientras las otras series son egografía, política o literatura, aquí documenta su trabajo real como desarrollador IoT.

Los personajes Bob, Lucy y Alice no son solo ficción — son **prototipos** de sistemas que el autor intentaba construir en 2017. La conexión con los proyectos actuales (MCPPrologServer, agentes conversacionales, PrologEditor) muestra continuidad de casi una década.

El método de "tutorial narrativo" (explicar tecnología mediante personajes y escenas) es el mismo que usa hoy en la documentación del Scriptorium.

---

**Estado**: ✅ Analizado  
**Fecha de análisis**: 2026-01-07  
**Analista**: Sistema de fichas bibliográficas v2.0
