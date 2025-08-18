import { body } from 'express-validator';

export const paisValidation = () => [
    // Validación name.official
    body('name.official')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('El nombre oficial es obligatorio.')
        .isLength({ min: 3, max: 90 })
        .withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),

    // Validación capital (cada elemento 3-90 caracteres)
    body('capital')
        .isArray({ min: 1 })
        .withMessage('Debe haber al menos una capital.'),

    body('capital.*')
        .trim()
        .escape()
        .isLength({ min: 3, max: 90 })
        .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),

    // Validación borders (cada código 3 letras mayúsculas)
    body('borders')
        .isArray()
        .withMessage('Borders debe ser un array de códigos.'),

    body('borders.*')
        .isLength({ min: 3, max: 3 })
        .withMessage('Cada código de frontera debe tener 3 letras.')
        .matches(/^[A-Z]{3}$/)
        .withMessage('Cada código de frontera debe ser 3 letras mayúsculas.'),

    // Validación area (número positivo)
    body('area')
        .notEmpty()
        .withMessage('El área es obligatoria.')
        .isFloat({ gt: 0 })
        .withMessage('El área debe ser un número positivo.'),

    // Validación population (entero positivo)
    body('population')
        .notEmpty()
        .withMessage('La población es obligatoria.')
        .isInt({ gt: 0 })
        .withMessage('La población debe ser un número entero positivo.'),

    // Validación Gini (opcional, 0-100)
    body('gini')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('El índice de Gini debe estar entre 0 y 100.'),
];
  