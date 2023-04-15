const handler = require("../helper")
const { verify } = require("jsonwebtoken")
const vendorModel = require("../../database/models/vendorsModel")
const vendorAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("bearer ", "")
        const decodeToken = verify(token, process.env.JWT)
        const vendorData = await vendorModel.findOne({
            _id: decodeToken._id,
            "tokens.token": token
        })
        if (!vendorData) throw new Error("un authorized")
        req.vendor = vendorData
        req.token = token
        next()

    } catch (e) {
        handler.responseHandler(res, 500, false, e.message, "unautherized")
    }
}
module.exports = vendorAuth
