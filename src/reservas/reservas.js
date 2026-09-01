// RESERVAS · bloquea un horario. El horario es un recurso unico:
// no se puede reservar dos veces (la misma leccion de la silla de un concierto).
import { OCUPADAS, CANCHAS } from '../nucleo/datos.js';
import { publicar } from '../nucleo/eventos.js';

export function estaDisponible(idCancha, hora) {
  return !OCUPADAS.has(idCancha + '|' + hora);
}

export function reservar(idCancha, hora, nombreCliente) {
  const clave = idCancha + '|' + hora;
  if (OCUPADAS.has(clave)) {
    return { ok: false, motivo: 'Ese horario ya esta reservado' };
  }
  OCUPADAS.add(clave);
  const cancha = CANCHAS.find(c => c.id === idCancha);
  const reserva = {
    idCancha: idCancha, cancha: cancha.nombre, hora: hora,
    cliente: nombreCliente, valor: cancha.precioHora
  };
  publicar('reserva.creada', reserva);
  return { ok: true, reserva: reserva };
}
