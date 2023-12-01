require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/route');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const port = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'To-Do List API',
            version: '1.0.0',
            description: 'This is a back-end server application api for the simulation of mock test CDP Binar Academy',
        },
        servers: [{url: `http://localhost:${port}`}],
    },
    apis: ['./routes/user.route.js', './routes/auth.route.js', './routes/tasklist.route.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/', router);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));