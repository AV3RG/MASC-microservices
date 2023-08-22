import express, {Express} from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";

class App {

    public server: Express

    constructor() {
        this.server = express();
        this.setupBaseMiddlewares();
        this.setupPreAuthRoutes();
    }

    private setupBaseMiddlewares() {
        this.server.use(express.json());
        this.server.use(cookieParser());
    }

    private setupPreAuthRoutes() {
        this.server.use("/auth", authRouter);
    }



}