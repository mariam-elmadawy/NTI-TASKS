const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
    fullname: {
        type: String,
        required: true,
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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},
    { Timestamp: true }
)
userSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 15)
})
userSchema.methods.toJSON = function () {
    const data = this.toObject()
    delete data.__v
    delete data.password
    delete data.tokens
    return data
}
// login
userSchema.statics.loginUser = async (email, password) => {
    const userData = await userModel.findOne({ email })
    if (!userData) throw new Error("invalid email")
    const matchPassword = await bcrypt.compare(password, userData.password)
    if (!matchPassword) throw new Error("invalid password")
    return userData
}
//during login generate a token for each admin
userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT)
    this.tokens.push({ token })
    await this.save()
    return token
}
const userModel = mongoose.model("Users", userSchema)
module.exports = userModel