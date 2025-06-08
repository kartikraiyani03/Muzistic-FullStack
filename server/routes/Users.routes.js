const { registerUser, loginUser } = require('../controllers/UserController');
let User = require('../models/User')
let express = require('express')
let router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports = router
