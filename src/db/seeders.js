// datos iniciales de prueba
import { ObjectId } from 'mongodb';
import { conectarDB } from '../config/db.js';

// función para cargar los datos iniciales a la base de datos
async function seedDatabase() {
  const client = await conectarDB(); // conexión asegurada
  const db = client.db("gestordeproyectos");

  try {
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
      descripcion: "Diseño y desarrollo de sitio web para presentación de portafolio personal.",
      precio: 1500,
      plazos: [new Date("2025-08-01"), new Date("2025-09-01")],
      estado: "pendiente",
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
          estado: "pendiente",
          link: null
        }
      ],
      estados: "activo",
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
      cliente: cliente._id,
      estadoDeCuenta: null
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
      deudaActual: 1500,
      valorDisponible: 0,
      abonos: [],
      costos: []
    };
    await db.collection('estadoDeCuenta').insertOne(estadoDeCuenta);

    await db.collection('proyectos').updateOne(
      { _id: proyecto._id },
      { $set: { estadoDeCuenta: estadoDeCuenta._id } }
    );

    console.log("✅ Datos iniciales insertados correctamente.");
  } catch (err) {
    console.error("❌ Error insertando datos de prueba:", err.message);
  } finally {
    await client.close(); // cerrar siempre la conexión tras usar
    console.log("🔌 Conexión cerrada.");
  }
}

export default seedDatabase;
