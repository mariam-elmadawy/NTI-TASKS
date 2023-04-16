const handler = require("../helper");
const reservationModel = require("../../database/models/reservationModel")
class Reservations {
    static newReservation = async (req, res) => {
        try {
            const newRes = await new reservationModel(req.body)
            await newRes.save()
            handler.responseHandler(res, 200, true, newRes, 'view reservation successfully')
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, 'invalid reservation')
        }
    }
    static showReservation = async (req, res) => {
        try {
            const showRes = await reservationModel.findById(req.params.id)
            handler.responseHandler(res, 200, true, showRes, 'add new reservation successfully')
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, 'fearching reservation failed')
        }
    }
    static showAllReservations = async (req, res) => {
        try {
            const showRes = await reservationModel.find()
            handler.responseHandler(res, 200, true, showRes, 'view all reservation successfully')
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, 'featching all reservation failed')
        }
    }
    static updateReservation = async (req, res) => {
        try {

        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, 'update reservation failed')
        }
    }
    static delReservation = async (req, res) => {
        try {
            const reservation = await reservationModel.findByIdAndDelete(req.params.id)
            handler.responseHandler(res, 200, true, reservation, 'del new reservation successfully')
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, 'invalid delete reservation')
        }
    }
    static delAllReservations = async (req, res) => {
        try {
            await reservationModel.deleteMany()
            handler.responseHandler(res, 200, true, [], 'dell all reservations successfully ')
        } catch (e) {
            handler.responseHandler(res, 500, false, e.message, 'invalid delete all reservations')
        }
    }

}
module.exports = Reservations