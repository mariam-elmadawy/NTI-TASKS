const handler = require("../helper")
const userModel = require("../../database/models/userModel")
class User {
    static register = async (req, res) => {
        try {
            const newUser = new userModel(req.body)
            await newUser.save()
            handler.responseHandler(res, 200, true, newUser, "user added successfully")
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "registration failed")
        }
    }
    static login = async (req, res) => {
        try {
            const userData = await userModel.loginUser(req.body.email, req.body.password)
            const token = await userData.generateToken()
            handler.responseHandler(res, 200, true, { userData, token }, "user login successfully")
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "error in login")
        }
    }
    static logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(t => t.token !== req.token)
            await req.user.save()
            handler.responseHandler(res, 200, true, {}, "logout")
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, "error in logout")
        }
    }
    static viewAllUsers = async (req, res) => {
        try {
            const users = await userModel.find();
            handler.responseHandler(res, 200, true, users, "users fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static viewOneUser = async (req, res) => {
        try {
            const users = await userModel.findById(req.params.id);
            handler.responseHandler(res, 200, true, users, "users fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static updateUser = async (req, res) => {
        try {
            const users = await userModel.findById(req.params.id)
            for (let el in req.body) {
                users[el] = req.body[el]
                await users.save()
                handler.responseHandler(res, 200, true, users, "user edited successfully")
            }
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static deleteUser = async (req, res) => {
        try {
            const users = await userModel.findByIdAndDelete(req.params.id)
            handler.responseHandler(res, 200, true, users, "deleted one user")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static delAllUsers = async (req, res) => {
        try {
            await userModel.deleteMany()
            handler.responseHandler(res, 200, true, [], "deleted all users")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static profile = async (req, res) => {
        handler.responseHandler(res, 200, true, req.user, 'profile data')
    }

}
module.exports = User