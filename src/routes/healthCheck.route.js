import express from "express";
import {
    healthCheck,
    healthCheckAuth
} from "../controllers/healthCheck.controller.js";

import {verifyTokenAndUserAuthorization, verifyTokenAndAdminAuthorization } from "../middlewares/verifyToken.js";

const healthCheckRoutes = express.Router();

healthCheckRoutes.get('',healthCheck);
healthCheckRoutes.get('/auth', verifyTokenAndUserAuthorization, healthCheckAuth);
healthCheckRoutes.get('/auth/admin', verifyTokenAndAdminAuthorization, healthCheckAuth);

export { healthCheckRoutes };