const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const categoryRoutes = require("./api/categoriesRoutes");
const customerRoutes = require("./api/customerRoutes");
const productRoutes = require("./api/productRoutes");
const orderRoutes = require("./api/orderRoutes");

// api Users routes
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
<<<<<<< HEAD
router.use("/categories", categoryRoutes);
=======
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
>>>>>>> orders

router.use("*", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
