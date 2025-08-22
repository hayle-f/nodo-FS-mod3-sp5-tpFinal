import { obtenerPaisesAPI } from '../services/paisesAPIService.mjs';
import paisModel from '../models/paisModel.mjs';
import { connectDB } from '../config/configDB.mjs';

// Conectar a MongoDB
await connectDB();

// Mi nombre de creador
const CREATOR = "Haylén Ferrario";

// Traer los países desde la API
const paises = await obtenerPaisesAPI();
console.log('Paises obtenidos:', paises.length);

// Recorrer el array y hacer upsert con creator
for (const pais of paises) {
    try {
        await paisModel.updateOne(
            { name: pais.name, creator: CREATOR }, // Buscar por nombre + creador
            { $set: { ...pais, creator: CREATOR } },  // Actualiza o crea con mi creator
            { upsert: true }
        );
    } catch (err) {
        console.error('Error al actualizar/crear país:', pais.name, err);
    }
}

console.log('Carga de países finalizada para', CREATOR);


