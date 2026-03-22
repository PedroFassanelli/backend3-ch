import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGO_URL)

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'AdoptMe API',
            description: 'API para gestión de adopciones de mascotas',
            version: '1.0.0'
        }
    },
    apis: [resolve(__dirname, 'docs', '**', '*.yaml')]
};
const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

export default app;
