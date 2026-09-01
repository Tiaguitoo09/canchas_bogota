#!/usr/bin/env node
/**
 * FUNCION DE APTITUD (fitness function)
 * Verifica que el codigo respete las reglas de arquitectura declaradas
 * en arquitectura/reglas.json. Si alguien las viola, este script falla
 * y el pipeline se pone en rojo.
 *
 * Sin dependencias. Se ejecuta con:  node tools/verificar-arquitectura.js
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..', 'src');
const CONFIG = path.join(__dirname, '..', 'arquitectura', 'reglas.json');

function archivosJs(dir) {
  let salida = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) salida = salida.concat(archivosJs(p));
    else if (e.name.endsWith('.js')) salida.push(p);
  }
  return salida;
}

function importesDe(contenido) {
  const rutas = [];
  const patrones = [
    /import\s+[^'"]*from\s+['"]([^'"]+)['"]/g,
    /import\s+['"]([^'"]+)['"]/g,
    /require\(\s*['"]([^'"]+)['"]\s*\)/g
  ];
  for (const re of patrones) {
    let m;
    while ((m = re.exec(contenido)) !== null) rutas.push(m[1]);
  }
  return rutas;
}

function moduloDeRuta(rutaImport, archivoOrigen) {
  // resuelve la ruta relativa y devuelve la carpeta de src/ a la que apunta
  if (!rutaImport.startsWith('.')) return null;
  const abs = path.resolve(path.dirname(archivoOrigen), rutaImport);
  const rel = path.relative(RAIZ, abs);
  if (rel.startsWith('..')) return null;
  return rel.split(path.sep)[0];
}

const { reglas } = JSON.parse(fs.readFileSync(CONFIG, 'utf8'));

if (!fs.existsSync(RAIZ)) {
  console.error('\n  [X] No existe la carpeta src/. No hay nada que verificar.\n');
  process.exit(1);
}
const archivos = archivosJs(RAIZ);
if (archivos.length === 0) {
  console.error('\n  [X] No se encontro ningun archivo .js en src/.');
  console.error('      Un pipeline que aprueba sin revisar nada no sirve de nada.\n');
  process.exit(1);
}
const violaciones = [];

for (const archivo of archivos) {
  const relArchivo = path.relative(RAIZ, archivo);
  const moduloActual = relArchivo.split(path.sep)[0];
  const contenido = fs.readFileSync(archivo, 'utf8');

  for (const imp of importesDe(contenido)) {
    const destino = moduloDeRuta(imp, archivo);
    if (!destino || destino === moduloActual) continue;

    for (const r of reglas) {
      if (r.modulo === moduloActual && r.no_puede_importar.includes(destino)) {
        violaciones.push({
          regla: r.id, adr: r.adr,
          archivo: 'src/' + relArchivo,
          desde: moduloActual, hacia: destino,
          porque: r.porque
        });
      }
    }
  }
}

console.log('');
console.log('  VERIFICACION DE ARQUITECTURA');
console.log('  ' + '='.repeat(58));
console.log(`  Archivos revisados: ${archivos.length}`);
console.log(`  Reglas activas:     ${reglas.length}`);
console.log('');

if (violaciones.length === 0) {
  for (const r of reglas) {
    console.log(`  [OK] ${r.id} (${r.adr}) · ${r.modulo} no importa a ${r.no_puede_importar.join(', ')}`);
  }
  console.log('');
  console.log('  ARQUITECTURA RESPETADA. El cambio puede desplegarse.');
  console.log('');
  process.exit(0);
}

for (const v of violaciones) {
  console.log(`  [X] ${v.regla} VIOLADA  (${v.adr})`);
  console.log(`      Archivo: ${v.archivo}`);
  console.log(`      "${v.desde}" esta importando a "${v.hacia}", y no puede.`);
  console.log(`      Por que existe esta regla: ${v.porque}`);
  console.log('');
}
console.log(`  ARQUITECTURA VIOLADA: ${violaciones.length} problema(s). El despliegue se detiene.`);
console.log('');
process.exit(1);
