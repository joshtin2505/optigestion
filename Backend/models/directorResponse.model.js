import mongoose from "mongoose"

const dirctorResponseSchema = new mongoose.Schema({
    rectorComment:{
        type: String,
        required: true
    },
    isApproved: { 
        type: Boolean,
        required: true
    }
})

export default mongoose.model("DirectorResponse", dirctorResponseSchema)