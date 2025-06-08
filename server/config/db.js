let mg = require('mongoose')

exports.connectDB = () => {
    mg.connect("mongodb+srv://raiyanikartik43:Eu36osb5LFSt8heH@cluster0.dhtalp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("Connected to MongoDB successfully!🍀"))
        .catch((err) => console.log("Failed to connect to MongoDB", err))
} 