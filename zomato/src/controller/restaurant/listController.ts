import { Request, Response } from "express";
import {getCachedRestaurantData} from "../../cache/restaurantCache";

export async function listRestaurants(req: Request, res: Response) {
    res.json(getCachedRestaurantData());
}
