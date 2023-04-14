const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 8,
        maxLength: 20,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
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
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        validate(value) { if (!validator.isMobilePhone(value, "ar-EG")) throw new Error("invalid mobile phone,try again") }
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female"]
    }
},
    { Timestamp: true }
)
userSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 15)
})
const userModel = mongoose.model("Users", userSchema)
module.exports = userModel