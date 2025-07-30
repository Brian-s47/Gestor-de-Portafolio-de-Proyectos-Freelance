import conectarDB from '../config/db.js';
import Cliente from '../models/Cliente.js';
import { ObjectId } from 'mongodb';

const dbName = 'gestordeproyectos';

/**
 * crearCliente
 */
export async function crearCliente(data) {
    try {
        const cliente = new Cliente(data); // validación de campos

        const client = await conectarDB(); //eliminar a futuro cuando se tenga version final
        const db = client.db(dbName); //eliminar a futuro cuando se tenga version final
        const collection = db.collection('clientes'); //eliminar a futuro cuando se tenga version final

        // Verificar duplicados
        const duplicado = await collection.findOne({
        $or: [
            { correo: cliente.correo },
            { nombre: cliente.nombre },
            { cedula: cliente.cedula }
        ]
        });

        if (duplicado) {
            client.close();
            console.error('❌ Cliente duplicado. Ya existe uno con el mismo correo, nombre o cédula.');
            return;
        }

        await collection.insertOne(cliente);
        client.close(); //eliminar a futuro cuando se tenga version final
        console.log('✅ Cliente creado:', cliente);
    } catch (error) {
        console.error('❌ Error al crear cliente:', error.message);
    }
}


/**
 * listarClientes
 */
export async function listarClientes() {
    try {
        const client = await conectarDB(); //eliminar a futuro cuando se tenga version final
        const db = client.db(dbName); //eliminar a futuro cuando se tenga version final
        const clientes = await db.collection('clientes').find().toArray();
        client.close(); //eliminar a futuro cuando se tenga version final
        console.log('📋 Lista de clientes:');
        clientes.forEach((cli, i) => {
        console.log(`${i + 1}. ${cli.nombre} - ${cli.correo}`);
        });
    } catch (error) {
        console.error('❌ Error al listar clientes:', error.message);
    }
}

/**
 * actualizarCliente
 */
export async function actualizarCliente(id, nuevosDatos) {
    try {
        const client = await conectarDB(); //eliminar a futuro cuando se tenga version final
        const db = client.db(dbName); //eliminar a futuro cuando se tenga version final
        const collection = db.collection('clientes'); //eliminar a futuro cuando se tenga version final

        // 1. Buscar el cliente actual
        const clienteActual = await collection.findOne({ _id: new ObjectId(id) });
        if (!clienteActual) {
            client.close(); //eliminar a futuro cuando se tenga version final
            return console.error('❌ Cliente no encontrado');
        }

        // 2. Verificar duplicados si se intenta cambiar correo, cédula o nombre
        const camposUnicos = ['correo', 'cedula', 'nombre'];
        const condiciones = [];

        for (const campo of camposUnicos) {
            if (nuevosDatos[campo] && nuevosDatos[campo] !== clienteActual[campo]) {
                condiciones.push({ [campo]: nuevosDatos[campo] });
            }
        }

        if (condiciones.length > 0) {
            const existeDuplicado = await collection.findOne({
                $or: condiciones,
                _id: { $ne: new ObjectId(id) } // excluye al propio cliente
            });

            if (existeDuplicado) {
                client.close(); //eliminar a futuro cuando se tenga version final
                return console.error('❌ No se puede actualizar: otro cliente ya tiene ese correo, cédula o nombre');
            }
        }

        // 3. Ejecutar la actualización
        await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: nuevosDatos }
        );

        client.close(); //eliminar a futuro cuando se tenga version final
        console.log('🔄 Cliente actualizado correctamente');
    } catch (error) {
        console.error('❌ Error al actualizar cliente:', error.message);
    }
}

/**
 * eliminarCliente
 */
export async function eliminarCliente(id) {
    try {
        const client = await conectarDB(); //eliminar a futuro cuando se tenga version final
        const db = client.db(dbName); //eliminar a futuro cuando se tenga version final
        await db.collection('clientes').deleteOne({ _id: new ObjectId(id) });
        client.close(); //eliminar a futuro cuando se tenga version final
        console.log(`🗑️ Cliente eliminado ${id}`);
    } catch (error) {
        console.error('❌ Error al eliminar cliente:', error.message);
    }
}