import { Router } from 'express';
import { createUser, deleteUser, getAllusers, loginUser } from '../controllers/index.js';

const router = Router();

router.get('/users', getAllusers);
router.post('/users/create', createUser);
router.post('/users/login', loginUser); // idempotencia
router.delete('/users/:id', deleteUser);





export default router;