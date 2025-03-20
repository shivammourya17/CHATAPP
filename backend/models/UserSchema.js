const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    username: {
      type: String,
      required: true,
      unique: true,
    
    },
    email: {
      type: String,
      required: true,
      unique: true,
    
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "", // ✅ Default set to an empty string
    },
  },
  { timestamps: true } // ✅ Schema options moved correctly
);



module.exports = mongoose.model("User", UserSchema);
