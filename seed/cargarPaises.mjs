import { obtenerPaises } from '../services/paisesAPIService.mjs';
import paisModel from '../models/paisModel.mjs';
import { connectDB } from '../config/configDB.mjs' 

//conectar a MongoDB
await connectDB();

// Traer los países desde la API
const paises = await obtenerPaises(); 
console.log('Paises obtenidos:', paises);

// Recorrer el array paises y hacer el upsert a MongoDB
for (const pais of paises) {
    await paisModel.updateOne(
        { name: pais.name },  // Buscar por nombre
        { $set: pais },       // Actualiza los campos que cambien
        { upsert: true }      // Si no existe, lo crea
    );
}
console.log('Carga de países finalizada');

