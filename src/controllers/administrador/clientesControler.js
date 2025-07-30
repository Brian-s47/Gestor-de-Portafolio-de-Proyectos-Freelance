// Zona de importación de módulos
import {
    crearCliente,
    listarClientes,
    actualizarCliente,
    cambiarEstadoCliente
} from '../../services/clientesService.js';



import {gestorClientes, esperarTecla} from '../../cli/menus.js';
import Cliente from '../../models/Cliente.js';
import inquirer from 'inquirer';
import { validarTextoNoVacioNiSimbolos } from '../../utils/validadores.js';

// Zona de Funciones del controlador
async function controlerClientes(db) {
    let salir = false;
    console.clear();
    while (!salir) {
        const opcion = await gestorClientes();
        const collection = db.collection('clientes');

        switch (opcion) {
            case '1':
                // Crear cliente
                const nuevoCliente = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'nombre',
                        message: 'Nombre del cliente:',
                        validate: validarTextoNoVacioNiSimbolos
                    },
                    {
                        type: 'input',
                        name: 'cedula',
                        message: 'Cédula del cliente:'
                    },
                    {
                        type: 'input',
                        name: 'telefono',
                        message: 'Teléfono del cliente:'
                    },
                    {
                        type: 'input',
                        name: 'correo',
                        message: 'Correo electrónico:',
                        validate: input =>
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) || 'Correo no válido'
                    }
                ]);
                await crearCliente(nuevoCliente, collection);
                await esperarTecla();
                break;

            case '2':
                // Modificar cliente
                const clientes = await listarClientes(collection);
                if (clientes.length === 0) {
                    console.log('⚠️ No hay clientes registrados.');
                    await esperarTecla();
                    break;
                }

                const { idClienteEditar } = await inquirer.prompt({
                    type: 'list',
                    name: 'idClienteEditar',
                    message: 'Seleccione un cliente para editar:',
                    choices: clientes.map(c => ({
                        name: c.nombre,
                        value: c._id.toString()
                    }))
                });

                const { campoEditar, nuevoValor } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'campoEditar',
                        message: '¿Qué campo desea editar?',
                        choices: ['nombre', 'cedula', 'telefono', 'correo']
                    },
                    {
                        type: 'input',
                        name: 'nuevoValor',
                        message: 'Ingrese el nuevo valor:'
                    }
                ]);

                await actualizarCliente(idClienteEditar, { [campoEditar]: nuevoValor }, collection);
                await esperarTecla();
                break;

            case '3':
                // Listar clientes
                await listarClientes(collection);
                await esperarTecla();
                break;

            case '4':
                // Cambiar estado de cliente
                const clientesCambiarEstado = await listarClientes(collection);
                if (clientesCambiarEstado.length === 0) {
                    console.log('⚠️ No hay clientes registrados.');
                    await esperarTecla();
                    break;
                }

                const { idClienteCambiarEstado } = await inquirer.prompt({
                    type: 'list',
                    name: 'idClienteCambiarEstado',
                    message: 'Seleccione un cliente para cambiar su estado:',
                    choices: clientesCambiarEstado.map(c => ({
                        name: `${c.nombre} - Estado actual: ${c.estado ? 'Activo' : 'Inactivo'}`,
                        value: c._id.toString()
                    }))
                });

                const { nuevoEstado } = await inquirer.prompt({
                    type: 'list',
                    name: 'nuevoEstado',
                    message: 'Seleccione el nuevo estado:',
                    choices: [
                        { name: 'Activo', value: true },
                        { name: 'Inactivo', value: false }
                    ]
                });

                await cambiarEstadoCliente(idClienteCambiarEstado, nuevoEstado, collection);
                await esperarTecla();
                break;


            case '5':
                salir = true;
                console.log('🛠️ Esta volviendo al menú anterior: "Menu Gestor Administrador" 🛠️');
                break;
        }
    }
}

export { controlerClientes };
