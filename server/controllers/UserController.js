let User = require('../models/User')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
require('dotenv').config();


exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        let exist = await User.findOne({ email })
        if (exist) {
            return res.status(400).json({
                message: "User Already exist",
                success: false
            })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let firstName = name.split(" ")[0];
        let lastName = name.split(" ")[1];
        console.log(firstName, lastName)
        let user = await User.create({ name, email, password: hashPassword, image: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(firstName + " " + lastName)}`})
        
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        
        res.status(200).json({
            message: "User Registered Successfully",
            success: true,
            token: token,
            redirect: "/account",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Error in Registration",
            success: false,
            error: err.message
        })
    }
}

exports.loginUser = async (req, res) => {
    debugger
    try {
        let { email, password } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        let check = await bcrypt.compare(password, user.password)

        if (!check) {
            return res.status(400).json({
                message: "Invalid password",
                success: false
            });
        }

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.status(200).json({
            message: "Login User successfully",
            success: true,
            token: token,
            redirect: "/account",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in Login",
            success: false,
            error: err.message
        })
    }
}