import express from "express";
import {
    searchPost,
    getAllPost, getPostById, createPost, updatePost, deletePost
} from "../controllers/post.controller.js";
import { verifyTokenAndUserAuthorization, verifyTokenAndAdminAuthorization } from "../middlewares/verifyToken.js";


const postRoutes = express.Router();

postRoutes.get('', getAllPost);
postRoutes.get('/:id', verifyTokenAndUserAuthorization,getPostById);
postRoutes.post('', verifyTokenAndUserAuthorization,createPost);
postRoutes.put('/:id', verifyTokenAndUserAuthorization ,updatePost);
postRoutes.delete('/:id', verifyTokenAndUserAuthorization,deletePost);
postRoutes.get('/search/:key', searchPost);

export { postRoutes };