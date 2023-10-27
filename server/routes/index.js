const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const categoryRoutes = require("./api/categoriesRoutes");
// const subCategoriesRoutes = require("./api/subCategoriesRoutes");
const subCategoriesRoutes = require("./api/subCategoriesRoutes")
const customerRoutes = require("./api/customerRoutes");
const productRoutes = require("./api/productRoutes");

// api Users routes
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/categories", categoryRoutes);
router.use("/subcategories", subCategoriesRoutes);

router.use("*", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
