import mongoose from "mongoose";

const notifySchema = mongoose.Schema(
    {
        id: mongoose.Types.ObjectId,
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        recipients: [
            mongoose.Types.ObjectId
        ],
        url: String,
        content: String,
        image: String,
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);


const Notify = mongoose.model('Notify', notifySchema)
export default Notify;