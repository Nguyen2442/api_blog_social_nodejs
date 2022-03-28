import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        reply: mongoose.Types.ObjectId,
        likes: [
            { type: mongoose.Types.ObjectId, ref: "User" }
        ],
        author: { type: mongoose.Types.ObjectId, ref: "User" },
        postId: { type: mongoose.Types.ObjectId, ref: "Post" },
    },
    {
        timestamps: true,
    }
);

commentSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

commentSchema.set("toJSON", {
    virtuals: true,
});

const Comment = mongoose.model('Comment', commentSchema)
export default Comment;