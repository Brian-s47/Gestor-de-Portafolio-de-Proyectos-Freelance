import Cliente from '../models/Cliente.js';
import { ObjectId } from 'mongodb';
import { validarTextoNoVacioNiSimbolos, validarNumeroPositivo, validarTelefono } from '../utils/validadores.js';


/**
 * crearCliente
 */
export async function crearCliente(data, collection) {
    try {
        const cliente = new Cliente(data); // validación de campos
        // Verificar duplicados
        const duplicado = await collection.findOne({
        $or: [
            { correo: cliente.correo },
            { nombre: cliente.nombre },
            { cedula: cliente.cedula }
        ]
        });

        if (duplicado) {
            console.error('❌ Cliente duplicado. Ya existe uno con el mismo correo, nombre o cédula.');
            return;
        }

        await collection.insertOne(cliente);
        console.log('✅ Cliente creado:', cliente);
    } catch (error) {
        console.error('❌ Error al crear cliente:', error.message,error);
    }
}

export async function obtenerClientes(collection) {
    try {
        const clientes = await collection.find().toArray();
        return clientes;
    } catch (error) {
        console.error('❌ Error al obtener clientes:', error.message);
        return [];
    }
}

/**
 * listarClientes
 */
export async function listarClientes(collection) {
    try {
        const clientes = await obtenerClientes(collection);
        console.log('📋 Lista de clientes:');
        clientes.forEach((cli, i) => {
        console.log(`${i + 1}. ${cli.nombre} - ${cli.correo}`);
        });
        return clientes;
    } catch (error) {
        console.error('❌ Error al listar clientes:', error.message);
    }
}

/**
 * actualizarCliente
 */
export async function actualizarCliente(id, nuevosDatos, collection) {
    try {
        // 1. Buscar el cliente actual
        const clienteActual = await collection.findOne({ _id: new ObjectId(id) });
        if (!clienteActual) {
            return console.error(chalk.red('❌ Cliente no encontrado'));
        }

        // 2. Validaciones personalizadas
        if (nuevosDatos.nombre) {
            const val = validarTextoNoVacioNiSimbolos(nuevosDatos.nombre);
            if (val !== true) return console.error(val);
        }

        if (nuevosDatos.cedula) {
            const val = validarNumeroPositivo(nuevosDatos.cedula);
            if (val !== true) return console.error(val);
        }

        if (nuevosDatos.telefono) {
            const val = validarTelefono(nuevosDatos.telefono);
            if (val !== true) return console.error(val);
        }

        // 3. Verificar duplicados si se intenta cambiar correo, cédula o nombre
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
                _id: { $ne: new ObjectId(id) }
            });

            if (existeDuplicado) {
                return console.error(chalk.red('❌ No se puede actualizar: otro cliente ya tiene ese correo, cédula o nombre'));
            }
        }

        // 4. Ejecutar la actualización
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: nuevosDatos }
        );

        console.log(chalk.green('🔄 Cliente actualizado correctamente'));
    } catch (error) {
        console.error('❌ Error al actualizar cliente:', error.message);
    }
}

/**
 * cambiarEstadoCliente
 */
export async function cambiarEstadoCliente(id, nuevoEstado, collection) {
    try {
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { estado: nuevoEstado } }
        );

        console.log(`🔄 Estado del cliente actualizado a: ${nuevoEstado ? 'Activo' : 'Inactivo'}`);
    } catch (error) {
        console.error('❌ Error al cambiar estado del cliente:', error.message);
    }
}
