// Zona de importacion de librerias
import dayjs from 'dayjs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import { ObjectId } from 'mongodb';

// Zona de importacion de modulos
import Propuesta from '../models/Propuesta.js';
import { esperarTecla }  from '../cli/menus.js';
import { validarTextoNoVacioNiSimbolos, validarNumeroPositivo, validarFecha } from '../utils/validadores.js'

// Solicitar datos
async function solictarDatosPropuesta(db) {
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
    const clientesActuales = await db.collection('clientes').find().toArray();
    const { clienteId } = await inquirer.prompt({ 
        type: 'list',
        name: 'clienteId',
        message: 'Clientes:',
        choices: clientesActuales.map(c => ({
            name: c.nombre,
            value: c._id.toString()
        }))
    });
    return {
        nombre,
        descripcion,
        precio: parseInt(precio),
        fechaInicial,
        fechaFinal,
        cliente: new ObjectId(clienteId)
    };
};
// Crear Propuesta
async function crearPropuesta(db){
    const datosPropuesta = await solictarDatosPropuesta(db);
    const propuesta = new Propuesta(datosPropuesta.nombre, datosPropuesta.descripcion, datosPropuesta.precio, datosPropuesta.fechaInicial, datosPropuesta.fechaFinal, datosPropuesta.cliente) // Instanciamos Propuesta
    const propuestas = db.collection('propuestas');
    try {
        const resultado = await propuestas.insertOne(propuesta);
        console.log('✅ Propuesta guardada en la base de datos con Nombre:', propuesta.nombre);
        return resultado;
    } catch (error) {
        console.error('❌ Error al insertar propuesta:', error.message);
        throw error;
    }
};
// Listar Propuestas
async function listarPropuestas(db){
    // Obtenermos las propuestas actuales
    const propuestas = await db.collection('propuestas').find().toArray();
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
        
        // Obtener el nombre del cliente
        const clientes = db.collection('clientes');

        const propuestasVisibles = await Promise.all(
        propuestas.map(async (propuesta) => {
            const datosCliente = await clientes.findOne({ _id: new ObjectId(propuesta.cliente) });

            const fechaFormateadaInicio = dayjs(propuesta.plazos[0]).format('DD/MM/YYYY');
            const fechaFormateadaFinal = dayjs(propuesta.plazos[1]).format('DD/MM/YYYY');

            return {
                nombrepropuesta: propuesta.nombre ?? propuesta.nombrepropuesta,
                descripcion: propuesta.descripcion,
                precio: propuesta.precio,
                plazos: [fechaFormateadaInicio, fechaFormateadaFinal],
                cliente: datosCliente?.nombre ?? "Desconocido",
                estado: propuesta.estado,
            };
        })
    );
        console.table(propuestasVisibles)
        console.log(linea);
        await esperarTecla();
    }
};
// Modificar Propuesta
async function modifiarPropuesta(db){
    // Obtenermos las propuestas actuales
    const propuestas = await db.collection('propuestas').find().toArray();
    // Validacion de que si exista almenos una Propuesta registrada
    if (propuestas.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen Propuestas registradas ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona una Propuesta para Editar:',
        choices: propuestas.map(propuesta => ({ name: propuesta.nombre, value: propuesta._id }))
    }
    ]);
    const { atributoCambiar, datoNuevo } = await inquirer.prompt([
        {
            type: 'list',
            name: 'atributoCambiar',
            message: 'Seleccione el dato que desea editar',
            choices: ['nombre', 'descripcion', 'precio', 'fechaInicial', 'fechafinal', 'cliente']
        },
        {
            type: 'input',
            name: 'datoNuevo',
            message: `Ingrese el nuevo dato: `,
        }
    ]);
    // Condicional paara cambiar dato segun seleccionado
    const dbPropuestas = db.collection('propuestas');
    switch (atributoCambiar) { 
            case 'nombre':
                await dbPropuestas.updateOne(
                { _id: new ObjectId(id) }, 
                {
                    $set: {nombre: datoNuevo}
                });
                console.log('Se modifico correctamente el nombre');
                break;
            case 'descripcion':
                await dbPropuestas.updateOne(
                { _id: new ObjectId(id) }, 
                {
                    $set: {descripcion: datoNuevo}
                });
                console.log('Se modifico correctamente la descripcion');
                break;
            case 'precio':
                await dbPropuestas.updateOne(
                { _id: new ObjectId(id) }, 
                {
                    $set: {precio: parseInt(datoNuevo)}
                });
                console.log('Se modifico correctamente el precio');
                break;
            case 'fechaInicial':
                await dbPropuestas.updateOne(
                { _id: new ObjectId(id) }, 
                {
                    $set: {fechaInicial: datoNuevo}
                });
                console.log('Se modifico correctamente la fecha inicial');
                break;
            case 'fechafinal':
                await dbPropuestas.updateOne(
                { _id: new ObjectId(id) }, 
                {
                    $set: {fechafinal: datoNuevo}
                });
                console.log('Se modifico correctamente la fecha final');
                break;
            case 'cliente':
                await dbPropuestas.updateOne(
                { _id: new ObjectId(id) }, 
                {
                    $set: {cliente: datoNuevo}
                });
                console.log('Se modifico correctamente el cliente');
                break;
            default:
                throw new Error(`El atributo no es modificable.`);
            }
};
// Cambiar Estado Propuesta
async function cambiarEstadoPropuesta(db){
    // Obtenermos las propuestas actuales
    const propuestas = await db.collection('propuestas').find().toArray();
    // Validacion de que si exista almenos una Propuesta registrada
    if (propuestas.length === 0) {
        console.log(chalk.yellow('⚠️ No se tienen Propuestas registradas ⚠️'));
        return;
    }
    const { id } = await inquirer.prompt([
    {
        type: 'list',
        name: 'id',
        message: 'Selecciona una Propuesta para Editar:',
        choices: propuestas.map(propuesta => ({ name: propuesta.nombre, value: propuesta._id }))
    }
    ]);
    const { nuevoEstado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nuevoEstado',
            message: 'Seleccione el Nuevo Estado',
            choices: ['pendiente', 'aceptada', 'rechazada']
        }
    ]);
    // Cambiamos estado segun ID en coleccion
    const coleccion = db.collection('propuestas');
    await coleccion.updateOne({ _id: new ObjectId(id) },
        { $set: { estado: nuevoEstado }});
};

export { crearPropuesta, modifiarPropuesta, listarPropuestas, cambiarEstadoPropuesta };