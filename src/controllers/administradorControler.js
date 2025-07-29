// Zona de importacion de librerias
import _ from 'lodash';

// Zona de importacion de modulos
import { gestorAdministrador, esperarTecla}  from '../cli/menus.js';
import { controlerClientes } from './administrador/clientesControler.js';
import { controlerPropuestas } from './administrador/controlerPropuestas.js';
import { controlerProyectos } from './administrador/controlerProyectos.js';
import { controlerContratos } from './administrador/controlerContratos.js';
import { controlerFinanzas } from './administrador/controlerFinanzas.js'

// Funciones generales
// Solicitar datos
// Zona de Funciones de servicios
async function gestionAdministrador() {
    let salir = false;
    while (!salir){
    const opcion = await gestorAdministrador();
        switch (opcion) { 
        case '1':
            console.log('Se iniciara Menu de: Gestion de Clientes')
            await esperarTecla();
            await controlerClientes();
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
            console.log('Se iniciara Menu de: Gestion de Contratos')
            await esperarTecla()
            await controlerContratos();
        break;
        case '5':
            console.log('Se iniciara Menu de: Gestion de Finanzas')
            await esperarTecla()
            await controlerFinanzas();
        break;
        case '6':
            console.log('🛠️ Esta volviendo al menu anterior "Menu Principal Gestor" 🛠️');
            await esperarTecla()
            exit;
        }
    }
}

export { gestionAdministrador };