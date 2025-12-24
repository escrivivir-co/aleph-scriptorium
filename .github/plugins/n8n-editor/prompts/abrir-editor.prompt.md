---
name: Abrir Editor N8N
description: Iniciar el editor visual de workflows en modo desarrollo
---

# Prompt: Abrir Editor N8N

## Input

El usuario quiere abrir el editor visual de workflows.

## Procedimiento

### 1. Verificar Estado del Submódulo

```bash
cd alephscript-n8n-like-editor
git status
```

### 2. Verificar Dependencias

```bash
# Si no hay node_modules
npm install
```

### 3. Iniciar Servidor de Desarrollo

```bash
npm start
# Abre http://localhost:4200
```

### 4. Confirmar al Usuario

Una vez iniciado:

```
✅ Editor N8N disponible en http://localhost:4200

El editor permite:
- Crear workflows visualmente
- Arrastrar nodos desde el sidebar
- Conectar nodos con el canvas D3
- Configurar parámetros en el panel derecho
- Importar/exportar JSON

Comandos disponibles:
- Ctrl+Z: Deshacer
- Ctrl+Y: Rehacer
- Ctrl+S: Guardar workflow
- Del: Eliminar nodo seleccionado
```

## Output Esperado

- Servidor Angular corriendo en puerto 4200
- Editor accesible en navegador
- Usuario puede empezar a diseñar workflows
