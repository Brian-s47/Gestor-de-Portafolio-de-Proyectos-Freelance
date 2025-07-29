// Zona de importacion de Modulos
import {gestorFinanzas, esperarTecla} from '../../cli/menus.js';

// Zona de Funciones de servicios
async function controlerFinanzas() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorFinanzas();

        switch (opcion) {
            case '1':
            console.log('Se iniciara Menu de: Crear Registro');
            await esperarTecla();
            break;
            case '2':
            console.log('Se iniciara Menu de: Listar Registro');
            await esperarTecla();
            break;
            case '3':
            console.log('Se iniciara Menu de: Actualziar Registro');
            await esperarTecla();
            break;
            case '4':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior: "Menu Gestor Administrador" 🛠️');
            break;
        }
    }
}
export { controlerFinanzas };