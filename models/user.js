import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    isBlocked: {
        type: Boolean,
        default: false,
    },

    type: {
        type: String,
        default: "customer",
    },

    profilePicture: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.lsaqXiF1qoA0lNGxssv4dQHaFy?w=201&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    }
})

const User = mongoose.model("users", userSchema)

export default User;