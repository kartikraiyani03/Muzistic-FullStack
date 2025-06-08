let mg = require('mongoose')

let PlayListSchema = new mg.Schema({
    userid: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    playlistArray:
        [
            {
                type: mg.Schema.Types.ObjectId,
                ref: "Song"
            }
        ]
})

module.exports = mg.model("playlist", PlayListSchema);