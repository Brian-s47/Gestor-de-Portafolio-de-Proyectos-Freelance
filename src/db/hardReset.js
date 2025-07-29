import conectarDB from '../config/db.js';

//funcion para elminiar todos los datos de la base de datos ,deja las colleciones

export default async function resetDatabase() {
    const dbName = "gestordeproyectos";
    const client = await conectarDB();
    const db = client.db(dbName);

    try {
        // Lista de colecciones que deseas limpiar
        const collections = [
            'clientes',
            'propuestas',
            'proyectos',
            'estadoDeCuenta'
        ];

        for (const col of collections) { // san buclesito for
            const result = await db.collection(col).deleteMany({}); //funcion para esperar y elimiar todas las colleciones una por una
            console.log(`🧹 Colección "${col}" limpiada: ${result.deletedCount} documentos eliminados`);
        }

        console.log("✅ Base de datos reiniciada correctamente.");
    } catch (err) {
        console.error("❌ Error reseteando la base de datos:", err.message);
    } finally {
        client.close();
    }
}

