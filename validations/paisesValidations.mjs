import { body } from 'express-validator';
import iso from 'iso-3166-1';


const normalizeString = (value) => {
  if (typeof value === 'string') {
    //si es string, reemplaza todas las secuencias de espacios en blanco (espacios, tabs, saltos de línea, etc.) por un único espacio ' ', y eliminia espacios al inicio y final
    return value.replace(/\s+/g, ' ').trim();
  }
  return value;
};

// Devuelve true si el string contiene al menos una letra
const containsLetter = (value) => /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(value);


export const paisValidation = () => [

  //---------- Nombre obligatorio
  body('name')
    .customSanitizer(normalizeString)
    .notEmpty().withMessage('El nombre oficial es obligatorio.')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.')
    //se fija que el valor contenga al menos una letra
    .custom(value => {
      if (!containsLetter(value)) throw new Error('El nombre oficial debe contener al menos una letra.');
      return true;
    }),


  //---------- Capital obligatorio, al menos 1 elemento
  body('capital')
    //aplica normalizeString a cada elem
    .customSanitizer(arr => arr.map(normalizeString))
    .isArray({ min: 1 }).withMessage('Debe haber al menos una capital.'),

  body('capital.*')
    .isLength({ min: 3, max: 90 }).withMessage('Cada capital debe tener entre 3 y 90 caracteres.')
    //se fija que el valor contenga al menos una letra
    .custom(value => {
      if (!containsLetter(value)) throw new Error('Cada capital debe contener al menos una letra.');
      return true;
    }),


  //---------- Continente obligatorio
  body('continents')
    .customSanitizer(arr => arr.map(normalizeString))
    .isArray({ min: 1 }).withMessage('Debe haber al menos un continente.'),

  body('continents.*')
    .isLength({ min: 3, max: 90 }).withMessage('Cada continente debe tener entre 3 y 90 caracteres.')
    //se fija que el valor contenga al menos una letra
    .custom(value => {
      if (!containsLetter(value)) throw new Error('Cada continente debe contener al menos una letra.');
      return true;
    }),


  //---------- Región opcional
  body('region')
    .optional({ checkFalsy: true }) //valores falsy no dan errores
    .customSanitizer(normalizeString)
    .isLength({ min: 3 }).withMessage('La región debe tener al menos 3 caracteres.')
    .custom(value => {
      if (!containsLetter(value)) throw new Error('La región debe contener al menos una letra.');
      return true;
    }),


  //---------- Subregión obligatoria
  body('subregion')
    .customSanitizer(normalizeString)
    .notEmpty().withMessage('La subregión es obligatoria.')
    .isLength({ min: 3 }).withMessage('La subregión debe tener al menos 3 caracteres.')
    .custom(value => {
      if (!containsLetter(value)) throw new Error('La subregión debe contener al menos una letra.');
      return true;
    }),


  //---------- Lenguajes opcional
  body('languages')
    .optional({ checkFalsy: true })
    .customSanitizer(arr => arr.map(normalizeString)),

  body('languages.*')
    .custom(value => {
    // regex: solo letras (mayúsculas, minúsculas, acentos, Ñ) y espacios, rechaza números, símbolos o caracteres especiales
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
      throw new Error('Cada lenguaje debe contener solo letras y espacios.');
    }
    return true;
    }),


  //---------- Población obligatorio
  body('population')
    .notEmpty().withMessage('La población es obligatoria.')
    .isInt({ gt: 0 }).withMessage('La población debe ser un número entero positivo.'),


  //---------- Área obligatorio
  body('area')
    .notEmpty().withMessage('El área es obligatoria.')
    .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo.'),


  //---------- Borders opcional
  body('borders')
    .optional({ checkFalsy: true })
    .customSanitizer(arr => arr.map(normalizeString)),

  body('borders.*')
    .custom(value => {
    // regex: exactamente 3 letras mayúsculas
    if (!/^[A-Z]{3}$/.test(value)) {
      throw new Error(`Cada país limitrofe debe ser un código de 3 letras mayúsculas. Ej: ARG`);
    }

    // Validar que sea un código real usando iso-3166-1
    if (!iso.whereAlpha3(value)) {
      throw new Error(`Código de frontera inválido: ${value}`);
    }

    return true;
  }),

    
  //---------- LatLng opcional
  body('latlng')
    .optional({ checkFalsy: true })
    //
    .custom(arr => arr.length === 2 && arr.every(n => !isNaN(n)))
    .withMessage('La Latitud y Longitud deben ser dos números validos separados por coma.'),


  //---------- Timezones opcional  
  body('timezones')
    .optional({ checkFalsy: true })
    //usamos normalize, y sacamos ademas los espacios internos.
    .customSanitizer(arr => arr.map(s => normalizeString(s).replace(/\s+/g, ''))),

  body('timezones.*')
    .custom(value => {
    // Regex: formato UTC±HH:MM, hora: (+00 a +14) o (-00 a -12) minutos: 00, 15, 30 o 45
    const regex = /^UTC(?:\+(0[0-9]|1[0-4]):(00|15|30|45)|-(0[0-9]|1[0-2]):(00|15|30|45))$/;
    
    if (!regex.test(value)) {
      throw new Error('Cada zona horaria debe tener formato UTC±HH:MM. Ej: UTC-03:00, UTC+05:30');
    }
    
    return true;
  }),


  //---------- Gini opcional
  body('gini')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 100 }).withMessage('El índice de Gini debe estar entre 0 y 100.'),


  //---------- Flags opcional
  body('flags')
    .optional({ checkFalsy: true })
    //valida que sea http/https y sintaxis valida de url
    .isURL({ protocols: ['http','https'], require_protocol: true })
    .withMessage('La URL de la bandera debe ser válida (http o https).')
    //valida que termine en .svg/.png
    .custom(value => /\.(svg|png)$/i.test(value))
    .withMessage('La URL de la bandera debe ser un archivo SVG o PNG.'),

];
