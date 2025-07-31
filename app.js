// Zona de importacion de librerias


// Zona de  importacion de modulos
import { obtenerDB } from './src/config/db.js';
import {menuPrincipal, esperarTecla}  from './src/cli/menus.js';
import {gestionAdministrador} from './src/controllers/administradorControler.js';
import {gestionCliente} from './src/controllers/clienteControler.js';

// Codigo principal de ejecucion:

async function main() {
  let salir = false;
  const db = await obtenerDB();

  while (!salir) {
    const opcionPrincipal = await menuPrincipal();
    switch (opcionPrincipal) { 
      case '1':
        console.log('Ejecutar validacion de Inicio de sesion para Administrador');
        // Pondremos un condicional if si retorna correctamente el inicio de sesion redirije al menu correspondiente 
        console.log('Menu de Gestion de Administrador(Developer)')
        await esperarTecla();
        await gestionAdministrador(db);
        break;
      case '2':
        console.log('Ejecutar validacion de Inicio de sesion para cliente')
        // Pondremos un condicional if si retorna correctamente el inicio de sesin redirije al menu correspondiente retornarndo el _id del cliente para que el gestor de cliente solo muestre su informacion
        // await idCliente = inicioSesionCliente()
        console.log('Menu de Gestion de Cliente');
        await esperarTecla();
        await gestionCliente(db);
        break;
      case '3':
        salir = true;
        console.log('🚀 Esta saliendo del sistema Gestor de Portafoliom de Proyectos Freelance 🚀');
        await esperarTecla();
        exit;
    }
  }
}

main();