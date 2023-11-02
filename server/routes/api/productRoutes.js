const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const { createProduct, listProducts, getProductById, updateProductData, deleteProduct } = require("../../controllers/productController");
const { validateProductForm, validateProductFormUpdate } = require("../../middleware/ValidateFormMiddleweare");
const { handleValidationErrors } = require("../../middleware/handleValidationErrors");
const upload = require("../../middleware/multerMiddleware");

//create new product
router.post("/", isAdminManager, upload.array("images", 5), validateProductForm, handleValidationErrors, createProduct);
//get all products list
router.get("/", listProducts);
//get product by id
router.get("/:id", getProductById);
//update product data
router.patch("/:id", isAdminManager, validateProductFormUpdate, handleValidationErrors, updateProductData);
//delete product
router.delete("/delete/:id", isAdminManager, deleteProduct);

module.exports = router;
