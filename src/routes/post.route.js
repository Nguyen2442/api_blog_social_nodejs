import express from "express";
import {
    searchPost,
    getAllPost, getPostById, createPost, updatePost, deletePost, likePost, unlikePost, getAllPostByAuthor
} from "../controllers/post.controller.js";
import { verifyToken,verifyTokenAndUserAuthorization, verifyTokenAndAdminAuthorization } from "../middlewares/verifyToken.js";


const postRoutes = express.Router();

postRoutes.get('', getAllPost);
postRoutes.get('/:id', getPostById);
postRoutes.post('', verifyTokenAndUserAuthorization, createPost);
postRoutes.put('/:id', verifyTokenAndUserAuthorization ,updatePost);
postRoutes.delete('/:id', verifyTokenAndUserAuthorization, deletePost);
postRoutes.get('/search/:key', searchPost);
postRoutes.get('/:id/like', verifyToken, likePost);
postRoutes.post('/:id/unlike', verifyToken, unlikePost);

postRoutes.get('/:id', getAllPostByAuthor);

export { postRoutes };