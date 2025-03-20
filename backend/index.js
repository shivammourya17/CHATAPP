const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./config/database");

dotenv.config();
const app = express();

// ✅ Ensure JSON middleware is declared before routes
app.use(express.json());

// ✅ Connect to the database before starting the server
connect();

const authRegister = require("./routes/authUser");
app.use("/api/user", authRegister);

// ✅ Test route
app.get("/", (req, res) => {
    res.send("Server is working");
});

// ✅ Use environment variable for PORT with a default fallback
const PORT = process.env.PORT || 3000;

// ✅ Start the server only after connecting to the database
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
