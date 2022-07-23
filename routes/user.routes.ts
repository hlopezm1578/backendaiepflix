import { Request, Response, Router } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { Authentication } from "../middlewares/auth";

const userRoutes = Router(); 

userRoutes.post('/', (req:Request,res:Response)=>{

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10)
    };

    User.create(user)
    .then((userDb:any)=>{
        const token = Token.getJwtToken({
            _id:userDb._id,
            name:userDb.name,
            email:userDb.email,
            role: userDb.roles.length>0 ? userDb.roles[0].name : 'Usuario'
        })
        res.json({
            ok:true,
            token:token
        })
    }).catch(err=>{
        console.log(err);
        res.json({
            ok:false,
            err
        })
    }) 
});

userRoutes.post('/login',(req:Request,res:Response)=>{
    const body = req.body; 

    User.findOne({email:body.email},(err:any,userDb:any)=>{
        if(err){
            res.json({
                ok:false,
                err
            })
        }else{
            if(!userDb){
                res.json({
                    ok:false,
                    mjs:'Usuario o contraseña incorrectos'
                })
            }else{
                if(userDb.checkPassword(body.password)){
                    const token = Token.getJwtToken({
                        _id:userDb._id,
                        name:userDb.name,
                        email:userDb.email,
                        role: userDb.roles.length>0 ? userDb.roles[0].name : 'Usuario'
                    })
                    res.json({
                        ok:true,
                        token:token
                    })
                }else{
                    res.json({
                        ok:false,
                        mjs:'Usuario o contraseña incorrectos'
                    })
                }
            }

        }
       

    }).populate('roles')
});

userRoutes.put('/update',[Authentication],(req:any,res:Response)=>{
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email
    }

    User.findByIdAndUpdate(req.user._id,user,{new:true},(err,userDb)=>{
        if(err) throw err;
        if(!userDb){
            return res.json({
                ok:false,
                mjs:"Usuario no existe"
            })
        }

        const token = Token.getJwtToken({
            _id:userDb._id,
            name:userDb.name,
            email:userDb.email
        })
        res.json({
            ok:true,
            token:token
        })
    })
});

userRoutes.get('/checkadmin',[Authentication],async (req:Request,res:Response)=>{
    const token = req.get('x-token') || '';
    var resp = await Token.validateadmin(token);
    res.json({
        ok :resp
    })
} );

export default userRoutes;