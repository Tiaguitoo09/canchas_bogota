// CATALOGO · solo lectura. No importa reservas, pagos ni notificaciones (regla R1).
import { CANCHAS, HORARIOS, OCUPADAS } from '../nucleo/datos.js';

export function listarCanchas() {
  return CANCHAS;
}

export function horariosDe(idCancha) {
  return HORARIOS.map(h => ({
    hora: h,
    disponible: !OCUPADAS.has(idCancha + '|' + h)
  }));
}

export function buscarPorBarrio(barrio) {
  if (!barrio) return CANCHAS;
  const b = barrio.toLowerCase();
  return CANCHAS.filter(c => c.barrio.toLowerCase().includes(b));
}
