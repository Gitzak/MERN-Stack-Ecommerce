const mongoose = require("mongoose");

const { ORDERS_STATUS } = require("../constants");

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: Number,
            required: true,
            default: 1,
        },
        customerID: {
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
        customerEmail: {
            type: String,
        },
        customerAddress: {
            type: String,
        },
        orderItems: [
            {
                itemID: String,
                itemName: String,
                itemOptions: String,
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
        cartSubTotalPrice: {
            type: Number,
            default: 0,
        },
        tvaApplied: {
            type: Number,
            default: 20,
        },
        status: {
            type: String,
            enum: [ORDERS_STATUS.Open, ORDERS_STATUS.Shipped, ORDERS_STATUS.Paid, ORDERS_STATUS.Closed, ORDERS_STATUS.Cancelled],
            default: ORDERS_STATUS.Open,
        },
    },
    {
        timestamps: true,
    }
);

// Define a pre-save middleware to generate the orderNumber
orderSchema.pre("save", async function (next) {
    try {
        // Check if it's a new order (not updating an existing one)
        if (this.isNew) {
            // Find the highest orderNumber in the database and increment it by 1
            const highestOrder = await this.constructor.findOne({}).sort("-orderNumber").exec();
            if (highestOrder) {
                this.orderNumber = highestOrder.orderNumber + 1;
            } else {
                // If there are no existing orders, start with 1
                this.orderNumber = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Order", orderSchema);
