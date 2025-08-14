import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://grupo-02:grupo02@cursadanodejs.ls9ii.mongodb.net/Node-js');
        console.log('Coneccion exitosa con MongoDB');
    } catch(err) {
        console.error('Error al conectar a MongoDB.', err);
        process.exit(1);
    }
}