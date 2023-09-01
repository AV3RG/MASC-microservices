export default interface IRestaurant extends Document {
    information: Information,
    menu: Array<MenuItem>,
    currentStatus: RestaurantStatus,
    credentials: Credentials,
    media: Media,
}

interface Information {
    address: string,
    contactDetails: {
        primaryNumber: string,
        otherNumbers: Array<string>,
    },
    orderTimes: Array<TimeSlot>,
}

interface TimeSlot {
    from: Date,
    to: Date,
}

interface InventoryData {
    unlimited: boolean,
    left: number,
}

interface MenuItem {
    name: string,
    price: number,
    discountedPrice: number,
    availableTimeSlots: Array<TimeSlot>,
    inventoryItemsLeft: InventoryData,
    category: string,
    imageUrls: Array<String>,
}

interface RestaurantStatus {
    acceptingOrders: boolean,
}

interface Credentials {
    username: string,
    passwordHash: string,
    salt: string,
}

interface Media {
    baseImageUrl: string,
}