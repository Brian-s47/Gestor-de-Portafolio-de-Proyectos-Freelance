import dotenv from "dotenv";
import {log} from "console";
import { esperarTecla } from "../cli/menus.js";
import inquirer from "inquirer";

export default async function loginAdmin(){
    
    log("Bienvenido master ingrese la constraseña")
    const master = await inquirer.prompt([{
            type:"input",
            name:"master",
            message:"password"
        }
    ])
    
    const password = process.env.ADMIN_PASS

    if (password == master.master) {
        
        return true
    } else {
        log("Contraseña incorrecta")
        await esperarTecla()
        return false
    }

    
}