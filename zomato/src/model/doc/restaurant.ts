import {Schema} from "mongoose";
import mongoose from "mongoose";
import IRestaurant from "../ts/IRestaurant";

const contactDetailsSchema = new Schema({
    primaryNumber: {
        type: String,
        required: true,
    },
    otherNumbers: {
        type: [String],
        required: true
    },
})

const timePeriodSchema = new Schema({
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
})

const inventoryDataSchema = new Schema({
    unlimited: {
        type: Boolean,
        required: true
    },
    left: {
        type: Number,
        required: false,
    },
})

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: false
    },
    availableTimeSlots: {
        type: [timePeriodSchema],
        required: false
    },
    inventoryItemsLeft: {
        type: inventoryDataSchema,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    imageUrls: {
        type: [String],
        required: false,
    }
})

const informationSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    contactDetails: {
        type: contactDetailsSchema,
        required: true,
    },
    orderTimes: {
        type: [timePeriodSchema],
        required: true,
    },
})

const credentialsSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
})

const mediaSchema = new Schema({
    baseImageUrl: {
        type: String,
        required: true,
    },
})

const restaurantSchema = new Schema({
    information: {
        type: informationSchema,
        required: true,
    },
    menu: {
        type: [menuItemSchema],
        required: true,
    },
    currentStatus: {
        acceptingOrders: {
            type: Boolean,
            required: true,
        }
    },
    credentials: {
        type: credentialsSchema,
        required: true,
    },
    media: {
        type: mediaSchema,
        required: true,
    }
})

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);