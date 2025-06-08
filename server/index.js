let express = require('express')
let mg = require('mongoose')
let cors = require('cors')
let db = require('./config/db.js')
let userRoute = require('./routes/Users.routes.js')
let playlistRoute = require('./routes/Playlist.routes.js')

require('dotenv').config();

db.connectDB();

let app = express();

app.use(express.json())
app.use(cors())

app.use('/user',userRoute)
app.use('/playlist',playlistRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} 🌐`);
})