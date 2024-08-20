const router = require('express').Router();

const thoughtRoutes = require('./thought-route');
const userRoutes = require('./user-routes');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router
