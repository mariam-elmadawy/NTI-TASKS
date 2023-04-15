const mongoose = require("mongoose")
const roomSchema = mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Hotels"
    },
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
roomSchema.pre("findByIdAndDelete", async function () {
    await roomModel.remove({ hotelId: this._id })
})
//connect by hotel using vendor id 
const roomModel = mongoose.model("Rooms", roomSchema)
module.exports = roomModel