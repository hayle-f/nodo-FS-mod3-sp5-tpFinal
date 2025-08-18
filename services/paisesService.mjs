import paisesRepository from '../repositories/paisesRepository.mjs'

export async function obtenerTodosPaises() {
    return await paisesRepository.obtenerTodos();
}


export async function obtenerPaisPorId(id) {
    return await paisesRepository.obtenerPorId(id);
}


export async function obtenerPaisPorAtributo(atributo, valor) {
    return await paisesRepository.obtenerPorAtributo(atributo,valor);
}


export async function crearNuevoPais(datosPais) {
    return await paisesRepository.crearNuevo(datosPais);
}


export async function modificarPais(id, nuevosDatos) {
    return await paisesRepository.modificar(id, nuevosDatos);
}


export async function eliminarPais(id) {
    return await paisesRepository.eliminar(id); 
}