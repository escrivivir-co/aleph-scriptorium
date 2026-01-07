# Ficha Bibliográfica: Series Menores y Sueltos

> **Conjunto**: 27 artículos en 12 categorías  
> **Plataforma**: La Lengua de las Máquinas (lalengua.teatredefum.net)  
> **Período**: 2016-2017  
> **Extensión total**: ~350.000 caracteres  
> **Autor**: dir TdF / "Martín"

---

## Índice de Categorías

| # | Categoría | Artículos | Chars | Tema central |
|---|-----------|-----------|-------|--------------|
| 1 | [Traducciones] | 3 | ~50K | Blockchain, WWI, cuántica |
| 2 | [Web 3.0] Sapere Aude | 3 | ~48K | Bot SPARQL + RDF |
| 3 | [Correcciones] Aleph null | 2 | ~39K | Novela de iniciación |
| 4 | [Lucy] AIML | 1 | ~14K | Bot conversacional |
| 5 | [Ciberarmas/Ciberescudos] | 2 | ~48K | WannaCry + radio podcast |
| 6 | [Diarios] | 2 | ~22K | Vida cotidiana + música |
| 7 | [SCRUM & Techy stories] | 2 | ~24K | APNs, hacking doméstico |
| 8 | [Economía para disidentes] | 1 | ~23K | DAOs, criptomonedas |
| 9 | [Emprender] IsMy.band | 1 | ~16K | ICO, Musicoin |
| 10 | [Literatura, ejercicios] | 1 | ~18K | Escritura trina |
| 11 | [Teatro DIY] Tarima | 1 | ~12K | Teatro en la red |
| 12 | Sueltos varios | 8 | ~56K | Variado |

---

## 1. [Traducciones] — 3 artículos

### 1.1 "El primer conflicto global"

**Fuente**: Traducción de "El primer conflicte global" (Revista Barcelona, 2011)  
**Extensión**: ~16K caracteres  
**Tema**: Primera Guerra Mundial como conflicto global

**Contexto narrativo**:
> "Podría justificarse que el agotamiento del bloque especulativo ha dado paso al bloque industrialista."

**Referencia autobiográfica**: El Subcomandante Marcos y don Durito (EZLN, 1994)
> "Cuando era adolescente [...] el uno de enero de 1994, un escarabajo, llamado don Durito, que lleva un clip a modo de espada y media cáscara de nuez a modo de escudo"

**Conexión actualidad 2017**: Trump y Corea del Norte.

---

### 1.2 "Is Ethereum SHA-256?"

**Fuente**: Traducción de hilo de Reddit  
**Extensión**: ~12K caracteres  
**Tema**: Algoritmo Ethash vs SHA-256

**Contenido técnico**:
- Ethash como algoritmo PoW de Ethereum
- Resistencia a ASICs (memory-bound)
- Computación cuántica y resistencia criptográfica

**Cita técnica**:
> "Mining on Ethereum is based on our own Ethash algorithm [...] the bottleneck is memory bandwidth, which is already heavily optimized in GPUs"

---

### 1.3 "Qué debería evolucionar bitcoin para incorporarse al paradigma cuántico"

**Fuente**: Traducción de artículo de Vitalik Buterin  
**Extensión**: ~21K caracteres  
**Tema**: Seguridad cuántica de Bitcoin

**Tesis central**:
> "Bitcoin, in its current form, is partially quantum-safe"

**Problema identificado**:
- Direcciones "usadas" (clave pública expuesta) → vulnerables
- Direcciones "no usadas" → protegidas por SHA256/RIPEMD-160

**Valor**: Primer documento en castellano sobre quantum-safety de Bitcoin (2017).

---

## 2. [Web 3.0] Sapere Aude bot — 3 artículos

### 2.1 "Justificación"

**Extensión**: ~19K caracteres  
**Tema**: Fundamentos del bot SPARQL

**Requisito de entrada**:
> "No entre quien no sepa RDF."

**Concepto central**: Teorema de Gödel aplicado a constituciones
> "Toda ley fundamental que aspira a mantenerse vigente con el tiempo contiene provisiones para su propia modificación"

**Fecha interna ficcional**: Octubre de 2038

**Referencia**: Hackeo de la constitución con Gödel (Naukas, 2014)

---

### 2.2 "Recogida de respuestas - 1"

**Extensión**: ~12K caracteres  
**Tema**: Tutorial SPARQL endpoints

**Requisito de entrada**:
> "No entre a este tutorial de Sapere Aude bot v3 quien no sepa Sparql query results."

**Definición del proyecto**:
> "Sapere Aude v01 es una obra de teatro interactiva"

**Stack técnico**:
- Hosting: Gandi
- Git: Gpaas
- MongoDB: RockMongo
- NodeJS

