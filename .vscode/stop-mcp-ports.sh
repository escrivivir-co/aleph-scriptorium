#!/usr/bin/env bash
set -u

# Stop MCP-related processes by TCP port, reading ports directly from .vscode/mcp.json
# Works in Git Bash on Windows (uses netstat + taskkill)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_JSON="$SCRIPT_DIR/mcp.json"

if [[ ! -f "$MCP_JSON" ]]; then
  echo "[ERROR] No se encontró: $MCP_JSON"
  exit 1
fi

if ! command -v python >/dev/null 2>&1; then
  echo "[ERROR] python no está en PATH. Activa tu venv o instala Python."
  exit 1
fi

mapfile -t PORTS < <(python - "$MCP_JSON" <<'PY'
import json
import re
import sys
from urllib.parse import urlparse

path = sys.argv[1]
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

servers = data.get("servers", {})
ports = set()

for _name, cfg in servers.items():
    url = cfg.get("url") if isinstance(cfg, dict) else None
    if not url:
        continue

    parsed = urlparse(url)
    if parsed.scheme not in ("http", "https"):
        continue

    host = parsed.hostname
    port = parsed.port

    # Only local servers that can be stopped by local port kill
    if host in ("localhost", "127.0.0.1", "::1") and port:
        ports.add(port)

for p in sorted(ports):
    print(p)
PY
)

if [[ ${#PORTS[@]} -eq 0 ]]; then
  echo "[INFO] No hay puertos locales en mcp.json para detener."
  exit 0
fi

echo "[INFO] Puertos detectados en mcp.json: ${PORTS[*]}"

stopped_any=0

for port in "${PORTS[@]}"; do
  echo "\n[INFO] Revisando puerto $port..."

  mapfile -t PIDS < <(netstat -ano -p tcp | awk -v p="$port" '
    toupper($1)=="TCP" && toupper($4)=="LISTENING" {
      n=split($2,a,":");
      if (a[n]==p) print $5
    }
  ' | sort -u)

  if [[ ${#PIDS[@]} -eq 0 ]]; then
    echo "  - Nada escuchando en :$port"
    continue
  fi

  for pid in "${PIDS[@]}"; do
    if [[ -n "$pid" ]]; then
      echo "  - Matando PID $pid en :$port"
      taskkill //PID "$pid" //T //F >/dev/null 2>&1 || true
      stopped_any=1
    fi
  done

  # Verificación inmediata
  mapfile -t REMAINING < <(netstat -ano -p tcp | awk -v p="$port" '
    toupper($1)=="TCP" && toupper($4)=="LISTENING" {
      n=split($2,a,":");
      if (a[n]==p) print $5
    }
  ' | sort -u)

  if [[ ${#REMAINING[@]} -eq 0 ]]; then
    echo "  ✅ Puerto :$port liberado"
  else
    echo "  ⚠️  Aún escuchando en :$port (PID(s): ${REMAINING[*]})"
  fi
done

if [[ $stopped_any -eq 0 ]]; then
  echo "\n[INFO] No había procesos LISTENING para matar en los puertos MCP."
else
  echo "\n[DONE] Intento de parada completado."
fi
