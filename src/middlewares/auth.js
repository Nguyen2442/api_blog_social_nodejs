import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        if (!token) {
            return res.status(400).json({
                errors: [
                    {
                        message: "Invalid Token",
                    }
                ]
            })
        }

        jwt.verify(token, process.env.secret, (error, user) => {
            if (error) {
                return res.status(400).json({
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
        return res.status(500).json({message: error.message})
    }
}