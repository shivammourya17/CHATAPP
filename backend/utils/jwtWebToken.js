const jwt = require("jsonwebtoken");

const jwtToken = (userId) => {
    const Token = jwt.sign(
        { userId },
        process.env.JWT_SECRET, 
        {
            expiresIn: "30d", 
        }
    );

   return Token;
};

module.exports = jwtToken;
