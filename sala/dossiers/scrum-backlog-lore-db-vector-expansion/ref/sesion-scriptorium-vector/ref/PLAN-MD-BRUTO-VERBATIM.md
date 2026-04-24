
# EN BRUTO


Nota: Esta operación es agent-first. Puedes preguntarme a mí cosas pero Ox, Aleph e Indice deben ser los destinatarios de tu interlocución. Como mucho te hago de corre-ve-y-dile pero son ellos los que actúan y deciden.

Nota: Intenta no cargarte de mucho trabajo de golpe e interactua bien con el usuario. Haz como un árbol-grafo general de la tarea y muevete con el usuario por las partes para poder opinar de qué rama damos prioridad según que toque, si buscar info, programar, etc...

Nota: Tras entender la tarea, activa el skills de plantillas de AgentLoreSDK para buscarte las que consideres oportuno y útil cargarte en el contexto. Informa al usuario de esto.

ATENCIÓN, TODO EL TEXTO EN LA PARTE FINAL DEL PROMPT ES LA DESCRIPCIÓN PLAN V1 DE LA TAREA QUE HA SIDO SUBSUMIDA EN UN NUEVO PLAN V2.

# Plan v2

Aplicar protocolo .github\prompts\as_instalar_submodulo.prompt.md para nuevo componente Scriptorium.VectorMachineSDK basado en la fuente remota:

https://github.com/escrivivir-co/aleph-deep-wiki

Una vez instalado el submodulo:

- Examinar e inicializar como plugin para que después podamos accedera la información don't repeat yourself desde Scriptorium. Ahora ya te puede ayudar aparte de .github\agents\ox.agent.md, .github\agents\indice.agent.md y .github\agents\aleph.agent.md para la parte de Scriptorium. Una integración con plugion básica que permita: a) registrar la codebase del submodulo entiendo que hay y agregando un proxy mardkown a la propia infra agentica del repo remoto (entiendo que la hay), en esta fase no hay que escribir grandes trozos sino evidenciar y "conectar" agénticamente ambos repos. De modo que en los siguientes pasos pueda participar del plan aportando info.
- Ver cómo casa con plan v1. alternativas para dockerizacion y para trabajo nativo en la codebase...
- Dentro del esquema Scriptorium, .github/plugins/submodulos hay que maximizar la participación en el plan del nuevo DocumentMachineSDK\.github\agents\cristalizador.agent.md, que no solo es experto en DocumentMachineSDK, sino que usa DocumentMachineSDK\COPILOT como fuente de docs para proponer agentización de temas como el tuyo.
- Diseñar dosiers para sesión y planificar dosieres técnicos de trabajo derivados.

Nota: esto lo va a hacer GPT-5.4 en solitario que ha sido nombrado mejor agente y modelo de Scriptorium asumiendo la máxima autoridad en en la codebase.

# Plan v1

Nota: Dosieres en:

- sala
- DocumentMachineSDK\sala


Traigo mucha tarea, así que valora inicializarte una carpeta de contexto en tmp para ayudarte y no cargar todo de golpe que te pido muchos pasos. O dime tú cómo quieres hacer.
Vale, ahora ponte en modo #sala-aleph (ver abajo nota sobre "pack") y busca los dosieres vector de la lore-db. Basicamente en DocumentMachineSDK y algo en la sala de Scriptorium.

Ahora, tengo el docker destop abierto y esperando.

Pregunta, a parte del uso que se le destina como parte de vectorizar la lore-db-sdk, ¿podemos crear un dosier nuevo que extrae complementamente esto de funcionalidad para el paso lore-db de la pipeline de DocumentMachineSDK y lo aisla como generalización para poder usarlo desde el Scriptorium. Queremos que la base operativa esté contenida en DocumentMachine pero usarla desde Scriptorium. Por ejemplo, para la siguiente propuesta:

Revisa en diagonal el contenido de nuestro onfalo-asesor-sdk. Ahí la información de usuario se almacena como proyectos (hay de 2 tipos, investiga bien), nota: asegurar que la rama integration se trae todo lo de main. De forma más menos libre pero siempre como "ficheros". Objetivo ¿puedo usar una vectordb de la DocumentMachine para que este otro submodulo almacene su data en vectores usando igulamente un mcp server de MCPGallery - mesh?

Entiendo que la estrategia debe ser copiar los dosieres especificos para lore-db y hacer uno genérico orientado a "proyecto". Las piezas "lore_f" en verdad son el frontal del proyecto que enlaza sus páginas u otros archivos. Un proyecto varias secciones, etc... Quizás es momento de tirar de NovelistEditor. Esa estructura agéntica ya organiza una suerte de "proyecto como novela de capitulos-escenas-personajes". Ese será el siguiente día que te pediré usa mi nuevo vector db para que los textos de novelisteditor estén en vectores y la recuperación meidante el server mcp pueda hacerse indistintametne en modo file a disco o en modo vector... esperaría una respuesta fácil que reprovecha la estructura proyecto y se acopla bien. O, por ejemplo CopilotEngine o LoreSDK o TypedPromptsEditor. O, más importante, el propio sistema de ARCHIVO/PROYECTOS de scriptorium ¡cuánto beneficio poder indexar selectivamente cierto documentos de esos scopes para acelerar su uso, etc...

