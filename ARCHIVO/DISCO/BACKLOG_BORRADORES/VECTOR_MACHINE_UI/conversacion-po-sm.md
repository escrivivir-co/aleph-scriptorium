# Conversación PO-SM: VectorMachineUI

**Fecha**: 2026-04-26  
**Submódulo**: `VectorMachineUI`  
**Plugin objetivo**: `vector-machine`

---

## Análisis Técnico (SM)

### Inventario del submódulo

- Repo remoto: `https://github.com/escrivivir-co/vm-sdk-chromadb-admin.git`
- Stack: Next.js 14 + React 18 + TypeScript + Mantine + `chromadb@^3.4.3`
- Puerto de desarrollo: `3001`
- Dependencia de runtime: Chroma HTTP normalmente en `http://localhost:8000`
- Dependencia semántica crítica: usa `VectorMachineSDK/.model-cache` como cache local del modelo
- Rama de integración: `integration/beta/scriptorium`

### Gaps identificados

| Gap | Descripción | Prioridad | Sprint |
|-----|-------------|-----------|--------|
| G1 | La UI vivía anidada dentro de `VectorMachineSDK/chromadb-admin-main` y no como submódulo raíz | Must | 1 |
| G2 | El workspace no la indexaba en `Funcional.md`, `Tecnico.md` ni en `@indice` | Must | 1 |
| G3 | No existían tasks dedicadas para instalar/arrancar/abrir la UI desde VS Code | Should | 1 |
| G4 | La documentación de `vector-machine` no distinguía el core vectorial de su UI auxiliar | Should | 1 |

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Locks de Windows al mover el repo anidado | Media | Media | Ejecutar el movimiento con PowerShell nativo y verificar Git después |
| Desalineación entre embeddings de notebooks y query UI | Media | Alta | Mantener explícita la dependencia con `VectorMachineSDK/.model-cache` |
| Duplicación de plugin para una UI auxiliar | Baja | Media | Reusar `vector-machine` como plugin canónico |

---

## Visión de Producto (PO)

### Casos de uso objetivo

1. **UC1**: Operar colecciones Chroma del stack VectorMachine desde una UI dedicada en el workspace raíz.
2. **UC2**: Validar queries semánticas locales compatibles con los notebooks de `VectorMachineSDK`.
3. **UC3**: Separar físicamente core vectorial y UI sin perder trazabilidad DRY en Scriptorium.

### Criterios de éxito

- [ ] `VectorMachineUI/` existe como submódulo raíz con remoto correcto.
- [ ] `VectorMachineSDK/` deja de alojar la UI anidada.
- [ ] El workspace ofrece tasks mínimas para instalar, arrancar y abrir la UI.
- [ ] `Funcional.md`, `Tecnico.md`, `@indice` y `docs/leeme.md` reflejan la nueva topología.
- [ ] El plugin `vector-machine` documenta a `VectorMachineUI` como submódulo auxiliar.

---

## Decisiones Arquitectónicas

1. **Reusar plugin existente**: `VectorMachineUI` queda indexado bajo `vector-machine`, no como plugin nuevo.
2. **Separación física**: la UI vive en raíz como submódulo independiente para operar/versionar sin contaminar el core vectorial.
3. **Rama estándar**: se mantiene `integration/beta/scriptorium` como rama de trabajo.
4. **Cache compartida**: la UI mantiene dependencia explícita de `VectorMachineSDK/.model-cache` mientras no exista un servicio de embeddings separado.

---

## Próximos Pasos

- [ ] Registrar `VectorMachineUI` en `.gitmodules` y normalizar su `gitdir`.
- [ ] Actualizar `scripts/setup-workspace.sh`, `scripts/README.md` y `.vscode/tasks.json`.
- [ ] Indexar la nueva topología en `Funcional.md`, `Tecnico.md`, `@indice` y la documentación del plugin.
- [ ] Dejar backlog borrador listo para aprobación posterior.
