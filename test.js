import inquirer from 'inquirer';
import seedDatabase from './src/db/seeders.js';
import resetDatabase from './src/db/hardReset.js';
import dotenv from 'dotenv';


dotenv.config();

// este archivo es unicamente para desarroladores,no incluir en el main

// menu simple de opciones para gestionar la base de datos a grandes rasgos
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
                    { name: '❌ Salir', value: 'salir' }
                ]
            }
        ]);

        switch (opcion) {
            case 'seed':
                await seedDatabase(); //añade los datos de prueba a la base de datos
                break;
            case 'reset':
                await resetDatabase(); // elinina todos los datos de la base dedatos
                break;
            case 'salir':
                salir = true;
                console.log('👋 Saliendo del gestor de base de datos.');
                break;
        }
    }
}

mainMenu();