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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, {
    Timestamp: true
})
//connect by plans and hotel using vendor name or id =>role to dashboard
vendorSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 15)
})
// login
vendorSchema.statics.loginVendor = async (email, password) => {
    const vendorData = await vendorModel.findOne({ email })
    if (!vendorData) throw new Error("invalid email")
    const matchPassword = await bcrypt.compare(password, vendorData.password)
    if (!matchPassword) throw new Error("invalid password")
    return vendorData
}
//during login generate a token for each vendor
vendorSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT)
    this.tokens.push({ token })
    await this.save()
    return token
}
//create virtual table between vendors and hotels
vendorSchema.virtual("myHotels", {
    ref: "Hotels",
    localField: "_id",
    foreignField: "vendorId"
})
const vendorModel = mongoose.model("Vendors", vendorSchema)
module.exports = vendorModel