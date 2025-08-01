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

  const [year, month, day] = input.split('-').map(Number);

  // Validación manual de mes
  if (month < 1 || month > 12) {
    return '❌ Mes inválido (debe estar entre 01 y 12)';
  }

  // Validación manual de día: verifica que exista en el mes/año dado
  const fecha = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD', true);
  if (!fecha.isValid() || fecha.date() !== day) {
    return '❌ Día inválido para el mes especificado';
  }

  // Validación que no sea anterior a hoy
  const hoy = dayjs().startOf('day');
  if (fecha.isBefore(hoy)) {
    return '❌ La fecha no puede ser anterior a la fecha actual';
  }

  return true;
};

export function validarTextoObligatorio(input) {
  if (typeof input !== 'string') return '❌ Entrada inválida.';
  const limpio = input.trim();
  return limpio.length > 0
    ? true
    : '❌ Este campo no puede estar vacío ni contener solo espacios.';
}