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
    /* io.emit() is used to send events to all the connected clients. */
    /* socket.on() is used to listen to events.
    can be used both on client and server side */

    console.log("a user connected id :", socket.id);


    // ساخت آیدی کاربر و افزودن به لیست کاربران آنلاین
    const userId = socket.handshake.query.userId;
    if (userId != "undifind") userSocketMap[userId] = socket.id;
    // ***


    // ارسال لیست کاربران آنلاین
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    // ***


    // گوش کردن به رویداد ارسال تماس
    socket.on('sendCalling', (data) => {
        const { receiverId, userCaller } = data;
        const receiverSocketId = getReceiverScketId(receiverId);
        // ارسال اعلان تماس برای دریافت کننده تماس در صورت آنلاین بودن
        receiverSocketId &&
            io.to(receiverSocketId)
                .emit("receivingCall", userCaller);
        // *
    });
    // ***


    // گوش کردن به رویداد لغو تماس از طرف تماس گیرنده
    socket.on("cancelCall", (data) => {
        const { receverId } = data;
        const receiverSocketId = getReceiverScketId(receverId);
        // ارسال رویداد لغو تماس برای دریافت کننده تماس در صورت آنلاین بودن
        receiverSocketId && io.to(receiverSocketId).emit("cancelCall");
        // *
    });
    // ***


    // گوش دادن به رویداد رد تماس از طرف دریافت کننده
    socket.on("rejectCall", (data) => {
        const { senderId, receverId } = data;
        const senderSocketId = getReceiverScketId(senderId);
        // ارسال رویداد رد تماس برای تماس گیرنده در صورت آنلاین بودن
        senderSocketId && io.to(senderSocketId).emit("rejectCall");
        // *
    });
    // ***


    // گوش کردن به رویداد قبول کردن تماس ورودی
    socket.on("answerIncomingCall", (data) => {
        const { senderId } = data;
        const senderSocketId = getReceiverScketId(senderId);
        // ارسال رویداد قبول شدن تماس به تماس گیرنده
        senderSocketId && io.to(senderSocketId).emit("answerCall", data);
        // *
    });
    // ***

    socket.on("callWasMade", (data) => {
        const { peerId, senderId } = data;
        const senderSocketId = getReceiverScketId(senderId);
        senderSocketId && io.to(senderSocketId).emit("callWasMade", peerId);
    })


    socket.on("callEnd", (data) => {
        const { receverId } = data;
        const receverSocketId = getReceiverScketId(receverId);
        // ارسال رویداد قبول شدن تماس به تماس گیرنده
        receverSocketId && io.to(receverSocketId).emit("callEnd");
        // *
    });


    socket.on('disconnect', () => {
        console.log('user disconnected id : ', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});



export { app, io, server }


