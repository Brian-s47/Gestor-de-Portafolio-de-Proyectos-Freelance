import Finanzas from '../models/Finanza.js';
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';


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
        const cliente = await clientesCol.findOne({ _id: finanza.IdCliente });
        const proyecto = await proyectosCol.findOne({ _id: finanza.IdProyecto });

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

    if (!finanza) {
        throw new Error('❌ No se encontró el estado de cuenta del proyecto.');
    }

    if (monto > finanza.deudaActual) {
        throw new Error(`❌ El monto del abono ($${monto}) excede la deuda actual ($${finanza.deudaActual}).`);
    }

    const nuevaDeuda = Math.max(0, finanza.deudaActual - monto);
    const nuevoEstado = nuevaDeuda === 0 ? false : true;

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

    console.log(`✅ Egreso de $${costo.valor} agregado. Nuevo disponible: $${nuevoDisponible}`);
}




    