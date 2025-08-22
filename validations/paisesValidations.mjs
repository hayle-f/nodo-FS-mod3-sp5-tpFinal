/* import { body } from 'express-validator';

const normalizeString = (value) => {
  if (typeof value === 'string') {
    return value.replace(/\s+/g, ' ').trim();
  }
  return value;
};

export const paisValidation = () => [
  // Nombre obligatorio
  body('name')
    .customSanitizer(normalizeString)
    .notEmpty()
    .withMessage('El nombre oficial es obligatorio.')
    .isLength({ min: 3, max: 90 })
    .withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),

  // Capital obligatorio, al menos 1 elemento
  body('capital')
    .customSanitizer((arr) => {
      if (!Array.isArray(arr)) return arr;
      return arr.map(normalizeString);
    })
    .isArray({ min: 1 })
    .withMessage('Debe haber al menos una capital.'),

  body('capital.*')
    .isLength({ min: 3, max: 90 })
    .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),

  // Region opcional
  body('region')
    .optional({ checkFalsy: true })
    .customSanitizer(normalizeString)
    .isString()
    .withMessage('La región debe ser un texto válido.'),

  // Subregion opcional
  body('subregion')
    .optional({ checkFalsy: true })
    .customSanitizer(normalizeString)
    .isString()
    .withMessage('La subregión debe ser un texto válido.'),

  // Lenguajes opcional
  body('languages')
    .optional({ checkFalsy: true })
    .customSanitizer((v) => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim());
      return arr.map(normalizeString);
    })
    .custom((arr) => {
      if (!Array.isArray(arr)) throw new Error('Lenguajes debe tener al menos un elemento valido. Ej: Español.');
      return true;
    }),

  // Población obligatorio
  body('population')
    .notEmpty()
    .withMessage('La población es obligatoria.')
    .isInt({ gt: 0 })
    .withMessage('La población debe ser un número entero positivo.'),

  // Área obligatorio
  body('area')
    .notEmpty()
    .withMessage('El área es obligatoria.')
    .isFloat({ gt: 0 })
    .withMessage('El área debe ser un número positivo.'),

  // Borders opcional
  body('borders')
    .optional({ checkFalsy: true })
    .customSanitizer((v) => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim().toUpperCase());
      return arr.map(normalizeString);
    })
    .custom((arr) => {
      const regex = /^[A-Z]{3}$/;
      for (let code of arr) {
        if (!regex.test(code)) throw new Error('Cada código de frontera debe ser 3 letras mayúsculas. Ej: ARG');
      }
      return true;
    }),

  // Gini opcional
  body('gini')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 100 })
    .withMessage('El índice de Gini debe estar entre 0 y 100.'),

  // Timezones opcional
  body('timezones')
    .optional({ checkFalsy: true })
    .customSanitizer((v) => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim());
      return arr.map(normalizeString);
    })
    .custom((arr) => {
      const regex = /^UTC[+-][0-1][0-9]:[0-5][0-9]$/;
      for (let tz of arr) {
        if (!regex.test(tz)) throw new Error('Cada zona horaria debe tener formato UTC±HH:MM. Ej: UTC-03:00');
      }
      return true;
    }),

  // Continents opcional
  body('continents')
    .optional({ checkFalsy: true })
    .customSanitizer((v) => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim());
      return arr.map(normalizeString);
    })
    .custom((arr) => {
      if (!Array.isArray(arr)) throw new Error('Continente(s) debe tener al menos un valor correcto. ej: America.');
      return true;
    }),

  // LatLng opcional
  body('latlng')
    .optional({ checkFalsy: true })
    .customSanitizer((v) => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim());
      return arr.map(Number);
    })
    .custom((arr) => {
      if (arr.length !== 2 || arr.some(isNaN)) {
        throw new Error('La Latitud y Longitud deben ser dos números separados por coma.');
      }
      return true;
    }),

  // Flags opcional
  body('flags')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      const regex = /^https?:\/\/.+/;
      if (!regex.test(value)) throw new Error('La URL de la bandera debe ser válida (http o https).');
      return true;
    }),
];
 */

import { body } from 'express-validator';

const normalizeString = (value) => {
  if (typeof value === 'string') {
    return value.replace(/\s+/g, ' ').trim();
  }
  return value;
};

