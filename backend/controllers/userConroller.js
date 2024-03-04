import User from "../models/userModel.js";


export const getUsersForSidbar = async (req, res, next) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find(
            { _id: { $ne: loggedInUserId } }
        ).select('-password');
        res.status(200).json(filteredUsers)




    } catch (error) {
        next(error)
    }
}