---

### 2.3 "Recogida de respuestas - 2"

**Extensión**: ~18K caracteres  
**Tema**: Extracción de Wikipedia vía SPARQL

**Demo**: http://screen.teatredefum.net/

**Pregunta de la obra**:
> "¿Qué son los campos cuánticos y cómo se relacionan con el continuo espacio-tiempo?"

**Ejemplo SPARQL**:
```sparql
PREFIX up: <http://purl.uniprot.org/core/>
SELECT (COUNT(?protein) AS ?value)
FROM <http://togogenome.org/graph/uniprot>
WHERE { ?protein up:enzyme ?enzyme }
```

---

## 3. [Correcciones] Aleph null — 2 artículos

### 3.1 "La claridad y la levedad del ser"

**Extensión**: ~17K caracteres  
**Tema**: Correcciones a la novela "Aleph Null"

**Documento corregido**: `000 Teatro CRISIS DE CLARIDAD`

**Descripción de la novela**:
> "Se aborda, egográficamente, la cuestión de una juventud que se suelta del núcleo y de la teta y hace alarde de identidad e individualidad e individuación"

**Estructura**:
- Parte 1 (37 págs): Notas para equipo teatral
- Parte 2 (13 págs): [contenido]
- Parte 3: Pendiente (fecha límite abril 2012)

**Concepto**:
> "La hipersuperficie de Minkowsky que habitamos es una y otras, a la vez, se están consumando"

---

### 3.2 "Egografía y método científico"

**Extensión**: ~23K caracteres  
**Tema**: Método egográfico como escritura

**Definición clave**:
> "El joven muestra su máscara y dice su nombre, que quiere, en verdad, menos nombrar a una persona que nombrar a un prototipo de humano: 'Aleph Null...', se presenta 'para servirles.'"

**Referencia estructural**: Cartas del Tarot Mayor (22 fragmentos)

**Crisis documentada**:
> "El mundo de juventud se derrumbó en pocos meses y el salto sobre la crisis fue de campeonato"

---

## 4. [Lucy] AIML — 1 artículo

### 4.1 "AIML 1 de unos cuantos"

**Extensión**: ~14K caracteres  
**Tema**: Primer cuerpo del bot Lucy

**Fecha liberación**: 17-11-2017

**Requisito**:
> "No entre quien no sepa PASCAL."

**Código AIML presentado**:
```xml
<category>
  <pattern>LUCY CANTA</pattern>
  <template>¿Quieres<set name="topic">cantar</set>?</template>
</category>
```

**Recursos**:
- screen.teatredefum.net (código)
- revistero.teatredefum.net (divulgación)
- desk.teatredefum.net (comercial)

**Conexión**: Lucy es el bot que aparece en la serie MQTT.

---

## 5. [Ciberarmas/Ciberescudos] — 2 artículos

### 5.1 "Quiero llorar" (Ciberarmas)

**Extensión**: ~29K caracteres  
**Tema**: Análisis del ransomware WannaCry

**Definición técnica**:
> "'Quiero llorar' es lo que alguien exclama cuando se percata de que ha sido infectado por un cierto gusano de la categoría de los que secuestran información"

**Cálculo**: 3.514.368 bytes = palabras de 8 bits del gusano

**Concepto filosófico**: Holones y propiedades emergentes
> "La escritura y la codificación informática son áreas de carácter holónico"

**Contexto autobiográfico**: Entrada a los 40, ismy.band, ciclo profesional.

---

### 5.2 "Si olvidas mirar hacia arriba" (Ciberescudos)

**Extensión**: ~19K caracteres  
**Formato**: Guión de programa de radio (30 minutos)

**Estructura**:
```
[Sintonía: 00:00 - 00:03] Femitemplarias
[Introducción: 00:03 - 00:10] Melancolía de humanismo
[Cartelera: 00:10 - 00:13]
[Sección: 00:13 - 00:20] La cordura y los tiempos actuales
```

**Tema**: Evolución del "Homo Hijoputensis" a la persona virtual/cibernética.

**Referencia video**: Nora y Pizarnik en Lesbos (Vimeo)

---

## 6. [Diarios] — 2 artículos

### 6.1 "Jobs (hiring and freelance)"

**Extensión**: ~11K caracteres  
**Tema**: Regreso a casa tras viaje laboral

**Narrativa**: Mujer que vuelve con su hija, busca trabajo freelance.

**Referencia**: Upwork como plataforma laboral

**Proyecto mencionado**: Aleph-1 como "prototipo capaz de mantener el caudal estable"

---

### 6.2 "Mejor del otro lado"

