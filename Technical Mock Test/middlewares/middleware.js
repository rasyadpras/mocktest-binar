const Joi = require('joi');
const { ResponseTemplate } = require('../template/response');

const checkRegister = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        pin: Joi.string().pattern(new RegExp('^[0-9]{6}$')).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let response = ResponseTemplate(null, 'invalid request',error.details[0].message, 400)
        return res.status(400).json(response);
    };
    next();
};

module.exports = {
    checkRegister
};