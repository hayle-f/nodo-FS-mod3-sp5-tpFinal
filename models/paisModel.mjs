import mongoose from "mongoose";

const paisesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capital: { type: [String], default: [] },
    region: { type: String, required: true },
    subregion: { type: String, required: true },
    languages: { type: [String], default: [] },
    latlng: { type: [Number], default: [] },
    borders: { type: [String], default: [] },
    area: { type: Number, default: 0 },
    population: { type: Number, default: 0 },
    gini: { type: Number, default: null },
    flags: { type: String, default: null },
    timezones: { type: [String], default: [] },
    continents: { type: [String], default: [] },
    creator: { type: String, required: true }
});

const Paises = mongoose.model('Pais', paisesSchema, 'Grupo-02');

export default Paises;
