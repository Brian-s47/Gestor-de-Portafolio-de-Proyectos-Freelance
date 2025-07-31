// Zona de importacion de Modulos
import {gestorPropuestas, esperarTecla} from '../../cli/menus.js';
import {crearPropuesta, modifiarPropuesta, listarPropuestas, cambiarEstadoPropuesta} from '../../services/propuestasService.js'

// Zona de Funciones de servicios
async function controlerPropuestas(db) {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorPropuestas();

        switch (opcion) {
            case '1':
            await crearPropuesta(db);
            break;
            case '2':
            await modifiarPropuesta(db);
            break;
            case '3':
            await listarPropuestas(db);
            // console.log('Se iniciara Menu de: Listar Propuesta');
            break;
            case '4':
            await cambiarEstadoPropuesta(db);
            break;
            case '5':
            console.log('🛠️Esta volviendo al menu anterior: "Menu Gestor Administrador" 🛠️');
            await esperarTecla();
            salir = true;
            break;
        }
    }
}
export { controlerPropuestas };