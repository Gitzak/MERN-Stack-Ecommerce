const CONSTANTS = require("../constants");
const SendMailForContact = require("../utils/sendContactMail");
const config = require("./../config/keys");

class ContactService {
   
    async SendContactForm(req) {
        try {
            const response = {};
            try {
                const { name, email, subject, message } = req.body;

                // Validate the form data if needed

                // Send contact form email
                await SendMailForContact({ name, email, subject, message });

                response.message = CONSTANTS.EMAIL_SEND_SUCCESS;
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                return response;
            } catch (error) {
                console.error("Error sending contact form:", error);
                response.message = CONSTANTS.SERVER_ERROR;
                response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
                return response;
            }
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }
}
module.exports = { ContactService };
