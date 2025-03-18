const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
    res.send("Server is working");
});

const PORT = process.env.PORT || 3000;


//connect to the database
const {connect} = require("./config/database");
connect();

app.listen(PORT, () => {
    console.log(`Working at port ${PORT}`);
});
