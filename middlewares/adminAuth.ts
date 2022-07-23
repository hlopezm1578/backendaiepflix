import { NextFunction } from "express";
import Token from "../classes/token";
import { Role } from "../models/role.model";


export const adminAuthentication = async (req:any,res:any,next:NextFunction)=>{
    const userToken = req.get('x-token') || '';
    await Token.validateadmin(userToken)
    .then(async (decoded:any)=>{
        req.user = decoded.user;
        next();
    }).catch(err=>{
        res.json({
            ok:false,
            msj:"Sin autorizacion"
        })
    })
}