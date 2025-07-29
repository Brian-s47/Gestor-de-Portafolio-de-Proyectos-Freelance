// Zona de importacion de Modulos
import {gestorPropuestas, esperarTecla} from '../../cli/menus.js';

// Zona de Funciones de servicios
async function controlerPropuestas() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorPropuestas();

        switch (opcion) {
            case '1':
            console.log('Se iniciara Menu de: Crear Propuesta');
            await esperarTecla();
            break;
            case '2':
            console.log('Se iniciara Menu de: Modificar Propuesta'); // Esta incluira el Cambiar estado
            await esperarTecla();
            break;
            case '3':
            console.log('Se iniciara Menu de: Listar Propuesta');
            await esperarTecla();
            break;
            case '4':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior: "Menu Gestor Administrador" 🛠️');
            break;
        }
    }
}
export { controlerPropuestas };