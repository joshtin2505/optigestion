import mongoose from "mongoose"

const pricesResponseSchema = mongoose.Schema({
    firstPrices:{
        type: Buffer,
        required: true
    },
    secondPrices:{
        type: Buffer,
        required: true
    },
    thirdPrices:{
        type: Buffer,
        required: true
    },
    comments:{
        type: String,
        default: "No comments yet"
    }
})

export default mongoose.model("pricesResponse", pricesResponseSchema)