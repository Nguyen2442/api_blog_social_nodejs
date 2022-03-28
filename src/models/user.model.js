import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    avatar: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    website: {
        type: String,
        default: '',
    },
    work: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    github_link: {
        type: String,
        default: '',
    },
    linkedin_link: {
        type: String,
        default: '',
    },
    facebook_link: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default : [],
    },
    followings: {
        type: Array,
        default: [],
    }
},
    { timestamps: true }
);

userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

userSchema.set("toJSON", {
    virtuals: true,
});

const User = mongoose.model('User', userSchema);
export default User;