
import mongoose from "mongoose";

export async function connectDB() {
    try {
        // Usar la URI del .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión exitosa con MongoDB');
    } catch(err) {
        console.error('Error al conectar a MongoDB:', err);
        process.exit(1); // termina el proceso si falla la conexión
    }
}
