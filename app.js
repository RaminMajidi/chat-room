const express = require("express")
const http = require("http")
const path = require("path")
const socketio = require("socket.io")
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const PORT = process.env.PORT || 3000;


io.on('connection', (stream) => {
    console.log('someone connected!');
});


app.use(express.static(path.join(__dirname, "public")))




app.listen(PORT, () => {
    console.log("listening on port : http://localhost:" + PORT);
})