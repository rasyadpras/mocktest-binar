const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ResponseTemplate } = require('../template/response');

async function register(req, res) {
    try {
        const { name, email, pin } = req.body;
        
        const existUser = await prisma.users.findUnique({ where: { email } });
        if (existUser) {
            let response = ResponseTemplate(null, 'bad request', 'email already used!', 400);
            return res.status(400).json(response);
        };

        const hashPin = await bcrypt.hash(pin, 10);
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                pin: hashPin
            }
        });
        let response = ResponseTemplate(user, 'success', null, 201);
        return res.status(201).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(response);
    }
};

async function login(req, res, next) {
    try {
        const { email, pin } = req.body;

        const user = await prisma.users.findUnique({ where: { email: email } });
        if (!user) {
            let response = ResponseTemplate(null, 'bad request', 'invalid email or pin!', 400);
            return res.status(400).json(response);
        };

        const comparePin = await bcrypt.compare(pin, user.pin);
        if (!comparePin) {
            let response = ResponseTemplate(null, 'bad request', 'invalid email or pin!', 400);
            return res.status(400).json(response);
        };

        let token = jwt.sign({ email: user.email, user_id: user.user_id }, process.env.SECRET_KEY);
        let response = ResponseTemplate({ user, token }, 'created', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};