import { ObjectId } from "mongodb";


/**
 * Clase Finanzas
 * =============
 * Representa las finanzas de un cliente en el sistema. Define su estructura, validaciones,
 */

class Finanzas {
    constructor({
        idCliente,
        idProyecto,
        deudaActual = 0,
        valorDisponible = 0,
        abonos = [],
        costos = [],
        estado = true // Activo por defecto
    }) {
        this._id = new ObjectId();
        this.idCliente = idCliente;
        this.idProyecto = idProyecto;
        this.deudaActual = deudaActual;
        this.valorDisponible = valorDisponible;
        this.abonos = abonos;
        this.costos = costos;
        this.estado = estado;

        this.validarCampos();
    }

    validarCampos() {
        if (!this.idCliente || !(this.idCliente instanceof ObjectId)) {
            throw new Error('ID de cliente inválido');
        }
        if (!this.idProyecto || !(this.idProyecto instanceof ObjectId)) {
            throw new Error('ID de proyecto inválido');
        }
        if (typeof this.deudaActual !== 'number' || this.deudaActual < 0) {
            throw new Error('Deuda actual inválida');
        }
        if (typeof this.valorDisponible !== 'number' || this.valorDisponible < 0) {
            throw new Error('Valor disponible inválido');
        }
        if (typeof this.estado !== 'boolean') {
            throw new Error('Estado inválido');
        }
    }
}

export default Finanzas;
