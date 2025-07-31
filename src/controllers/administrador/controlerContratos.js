// Zona de importacion de Modulos
import {gestorContratos, esperarTecla} from '../../cli/menus.js';

// Zona de Funciones de servicios
async function controlerContratos() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorContratos();

        switch (opcion) {
            case '1':
            console.log('Se iniciara Menu de: Crear Contrato');
            await esperarTecla();
            break;
            case '2':
            console.log('Se iniciara Menu de: Listar Contratos');
            await esperarTecla();
            break;
            case '3':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior: "Menu Gestor Administrador" 🛠️');
            break;
        }
    }
}
export { controlerContratos };