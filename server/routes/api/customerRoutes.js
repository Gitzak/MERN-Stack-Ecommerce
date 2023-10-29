const express = require('express')
const router = express.Router()
const { isAdminManager } = require("../../middleware/isAdminManager");
const { isCustomer } = require("../../middleware/isCustomer");
const {
    loginCustomer,
    registerCustomer,
    validateAccCustomer,
    getCustomerById,
    getCustomers,
    updateCustomerDataByAdmins,
    updateCustomerData,
    getProfileCustomer,
    deleteCustomer,
} = require('../../controllers/customerController')

// login route
router.post('/login', loginCustomer)
//create new customers (Register)
router.post('/', registerCustomer)
//customer account or email validation
router.put('/validate/:id', validateAccCustomer)
//get customer by id
router.get('/:id', isAdminManager, getCustomerById)
//get all customers list
router.get('/', isAdminManager, getCustomers)
//update customer data (for admin and manager only)
router.put('/:id', isAdminManager, updateCustomerDataByAdmins)
// customer update himself
// todo: Token and isCustomer
router.patch('/profile/update', isCustomer, updateCustomerData)
// enter customer profil
// todo: Token and isCustomer
router.get('/profile', isCustomer, getProfileCustomer)
//delete account for customer
// todo: Token and isCustomer
router.delete('/delete', isCustomer, deleteCustomer)

module.exports = router