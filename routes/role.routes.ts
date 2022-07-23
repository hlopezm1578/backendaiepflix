import { Request, Response, Router } from "express";
import { Role } from "../models/role.model";


const roleRoutes = Router();


roleRoutes.get('/', async (req:Request,res:Response)=>{
    const roles = await Role.find().populate('users');
    res.json({
        ok:true,
        roles
    })
});

roleRoutes.post('/',(req:Request,res:Response)=>{
const role = {
    name : req.body.name
}

Role.create(role).then(resp=>{
    res.json({
        ok:true,
        role : resp
    })
    });
});

roleRoutes.post('/asignar',(req:Request,res:Response)=>{

    const roleId = req.body.roleId;
    const userId = req.body.userId;
    Role.findByIdAndUpdate(roleId, {$push:{users:userId}}).then(resp=>{
        res.json({
            ok:true,
            role:resp
        })
    })
} );

roleRoutes.get('/validaradmin', (req:Request,res:Response)=>{
    res.json({
        ok:true
    })
});


export default roleRoutes;