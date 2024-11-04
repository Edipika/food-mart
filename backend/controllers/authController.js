const jwt = require('jsonwebtoken');
const SECRET_KEY = "678&%*&%%$#@#4";
const Users = require('../models/users')
// const db = require('../models'); // Adjust the path if necessary
// const Users = db.user;


const Login = async (req, res) => {
    try {
        // const { username, password } = req.body;
        // console.log(username);
        console.log("Users Model:", Users);

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    Login
};
// const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
// const user = await Users.findOne({ where: { email:username } });
// console.log("Found user:", Users);

// if (!user || password !== user.password) {
//     return res.status(401).json({ message: "Invalid credentials" });
// }

// const token = jwt.sign(user, SECRET_KEY);

// res.json({ token });
// res.json("user")
// console.log(user);
// console.log("password");