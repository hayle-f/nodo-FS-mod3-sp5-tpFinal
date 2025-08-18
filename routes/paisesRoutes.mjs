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
import { paisValidation } from '../validations/paisValidationsRules.mjs';
import { handleValidationErrors } from '../validations/paisError.middleware.mjs';

const router = express.Router();



// Obtener todos los países
router.get('/paises', obtenerTodosPaisesController);

// Obtener pais por Atributo/Valor
router.get('/paises/atributo/:atributo/:valor', obtenerPaisPorAtributoController);

// Obtener Pais por id
router.get('/paises/:id', obtenerPaisPorIdController);

/* ---- CREAR ---- */

// Mostrar formulario para crear un país
router.get('/paises/crear', mostrarFormCrearPaisController);

// Crear nuevo país con validaciones
router.post('/paises/crear', paisValidation(), handleValidationErrors, crearNuevoPaisController);

/* ---- EDITAR ----- */

// Mostrar formulario para editar un país
router.get('/paises/editar/:id', mostrarFormEditarPaisController);

// Modificar país con validaciones
router.put('/paises/editar/:id', paisValidation(), handleValidationErrors, modificarPaisController);

/* ---- ELIMINAR ----- */
// Mostrar form de confirmacion para eliminar
router.get('/paises/:id/confirmar-eliminacion', mostrarFormEliminarController);

// Eliminar país por ID
router.delete('/paises/:id', eliminarPaisController);

export default router;
