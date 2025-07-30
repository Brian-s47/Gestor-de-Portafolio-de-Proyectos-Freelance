// Zona de importacion de librerias
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';

// Zona de importacion de modulos
import Propuesta from '../models/Propuesta.js';
import Cliente from '../models/Cliente.js';
import {esperarTecla}  from '../cli/menus.js';
import { validarTextoNoVacioNiSimbolos, validarNumeroPositivo, validarFecha } from '../utils/validadores.js'

// Solicitar datos
async function solictarDatosPropuesta() {
    const { nombre, descripcion, precio, fechaInicial, fechaFinal} = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Nombre de la Propuesta:',
            validate: validarTextoNoVacioNiSimbolos
        },
        {
            type: 'input',
            name: 'descripcion',
            message: 'Descripcion de la Propuesta:',
        },
        {
            type: 'input',
            name: 'precio',
            message: 'Precio de la Propuesta:',
            validate: validarNumeroPositivo
        },
        {
            type: 'input',
            name: 'fechaInicial',
            message: 'Fecha de inicio de la Propuesta en formato (YYYY-MM-DD): ',
            validate: validarFecha
        },
        {
            type: 'input',
            name: 'fechaFinal',
            message: 'Fecha de finalizacion de la Propuesta en formato (YYYY-MM-DD):',
            validate: validarFecha
        }
    ]);

    // Obtener el Id del cliente que se le asosiara la propuesta
    const clientesActuales = await Cliente.getClientes();
    const { clienteId } = await inquirer.prompt({ 
        type: 'list',
        name: 'clienteId',
        message: 'Clientes:',
        choices: clientesActuales.map(c => ({
            name: c.nombre,
            value: c._id.toString()
        }))
    });
    const datosCliente = await Cliente.getCliente(clienteId)
    return {
        nombre,
        descripcion,
        precio: parseInt(precio),
        fechaInicial,
        fechaFinal,
        datosCliente
    };
}
// Crear Propuesta
async function crearPropuesta(nombre, descripcion, precio, fechaInicial, fechaFinal, cliente){
    const propuesta = new Propuesta(nombre, descripcion, precio, fechaInicial, fechaFinal, cliente) // Instanciamos Propuesta
    await Propuesta.setPropuesta(propuesta)
    await esperarTecla();
}  
// Listar Propuestas
// Listar Clientes
async function listarPropuestas(){
    // Obtenermos las propuestas actuales
    const propuestas = await Propuesta.getPropuestas()
    // Validacion si existen propuestas
    if(propuestas.lenhgth === 0){
        console.log(`No se tienen Propuestas registrados`); // Mensaje de error no existen propuestas
        await esperarTecla();
    } else{
        const titulo = chalk.bold.cyan('📋 Listado de Propuestas') 
          console.log(boxen(titulo, {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'green',
                align: 'center'
            }));
        const linea = chalk.gray('────────────────────────────────────────────')
        console.log(titulo)
        const propuestasVisibles = propuestas.map(({ _id, id, ...rest }) => rest);
        console.table(propuestasVisibles)
        console.log(linea);
        await esperarTecla();
    }
}

export { solictarDatosPropuesta, crearPropuesta, listarPropuestas };