¿Cuál es el problema, Opus? Pues que estás en vs code copilot a 7.5x de coste y eres prohibitivo. Así que tienes que usar como DocumentMachineSDK.Aleph, aunque operando en la principal Scriptorium.sala, la orquestación de tres agentes que meteré cuando me digas para que te hagan el trabajo sucio. 

Tu usas #sala-aleph y ellos #sala-entrar (los dosieres de Scriptorium y DocumentMachineSDK ya refieren la idea de "pack" para xportar la funcionalidad). El dosier 1 se llama "sesion-scriptorium-vector" y producirá tantos dosiers independientes como módulo o unidades feature que generemos para que sean el scope de trabajo, y, cuando se archive, el registro documental de trabajo en cada unidad feature o módulo. Entonces, insisto, los nexts steps es que te organices mentalmente como orquestar a 3 agentes para que te recopilen información y tú solo tengas que "pensar", que eres muy caro.

# EN LIMPIO

## Lectura del Plan v2 (supersede v1)

El PO pide **una cosa concreta y acotada** + dos consecuencias de diseño:

1\. **Instalar** submódulo `escrivivir-co/aleph-deep-wiki` como `VectorMachineSDK` aplicando el protocolo de 8 fases.

2\. **Casar con Plan v1** (vector-db genérico para onfalo/Novelist/ARCHIVO/PROYECTOS) y **diseñar dossiers** derivados.

3\. **Agentizar** el resultado dentro de Scriptorium (con apoyo de Ox/Aleph/Indice + Cristalizador).

El PO pide una acción acotada + tres consecuencias de diseño:

1.  Instalar submódulo `https://github.com/escrivivir-co/aleph-deep-wiki` como `VectorMachineSDK` aplicando el protocolo de 8 fases ([as_instalar_submodulo.prompt.md](.github).
2.  Inicializar plugin mínimo en `.github/plugins/vector-machine/` que:
    -   a) Registre la codebase del submódulo (mapa estructural).
    -   b) Agregue un proxy markdown a la infra agéntica remota (DRY: no duplicar agentes, solo enlazar).
    -   c) Conecte agénticamente ambos repos para que VectorMachineSDK participe del plan aportando info en pasos siguientes.
3.  Casar con Plan v1 (vector-db genérico para onfalo / Novelist / ARCHIVO/PROYECTOS) --- alternativas Docker vs nativo.
4.  Maximizar participación de `@cristalizador` (DocumentMachineSDK) que usa [COPILOT](.github) como fuente para proponer agentización.

## Árbol-grafo de la tarea

```

ROOT: Scriptorium.VectorMachineSDK (Plan v2)
│
├── A. INSTALAR SUBMÓDULO  ← protocolo 8 fases
│   ├── A0. Verificación de estado (sync de N submódulos)
│   ├── A1. git submodule add → path local: VectorMachineSDK
│   ├── A2. Inspección codebase + README-SCRIPTORIUM.md (commit en submódulo)
│   ├── A3. Casar instrucciones del PO con lo descubierto
│   └── A4-A8. Scrum borrador → plugin → integración → commits separados
│
├── B. PLUGIN MÍNIMO (.github/plugins/vector-machine/)
│   ├── B1. Manifest + bridge agéntico (no agentes propios todavía)
│   ├── B2. Registro de codebase (índice estructural del submódulo)
│   ├── B3. Proxy markdown a agentes/instrucciones remotas (DRY, solo refs)
│   └── B4. Habilitar que VectorMachineSDK aporte info al plan
│
├── C. CASAR CON PLAN V1 (decisiones técnicas)
│   ├── C1. Dockerizado vs nativo (PO tiene Docker abierto)
│   ├── C2. Base operativa en DocumentMachineSDK; consumo desde Scriptorium
│   └── C3. Generalizar lore-db → "proyecto" (onfalo / Novelist / ARCHIVO/PROYECTOS)
│
├── D. DISEÑO DE DOSSIERS (skill dossier-feature)
│   ├── D1. Dossier maestro: sesion-scriptorium-vector (sala/dossiers/)
│   └── D2. Dossiers feature derivados (unidades relacionadas con scriptorium y que permitan al archivarse seguir el trazado de las features o partes)
│
└── E. AGENTIZACIÓN  ← Ox + Aleph + Indice + Cristalizador
    ├── E1. Mapeo ontológico (qué agente del Scriptorium habla con la Vector DB)
    ├── E2. ¿Bridge plugin nuevo o extensión de mcp-presets para registrar el server MCP?
    └── E3. @cristalizador propone agentes nuevos desde DocumentMachineSDK/COPILOT

```

Skills cargadas (Cristalizador Room)
---------------

-   `dossier-feature` (cargada) --- para D.
-   [skills](AgentLoreSDK\cli-tool\components\skills\) --- pendiente de cargar las plantillas relevantes cuando entremos en B (bridge) y D (dossiers).