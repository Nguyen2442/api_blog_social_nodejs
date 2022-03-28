import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default:""
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            }
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments: [
            {
                type: mongoose.Types.ObjectId,
                ref: "comment",
            },
        ],
    },
    {timestamps: true}
);

postSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

postSchema.set("toJSON", {
    virtuals: true,
});

const Post = mongoose.model('Post', postSchema)
export default Post