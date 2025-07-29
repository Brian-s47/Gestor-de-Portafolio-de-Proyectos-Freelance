// Zona de importacion de Modulos
import {gestorClientes, esperarTecla} from '../../cli/menus.js';
// Zona de Funciones de servicios
async function controlerClientes() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorClientes();

        switch (opcion) {
            case '1':
            console.log('Se iniciara Menu de: Registrar Cliente');
            await esperarTecla();
            break;
            case '2':
            console.log('Se iniciara Menu de: Modificar Cliente');
            await esperarTecla();
            break;
            case '3':
            console.log('Se iniciara Menu de: Listar Clientes');
            await esperarTecla();
            break;
            case '4':
            console.log('Se iniciara Menu de: Eliminar Cliente');
            await esperarTecla();
            break;
            case '5':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior: "Menu Gestor Administrador" 🛠️');
            break;
        }
    }
}
export { controlerClientes };