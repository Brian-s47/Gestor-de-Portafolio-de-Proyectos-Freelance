// Zona de importacion de librerias

// Zona de  importacion de modulos
import {menuPrincipal, esperarTecla}  from './src/cli/menus.js';


// Codigo principal de ejecucion:

async function main() {
  let salir = false;

  while (!salir) {
    const opcionPrincipal = await menuPrincipal();
    switch (opcionPrincipal) { 
      case '1':
        console.log('Ejecutar validacion de Inicio de sesion para Administrador')
        // Pondremos un condicional if si retorna correctamente el inicio de sesin redirije al menu correspondiente
        console.log('Menu de Gestion de Administrador(Developer)')
        await esperarTecla()
        break;
      case '2':
        console.log('Ejecutar validacion de Inicio de sesion para cliente')
        // Pondremos un condicional if si retorna correctamente el inicio de sesin redirije al menu correspondiente
        console.log('Menu de Gestion de Cliente')
        await esperarTecla()
        break;
      case '3':
        salir = true;
        console.log('🚀 Esta saliendo del sistema Gestor de Portafoliom de Proyectos Freelance 🚀');
        await esperarTecla()
        exit;
    }
  }
}

main();