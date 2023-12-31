import mongoose from "mongoose"

const reqSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    state:{
        type: Number,
        default: 1,
    },
    employeeId:{
        type: Number,
        required: true
    },
    employeeFullName:{
        type: String,
        required: true
    },
    departamentId:{
        type: Number,
        required: true
    },
    operativeComments:{
        type: String,
        trim: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    // rector
    rectorComment:{
        type: String,
        default: "No comment  yet"
    },
    // logistic
    firstPrices:{
        type: Buffer
    },
    firstPricesName:{
        type: String
    },
    secondPrices:{
        type: Buffer
    },
    secondPricesName:{
        type: String
    },
    thirdPrices:{
        type: Buffer
    },
    thirdPricesName:{
        type: String
    },
    toBuyComments:{
        type: String,
        default: "No comments yet"
    },
    choice:{
        type: Number
    }
})
export default mongoose.model("Request", reqSchema)