const verify = require("../middleware/verify");

module.exports = (app) => {
    app.get("/user", verify, (req, res) => {
        res.status(200).json({
            message: req.user
        })
    });
}