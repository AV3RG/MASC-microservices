import restaurant from "../model/doc/restaurant";
import IRestaurant from "../model/ts/IRestaurant";

let restaurantCache = new Array<IRestaurant>();

export function getCachedRestaurantData() {
    return restaurantCache;
}

export async function updateRestaurantCache() {
    restaurantCache = await restaurant.find({}).exec();
}