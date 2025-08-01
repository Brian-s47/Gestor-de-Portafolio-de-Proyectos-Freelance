// importacion de modulos
import { ObjectId } from 'mongodb';
// Creacion de Clase
class Propuesta {
    constructor (nombrepropuesta, descripcion, precio, fechaInicial, fechaFinal,  estado = "pendiente", cliente){
        //Atributos generales
        this.nombrepropuesta = nombrepropuesta; // Debe ser de tipo String no recibir simbolos ni numeros y no puede estar vacio
        this.descripcion = descripcion; // Debe ser de tipo string
        this.precio = precio; // debe ser de tipo int 
        this.plazos = [new Date(fechaInicial), new Date(fechaFinal)]; // en formato ISODate()
        this.estado = estado;
        this.cliente = cliente; // Id del cliente referenciado

        // Actival Validacion de datos
        this.validarCampos();
    }

    // Validacion de datos 
    validarCampos() {
        if (!this.nombrepropuesta || typeof this.nombrepropuesta !== 'string') {
            throw new Error('Nombre inválido');
        }
        if (!this.descripcion || typeof this.descripcion !== 'string') {
            throw new Error('Descripcion inválida');
        }
        if (!this.precio || typeof this.precio !== 'number') {
            throw new Error('Precio Invalido');
        }
        if (!this.estado || typeof this.estado !== 'string') {
            throw new Error('Estado inválido');
        }
        if (!this.cliente || !ObjectId.isValid(this.cliente.toString())) {
            throw new Error('Cliente inválido');
        }
    } 
}

export default Propuesta;