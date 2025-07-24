import "dotenv/config";
import express from 'express';
import databaseConnection from './config/db.js';
import userRoutes from './routers/userRoutes.js';
import { getAllUser } from '../controllers/userController.js';
import { Router } from 'express';


const router = Router();

router.get('/users', getAllUser);
router.post('/users', createUser);
router.post('/users/login', loginUser); // idempotencia



export default router;