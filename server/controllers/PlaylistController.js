let Playlist = require('../models/Playlist')


exports.getAllPlaylistById = async (req, res) => {
    try {

        let { userid } = req.query
        let playlists = await Playlist.find({ userid })

        return res.status(200).json({
            message: "Playlist Fetched Successfully",
            data: playlists
        })
    }
    catch (err) {
        console.log(e.message)
        res.status(500).json({
            message: "Internal server",
            err: e.message
        })
    }
}

exports.createPlaylist = async (req, res) => {
    try {

        console.log(req.body)
        let { userid, pname, arr } = req.body

        //let exist = await Playlist.find({ name })
        //
        //if (exist) {
        //    return res.status(409).json({
        //        message: "Playlist alredy exist"
        //    })
        //}

        let playlist = await Playlist.create({ userid, pname, arr, poster: `https://api.dicebear.com/5.x/initials/svg?seed=${pname}` })

        res.status(200).json({
            message: "Playlist cretaed succeassfully",
            data: playlist
        })

    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({
            message: "Internal server",
            err: e.message
        })

    }
}

exports.deletePlaylist = async (req, res) => {
    try {
        console.log(req.body)
        const { playlistId } = req.body;

        const deleted = await Playlist.findByIdAndDelete(playlistId);

        if (!deleted) {
            return res.status(404).json({
                message: "Playlist not found"
            });
        }               

        res.status(200).json({
            message: "Playlist deleted successfully",
            data: deleted
        });

    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "Internal server error",
            err: e.message
        });
    }
};


exports.addToPlaylist = async (req, res) => {
    try {
        let { userid, song } = req.body

        let playlist = await Playlist.findByIdAndUpdate(userid, { $push: { playlistArray: song } }, { new: true })

        res.status(200).json({
            message: "Song added to playlist",
            playlist: updatedPlaylist
        });


    }
    catch (err) {
        console.log(e.message)
        res.status(500).json({
            message: "Internal server",
            err: e.message
        })
    }
}

exports.removeFromPlaylist = async (req, res) => {
    try {
        const { userid, song } = req.body;

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            userid,
            {
                $pull: { songs: song }
            },
            { new: true }
        );

        res.status(200).json({
            message: "Song removed from playlist",
            playlist: updatedPlaylist
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "Internal server error",
            err: e.message
        });
    }
};


exports.getSongByUserPlaylistId = async (req, res) => {
    try {
        let { playlist } = req.query
        let songs = await Playlist.find({ playlist })

        return res.status(200).json({
            message: "Fetch successfully",
            data: songs
        })
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "Internal server error",
            err: e.message
        });
    }
}

exports.getPlaylistById = async (req, res) => {
    try {
        let { playlistId } = req.body

        let playlist = await Playlist.find({ playlistId })

        return res.status(200).json({
            message: "Playlist fetch successfully",
            data: playlist
        })
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "Internal server error",
            err: e.message
        });
    }

}