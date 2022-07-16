import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import Category from '../models/category.model.js';
import User from '../models/user.model.js';
import Tag from '../models/tag.model.js';

export const getAllPost = async (req, res) => {
    try {
        const post = await Post.find()
        res.send(post);
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getPostById = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Tag Id');
    }
    try {
        const post = await Post.findById(req.params.id)
        res.send(post)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const createPost = async (req, res) => {
    const newPost = new Post({
        title : req.body.title,
        description : req.body.description,
        content : req.body.description,
        image : req.body.description,
        author : req.user.id,
        category : req.body.category,
        tags : req.body.tags,
    });
    try {
        const result = await newPost.save()
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
}

export const updatePost = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Post Id');
    }
    try {
        const author = await User.findById(req.body.author); 
        if (!author) {
            return res.status(400).send('Invalid Author');
        }
        
        const category = await Category.findById(req.body.category); 
        if (!category) {
            return res.status(400).send('Invalid Category');
        }

        const tags = await Tag.findById(req.body.tags); 
        if (!tags) {
            return res.status(400).send('Invalid Tags');
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).send('Invalid Post');
        }

        const updatePost = await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            content: req.body.description,
            image: req.body.image,
            author: req.body.author,
            category: req.body.category,
            tags: req.body.tags,
        }, { new: true });
        
        res.status(200).json({
            success: true,
            message: 'The post is updated!'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        })
        console.log(error)
    }
}

export const deletePost = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Tag Id');
    }
    try {
        await Post.findByIdAndRemove(req.params.id);
        res.status(200).json({ success: true, message: 'The post is deleted'})
    } catch (error) {
        res.status(400).json({ success: false, error: error})
    }
}

export const searchPost = async (req, res) => {
    try {
        const searchData = await Post.find(
            {
                "$or": [
                    { title: { $regex: req.params.key }},
                    { author: { $regex: req.params.key }},
                    
                ]
            }
        )
        res.send(searchData)
    } catch (error) {
        res.status(400).json({ success: false, error: error})
    }
}

//Like or Dislike a Post
export const likePost = async (req, res) => {
    try {
        const post = await Post.find({
            _id: req.params.id,
            likes: req.user.id,
        });
        if (post.length > 0) {
            return res.status(400).json({
                message: "You have already liked this post"
            });
        }
        
        const like = await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: { likes: req.user.id },
            },
            { new: true }
        );
        if (!like) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({message: "Post liked successfully"});
    } catch (error) {
        res.status(400).json(err)
    }
}

export const unlikePost = async (req, res) => {
    try {
        const post = await Post.find({
            _id: req.params.id,
            likes: req.user.id,
        });
        if (post.length === 0) {
            return res.status(400).json({
                message: "You have not liked this post"
            });
        }
        
        const unlike = await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: { likes: req.user.id },
            },
            { new: true }
        );
        if (!unlike) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({message: "Post unlike successfully"});
    } catch (error) {
        res.status(400).json(err)
    }
}

//get all post by author
export const getAllPostByAuthor = async (req, res) => {
    try {
        const post = await Post.findOne({
            author: req.params.id,
        })
        
        res.send(post);
    } catch (error) {
        return res.status(400).json(error)
    }
}