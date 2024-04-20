import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genearteTokenAndSetCookie from "../utils/generateToken.js";
import { io } from "../socket/socket.js";

export const signup = async (req, res, next) => {


    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            const error = new Error()
            error.message = "Password dont match";
            error.statusCode = 400;
            throw error
        }

        const user = await User.findOne({ userName });
        if (user) {
            const error = new Error()
            error.message = "UserName already exists !";
            error.statusCode = 400;
            throw error
        }

        // Hash Password Heare
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // https://avatar.iran.liara.run/public
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        //create New User
        const newUser = new User({
            fullName,
            userName,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            const token = await genearteTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            io.emit('newUser',newUser);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
                token
            })
        } else {
            const error = new Error()
            error.message = "Invalid User Data !";
            error.statusCode = 400;
            throw error
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            const error = new Error();
            error.message = "Invalid UserName Or Password!"
            error.statusCode = 400
            throw error
        }


        const token = await genearteTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            token
        })

    } catch (error) {
        next(error)
    }
}


export const logout = (req, res, next) => {
    try {
        res.cookie('Jwt', '', { maxAge: 0 })
        res.status(200).json({ message: 'Logged Out Successfully' })
    } catch (error) {
        next(error)
    }
}