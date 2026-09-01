// NOTIFICACIONES · escucha eventos y avisa. Nadie la llama directamente.
import { suscribir } from '../nucleo/eventos.js';

const bandeja = [];

export function iniciar() {
  suscribir('pago.aprobado', function (p) {
    bandeja.push('Reserva confirmada: ' + p.cancha + ' a las ' + p.hora +
                 ' para ' + p.cliente + '. Referencia ' + p.referencia + '.');
  });
}

export function mensajes() {
  return bandeja;
}
