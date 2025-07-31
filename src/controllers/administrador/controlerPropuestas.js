// Zona de importacion de Modulos
import Propuesta from '../../models/Propuesta.js';
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
            // console.log('Se iniciara Menu de: Crear Propuesta');
            await esperarTecla();
            break;
            case '2':
            await modifiarPropuesta(db);
            // console.log('Se iniciara Menu de: Modificar Propuesta'); 
            await esperarTecla();
            break;
            case '3':
            await listarPropuestas(db);
            // console.log('Se iniciara Menu de: Listar Propuesta');
            await esperarTecla();
            break;
            case '4':
            await cambiarEstadoPropuesta(db);
            // console.log('Se iniciara Menu de: Cambiar Estado Propuesta'); // se decide separar ya que cambiar el estado a aprobado genera la creacion de un proyecto
            await esperarTecla();
            break;
            case '5':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior: "Menu Gestor Administrador" 🛠️');
            break;
        }
    }
}
export { controlerPropuestas };