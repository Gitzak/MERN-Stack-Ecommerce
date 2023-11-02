const nodemailer = require("nodemailer");
const config = require("../config/keys");
const CONSTANTS = require("../constants/index");
const { formatPrice } = require("./currencyFormatter");


const SendOrderMail = async (order) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            auth: {
                user: config.mail.user,
                pass: config.mail.pass,
            },
        });

        let orderItemsHTML = "";

        for (const item of order.orderItems) {
            orderItemsHTML += `
              <tr>
                <td>${item.itemName}</td>
                <td>${item.quantity}</td>
                <td>${formatPrice(item.totalPrice)}</td>
              </tr>
            `;
        }

        const orderNumber = `#${order.orderNumber.toString().padStart(6, '0')}`;

        const orderDate = new Date(order.orderDate).toLocaleString();

        const mailOptions = {
            from: config.mail.user,
            to: order.customerEmail,
            subject: "Your Account Information",
            html: `
                  <html>
                    <style>
                    .email {
                      max-width: 480px;
                      margin: 1rem auto;
                      border-radius: 10px;
                      border-top: #5E8E3E 2px solid;
                      border-bottom: #5E8E3E 2px solid;
                      box-shadow: 0 2px 18px rgba(0, 0, 0, 0.2);
                      padding: 1.5rem;
                      font-family: Arial, Helvetica, sans-serif;
                    }
                    .email .email-head {
                      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                      padding-bottom: 1rem;
                    }
                    .email .email-head .head-img {
                      max-width: 240px;
                      padding: 0 0.5rem;
                      display: block;
                      margin: 0 auto;
                    }
              
                    .email .email-head .head-img img {
                      width: 100%;
                    }
                    .email-body .invoice-icon {
                      max-width: 80px;
                      margin: 1rem auto;
                    }
                    .email-body .invoice-icon img {
                      width: 100%;
                    }
              
                    .email-body .body-text {
                      padding: 2rem 0 1rem;
                      text-align: left;
                      font-size: 1.15rem;
                    }
                    .email-body .body-text.bottom-text {
                      padding: 2rem 0 1rem;
                      text-align: left;
                      font-size: 0.8rem;
                    }
                    .email-body .body-text .body-greeting {
                      font-weight: bold;
                      margin-bottom: 1rem;
                    }
              
                    .email-body .body-table {
                      text-align: left;
                    }
                    .email-body .body-table table {
                      width: 100%;
                      font-size: 1.1rem;
                    }
                    .email-body .body-table table .total {
                      background-color: hsla(96, 67%, 52%, 0.12);
                      border-radius: 8px;
                      color: #5E8E3E;
                    }
                    .email-body .body-table table .item {
                      border-radius: 8px;
                      color: #5E8E3E;
                      text-align: left;
                    }
                    .email-body .body-table table th,
                    .email-body .body-table table td {
                      padding: 10px;
                    }
                    .email-body .body-table table tr:first-child th {
                      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                    }
                    .email-body .body-table table tr td:last-child {
                      text-align: right;
                    }
                    .email-body .body-table table tr th:last-child {
                      text-align: right;
                    }
                    .email-body .body-table table tr:last-child th:first-child {
                      border-radius: 8px 0 0 8px;
                    }
                    .email-body .body-table table tr:last-child th:last-child {
                      border-radius: 0 8px 8px 0;
                    }
                    .email-footer {
                      border-top: 1px solid rgba(0, 0, 0, 0.2);
                    }
                    .email-footer .footer-text {
                      font-size: 0.8rem;
                      text-align: center;
                      padding-top: 1rem;
                    }
                    .email-footer .footer-text a {
                      color: #5E8E3E;
                    }
                  </style>
                </head>
                <body>
                  <div class="email">
                    <div class="email-head">
                      <div class="head-img">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png"
                          alt="logo"
                        />
                      </div>
                    </div>
                    <div class="email-body">
                      <div class="body-text">
                        <div class="body-greeting">
                          Hi, ${order.customerFirstName} ${order.customerLastName}
                        </div>
                        <div>Your order has been successfully placed
                        <div>Order Number : ${orderNumber}</div>
                        <div>Date : ${orderDate}</div>
                      </div>
                      <div class="body-table">
                        <table>
                          <tr class="item">
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                          ${orderItemsHTML}
                          <tr class="total">
                            <th></th>
                            <th>SubTotal</th>
                            <th>${formatPrice(order.cartSubTotalPrice)}</th>
                          </tr>
                          <tr class="total">
                            <th></th>
                            <th>TVA ${order.tvaApplied * 100}%</th>
                            <th>${formatPrice(order.cartTotalPrice - order.cartSubTotalPrice)}</th>
                          </tr>
                          <tr class="total">
                            <th></th>
                            <th>Total</th>
                            <th>${formatPrice(order.cartTotalPrice)}</th>
                          </tr>
                        </table>
                      </div>
                      <div class="body-text bottom-text">
                        Thank You for giving me the opportunity to work on this project. I
                        hope the product met your expectations. I look forward to working with
                        You &#708;_&#708;
                      </div>
                    </div>
                    <div class="email-footer">
                      <div class="footer-text">
                        &copy; <a href=""  target="_blank">shopify.com</a>
                      </div>
                    </div>
                  </div>
                </body>
                  </html>
                `,
        };

        transporter.sendMail(mailOptions, (err) => {
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
};

module.exports = SendOrderMail;
