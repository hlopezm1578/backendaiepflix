"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pelicula = void 0;
const mongoose_1 = require("mongoose");
const peliculaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    poster: {
        type: String,
        required: [true, 'El poster es requerido']
    },
    year: {
        type: Number,
        required: [true, 'El año es requerido']
    },
    generos: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Genero'
        }]
});
exports.Pelicula = (0, mongoose_1.model)('Pelicula', peliculaSchema);
