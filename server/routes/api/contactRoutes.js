const { SendContactForm } = require('../../controllers/contactController');

// contactRoutes.js
const router = require('express').Router();
// const contactController = require('../../controllers/contactController');

router.post('/submit', SendContactForm);

module.exports = router;
