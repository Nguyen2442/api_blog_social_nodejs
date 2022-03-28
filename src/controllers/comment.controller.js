import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import mongoose from 'mongoose';

// Get all comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        res.status(404).json(error);
    }
}

// Get comment by id
export const getCommentById = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Comment Id');
    }
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).send(comment);
    } catch (error) {
        res.status(404).json(error);
    }
}

// Create comment  
export const createComment = async (req, res) => {
    try {
        const { postId, content, reply, author} = req.body;
    

        const post = await Post.findById(postId);
        if (!post) { return res.status(400).json({ msg: "Post does not exist." }); }

        if (reply) {
            const cmt = await Comment.findById(reply);
            if (!cmt) {
                return res.status(400).json({ msg: "Comment does not exist." });
            }
        }

        const newComment = new Comment({
            content,
            reply,
            author,
            postId
        });


        await Post.findOneAndUpdate(
            { _id: postId },
            {
                $push: { comments: newComment._id },
            },
            { new: true }
        );

        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        await Comment.findOneAndUpdate(
            {
                _id: req.params.id,
                author: req.author._id
            },
            { content },
            { new: true }
        );

        res.status(200).json({ msg: "updated successfully." });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

//like comment
export const likeComment = async (req, res) => {
    try {
        const comment = await Comment.find({
            _id: req.params.id,
            likes: req.user.id,
        });

        if (comment.length > 0) {
            return res
                .status(400)
                .json({ msg: "You have already liked this post" });
        }

        await Comment.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: { likes: req.user.id },
            },
            { new: true }
        );

        res.json({ msg: "Comment liked successfully." });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

//unlike comment
export const unlikeComment = async (req, res) => {
    try {
        const comment = await Comment.find({
            _id: req.params.id,
            likes: req.user.id,
        });
        if (comment.length === 0) {
            return res
                .status(400)
                .json({ msg: "You have not liked this post" });
        }

        await Comment.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: { likes: req.user.id },
            },
            { new: true }
        );

        res.json({ msg: "Comment unliked successfully." });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

//delete comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id, user: req.user.id ,
        });

        await Post.findOneAndUpdate({ _id: comment.postId }, {
            $pull: { comments: req.params.id }
        });
        res.json({ message: "Comment deleted successfully." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
