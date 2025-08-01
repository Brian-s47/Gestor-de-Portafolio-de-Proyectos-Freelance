
import { esperarTecla } from "../cli/menus.js";
import inquirer from "inquirer";
import {log} from "console"

export default async function loginCliente(db){
    log("Bienvenido, por favor ingrese con su numero de cedula para visualizar informacion y estado actual de los proyectos")
    const respuestas = await inquirer.prompt([{
            type:"input",
            name:"cedula",
            message:"numero de cedula"
        }
    ])

    const cliente = await db.collection('clientes').findOne({ cedula: respuestas.cedula });

    if (!cliente) {
        log("Contraseña incorrecta, cliente no encontrado")
        return false
    } else {
        
        log("Bienvenido ",cliente.nombre)
        await esperarTecla();
        return cliente._id
    }
    
    
    
}