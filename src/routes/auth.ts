import express from 'express';
import { registerUser, getAccounts } from '../controller/authController';

const router = express.Router();


router.post('/register', registerUser);
router.get('/users', getAccounts);

export default router;
