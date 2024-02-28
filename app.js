const express = require("express")
const http = require("http")
const path = require("path")
const socketio = require("socket.io")
const formatMessage = require('./utils/messgaeFormat')

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const PORT = process.env.PORT || 3000;
const chatBotName = "ربات چت چی"


io.on('connection', (socket) => {
    console.log('someone connected!');
    socket.emit('message',formatMessage(chatBotName,"کاربر فلان خوش آمدید"));
    socket.broadcast.emit('message', formatMessage(chatBotName,"کاربر فلان به چت اضافه شد "));

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(chatBotName,"کاربر فلان چت را ترک کرد"));
    });

    socket.on('chatMessage', (message) => {
        io.emit('message', formatMessage("کاربرفلان", message))
    })

});


app.use(express.static(path.join(__dirname, "public")))

server.listen(PORT, () => {
    console.log("listening on: http://localhost:" + PORT);
})