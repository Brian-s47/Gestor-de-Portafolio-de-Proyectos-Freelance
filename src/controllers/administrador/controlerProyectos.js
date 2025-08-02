// Zona de importacion de Modulos
import {gestorProyectos, actualizacionProyectos} from '../../cli/menus.js';
import {seleccionarProyecto, crearProyectoTransaccion, insertarEntregables, actualizarEstado, actualizarFechaFinal, listarProyectos, actualizarEntregables} from '../../services/proyectosService.js';

// Zona de Funciones de servicios
async function controlerProyectos(db) {
    let salir = false;
    console.clear() // Borrar consola
    while (!salir) {
    const opcion = await gestorProyectos();

        switch (opcion) {
            case '1':
            await crearProyectoTransaccion(db);
            break;
            case '2':
            await listarProyectos(db);
            break;
            case '3':
            const proyectoId = await seleccionarProyecto(db)
            let salirP = false;
                while (!salirP){
                    const opcion = await actualizacionProyectos();
                    switch (opcion) { 
                    case '1': //  Agregar Entregables
                    await insertarEntregables(proyectoId, db);
                    break;
                    case '2': // Actualizar estado
                    await actualizarEstado(proyectoId, db);
                    break;
                    case '3': // Actualizar Fecha Final
                    await actualizarFechaFinal(proyectoId, db);
                    break;
                    case '4': // Actualizar entregables
                    await actualizarEntregables(proyectoId, db);
                    break;
                    case '5':
                    console.log('🛠️ Esta volviendo al menu anterior "Menu Gestion de Proyectos" 🛠️');
                    salirP = true;
                    break;
                }
            }
            break;
            case '4':
            salir = true;
            console.log('🛠️Esta volviendo al menu anterior: "Menu Gestor Administrador" 🛠️');
            break;
        }
    }
}
export { controlerProyectos };