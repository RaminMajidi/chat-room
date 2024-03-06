// start imports ----->
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import corse from "cors"
import {app, server} from "./socket/socket.js"
// end imports <-----

// start variables ----->

const PORT = process.env.PORT || 5000;
// end variables <-----


// start use and config for app ----->
dotenv.config();
app.use(express.json()); // to prse the incoming requests with json payloads (from req.body)
app.use(cookieParser());
app.use(corse());
// end use and config for app <-----


// start use Routes for app ----->
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
// end use Routes for app <-----



// app.get('/', (req, res) => {
//     // root route http://localhost:5000
//     res.send("Hello Ramin!")
// });


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