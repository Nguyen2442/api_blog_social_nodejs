import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

export const authJwt = () => {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            // { url: /\api\/user\/unfollow\/(.*)/, methods: ['PUT'] },
            // { url: /\api\/user\/follow\/(.*)/, methods: ['PUT'] },
            { url: /\api\/user(.*)/, methods: ['GET','OPTIONS'] },
            { url: /\api\/category(.*)/, methods: ['GET','OPTIONS'] },
            { url: /\api\/tag(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\api\/post(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\api\/comment(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/user/register`,
            `${api}/user/login`,
            `${api}/user/refreshToken`,
            `${api}/upload`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }
    done();
}

export const sign = (object, options) => {
    return jwt.sign(object, process.env.secret, options)
}

export const decode = (token) => {
    try{
        const decoded = jwt.verify(token, process.env.secret);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }catch(error){
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null,
        }
    }
}