let mg = require('mongoose')

let PlayListSchema = new mg.Schema({
    id: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: String
    },
    songName: {
        required: true,
        type: String
    },
    artist: {
        required: true,
        type: String
    },
    poster: {
        required: true,
        type: String
    },
    index: {
        required: true,
        type: Number,
    }

})

module.exports = mg.model("song", PlayListSchema);