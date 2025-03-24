const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const jwtToken = require("../utils/jwtWebToken");


exports.UserRegister = async (req, res) => {
    try {
        const { fullname, username, email, gender, password ,profilePic} = req.body;

        // ✅ Check if all fields are provided
        if (!fullname || !username || !email || !gender || !password ) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Ensure username is not null or empty
        if (!username.trim()) {
            return res.status(400).json({ success: false, message: "Username cannot be empty" });
        }

        // ✅ Check for existing username/email
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }

        // ✅ Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
        // Default profile pictures
        const profileBoy = profilePic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = profilePic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? profileBoy : profileGirl
        });

        // Save user
        await newUser.save();
        
        // Generate JWT Token
        jwtToken(newUser._id, res);

        // Send success response
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            gender: newUser.gender,
            profilePic: newUser.profilePic
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};


exports.UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });

        // Fixing incorrect error message
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        // Fixing incorrect password comparison
        const isPasswordCorrect = bcrypt.compareSync(password, user.password || "");

        if (!isPasswordCorrect) {
            return res.status(404).json({
                success: false, 
                message: "Email and password do not match" 
            });
        }

        // Generate JWT Token
       const Tokenn= jwtToken(user._id); 
       res.cookie("accessToken",Tokenn,{
        httpOnly:true,
        secure:false
            
       })
       
 
        // // Send success response
        res.status(200).json({
            success: true,
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePic
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};

exports.UserLogout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true // Ensure the cookie is only accessible via HTTP
        });

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};
