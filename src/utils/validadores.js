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

    // Verifica que sea solo un número positivo sin símbolos ni letras
    // Permite enteros o decimales, sin signos
    const regex = /^\d+(\.\d+)?$/;

    if (!regex.test(trimmed)) {
        return chalk.red('❌ Solo se permiten números positivos sin letras ni signos. ❌');
    }

    const value = parseFloat(trimmed);

    if (isNaN(value) || value < 0) {
        return chalk.red('❌ Debes ingresar un número positivo válido. ❌');
    }

    return true;
}

export function validarTelefono(input) {
    const trimmed = input.trim();

    if (_.isEmpty(trimmed)) {
        return chalk.red('❌ El número de teléfono no puede estar vacío. ❌');
    }

    // Expresión: opcional + seguido SOLO de 7 a 15 dígitos
    const regex = /^\+?[0-9]{7,15}$/;

    if (!regex.test(trimmed)) {
        return chalk.red('❌ El número debe contener solo dígitos (y opcionalmente iniciar con +), sin letras ni símbolos. ❌');
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