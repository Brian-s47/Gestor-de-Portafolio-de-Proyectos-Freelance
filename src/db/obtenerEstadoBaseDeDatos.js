import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export default async function obtenerEstadoBaseDeDatos() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gestordeproyectos';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('gestordeproyectos');
    console.log('🔌 Conexión exitosa a la base de datos');

    const colecciones = await db.listCollections({}, { nameOnly: true }).toArray();

    if (colecciones.length === 0) {
      console.log('⚠️ No hay colecciones creadas aún.');
      return;
    }

    console.log(`📦 Colecciones encontradas (${colecciones.length}):`);

    for (const col of colecciones) {
      const name = col.name;

      // Conteo de documentos
      const total = await db.collection(name).countDocuments();

      // Validación de esquema
      const info = await db.command({ listCollections: 1, filter: { name } });
      const validator = info.cursor.firstBatch[0]?.options?.validator;
      const tieneEsquema = validator && Object.keys(validator).length > 0;

      console.log(`- 🗂️ ${name}: ${total} documentos | Esquema: ${tieneEsquema ? '✅ Sí' : '❌ No'}`);
    }
  } catch (error) {
    console.error('❌ Error al conectar o consultar la base de datos:', error.message);
  }
}
