// Creacion de Clase
class Propuesta {
    constructor (nombrepropuesta, descripcion, precio, fechaInicial, fechaFinal, estado, cliente){
        //Atributos generales
        this.nombrepropuesta = nombrepropuesta; // Debe ser de tipo String no recibir simbolos ni numeros y no puede estar vacio
        this.descripcion = descripcion; // Debe ser de tipo string
        this.precio = precio; // debe ser de tipo int 
        this.plazos = [new Date(fechaInicial), new Date(fechaFinal)]; // en formato ISODate()
        this.cliente = cliente; // Id del cliente referenciado
        this.estado = "pendiente"
    }

    // Validacion de datos 
    validarCampos() {
        if (!this.nombre || typeof this.nombre !== 'string') {
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
        if (!this.cliente || typeof this.cliente !== '_id') {
            throw new Error('Cliente inválido');
        }
    } 
}

export default Propuesta;