// NUCLEO · la base compartida. No importa a nadie (regla R3).
export const CANCHAS = [
  { id: 'c1', nombre: 'Cancha La 68',       barrio: 'Salitre',   tipo: 'Sintetica 5v5', precioHora: 90000 },
  { id: 'c2', nombre: 'Cancha El Tunal',    barrio: 'Tunal',     tipo: 'Sintetica 7v7', precioHora: 130000 },
  { id: 'c3', nombre: 'Cancha Suba Rincon', barrio: 'Suba',      tipo: 'Sintetica 5v5', precioHora: 85000 },
  { id: 'c4', nombre: 'Cancha Chapinero',   barrio: 'Chapinero', tipo: 'Sintetica 8v8', precioHora: 160000 }
];

export const HORARIOS = ['18:00', '19:00', '20:00', '21:00'];

// Reservas ya tomadas, con formato "idCancha|hora"
export const OCUPADAS = new Set(['c1|19:00', 'c2|20:00', 'c4|18:00']);
