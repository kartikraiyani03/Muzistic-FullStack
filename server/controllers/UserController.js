let User = require('../models/User')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
require('dotenv').config();


exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        let exist = await User.findOne({ email })
        if (exist) {
            res.status(400).json({
                messgae: "User Already exist"
            })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let firstName = name.split(" ")[0];
        let lastName = name.split(" ")[1];
        console.log(firstName)
        console.log(lastName)
        let user = await User.create({ name, email, password: hashPassword, image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}` })
        res.status(200).json({
            message: "User Registered Successfully",
            data: user
        })

    }
    catch (err) {
        console.log("Error in Registration ", err.message)
        res.status(500).json({
            message: "Error in Registration",
            error: err.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body

        let user = await User.find({ email })
        console.log(user)

        let check = await bcrypt.compare(password, user[0].password)

        if (!check) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        let token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, { expiresIn: "1h" })


        res.status(200).json({
            message: "Login User successfully",
            toke: token,
            data: user
        })
    }
    catch (err) {
        console.log("Error in Login ", err.message)
        res.status(500).json({
            message: "Error in Login",
            error: err.message
        })
    }
}