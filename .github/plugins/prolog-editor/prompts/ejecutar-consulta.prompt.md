# Prompt: Ejecutar Consulta Prolog

> **Plugin**: prolog-editor  
> **Agente**: PrologEditor  
> **Requiere**: SWI-Prolog instalado

---

## Entrada

- **Consulta**: Predicado Prolog a ejecutar
- **Template** (opcional): Template a cargar primero

## Verificación Previa

```bash
# Verificar SWI-Prolog
swipl --version
```

Si no está instalado:
```bash
# macOS
brew install swi-prolog

# Ubuntu/Debian
sudo apt-get install swi-prolog

# Windows
# Descargar de https://www.swi-prolog.org/download/stable
```

## Proceso

### Opción A: Usando Backend del Submódulo

1. Iniciar servidor:
   ```bash
   cd iot-sbr-logica-para-bots
   npm install
   npm start
   ```

2. Ejecutar consulta via API:
   ```bash
   curl -X POST http://localhost:8000/api/run-rule \
     -H "Content-Type: application/json" \
     -d '{"text": "do_start(usuario, Resultado)"}'
   ```

### Opción B: Ejecución Directa

```bash
swipl -g "consult('archivo.pl'), consulta(X), writeln(X), halt."
```

## Salida

### Éxito
```json
{
  "status": 200,
  "payload": "Resultado de la consulta"
}
```

### Error
```json
{
  "error": "Unknown procedure: predicado/2"
}
```

## Ejemplos

### Consulta simple
```prolog
?- get_current_state(Estado).
Estado = started.
```

### Consulta con acción
```prolog
?- do_pause(admin, Resultado).
Resultado = 'Máquina pausada por admin'.
```

### Consulta con múltiples resultados
```prolog
?- findall(X, miembro(X, [1,2,3]), Lista).
Lista = [1, 2, 3].
```

## Modo Offline

Si SWI-Prolog no está disponible, el agente:
1. Muestra el código Prolog sin ejecutar
2. Sugiere la instalación
3. Ofrece validación sintáctica básica

