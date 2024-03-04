import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();


app.use(express.json()); // to prse the incoming requests with json payloads (from req.body)

app.use('/api/auth', authRoutes);



// app.get('/', (req, res) => {
//     // root route http://localhost:5000
//     res.send("Hello Ramin!")
// });


// middleware for set Error handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Error !';
    res.status(status).json({ message })
    next();
})
//*********************

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is runing on http://localhost:${PORT}`);
})