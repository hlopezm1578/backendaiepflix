import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem{
    constructor(){}

    saveImage(file:FileUpload,folder:string,userId:string){
        return new Promise((resolve,reject)=>{
            const path = this.CreateFolder(folder,userId);
            const fileName = this.GenFileName(file.name);
            const imagesInTemp = this.readTemp(userId);
            imagesInTemp.forEach(image=>{
                fs.unlink(`${path}/${image}`,(err:any)=>{
                    if(err) console.log;
                })
            });
            file.mv(`${path}/${fileName}`,(err:any)=>{
                if(err){
                    console.log(err);
                    reject(err)
                } else{
                    resolve(fileName);
                }
            });
        });
    }

    private CreateFolder(folder:string,userId:string){
        const pathFolder = path.resolve(__dirname,'../images/',folder);
        const temporalPath = path.resolve(__dirname,'../temp/',userId);

        const exist = fs.existsSync(temporalPath);
        if(!exist){
            fs.mkdirSync(pathFolder);
            fs.mkdirSync(temporalPath);
        }

        return temporalPath;
    }

    private GenFileName(originalName:string){
        const nameArray = originalName.split('.');
        const extension =   nameArray[nameArray.length-1];
        const uniqName = uniqid();
        return `${uniqName}.${extension}`;
    }

    private readTemp(userId:string){
        const temporalPath = path.resolve(__dirname,'../temp/',userId);
        return fs.readdirSync(temporalPath);
    }

    public getTmpImgUrl(userId:string,img:string){
        const pathImg = path.resolve(__dirname,'../temp/',userId,img);
        console.log(pathImg);
        const exits = fs.existsSync(pathImg);
        if(!exits){
            return path.resolve(__dirname,'../assets/','400x250.jpg');
        }

        return pathImg;
    }

}