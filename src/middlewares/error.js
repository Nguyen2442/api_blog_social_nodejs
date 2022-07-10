import { HTTP_STATUS_CODES } from "../utils/types.js";

export class ErrorResponse extends Error {
    statusCode;

    constructor(message , statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const handleError = (err, req, res, next) =>{
    let error = { ...err };
    error.message = err.message;

    if(err.name === 'CastError'){
        error = new ErrorResponse(
            'Resource not found',
            HTTP_STATUS_CODES.NOT_FOUND
        );
    }

    res.status(error.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: error.message || 'Internal Server Error',
    })
}

export default handleError;