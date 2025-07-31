// Importacion de librerias
import dayjs from 'dayjs';
import chalk from 'chalk';
import _ from 'lodash';

export function validarTextoNoVacioNiSimbolos(input) {
    if (_.isEmpty(input.trim())) {
        return chalk.red('❌ Este campo no puede estar vacío. ❌');
    }
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(input) ? true : chalk.red('❌ Solo letras y espacios son permitidos. ❌');
}

export function validarNumeroPositivo(input) {
    if (_.isEmpty(input.trim())) {
        return chalk.red('❌ Este campo no puede estar vacío. ❌');
    }
    const value = parseFloat(input);
    if (isNaN(value)) return chalk.red('❌ Debes ingresar un número válido. ❌');
    if (value < 0) return chalk.red('❌ El número no puede ser negativo. ❌');
    return true;
}


 export function validarFecha(input) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(input)) {
    return '❌ Formato inválido. Use YYYY-MM-DD (ej. 2025-09-15)';
  }

  const fecha = dayjs(input);
  return fecha.isValid()
    ? true
    : '❌ Fecha no válida (revisa días o meses inexistentes)';
}

export function validarTextoObligatorio(input) {
  if (typeof input !== 'string') return '❌ Entrada inválida.';
  const limpio = input.trim();
  return limpio.length > 0
    ? true
    : '❌ Este campo no puede estar vacío ni contener solo espacios.';
}