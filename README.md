# Canchas Bogotá

Proyecto integrador · **Arquitectura de Software** · Ingeniería de Sistemas · UTadeo

Sistema de reserva de canchas sintéticas. Es el repositorio base sobre el que cada
grupo va a trabajar durante el resto del semestre.

---

## Lo que hace distinto a este repositorio

No es solo código. **Las decisiones de arquitectura están escritas y se verifican solas.**

| Carpeta | Qué hay ahí |
|---|---|
| `src/` | El código, separado en módulos con fronteras |
| `arquitectura/` | Los **ADR**: qué se decidió y por qué |
| `arquitectura/reglas.json` | Esas decisiones, escritas como reglas verificables |
| `tools/verificar-arquitectura.js` | La **función de aptitud** que las revisa |
| `.github/workflows/` | El **pipeline** que corre la verificación y despliega |

## Las tres reglas vigentes

| Regla | ADR | Qué dice |
|---|---|---|
| **R1** | ADR-001 | `catalogo` no puede importar `reservas`, `pagos` ni `notificaciones` |
| **R2** | ADR-002 | `pagos` no puede importar `notificaciones` ni `catalogo` |
| **R3** | ADR-003 | `nucleo` no puede importar a nadie |

## Cómo se verifica

```
node tools/verificar-arquitectura.js
```

Sale **0** si la arquitectura se respeta y **1** si se viola. El pipeline usa ese
resultado: si es 1, **el despliegue no ocurre**.

## El flujo completo

```
usted hace un cambio
      ↓
push a GitHub
      ↓
el pipeline verifica la arquitectura
      ↓
  ¿respeta las reglas?
   /              \
  NO               SI
  ↓                ↓
ROJO           despliega a
no despliega   GitHub Pages
```

## Ver la aplicación

Está desplegada en GitHub Pages. La URL aparece en
**Settings → Pages** de su repositorio.

## Regla de oro del proyecto

> Si cambia la arquitectura, **cambia el ADR y cambia la regla**.
> Un ADR que nadie hace cumplir es un papel. Una regla sin ADR es una imposición sin razón.

---

## Si el despliegue falla la primera vez

Es lo más común y tiene arreglo de dos minutos.

### Error: `Get Pages site failed ... Not Found`

**Qué significa:** GitHub Pages no está encendido todavía. No se activa solo al crear
el repositorio: hay que prenderlo una vez.

**Cómo se arregla:**

1. `Settings` → `Pages` (menú izquierdo).
2. En **Build and deployment → Source**, elija **GitHub Actions**.
   No elija "Deploy from a branch": esa opción ignora este pipeline.
3. Vuelva a `Actions`, entre al flujo que falló y presione **Re-run all jobs**.

Su URL aparece arriba, en `Settings → Pages`.

### El pipeline no corre en un fork

En los forks, GitHub deshabilita los flujos por seguridad. Vaya a la pestaña
`Actions` y presione el botón verde del aviso amarillo para habilitarlos.

### Aviso `Node 20 is being deprecated`

Es una **advertencia, no un error**. GitHub ya ejecuta las acciones en una versión
más nueva por su cuenta. Se puede ignorar.

### Cómo leer un fallo del pipeline

| Job que falla | Qué significa |
|---|---|
| **1. Verificar la arquitectura** | Se violó una regla. El log dice cuál, en qué archivo y por qué existe. |
| **2. Desplegar a GitHub Pages** | La arquitectura está bien; el problema es de configuración (casi siempre Pages sin encender). |
