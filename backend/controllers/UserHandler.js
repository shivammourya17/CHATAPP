const User = require("../models/UserSchema");
const Conversation = require("../models/ConversationSchema"); // ✅ Import User model

const getUserBySearch = async (req, res) => {
    try {
        const search = req.query.search || "";
        const currentUserID = req.user.id; // ✅ FIXED: Use req.user.id directly

        const user = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: ".*" + search + ".*", $options: "i" } },
                        { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
                    ],
                },
                { _id: { $ne: currentUserID } },
            ],
        })
            .select("-password -email") // ✅ FIXED: Exclude password & email
            .select("username fullname"); // ✅ Ensure required fields are included

        res.status(200).send(user);
    } catch (error) {
        console.error("Error in getUserBySearch:", error);
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

const getCurrentChatters = async (req, res) => {
    try {
        const currentUserID = req.user.id; // ✅ FIXED: Use req.user.id directly

        const currenTChatters = await Conversation.find({
            participants: currentUserID,
        }).sort({ updatedAt: -1 });

        if (!currenTChatters || currenTChatters.length === 0) return res.status(200).send([]);

        const participantsIDS = currenTChatters.reduce((ids, conversation) => {
            const otherParticipants = conversation.participants.filter((id) => id.toString() !== currentUserID.toString());
            return [...ids, ...otherParticipants];
        }, []);

        const uniqueParticipantIDs = [...new Set(participantsIDS)]; // ✅ FIXED: Remove duplicates

        const users = await User.find({ _id: { $in: uniqueParticipantIDs } }).select("username fullname");

        res.status(200).send(users);
    } catch (error) {
        console.error("Error in getCurrentChatters:", error);
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

// ✅ Export functions using CommonJS
module.exports = { getUserBySearch, getCurrentChatters };
