import { obtenerTodosPaises, obtenerPaisPorId, obtenerPaisPorAtributo, crearNuevoPais, modificarPais, eliminarPais } from '../services/paisesService.mjs';

export async function obtenerTodosPaisesController(req, res) {
    try {
       
        const paises = await obtenerTodosPaises();
       
        const { exito = null } = req.query; 

        res.render('dashboard', { 
            paises, 
            exito
        });

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener todos los paises', error: error.message });
    }
}

// Obtener pais por id
export async function obtenerPaisPorIdController(req, res) {
    try {
       const { id } = req.params;
       const pais = await obtenerPaisPorId(id);

       if(!pais) {
            return res.status(404).send({mensaje: 'Pais no encontrado.' });
        }

        res.render('infoPais', { pais });

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el pais', error: error.message });
    }
}

// Obtener pais por Atributo/Valor
export async function obtenerPaisPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const paises = await obtenerPaisPorAtributo(atributo, valor);

        if(paises.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron paises con ese atributo'});
        }

        /* Agregar que va a mostrar o si va a filtrar */

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener todos los paises', error: error.message });
    }
}

// Mostrar formulario crear
export async function mostrarFormCrearPaisController(req, res) {
    try {
        res.render('crearPais');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario de creacion', error: error.message });
    }
}

// Creacion nuevo Pais
export async function crearNuevoPaisController(req, res) {
    try {
        const datosPais = req.body;
        const nuevoPais = await crearNuevoPais(datosPais);

        res.redirect('/paises?exito=creado');

    } catch (error) {
       res.status(500).send({ mensaje: 'Error al crear nuevo pais', error: error.message }); 
    }
}

// Mostrar formulario editar
export async function mostrarFormEditarPaisController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);
        
        if (!pais) {
            return res.status(404).send({ mensaje: 'Pais no encontrado.' });
        }

        res.render('editarPais', { pais });

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario para modificar', error: error.message });
    }
}


// Modificar Pais
export async function modificarPaisController(req, res) {
    try {
        const { id } = req.params;
        //pedir datos que vienen fusionados del middleware
        const nuevosDatos = req.body;
        /* console.log('Datos recibidos en req.body:', req.body); */

        const paisModificado = await modificarPais(id, nuevosDatos);

        res.redirect('/paises?exito=editado');

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al modificar el Pais', error: error.message });
    }
}

// Mostrar formulario eliminar
export async function mostrarFormEliminarController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);

        if(!pais) {
            return res.status(404).send({mensaje: 'Pais no encontrado.' });
        }

        res.render('confirmarEliminacion', { pais });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario para eliminar', error: error.message });
    }
} 

// Eliminar pais
export async function eliminarPaisController(req, res) {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).send({ mensaje: 'ID no proporcionado' });
        }

        const paisEliminado = await eliminarPais(id);

        if (!paisEliminado) {
            return res.status(404).send({ mensaje: 'No se encontró un Pais con ese ID' });
        }

        res.redirect('/paises?exito=eliminado');

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el Pais', error: error.message });
    }
}