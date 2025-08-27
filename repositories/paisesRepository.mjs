

import paisModel from "../models/paisModel.mjs";
import IRepository from "./IRepository.mjs";

// Implementación concreta del repositorio para países
class PaisesRepository extends IRepository {

    // Devuelve todos los países creados por el usuario específico
    async obtenerTodos() {
        return await paisModel.find({ creator: "Haylén Ferrario" });
    }

     // Devuelve un país por su _id de Mongo
    async obtenerPorId(id) {
        return await paisModel.findById(id);
    }

    // Devuelve países filtrando por un atributo dinámico
    async obtenerPorAtributo(atributo, valor) {
        return await paisModel.find({ [atributo]: valor });
    }
    
    // Crea un nuevo país en la base de datos
    async crearNuevo(datosPais) {
        return await paisModel.create(datosPais);
    }
    
    // Modifica un país existente y devuelve el documento actualizado
    async modificar(id, nuevosDatos) {
        return await paisModel.findByIdAndUpdate(id, nuevosDatos, {new: true});
        
    }

    // Elimina un país por su _id
    async eliminar(id) {
        return await paisModel.findByIdAndDelete(id);
    }
    
}

export default new PaisesRepository;