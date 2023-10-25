const express = require('express')
const router = express.Router()

// controller functions
const { getCustomerById, RegisterCustomer, updateCustomerData, getCustomers, deleteCustomer, loginCustomer, validateAccCustomer, getProfileCustomer } = require('../../controllers/customerController')

// login route
router.post('/login', )
//create new customers
router.post('/', )
//get all customers list
router.get('/', )
//search
router.get('/', )
//get customer by id
router.post('/:id', )
//customer account or email validation
router.put('/validate/:id', )
//update customer data (for admin and manager only)
router.put('/:id', )
//delete account
router.delete('/delete', )
// enter customer profil
router.get('/profile', )
// customer update himself
router.patch('/profile/update', )

module.exports = router