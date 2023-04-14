const mongoose = require("mongoose")
const roomSchema = mongoose.Schema({
    roomnumber: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    roomtype: {
        type: String,
        lowercase: true,
        required: true,
        enum: ["single", "double", "triple", "suite"]
    },
    details: {
        type: String,
        required: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000
    }
})
//connect by plans and hotel using vendor name or id 
const roomModel = mongoose.model("Rooms", roomSchema)
module.exports = roomModel