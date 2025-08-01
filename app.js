// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB

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
        const idPrueba = '688c54b8a81406c470c926e9'; // Datos para pruebas iniciales
        const idCliente = new ObjectId(idPrueba)
        await gestionCliente(db, idCliente);
        break;
      case '3':
        console.log('🚀 Esta saliendo del sistema Gestor de Portafoliom de Proyectos Freelance 🚀');
        await esperarTecla();
        process.exit(0); 
    }
  }
}

main();