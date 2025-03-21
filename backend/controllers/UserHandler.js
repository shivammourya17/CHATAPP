const User = require("../models/UserSchema");
const Conversation = require("../models/ConversationSchema");// ✅ Import User model

exports.getUserBySearch = async (req, res) => {
    try {
        const search = req.query.search || "";
        const currentUserId = req.user._id;

        const users = await User.find({
            $and: [
                {
                    $or: [
                        { fullname: { $regex: search, $options: "i" } },
                        { username: { $regex: search, $options: "i" } }
                    ]
                },
                { _id: { $ne: currentUserId } } // Exclude current user
            ]
        }).select("-password -email"); // ✅ Excludes password and email

        res.status(200).json({ success: true, users });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};



exports.getCurrentChatters = async (req, res) => {
    try {
        const currentUserID = req.user._id;

        const currentChatters = await Conversation.find({
            participants: currentUserID
        }).sort({ updatedAt: -1 });

        if (!currentChatters || currentChatters.length === 0) 
            return res.status(200).send([]);

        const participantsIDS = currentChatters.reduce((ids, conversation) => {
            const otherParticipants = conversation.participants.filter(id => id.toString() !== currentUserID.toString());
            return [...ids, ...otherParticipants];
        }, []);

        const otherParticipantIDS = participantsIDS.filter(id => id.toString() !== currentUserID.toString());

        const users = await User.find({ _id: { $in: otherParticipantIDS } })
            .select("-password")
            .select("-email");

        const filteredUsers = otherParticipantIDS.map(id => 
            users.find(user => user._id.toString() === id.toString())
        );

        res.status(200).json(filteredUsers);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


