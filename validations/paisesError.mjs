import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errores = errors.array();
        
        // Filtrar errores duplicados por campo y mensaje
        const erroresUnicos = errores.filter((error, index, self) => {
            const pathSinIndices = error.path.replace(/\[\d+\]/g, '');
            return index === self.findIndex(
                e => e.msg === error.msg && e.path.replace(/\[\d+\]/g, '') === pathSinIndices
            );
        });

        const datos = req.body;

        /* ========================
           RESPUESTA JSON COMENTADA
           ========================
        // Si es una petición tipo API (Postman, fetch, etc)
        if (req.headers.accept?.includes('application/json')) {
            return res.status(400).json({
                estado: 'error',
                mensaje: 'Validación fallida',
                errores: erroresUnicos.map(error => ({
                    campo: error.path,
                    mensaje: error.msg,
                })),
            });
        }
        */

        // Obtener el ID en caso de ser edición
        const id = req.params.id || req.originalUrl.split("/editar/")[1]?.split("?")[0] || datos._id;

        // Determinar la vista (crear o editar)
        const vista = req.originalUrl.includes("/editar") ? "editarPais" : "crearPais";

        // Renderizar la vista con errores y datos ya ingresados
        return res.status(400).render(vista, {
            pais: { ...datos, _id: id },
            errores: erroresUnicos
        });
    }

    next();
};


