const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 8,
        maxLength: 20,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate(value) { if (!validator.isEmail(value)) throw new Error("invalid email try again") }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        match: /^(?=.*\d)(?=.*[a-zA-Z]).{6,200}$/
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
//role to dashboard
adminSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 15)
})

// login
adminSchema.statics.loginAdmin = async (email, password) => {
    const adminData = await adminModel.findOne({ email })
    if (!adminData) throw new Error("invalid email")
    const matchPassword = await bcrypt.compare(password, adminData.password)
    if (!matchPassword) throw new Error("invalid password")
    return adminData
}
//during login generate a token for each admin
adminSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT)
    this.tokens.push({ token })
    await this.save()
    return token
}
const adminModel = mongoose.model("Admins", adminSchema)

module.exports = adminModel