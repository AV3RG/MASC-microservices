import express, {Express} from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import {proxyIncoming} from "./controller/proxy/proxyController";

class App {

    public server: Express

    constructor() {
        this.server = express();
        this.setupBaseMiddlewares();
        this.setupPreAuthRoutes();
        this.setupProxying();
    }

    private setupBaseMiddlewares() {
        this.server.use(express.json());
        this.server.use(cookieParser());
    }

    private setupPreAuthRoutes() {
        this.server.use("/auth", authRouter);
    }

    private setupProxying() {
        this.server.use("**/*", proxyIncoming)
    }

}