const nodemailer = require("nodemailer");
const config = require("../config/keys");
const CONSTANTS = require("../constants/index");
const { formatPrice } = require("./currencyFormatter");

class SendOrderStatusMail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            auth: {
                user: config.mail.user,
                pass: config.mail.pass,
            },
        });
    }

    async sendMailByStatus(order,message) {
        return new Promise((resolve, reject) => {
            const orderTotal = `
                    <div class="p-4 border-b">
                        <p  class="text-sm text-gray-600"> SubTotal:  ${formatPrice(
                            order.cartSubTotalPrice
                        )}</p>
                        <p class="text-sm text-gray-600">Tva ${
                            order.tvaApplied * 100
                        } :  ${formatPrice(order.cartTotalPrice - order.cartSubTotalPrice)} </p>
                        <p class="text-lg font-bold">Price: ${formatPrice(order.cartTotalPrice)}</p>
                    </div>
                `;

            const orderNumber = `#${order.orderNumber
                .toString()
                .padStart(6, "0")}`;

            const orderDate = new Date(order.orderDate).toLocaleString();

            const mailOptions = {
                from: config.mail.user,
                to: order.customerEmail,
                subject: `Artisana Shop. Order Number : ${orderNumber} - ${order.status}` ,
                html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Order Has Been ${order.status} </title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="font-sans text-gray-900 leading-normal bg-gray-100">
            
                <div class="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-10">
            
                    <h1 class="text-2xl font-bold mb-4">Your Order Has Been ${order.status}!</h1>
            
                    <p class="mb-6">Dear ${order.customerFirstName},</p>
            
                    <p class="mb-6">${message}</p>
            
                    <div class="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 mb-6" role="alert">
                        <p class="font-bold">Thank you for choosing our Artisana Shop!</p>
                        <p class="text-sm">We appreciate your business and hope you enjoy your purchase.</p>
                    </div>
            
                    <p class="mb-6">Here are the order details:</p>
            
                    <div class="border rounded-lg overflow-hidden mb-6">
                        <!-- Order Details -->
                        <div class="p-4 border-b">
                            <p class="text-lg font-bold">Order Number: ${orderNumber} </p>
                            <p class="text-sm text-gray-600">Order Date: ${orderDate} </p>
                        </div>
            
                        <!--Total/subtotal/Tva -->
                        ${orderTotal}

                       
                    </div>
            
                    <p class="mb-6">If you have any questions or need further assistance, feel free to contact our support team.</p>
            
                    <p class="mb-6">Thank you again for choosing our Artisana shop . We look forward to serving you in the future.</p>
            
                    <p class="text-sm text-gray-600">&mdash; The Artisana shop Team</p>
            
                </div>
            
            </body>
            </html>
            
                `,
            };

            this.transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    reject({
                        message: CONSTANTS.EMAIL_SEND_ERROR,
                        status: CONSTANTS.SERVER_ERROR_HTTP_CODE,
                    });
                } else {
                    resolve({
                        message: CONSTANTS.EMAIL_SEND_SUCCESS,
                        status: CONSTANTS.SERVER_OK_HTTP_CODE,
                    });
                }
            });
        });
    }

}

module.exports = SendOrderStatusMail;
