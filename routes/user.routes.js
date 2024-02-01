import express from 'express';
import { createAccount, getSavedData, refreshToken, saveAllInfo } from '../controllers/user.controller.js';
import authenticateToken from '../middleware/security/authorization/authenticate.token.js';

const userRouter = express.Router()

userRouter.post('/create-account', createAccount)

userRouter.post('/refresh-token', refreshToken)

userRouter.post('/save-all-info', authenticateToken, saveAllInfo)

userRouter.get('/get-submitted-data/:id', authenticateToken, getSavedData)


export default userRouter