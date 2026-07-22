# ESTACIÓN · calibración del mundo a (aleph-scriptorium)

**La estación se activa desde aquí.** Instancia del consumidor; el método
vive en `@alephscript/skills-scriptorium` (skills `vigilancia` +
`estacion-viva`). Esta calibración NO va en el skill — solo en `plan/`.

## Params

| param | valor |
| ----- | ----- |
| `WORLD_ROOT` | `C:\S_LAB\a-sdk` |
| `WORKTREE_BASE` | `C:\S_LAB\.worktrees\a` |
| `OUT_DIR` | `C:\S_LAB\vigilancia\a` |

## Espejo skills

```text
npm install
npm run skills:sync
```

`@alephscript/skills-scriptorium@0.7.0` · registry
`https://npm.scriptorium.escrivivir.co` · bin `alephscript-skills-sync`.

## Watcher

```text
# One-shot
WORLD_ROOT=<worktree-o-mundo> OUT_DIR=C:/S_LAB/vigilancia/a ONCE=1 \
  bash .claude/skills/estacion-viva/scripts/watcher-sesion.sh

# Sesión
WORLD_ROOT=<worktree-o-mundo> OUT_DIR=C:/S_LAB/vigilancia/a INTERVAL=45 \
  bash .claude/skills/estacion-viva/scripts/watcher-sesion.sh
```
