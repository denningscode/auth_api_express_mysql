const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const header = req.headers['authorization'];

    if (!header) {
        res.status(400).json({
            message: "Access denied"
        })
    } else {
        const token = header.split(' ')[1];

        JWT.verify(token, "shhh", (error, decoded) => {
            if (error) {
                res.status(500).json({
                    message: error.message
                })
            } else {
                req.user = decoded
            }
        })

        next();
    }

    

}