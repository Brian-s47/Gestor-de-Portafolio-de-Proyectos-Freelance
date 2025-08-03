// Importamos los métodos de servicio del cliente
import {
    crearCliente,
    listarClientes,
    actualizarCliente,
    eliminarCliente
} from '../services/clientesService.js';

/**
 * Script de prueba manual
 * =======================
 * Permite probar los métodos del servicio desde consola ejecutando:
 * 
 *   node utils/ejemploCliente.js
 */

// Crear un cliente nuevo
await crearCliente({
    nombre: 'Pedro Ruiz',
    cedula: '87654321',
    telefono: '3123456789',
    correo: 'pedro@example.com'
});

// Listar clientes existentes
await listarClientes();

const clienteId = '68895612976e747644aca4d7';

// Actualizar un campo del cliente
await actualizarCliente(clienteId, {
    telefono: '3000000000'
});
// Eliminar un cliente por ID

console.log(`\nEliminando cliente con ID: ${clienteId}`);
setTimeout(async () => await eliminarCliente(clienteId), 5000 ); // se debe reemplazar con un ID válido