const mongoose = require("mongoose");

const { ORDERS_STATUS } = require("../constants");

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    customerFirstName: {
        type: String,
    },
    customerLastName: {
        type: String,
    },
    orderItems: [
        {
            itemID: String,
            itemName: String,
            itemOptions: [
                {
                    label: String,
                    option: String
                }
            ],
            quantity: Number,
            unitPrice: Number,
            totalPrice: Number,
        },
    ],
    orderDate: {
        type: Number,
        default: Date.now,
    },
    cartTotalPrice: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: [ORDERS_STATUS.Open, ORDERS_STATUS.Shipped, ORDERS_STATUS.Paid, ORDERS_STATUS.Closed, ORDERS_STATUS.Cancled],
        default: ORDERS_STATUS.Open,
    },
});

module.exports = mongoose.model("Order", orderSchema);
