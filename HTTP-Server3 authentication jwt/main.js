const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import the cors package

const jwtPassword = "123456";

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const users  = [
    {
        username: "victim",
        password: "1212victim",
        name: "Victor"
    },
    {
        username: "harry1212",
        password: "1212harry",
        name: "Harish"
    },
    {
        username: "john1212",
        password: "1212john",
        name: "Jatin"
    }
];

function userExists(username, password){
    return users.some(user => user.username === username && user.password === password);
}

app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    if (!userExists(username, password)) {
        return res.status(403).json({
            message: "User does not exist in our memoryBase"
        });
    }

    const token = jwt.sign({ username }, jwtPassword);
    return res.json({ token });
});

app.get("/users", (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;

        const otherUsers = users.filter(user => user.username !== username);
        res.json({ users: otherUsers });
    } catch (err) {
        res.status(403).json({
            message: "Invalid token",
        });
    }
});

app.get("/", (req, res) => {
    res.send("<center>Hello World</center>");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
