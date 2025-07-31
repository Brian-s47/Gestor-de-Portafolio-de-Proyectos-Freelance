import Finanzas from '../models/Finanza.js';

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
            console.log(`   ✅ Abonos: ${finanza.abonos.length}, 🧾 Costos: ${finanza.costos.length}`);
            console.log('---');
        });
    } catch (error) {
        console.error('❌ Error al listar finanzas:', error.message);
    }
}


export async function agregarAbono(collection, idProyecto, monto) {
    const finanza = await collection.findOne({ idProyecto });
    if (!finanza) {
        console.error('❌ No se encontró una finanza con ese ID de proyecto.');
        return;
    }

    const nuevaDeuda = Math.max(0, finanza.deudaActual - monto);
    const nuevoEstado = nuevaDeuda === 0 ? false : true;

    const resultado = await collection.updateOne(
        { idProyecto },
        {
            $inc: {
                valorDisponible: monto * 1, // se suma al disponible
            },
            $set: {
                deudaActual: nuevaDeuda,
                estado: nuevoEstado
            },
            $push: {
                abonos: { monto, fecha: new Date() }
            }
        }
    );

    console.log(`✅ Abono de $${monto} registrado. Deuda restante: $${nuevaDeuda}. Estado: ${nuevoEstado ? 'Activo' : 'Inactivo'}`);
}

export async function agregarCosto(collection, idProyecto, costo) {
    const finanza = await collection.findOne({ idProyecto });
    if (!finanza) {
        console.error('❌ No se encontró una finanza con ese ID de proyecto.');
        return;
    }

    const nuevaDeuda = finanza.deudaActual + costo.valor;

    const resultado = await collection.updateOne(
        { idProyecto },
        {
            $inc: {
                deudaActual: costo.valor
            },
            $push: {
                costos: { ...costo, fecha: new Date() },
            },
            $set: {
                estado: true // cualquier nuevo costo vuelve a activar
            }
        }
    );

    console.log(`✅ Egreso de $${costo.valor} agregado. Nueva deuda: $${nuevaDeuda}`);
}




    