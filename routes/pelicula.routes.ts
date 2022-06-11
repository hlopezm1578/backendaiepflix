import { request, Request, Response, Router } from "express";
import { Pelicula } from "../models/pelicula.model";


const peliculasRoute = Router();

peliculasRoute.get('/',async (req:Request,res:Response)=>{

    const peliculas = await Pelicula.find().exec();
    res.json({
        ok:true,
        peliculas
    })

});

peliculasRoute.post('/',(req:Request,res:Response)=>{

    const pelicula = {
        name : req.body.name,
        poster : req.body.poster,
        year : req.body.year
    }

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

