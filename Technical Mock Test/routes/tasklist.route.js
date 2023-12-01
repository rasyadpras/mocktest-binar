const express = require('express');
const router = express.Router();
const {
    newTask,
    getTask,
    getTaskId,
    updateTask,
    deleteTask,
} = require('../controllers/tasklist.controller');

/**
 * @swagger
 * /todo:
 *   post:
 *     tags:
 *      - "Task"
 *     summary: Insert new Task
 *     responses:
 *       201:
 *         description: New task created
 *       500:
 *         description: Internal server error
 */
router.post('/', newTask);

/**
 * @swagger
 * /todo:
 *   get:
 *     tags:
 *      - "Task"
 *     summary: Find all task
 *     responses:
 *       200:
 *         description: Get data success
 *       500:
 *         description: Internal server error
 */
router.get('/', getTask);

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     tags:
 *      - "Task" 
 *     summary: Find task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get data success
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getTaskId);

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     tags:
 *      - "Task"
 *     summary: Update data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Update data success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateTask);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     tags:
 *      - "Task" 
 *     summary: Delete task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete data success
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteTask);

module.exports = router;