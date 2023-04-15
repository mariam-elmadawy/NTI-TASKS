const handler = require("../helper")
const adminModel = require("../../database/models/adminModel")
const vendorModel = require("../../database/models/vendorsModel")
const userModel = require("../../database/models/userModel")
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
    static viewAll = async (req, res) => {
        try {
            const admins = await adminModel.find();
            handler.responseHandler(res, 200, true, admins, "admins fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static viewOne = async (req, res) => {
        try {
            const admins = await adminModel.findById(req.params.id);
            handler.responseHandler(res, 200, true, admins, "admins fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static update = async (req, res) => {
        try {
            const admins = await adminModel.findById(req.params.id)
            for (let el in req.body) {
                admins[el] = req.body[el]
                await admins.save()
                handler.responseHandler(res, 200, true, admins, "admin edited successfully")
            }
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static delete = async (req, res) => {
        try {
            const admins = await adminModel.findByIdAndDelete(req.params.id)
            handler.responseHandler(res, 200, true, admins, "deleted one admin")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static delAll = async (req, res) => {
        try {
            await adminModel.deleteMany()
            handler.responseHandler(res, 200, true, [], "deleted all admins")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    //function of other models
    static delVendors = async (req, res) => {
        try {
            await vendorModel.deleteMany()
            handler.responseHandler(res, 200, true, [], "deleted all admins")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static delUsers = async (req, res) => {
        try {
            await userModel.deleteMany()
            handler.responseHandler(res, 200, true, [], "deleted all admins")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static viewAllUsers = async (req, res) => {
        try {
            const users = await userModel.find();
            handler.responseHandler(res, 200, true, users, "user fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static viewOneUser = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id);
            handler.responseHandler(res, 200, true, user, "admins fetched successfully")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static viewAllVendors = async (req, res) => {
        try {
            const vendors = await vendorModel.find();
            handler.responseHandler(res, 200, true, vendors, "vendors fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static viewOneVendors = async (req, res) => {
        try {
            const vendor = await vendorModel.findById(req.params.id);
            handler.responseHandler(res, 200, true, vendor, "vendor fetched successfully")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
}
module.exports = Admin