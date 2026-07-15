# WP-S?? · <slug> — reporte

| dato | valor |
| ---- | ----- |
| agente | _(identificador)_ |
| fecha | _(YYYY-MM-DD)_ |
| repos tocados | _(superproyecto y/o submodules)_ |
| ramas | `wp/<id>-<slug>` por repo |
| commits | _(hashes POR repo)_ |
| estado propuesto | listo para revisión / bloqueado / devuelto-corregido |

## Qué se hizo

_(3–8 líneas, hechos en pasado. Desviaciones del WP: decirlas ANTES de nada.)_

## Archivos tocados (por repo)

_(una línea por archivo: repo · creado/modificado/borrado/archivado + para qué)_

## Evidencia

> No inventes observaciones. Salida literal o `⏳ sin verificar`.

```
(comandos ejecutados y salida relevante: tests, lint, gates, arranques)
```

## Digestión

_(qué se demolió o archivó; por cada símbolo/paquete: el grep que demuestra
cero referencias vivas; si se archivó: destino en CRIPTA y puntero)_

```
(pegar grep)
```

## Auto-revisión (PRACTICAS §4 — con honestidad)

- [ ] Deps file:/tgz/ruta-relativa nuevas: …
- [ ] Referencias a zeus-sdk: …
- [ ] Nombres de transición / copy-paste: …
- [ ] If-chains que debieron ser tabla/máquina: …
- [ ] Canales ad-hoc que debieron ser r/s/h: …
- [ ] Digestión completa (grep arriba): …
- [ ] Tests de comportamiento / specs regeneradas: …
- [ ] Arranque real verificado: …
- [ ] Commits por repo correctos; puntero de submódulo SIN bumpear: …
- [ ] Diff solo del alcance: …

## Hallazgos fuera de alcance

_(candidatos a WP; NO se arreglaron aquí)_

## Dudas / bloqueos

---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
