import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

export default async function crearColeccionesConEsquema() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gestordeproyectos';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("gestordeproyectos");

    const colecciones = ["clientes", "propuestas", "proyectos", "estadoDeCuenta"];
    const existentes = await db.listCollections({}, { nameOnly: true }).toArray();
    const nombresExistentes = existentes.map(col => col.name);

    for (const nombre of colecciones) {
      const existe = nombresExistentes.includes(nombre);

      if (existe) {
        const info = await db.command({ listCollections: 1, filter: { name: nombre } });
        const validator = info.cursor.firstBatch[0]?.options?.validator;

        if (validator) {
          console.log(`❌ La colección "${nombre}" ya existe con un esquema. No se puede cargar el esquema.`);
          continue;
        } else {
          console.log(`❌ La colección "${nombre}" ya existe. No se puede cargar el esquema.`);
          continue;
        }
      }

      switch (nombre) {
        case "clientes":
          await db.createCollection("clientes", {
            validator: {
              $jsonSchema: {
                bsonType: "object",
                required: ["_id", "nombre", "cedula", "telefono", "correo", "fecha", "propuestas", "proyectos", "pagos", "deuda","estado"],
                properties: {
                  _id: { bsonType: "objectId" },
                  nombre: { bsonType: "string",pattern: "^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$",description: "Nombre del cliente, solo letras y espacios permitidos." },
                  cedula: { bsonType: "string", pattern: "^[0-9]+$", description: "Cédula del cliente, solo números permitidos." },
                 telefono: {bsonType: "string",pattern: "^\\+?[0-9]+$",description: "Teléfono del cliente. Puede comenzar con '+', seguido solo de números. No se permiten letras ni caracteres especiales."},
                  correo: { bsonType: "string", pattern: "^\\S+@\\S+\\.\\S+$", description: "Correo electrónico del cliente." },
                  fecha: { bsonType: "date", description: "Fecha de creación del cliente." },
                  propuestas: { bsonType: "array", items: { bsonType: "objectId" } },
                  proyectos: { bsonType: "array", items: { bsonType: "objectId" } },
                  pagos: { bsonType: "array", items: { bsonType: "object" } },
                  deuda: { bsonType: "number", minimum: 0 },
                  estado:{bsonType: "bool"}
                }
              }
            }
          });
          console.log("✅ Esquema de clientes creado.");
          break;

        case "propuestas":
          await db.createCollection("propuestas", {
            validator: {
              $jsonSchema: {
                bsonType: "object",
                required: ["_id", "nombrepropuesta", "descripcion", "precio", "plazos", "estado", "cliente"],
                properties: {
                  _id: { bsonType: "objectId" },
                  nombrepropuesta: { bsonType: "string" },
                  descripcion: { bsonType: "string" },
                  precio: { bsonType: "number", minimum: 0 },
                  plazos: { bsonType: "array", minItems: 2, maxItems: 2, items: { bsonType: "date" } },
                  estado: { bsonType: "string", enum: ["pendiente", "aceptada", "rechazada"] },
                  cliente: {bsonType: "objectId" }
                }
              }
            }
          });
          console.log("✅ Esquema de propuestas creado.");
          break;


        case "proyectos":
          await db.createCollection("proyectos", {
            validator: {
              $jsonSchema: {
                bsonType: "object",
                required: [
                  "_id",
                  "nombredelproyecto",
                  "descripcion",
                  "propuesta",
                  "entregables",
                  "estado",
                  "contratos",
                  "cliente",
                  "estadoDeCuenta"
                ],
                properties: {
                  _id: { bsonType: "objectId" },
                  nombredelproyecto: { bsonType: "string" },
                  descripcion: {
                    bsonType: "array",
                    items: { bsonType: "string" }
                  },
                  propuesta: {
                    bsonType: "object",
                    required: [
                      "_id",
                      "nombrepropuesta",
                      "descripcion",
                      "precio",
                      "plazos",
                      "estado",
                      "cliente"
                    ],
                    properties: {
                      _id: { bsonType: "objectId" },
                      nombrepropuesta: { bsonType: "string" },
                      descripcion: { bsonType: "string" },
                      precio: { bsonType: "number", minimum: 0 },
                      plazos: {
                        bsonType: "array",
                        items: { bsonType: "date" },
                        minItems: 2,
                        maxItems: 2
                      },
                      estado: {
                        bsonType: "string",
                        enum: ["pendiente", "aceptada", "rechazada"]
                      },
                      cliente: { bsonType: "objectId" }
                    }
                  },
                  entregables: {
                    bsonType: "array",
                    items: {
                      bsonType: "object",
                      required: ["descripcion", "fechadeentrega", "estado", "link","historial"],
                      properties: {
                        descripcion: { bsonType: "string" },
                        fechadeentrega: { bsonType: "date" },
                        estado: {
                          bsonType: "string",
                          enum: ["pendiente", "entregado", "aprobado", "rechazado"]
                        },
                        link: {
                          anyOf: [{ bsonType: "string" }, { bsonType: "null" }]
                        },
                        historial:{
                          bsonType: "array",
                          items: { bsonType: "object" },
                        }
                          
                        
                      }
                    }
                  },
                  estado: {
                    bsonType: "string",
                    enum: ["activo", "pausado", "finalizado", "cancelado"]
                  },
                  contratos: {
                    bsonType: "object",
                    required: [
                      "condiciones",
                      "fecha_inicio",
                      "fecha_fin",
                      "presupuestoInicial",
                      "cliente",
                      "desarrollador"
                    ],
                    properties: {
                      condiciones: {
                        bsonType: "array",
                        items: { bsonType: "string" }
                      },
                      fecha_inicio: { bsonType: "date" },
                      fecha_fin: { bsonType: "date" },
                      presupuestoInicial: { bsonType: "number", minimum: 0 },
                      cliente: { bsonType: "objectId" },
                      desarrollador: { bsonType: "string" }
                    }
                  },
                  cliente: { bsonType: "objectId" },
                  estadoDeCuenta: {
                    anyOf: [{ bsonType: "objectId" }, { bsonType: "null" }]
                  }
                }
              }
            }
          });
          console.log("✅ Esquema de proyectos creado.");
          break;

        case "estadoDeCuenta":
          await db.createCollection("estadoDeCuenta", {
            validator: {
              $jsonSchema: {
                bsonType: "object",
                required: [
                  "_id",
                  "idCliente",
                  "idProyecto",
                  "deudaActual",
                  "valorDisponible",
                  "abonos",
                  "costos",
                  "estado"
                ],
                properties: {
                  _id: { bsonType: "objectId" },
                  idCliente: { bsonType: "objectId" },
                  idProyecto: { bsonType: "objectId" },
                  deudaActual: { bsonType: "number", minimum: 0 },
                  valorDisponible: { bsonType: "number", minimum: 0 },
                  abonos: { bsonType: "array", items: {} },
                  costos: { bsonType: "array", items: {} },
                  estado: {bsonType: "bool"}
                }
              }
            }
          });
          console.log("✅ Esquema de estadoDeCuenta creado.");
          break;
      }
    }
  } catch (error) {
    console.error("❌ Error al crear esquemas:", error.message,error);
  } finally {
    
    console.log("Esquema cargado correctamente.");
  }
}
