// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB
// Creacion de Clase
class Proyecto {
    constructor (nombre, descripcion, propuesta, entregables = [], contrato = {}, clienteId){
        //Atributos generales
        this.nombredelproyecto = nombre; // String ingresado por el ussuario
        this.descripcion = descripcion; // String ingresado por el usuario
        this.propuesta = propuesta; // embebido de propuesta seleccionada antes de crear proyecto por el ususario de las propuestas con estado aceptado
        this.entregables = entregables; // Array vacio que se llenada de obgetos, entregables
        this.contrato = contrato; // Objeto el cual contendra el contrado diligenciado por el usuario
        this.estado = "Activo"; // por defecto Activo iniciando posibles: activo, pausado, finalizado, cancelado
        this.cliente = clienteId; // cliente Id referenciado
    }

    // Validacion de datos 
    validarCampos() {
        if (!this.nombredelproyecto || typeof this.nombredelproyecto !== 'string') {
        throw new Error('Nombre del proyecto inválido');
        }

        if (!Array.isArray(this.descripcion) || this.descripcion.length === 0 || !this.descripcion.every(d => typeof d === 'string')) {
        throw new Error('Descripción inválida (debe ser array de strings)');
        }

        if (!this.propuesta || typeof this.propuesta !== 'object') {
        throw new Error('Propuesta embebida inválida');
        }

        if (!Array.isArray(this.entregables)) {
        throw new Error('Entregables debe ser un array');
        }

        if (!this.contrato || typeof this.contrato !== 'object') {
        throw new Error('Contrato inválido');
        }

        const estadosValidos = ['activo', 'pausado', 'finalizado', 'cancelado'];
        if (!estadosValidos.includes(this.estado.toLowerCase())) {
        throw new Error(`Estado inválido. Debe ser uno de: ${estadosValidos.join(', ')}`);
        }

        if (!(this.cliente instanceof ObjectId)) {
        throw new Error('Cliente debe ser un ObjectId válido');
        }
    }
}

export default Proyecto;