const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const customerRoutes = require("./api/customerRoutes");

// api Users routes
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);

router.use("*", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
