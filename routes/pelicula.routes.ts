import { request, Request, Response, Router } from "express";
import { Pelicula } from "../models/pelicula.model";

const peliculasRoute = Router();

peliculasRoute.get('/',async (req:Request,res:Response)=>{
    const peliculas = await Pelicula.find().populate('generos');
    res.json({
        ok:true,
        peliculas
    })

});

peliculasRoute.post('/',(req:Request,res:Response)=>{

    const pelicula = {
        name : req.body.name,
        poster : req.body.poster,
        year : req.body.year,
        generos : req.body.generos
    }

    const arrGeneros = pelicula.generos.split(",");

    pelicula.generos = arrGeneros;

    Pelicula.create(pelicula)
        .then(peliculaDb=>{
            res.json({
                ok:true,
                pelicula:peliculaDb
            })
        }).catch(err=>{
            res.json({
                ok:false,
                err
            })
        })
})


export default peliculasRoute;

