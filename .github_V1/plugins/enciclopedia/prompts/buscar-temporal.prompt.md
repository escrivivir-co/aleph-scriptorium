---
agent: 'Bibliotecario'
description: 'Búsqueda por período histórico o siglo en los tomos'
---

# Buscar por Período Temporal

Localiza contenido en los tomos enciclopédicos según un período histórico.

## Uso

```
@Bibliotecario buscar-temporal "siglo XVII"
@HDF-ErnestoCastro ¿Qué filósofos del Renacimiento?
```

## Períodos Reconocidos

### Historia de la Filosofía

| Período | Alternativas | Siglos |
|---------|--------------|--------|
| Antigüedad | antigua, grecia, griega, clásica | VI a.C. - V d.C. |
| Medieval | edad media, escolástica | V - XIV |
| Renacimiento | humanismo | XV - XVI |
| Modernidad temprana | barroco | XVII |
| Ilustración | siglo XVIII, luces | XVIII |
| Romanticismo | idealismo alemán | XVIII-XIX |
| Contemporánea | moderna, siglo XX | XIX - XX |
| Posmoderna | actual | XX - XXI |

## Formato de Entrada

Acepta:
- Nombres de período: "medieval", "ilustración"
- Siglos: "siglo XVII", "s.XVIII", "XVII"
- Años aproximados: "1600-1700", "años 1800"

## Proceso

1. **Normalizar** la entrada a período canónico
2. **Buscar** en índices de tomos disponibles
3. **Devolver** capítulos ordenados cronológicamente

## Formato de Salida

```
📅 Búsqueda temporal: [período normalizado]

📖 Historia de la Filosofía:
   Siglos [rango]
   
   - #[N]: [Filósofos] ([año aprox.])
   - #[M]: [Filósofos] ([año aprox.])
   
   Temas del período: [lista de temas]
```

## Ejemplo

**Entrada**: `¿Qué hay del siglo XVII?`

**Salida**:
```
📅 Búsqueda temporal: Siglo XVII (1600-1700)

📖 Historia de la Filosofía:
   
   - #19: Molina, Báñez, Suárez (escolástica tardía)
   - #20: Bacon, Hobbes (empirismo inglés, contractualismo)
   - #21: Descartes (racionalismo)
   - #22: Spinoza (panteísmo)
   - #23: Locke (empirismo)
   - #24: Leibniz (monadología)
   
   Temas del período: método, sustancia, contrato social, mecanicismo
```
