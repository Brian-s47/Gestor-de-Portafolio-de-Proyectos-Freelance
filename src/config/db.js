import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let clienteGlobal = null;

const conectarDB = async () => {
    if (clienteGlobal) return clienteGlobal;

    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gestordeproyectos';
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`✅ Conectado a MongoDB: ${uri.includes('localhost') ? 'Local' : 'Atlas'}`);
        clienteGlobal = client;
        return client;
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        process.exit(1);
    }
};

const obtenerDB = async () => {
    const client = await conectarDB();
    return client.db('gestordeproyectos');
};

export { conectarDB, obtenerDB };