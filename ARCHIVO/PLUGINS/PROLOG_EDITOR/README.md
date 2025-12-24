# Plugin PrologEditor — Datos de Runtime

> **Directorio de datos**: `ARCHIVO/PLUGINS/PROLOG_EDITOR/`  
> **Plugin**: prolog-editor  
> **Submódulo**: iot-sbr-logica-para-bots

---

## Estructura

```
PROLOG_EDITOR/
├── README.md           # Este archivo
├── templates/          # Templates Prolog del usuario
│   ├── *.template      # Metadatos JSON
│   └── {nombre}/       # Directorio con app.pl
├── rules/              # Reglas Prolog importadas
│   └── *.pl            # Archivos de reglas
└── exports/            # Exportaciones Blockly → Prolog
    └── *_export.pl     # Código transpilado
```

---

## Templates

Los templates son pares de archivos:

1. **{nombre}.template** — Metadatos JSON
   ```json
   {
     "name": "Nombre legible",
     "description": "Descripción",
     "main": "nombre-carpeta",
     "files": ["."],
     "exports": ["pred1/2", "pred2/1"]
   }
   ```

2. **{nombre}/app.pl** — Código Prolog
   ```prolog
   :- module(app, [pred1/2, pred2/1]).
   % Código aquí
   ```

---

## Reglas

Archivos `.pl` importados que pueden asignarse a agentes:

```prolog
:- module(mi_agente, [decidir/2]).

decidir(Contexto, Accion) :-
    % Lógica de decisión
    ...
```

---

## Exportaciones

Código Prolog generado desde rutinas Blockly:

```prolog
% Generado desde: ARCHIVO/PLUGINS/BLOCKLY_EDITOR/routines/mi-rutina.js
:- module(mi_rutina_export, [funcion_principal/2]).

funcion_principal(Entrada, Salida) :-
    % Código transpilado
    ...
```

---

## Uso

### Crear template
```
@prologeditor crear template para control de turnos en conversación
```

### Ejecutar consulta
```
@prologeditor ejecutar: puede_hablar(usuario, Resultado)
```

### Exportar Blockly
```
@prologeditor exportar blockly: ARCHIVO/PLUGINS/BLOCKLY_EDITOR/routines/decidir.js
```

---

## Requisitos

### Para edición (siempre disponible)
- Plugin prolog-editor instalado
- Directorios de ARCHIVO creados

### Para ejecución (opcional)
- SWI-Prolog 9.x instalado en el sistema
- `brew install swi-prolog` (macOS)

---

## Referencias

- [Plugin manifest](/.github/plugins/prolog-editor/manifest.md)
- [Submódulo README](/../iot-sbr-logica-para-bots/README-SCRIPTORIUM.md)
- [SWI-Prolog](https://www.swi-prolog.org/)

