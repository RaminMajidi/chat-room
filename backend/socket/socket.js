import { Server } from "socket.io";
import http from "http";
import express from "express";



const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});

export const getReceiverScketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId:socketId}

io.on('connection', (socket) => {

    console.log("a user connected id :", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undifind") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('calling', (data) => {
        console.log("calling", data);

        const senderId = data.sender._id;
        const receiverId = data.receiver._id;
        const senderSocketId = getReceiverScketId(senderId);
        const receiverSocketId = getReceiverScketId(receiverId);

        if (!receiverSocketId) {
            io.to(senderSocketId).emit("calling", { error: "user offline" });
        } else {
            const test = { senderId, receiverId };
            const userCaller = data.sender;
            io.to(senderSocketId).emit("calling", test);
            io.to(receiverSocketId).emit("receivingCall", userCaller);
        }
    });

    socket.on("rejectCall", (data) => {
        console.log('rejectCall', data);
    });





    // socket.on("callUser", (data) => {
    //     console.log(data);
    //     io.to(data.userToCall)
    //         .emit("callUser", {
    //             signal: data.signalData,
    //             from: data.from, name: data.name
    //         })
    // });


    // socket.on() is used to listen to events. can be used both on client and server side
    socket.on('disconnect', () => {
        console.log('user disconnected id : ', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});



export { app, io, server }


