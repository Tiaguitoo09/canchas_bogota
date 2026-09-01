# ADR-002 · Pagos avisa por evento, no llamando
Fecha: 1 de septiembre de 2026 · Estado: aceptada

## Contexto
Cuando se aprueba un pago hay que avisarle al cliente. Hoy es un correo, pero
el negocio ya pidió sumar WhatsApp y una notificación en la app.

## Drivers que mandan
- **Disponibilidad:** si el envío del correo falla, el cobro **no** se puede caer.
- **Modificabilidad:** agregar un aviso nuevo no debe obligar a tocar `pagos`.

## Decisión
`pagos` **no importa** a `notificaciones`. Publica el evento `pago.aprobado`
en el bus del núcleo. Quien quiera enterarse, se suscribe.
Es el patrón **Observer** de la Clase 4, aplicado.

## Alternativas consideradas
Que `pagos` llame directo a `notificaciones`: descartada. Es más simple de leer,
pero acopla el cobro al correo y obliga a editar `pagos` con cada canal nuevo.

## Consecuencias
**Ganamos:** el cobro es independiente del aviso; sumar canales no toca pagos.
**Pagamos:** leyendo `cobrar()` ya no se ve qué pasa después. Depurar cuesta más.

## Cómo se verifica
Regla **R2** en `arquitectura/reglas.json`, revisada por el pipeline en cada cambio.
