const mongoose = require("mongoose")

const reservationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Rooms"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, { Timestamp: true })

const reservationModel = mongoose.model("Reservations", reservationSchema)
module.exports = reservationModel