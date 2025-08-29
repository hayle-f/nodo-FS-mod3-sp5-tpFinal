import cron from 'node-cron';
import { obtenerPaisesAPI } from '../services/paisesAPIService.mjs';
import paisModel from '../models/paisModel.mjs';

const CREATOR = "Haylén Ferrario";

/* c/minuto: * * * * *
   c/24hs: 0 0 * * *                 */

cron.schedule('0 0 * * *', async () => {
  console.log('Iniciando actualización automática de países...');
  try {
    const paises = await obtenerPaisesAPI();
    for (const pais of paises) {
      await paisModel.updateOne(
        { name: pais.name, creator: CREATOR },
        { $set: { ...pais, creator: CREATOR } },
        { upsert: true }
      );
    }
    console.log('Actualización de países completada.');
  } catch (err) {
    console.error('Error al actualizar países automáticamente:', err);
  }
});