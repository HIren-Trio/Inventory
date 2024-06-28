const { default: mongoose } = require("mongoose");

module.exports = {
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userType: { type: String, required: true, enum: ['User', 'Customer'] },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'userType' }
}