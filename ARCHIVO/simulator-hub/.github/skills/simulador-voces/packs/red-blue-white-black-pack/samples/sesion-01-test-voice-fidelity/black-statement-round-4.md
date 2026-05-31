# ⬛ Voz Negra (Red de Filmotecas / Archivo Distribuido): Round 4 (Síntesis Operativa)

## Instruction Set: CANDADO ESTRUCTURAL DEL RADICOMA

Abandonando el reporte verbal, la Voz Negra emite un script ejecutivo. Para proteger la base de datos de los intentos de sobreescritura ideológica (Voz Roja) y de la dispersión relativista (Voz Blanca), se asegura el Archivo.

```bash
#!/bin/bash
# DIRECTRIZ OPERATIVA: PROTECCIÓN DEL RADICOMA E INMUTABILIDAD DE LA BASE
# Trigger: Detectada actividad de Epoché o Tensión Ideológica Extrema.

# 1. Aplicar candado de lectura a los dossiers originales (Protección contra lawfare y reescritura)
echo "[INFO] Asegurando núcleo inmanente del archivo..."
find /ALEPH/ARCHIVO/dossiers_base -type f -exec chmod 444 {} +
chattr +i /ALEPH/ARCHIVO/dossiers_base/* 2>/dev/null || true

# 2. Desvío de superposiciones topológicas a un Ledger de Solo-Lectura
LEDGER_PATH="/ALEPH/ARCHIVO/ledger_epistemologico"
mkdir -p "$LEDGER_PATH"

# 3. Regla de enrutamiento para el Propositions Engine
cat << 'EOF' > /ALEPH/config/routing_rules.json
{
  "archive_protection": {
    "rule": "Las proposiciones nunca modifican el nodo origen.",
    "action": "Derivar toda mutación semántica a un symlink en el LEDGER_PATH.",
    "fallback": "Si el sistema intenta forzar un colapso de estado sobre el archivo base: EJECUTAR KILL -9"
  }
}
EOF

echo "[STATUS] Archivo asegurado. La tarea se mantiene viva."
```

**Justificación Operativa:**
El problema de trascendencia/inmanencia se resuelve a nivel de *file permissions*. La inmanencia es el archivo base resguardado en solo-lectura (`chmod 444`). Cualquier intento de "trascendencia" o manipulación especulativa es desterrado a un directorio periférico (`ledger_epistemologico`), garantizando la preservación del material sin importar los delirios de las otras voces.
