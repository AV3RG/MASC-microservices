import mongoose, {Schema} from "mongoose";
import IOrder from "../ts/IOrder";

const orderItem = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: false,
    }
})

const paymentDetailsSchema = new Schema({
    paymentId: {
        type: String,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    paidAmount: {
        type: Number,
        required: true,
    },
})

const orderSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    items: {
        type: [orderItem],
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    discountedTotal: {
        type: Number,
        required: true,
    },
    paymentDetails: {
        type: paymentDetailsSchema,
        required: true,
    },
    orderTime: {
        type: Date,
        required: true,
    },
    preparationTime: {
        type: Date,
        required: true,
    },
    deliveryTime: {
        type: Date,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

export default mongoose.model<IOrder>("order", orderSchema);