const handler = require("../helper")
const vendorModel = require("../../database/models/vendorModel")
class Vendor {
    static register = async (req, res) => {
        try {
            const newUser = new vendorModel(req.body)
            await newUser.save()
            handler.responseHandler(res, 200, true, newUser, "vendor added successfully")
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "registration failed")
        }
    }
    static login = async (req, res) => {
        try {
            const vendorData = await vendorModel.loginUser(req.body.email, req.body.password)
            const token = await vendorData.generateToken()
            handler.responseHandler(res, 200, true, { vendorData, token }, "vendor login successfully")
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "error in login")
        }
    }
    static logout = async (req, res) => {
        try {
            req.vendor.tokens = req.vendor.tokens.filter(t => t.token !== req.token)
            await req.vendor.save()
            handler.responseHandler(res, 200, true, {}, "logout")
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "error in logout")
        }
    }
    static view = async (req, res) => {
        try {
            const vendors = await vendorModel.findById(req.params.id);
            handler.responseHandler(res, 200, true, vendors, "vendors fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static update = async (req, res) => {
        try {
            const vendors = await vendorModel.findById(req.params.id)
            for (let el in req.body) {
                vendors[el] = req.body[el]
                await vendors.save()
                handler.responseHandler(res, 200, true, vendors, "vendor edited successfully")
            }
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static delete = async (req, res) => {
        try {
            const vendors = await vendorModel.findByIdAndDelete(req.params.id)
            handler.responseHandler(res, 200, true, vendors, "deleted one vendor")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };


}
module.exports = Vendor