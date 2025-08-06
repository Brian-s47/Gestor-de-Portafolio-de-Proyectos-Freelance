// Zona de importacion de librerias
import inquirer from 'inquirer';
import dayjs from 'dayjs';
import chalk from 'chalk';
import boxen from 'boxen';
import { ObjectId } from 'mongodb';

// Zona de importacion de modulos
import Proyecto from '../models/Proyecto.js';
import Finanza from '../models/Finanza.js';
import { esperarTecla }  from '../cli/menus.js';
import { validarTextoNoVacioNiSimbolos, validarNumeroPositivo, validarFecha, validarTextoObligatorio } from '../utils/validadores.js'
import { AgregarDeudaCliente } from './clientesService.js';


// Funciones Especificas
// Seleccion de propuesta Aceptada
async function eleccionPropuesta(db){
    // Traemos las propuestas y filtramos las acpetadas
    const propuestasAceptadas = await db.collection('propuestas').find({ estado: 'aceptada' }).toArray();

    // Validacion que si existen Propuestas conese estado
    if (propuestasAceptadas.length === 0) {
        console.log('⚠️ No hay propuestas aceptadas para convertir en proyecto.');
        await esperarTecla();
        return null;
    }

    //Que el usuario elija la propuesta que se convertira en proyecto y capturamos su Id
    const { propuestaId } = await inquirer.prompt({
        type: 'list',
        name: 'propuestaId',
        message: 'Seleccione la propuesta que desea convertir en proyecto:',
        choices: propuestasAceptadas.map(propuesta => ({
            name: propuesta.nombrepropuesta,
            value: propuesta._id.toString()
        }))
    })

    // Obtenermos el objeto completo para embeberlo en el proyecto: 
    return propuestasAceptadas.find(p => p._id.toString() === propuestaId);
};
// Creacion de objeto contrato 
async function crearContrato(cliente){
    // inicializamos variables para condiciones y bandera de ciclo while
    const condiciones = [];
    let agregarMas = true; // Bandera

    while(agregarMas){
        const { condicion } = await inquirer.prompt({
            type: 'input',
            name: 'condicion',
            message: ' Ingrese una condicion para el contrato:',
            validate: input => input.trim() !== '' ? true : 'Debe ingresar una condición.' // que no sea vacio
        });
        // Agregamos la condicion al array
        condiciones.push(condicion);
        // validar si el usuario desea ingresar mas condiciones
        const { continuar } = await inquirer.prompt({
            type: 'confirm',
            name: 'continuar',
            message: '¿Desea agregar otra condición?',
            default: true
        });
        agregarMas = continuar;
    }

    // Solicitamos fecha de inicio y final de contrato
    const { fecha_inicio, fecha_fin } = await inquirer.prompt([
        {
            type: 'input',
            name: 'fecha_inicio',
            message: 'Fecha de inicio (YYYY-MM-DD):',
            validate: validarFecha
        },
        {
            type: 'input',
            name: 'fecha_fin',
            message: 'Fecha de finalización (YYYY-MM-DD):',
            validate: validarFecha
        }
    ]);

    // Solicitamos el presupuesto inicial
    const { presupuestoInicial } = await inquirer.prompt({
        type: 'input',
        name: 'presupuestoInicial',
        message: 'Presupuesto inicial del proyecto:',
        validate: validarNumeroPositivo
    });

    //Solicitamos nombre del desarrollador
    const { desarrollador } = await inquirer.prompt({
        type: 'input',
        name: 'desarrollador',
        message: 'Nombre del desarrollador responsable:',
        validate: validarTextoNoVacioNiSimbolos
    });

    // Retornamos los datos en un objeto para embeber
    return {
        condiciones,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        presupuestoInicial: parseInt(presupuestoInicial),
        cliente: cliente._id, // Referenciado
        desarrollador
    };

};
//Funcion editada de aqui a 
// Crear Entregable
async function crearEntregable(){
    
    const { descripcion, fechadeentrega, estado, link } = await inquirer.prompt([
        {
            type: 'input',
            name: 'descripcion',
            message: 'Descripción del entregable:',
            validate: input => input.trim() !== '' ? true : 'La descripción no puede estar vacía.'
        },
        {
            type: 'input',
            name: 'fechadeentrega',
            message: 'Fecha de entrega (YYYY-MM-DD):',
            validate: validarFecha
        },
        {
            type: 'list',
            name: 'estado',
            message: 'Seleccione el estado del entregable',
            choices: ["pendiente", "entregado", "aprobado", "rechazado"] //modificada esta linea , antes estaba esto:['pendiente', 'completado']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Escriba el linck de la evidencia del entregable:',
            validate: input => input.trim() !== '' ? true : 'La descripción no puede estar vacía.'
        }
    ]);
        const entregable = {
            descripcion,
            fechadeentrega: new Date(fechadeentrega),
            estado: estado,
            link: link,
            historial:[]
        };
    return entregable;
}
//aqui

