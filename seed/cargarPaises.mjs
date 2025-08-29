
import { obtenerPaisesAPI } from '../services/paisesAPIService.mjs';
import paisModel from '../models/paisModel.mjs';
import { connectDB } from '../config/configDB.mjs';
import mongoose from 'mongoose';

const CREATOR = "Haylén Ferrario";

try {
  await connectDB();

  // Contar si ya hay países cargados para este creator
  const count = await paisModel.countDocuments({ creator: CREATOR });
  if (count > 0) {
    console.log(`Ya hay ${count} países cargados para ${CREATOR}. No se hará la carga inicial.`);
    process.exit(0);
  }

  const paises = await obtenerPaisesAPI();
  const paisesConCreator = paises.map(pais => ({ ...pais, creator: CREATOR }));

  await paisModel.insertMany(paisesConCreator);
  console.log(`Carga inicial finalizada: ${paisesConCreator.length} países.`);
} catch (err) {
  console.error("Error en la carga inicial:", err);
} finally {
  await mongoose.disconnect();
}
