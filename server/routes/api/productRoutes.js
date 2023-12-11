const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const { createProduct, listProducts, listShopProducts, getProductById, updateProductData, deleteProduct, insertImageProduct, getNewestProducts, getBestProducts, getRecommendedProducts } = require("../../controllers/productController");
const { validateProductForm, validateProductFormUpdate } = require("../../middleware/ValidateFormMiddleweare");
const { handleValidationErrors } = require("../../middleware/handleValidationErrors");
const { validateIdFormat } = require("../../middleware/validateIdFormat");
const upload = require("../../middleware/multerMiddleware");

//create new product
// router.post("/", isAdminManager, upload.array("images", 5), validateProductForm, handleValidationErrors, createProduct);
router.post("/", isAdminManager, upload.array("images", 5), createProduct);
// router.post("/", isAdminManager, createProduct);
//get all products list
router.get("/", listProducts);
//get all products list
router.get("/shop", listShopProducts);
//get newest products
router.get("/newest", getNewestProducts);
//get best seller products
router.get("/best", getBestProducts);
//get best seller products
router.get("/recommended", getRecommendedProducts);
//get product by id
router.get("/:id", validateIdFormat, getProductById);
//update product data
// router.patch("/:id", isAdminManager, validateIdFormat, validateProductFormUpdate, handleValidationErrors, updateProductData);
router.patch("/:id", isAdminManager, validateIdFormat, updateProductData);
//delete product
router.delete("/delete/:id", isAdminManager, validateIdFormat, deleteProduct);

module.exports = router;
