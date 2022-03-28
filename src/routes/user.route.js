import express from "express";
import {
    getAllUser, getUserById, createUser, updateUser, deleteUser, unfollow, follow, getFriends
} from "../controllers/user.controller.js";
import { login, register , refreshToken , logout} from "../controllers/auth.controller.js";

import auth  from "../middlewares/middlewares.js";

const userRoutes = express.Router();

userRoutes.get('', getAllUser);
userRoutes.get('/:id', getUserById);
userRoutes.post('', auth ,createUser);
userRoutes.put('/:id', auth ,updateUser);
userRoutes.delete('/:id', deleteUser);
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/logout', logout);
userRoutes.post('/refreshToken', refreshToken);
userRoutes.put('/:id/follow', auth, follow);
userRoutes.put('/:id/unfollow', auth, unfollow)
userRoutes.get('/:id/getFriends',auth, getFriends);

export { userRoutes };
