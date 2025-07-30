// db.js
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const nombreDB = "gestordeproyectos"; // nombre de la DB
const conectarDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gestordeproyectos';
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`✅ Conectado a MongoDB: ${uri.includes('localhost') ? 'Local' : 'Atlas'}`);
        return client.db(nombreDB);
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        process.exit(1);
    }
};

export default conectarDB;
