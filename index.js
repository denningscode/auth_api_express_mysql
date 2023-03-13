const express = require("express");
const mysql = require("mysql");


//routes 
const register = require("./routes/auth/register");
const login = require('./routes/auth/login');
const user = require('./routes/user/getUser');

const app = express();
app.use(express.json());


const connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "auth_api"
});
   
connection.connect((error) => {
    if (error) {
        console.log("An error occured " + error)
    } else {
        console.log("Connected to database")
    }
});



register(app, connection);
login(app, connection);
user(app);



app.listen(3000, () => console.log("Server running"));