// NUCLEO · bus de eventos. Es el patron Observer de la Clase 4.
// Permite que un modulo anuncie que paso algo SIN conocer a quien escucha.
const suscriptores = {};

export function suscribir(evento, fn) {
  if (!suscriptores[evento]) suscriptores[evento] = [];
  suscriptores[evento].push(fn);
}

export function publicar(evento, datos) {
  (suscriptores[evento] || []).forEach(fn => fn(datos));
}
