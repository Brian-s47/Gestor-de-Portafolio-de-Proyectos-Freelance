// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB

// Zona de  importacion de modulos
import { obtenerDB } from './src/config/db.js';
import {menuPrincipal, esperarTecla}  from './src/cli/menus.js';
import {gestionAdministrador} from './src/controllers/administradorControler.js';
import {gestionCliente} from './src/controllers/clienteControler.js';
import loginCliente from './src/services/loginCliente.js';
import loginAdmin from './src/services/loginAdmin.js';
import { log } from 'console';

// Codigo principal de ejecucion:

async function main() {
  let salir = false;
  const db = await obtenerDB();

  while (!salir) {
    const opcionPrincipal = await menuPrincipal();
    switch (opcionPrincipal) { 
      case '1':
        const admin = await loginAdmin();

        if (admin == true) {
          await gestionAdministrador(db);
          break;
        } else if(admin == false){
          log("Contraseña en silla de ruedas")
          break
        }
      // Pondremos un condicional if si retorna correctamente el inicio de sesion redirije al menu correspondiente 
      
      case '2':
        console.log('Ejecutar validacion de Inicio de sesion para cliente')
        // Pondremos un condicional if si retorna correctamente el inicio de sesin redirije al menu correspondiente retornarndo el _id del cliente para que el gestor de cliente solo muestre su informacion
        
        const idCliente = await loginCliente(db)
        if (idCliente == false) {
          await esperarTecla();
          break;
        } else{
          await gestionCliente(db, idCliente);
          break;
        }
        // const idPrueba = '688c03e3cca0e30849f857a1'; // Datos para pruebas iniciales
        // const idCliente = new ObjectId(idPrueba)
      case '3':
        console.log('🚀 Esta saliendo del sistema Gestor de Portafoliom de Proyectos Freelance 🚀');
        await esperarTecla();
        process.exit(0); 
    }
  }
}

main();