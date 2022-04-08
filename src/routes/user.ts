import express from 'express';
import {  getUsers, } from '../controller/userController';

const router = express.Router();

router.get('/all', getUsers);

export default router;
