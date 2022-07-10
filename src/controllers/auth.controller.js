import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const emailExisted = await User.findOne({ email: req.body.email })
    if (emailExisted) return res.status(400).json({
        success: false,
        message: "The email already exists!"
    })

    const salt = bcrypt.genSaltSync(10);
    const password = await req.body.password;

    let NewUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)
    });
    try {
        const user = await NewUser.save();
        res.status(201).json({
            success: true,
            message: 'The user is registered!',
        })
    } catch (error) {
        res.status(400).send("The user cannot be register")
        console.log(error)
    }
}


let refreshTokens = [];

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message:"Invalid Email"
            })
        }
        const secret = process.env.secret;
        const password = req.body.password
        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass) {
            return res.status(400).json({ success: false, message: "Invalid Password" })
        }

        if (user && validPass) {
            const accessToken = createAccessToken({id: user._id, isAdmin: user.isAdmin});
            const refreshToken = createRefreshToken({ id: user._id, isAdmin: user.isAdmin });

            refreshTokens.push(refreshToken);
            
            res.status(200).send({ user: user.email, access_token: accessToken, refresh_token: refreshToken })
        } else {
            return res.status(400).send('Password is wrong!')
        }
    } catch (error) {
        res.status(404).send("The user not found").json({ error: error })
    }
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.header("x-auth-token");

        if (!refreshToken) {
            return res.status(401).json({
                errors: [
                    {
                        message: "Token not found!",
                    }
                ]
            });
        }

        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json({
                errors: [
                    {
                        message: "Invalid refresh token",
                    }
                ]
            })
        }
    try {
        const secret = process.env.secret
        const refresh_token_secret = process.env.secret
        
        const user = jwt.verify(
            refreshToken,
            refresh_token_secret
        );
        
        const accessToken = createAccessToken({ id: user._id, isAdmin: user.isAdmin });
        const refreshToken = createRefreshToken({ id: user._id, isAdmin: user.isAdmin });

        refreshTokens.push(refreshToken);
        res.status(200).json({access_token: accessToken, refresh_token: refreshToken})
    } catch (error) {
        return res.status(403).json({
            errors: [
                {
                    message: "Invalid refresh token",
                }
            ]
        })
    }
}

export const logout = (req, res) => {
    const refreshToken = req.header("x-auth-token");
    refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken); 
    return res.status(200);
}

export const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        if (!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        const isOldPasswordMatching = await user.comparePassword(req.body.old_password);

        if (!isOldPasswordMatching) {
            return res.status(401).json({
                success: false,
                message: "Wrong old password"
            })
        }

        user.password = req.body.new_password
        await user.save();

        return res.status(200).send({
            success: true,
            message: "Change password successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        });
    }
    

}

const createAccessToken = (payload) => {
    return jwt.sign(payload , process.env.secret, { expiresIn: "1d" });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload , process.env.secret, { expiresIn: "7d" });
}