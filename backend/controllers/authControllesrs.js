import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genearteTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res, next) => {

    try {
        const { fullName, phoneNumber, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            const error = new Error()
            error.message = "Password dont match";
            error.statusCode = 400;
            throw error
        }

        const user = await User.findOne({ phoneNumber });
        if (user) {
            const error = new Error()
            error.message = "phoneNumber already exists !";
            error.statusCode = 400;
            throw error
        }

        // Hash Password Heare
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // https://avatar.iran.liara.run/public
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?phoneNumber=${fullName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?phoneNumber=${fullName}`;

        //create New User
        const newUser = new User({
            fullName,
            phoneNumber,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            const token = await genearteTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                phoneNumber: newUser.phoneNumber,
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
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            const error = new Error();
            error.message = "Invalid phoneNumber Or Password!"
            error.statusCode = 400
            throw error
        }


        const token = await genearteTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
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