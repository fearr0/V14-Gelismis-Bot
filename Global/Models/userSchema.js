const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    guildId: { type: String, required: true },
    previousNames: [
        {
            name: { type: String, required: true },
            registeredBy: { type: String, required: true },
            roles: { type: [String], default: [] },
            changeType: { type: String, required: true },
            date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
