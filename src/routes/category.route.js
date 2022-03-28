import express from "express";
import {
    getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory
} from "../controllers/category.controller.js";
import auth from "../middlewares/middlewares.js";

const categoryRoutes = express.Router();

categoryRoutes.get('', getAllCategory);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.post('', auth,createCategory);
categoryRoutes.put('/:id', auth,updateCategory);
categoryRoutes.delete('/:id', auth, deleteCategory);

export { categoryRoutes };