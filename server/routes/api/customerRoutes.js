const express = require('express')
const router = express.Router()

// controller functions
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
router.get('/:id', getCustomerById)
//get all customers list
router.get('/', getCustomers)
//update customer data (for admin and manager only)
router.put('/:id', updateCustomerDataByAdmins)
// customer update himself
router.patch('/profile/update', updateCustomerData)
// enter customer profil
router.get('/profile', getProfileCustomer)
//delete account for customer
router.delete('/delete', deleteCustomer)

module.exports = router