**Extensión**: ~11K caracteres  
**Tema**: Aprendizaje de solfeo y guitarra

**Contexto**: Casa de la cultura, primer curso de solfeo

**Método descrito**:
> "Primero hay que coger la soltura para cantar las notas viéndolas ubicadas en las líneas del pentagrama"

**Repertorio**: Sevillanas, tangos, bulerías, rumbas (partituras tabuladas)

---

## 7. [SCRUM & Techy stories] — 2 artículos

### 7.1 "Mensajes descendentes"

**Extensión**: ~12K caracteres  
**Tema**: Push notifications iOS (APNs + FCM)

**Problema técnico**: Notificaciones no llegan a iPhones en Miami

**Stack**:
- APNs (Apple Push Notification service)
- FCM (Firebase Cloud Messaging)
- NodeJS servidor
- .ipa empaquetado

**Metodología**: SCRUM (product owner, scrum master, equipo)

---

### 7.2 "Pro-guard"

**Extensión**: ~12K caracteres  
**Tema**: Hacking doméstico (reparar termo eléctrico)

**Definición**:
> "Hackear es el arte de solucionarse la vida"

**Ejemplo**: Palangana de agua caliente como solución al termo roto.

**Filosofía**:
> "Un hacker [...] hace una misma acción o cosa que es caso y efecto y causa: solucionar"

---

## 8. [Economía para disidentes] — 1 artículo

### 8.1 "Disolución de la utopía"

**Extensión**: ~23K caracteres  
**Tema**: Criptomonedas y DAOs

**Proyectos listados**:
1. IsMy.band (Musicoin.org + voise.it)
2. MistID (protocolo seguridad redes)
3. l'H D.A.O. (banca distribuida, Bank of the Commons)

**Preguntas centrales**:
> "¿Qué diferencia hay entre distribuido y descentralizado? ¿Qué diferencia entre moneda fiduciaria y moneda criptográfica?"

**Referencia**: "dr. Tek" como interlocutor filosófico

---

## 9. [Emprender] IsMy.band — 1 artículo

### 9.1 "IsMy.band"

**Extensión**: ~16K caracteres  
**Tema**: ICO para plataforma musical

**Definición ICO**:
> "An unregulated means by which funds are raised for a new cryptocurrency venture"

**Concepto**: Plataforma de bandas musicales basada en blockchain

**Origen**: Idea de "Maese Sonoro"

**Conexión con Ethereum**: DAOs explicadas vía Wikipedia

---

## 10. [Literatura, ejercicios] — 1 artículo

### 10.1 "Escritura trina"

**Extensión**: ~18K caracteres  
**Tema**: Ejercicio literario sobre San Jordi

**Estructura**: Tres voces narrativas (mariscal, querubín, mujer que regresa)

**Contexto**: Ejercicio escolar sobre mitos, reconvertido

**Referencia autobiográfica**:
> "A raíz de un episodio de bipolaridad controlada me he dado cuenta de que ese relato está muy calado dentro de mí"

---

## 11. [Teatro DIY] Tarima — 1 artículo

### 11.1 "Tarima"

**Extensión**: ~12K caracteres  
**Fecha**: 7 de mayo de 2017  
**Tema**: Teatro en la red (www.tic.ninja)

**Concepto**:
> "Por cada actor que se sube al escenario miles de otros quiebran la vida y aguantan la embestida representando dentro de la coraza que supone el papel"

**Referencia**: Onfray, Tratado de Ateología

**Metáfora**: Teatro de oro vs teatro de plata
> "Si es así el teatredefum.net es teatro de plata"

---

## 12. Sueltos varios — 8 artículos

### 12.1 "«Romam vado iterum crucifigi»"

**Extensión**: ~13K caracteres  
**Tema**: Quo vadis + liberalismo

**Contenido**: Collage de Wikipedia sobre:
- Tradición cristiana de Pedro
- Teatro Real de Madrid (1843-1850)
- Liberalismo (definiciones)

---

### 12.2 "2.html" (Índice)

**Extensión**: ~7K caracteres  
**Contenido**: Página 2 del índice del blog (lista de posts)

**Fecha ficcional**: Monday 17 October 2033

**Valor**: Mapa de navegación del blog completo.

---

### 12.3 "[IC/EC, 1 de 7] IC Pipe lines"

**Extensión**: ~12K caracteres  
**Tema**: Tutorial de CI/CD (Integración/Entrega Continua)

**Requisito**:
> "No entre en este tutorial [...] quien jamás haya compilado"

**Stack**: GitLab CI/CD

**Concepto**:
> "IC integración continua [...] EC entrega continua"

---

### 12.4 "[Análisis: Rocket live helpdesk]"

