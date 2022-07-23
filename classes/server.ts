import express from 'express'

export default class Server{
    public app: express.Application;
    public port:number = 3000;

    constructor(){
        this.app=express();
    }

    // Start(callback:Function){
    //     this.app.listen(this.port,callback())
    // }

    Start(callback:Function){
        this.app.listen(process.env.PORT || 5000,callback())
    }
}