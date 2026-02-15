let mg = require('mongoose')

let LikeSchema = new mg.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    },
    likedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mg.model("like", LikeSchema); 