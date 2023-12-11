// contactController.js
const nodemailer = require("nodemailer");

const { ContactService } = require("../services/contactService");
const CONSTANTS = require("../constants/index");

const ContactServ = new ContactService();

// login a customer
exports.SendContactForm= async (req, res) => {
   try {
        const contact = await ContactServ.SendContactForm(req);
        res.status(contact.status).json(contact);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
  }
