import express from 'express';
import { createAccount } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.post('/create-account',createAccount)


export default userRouter