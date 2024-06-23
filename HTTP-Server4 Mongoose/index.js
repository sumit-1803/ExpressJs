const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require('cors');
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://admin:Duster%406573%23@harkirat-cluster.vsawhvh.mongodb.net/users",
).then(()=>{
    alert("Connected to database")
});

const User = mongoose.model("users", {
  name: String,
  username: String,
  password: String,
});

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5500', // Allow requests from this origin
  credentials: true, // Allow cookies and authorization headers
};
app.use(cors(corsOptions));

// Define the userExists function to check if user already exists

app.post("/signin", async function (req, res) {
  const { username, password, name } = req.body;

  // Check if user already exists
  const userAlreadyExists = await userExists(username);
  if (userAlreadyExists) {
    return res.status(403).json({
      msg: "User already exists in our database",
    });
  }

  // Create new user
  const newUser = new User({
    username,
    password, // Remember to hash this password before saving
    name,
  });

  // Save new user to database
  newUser.save()
    .then(() => {
      alert("User saved successfully");
      var token = jwt.sign({ username: username }, jwtPassword);
      return res.json({ token });
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      return res.status(500).json({ msg: "Failed to save user" });
    });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    // Fetch all users except the authenticated user
    User.find({ username: { $ne: username } })
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        res.status(500).json({ msg: "Failed to fetch users" });
      });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.get("/", (req, res) => res.send("<center>Hello World</center>"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

async function userExists(username) {
  try {
    const existingUser = await User.findOne({ username });
    return !!existingUser; // Return true if user exists, otherwise false
    alert("userExistingfunction" + existingUser)
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}
