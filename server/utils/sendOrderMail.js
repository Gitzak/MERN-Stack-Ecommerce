const nodemailer = require("nodemailer");
const config = require("../config/keys");
const CONSTANTS = require("../constants/index");

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

        const mailOptions = {
            from: config.mail.user,
            to: customerEmail,
            subject: "Your Account Information",
            html: `
                  <html>
                  <style>
                  .email {
                    max-width: 480px;
                    margin: 1rem auto;
                    border-radius: 10px;
                    border-top: #d74034 2px solid;
                    border-bottom: #d74034 2px solid;
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
                    text-align: center;
                    font-size: 1.15rem;
                  }
                  .email-body .body-text.bottom-text {
                    padding: 2rem 0 1rem;
                    text-align: center;
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
                    background-color: hsla(4, 67%, 52%, 0.12);
                    border-radius: 8px;
                    color: #d74034;
                  }
                  .email-body .body-table table .item {
                    border-radius: 8px;
                    color: #d74034;
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
                    color: #d74034;
                  }
                </style>
              </head>
              <body>
                <div class="email">
                  <div class="email-head">
                    <div class="head-img">
                      <img
                        src="https://wpfystatic.b-cdn.net/rahul/email.png"
                        alt="damnitrahul-logo"
                      />
                    </div>
                  </div>
                  <div class="email-body">
                    <div class="body-text">
                      <div class="body-greeting">
                        Hi, Rahul!
                      </div>
                      Your order has been successfully completed and delivered to You!
                    </div>
                    <div class="invoice-icon">
                      <img src="https://wpfystatic.b-cdn.net/rahul/billl.png" alt="invoice-icon" />
                    </div>
                    <div class="body-table">
                      <table>
                        <tr class="item">
                          <th>Service Provided</th>
                          <th>Amount</th>
                        </tr>
                        <tr>
                          <td>Custom Graphic/Illustration</td>
                          <td>₹1500</td>
                        </tr>
                        <tr>
                          <td>Custom Graphic/Illustration</td>
                          <td>₹1500</td>
                        </tr>
                        <tr>
                          <td>Custom Graphic/Illustration</td>
                          <td>₹1500</td>
                        </tr>
                        <tr class="total">
                          <th>Total</th>
                          <th>₹1500</th>
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
                      &copy; <a href="https://damnitrahul.com/"  target="_blank">damnitrahul.com</a>
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
                    status: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE,
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