**Extensión**: ~10K caracteres  
**Tema**: Implementación de chat en vivo con Rocket.Chat + Drupal

**Pasos**:
1. Librerías y SDK Rocket
2. Conexión con backend
3. Protocolo Live Help Desk

---

### 12.5 "[BORRADOR] Novela corta"

**Extensión**: ~8K caracteres (placeholder)  
**Título**: "El gran atractor seguido de La otra república"  
**Descripción**: "Ficción egográfica sobre teología y física no aplicada"  
**Estado**: ¡NO LEER SI NO A CORREGIR!

---

### 12.6 "[Sala de estudios] Cosas que se oyen... sobre la injusticia"

**Extensión**: ~16K caracteres  
**Tema**: Desobediencia civil y ley injusta

**Referencias**:
- Marx sobre esclavitud
- Rosa Parks
- Satyagraha (सत्याग्रह)
- Goethe: "Es preferible la injusticia al desorden"

**Contexto**: Debate en comentarios (formato foro)

---

### 12.7 "[Para-Traducciones] Los paseos de Virginia en Londres"

**Extensión**: ~22K caracteres  
**Tema**: Reseña de entrevista sobre Virginia Woolf

**Contexto**: Programa "Libros con wasabi" (La2)

**Personaje**: Doña Plácida (abuela materna, 89 años)

**Referencia literaria**: Relación entre dos mujeres

---

### 12.8 "[wikipedismos] Una académica sin sillón"

**Extensión**: ~10K caracteres  
**Tema**: María Moliner y el Diccionario de uso del español

**Tesis**:
> "La primera mujer que pudo entrar en ese colegio al final se quedó sin sillón"

**Proyecto propuesto**: Subir el CD de 1998 a wikimedia con SPARQL

**Conexión**: La "no-maestra" (Maríaceta, Ariadna, Eurídice)

---

## Tabla de conexiones con series mayores

| Elemento | Series menores | Series mayores |
|----------|----------------|----------------|
| Lucy (bot) | AIML, Sapere Aude | MQTT |
| Aleph-1 / Aleph null | Correcciones, Diarios | Nombre del proyecto |
| No-maestra | Wikipedismos | Conejo, Borrego |
| Egografía | Correcciones | A partir de los 40 |
| Blockchain/DAOs | Traducciones, Economía, IsMy.band | — |
| Teatro interactivo | Teatro DIY, Sapere Aude | Columna literaria |
| SCRUM | Techy stories | Metodología del autor |
| Crisis 1-O | Sala de estudios | Columna literaria, Conejo |
| Smart City | IC/EC, Sapere Aude | Columna literaria, MQTT |

---

## Evaluación global

### Función en el corpus

Estos 27 artículos son **el taller** del autor:
- Traducciones que alimentan su pensamiento
- Tutoriales que documenta mientras aprende
- Ejercicios literarios que ensaya
- Proyectos técnicos que intenta

### Valor documental

1. **Arqueológico**: Primera aparición de Lucy (AIML), Sapere Aude, Aleph null
2. **Técnico**: Tutoriales CI/CD, SPARQL, Rocket.Chat, APNs
3. **Filosófico**: Economía disidente, desobediencia civil, Gödel
4. **Autobiográfico**: Crisis, mudanzas, freelance, estudios

### Conexión con 2026

| 2017 (Sueltos) | 2026 (Scriptorium) |
|----------------|-------------------|
| Lucy (AIML) | Agentes MCP |
| Sapere Aude (SPARQL) | TypedPrompting |
| Aleph null (novela) | Nombre del proyecto |
| IC/EC pipelines | DevOps Scriptorium |
| Teatro DIY | Teatro plugin |
| IsMy.band (blockchain) | — (abandonado) |

---

## Citas para antología

### Sobre hackear
> "Hackear es el arte de solucionarse la vida. Un hacker [...] hace una misma acción o cosa que es caso y efecto y causa: solucionar."

### Sobre la academia
> "La Real Academia es la escuelita a donde acuden los profesores de nuestros profesores."

### Sobre el prototipo humano
> "El joven muestra su máscara y dice su nombre, que quiere, en verdad, menos nombrar a una persona que nombrar a un prototipo de humano: 'Aleph Null...', se presenta 'para servirles.'"

### Sobre Gödel y las constituciones
> "Toda ley fundamental que aspira a mantenerse vigente con el tiempo contiene provisiones para su propia modificación."

### Sobre el teatro de plata
> "Por cada actor que se sube al escenario miles de otros quiebran la vida y aguantan la embestida representando dentro de la coraza que supone el papel."

---

**Estado**: ✅ Indexado completamente  
**Fecha de análisis**: 2026-01-07  
**Analista**: Sistema de fichas bibliográficas v2.0
