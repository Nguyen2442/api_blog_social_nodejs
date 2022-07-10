import express from "express";
import {
    getAllTag, getTagById, createTag, updateTag, deleteTag
} from "../controllers/tag.controller.js";

import { verifyTokenAndAdminAuthorization } from "../middlewares/verifyToken.js";


const tagRoutes = express.Router();

tagRoutes.get('', getAllTag);
tagRoutes.get('/:id', getTagById);
tagRoutes.post('', verifyTokenAndAdminAuthorization,createTag);
tagRoutes.put('/:id', verifyTokenAndAdminAuthorization, updateTag);
tagRoutes.delete('/:id', verifyTokenAndAdminAuthorization, deleteTag);

export { tagRoutes };