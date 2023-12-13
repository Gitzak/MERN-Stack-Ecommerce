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
            <style>
               body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
               table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
               img { -ms-interpolation-mode: bicubic; }
               img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
               table { border-collapse: collapse !important; }
               body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
               a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
               div[style*="margin: 16px 0;"] { margin: 0 !important; }
            </style>
            <body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;">
               <table border="0" cellpadding="0" cellspacing="0" width="100%">
               <tr>
                  <td bgcolor="#426899" align="center">
                     <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <tr>
                           <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                              <div style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">Company</div>
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr>
                  <td bgcolor="#426899" align="center" style="padding: 0px 10px 0px 10px;">
                     <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <tr>
                           <td bgcolor="#ffffff" align="left" valign="top" style="padding: 30px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                           <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">Welcome to your favorite Shop!</h1>

                           <p style="font-size: 16px; color: #555555; margin-bottom: 30px;">We are thrilled to have you join our community.</p>
               
                              <h1 style="font-size: 24px; font-weight: 400; margin: 0;">Your Account Information</h1>
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                     <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <tr>
                           <td bgcolor="#ffffff" align="left">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                 <tr>
                                    <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">E-Mail</th>
                                    <td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">${customerEmail}</td>
                                 </tr>
                                 <tr>
                                    <th align="left" valign="top" style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">Password</th>
                                    <td align="left" valign="top" style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">${customerPassword}</td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                        <tr>
                           <td bgcolor="#ffffff" align="center">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                 <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-top:1px solid #dddddd;">
                                       <table border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                             <td align="left" style="border-radius: 3px;" bgcolor="#426899">
                                                <a href="${config.app.origin_front}/validate/${customerId}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 2px; border: 1px solid #0055c5; display: inline-block;">Validate your Account</a>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
                     </table>
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
