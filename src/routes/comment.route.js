import express from "express";
import {
    createComment, getAllComments, getCommentById, updateComment
} from "../controllers/comment.controller.js";
import { verifyTokenAndUserAuthorization, verifyTokenAndAdminAuthorization } from "../middlewares/verifyToken.js";


const commentRoutes = express.Router();

commentRoutes.get('', getAllComments);
commentRoutes.get('/:id', getCommentById);
commentRoutes.post('', verifyTokenAndUserAuthorization,createComment);
commentRoutes.put('/:id', verifyTokenAndUserAuthorization ,updateComment)

export { commentRoutes };