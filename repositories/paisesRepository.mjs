import paisModel from "../models/paisModel.mjs";
import IRepository from "./IRepository.mjs";

class PaisesRepository extends IRepository {

    async obtenerTodos() {
        return await paisModel.find({ creator: "Haylén Ferrario" });
    }

    async obtenerPorId(id) {
        return await paisModel.findById(id);
    }


    async obtenerPorAtributo(atributo, valor) {
        return await paisModel.find({ [atributo]: valor });
    }
    
    async crearNuevo(datosPais) {
        return await paisModel.create(datosPais);
    }
    
    async modificar(id, nuevosDatos) {
        return await paisModel.findByIdAndUpdate(id, nuevosDatos, {new: true});
        
    }

    async eliminar(id) {
        return await paisModel.findByIdAndDelete(id);
    }
    
}

export default new PaisesRepository;