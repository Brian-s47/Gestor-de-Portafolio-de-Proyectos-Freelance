import Finanzas from '../models/Finanza.js';
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
import { abonoCliente } from './clientesService.js';
import { generarFacturaTXT, generarFacturaCostoTXT  } from '../utils/generarFactura.js';


export async function crearFinanza(data, collection) {
    try {
        const finanza = new Finanzas(data); // validación de campos
        // Verificar duplicados
        const duplicado = await collection.findOne({
            $or: 
                { idProyecto: finanza.idProyecto }
            
        });

        if (duplicado) {
            console.error('❌ Finanza duplicada. Ya existe una con el mismo ID de proyecto.');
            return;
        }
        await collection.insertOne(finanza);
        console.log('✅ Finanza creada:', finanza);
    } catch (error) {
        console.error('Error al crear la finanza:', error);
        throw error;
    }
}
        

export async function obtenerFinanzas(db) {
    const estadoDeCuentaCol = db.collection('estadoDeCuenta');
    const clientesCol = db.collection('clientes');
    const proyectosCol = db.collection('proyectos');

    const finanzas = await estadoDeCuentaCol.find().toArray();

    const finanzasConNombres = [];

    for (const finanza of finanzas) {
        const cliente = await clientesCol.findOne({ _id: finanza.idCliente });
        const proyecto = await proyectosCol.findOne({ _id: finanza.idProyecto });

        finanzasConNombres.push({
            ...finanza,
            nombreCliente: cliente?.nombre || 'Cliente no encontrado',
            nombreProyecto: proyecto?.nombredelproyecto || 'Proyecto no encontrado'
        });
    }

    return finanzasConNombres;
}


export async function listarFinanzas(db) {
    try {
        const finanzas = await obtenerFinanzas(db);
        console.log('📋 Lista de finanzas:');
        finanzas.forEach((finanza, i) => {
            console.log(`${i + 1}. Cliente: ${finanza.nombreCliente}, Proyecto: ${finanza.nombreProyecto}`);
            console.log(`   💰 Deuda Actual: $${finanza.deudaActual}`);
            console.log(`   📦 Valor Disponible: $${finanza.valorDisponible}`);
            const abonos = Array.isArray(finanza.abonos) ? finanza.abonos : [];
            if (abonos.length > 0) {
                abonos.forEach((abono, j) => {
                    console.log(`   ✅ Abono ${j + 1}: Descripcion: ${abono.descripcion} - Fecha: ${dayjs(abono.fecha).format('YYYY-MM-DD HH:mm')}, - Monto: $${abono.monto}`);
                });
            } else {
                console.log('   ❌ No hay abonos registrados.');
            }

            const costos = Array.isArray(finanza.costos) ? finanza.costos : [];
            if (costos.length > 0) {
                costos.forEach((costo, j) => {
                    console.log(`   ✅ Costo ${j + 1}: Descripcion: ${costo.descripcion} - Fecha: ${dayjs(costo.fecha).format('YYYY-MM-DD HH:mm')}, Valor: $${costo.valor}`);
                });
            } else {
                console.log('   ❌ No hay gastos registrados.');
            }
            if (finanza.estado === true){
                console.log(`   Estado: Activo`);
            }else{
                console.log(`   Estado: Inactivo`);
            }
            console.log('\n-----------------------\n');
        });
        return finanzas;
    } catch (error) {
        console.error('❌ Error al listar finanzas:', error.message);
    }
}


export async function registrarAbono(db, _id, monto, descripcion) {
    const collection = db.collection('estadoDeCuenta');
    const finanza = await collection.findOne({ _id: new ObjectId(_id) });
    const colecctionClientes = db.collection('clientes');

    if (!finanza) {
        throw new Error('❌ No se encontró el estado de cuenta del proyecto.');
    }

    if (monto > finanza.deudaActual) {
        throw new Error(`❌ El monto del abono ($${monto}) excede la deuda actual ($${finanza.deudaActual}).`);
    }

    const nuevaDeuda = Math.max(0, finanza.deudaActual - monto);
    const nuevoEstado = nuevaDeuda === 0 ? false : true;
    const pago = {
        idProyecto: finanza.idProyecto,
        descripcion,
        monto,
        fecha: new Date()
    };
    await abonoCliente(colecctionClientes, finanza.idCliente, monto, pago);

    const resultado = await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
            $inc: {
                valorDisponible: monto
            },
            $set: {
                deudaActual: nuevaDeuda,
                estado: nuevoEstado
            },
            $push: {
                abonos: {
                    descripcion: descripcion,
                    monto,
                    fecha: new Date()
                }
            }
        }
    );
    // Generar factura después de abonar
    const cliente = await colecctionClientes.findOne({ _id: new ObjectId(finanza.idCliente) });
    const nombreCliente = cliente?.nombre || finanza.idCliente;
    generarFacturaTXT({
        cliente: nombreCliente,
        proyecto: finanza.idProyecto, // o mejor el nombre si lo tienes
        monto,
        descripcion
    });
    return {
        monto,
        nuevaDeuda,
        nuevoEstado,
        actualizado: resultado.modifiedCount === 1
    };
}
export async function agregarCosto(collection, idProyecto, costo) {
    const finanza = await collection.findOne({ idProyecto });

    if (!finanza) {
        console.error('❌ No se encontró una finanza con ese ID de proyecto.');
        return;
    }

    if (finanza.valorDisponible < costo.valor) {
        console.error(`❌ Fondos insuficientes. Disponible: $${finanza.valorDisponible}, requerido: $${costo.valor}`);
        return;
    }

    const nuevoDisponible = finanza.valorDisponible - costo.valor;

    const resultado = await collection.updateOne(
        { idProyecto },
        {
            $inc: {
                valorDisponible: -costo.valor // restamos el egreso del disponible
            },
            $push: {
                costos: { ...costo, fecha: new Date() },
            },
            $set: {
                estado: true // aún activo
            }
        }
    );
    // Generar factura después de egreso
    const collectionClientes = db.collection('clientes');
    const cliente = await collectionClientes.findOne({ _id: new ObjectId(finanza.idCliente) });
    const nombreCliente = cliente?.nombre || finanza.idCliente;
    generarFacturaCostoTXT({
        cliente: nombreCliente,
        proyecto: finanza.idProyecto,
        valor: costo.valor,
        descripcion: costo.descripcion,
        tipo: costo.tipo || 'General'
    });
    
    console.log(`✅ Egreso de $${costo.valor} agregado. Nuevo disponible: $${nuevoDisponible}`);
}




    