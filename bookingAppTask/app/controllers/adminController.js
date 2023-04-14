const handler = require("../helper")
const adminModel = require("../../database/models/adminModel")
//admin can register ,login and logout 
class Admin {
    static register = async (req, res) => {
        try {
            const newAdmin = new adminModel(req.body)
            await newAdmin.save()
            handler.responseHandler(res, 200, true, newAdmin, "admin added successfully")

        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "registration failed")
        }
    }
    static login = async (req, res) => {
        try {
            const adminData = await adminModel.loginAdmin(req.body.email, req.body.password)
            const token = await adminData.generateToken()
            handler.responseHandler(res, 200, true, { adminData, token }, "admin login successfully")
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "error in login")
        }
    }
    static logout = async (req, res) => {
        try {
            req.admin.tokens = req.admin.tokens.filter(t => t.token !== req.token)
            await req.admin.save()
            handler.responseHandler(res, 200, true, {}, "logout")
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "error in logout")
        }
    }

}
module.exports = Admin