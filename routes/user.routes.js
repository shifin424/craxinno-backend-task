import express from 'express';
import { createAccount, saveAllInfo } from '../controllers/user.controller.js';
import authenticateToken from '../middleware/security/authorization/authenticate.token.js';

const userRouter = express.Router()

userRouter.post('/create-account',createAccount)

userRouter.post('/save-all-info',authenticateToken,saveAllInfo)


export default userRouter