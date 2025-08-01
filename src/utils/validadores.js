// Importacion de librerias
import chalk from 'chalk';
import _ from 'lodash';

export function validarTextoNoVacioNiSimbolos(input) {
    if (_.isEmpty(input.trim())) {
        return chalk.red('❌ Este campo no puede estar vacío. ❌');
    }
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regex.test(input)) return chalk.red('❌ Solo letras y espacios son permitidos. ❌')
    return true;
}

export function validarNumeroPositivo(input) {
    const trimmed = input.trim();

    if (_.isEmpty(trimmed)) {
        return chalk.red('❌ Este campo no puede estar vacío. ❌');
    }

    if (/[+-]/.test(trimmed)) {
        return chalk.red('❌ No se permiten signos positivos ni negativos. ❌');
    }

    const value = parseFloat(trimmed);

    if (isNaN(value)) {
        return chalk.red('❌ Debes ingresar un número válido. ❌');
    }

    if (value < 0) {
        return chalk.red('❌ El número no puede ser negativo. ❌');
    }

    return true;
}
export function validarTelefono(input) {
    if (_.isEmpty(input.trim())) {
        return chalk.red('❌ El número de teléfono no puede estar vacío. ❌');
    }

    const telefonoValido = /^\+?\d{7,15}$/.test(input.trim());

    if (!telefonoValido) {
        return chalk.red('❌ El número debe contener solo dígitos y opcionalmente iniciar con +. ❌');
    }

    return true;
}

export function validarFecha(fecha) {
  const date = new Date(fecha);
  if (isNaN(date)) {
    return '⚠️ Fecha inválida. Usa formato YYYY-MM-DD';
  }
  return true;
}