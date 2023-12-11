const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const customerRoutes = require("./api/customerRoutes");
const categoryRoutes = require("./api/categoriesRoutes");
const subCategoriesRoutes = require("./api/subCategoriesRoutes")
const productRoutes = require("./api/productRoutes");
const orderRoutes = require("./api/orderRoutes");
const contactRoutes = require("./api/contactRoutes");
const { sanitize } = require("../middleware/sanitize");

// router.use((req, res, next) => {
//     console.log(`Accessing route: ${req.path}`);
//     next();
// });
router.use(sanitize);
// api Users routes
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/categories", categoryRoutes);
router.use("/subcategories", subCategoriesRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use('/contact', contactRoutes);


router.use("*", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
