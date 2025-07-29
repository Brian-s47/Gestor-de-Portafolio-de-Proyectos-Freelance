// Zona de importacion de Modulos
import {gestorProyectos, esperarTecla} from '../../cli/menus.js';

// Zona de Funciones de servicios
async function controlerProyectos() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorProyectos();

        switch (opcion) {
            case '1':
            console.log('Se iniciara Menu de: Crear Proyecto');
            await esperarTecla();
            break;
            case '2':
            console.log('Se iniciara Menu de: Listar Proyectos');
            await esperarTecla();
            break;
            case '3':
            console.log('Se iniciara Menu de: Actualizar Proyectos');
            await esperarTecla();
            break;
            case '4':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior: "Menu Gestor Administrador" 🛠️');
            break;
        }
    }
}
export { controlerProyectos };