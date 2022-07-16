
export const healthCheck = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Server is running!'
        });
    } catch (error) {
        res.status(400).json(error)
    }
}

export const healthCheckAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Authorized'
        });
    } catch (error) {
        res.status(400).json(error)
    }
}


