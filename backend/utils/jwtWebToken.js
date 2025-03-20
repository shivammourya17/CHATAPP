const jwt = require("jsonwebtoken");

const jwtToken = (userId, res) => {
    const Token = jwt.sign(
        { userId },
        process.env.JWT_SECRET, 
        {
            expiresIn: "30d", 
        }
    );

    res.cookie("jwt", Token, {  // Cookie options properly structured
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        sameSite: "strict",
        secure: process.env.SECRET !== "development", // Fixed assignment
    });
};

module.exports = jwtToken;
