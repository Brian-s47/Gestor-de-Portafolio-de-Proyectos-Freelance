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
    const clientesActuales = await db.collection('clientes').find({ estado: true }).toArray();
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
        nombrepropuesta: nombre,
        descripcion,
        precio: parseInt(precio),
        fechaInicial,
        fechaFinal,
        cliente: new ObjectId(clienteId)
    };
};
// Crear Propuesta
async function crearPropuesta(db, datosOpcionales = null) {
    let datosPropuesta;

    if (
        datosOpcionales &&
        datosOpcionales.nombre &&
        datosOpcionales.descripcion &&
        datosOpcionales.precio &&
        datosOpcionales.fechaInicial &&
        datosOpcionales.fechaFinal &&
        datosOpcionales.clienteId
    ) {
        datosPropuesta = {
            nombrepropuesta: datosOpcionales.nombre,
            descripcion: datosOpcionales.descripcion,
            precio: parseInt(datosOpcionales.precio),
            fechaInicial: new Date(datosOpcionales.fechaInicial),
            fechaFinal: new Date(datosOpcionales.fechaFinal),
            estado: 'pendiente',
            cliente: new ObjectId(datosOpcionales.clienteId)
        };
    } else {
        datosPropuesta = await solictarDatosPropuesta(db);
    }

    const propuesta = new Propuesta(
        datosPropuesta.nombrepropuesta,
        datosPropuesta.descripcion,
        datosPropuesta.precio,
        datosPropuesta.fechaInicial,
        datosPropuesta.fechaFinal,
        datosPropuesta.estado,
        datosPropuesta.cliente
    );

    const propuestas = db.collection('propuestas');

    try {
        const resultado = await propuestas.insertOne(propuesta);

        // ✅ Relacionar con el cliente
        await db.collection('clientes').updateOne(
            { _id: propuesta.cliente },
            { $push: { propuestas: resultado.insertedId } }
        );

        propuesta._id = resultado.insertedId; // 👈 aquí le inyectamos el ID generado

        console.log('✅ Propuesta guardada con Nombre:', propuesta.nombrepropuesta);

        return propuesta; // ✅ devolvemos la propuesta completa
    } catch (error) {
        console.error('❌ Error al insertar propuesta:', error.message);
        await esperarTecla?.();
        throw error;
    }
}




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
                nombrepropuesta: propuesta.nombrepropuesta,
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
// Listar propuestas por Cliente
async function listarPropuestasCliente(db, idCliente){
    // Obtenermos las propuestas actuales asosiadas al cliente
    const propuestas = await db.collection('propuestas').find({cliente: idCliente}).toArray();
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
                nombrepropuesta: propuesta.nombrepropuesta,
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
        choices: propuestas.map(propuesta => ({ name: propuesta.nombrepropuesta, value: propuesta._id }))
    }
    ]);
    const { atributoCambiar } = await inquirer.prompt([
    {
        type: 'list',
        name: 'atributoCambiar',
        message: 'Seleccione el dato que desea editar:',
        choices: ['nombre', 'descripcion', 'precio', 'fechaInicial', 'fechafinal', 'cliente']
    }
]);

    // Luego solicita el nuevo valor con validación dinámica según el atributo (solo si no es cliente)
    let datoNuevo;
    if (atributoCambiar !== 'cliente') {
        const respuesta = await inquirer.prompt([
            {
                type: 'input',
                name: 'datoNuevo',
                message: `Ingrese el nuevo dato para ${atributoCambiar}:`,
                validate: (input) => {
                    if (atributoCambiar === 'precio') {
                        const valor = parseInt(input);
                        if (isNaN(valor) || valor <= 0) {
                            return '⚠️ Por favor ingresa un número válido mayor que cero.';
                        }
                    }

                    if (['fechaInicial', 'fechafinal'].includes(atributoCambiar)) {
                        const fecha = new Date(input);
                        if (isNaN(fecha.getTime())) {
                            return '⚠️ Por favor ingresa una fecha válida en formato YYYY-MM-DD.';
                        }
                    }

                    if (['nombre', 'descripcion'].includes(atributoCambiar)) {
                        if (!input.trim()) {
                            return '⚠️ Este campo no puede estar vacío.';
                        }
                    }

                    return true;
                }
            }
        ]);
        datoNuevo = respuesta.datoNuevo;
    }

    // Condicional paara cambiar dato segun seleccionado
    const dbPropuestas = db.collection('propuestas');
    const propuestaSeleccionada = await dbPropuestas.findOne({ _id: new ObjectId(id) });
    switch (atributoCambiar) { 
            case 'nombre':
                await dbPropuestas.updateOne(
                { _id: new ObjectId(id) }, 
                {
                    $set: {nombrepropuesta: datoNuevo}
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
            case 'fechafinal': {
                    // Validar con función externa
                    const validacion = validarFecha(datoNuevo);
                    if (validacion !== true) {
                        console.log(chalk.red(validacion));
                        break;
                    }
                
                    const nuevaFecha = new Date(datoNuevo);
                    const plazos = propuestaSeleccionada.plazos || [null, null];
                
                    if (atributoCambiar === 'fechaInicial') {
                        plazos[0] = nuevaFecha;
                    } else {
                        plazos[1] = nuevaFecha;
                    }
                
                    await dbPropuestas.updateOne(
                        { _id: new ObjectId(id) },
                        { $set: { plazos } }
                    );
                
                    console.log(`✅ Se modificó correctamente la ${atributoCambiar === 'fechaInicial' ? 'fecha inicial' : 'fecha final'}`);
                    break;
                }
            case 'cliente': {
                const clientesActivos = await db.collection('clientes').find({ estado: true }).toArray();

                if (clientesActivos.length === 0) {
                    console.log(chalk.yellow('⚠️ No hay clientes activos disponibles para asignar ⚠️'));
                    break;
                }

                const { clienteId } = await inquirer.prompt({
                    type: 'list',
                    name: 'clienteId',
                    message: 'Seleccione el nuevo cliente asociado a la propuesta:',
                    choices: clientesActivos.map(c => ({
                        name: `${c.nombre} (${c.cedula})`,
                        value: c._id.toString()
                    }))
                });

                await db.collection('propuestas').updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { cliente: new ObjectId(clienteId) } }
                );

                console.log('✅ Se modificó correctamente el cliente asociado a la propuesta');
                break;
            }
        }
    await esperarTecla();
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
        choices: propuestas.map(propuesta => ({ name: propuesta.nombrepropuesta, value: propuesta._id }))
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
    await coleccion.updateOne(
        { _id: new ObjectId(id) },
        { $set: { estado: nuevoEstado }}
    );
    console.log( `Se realizo el cambio de estado de la propuesta a: ${nuevoEstado}` )
    await esperarTecla();
};
export { crearPropuesta, modifiarPropuesta, listarPropuestas, cambiarEstadoPropuesta, listarPropuestasCliente };
