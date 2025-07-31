// Zona de importacion de librerias
import _ from 'lodash';

// Zona de importacion de modulos
import { gestorCliente, esperarTecla}  from '../cli/menus.js';
import { listarProyectosCliente } from '../services/proyectosService.js';
import { listarPropuestasCliente } from '../services/propuestasService.js';
import { listarDatosCliente } from '../services/clientesService.js';


// Funciones generales
// Solicitar datos
// Zona de Funciones de servicios
async function gestionCliente(db, idCliente) { // la funcion debe recibir el ID Cliente que devuelve el la validacion de inicio de sesion para los metodos de este menu muestyren la informacion correcta
    let salir = false;
    while (!salir){
    const opcion = await gestorCliente();
        switch (opcion) { 
        case '1':
            await listarProyectosCliente(db, idCliente);
            await esperarTecla();
            break;
        case '2':
            await listarPropuestasCliente(db, idCliente);
            await esperarTecla()
            break;
        case '3':
            // Pendiente hatsa tener estados financieros
            console.log('Se listaran los estados financieros del cliente')
            // EL metodo llamado se le debe enviar el IdCliente para que filte solo la informacion correspondiente
            await esperarTecla()
            break;
        case '4':
            await listarDatosCliente(db, idCliente);
            await esperarTecla()
        break;
        case '5':
            console.log('🛠️ Esta volviendo al menu anterior "Menu Principal Gestor" 🛠️');
            await esperarTecla()
            salir = true;
        }
    }
}

export { gestionCliente };