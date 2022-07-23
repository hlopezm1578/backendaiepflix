import bodyParser from "body-parser";
import mongoose from "mongoose";
import Server from "./classes/server";
import defaultRoutes from "./routes/default.routes";
import userRoutes from "./routes/user.routes";
import cors from 'cors';
import peliculasRoute from "./routes/pelicula.routes";
import generosRoute from "./routes/genero.routes";
import roleRoutes from "./routes/role.routes";
import SeedDb from "./classes/seedDb";
import filesRoutes from "./routes/file.routes";
import fileUpload from 'express-fileupload';

const server  = new Server();

server.app.use(cors()); 
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());
server.app.use(fileUpload());
server.app.use('/',defaultRoutes);
server.app.use('/user',userRoutes);
server.app.use('/generos',generosRoute);
server.app.use('/peliculas',peliculasRoute);
server.app.use('/roles',roleRoutes);
server.app.use('/files',filesRoutes);



mongoose.connect('mongodb://localhost:27017/bdaiepflix',(error)=>{
    if(error){
        throw error;
    }
    console.log('Base de datos online');
})


server.Start( async()=>{
    console.log(`Servidor corriendo en puerto:${server.port}`)
    await SeedDb.seedRole();
})