// PAGOS · cobra. NO importa notificaciones (regla R2):
// si el envio de correos falla, el cobro no se puede caer.
// Por eso avisa publicando un evento, no llamando a nadie.
import { publicar } from '../nucleo/eventos.js';

export function cobrar(reserva) {
  const referencia = 'PG-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  publicar('pago.aprobado', Object.assign({}, reserva, { referencia: referencia }));
  return { ok: true, referencia: referencia, valor: reserva.valor };
}
