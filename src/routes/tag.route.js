import express from "express";
import {
    getAllTag, getTagById, createTag, updateTag, deleteTag
} from "../controllers/tag.controller.js";
import auth from "../middlewares/middlewares.js";

const tagRoutes = express.Router();

tagRoutes.get('', getAllTag);
tagRoutes.get('/:id', getTagById);
tagRoutes.post('', auth,createTag);
tagRoutes.put('/:id', auth, updateTag);
tagRoutes.delete('/:id',auth, deleteTag);

export { tagRoutes };