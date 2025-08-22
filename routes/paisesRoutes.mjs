import express from 'express';
import {
  obtenerTodosPaisesController,
  obtenerPaisPorIdController,
  obtenerPaisPorAtributoController,
  mostrarFormCrearPaisController,
  crearNuevoPaisController,
  mostrarFormEditarPaisController,
  modificarPaisController,
  mostrarFormEliminarController,
  eliminarPaisController,
} from '../controllers/paisesController.mjs';
import { paisValidation } from '../validations/paisesValidations.mjs';
import { handleValidationErrors } from '../validations/paisesError.mjs';
import { transformarDatosPais } from '../validations/transformarDatos.mjs'

const router = express.Router();


/* ---- CREAR ---- */

// Mostrar formulario para crear un país
router.get('/paises/crear', mostrarFormCrearPaisController);

// Crear nuevo país con validaciones
router.post('/paises/crear', transformarDatosPais, paisValidation(), handleValidationErrors, crearNuevoPaisController);

// Obtener todos los países
router.get('/paises', obtenerTodosPaisesController);

// Obtener pais por Atributo/Valor
router.get('/paises/atributo/:atributo/:valor', obtenerPaisPorAtributoController);

// Obtener Pais por id
router.get('/paises/:id', obtenerPaisPorIdController);

/* ---- EDITAR ----- */

// Mostrar formulario para editar un país
router.get('/paises/editar/:id', mostrarFormEditarPaisController);

// Modificar país con validaciones
router.put('/paises/editar/:id', transformarDatosPais, paisValidation(), handleValidationErrors, modificarPaisController);

/* ---- ELIMINAR ----- */
// Mostrar form de confirmacion para eliminar
router.get('/paises/:id/confirmar-eliminacion', mostrarFormEliminarController);

// Eliminar país por ID
router.delete('/paises/:id', eliminarPaisController);

//Ruta a Acerca de..
router.get('/acercaDe', (req, res) => res.render('acercaDe'));

export default router;
