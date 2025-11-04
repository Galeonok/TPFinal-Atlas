import express, { Router } from 'express';
import { createUser, deleteUser, getUsersByEmail, updateUser, validateUser } from '../controllers/userController.js';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js';

const userRoute = express.Router();

userRoute.post('/', createUser);
//http://localhost:3000/api/users/
userRoute.get('/', verifyTokenMiddleware, getUsersByEmail);
//http://localhost:3000/api/users/
userRoute.delete('/:id', verifyTokenMiddleware, deleteUser);
//http://localhost:3000/api/users/88888
userRoute.put('/:id', verifyTokenMiddleware, updateUser);
//http://localhost:3000/api/users/88888
userRoute.post('/login', validateUser);
//http://localhost:3000/api/users/login

export default userRoute;   