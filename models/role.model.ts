import { Document, model, Schema } from "mongoose";


const roleSchema = new Schema({
    name:{
        type: String,
        required : true
    }
})

interface IRole extends Document{
    name:string
}

export const Role = model<IRole>('Role',roleSchema); 