const { PrismaClient } = require('@prisma/client');
const { ResponseTemplate } = require('../template/response');
const prisma = new PrismaClient();

async function newTask(req, res) {
    try {
        const { task_name, user_id } = req.body;

        const task = await prisma.tasks.create({
            data: {
                task_name: task_name,
                user_id: parseInt(user_id)
            },
            select: {
                id: true,
                task_name: true,
                is_done: true,
                created_at: true,
                updated_at: true,
                user_id: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    }
                }
            }
        });
        let response = ResponseTemplate(task, 'task created', null, 201);
        return res.status(201).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(response);
    }
};

async function getTask(req, res) {
    try {
        const { task_name } = req.query;
        const payload = {};

        if (task_name) {
            payload.task_name = task_name
        }

        const task = await prisma.tasks.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
            select: {
                id: true,
                task_name: true,
                is_done: true,
                created_at: true,
                updated_at: true,
                user_id: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    }
                }
            }
        });
        let response = ResponseTemplate(task, 'get data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function getTaskId(req, res) {
    try {
        const { id } = req.params;

        const task = await prisma.tasks.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                task_name: true,
                is_done: true,
                created_at: true,
                updated_at: true,
                user_id: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    }
                }
            }
        });
        if (!task) {
            let response = ResponseTemplate(null, 'user not found', null, 404);
            return res.status(404).json(response);
        } else {
            let response = ResponseTemplate(task, 'get data success', null, 200);
            return res.status(200).json(response);
        }
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function updateTask(req, res) {
    try {
        const { task_name, is_done, user_id } = req.body;
        const { id } = req.params;
        const payload = {};

        if (!task_name && !is_done && !user_id) {
            let response = ResponseTemplate(null, 'bad request', null, 400);
            return res.status(400).json(response);
        }

        if (task_name) {
            payload.task_name = task_name
        }
        if (user_id) {
            payload.user_id = user_id
        }
        if (is_done == 'true') {
            payload.is_done = true
        } else if (is_done == 'false') {
            payload.is_done = false
        }

        const findTask = await prisma.tasks.findUnique({ where: { id: Number(id) } });
        if (!findTask) {
            let response = ResponseTemplate(null, 'task not found', null, 404);
            return res.status(404).json(response);
        };

        const task = await prisma.tasks.update({
            where: {
                id: Number(id)
            },
            data: payload,
            select: {
                id: true,
                task_name: true,
                is_done: true,
                created_at: true,
                updated_at: true,
                user_id: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    }
                }
            }
        });
        let response = ResponseTemplate(task, 'update data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function deleteTask(req, res) {
    try {
        const { id } = req.params;

        const findTask = await prisma.tasks.findUnique({ where: { id: Number(id) } });
        if (!findTask) {
            let response = ResponseTemplate(null, 'task not found', null, 404);
            return res.status(404).json(response);
        };

        await prisma.tasks.delete({ where: { id: Number(id) } });
        let response = ResponseTemplate(null, 'delete data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

module.exports = {
    newTask,
    getTask,
    getTaskId,
    updateTask,
    deleteTask
};