let mg = require('mongoose')

let UserSchema = new mg.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        require: true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    image:{
        type:String
    }
})

module.exports = mg.model("user",UserSchema); 