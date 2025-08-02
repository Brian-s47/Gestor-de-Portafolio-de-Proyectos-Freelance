// datos iniciales de prueba
import { ObjectId } from 'mongodb';
import { conectarDB } from '../config/db.js';
import { crearPropuesta } from '../services/propuestasService.js';
import { crearProyectoTransaccion } from '../services/proyectosService.js';

async function seedDatabase() {
  const client = await conectarDB(); // conexión asegurada
  const db = client.db("gestordeproyectos");

  try {
    console.log("✅ Conectado a MongoDB: Atlas");

    // Crear cliente
    const cliente = {
      _id: new ObjectId(),
      nombre: "Juan Perez",
      cedula: "12345678",
      telefono: "5551234",
      correo: "juanperez@example.com",
      fecha: new Date(),
      propuestas: [],
      proyectos: [],
      pagos: [],
      deuda: 0,
      estado: true
    };

    // Crear propuesta asociada
    const propuesta = {
      _id: new ObjectId(),
      nombrepropuesta: "Propuesta Diseño Web",
      descripcion: "Diseño y desarrollo de sitio web para presentación de portafolio personal.",
      precio: 1500,
      plazos: [new Date("2025-08-01"), new Date("2025-09-01")],
      estado: "pendiente",
      cliente: cliente._id
    };

    // Crear contrato
    const contrato = {
      condiciones: [
        "El cliente debe proporcionar el contenido (textos e imágenes)",
        "Se permiten hasta 2 revisiones por entregable",
        "El pago debe realizarse en dos partes: 50% al inicio y 50% al final"
      ],
      fecha_inicio: new Date("2025-08-01"),
      fecha_fin: new Date("2025-09-01"),
      presupuestoInicial: 1500,
      cliente: cliente._id,
      desarrollador: "Ana Gómez"
    };

    // Ejecutar todo el flujo dentro de la transacción
    await crearProyectoTransaccion(db, {
      cliente,       // el cliente se inserta dentro de la transacción
      propuesta,     // también se embebe en el proyecto
      contrato,      // usado para el proyecto y la finanza
      nombre: "Sitio Web Portafolio",
      descripcion: "Sitio responsive para mostrar el portafolio del cliente.",
      entregables: [
        {
          descripcion: "Wireframes y estructura base del sitio",
          fechadeentrega: new Date("2025-08-10"),
          estado: "pendiente",
          link: null
        }
      ]
    });

    console.log("✅ Datos iniciales insertados correctamente.");
  } catch (err) {
    console.error("❌ Error insertando datos de prueba:", err.message, err);
  } finally {
    console.log("📦 Seed finalizado.");
  }
}

export default seedDatabase;
