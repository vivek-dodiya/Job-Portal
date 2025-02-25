import express from 'express';
import { onlyRecruiterAccess } from '../middlewares/onlyRecruiterAccessMiddleware.js';
import { auth } from '../middlewares/authMiddleware.js';
import { companyRegister } from '../controllers/companyControllers/registerCompany.js';
import { getCompany } from '../controllers/companyControllers/getCompany.js';
export const companyRoutes = express.Router();


companyRoutes.post('/register', auth, onlyRecruiterAccess, companyRegister);
companyRoutes.get('/getcompany', auth, onlyRecruiterAccess, getCompany);