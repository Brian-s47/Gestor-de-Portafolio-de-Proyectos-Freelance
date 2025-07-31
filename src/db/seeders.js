//datos iniciales de prueba

import { ObjectId } from 'mongodb';
import conectarDB from '../config/db.js';

//funcion para cargar los datos iniciales a la base de datos
async function seedDatabase() {
    const dbName = "gestordeproyectos" //nombre de la base de datos
    const client = await conectarDB();
    const db = client.db(dbName)

    // Insertar un cliente
    const cliente = {
        _id: new ObjectId(),
        nombre: "Juan Perez",
        cedula: "12345678",
        telefono: "555-1234",
        correo: "juanperez@example.com",
        fecha: new Date(),
        propuestas: [],
        proyectos: [],
        pagos: [],
        deduda: 0
    };
    await db.collection('clientes').insertOne(cliente);

    // Insertar una propuesta
    const propuesta = {
        _id: new ObjectId(),
        nombrepropuesta: "Propuesta Diseño Web",
        descripción: "Diseño y desarrollo de sitio web para presentación de portafolio personal.",
        precio: 1500,
        plazos: [new Date("2025-08-01"), new Date("2025-09-01")],
        estado: "pendiente", // enum: pendiente, aceptada, rechazada
        clentes: [{
            _id: cliente._id,
            nombre: cliente.nombre,
            cedula: cliente.cedula,
            telefono: cliente.telefono,
            correo: cliente.correo
        }]
    };
    await db.collection('propuestas').insertOne(propuesta);

    await db.collection('clientes').updateOne(
        { _id: cliente._id },
        { $push: { propuestas: propuesta._id } }
    );

    // Crear un proyecto
    const proyecto = {
        _id: new ObjectId(),
        nombredelproyecto: "Sitio Web Portafolio",
        descripcion: [
            "El proyecto consiste en el desarrollo de un sitio web estático con HTML, CSS y JavaScript.",
            "El objetivo es presentar los trabajos de diseño del cliente de forma profesional y accesible.",
            "Debe ser responsive, incluir secciones para portfolio, contacto y presentación personal."
        ],
        propuesta: propuesta, // embebida
        entregables: [
            {
                descripcion: "Wireframes y estructura base del sitio",
                fechadeentrega: new Date("2025-08-10"),
                estado: "pendiente", // enum: pendiente, entregado, aprobado, rechazado
                link: null
            }
        ],
        estados: "activo", // enum: activo, pausado, finalizado, cancelado
        contratos: {
            condiciones: [
                "El cliente debe proporcionar el contenido (textos e imágenes)",
                "Se permiten hasta 2 revisiones por entregable",
                "El pago debe realizarse en dos partes: 50% al inicio y 50% al final"
            ],
            fecha_inicio: new Date("2025-08-01"),
            fecha_fin: new Date("2025-09-01"),
            presupuestoInicial: 1500,
            cliente: {
                _id: cliente._id,
                nombre: cliente.nombre,
                cedula: cliente.cedula,
                telefono: cliente.telefono,
                correo: cliente.correo
            },
            desarrollador: "Ana Gómez"
        },
        cliente: cliente._id, // referenciado
        estadoDeCuenta: null // se actualizará luego
    };
    await db.collection('proyectos').insertOne(proyecto);

    await db.collection('clientes').updateOne(
        { _id: cliente._id },
        { $push: { proyectos: proyecto._id } }
    );

    // Crear estado de cuenta
    const estadoDeCuenta = {
        _id: new ObjectId(),
        IdCliente: cliente._id,
        IdProyecto: proyecto._id,
        deudaActual: 1500, // inicial sin abonos
        valorDisponible: 0,
        abonos: [],
        costos: []
        
        
    };
    await db.collection('estadoDeCuenta').insertOne(estadoDeCuenta);

    // Actualizar el proyecto para referenciar el estado de cuenta
    await db.collection('proyectos').updateOne(
        { _id: proyecto._id },
        { $set: { estadoDeCuenta: estadoDeCuenta._id } }
    );

    client.close();
    console.log("Datos iniciales insertados correctamente.");
}

export default seedDatabase;
