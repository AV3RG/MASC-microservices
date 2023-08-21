import express, {Express} from "express";

class App {

    public readonly server: Express

    constructor() {
        this.server = express();

        this.setupBaseMiddlewares();

    }

    private setupBaseMiddlewares() {
        this.server.use(express.json());
        
    }

}