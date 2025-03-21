const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); 
const { connect } = require("./config/database");
const { isLogin } = require("./middlewares/isLogin"); // ✅ Import middleware

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());  
app.use(cookieParser());  

// ✅ Connect to MongoDB
connect();

// ✅ Import Routes
const authRegister = require("./routes/authUser");
const messageRouter = require("./routes/messageRoute");
const userRouter= require("./routes/userRoute")

// ✅ Use Routes
app.use("/api/user", authRegister);
app.use("/api/message", isLogin, messageRouter);
app.use("/api/user",isLogin,userRouter) // 🔒 Protect message routes

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Server is working");
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
