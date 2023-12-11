const nodemailer = require("nodemailer");
const config = require("../config/keys");
const CONSTANTS = require("../constants/index");

const SendMailForContact = async ({ name, email, subject, message }) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            auth: {
                user: config.mail.user,
                pass: config.mail.pass,
            },
        });
        console.log('mail',config.mail.user);
        const mailOptions = {
            from: email,
            // to: config.mail.user, 
            to: "yassirhakimi15@gmail.com", 
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <html>
          <!-- ... (your email template, similar to the previous one) ... -->
          ${message}
        </html>
      `,
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
              console.log(err);
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

module.exports = SendMailForContact;