// Seleccionar Proyecto
async function seleccionarProyecto(db){
    // Traemos los proyectos con estado activo
    const proyectosActivos = await db.collection('proyectos').find({estado: { $in: ['activo', 'pausado']}}).toArray();
    // Validacion que si existen Propuestas conese estado
    if (proyectosActivos.length === 0) {
        console.log('⚠️ No hay proyectos activos.');
        await esperarTecla();
        return;
    }

    //Que el usuario elija el proyecto para trabajar
    const { proyectoId } = await inquirer.prompt({
        type: 'list',
        name: 'proyectoId',
        message: 'Seleccione el proyecto con el que desea trabajar',
        choices: proyectosActivos.map(proyecto => ({
            name: `${proyecto.nombredelproyecto} - Cliente: ${proyecto.contrato?.cliente?.nombre || 'Desconocido'}`,
            value: proyecto._id.toString()
        }))
    })
    // Retornamos el Id del proyecto para trabajar en el
    return proyectoId;
};

// Funciones de CRUD
// Crear Proyecto
async function crearProyectoTransaccion(db){
    // Creamos session para transaccion
    const session = db.client.startSession();

    //Iniciamos try/catch de trasaccion
    try {
        await session.withTransaction(async () => {
            // Paso 1: Ususario alije propuesta "Aceptada" para subir a proyecto
        const propuesta = await eleccionPropuesta(db);
        if(!propuesta) return; // Caso de Error

        // Paso 2: Usuario ingresa Nombre y descripcion del Proyecto
        const { nombre, descripcion} = await inquirer.prompt([
            {
                type: 'input',
                name: 'nombre',
                message: 'Nombre del Proyecto:',
                validate: validarTextoNoVacioNiSimbolos
            },
            {
                type: 'input',
                name: 'descripcion',
                message: 'Descripcion de la Propuesta:',
                validate: validarTextoObligatorio
            }
        ]);

        // Paso 3: Obtener el cliente
        const clienteEmbebido = await db.collection('clientes').findOne({ _id: propuesta.cliente });
        const clienteId = new ObjectId(clienteEmbebido._id);

        // Paso 4: Crear Contrato con funcion Externa
        const contrato = await crearContrato(clienteEmbebido);
        const presupuesto = contrato.presupuestoInicial; // Traemos el presupuesto para la estancia de Finanza

        // Paso 5: Instanciamo Proyecto
        const nuevoProyecto = new Proyecto(
            nombre,
            [descripcion],
            propuesta,
            [],
            contrato,
            clienteId,
            null
        );

        // Paso 6: Insertamos proyecto en DB
        const { insertedId: idProyecto } = await db.collection('proyectos').insertOne(
            { 
                ...nuevoProyecto, // todos los datos de Proyecto
                estadoDeCuenta: null // temporalmente null, para que cumpla el schema
            },
            { session }
        );

        // Paso 7: Instanciamos finanzas para este proyecto
        const nuevaFinanza = new Finanza({
            idCliente: clienteId,
            idProyecto,
            deudaActual: presupuesto,
            valorDisponible: 0,
            abonos: [],
            costos: [],
            estado: true
        });

        // Paso 8: Insertamos finanzas en DB
        const { insertedId: idFinanza } = await db.collection('estadoDeCuenta').insertOne(nuevaFinanza, { session });
        await AgregarDeudaCliente(clienteId, presupuesto, db, session); // Actualizamos la deuda del cliente

        // Paso 9: Actualizamos finanza referenciada en proyecto
        await db.collection('proyectos').updateOne(
            { _id: idProyecto },
            { $set: { estadoDeCuenta: idFinanza } },
            { session }
        );
        // Si todo sale bien imprimimos en consola
        console.log(`Se crea el Proyecto ${nombre}`)
        // Paso 10: Asociar el ID del proyecto al cliente (agregar al array de proyectos)
        await db.collection('clientes').updateOne(
            { _id: clienteId },
            { $push: { proyectos: idProyecto } },
            { session } // importante: mantener en la misma transacción
        );
    });    
    }catch (error) {
        console.error('❌ Error en la transacción:', error.message);
        if (error.errInfo?.details) {
            console.dir(error.errInfo.details, { depth: null });
        }
    await esperarTecla();
    } finally {
        await session.endSession();
        await esperarTecla()
    }
};
// modificacion de codigo aqui
// Insertar Entregable 
async function insertarEntregables(id, db) {
    const entregable = await crearEntregable();

    await db.collection('proyectos').updateOne(
        { _id: new ObjectId(id) },
        { $push: { entregables: entregable } }
    );



    console.log('Se ha registrado el entregable correctamente');
    await esperarTecla();

}

