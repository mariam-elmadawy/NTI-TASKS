const handler = require("../helper")
const { verify } = require("jsonwebtoken")
const adminModel = require("../../database/models/adminModel")
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("bearer ", "")
        const decodeToken = verify(token, process.env.JWT)
        const adminData = await adminModel.findOne({
            _id: decodeToken._id,
            "tokens.token": token
        })
        if (!adminData) throw new Error("un authorized")
        req.admin = adminData
        req.token = token
        next()

    } catch (e) {
        handler.responseHandler(res, 500, false, e.message, "unautherized")
    }
}
module.exports = auth
