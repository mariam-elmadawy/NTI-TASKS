const handler = require("../helper")
const { verify } = require("jsonwebtoken")
const userModel = require("../../database/models/userModel")
const userAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("bearer ", "")
        const decodeToken = verify(token, process.env.JWT)
        const userData = await userModel.findOne({
            _id: decodeToken._id,
            "tokens.token": token
        })
        if (!userData) throw new Error("un authorized")
        req.user = userData
        req.token = token
        next()

    } catch (e) {
        handler.responseHandler(res, 500, false, e.message, "unautherized")
    }
}
module.exports = userAuth
