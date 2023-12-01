const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { checkRegister } = require('../middlewares/middleware');

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *      - "Authentication"
 *     summary: Register new user
 *     responses:
 *       201:
 *         description: New user created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register', checkRegister, register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *      - "Authentication"
 *     summary: Login user
 *     responses:
 *       200:
 *         description: Login user success
 *       400:
 *         description: Bad request
 */
router.post('/login', login);

module.exports = router;