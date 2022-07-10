import express from "express";
import {
    createComment, getAllComments, getCommentById, likeComment, updateComment, unlikeComment, deleteComment
} from "../controllers/comment.controller.js";
import { verifyToken ,verifyTokenAndUserAuthorization, verifyTokenAndAdminAuthorization } from "../middlewares/verifyToken.js";


const commentRoutes = express.Router();

commentRoutes.get('', getAllComments);
commentRoutes.get('/:id',  getCommentById);
commentRoutes.post('', verifyTokenAndUserAuthorization,createComment);
commentRoutes.put('/:id', verifyTokenAndUserAuthorization, updateComment);
commentRoutes.post('/:id/like', verifyToken, likeComment);
commentRoutes.post('/:id/unlike', verifyToken, unlikeComment);
commentRoutes.delete('/:id', verifyTokenAndUserAuthorization, deleteComment);

export { commentRoutes };