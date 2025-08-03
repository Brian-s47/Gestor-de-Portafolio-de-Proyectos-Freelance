// Importamos ObjectId de MongoDB para asignar IDs únicos como los usados en la base de datos
import { ObjectId } from 'mongodb';

/**
 * Clase Cliente
 * =============
 * Representa un cliente del sistema. Define su estructura, validaciones,
 * y actúa como entidad principal de negocio.
 */
class Cliente {
    constructor({
        nombre,
        cedula,
        telefono,
        correo,
        fecha = new Date(),
        propuestas = [],
        proyectos = [],
        //contratos = [],
        pagos = [],
        deuda = 0,
        estado = true // valor por defecto: activo
    }) {
        // Asignación de propiedades del cliente
        this._id = new ObjectId();  // Genera un identificador único
        this.nombre = nombre;
        this.cedula = cedula;
        this.telefono = telefono;
        this.correo = correo;
        this.fecha = fecha;
        this.propuestas = propuestas;
        this.proyectos = proyectos;
        //this.contratos = contratos;
        this.pagos = pagos;
        this.deuda = deuda;
        this.estado = estado;

        // Validación automática al crear una instancia
        this.validarCampos();
    }

    /**
     * validarCampos
     * =============
     * Método interno para asegurar que los datos del cliente sean válidos.
     */
    validarCampos() {
        if (!this.nombre || typeof this.nombre !== 'string') {
        throw new Error('Nombre inválido');
        }
        if (!this.cedula || typeof this.cedula !== 'string') {
        throw new Error('Cédula inválida');
        }
        if (!this.telefono || typeof this.telefono !== 'string') {
        throw new Error('Teléfono inválido');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.correo || !emailRegex.test(this.correo)) {
        throw new Error('Correo inválido');
        }
    }
}

export default Cliente;