import User from "../models/user.model.js";

export const authAdmin = async (req, res, next) => {
    try {
        //get user information by id
        const user = await User.findOne({
            _id: req.user.id
        })

        
        if (!user.isAdmin) {
            return res.status(400).json({
                message: "Admin resources access denied!"
            })
        }

        next()
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}