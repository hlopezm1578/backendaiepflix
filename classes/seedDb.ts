import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';

export default class SeedDb{
    
    static async seedRole(){
        var roleAdmin = await Role.findOne({name:'administrador'}).exec();
        var users = await User.find().exec();

        if(!roleAdmin){
            var newRole:any = await this.createAdminRole();

            if(users.length == 0){
               this.createAdminUser(newRole);
            }

            return;
        }

        if(users.length==0){
             this.createAdminUser(roleAdmin)
        }

    }

    private static async createAdminRole(){
        var newRoleAdmin = {
            name : 'administrador'
        };

        var newRole = await Role.create(newRoleAdmin);

        return newRole;
    }

    private static async createAdminUser(role:any){
        var newAdminToSeed = {
            name:'Hans López',
            email: 'hlopez_m@hotmail.com',
            password: bcrypt.hashSync('123456',10),
            roles:[role._id]
        }

        await User.create(newAdminToSeed);
    }
}