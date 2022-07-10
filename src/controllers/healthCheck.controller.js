import mongoose from 'mongoose';


export const healthCheck = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Server is running!'
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

export const healthCheckAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Authenticated!'
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}