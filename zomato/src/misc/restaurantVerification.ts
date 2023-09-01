import {extractHeaderOrRespond} from "./extractHeader";
import {standardRestaurantKeyVerify} from "../auth/crypto/keySign";
import {Request, Response} from "express";

export async function standardRestaurantVerification(req: Request, res: Response): Promise<string> {
    const auth = extractHeaderOrRespond(req, res, "authorization");
    const restaurant = await standardRestaurantKeyVerify(auth, res);
    if (restaurant === null) return null;
    const {id} = <any>restaurant.payload;
    if (!id) {
        res.status(401).send("Invalid token");
        return null;
    }
    return id;
}