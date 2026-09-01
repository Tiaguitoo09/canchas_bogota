# ADR-001 · El catálogo va separado del resto
Fecha: 1 de septiembre de 2026 · Estado: aceptada

## Contexto
El catálogo (ver canchas y horarios) recibe muchísimo más tráfico que las reservas:
la gente mira varias veces antes de reservar una. Además es **solo lectura**.

## Drivers que mandan
- **Disponibilidad:** el catálogo debe seguir respondiendo aunque falle el pago.
- **Desempeño:** ver la lista de canchas debe responder en menos de 1 s.

## Decisión
El módulo `catalogo` **no importa** a `reservas`, `pagos` ni `notificaciones`.
Solo lee del núcleo. Así puede desplegarse y escalarse aparte.

## Alternativas consideradas
Dejar todo junto: descartada, porque una falla en pagos dejaría a la gente
sin poder ni siquiera mirar qué canchas hay.

## Consecuencias
**Ganamos:** el catálogo sobrevive a fallas del resto.
**Pagamos:** quien orquesta (la interfaz) tiene que coordinar catálogo y reservas.

## Cómo se verifica
Regla **R1** en `arquitectura/reglas.json`, revisada por el pipeline en cada cambio.
