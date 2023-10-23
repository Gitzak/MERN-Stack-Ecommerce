const router = require('express').Router();
const userRoutes = require('./api/userRoutes');

// api Users routes
router.use('/users', userRoutes)

router.use('*', (req, res) => res.status(404).json('No API route found'));

module.exports = router;