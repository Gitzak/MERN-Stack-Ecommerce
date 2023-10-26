const express = require('express')
const router = express.Router()

// controller functions
const { createProduct, listProducts, getProductById, updateProductData, deleteProduct } = require('../../controllers/productController')


//create new product
router.post('/', createProduct)
//get all products list
router.get('/', listProducts)
//get product by id
router.get('/:id', getProductById)
//update product data
router.patch('/:id', updateProductData)
//delete product
router.delete('/delete/:id', deleteProduct)

module.exports = router