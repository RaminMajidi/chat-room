const express = require("express")
const http = require("http")
const path = require("path")
const socketio = require("socket.io")
const formatMessage = require('./utils/messgaeFormat')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./services/userService")

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const PORT = process.env.PORT || 3000;
const chatBotName = "ربات چت چی"


io.on('connection', (socket) => {

    socket.on('joinRoom', ({ userName, room }) => {
        const user = userJoin(socket.id, userName, room);
        socket.join(user.room)

        socket.emit('message',
            formatMessage(chatBotName, `${user.userName} خوش آمدید`)
        );

        socket.broadcast.to(user.room).emit('message',
            formatMessage(chatBotName, `${user.userName} به چت اضافه شد `)
        );

        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            if (user) {
                io.to(user.room).emit('message',
                    formatMessage(chatBotName, `${user.userName} چت را ترک کرد`)
                );
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                })
            }
        });

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    });

    socket.on('chatMessage', (message) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.userName, message))
    })

});


app.use(express.static(path.join(__dirname, "public")))

server.listen(PORT, () => {
    console.log("listening on: http://localhost:" + PORT);
})