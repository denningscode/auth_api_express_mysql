const JWT = require("jsonwebtoken");


module.exports = (app, connection) => {

    app.post("/register", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.status(400).json({
                message: "Fields cannot be empty"
            })
        } else {
            connection.query(`SELECT * FROM users WHERE username = '${username}'`, (error, results) => {
                if (error) {
                    res.status(500).json({
                        message: "An error occured " + error
                    })
                } else {
                    if (results.length > 0) {
                        res.status(400).json({
                            message: "User already exists"
                        })
                    } else {
                        connection.query(`INSERT INTO users(username, password) VALUES ('${username}','${password}')`, (error, result) => {
                            if (error) {
                                res.status(500).json({
                                    message: "An error occured " + error
                                })
                            } else {
                                // create a token and send it as response
                                const token = JWT.sign({
                                    username: username,
                                    password: password
                                },  "shhh")
                                res.status(200).json({
                                    message: token
                                })
                            }
                        });
                    }
                }
            });
           
        }

        
    });
}