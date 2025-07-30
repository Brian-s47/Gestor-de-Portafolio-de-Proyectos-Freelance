// Zona de importacion de librerias
import _ from 'lodash';

// Zona de importacion de modulos
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
            console.log('Se iniciara Menu de: Gestion de Clientes')
            await esperarTecla();
            await controlerClientes(db);
            break;
        case '2':
            console.log('Se iniciara Menu de: Gestion de Propuestas')
            await esperarTecla()
            await controlerPropuestas();
            break;
        case '3':
            console.log('Se iniciara Menu de: Gestion de Proyectos')
            await esperarTecla()
            await controlerProyectos();
            break;
        case '4':
            console.log('Se iniciara Menu de: Gestion de Finanzas')
            await esperarTecla()
            await controlerFinanzas();
        break;
        case '5':
            console.log('🛠️ Esta volviendo al menu anterior "Menu Principal Gestor" 🛠️');
            await esperarTecla()
            salir = true;
        }
    }
}

export { gestionAdministrador };