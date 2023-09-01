export default interface IOrder extends Document {
    restaurant: string,
    user: string,
    items: Array<OrderItem>,
    total: number,
    discountedTotal: number,
    paymentDetails: PaymentDetails,
    orderTime: Date,
    preparationTime: Date,
    deliveryTime: Date,
    deliveryAddress: string,
    status: string,
}

interface OrderItem {
    name: string,
    quantity: number,
    price: number,
    discountedPrice: number,
}

interface PaymentDetails {
    paymentId: string,
    paymentMethod: string,
    paymentStatus: string,
    paidAmount: number,
}