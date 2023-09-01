import { Request, Response } from "express";
import restaurant from "../../model/doc/restaurant";
import {updateRestaurantCache} from "../../cache/restaurantCache";
import {standardRestaurantVerification} from "../../misc/restaurantVerification";

export async function changeStatus(req: Request, res: Response) {
    const id = await standardRestaurantVerification(req, res);
    if (id === null) return;
    const { status } = req.body.status;
    if (!checkValidStatus(status)) {
        res.status(400).send("Invalid status");
        return;
    }
    await updateStatus(status, id);
    res.sendStatus(204);
}

function checkValidStatus(status: string): boolean {
    return status === "open" || status === "closed";
}

async function updateStatus(status: string, id: string) {
    await restaurant.findByIdAndUpdate(id, {status: status});
    await updateRestaurantCache();
}