import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();
dotenv.config({
    path: './.env'
});
const Port = process.env.PORT || 4000


// Files And Controllers
import { DatabaseConnection } from './configs/DataBaseConnection.js';
import { userRouter } from './routes/userRoutes.js';
import { companyRoutes } from './routes/companyRoutes.js';

DatabaseConnection()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/company', companyRoutes)

app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
        success : err.success,
        message: err.message,
        data: err.data,
        errors : err.errors
    })
});
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`)
})