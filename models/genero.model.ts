import { Document, model, Schema } from "mongoose";


const generoSchema = new Schema({
    name : {
        type: String,
        required : [true,'El nombre es requerido']
    },
    peliculas : [{
        type: Schema.Types.ObjectId,
        ref: 'peliculas'
    }]
});

interface IGenero extends Document{
    name:string
}

export const Genero = model('Genero',generoSchema);
