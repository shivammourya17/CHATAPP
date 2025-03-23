const Message = require("../models/MessageSchema");
const Conversation = require("../models/ConversationSchema");
const {getReceiverSocketId} = require("../socket/socket");


exports.sendMessage = async (req, res) => {
    try {
        // ✅ Extract data properly
        const { message } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user?._id; // Ensure senderId is valid

        // ✅ Validate required fields
        if (!message || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "Message content and receiver ID are required.",
            });
        }

        // ✅ Find or create conversation
        let chats = await Conversation.findOne({
            participants: { $all: [receiverId, senderId] }
        });

        if (!chats) {
            chats = new Conversation({ participants: [receiverId, senderId] });
            await chats.save();
        }

        // ✅ Create new message
        const newMessage = new Message({
            receiverId,
            senderId,
            message,
            conversationId: chats._id
        });

        // ✅ Push message into conversation
        chats.messages.push(newMessage._id);

        // ✅ Save both conversation and message
        await Promise.all([chats.save(), newMessage.save()]);

           //SOCKET.IO function 
               const receiverSocketId = getReceiverSocketId(receiverId);
                if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage",newMessage)
     }

        // ✅ Send response
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


exports.getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user?._id; // Ensure senderId is valid

        // ✅ Find the conversation between sender and receiver
        const chats = await Conversation.findOne({
            participants: { $all: [receiverId, senderId] }
        }).populate("messages"); // ✅ Corrected `.populate("messages")`

        if (!chats) {
            return res.status(202).json({ success: false, message: "No conversation found", messages: [] });
        }

        // ✅ Send messages from the conversation
        res.status(200).json({ success: true, messages: chats.messages });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

