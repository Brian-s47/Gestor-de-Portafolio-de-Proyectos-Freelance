// Zona de importacion de librerias
import inquirer from 'inquirer' //  Para interaccion con el usuario
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

// Menu Administrador
async function gestorAdministrador() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('📋 Menu Gestor Administrador Gestor de Portafolio de Proyectos Freelance') 
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
        { name: chalk.green('1. Gestion de Clientes'), value: '1' },
        { name: chalk.blue('2. Gestion de Propuestas'), value: '2' },
        { name: chalk.yellow('3. Gestion de Proyectos'), value: '3' },
        { name: chalk.white('4. Gestion de Finanzas'), value: '4' },
        { name: chalk.gray('🛠️ 5. Salir del sistema de gestion: ""Menu Principal Gestor" 🛠️'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Clientes
async function gestorClientes() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('👥 Menu Gestion de Clientes') 
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
        { name: chalk.green('1. Registrar Cliente'), value: '1' },
        { name: chalk.blue('2. Modificar Cliente'), value: '2' },
        { name: chalk.yellow('3. Listar Cliente'), value: '3' },
        { name: chalk.red('4. Cambiar Estado Cliente'), value: '4' },
        { name: chalk.gray('5. Volver al menu anterior'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Finanzas
async function gestorFinanzas() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('👥 Menu Gestion de Finanzas') 
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
        { name: chalk.green('1. Listar estados de cuenta'), value: '1' },
        { name: chalk.blue('2. Hacer abono'), value: '2' },
        { name: chalk.blue('3. Registrar salida'), value: '3' },
        { name: chalk.gray('4. Volver al menu anterior'), value: '4' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Propuestas
async function gestorPropuestas() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('👥 Menu Gestion de Propuestas') 
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
        { name: chalk.green('1. Crear Propuesta'), value: '1' },
        { name: chalk.blue('2. Modificar Propuesta'), value: '2' },
        { name: chalk.red('3. Listar Propuesta'), value: '3' },
        { name: chalk.cyan('4. Cambiar Estado Propuesta'), value: '4' },
        { name: chalk.gray('5. Volver al menu anterior'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Menu Gestion de Proyectos
async function gestorProyectos() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('👥 Menu Gestion de Proyectos') 
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
        { name: chalk.green('1. Crear Proyecto'), value: '1' },
        { name: chalk.blue('2. Listar Proyectos'), value: '2' },
        { name: chalk.blue('3. Actualizar Proyectos'), value: '3' },
        { name: chalk.gray('4. Volver al menu anterior'), value: '4' }
      ]
    }
  ]);
  return opcion;
}

// Menu Actualizacion de Proyectos
async function actualizacionProyectos() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('🔄 Menu Actualizacion de Proyectos') 
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
        { name: chalk.green('1. Agregar Entregables'), value: '1' },
        { name: chalk.blue('2. Actualizar estado'), value: '2' },
        { name: chalk.blue('3. Actualizar Fecha Final'), value: '3' },
        { name: chalk.blue('4. Actualizar Entregables'), value: '4' },
        { name: chalk.gray('5. Volver al menu anterior'), value: '5' }
      ]
    }
  ]);
  return opcion;
}

// Menu Administrador
async function gestorCliente() {
  console.clear() // Borrar consola para mejor visualizacion
  const titulo = chalk.bold.cyan('📋 Menu Cliente -> Gestor de Portafolio de Proyectos Freelance') 
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
        { name: chalk.green('1. Ver Proyectos'), value: '1' },
        { name: chalk.blue('2. Ver propuestas'), value: '2' },
        { name: chalk.yellow('3. Ver Estado financiero'), value: '3' },
        { name: chalk.white('4. Ver datos personales'), value: '4' },
        { name: chalk.gray('🛠️ 5. Salir del sistema de gestion: ""Menu Principal Gestor" 🛠️'), value: '5' }
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

export { esperarTecla, menuPrincipal, gestorAdministrador, gestorClientes, gestorFinanzas, gestorPropuestas, gestorProyectos, actualizacionProyectos, gestorCliente };
