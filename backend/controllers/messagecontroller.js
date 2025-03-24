const Conversation = require('../models/ConversationSchema'); // Ensure the correct path
const Message = require('../models/MessageSchema'); // Ensure the correct path
const { getReceiverSocketId } = require("../Socket/socket") // Ensure the correct path
  // Import socket instance
    
    const sendMessage = async (req, res) => {
        try {
           
            const { messages } = req.body;
            const { id: receiverId } = req.params;
            const senderId = req.user?._id;  // Use optional chaining to avoid errors

            
            let chats = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });
    
            if (!chats) {
                chats = await Conversation.create({
                    participants: [senderId, receiverId],
                });
            }
    
            const newMessages = new Message({
                senderId,
                receiverId,
                message: messages,
                conversationId: chats._id
            });
    
            if (newMessages) {
                chats.messages.push(newMessages._id);
            }
    
            await Promise.all([chats.save(), newMessages.save()]);
    
            // SOCKET.IO function 
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessages);
            }
    
            res.status(201).send(newMessages);
    
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message
            });
            console.log(`Error in sendMessage: ${error}`);
        }
    };
    
    const getMessages = async (req, res) => {
        try {
            const { id: receiverId } = req.params;
            const senderId = req.user._conditions?._id;
    
            const chats = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            }).populate("messages");
    
            if (!chats) return res.status(200).send([]);
    
            const message = chats.messages;
            res.status(200).send(message);
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message
            });
            console.log(`Error in getMessages: ${error}`);
        }
    };
    
    // ✅ Export using CommonJS
    module.exports = { sendMessage, getMessages };
    