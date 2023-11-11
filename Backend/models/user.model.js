import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userType: {
        type: Number,
        required: true,
        trim: true
    },
    departament: {
        type: String,
        required: true,
        trim: true
    },
    job: {
        type: String,
        required: true,
        trim: true
    },
    departamentId: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    id:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
})
export default mongoose.model("User", userSchema)