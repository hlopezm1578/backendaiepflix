import { Document, model, Schema } from "mongoose";


const peliculaSchema = new Schema({
    name:{
        type:String,
        required : [true,'El nombre es requerido']
    },
    poster : {
        type:String,
        required : [true,'El poster es requerido']
    },
    year: {
        type:Number,
        required : [true,'El año es requerido']
    }
});

interface IPelicula extends Document{
    name:string;
    poster:string;
    year:number;
}

export const Pelicula = model<IPelicula>('Peliculas',peliculaSchema);