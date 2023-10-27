const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const categoryRoutes = require("./api/categoriesRoutes");
// const subCategoriesRoutes = require("./api/subCategoriesRoutes");
const subCategoriesRoutes = require("./api/subCategoriesRoutes")
const customerRoutes = require("./api/customerRoutes");
const productRoutes = require("./api/productRoutes");
const orderRoutes = require("./api/orderRoutes");

// api Users routes
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
<<<<<<< HEAD
router.use("/categories", categoryRoutes);
<<<<<<< HEAD
router.use("/subcategories", subCategoriesRoutes);
=======
=======
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
>>>>>>> orders
>>>>>>> 8ad32b5beb2bf3439fc61eeda029a28bee44fa45

router.use("*", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
