const router = require('express').Router();
const dashboardRoute = require('./dashboardRoutes');
const userRoute = require('./userRoutes');

router.use('/dashboard', dashboardRoute);
router.use('/user', userRoute);

module.exports = router;












