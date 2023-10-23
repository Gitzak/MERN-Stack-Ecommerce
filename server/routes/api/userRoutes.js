const express = require('express')
const router = express.Router()

// controller functions
const { loginUser } = require('../../controllers/authController')


// login route
router.post('/login', loginUser)


module.exports = router