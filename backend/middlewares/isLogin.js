const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

exports.isLogin = async (req, res, next) => {
    try {
        // ✅ Extract token properly
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }
        
        // ✅ Find user & exclude password
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Attach user to request & proceed
        req.user = user;
        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};
