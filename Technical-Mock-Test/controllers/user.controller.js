const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ResponseTemplate } = require('../template/response');

async function getUser(req, res) {
    try {
        const { name } = req.query;
        const payload = {};

        if (name) {
            payload.name = name
        }

        const user = await prisma.users.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            },
        });
        let response = ResponseTemplate(user, 'get data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function getUserId(req, res) {
    try {
        const { id } = req.params;

        const user = await prisma.users.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true
            },
        });
        if (!user) {
            let response = ResponseTemplate(null, 'user not found', null, 404);
            return res.status(404).json(response);
        } else {
            let response = ResponseTemplate(user, 'get data success', null, 200);
            return res.status(200).json(response);
        }
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function updateUser(req, res) {
    try {
        const { name, email, pin } = req.body;
        const { id } = req.params;
        const payload = {};

        if (!name && !email && !pin) {
            let response = ResponseTemplate(null, 'bad request', null, 400);
            return res.status(400).json(response);
        }

        if (name) {
            payload.name = name
        }
        if (email) {
            payload.email = email
        }

        const findUser = await prisma.users.findUnique({ where: { id: Number(id) } });
        if (!findUser) {
            let response = ResponseTemplate(null, 'user not found', null, 404);
            return res.status(404).json(response);
        };

        const user = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: payload,
        });
        let response = ResponseTemplate(user, 'update data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const findUser = await prisma.users.findUnique({ where: { id: Number(id) } });
        if (!findUser) {
            let response = ResponseTemplate(null, 'user not found', null, 404);
            return res.status(404).json(response);
        };

        await prisma.users.delete({ where: { id: Number(id) } });
        let response = ResponseTemplate(null, 'delete data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
}

module.exports = {
    getUser,
    getUserId,
    updateUser,
    deleteUser
};