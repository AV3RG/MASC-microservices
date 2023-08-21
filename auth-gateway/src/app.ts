import express, {Express} from "express";
import cookieParser from "cookie-parser";

class App {

    public server: Express

    constructor() {
        this.server = express();
        this.setupBaseMiddlewares();
    }

    private setupBaseMiddlewares() {
        this.server.use(express.json());
        this.server.use(cookieParser());
    }

}