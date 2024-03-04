import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        require: true,
        enum: ['male', 'famale']
    },
    profilePic: {
        type: String,
        default: ''
    },
},
    {
        timestamps: true // createdAt,updateAt 
    }
);



const User = mongoose.model('User', userSchema)
export default User;