// modificacion de codigo antes de aqui



// Actualizar estado
async function actualizarEstado(id, db){
    const { nuevoEstado } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nuevoEstado',
            message: 'Seleccione el Nuevo Estado',
            choices: ['activo', 'pausado', 'finalizado', 'cancelado']
        }
    ]);
    // Cambiamos estado segun ID en coleccion
        await db.collection('proyectos').updateOne(
        { _id: new ObjectId(id) },
        { $set: { estado: nuevoEstado } }
    );
    console.log('Se ha acctualizado el estado correctamente')
    await esperarTecla();
};
// Actualizar Fecha Final
async function actualizarFechaFinal(id, db){
    const { fechaFin } = await inquirer.prompt([
        {
            type: 'input',
            name: 'fechaFin',
            message: 'Fecha de Final (YYYY-MM-DD):',
            validate: validarFecha
        },
    ]);
    // Cambiamos Fecha final segun ID en coleccion
    await db.collection('proyectos').updateOne(
        { _id: new ObjectId(id) },
        { $set: { 'contratos.fecha_fin': new Date(fechaFin) } }
    );
    console.log('Se ha actualizado la fecha final correctamente')
    await esperarTecla();
};
// Actualizar Entregables
async function actualizarEntregables(id, db){
    const proyecto = await db.collection('proyectos').findOne({ _id: new ObjectId(id) });

    if (!proyecto || !proyecto.entregables || proyecto.entregables.length === 0) {
        console.log('⚠️ Este proyecto no tiene entregables registrados.');
        await esperarTecla();
        return;
    }

    const { indexEntregable } = await inquirer.prompt({
        type: 'list',
        name: 'indexEntregable',
        message: 'Seleccione el entregable a editar:',
        choices: proyecto.entregables.map((entregable, index) => ({
            name: `${index + 1}. ${entregable.descripcion}`,
            value: index
        }))
    });
    

    const { campoActualizar } = await inquirer.prompt({
        type: 'list',
        name: 'campoActualizar',
        message: '¿Qué desea actualizar?',
        choices: ['estado', 'link']
    });

    let updateValue;
    let updateHistorial
    if (campoActualizar === 'estado') {
        
        const estadoViejo = proyecto.entregables[indexEntregable].estado
        console.log(estadoViejo)

        const { nuevoEstado } = await inquirer.prompt({
            type: 'list',
            name: 'nuevoEstado',
            message: 'Seleccione el nuevo estado:',
            choices: ['pendiente', 'entregado', 'aprobado', 'rechazado']
        });
        const historialEstado= {estadoAnterior: estadoViejo, 
            nuevoEstado: nuevoEstado, 
            fecha: new Date()
        }
        updateHistorial = { [`entregables.${indexEntregable}.historial`]: historialEstado }
        try {
            await db.collection('proyectos').updateOne(
                { _id: new ObjectId(id) },
                { $push: updateHistorial }
            );
            
        } catch (error) {
            console.log(error, error.message)
            
        }

        updateValue = { [`entregables.${indexEntregable}.estado`]: nuevoEstado };

        


    } else {
        const { nuevoLink } = await inquirer.prompt({
            type: 'input',
            name: 'nuevoLink',
            message: 'Ingrese el nuevo enlace de evidencia:',
            validate: input => input.trim() !== '' ? true : '⚠️ El enlace no puede estar vacío.'
        });
        updateValue = { [`entregables.${indexEntregable}.link`]: nuevoLink };
    }

    await db.collection('proyectos').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateValue }
    );

    console.log('✅ Entregable actualizado correctamente.');
    await esperarTecla();
};
// Listar Proyectos
async function listarProyectos(db) {
    const proyectos = await db.collection('proyectos').find().toArray();

    if (proyectos.length === 0) {
        console.log(`⚠️ No se tienen Proyectos registrados`);
        await esperarTecla();
        return;
    }

    const titulo = chalk.bold.cyan('📋 Listado de Proyectos');
    console.log(boxen(titulo, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
        align: 'center'
    }));
    const linea = chalk.gray('────────────────────────────────────────────');

    // Obtener todos los clientes una vez para evitar múltiples consultas
    const clientes = await db.collection('clientes').find().toArray();

    const proyectosVisibles = proyectos.map((proyecto) => {
        const propuesta = proyecto.propuesta || {};
        const contrato = proyecto.contratos || {};

        const clienteId = contrato.cliente?.$oid || contrato.cliente || proyecto.cliente?.$oid || proyecto.cliente;
        const clienteEncontrado = clientes.find(c => c._id.toString() === clienteId?.toString());
        const clienteNombre = clienteEncontrado?.nombre || 'Desconocido';

        const fechaInicio = contrato.fecha_inicio ? dayjs(contrato.fecha_inicio).format('DD/MM/YYYY') : 'N/D';
        const fechaFin = contrato.fecha_fin ? dayjs(contrato.fecha_fin).format('DD/MM/YYYY') : 'N/D';

        return {
            Proyecto: proyecto.nombredelproyecto,
            Cliente: clienteNombre,
            Propuesta: propuesta.nombrepropuesta || propuesta.nombre || "Sin nombre",
            Precio: propuesta.precio || "No definido",
            Plazo: `${fechaInicio} - ${fechaFin}`,
            Estado: proyecto.estado,
            Presupuesto: contrato.presupuestoInicial || "No definido",
            Desarrollador: contrato.desarrollador || "Sin asignar"
        };
    });

    console.table(proyectosVisibles);
    console.log(linea);
    await esperarTecla();
};
// Listar Proyectos de un cliente
async function listarProyectosCliente(db, idCliente){
    // Traemos todos los proyectos Actuales del cliente
    const proyectos = await db.collection('proyectos').find({cliente: idCliente}).toArray();

    // Validacion de que si se tengan proyectos registrados al cliente
    if (proyectos.length === 0) {
        console.log(`⚠️ No se tienen Proyectos registrados actualmente`);
        await esperarTecla();
        return;
    }

    //Titulo de la visual de la tabla de proyectos
    const titulo = chalk.bold.cyan('📋 Listado de Proyectos');
    console.log(boxen(titulo, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
        align: 'center'
    }));

    const linea = chalk.gray('────────────────────────────────────────────');

    // Obtenemos todos los clientes una vez para asociar por ID
    const clientes = await db.collection('clientes').find().toArray();

    const proyectosVisibles = proyectos.map((proyecto) => {
        const propuesta = proyecto.propuesta || {};
        const contrato = proyecto.contratos || {};

        const clienteId = contrato.cliente?.$oid || contrato.cliente || proyecto.cliente?.$oid || proyecto.cliente;
        const clienteEncontrado = clientes.find(c => c._id.toString() === clienteId?.toString());
        const clienteNombre = clienteEncontrado?.nombre || "Desconocido";

        const fechaInicio = contrato.fecha_inicio ? dayjs(contrato.fecha_inicio).format('DD/MM/YYYY') : 'N/D';
        const fechaFin = contrato.fecha_fin ? dayjs(contrato.fecha_fin).format('DD/MM/YYYY') : 'N/D';

        return {
            Proyecto: proyecto.nombredelproyecto,
            Cliente: clienteNombre,
            Propuesta: propuesta.nombrepropuesta || propuesta.nombre || "Sin nombre",
            Precio: propuesta.precio || "No definido",
            Plazo: `${fechaInicio} - ${fechaFin}`,
            Estado: proyecto.estado,
            Presupuesto: contrato.presupuestoInicial || "No definido",
            Desarrollador: contrato.desarrollador || "Sin asignar",
            Entregables: proyecto.entregables?.length || 0
        };
    });

    // Imprimir tabla general
    console.table(proyectosVisibles);
    console.log(linea);

    // Preguntar si desea ver detalle de entregables
    const { verDetalle } = await inquirer.prompt({
        type: 'confirm',
        name: 'verDetalle',
        message: '¿Desea ver el detalle de entregables de cada proyecto?',
        default: false
    });

    if (verDetalle) {
        for (const proyecto of proyectos) {
            const entregables = proyecto.entregables || [];

            console.log(chalk.bold.yellow(`📦 Entregables del proyecto: ${proyecto.nombredelproyecto}`));

            if (entregables.length === 0) {
                console.log('⚠️ No hay entregables registrados para este proyecto.\n');
                continue;
            }

            const tablaEntregables = entregables.map((ent, index) => ({
                Nº: index + 1,
                Descripción: ent.descripcion,
                Fecha: dayjs(ent.fechadeentrega).format('DD/MM/YYYY'),
                Estado: ent.estado,
                Link: ent.link || 'Sin link'
            }));

            console.table(tablaEntregables);
        }
    }

    await esperarTecla();
}

async function listarHistorial(proyectoId,db){
    const proyecto = await db.collection('proyectos').findOne({_id:new ObjectId(proyectoId)})
    // Validacion que si existen Propuestas conese estado
    if (proyecto.entregables.length === 0) {
        console.log('⚠️ No hay propuestas entregables en este proyecto');
        await esperarTecla();
        return null;
    }
    const { entregableId } = await inquirer.prompt({
        type: 'list',
        name: 'entregableId',
        message: 'Seleccione un entregable:',
        choices: proyecto.entregables.map((e,index) => ({
            name: e.descripcion,
            value: index
        }))
    })
    await listar(entregableId,db,proyectoId)
    return 


};

async function listar(entregableId,db,proyectoId){
    const proyecto = await db.collection('proyectos').findOne({_id:new ObjectId(proyectoId)})

    
    
    const entregable = proyecto.entregables[entregableId]
    const historial = entregable.historial
    console.log(`Nombre: ${entregable.descripcion}`)
    console.table(historial)
    
    await esperarTecla()

}

export { seleccionarProyecto, crearProyectoTransaccion, insertarEntregables, actualizarEstado, actualizarFechaFinal, listarProyectos, listarProyectosCliente, actualizarEntregables, listarHistorial };
