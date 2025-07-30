// Zona de importacion de Modulos
import {gestorPropuestas, esperarTecla} from '../../cli/menus.js';
import {solictarDatosPropuesta, crearPropuesta, listarPropuestas} from '../../services/propuestasService.js'

// Zona de Funciones de servicios
async function controlerPropuestas() {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorPropuestas();

        switch (opcion) {
            case '1':
            const datosPropuesta =await solictarDatosPropuesta()
            await crearPropuesta(datosPropuesta)
            // console.log('Se iniciara Menu de: Crear Propuesta');
            // await esperarTecla();
            break;
            case '2':
            console.log('Se iniciara Menu de: Modificar Propuesta'); 
            await esperarTecla();
            break;
            case '3':
            await listarPropuestas();
            // console.log('Se iniciara Menu de: Listar Propuesta');
            // await esperarTecla();
            break;
            case '4':
            console.log('Se iniciara Menu de: Cambiar Estado Propuesta'); // se decide separar ya que cambiar el estado a aprobado genera la creacion de un proyecto
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