import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genearteTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res, next) => {

    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            const error = new Error()
            error.message = "Password dont match";
            error.status = 400;
            throw error
        }

        const user = await User.findOne({ userName });
        if (user) {
            const error = new Error()
            error.message = "UserName already exists !";
            error.status = 400;
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
            await genearteTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        } else {
            const error = new Error()
            error.message = "Invalid User Data !";
            error.status = 400;
            throw error
        }

    } catch (error) {
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
            error.status = 400
            throw error
        }


        genearteTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
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