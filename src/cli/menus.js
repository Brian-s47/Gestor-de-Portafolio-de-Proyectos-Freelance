// Zona de importacion de librerias
import inquirer from 'inquirer'; //  Para interaccion con el usuario
import chalk from 'chalk' // Para dar colores a los mensajes y opciones
import boxen from 'boxen' // Para encerrar los menus en cajas 

// Zona de importacion de modulos

// Zona de Menus
// Menu principal
async function menuPrincipal() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('📋 Menu Principal Gestor de Portafoliom de Proyectos Freelance"') 
  const linea = chalk.gray('────────────────────────────────────────────')
  console.log(boxen(titulo, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    align: 'center'
  }))
  console.log(linea)
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: chalk.green('1. Menu de Gestion de Administrador (Developer)'), value: '1' },
        { name: chalk.blue('2. Menu de Gestion de Cliente'), value: '2' },
        { name: chalk.gray('3. Salir del sistema de gestion'), value: '3' }
      ]
    }
  ]);
  return opcion;
}

// Funcion para precionar tecla para continuar
async function esperarTecla() {
  await inquirer.prompt([
    {
      type: "input",
      name: "continuar",
      message: chalk.gray("\nPresiona Enter para continuar..."),
    },
  ]);
}

export { esperarTecla, menuPrincipal };