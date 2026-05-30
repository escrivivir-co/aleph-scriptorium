#!/usr/bin/env bash
# update-submodules.sh - Alinea submodulos top-level con origin/integration/beta/scriptorium.
#
# Uso:
#   ./scripts/update-submodules.sh
#   ./scripts/update-submodules.sh --check
#   ./scripts/update-submodules.sh --branch integration/beta/scriptorium

set -uo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_BRANCH="${SUBMODULE_BRANCH:-integration/beta/scriptorium}"
CHECK_ONLY=0
RESET_DIVERGED=1
TIMESTAMP="$(date +%Y%m%d%H%M%S)"

usage() {
  cat <<EOF
Uso: $0 [opciones]

Actualiza los submodulos de primer nivel del Scriptorium para que su HEAD local
coincida con origin/$TARGET_BRANCH. El repo padre quedara con punteros de
submodulo modificados; confirma con git status y commitea esos gitlinks.

Opciones:
  --check              Solo informa si algun submodulo no apunta al remoto.
  --branch <rama>      Rama remota objetivo (default: $TARGET_BRANCH).
  --no-reset-diverged  Si una rama local diverge, no hacer reset con respaldo.
  -h, --help           Mostrar esta ayuda.

Notas del protocolo:
  - Este script trabaja solo submodulos top-level porque ALEPH fija esos gitlinks.
  - Submodulos anidados se gobiernan dentro del repo padre de cada submodulo.
  - BotHubSDK/reference-console-app vive en main y no se toca aqui.
  - En corridas recursivas manuales, onfalo-asesor-sdk/PLUGIN_COUNCIL puede fallar
    si su .gitmodules interno no declara URL para ese path.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --check)
      CHECK_ONLY=1
      ;;
    --branch)
      if [[ $# -lt 2 ]]; then
        echo "[submodules] ERROR: --branch requiere un valor" >&2
        exit 2
      fi
      TARGET_BRANCH="$2"
      shift
      ;;
    --no-reset-diverged)
      RESET_DIVERGED=0
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "[submodules] ERROR: opcion no reconocida: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
  shift
done

if [[ ! -f "$ROOT_DIR/.gitmodules" ]]; then
  echo "[submodules] ERROR: no existe .gitmodules en $ROOT_DIR" >&2
  exit 1
fi

echo "[submodules] Aleph Scriptorium - actualizar punteros top-level"
echo "[submodules] Raiz: $ROOT_DIR"
echo "[submodules] Rama objetivo: origin/$TARGET_BRANCH"
if [[ "$CHECK_ONLY" -eq 1 ]]; then
  echo "[submodules] Modo: check (sin modificar working trees)"
else
  echo "[submodules] Modo: update"
fi
echo

SUBMODULE_PATH_KEYS=()
while IFS= read -r key; do
  SUBMODULE_PATH_KEYS+=("$key")
done < <(git -C "$ROOT_DIR" config -f .gitmodules --name-only --get-regexp '^submodule\..*\.path$')

if [[ "${#SUBMODULE_PATH_KEYS[@]}" -eq 0 ]]; then
  echo "[submodules] ERROR: .gitmodules no contiene submodulos" >&2
  exit 1
fi

if [[ "$CHECK_ONLY" -eq 0 ]]; then
  git -C "$ROOT_DIR" submodule sync --quiet
fi

updated_count=0
ok_count=0
missing_count=0
dirty_count=0
error_count=0
changed_paths=()

for key in "${SUBMODULE_PATH_KEYS[@]}"; do
  path="$(git -C "$ROOT_DIR" config -f .gitmodules --get "$key")"
  submodule_dir="$ROOT_DIR/$path"

  echo "[submodules] ==> $path"

  if ! git -C "$submodule_dir" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    if [[ "$CHECK_ONLY" -eq 1 ]]; then
      echo "[submodules]     NOT_INITIALIZED"
      ((missing_count++))
      continue
    fi

    echo "[submodules]     Inicializando checkout"
    if ! git -C "$ROOT_DIR" submodule update --init -- "$path"; then
      echo "[submodules]     ERROR: no se pudo inicializar" >&2
      ((error_count++))
      continue
    fi
  fi

  dirty_status="$(git -C "$submodule_dir" status --porcelain --untracked-files=no)"
  if [[ -n "$dirty_status" ]]; then
    echo "[submodules]     SKIP: working tree con cambios tracked/submodule internos"
    echo "$dirty_status" | sed 's/^/[submodules]       /'
    ((dirty_count++))
    continue
  fi

  if ! remote_sha="$(git -C "$submodule_dir" ls-remote --heads origin "$TARGET_BRANCH" | awk '{print $1}')" || [[ -z "$remote_sha" ]]; then
    echo "[submodules]     MISSING_BRANCH: origin/$TARGET_BRANCH"
    ((missing_count++))
    continue
  fi

  if [[ "$CHECK_ONLY" -eq 1 ]]; then
    local_sha="$(git -C "$submodule_dir" rev-parse HEAD)"
    if [[ "$local_sha" == "$remote_sha" ]]; then
      echo "[submodules]     OK $local_sha"
      ((ok_count++))
    else
      echo "[submodules]     OUTDATED local=$local_sha remote=$remote_sha"
      ((updated_count++))
    fi
    continue
  fi

  if ! git -C "$submodule_dir" fetch origin "$TARGET_BRANCH" --prune; then
    echo "[submodules]     ERROR: fetch fallo" >&2
    ((error_count++))
    continue
  fi

  if git -C "$submodule_dir" show-ref --verify --quiet "refs/heads/$TARGET_BRANCH"; then
    if ! git -C "$submodule_dir" checkout "$TARGET_BRANCH" >/dev/null; then
      echo "[submodules]     ERROR: checkout fallo" >&2
      ((error_count++))
      continue
    fi
  else
    if ! git -C "$submodule_dir" checkout -b "$TARGET_BRANCH" --track "origin/$TARGET_BRANCH" >/dev/null; then
      echo "[submodules]     ERROR: no se pudo crear rama local" >&2
      ((error_count++))
      continue
    fi
  fi

  git -C "$submodule_dir" branch --set-upstream-to="origin/$TARGET_BRANCH" "$TARGET_BRANCH" >/dev/null 2>&1 || true

  local_sha="$(git -C "$submodule_dir" rev-parse HEAD)"
  remote_tracking_sha="$(git -C "$submodule_dir" rev-parse "origin/$TARGET_BRANCH")"

  if [[ "$local_sha" == "$remote_tracking_sha" ]]; then
    echo "[submodules]     OK $local_sha"
    ((ok_count++))
  elif git -C "$submodule_dir" merge-base --is-ancestor "$local_sha" "$remote_tracking_sha"; then
    if ! git -C "$submodule_dir" merge --ff-only "origin/$TARGET_BRANCH"; then
      echo "[submodules]     ERROR: fast-forward fallo" >&2
      ((error_count++))
      continue
    fi
    echo "[submodules]     UPDATED $(git -C "$submodule_dir" rev-parse HEAD)"
    ((updated_count++))
  elif [[ "$RESET_DIVERGED" -eq 1 ]]; then
    safe_path="${path//\//-}"
    safe_path="${safe_path// /_}"
    safe_branch="${TARGET_BRANCH//\//-}"
    backup_branch="backup/submodule-update/${safe_path}-${safe_branch}-${local_sha:0:7}-$TIMESTAMP"

    if ! git -C "$submodule_dir" branch "$backup_branch" "$local_sha"; then
      echo "[submodules]     ERROR: no se pudo crear backup $backup_branch" >&2
      ((error_count++))
      continue
    fi

    if ! git -C "$submodule_dir" reset --hard "origin/$TARGET_BRANCH"; then
      echo "[submodules]     ERROR: reset fallo; backup creado en $backup_branch" >&2
      ((error_count++))
      continue
    fi

    echo "[submodules]     RESET_TO_REMOTE $(git -C "$submodule_dir" rev-parse HEAD)"
    echo "[submodules]     backup: $backup_branch"
    ((updated_count++))
  else
    echo "[submodules]     DIVERGED: usa sin --no-reset-diverged para crear backup y resetear"
    ((error_count++))
    continue
  fi

  recorded_sha="$(git -C "$ROOT_DIR" rev-parse ":$path" 2>/dev/null || true)"
  final_sha="$(git -C "$submodule_dir" rev-parse HEAD)"
  if [[ -n "$recorded_sha" && "$recorded_sha" != "$final_sha" ]]; then
    changed_paths+=("$path")
  fi

  echo
done

echo "[submodules] Resumen"
echo "[submodules]   OK: $ok_count"
echo "[submodules]   Actualizados/outdated: $updated_count"
echo "[submodules]   No inicializados o sin rama: $missing_count"
echo "[submodules]   Omitidos por cambios locales: $dirty_count"
echo "[submodules]   Errores: $error_count"

if [[ "$CHECK_ONLY" -eq 0 ]]; then
  echo
  if [[ "${#changed_paths[@]}" -gt 0 ]]; then
    echo "[submodules] Punteros modificados en ALEPH:"
    for path in "${changed_paths[@]}"; do
      echo "[submodules]   - $path"
    done
    echo
    echo "[submodules] Para fijarlos:"
    printf '[submodules]   git add'
    for path in "${changed_paths[@]}"; do
      printf ' %q' "$path"
    done
    printf '\n'
    echo "[submodules]   git commit -m \"chore(submodules): align integration/beta/scriptorium heads\""
  else
    echo "[submodules] No hay punteros nuevos que commitear."
  fi
fi

if [[ "$error_count" -gt 0 || "$dirty_count" -gt 0 || "$missing_count" -gt 0 ]]; then
  exit 1
fi

exit 0