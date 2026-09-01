# ADR-003 · El núcleo no depende de nadie
Fecha: 1 de septiembre de 2026 · Estado: aceptada

## Contexto
`nucleo` guarda los datos compartidos y el bus de eventos. Todos lo usan.

## Driver que manda
- **Modificabilidad:** si la base compartida depende de sus consumidores,
  cualquier cambio se propaga en círculo y nada se puede mover.

## Decisión
`nucleo` **no importa** ningún otro módulo. Las dependencias van en una sola
dirección: hacia adentro.

## Consecuencias
**Ganamos:** no hay ciclos. Se puede cambiar cualquier módulo sin tocar la base.
**Pagamos:** el núcleo no puede "resolver" cosas por su cuenta; solo ofrece datos y el bus.

## Cómo se verifica
Regla **R3** en `arquitectura/reglas.json`, revisada por el pipeline en cada cambio.
