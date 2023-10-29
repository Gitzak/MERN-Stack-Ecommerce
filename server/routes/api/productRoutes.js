const express = require('express')
const router = express.Router()
const { isAdminManager } = require("../../middleware/isAdminManager");
const { createProduct, listProducts, getProductById, updateProductData, deleteProduct } = require('../../controllers/productController')

//create new product
router.post('/', isAdminManager, createProduct)
//get all products list
router.get('/', listProducts)
//get product by id
router.get('/:id', getProductById)
//update product data
router.patch('/:id', isAdminManager, updateProductData)
//delete product
router.delete('/delete/:id', isAdminManager, deleteProduct)

module.exports = router