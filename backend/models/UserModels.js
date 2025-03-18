const mongoose = required("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
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
      enum: ["male", "female", "other"], // Added 'other' for inclusivity
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilepic: {
      type: String,
      default: "", // Default profile picture URL can be set here
    },
  },
  { timestamps: true } // ✅ Moved inside schema options
);

module.exports = mongoose.model("User", UserSchema);
