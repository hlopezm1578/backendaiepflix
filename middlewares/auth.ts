import { NextFunction, Request, Response } from "express";
import Token from '../classes/token';

export const Authentication = (req:any,res:Response,next:NextFunction)=>{
    const userToken = req.get('x-token') || '';
    Token.validateToken(userToken)
    .then((decoded:any)=>{
        console.log('Decoded',decoded);
        req.user = decoded.user;
        next();
    }).catch(err=>{
        res.json({
            ok:false,
            msj:"Token invalido"
        })
    })
}