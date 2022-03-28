import express from "express";
import {
    createComment, getAllComments, getCommentById, updateComment
} from "../controllers/comment.controller.js";
import auth from "../middlewares/middlewares.js";

const commentRoutes = express.Router();

commentRoutes.get('', getAllComments);
commentRoutes.get('/:id', getCommentById);
commentRoutes.post('', createComment);
commentRoutes.put('/:id', updateComment)

export { commentRoutes };