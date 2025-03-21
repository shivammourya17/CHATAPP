const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,  
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true
    },
    conversationId: {  // ✅ Added missing colon
      type: mongoose.Schema.Types.ObjectId,  
      ref: "Conversation" ,
      defaukt:[]
    }
  },
  { timestamps: true } // ✅ Removed extra '/'
);

module.exports = mongoose.model("Message", MessageSchema);
