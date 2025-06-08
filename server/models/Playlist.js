let mg = require('mongoose')

let PlayListSchema = new mg.Schema({
    userid: {
        required: true,
        type: String
    },
    pname: {
        type: String
    },
    poster:{
        type:String
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