import express from "express";
import {
    getAllUser, getUserById, createUser, updateUser, deleteUser, unfollow, follow, getFriends
} from "../controllers/user.controller.js";
import { login, register , refreshToken , logout, changePassword} from "../controllers/auth.controller.js";

import {verifyToken, verifyTokenAndUserAuthorization, verifyTokenAndAdminAuthorization } from "../middlewares/verifyToken.js";

const userRoutes = express.Router();

userRoutes.get('',getAllUser);
userRoutes.get('/:id', getUserById);
userRoutes.post('', verifyTokenAndAdminAuthorization, createUser);
userRoutes.put('/:id', verifyTokenAndUserAuthorization, updateUser);
userRoutes.delete('/:id', verifyTokenAndAdminAuthorization, deleteUser);
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/logout', verifyTokenAndUserAuthorization, logout);
userRoutes.post('/changePassword', verifyTokenAndUserAuthorization, changePassword);
userRoutes.post('/refreshToken', verifyTokenAndUserAuthorization, refreshToken);
userRoutes.put('/:id/follow',  verifyToken, follow);
userRoutes.put('/:id/unfollow', verifyToken, unfollow)
userRoutes.get('/:id/getFriends', verifyTokenAndUserAuthorization, getFriends);

export { userRoutes };
