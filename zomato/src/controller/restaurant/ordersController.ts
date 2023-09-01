import {Request, Response} from "express";
import {standardRestaurantVerification} from "../../misc/restaurantVerification";
import order from "../../model/doc/order";
import IOrder from "../../model/ts/IOrder";

export async function listOrders(req: Request, res: Response) {
    const id = await standardRestaurantVerification(req, res);
    if (id === null) return;
    const orders = await getRestaurantOrders(id);
    res.send(orders);
}

export async function getOrder(req: Request, res: Response) {
    const id = await standardRestaurantVerification(req, res);
    if (id === null) return;
    const orderId = req.params.orderId;
    if (!orderId) {
        res.status(400).send("Missing orderId");
        return;
    }
    const order = await getRestaurantOrder(id, orderId);
    res.send(order);
}

export async function updateOrderStatus(req: Request, res: Response) {
    const id = await standardRestaurantVerification(req, res);
    if (id === null) return;
    const orderId = req.params.orderId;
    if (!orderId) {
        res.status(400).send("Missing orderId");
        return;
    }
    const status = req.body.status;
    if (!status) {
        res.status(400).send("Missing status");
        return;
    }
    if (!checkValidOrderStatusRequest(status)) {
        res.status(400).send("Invalid status");
        return;
    }
    const order = await getRestaurantOrder(id, orderId);
    if (!order) {
        res.status(404).send("Order not found");
        return;
    }
    if (!checkValidStatusUpdateStep(status, order)) {
        res.status(400).send("Invalid status update step");
        return;
    }
    await updateOrderStatusDB(orderId, status);
    res.sendStatus(204);
}

export async function listPendingOrders(req: Request, res: Response) {
    const id = await standardRestaurantVerification(req, res);
    if (id === null) return;
    const orders = await getPendingRestaurantOrders(id);
    res.send(orders);
}

async function getRestaurantOrders(id: string) {
    return order.find({restaurantId: id});
}

async function getPendingRestaurantOrders(id: string) {
    return order.find({restaurantId: id, status: "pending"});
}

async function getRestaurantOrder(id: string, orderId: string) {
    return order.findOne({restaurantId: id, _id: orderId});
}

function checkValidOrderStatusRequest(status: string): boolean {
    return status === "accepted" || status === "rejected" || status === "prepared" || status === "delivered";
}

function checkValidStatusUpdateStep(status: string, order: IOrder): boolean {
    return true;
    //TODO
}

async function updateOrderStatusDB(orderId: string, status: string) {
    return order.findByIdAndUpdate(orderId, {status: status});
}