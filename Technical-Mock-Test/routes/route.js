const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const taskRoute = require('./tasklist.route');

router.use(morgan('dev'));

router.use('/', authRoute);
router.use('/user', userRoute);
router.use('/todo', taskRoute);

module.exports = router;