import express from "express";
import {
    searchPost,
    getAllPost, getPostById, createPost, updatePost, deletePost
} from "../controllers/post.controller.js";
import auth from "../middlewares/middlewares.js";

const postRoutes = express.Router();

postRoutes.get('', getAllPost);
postRoutes.get('/:id', getPostById);
postRoutes.post('', createPost);
postRoutes.put('/:id', auth,updatePost);
postRoutes.delete('/:id', auth,deletePost);
postRoutes.get('/search/:key', searchPost);

export { postRoutes };