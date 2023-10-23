const express = require('express')
const router = express.Router()

// controller functions
const { loginUser, addNewUser, updateUserData } = require('../../controllers/authController')
const { isAllowed } = require('../../middleware/isAllowed')


// login route
router.post('/login', loginUser)



//Add new user route
router.post('/', isAllowed, addNewUser)



//Update user's data 
router.put('/:id', isAllowed, updateUserData)



module.exports = router