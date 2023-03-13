const JWT = require('jsonwebtoken');

module.exports = (app, connection) => {
    app.post("/login", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.status(400).json({
                message: "Fields should not be empty"
            })
        } else {
            connection.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (error, result) => {
                if (error) {
                    res.status(500).json({
                        message: "An error has occured " + error
                    })
                } else {
                    if (result.length < 1) {
                        res.status(400).json({
                            message: "No such user"
                        })
                    } else {
                        // create token and store user information
                    
                        const token = JWT.sign({
                            username: result[0].username,
                            password: result[0].password
                        }, "shhh")
                        res.status(200).json({
                            message: token
                        });
                    }
                }
            });
        }
    });
}