import { conectarDB } from '../config/db.js';

// Función para eliminar todas las colecciones completamente (datos + esquema)
export default async function resetDatabase() {
  const dbName = "gestordeproyectos";
  const client = await conectarDB();
  const db = client.db(dbName);

  try {
    const collections = [
      'clientes',
      'propuestas',
      'proyectos',
      'estadoDeCuenta'
    ];

    for (const col of collections) {
      const existe = await db.listCollections({ name: col }).hasNext();

      if (existe) {
        await db.collection(col).drop();
        console.log(`🗑️ Colección "${col}" eliminada completamente (datos + esquema).`);
      } else {
        console.log(`ℹ️ La colección "${col}" no existe. Nada que eliminar.`);
      }
    }

    console.log("✅ Base de datos reiniciada. Colecciones eliminadas completamente.");
  } catch (err) {
    console.error("❌ Error eliminando colecciones:", err.message);
  } finally {
        console.log("ℹ️ Hard reset completo.");
  }
}
