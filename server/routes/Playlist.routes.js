let express = require('express')
let router = express.Router();
let Playlist = require("../models/Playlist");
const { removeFromPlaylist, addToPlaylist, deletePlaylist, createPlaylist } = require('../controllers/PlaylistController');

router.post("/createPlaylist",createPlaylist);
router.post("/deletePlaylist",deletePlaylist);
router.post("/addToPlaylist",addToPlaylist);
router.post("/removeFromPlaylist",removeFromPlaylist);

module.exports = router
