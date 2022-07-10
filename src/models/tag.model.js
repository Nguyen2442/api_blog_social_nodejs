import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},
    {timestamps:true}
)

tagSchema.virtual("id").get(function () {
    return this._id.toHexString();
})

tagSchema.set("toJSON", {
    virtuals: true,
});

const Tag = mongoose.model('Tag', tagSchema)
export default Tag
