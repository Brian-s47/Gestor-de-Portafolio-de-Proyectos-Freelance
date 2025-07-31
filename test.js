import inquirer from 'inquirer';
import dotenv from 'dotenv';
import seedDatabase from './src/db/seeders.js';
import resetDatabase from './src/db/hardReset.js';
import crearColeccionesConEsquema from './src/db/schema.js';
import obtenerEstadoBaseDeDatos from './src/db/obtenerEstadoBaseDeDatos.js';

dotenv.config();

async function mainMenu() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '📦 ¿Qué deseas hacer con la base de datos?',
        choices: [
          { name: '📥 Insertar datos de prueba (Seed)', value: 'seed' },
          { name: '🧹 Eliminar todos los datos (Hard Reset)', value: 'reset' },
          { name: '📑 Cargar esquemas de validación', value: 'schemas' },
          { name: '📊 Ver estado de la base de datos', value: 'estado' },
          { name: '❌ Salir', value: 'salir' }
        ]
      }
    ]);

    switch (opcion) {
      case 'seed':
        await seedDatabase();
        break;

      case 'reset':
        const { confirmar } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirmar',
            message: '⚠️ Esto eliminará todas las colecciones y sus esquemas. ¿Estás seguro?',
            default: false
          }
        ]);

        if (confirmar) {
          await resetDatabase();
        } else {
          console.log('❌ Operación cancelada por el usuario.');
        }
        break;

      case 'schemas':
        await crearColeccionesConEsquema();
        break;

      case 'estado':
        await obtenerEstadoBaseDeDatos();
        break;

      case 'salir':
        salir = true;
        console.log('👋 Saliendo del gestor de base de datos.');
        process.exit(0)
    }
  }
}

mainMenu();
