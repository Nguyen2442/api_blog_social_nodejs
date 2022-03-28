import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).json({
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
        const user = await NewUser.save({});
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
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin
                },
                secret,
                { expiresIn: "1d" }
            );
            
            const refreshToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin
                },
                secret,
                { expiresIn: "7d" }
            );
            refreshTokens.push(refreshToken);
            
            res.status(200).send({ user: user.email, accessToken: accessToken, refreshToken: refreshToken })
        } else {
            return res.status(400).send('Password is wrong!')
        }
    } catch (error) {
        res.status(400).send("The user not found").json({ error: error })
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
        const { email } = user;
        const accessToken = jwt.sign(
            { email },
            secret,
            { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
            { email },
            secret,
            { expiresIn: "7d" }
        );
        refreshTokens.push(refreshToken);
        res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
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

export const logout = async (req, res) => {
    const refreshToken = req.header("x-auth-token");
    refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken); 
    res.status(200);
}