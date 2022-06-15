import express from "express";
import {
    createNotify, getNotifies, 
} from "../controllers/notify.controller.js";
import {verifyTokenAndUserAuthorization } from "../middlewares/verifyToken.js";

const notifyRoutes = express.Router();

notifyRoutes.post('', verifyTokenAndUserAuthorization, createNotify);
notifyRoutes.get('', verifyTokenAndUserAuthorization, getNotifies);

export { notifyRoutes };


