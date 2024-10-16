// start imports ----->
import express from "express";
import path from 'path'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import corse from "cors"
import {app, server} from "./socket/socket.js"

import { PeerServer } from "peer";

const peerServer = PeerServer({ port: 9000, path: "/myapp" });




// end imports <-----

// start variables ----->
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
// end variables <-----


// start use and config for app ----->
dotenv.config();
app.use(express.json()); // to prse the incoming requests with json payloads (from req.body)
app.use(cookieParser());
app.use(corse());
app.use(express.static(path.join(__dirname,'/frontend/dist')))
// end use and config for app <-----


// start use Routes for app ----->
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
// end use Routes for app <-----



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
});


// middleware for set next() Error handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Error !';
    res.status(status).json({ message })
    next();
})
//*********************

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is runing on http://localhost:${PORT}`);
})