import mongoose from "mongoose";

// Definición del esquema de País con sus validaciones
const paisesSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre oficial es obligatorio'], 
        minlength: 3, 
        maxlength: 90 
    },
    capital: { 
        type: [String], 
        required: [true, 'Debe haber al menos una capital'],
        validate: {
            validator: function(arr) { return arr.length > 0 },
            message: 'Debe haber al menos una capital'
        }
    },
    region: { type: String },
    subregion: { 
        type: String, 
        required: [true, 'La subregión es obligatoria'], 
        minlength: [3, 'La subregión debe tener al menos 3 caracteres'],
    },
    languages: { type: [String], default: [] },
    latlng: { type: [Number], default: [] },
    borders: { type: [String], default: [] },
    area: { 
        type: Number, 
        required: [true, 'El área es obligatoria'], 
        min: [0, 'El área debe ser un número positivo'] 
    },
    population: { 
        type: Number, 
        required: [true, 'La población es obligatoria'], 
        min: [1, 'La población debe ser un número entero positivo'] 
    },
    gini: { type: Number, default: null, min: 0, max: 100 },
    flags: { type: String, default: null },
    timezones: { type: [String], default: [] },
    continents: { 
        type: [String], 
        required: [true, 'El/los continente(s) es/son obligatorio(s)'],
        validate: {
            validator: function(arr) { return arr.length > 0 },
            message: 'Debe haber al menos un continente'
        }
    },
    creator: { type: String, required: true, default:"Haylén Ferrario" }
});

const Paises = mongoose.model('Pais', paisesSchema, 'Grupo-02');

export default Paises;