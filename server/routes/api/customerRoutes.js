const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const { isCustomer } = require("../../middleware/isCustomer");
const { validateCustomerLogin, validateCustomerForm, validateCustomerFormUpdatePut, validateCustomerFormUpdatePatch } = require("../../middleware/ValidateFormMiddleweare");
const { handleValidationErrors } = require("../../middleware/handleValidationErrors");
const { validateIdFormat } = require("../../middleware/validateIdFormat");
const { loginCustomer, registerCustomer, validateAccCustomer, getCustomerById, getCustomers, updateCustomerDataByAdmins, updateCustomerData, getProfileCustomer, deleteCustomer } = require("../../controllers/customerController");

// login route
router.post("/login", validateCustomerLogin, handleValidationErrors, loginCustomer);
//create new customers (Register)
router.post("/", validateCustomerForm, handleValidationErrors, registerCustomer);
//customer account or email validation
router.put("/validate/:id",validateIdFormat, validateAccCustomer);
//customer verification token route 
router.get("/profile",isCustomer, (req,res)=>{
    res.status(200).json({data:req.profile})
});
//get customer by id
router.get("/customer/:id", isAdminManager, validateIdFormat, getCustomerById);
// enter customer profil
router.get("/profile", isCustomer, getProfileCustomer);
//get all customers list
router.get("/", isAdminManager, getCustomers);
//update customer data (for admin and manager only)
router.put("/:id", isAdminManager, validateIdFormat, validateCustomerFormUpdatePut, handleValidationErrors, updateCustomerDataByAdmins);
// customer update himself
router.patch("/profile/update", isCustomer, validateCustomerFormUpdatePatch, handleValidationErrors, updateCustomerData);
//delete account for customer
router.delete("/delete", isCustomer, deleteCustomer);

module.exports = router;
