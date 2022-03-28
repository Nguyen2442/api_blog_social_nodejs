import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];

        if (!token) {
            return res.status(403).json({
                errors: [
                    {
                        message: "You are not authorized",
                    }
                ]
            })
        }

        jwt.verify(token, process.env.secret, (error, user) => {
            if (error) {
                return res.status(401).json({
                    errors: [
                        {
                            message: "Invalid Authentication",
                        }
                    ]
                })
            }

            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({
                errors: [
                    {
                        message: "Access denied",
                    }
                ]
            })
        }
    })
}

export const verifyTokenAndAdminAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                errors: [
                    {
                        message: "Access denied Admin",
                    }
                ]
            })
        }
    })
}