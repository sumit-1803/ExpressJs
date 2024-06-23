const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:Duster%406573%23@harkirat-cluster.vsawhvh.mongodb.net/users")

const user = mongoose.model("Users", {
    username: String,
    password: String,
    name: String,
})

const user0 = new user({
    username:"Harkirat",
    password:"Duster@6573#",
    name:"Harkirat Singh"
})

user0.save().then(() => {
    console.log("User saved")
})