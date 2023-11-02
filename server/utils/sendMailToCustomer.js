const nodemailer = require("nodemailer");
const config = require("../config/keys");
const CONSTANTS = require("../constants/index");

const SendMailToUser = async ({ customerId, customerEmail, customerPassword }) => {
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
                    <body>
                      <p>Hello Dear; </p>
                      <p>Your email: ${customerEmail}</p>
                      <p>Your password: ${customerPassword}</p>
                      <p>Have a good day.</p>
                      <p>Thank you .</p>
                      <p>To validate your account click in the link below</p>
                      <a href="${config.app.baseUrl}customers/validate/${customerId}">Click Here</a>
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

module.exports = SendMailToUser;
