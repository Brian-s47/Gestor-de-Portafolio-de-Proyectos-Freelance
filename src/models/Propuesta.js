// Zona de importacion de librerias
import { ObjectId } from 'mongodb'; // Para obtener el id generado por MongoDB
import conectarDB from '../config/db.js'; // Conexion con base de datos

// Zona de importacion de modulos


// Creacion de Clase
class Propuesta {
    constructor (nombre, descripcion, precio, fechaInicial, fechaFinal, estado = "pendiente", cliente){
        //Atributos generales
        this.nombre = nombre; // Debe ser de tipo String no recibir simbolos ni numeros y no puede estar vacio
        this.descripcion = descripcion; // Debe ser de tipo string
        this.precio = precio; // debe ser de tipo int 
        this.plazos = [new Date(fechaInicial), new Date(fechaFinal)]; // en formato ISODate()
        this.estado = estado; // el estado inica en pendiente las demas opciones se daran al solicitar datos o ejeutar metodo de cambio de estado
        this.cliente = cliente; // El cliente debe venir en Obgeto -> discutir que deberia ser solo un cliente para la propuesta
    }
    // Metodos

    // Modificar datos de una propuesta
    static async modificarPropuesta(id, atributoCambiar, datoNuevo){

        const db = await conectarDB();
        const coleccion = db.collection('propuestas');
        switch (atributoCambiar) { 
        case 'nombre':
            await coleccion.updateOne(
            { _id: new ObjectId(id) }, 
            {
                $set: {nombre: datoNuevo}
            });
            break;
        case 'descripcion':
            await coleccion.updateOne(
            { _id: new ObjectId(id) }, 
            {
                $set: {descripcion: datoNuevo}
            });
            break;
        case 'precio':
            await coleccion.updateOne(
            { _id: new ObjectId(id) }, 
            {
                $set: {precio: datoNuevo}
            });
            break;
        case 'fechaInicial':
            await coleccion.updateOne(
            { _id: new ObjectId(id) }, 
            {
                $set: {fechaInicial: datoNuevo}
            });
            break;
        case 'fechafinal':
            await coleccion.updateOne(
            { _id: new ObjectId(id) }, 
            {
                $set: {fechafinal: datoNuevo}
            });
            break;
        case 'cliente':
            await coleccion.updateOne(
            { _id: new ObjectId(id) }, 
            {
                $set: {cliente: datoNuevo}
            });
            break;
        default:
            throw new Error(`El atributo "${atributoCambiar}" no es modificable.`);
        }
    };

    // Cambiar estado de propuesta
    static async cambiarEstadoPropuesta(id, nuevoEstado){
        const db = await conectarDB();
        const coleccion = db.collection('propuestas');
        await coleccion.updateOne(
        { _id: new ObjectId(id) }, 
        {$set: {estado: nuevoEstado}});
    };

    // Geters
    // Obtener las propuestas
    static async getPropuestas(){
        const db = await conectarDB(); // Conectamos con la BD y la traemos
        const coleccion = db.collection('propuestas'); // Traemos la coleccion de la BD
        const propuestas = await coleccion.find().toArray(); // traemos todas las propuestas y los comvertimos en Array
        return propuestas; // Devolvemos el array obtenido
    };
    // Obtener una propuesta por Id
    static async getPropuestaId(id){
        const db = await conectarDB();
        const coleccion = db.collection('propuestas');
        return await coleccion.findOne({ _id: new ObjectId(id) });
    };  
    
    // Setters
    static async setPropuesta(propuesta){
        const db = await conectarDB();
        const coleccion = db.db('propuestas');
        try {
            const resultado = await coleccion.insertOne(propuesta);
            console.log('✅ Propuesta guardada en la base de datos con Nombre:', propuesta.nombre);
            return resultado;
        } catch (error) {
            console.error('❌ Error al insertar propuesta:', error.message);
            throw error;
        }
    };
}

export default Propuesta;