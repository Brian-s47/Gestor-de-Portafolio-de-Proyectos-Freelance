// Zona de importacion de Modulos
import {gestorProyectos, actualizacionProyectos} from '../../cli/menus.js';
import {seleccionarProyecto, crearProyectoTransaccion, insertarEntregables, actualizarEstado, actualizarFechaFinal, listarProyectos} from '../../services/proyectosService.js';

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
            const contratoId = await seleccionarProyecto(db)
            let salirP = false;
                while (!salir){
                    const opcion = await actualizacionProyectos();
                    switch (opcion) { 
                    case '1': //  Agregar Entregables
                    await insertarEntregables(contratoId, db);
                    break;
                    case '2': // Actualizar estado
                    await actualizarEstado(contratoId, db);
                    break;
                    case '3': // Actualizar Fecha Final
                    await actualizarFechaFinal(contratoId, db);
                    break;
                    case '4':
                    console.log('🛠️ Esta volviendo al menu anterior "Menu Gestion de Proyectos" 🛠️');
                    salirP = true;
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