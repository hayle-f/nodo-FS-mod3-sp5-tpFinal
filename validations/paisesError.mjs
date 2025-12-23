import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    // Obtiene los errores generados por las validaciones definidas en paisValidation()
    const errors = validationResult(req); 
    
    // Si hay errores, convertirlos en un array de objetos (uno por cada error)
    if (!errors.isEmpty()) {
        const errores = errors.array();
        
        // Filtrar errores duplicados por campo y mensaje
        const erroresUnicos = errores.filter((error, index, self) => {

            //Quita los índices numéricos de los campos tipo array (ej: "capital[0]" → "capital")
            const pathSinIndices = error.path.replace(/\[\d+\]/g, '');

            // por cada error, busca en el array completo el primer error que tenga mismo mensaje y mismo path base. si el indice del error no coincide con el primero que se encuentra es duplicado y se descarta.

            return index === self.findIndex(
                e => e.msg === error.msg && e.path.replace(/\[\d+\]/g, '') === pathSinIndices
            );
        });

        const datos = req.body;

        // ID del país para re-renderizar el formulario con errores: se obtiene de params, URL o body
        const id = req.params.id || req.originalUrl.split("/editar/")[1]?.split("?")[0] || datos._id;

        // Determinar la vista desde la url (crear o editar)
        const vista = req.originalUrl.includes("/editar") ? "editarPais" : "crearPais";

        // Renderizar la vista con errores y datos ya ingresados
        return res.status(400).render(vista, {
            pais: { ...datos, _id: id },
            errores: erroresUnicos
        });
    }

    next();
};


