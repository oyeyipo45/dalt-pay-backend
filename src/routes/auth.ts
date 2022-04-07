import express from 'express';
import { register, getAccounts } from '../controller/authController';

const router = express.Router();


router.post("/register", register)
router.get('/users', getAccounts);

export default router;
