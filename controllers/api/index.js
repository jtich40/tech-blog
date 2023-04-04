const router = require('express').Router();
const userRoute = require('./userRoutes');
const postRoute = require('./postRoutes');

router.use('/user', userRoute);
router.use('/post', postRoute);

module.exports = router;