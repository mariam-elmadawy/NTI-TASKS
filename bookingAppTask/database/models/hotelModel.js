const mongoose = require("mongoose")
const hotelSchema = mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vendors"
    },
    hotelname: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 20,
        maxLength: 100
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        lowercase: true
    },
    images: { type: String },
    rate: {
        type: Number,
        min: 0,
        max: 10
    }
})

hotelSchema.pre("findByIdAndDelete", async function () {
    await hotelModel.remove({ vendorId: this._id })
})
//create virtual table between rooms and hotels
hotelSchema.virtual("myRooms", {
    ref: "Rooms",
    localField: "_id",
    foreignField: "hotelId"
})
//connect by vendor using vemdors id
const hotelModel = mongoose.model("Hotels", hotelSchema)
module.exports = hotelModel