const containsLetter = (value) => /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(value);

export const paisValidation = () => [
  // Nombre obligatorio
  body('name')
    .customSanitizer(normalizeString)
    .notEmpty().withMessage('El nombre oficial es obligatorio.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.')
    .custom(value => {
      if (!containsLetter(value)) throw new Error('El nombre oficial debe contener al menos una letra.');
      return true;
    }),

  // Capital obligatorio, al menos 1 elemento
  body('capital')
    .customSanitizer(arr => Array.isArray(arr) ? arr.map(normalizeString) : arr)
    .isArray({ min: 1 }).withMessage('Debe haber al menos una capital.'),
  body('capital.*')
    .isLength({ min: 3, max: 90 }).withMessage('Cada capital debe tener entre 3 y 90 caracteres.')
    .custom(value => {
      if (!containsLetter(value)) throw new Error('Cada capital debe contener al menos una letra.');
      return true;
    }),

  // Continente obligatorio
  body('continents')
    .customSanitizer(v => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim());
      return arr.map(normalizeString);
    })
    .isArray({ min: 1 }).withMessage('Debe haber al menos un continente.')
    .custom(arr => {
      if (!arr.every(containsLetter)) throw new Error('Cada continente debe contener al menos una letra.');
      return true;
    }),

  // Región opcional
  body('region')
    .optional({ checkFalsy: true })
    .customSanitizer(normalizeString)
    .isLength({ min: 3 }).withMessage('La región debe tener al menos 3 caracteres.')
    .custom(value => {
      if (!containsLetter(value)) throw new Error('La región debe contener al menos una letra.');
      return true;
    }),

  // Subregión opcional
  body('subregion')
    .optional({ checkFalsy: true })
    .customSanitizer(normalizeString)
    .isLength({ min: 3 }).withMessage('La subregión debe tener al menos 3 caracteres.')
    .custom(value => {
      if (!containsLetter(value)) throw new Error('La subregión debe contener al menos una letra.');
      return true;
    }),

  // Lenguajes opcional
  body('languages')
    .optional({ checkFalsy: true })
    .customSanitizer(v => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim());
      return arr.map(normalizeString);
    })
    .custom(arr => {
    if (!arr.every(l => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(l))) {
      throw new Error('Cada lenguaje debe contener solo letras y espacios.');
    }
    return true;
    }),

  // Población obligatorio
  body('population')
    .notEmpty().withMessage('La población es obligatoria.')
    .isInt({ gt: 0 }).withMessage('La población debe ser un número entero positivo.'),

  // Área obligatorio
  body('area')
    .notEmpty().withMessage('El área es obligatoria.')
    .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo.'),

  // Borders opcional
  body('borders')
    .optional({ checkFalsy: true })
    .customSanitizer(v => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim().toUpperCase());
      return arr.map(normalizeString);
    })
    .custom(arr => arr.every(code => /^[A-Z]{3}$/.test(code)))
    .withMessage('Cada país limitrofe debe ser un código de 3 letras mayúsculas. Ej: ARG'),

  // LatLng opcional
  body('latlng')
    .optional({ checkFalsy: true })
    .customSanitizer(v => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim());
      return arr.map(Number);
    })
    .custom(arr => arr.length === 2 && arr.every(n => !isNaN(n)))
    .withMessage('La Latitud y Longitud deben ser dos números separados por coma.'),

  // Timezones opcional
  body('timezones')
    .optional({ checkFalsy: true })
    .customSanitizer(v => {
      if (!v) return [];
      const arr = Array.isArray(v) ? v : v.split(',').map(s => s.trim());
      return arr.map(normalizeString);
    })
    .custom(arr => arr.every(tz => /^UTC[+-][0-1][0-9]:[0-5][0-9]$/.test(tz)))
    .withMessage('Cada zona horaria debe tener formato UTC±HH:MM. Ej: UTC-03:00'),

  // Gini opcional
  body('gini')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 100 }).withMessage('El índice de Gini debe estar entre 0 y 100.'),

  // Flags opcional
  body('flags')
    .optional({ checkFalsy: true })
    .custom(value => !value || /^https?:\/\/.+/.test(value))
    .withMessage('La URL de la bandera debe ser válida (http o https).'),
];
