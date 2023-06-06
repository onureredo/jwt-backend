import { Router } from 'express';
import { signUp, signIn, getUser } from '../controllers/auth';
import { sign, verify } from 'jsonwebtoken';

const authRouter = Router();

authRouter.post('/register', signUp);
authRouter.post('/login', signIn);
authRouter.get('/me', verify, getUser);

export default authRouter;
