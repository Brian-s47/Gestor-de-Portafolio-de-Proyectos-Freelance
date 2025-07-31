// Zona de importacion de librerias
import _ from 'lodash';

// Zona de importacion de modulos
import Cliente from '../models/Cliente.js'
import { gestorAdministrador, esperarTecla}  from '../cli/menus.js';
import { controlerClientes } from './administrador/clientesControler.js';
import { controlerPropuestas } from './administrador/controlerPropuestas.js';
import { controlerProyectos } from './administrador/controlerProyectos.js';
import { controlerFinanzas } from './administrador/controlerFinanzas.js'

// Funciones generales

// Zona de Funciones de servicios
async function gestionAdministrador(db) {
    let salir = false;
    while (!salir){
    const opcion = await gestorAdministrador();
        switch (opcion) { 
        case '1':
            await controlerClientes(db);
            break;
        case '2':
            await controlerPropuestas(db);
            break;
        case '3':
            await controlerProyectos(db);
            break;
        case '4':
            await controlerFinanzas(db);
        break;
        case '5':
            console.log('🛠️ Esta volviendo al menu anterior "Menu Principal Gestor" 🛠️');
            await esperarTecla()
            salir = true;
        }
    }
}

export { gestionAdministrador };