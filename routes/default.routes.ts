import { Request, Response, Router } from "express";


const defaultRoutes = Router();

defaultRoutes.get('/',(req:Request,res:Response)=>{
    return res.json({
        ok:true,
        msj:'todo funciona perfercto'
    })
})

defaultRoutes.post('/',(req:Request,res:Response)=>{
    return res.json({
        ok:true,
        msj:'post ok'
    })
})

export default defaultRoutes;