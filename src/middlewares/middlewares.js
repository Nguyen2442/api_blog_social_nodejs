import { decode } from '../utils/jwt.js';
import { HTTP_STATUS_CODES } from '../utils/types.js';
import { ErrorResponse } from './error.js';
import pkg from 'lodash';

const { get } = pkg

const auth = async (req,res,next) => {
    const accessToken = get(req, 'headers.authorization', '').replace(
        /^Bearer\s/,
        ''
    );

    if (!accessToken) {
        return next(
        new ErrorResponse('No token provided', HTTP_STATUS_CODES.UNAUTHORIZED)
        );
    }

    const { decoded, expired, valid } = decode(accessToken);

    if (!valid && expired) {
        return next(
        new ErrorResponse('Token is expired', HTTP_STATUS_CODES.UNAUTHORIZED)
        );
    }

    if (decoded) {
        req.user = decoded;
        return next();
    }

    return next(
        new ErrorResponse('Not authenticated', HTTP_STATUS_CODES.UNAUTHORIZED)
    );
};

export default auth;