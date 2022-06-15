import express from "express";
import {
    getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory
} from "../controllers/category.controller.js";

import { verifyTokenAndAdminAuthorization } from "../middlewares/verifyToken.js";

const categoryRoutes = express.Router();

categoryRoutes.get('',  getAllCategory);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.post('', verifyTokenAndAdminAuthorization,createCategory);
categoryRoutes.put('/:id', verifyTokenAndAdminAuthorization,updateCategory);
categoryRoutes.delete('/:id', verifyTokenAndAdminAuthorization, deleteCategory);

export { categoryRoutes };