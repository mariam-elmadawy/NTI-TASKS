const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const vendorSchema = mongoose.Schema({
    companyname: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) { if (!validator.isEmail(value)) throw new Error("invalid email,try again") }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        match: /^(?=.*\d)(?=.*[a-zA-Z]).{6,200}$/
    }
}, {
    Timestamp: true
})
//connect by plans and hotel using vendor name or id =>role to dashboard
vendorSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 15)
})
const vendorsModel = mongoose.model("Vendors", vendorSchema)
module.exports = vendorsModel