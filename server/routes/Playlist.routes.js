let express = require('express')
let router = express.Router();
let Playlist = require("../models/Playlist");
const { removeFromPlaylist, addToPlaylist, deletePlaylist, createPlaylist, getSongByUserPlaylistId, getAllPlaylistById, getPlaylistById } = require('../controllers/PlaylistController');

router.post("/createPlaylist",createPlaylist);
router.post("/deletePlaylist",deletePlaylist);
router.post("/addToPlaylist",addToPlaylist);
router.post("/removeFromPlaylist",removeFromPlaylist);
router.get("/getSongByUserPlaylistId",getSongByUserPlaylistId);
router.get("/getAllPlaylistById",getAllPlaylistById);
router.get("/getPlaylistById",getPlaylistById);

module.exports = router
