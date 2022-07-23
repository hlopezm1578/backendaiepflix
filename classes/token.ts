import jwt from 'jsonwebtoken'
import { User } from '../models/user.model';

export default class Token{
    private static seed:string = 'esta es la frase secreta de la aplicación';
    private static expires:string='1d';

    constructor(){}

    static getJwtToken(payload:any){
        return jwt.sign({
            user:payload
        },this.seed,{expiresIn:this.expires})
    };
    static async validateToken(userToken:string){
        return new Promise((resolve,reject)=>{
            jwt.verify(userToken,this.seed,(err,decoded)=>{
                if(err){
                    reject();
                }else{
                    resolve(decoded);
                }
            })
        })
    };

    static async validateadmin(userToken:string){
        return new Promise((resolve,reject)=>{
            jwt.verify(userToken,this.seed, async (err,decoded:any)=>{
                if(err){
                    reject();
                }else{
                    var user = await User.findById(decoded.user._id).populate('roles');
                    if(user){
                        if(user.roles.length>0){
                            var roleAdmin = user.roles.find((x:any)=>x.name=="administrador");
                            if(roleAdmin){
                                resolve(decoded);
                            }else{
                                reject(); 
                            }
                        }
                    }
                    resolve(decoded);
                }
            })
        })
    }
}