const express = require('express');
const router = express.Router();
const {
    getUser,
    getUserId,
    updateUser,
    deleteUser,
} = require('../controllers/user.controller');

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Find all user
 *     responses:
 *       200:
 *         description: Get data success
 *       500:
 *         description: Internal server error
 */
router.get('/', getUser);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *      - "User" 
 *     summary: Find user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get data success
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getUserId);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags:
 *      - "User"
 *     summary: Update data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Update data success
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *      - "User" 
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete data success
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteUser);

module.exports = router;