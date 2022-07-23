import { Request, Response, Router } from "express";
import FileSystem from "../classes/file-system";
import { FileUpload } from "../interfaces/file-upload";
import { adminAuthentication } from "../middlewares/adminAuth";

const filesRoutes = Router();
const fileSystem = new FileSystem();
const folder:string = "actores";

filesRoutes.post('/', [adminAuthentication] ,async (req:any,res:Response)=>{

    if(!req.files){
        return res.status(400).json({
            ok:false,
            msj:"No se adjunto la imagen"
        })
    }

    const file:FileUpload = req.files.image;
    if(!file){
        return res.status(400).json({
            ok:false,
            msj:"No se adjunto la imagen - key"
        })
    }

    if(!file.mimetype.includes('image')){
        return res.status(400).json({
            ok:false,
            msj:"Lo que se subio no es una imagen"
        })
    }
var fileName = await fileSystem.saveImage(file,folder,req.user._id);
    res.json({
        ok:true,
        file: fileName
    })
});

filesRoutes.get('/tempimagen/:userId/:img', (req:any,res:Response)=>{
    const userId = req.params.userId;
    const img = req.params.img;
    const pathImg = fileSystem.getTmpImgUrl(userId,img);
    res.sendfile(pathImg);
})

export default filesRoutes;